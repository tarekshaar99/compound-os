import { NextRequest, NextResponse } from "next/server";
import { getCurrentSession } from "../../../lib/session";
import { sendWelcomeEmail } from "../../../lib/email";

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
 * Anyone without an admin cookie gets 403.
 *
 * This is intentionally a GET so it's easy to trigger from a browser by
 * an admin who's already signed in. Side-effect-y for a GET, but it's an
 * admin tool — convenience > strict REST.
 */
export async function GET(req: NextRequest) {
  const session = await getCurrentSession();
  if (!session || !session.admin) {
    return NextResponse.json(
      { error: "admin_only" },
      { status: 403 }
    );
  }

  const { searchParams } = req.nextUrl;
  const to = searchParams.get("to")?.trim().toLowerCase();
  if (!to || !to.includes("@")) {
    return NextResponse.json(
      { error: "missing_or_invalid_to_param" },
      { status: 400 }
    );
  }

  const isFounding = searchParams.get("founding") === "true";

  const ok = await sendWelcomeEmail({ to, isFounding });
  return NextResponse.json({ ok, to, isFounding, sentBy: session.sub });
}
