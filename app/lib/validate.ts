import { NextRequest, NextResponse } from "next/server";

/**
 * Tiny manual input-validation helpers. Kept dependency-free on purpose
 * (no zod, ajv, etc.) — for our 12 routes, hand-rolled checks are easier
 * to audit than a schema layer and don't expand the bundle.
 *
 * Use the top-level `parseJsonBody()` to read+cap the body in one step,
 * then drill into specific fields with the type-guard helpers below.
 */

const KILOBYTES = 1024;

/**
 * Reads and parses a JSON body with a hard byte cap. Reject oversized
 * payloads BEFORE JSON.parse so a malicious 10MB blob can't OOM the
 * function or stall it inside the parser.
 *
 * Returns either the parsed body OR a NextResponse to return immediately.
 */
export async function parseJsonBody<T = unknown>(
  req: NextRequest,
  opts: { maxBytes?: number } = {}
): Promise<{ ok: true; body: T } | { ok: false; response: NextResponse }> {
  const cap = opts.maxBytes ?? 16 * KILOBYTES; // default 16KB

  // Quick header check — saves us reading the body if Content-Length lies
  // too high (clients can omit it but most browsers send it).
  const lengthHeader = req.headers.get("content-length");
  if (lengthHeader) {
    const n = parseInt(lengthHeader, 10);
    if (Number.isFinite(n) && n > cap) {
      return {
        ok: false,
        response: NextResponse.json(
          { error: "payload_too_large", maxBytes: cap },
          { status: 413 }
        ),
      };
    }
  }

  let raw: string;
  try {
    raw = await req.text();
  } catch {
    return {
      ok: false,
      response: NextResponse.json({ error: "bad_body" }, { status: 400 }),
    };
  }

  // Authoritative size check — Content-Length isn't always present.
  if (raw.length > cap) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "payload_too_large", maxBytes: cap },
        { status: 413 }
      ),
    };
  }

  // Empty body is treated as `{}` so callers can deal with optional fields.
  if (raw.length === 0) {
    return { ok: true, body: {} as T };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return {
      ok: false,
      response: NextResponse.json({ error: "bad_json" }, { status: 400 }),
    };
  }

  // We don't enforce a top-level shape here — that's the caller's job
  // since each endpoint expects different fields. We just guarantee
  // `body` is an object (not a primitive or array) so destructuring is safe.
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "expected_object" },
        { status: 400 }
      ),
    };
  }

  return { ok: true, body: parsed as T };
}

/* ─────────────────── Field validators ─────────────────── */

/** Trim + lowercase + verify shape against a permissive but real-world
 *  RFC-5321 email regex. Returns null if invalid. */
export function validEmail(input: unknown): string | null {
  if (typeof input !== "string") return null;
  const trimmed = input.trim().toLowerCase();
  if (trimmed.length === 0 || trimmed.length > 254) return null;
  // Common-sense email pattern. Not RFC-perfect (RFC-822 supports way more),
  // but rejects obvious garbage and the most common header-injection bait.
  if (!/^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/i.test(trimmed)) return null;
  // Disallow CR/LF/null which header-injection attacks rely on.
  if (/[\r\n\0]/.test(trimmed)) return null;
  return trimmed;
}

/** Verify a string is non-empty and within length bounds. */
export function validString(
  input: unknown,
  opts: { min?: number; max?: number } = {}
): string | null {
  if (typeof input !== "string") return null;
  const trimmed = input.trim();
  const min = opts.min ?? 1;
  const max = opts.max ?? 1000;
  if (trimmed.length < min || trimmed.length > max) return null;
  // Reject strings containing CR/LF/null — header-injection prep
  if (/[\r\n\0]/.test(trimmed)) return null;
  return trimmed;
}

/** Verify a string is one of an enum / allowlist. */
export function validEnum<T extends string>(
  input: unknown,
  allowed: readonly T[]
): T | null {
  if (typeof input !== "string") return null;
  return (allowed as readonly string[]).includes(input) ? (input as T) : null;
}

/** Verify a string matches a strict ID format (alphanumeric + a few chars).
 *  Used for Stripe session_ids, eventIds, tokens, etc. */
export function validId(
  input: unknown,
  opts: { min?: number; max?: number } = {}
): string | null {
  if (typeof input !== "string") return null;
  const min = opts.min ?? 1;
  const max = opts.max ?? 256;
  if (input.length < min || input.length > max) return null;
  // Stripe IDs use letters, numbers, underscore. Our event IDs use
  // letters/numbers/dashes. Be permissive but reject obvious garbage.
  if (!/^[A-Za-z0-9_\-.]+$/.test(input)) return null;
  return input;
}

/** Cap an unknown record's serialized size (for jsonb columns).
 *  Used so /api/events `props` can't be a 10MB blob written to the DB. */
export function validRecord(
  input: unknown,
  opts: { maxBytes?: number } = {}
): Record<string, unknown> | null {
  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    return null;
  }
  const cap = opts.maxBytes ?? 4 * KILOBYTES;
  let serialized: string;
  try {
    serialized = JSON.stringify(input);
  } catch {
    return null;
  }
  if (serialized.length > cap) return null;
  return input as Record<string, unknown>;
}
