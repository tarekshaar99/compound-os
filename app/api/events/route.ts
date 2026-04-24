import { NextRequest, NextResponse } from "next/server";
import { trackEvent } from "../../lib/events";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Client-callable event tracker. Accepts {name, props?, email?}.
 *
 * Rate/validation: name is limited to a small whitelist so random callers
 * can't flood the table with arbitrary event names.
 */
const ALLOWED_NAMES = new Set([
  "page_view",
  "checkout_initiated",
  "login_otp_requested",
  "login_otp_verified",
  "login_failed",
  "signout",
]);

export async function POST(req: NextRequest) {
  let body: { name?: string; email?: string | null; props?: Record<string, unknown> };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name : "";
  if (!ALLOWED_NAMES.has(name)) {
    return NextResponse.json({ error: "bad_name" }, { status: 400 });
  }

  const userAgent = req.headers.get("user-agent");
  // X-Forwarded-For - Vercel's edge prepends the real client IP.
  const fwd = req.headers.get("x-forwarded-for") ?? "";
  const ip = fwd.split(",")[0]?.trim() || null;

  await trackEvent({
    name,
    email: body.email ?? null,
    props: body.props ?? {},
    userAgent,
    ip,
  });

  return NextResponse.json({ ok: true });
}
