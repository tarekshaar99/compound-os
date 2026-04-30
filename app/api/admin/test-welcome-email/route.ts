import { NextRequest, NextResponse } from "next/server";
import { getCurrentSession } from "../../../lib/session";
import { sendWelcomeEmail } from "../../../lib/email";
import { rateLimit } from "../../../lib/rate-limit";
import { validEmail } from "../../../lib/validate";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Admin-only endpoint to fire a welcome-email render with the current
 * production template + Resend integration. Used to QA the brand-pass
 * email design without round-tripping through a real Stripe checkout.
 *
 *   GET /api/admin/test-welcome-email?to=<email>&founding=<true|false>
 *
 * Gating: requires the cos_session cookie to be present AND `admin: true`.
 * Anyone without an admin cookie gets 403. Additionally rate-limited to
 * 5 sends/min per IP so a leaked admin cookie can't be used to spam Resend.
 *
 * Email format strictly validated to prevent header-injection / open-relay.
 */
export async function GET(req: NextRequest) {
  // Auth gate first — quietly 403 unauthorized callers without burning
  // a rate-limit slot.
  const session = await getCurrentSession();
  if (!session || !session.admin) {
    return NextResponse.json({ error: "admin_only" }, { status: 403 });
  }

  // Rate limit by IP to cap Resend cost in case the admin cookie ever
  // leaks. 5/min is loose for human QA and tight for automated abuse.
  const limit = rateLimit(req, {
    prefix: "admin-test-welcome",
    max: 5,
    windowMs: 60_000,
  });
  if (!limit.ok) return limit.response;

  const to = validEmail(req.nextUrl.searchParams.get("to"));
  if (!to) {
    return NextResponse.json(
      { error: "missing_or_invalid_to_param" },
      { status: 400 }
    );
  }

  const isFounding = req.nextUrl.searchParams.get("founding") === "true";

  const ok = await sendWelcomeEmail({ to, isFounding });
  return NextResponse.json({ ok, to, isFounding, sentBy: session.sub });
}
