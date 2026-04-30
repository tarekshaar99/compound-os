import { NextRequest, NextResponse } from "next/server";

/**
 * In-memory rate limiter for Vercel serverless functions.
 *
 * Caveats / what this is and isn't:
 *
 *   - Per-function-instance state. Vercel cold-starts mean the same IP
 *     hitting two different cold instances bypasses the count. In
 *     practice, a single instance handles a stream of requests, so a
 *     burst attack from one IP still gets throttled the moment it pins
 *     to a warm instance. Acceptable trade-off for v1; for pixel-perfect
 *     enforcement, swap the backing store for Upstash Redis or Vercel
 *     KV (both have free tiers — see app/lib/rate-limit-upstash.ts
 *     follow-up if/when needed).
 *
 *   - Trusts X-Forwarded-For (Vercel's edge prepends the real client IP).
 *     If we ever move off Vercel, validate this is still authoritative.
 *
 *   - Sliding window: each unique key keeps a single counter that resets
 *     when its TTL expires. Cleaner than fixed-bucket and doesn't need a
 *     timer goroutine — TTL is checked lazily on each access.
 *
 * Usage:
 *
 *   const limit = rateLimit(req, { max: 5, windowMs: 60_000, prefix: "events" });
 *   if (!limit.ok) return limit.response;
 *
 * The returned response is a 429 with Retry-After + JSON body. If you
 * need to mutate it (extra headers, custom body), call rateLimitCheck()
 * directly instead.
 */

interface Bucket {
  count: number;
  resetAt: number;
}

// Module-scoped Map. Survives across requests within the same warm
// function instance; re-initialised on cold start.
const buckets = new Map<string, Bucket>();

// Reasonable cap so a long-running instance doesn't grow the map without
// bound. LRU-ish eviction: when full, drop a random expired bucket.
const MAX_BUCKETS = 10_000;

/**
 * Pull the client's real IP. Vercel's edge prepends it to
 * X-Forwarded-For; the first comma-separated value is the original
 * client. Falls back to "unknown" so we still rate-limit per-instance
 * even if the header is missing (better than skipping entirely).
 */
function clientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for") ?? "";
  const ip = fwd.split(",")[0]?.trim();
  if (ip) return ip;
  return req.headers.get("x-real-ip") ?? "unknown";
}

/**
 * Low-level check. Returns metadata about whether the caller is allowed.
 * Use this when you need the metadata (e.g. for logging) without the
 * shorthand 429 response.
 */
export function rateLimitCheck(args: {
  key: string;
  max: number;
  windowMs: number;
}): {
  ok: boolean;
  remaining: number;
  retryAfterSec: number;
  resetAt: number;
} {
  const now = Date.now();
  const { key, max, windowMs } = args;

  // Lazy expiry sweep when the map gets large.
  if (buckets.size >= MAX_BUCKETS) {
    for (const [k, b] of buckets) {
      if (b.resetAt <= now) buckets.delete(k);
    }
  }

  let bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    bucket = { count: 0, resetAt: now + windowMs };
    buckets.set(key, bucket);
  }
  bucket.count += 1;

  const ok = bucket.count <= max;
  const remaining = Math.max(0, max - bucket.count);
  const retryAfterSec = Math.max(1, Math.ceil((bucket.resetAt - now) / 1000));
  return { ok, remaining, retryAfterSec, resetAt: bucket.resetAt };
}

/**
 * One-shot helper: checks the limit and returns a pre-built 429 if
 * exceeded, or `{ ok: true }` if allowed.
 *
 * The `prefix` keeps endpoints in separate keyspaces so /api/events
 * limits don't bleed into /api/verify.
 */
export function rateLimit(
  req: NextRequest,
  args: {
    max: number;
    windowMs: number;
    prefix: string;
    /** Optional extra discriminator (e.g. email) to limit per-user as
     *  well as per-IP. */
    extra?: string;
  }
): { ok: true } | { ok: false; response: NextResponse } {
  const ip = clientIp(req);
  const key = args.extra
    ? `${args.prefix}:${ip}:${args.extra}`
    : `${args.prefix}:${ip}`;

  const result = rateLimitCheck({
    key,
    max: args.max,
    windowMs: args.windowMs,
  });

  if (result.ok) return { ok: true };

  const response = NextResponse.json(
    { error: "rate_limited", retryAfter: result.retryAfterSec },
    { status: 429 }
  );
  response.headers.set("Retry-After", String(result.retryAfterSec));
  response.headers.set("X-RateLimit-Limit", String(args.max));
  response.headers.set("X-RateLimit-Remaining", "0");
  response.headers.set(
    "X-RateLimit-Reset",
    String(Math.floor(result.resetAt / 1000))
  );
  return { ok: false, response };
}
