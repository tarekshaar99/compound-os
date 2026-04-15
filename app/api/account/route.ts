import { NextResponse } from "next/server";
import { getCurrentSession } from "../../lib/session";
import { getServiceSupabase } from "../../lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Returns the signed-in user's account details: email, paid flag,
 * purchase timestamps, refund timestamp (if any).
 *
 * Gated by the cos_session cookie — same auth surface as middleware.
 * Does NOT return the Stripe session id or customer id externally;
 * those are server-private.
 */
export async function GET() {
  const session = await getCurrentSession();
  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const svc = getServiceSupabase();
  const { data, error } = await svc
    .from("users")
    .select("email, paid, admin, paid_at, refunded_at, created_at")
    .eq("email", session.sub)
    .maybeSingle();

  if (error) {
    console.error("[api/account] lookup failed:", error);
    return NextResponse.json({ error: "lookup_failed" }, { status: 500 });
  }

  if (!data) {
    // Should never happen — the cookie exists but the user doesn't.
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    email: data.email,
    paid: data.paid === true,
    admin: data.admin === true,
    paidAt: data.paid_at ?? null,
    refundedAt: data.refunded_at ?? null,
    memberSince: data.created_at ?? data.paid_at ?? null,
  });
}
