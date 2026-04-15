import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getServiceSupabase } from "../../lib/supabase";

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
 * NOTE: this route no longer grants access on its own — the Stripe webhook is
 * the source of truth. This route reads what the webhook wrote. In the rare
 * case the webhook has not yet fired (first-hit race, webhook down), we
 * verify the session directly with Stripe and upsert as a fallback using the
 * exact same idempotency rules as the webhook.
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
      .select("email, paid")
      .eq("stripe_session_id", session_id)
      .maybeSingle();

    if (userBySession?.paid) {
      return NextResponse.json({ valid: true, email: userBySession.email });
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

    return NextResponse.json({ valid: true, email });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "unknown";
    console.error("[verify] failed:", msg);
    return NextResponse.json({ valid: false, reason: "server_error" }, { status: 500 });
  }
}
