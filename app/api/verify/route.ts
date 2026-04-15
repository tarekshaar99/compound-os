import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getServiceSupabase } from "../../lib/supabase";
import { signSession, setSessionCookie } from "../../lib/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
  return new Stripe(key);
}

/**
 * Called by /success after Stripe redirects back.
 *
 * Webhook is the source of truth. This route:
 *   1. Confirms the user row exists + paid=true (fast path via DB lookup by
 *      stripe_session_id, or slow path by asking Stripe directly + upserting).
 *   2. Mints the signed cos_session cookie so middleware will allow access
 *      on subsequent requests.
 *
 * No fake tokens, no localStorage grants.
 */
export async function POST(req: NextRequest) {
  try {
    const { session_id } = await req.json();
    if (!session_id || typeof session_id !== "string") {
      return NextResponse.json({ valid: false, reason: "missing_session_id" }, { status: 400 });
    }

    const supabase = getServiceSupabase();

    // Fast path: webhook already processed this session.
    const { data: userBySession } = await supabase
      .from("users")
      .select("email, paid, admin")
      .eq("stripe_session_id", session_id)
      .maybeSingle();

    if (userBySession?.paid) {
      return await mintAndRespond({
        email: userBySession.email,
        paid: true,
        admin: userBySession.admin === true,
      });
    }

    // Slow path: ask Stripe, then fall back to upserting ourselves.
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status !== "paid") {
      return NextResponse.json({ valid: false, reason: "not_paid" });
    }

    const email =
      session.customer_details?.email?.trim().toLowerCase() ??
      session.customer_email?.trim().toLowerCase() ??
      null;

    if (!email) {
      return NextResponse.json({ valid: false, reason: "no_email" }, { status: 400 });
    }

    const { error } = await supabase.from("users").upsert(
      {
        email,
        paid: true,
        stripe_session_id: session.id,
        stripe_customer_id:
          typeof session.customer === "string" ? session.customer : session.customer?.id ?? null,
        paid_at: new Date().toISOString(),
      },
      { onConflict: "email" }
    );

    if (error && error.code !== "23505") {
      console.error("[verify] upsert failed:", error.message);
      return NextResponse.json({ valid: false, reason: "db_error" }, { status: 500 });
    }

    // Re-read to pick up any pre-existing admin flag on this email.
    const { data: after } = await supabase
      .from("users")
      .select("email, paid, admin")
      .eq("email", email)
      .maybeSingle();

    return await mintAndRespond({
      email: after?.email ?? email,
      paid: true,
      admin: after?.admin === true,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "unknown";
    console.error("[verify] failed:", msg);
    return NextResponse.json({ valid: false, reason: "server_error" }, { status: 500 });
  }
}

async function mintAndRespond(args: { email: string; paid: boolean; admin: boolean }) {
  const jwt = await signSession({ sub: args.email, paid: args.paid, admin: args.admin });
  const res = NextResponse.json({ valid: true, email: args.email });
  setSessionCookie(res, jwt);
  return res;
}
