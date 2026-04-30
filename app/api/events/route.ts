import { NextRequest, NextResponse } from "next/server";
import { trackEvent } from "../../lib/events";
import { rateLimit } from "../../lib/rate-limit";
import {
  parseJsonBody,
  validEnum,
  validEmail,
  validRecord,
} from "../../lib/validate";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Client-callable event tracker. Accepts {name, props?, email?}.
 *
 * Hardening:
 *   - Body size cap: 8KB (parseJsonBody)
 *   - props size cap: 4KB serialized (validRecord)
 *   - name validated against allowlist (validEnum)
 *   - email format validated when provided (validEmail)
 *   - rate-limited: 60 events/min per IP
 */
const ALLOWED_NAMES = [
  "page_view",
  "checkout_initiated",
  "login_oauth_started",
  "login_otp_requested",
  "login_otp_verified",
  "login_failed",
  "signout",
] as const;

export async function POST(req: NextRequest) {
  // Rate-limit before doing any DB work — protects against analytics-spam
  // DoS that would otherwise grow the events table without bound.
  const limit = rateLimit(req, {
    prefix: "events",
    max: 60,
    windowMs: 60_000,
  });
  if (!limit.ok) return limit.response;

  const parsed = await parseJsonBody<{
    name?: unknown;
    email?: unknown;
    props?: unknown;
  }>(req, { maxBytes: 8 * 1024 });
  if (!parsed.ok) return parsed.response;
  const { body } = parsed;

  const name = validEnum(body.name, ALLOWED_NAMES);
  if (!name) {
    return NextResponse.json({ error: "bad_name" }, { status: 400 });
  }

  // Email is optional. If provided, validate format; otherwise treat as null.
  const email =
    body.email == null || body.email === "anon"
      ? null
      : validEmail(body.email);
  if (body.email != null && body.email !== "anon" && email === null) {
    return NextResponse.json({ error: "bad_email" }, { status: 400 });
  }

  // props is optional. If provided, cap its serialized size to 4KB so a
  // single event can't drop a megabyte of attacker-controlled JSON into
  // the events.props jsonb column.
  let props: Record<string, unknown> | null = null;
  if (body.props != null) {
    props = validRecord(body.props, { maxBytes: 4 * 1024 });
    if (props === null) {
      return NextResponse.json({ error: "bad_props" }, { status: 400 });
    }
  }

  const userAgent = req.headers.get("user-agent");
  const fwd = req.headers.get("x-forwarded-for") ?? "";
  const ip = fwd.split(",")[0]?.trim() || null;

  await trackEvent({
    name,
    email,
    props: props ?? {},
    userAgent,
    ip,
  });

  return NextResponse.json({ ok: true });
}
