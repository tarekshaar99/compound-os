import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getServiceSupabase } from "../../lib/supabase";
import { signSession, setSessionCookie } from "../../lib/session";
import { rateLimit } from "../../lib/rate-limit";
import { parseJsonBody, validId } from "../../lib/validate";

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
 * Hardening:
 *   - Rate limited to 20 calls/min per IP (slow-path hits Stripe API)
 *   - Body capped at 4KB (session_id is ~80 chars; anything larger is junk)
 *   - session_id strictly validated against Stripe's `cs_*_<alnum>` shape
 */
export async function POST(req: NextRequest) {
  // Slow path calls Stripe API (costs us money + rate against Stripe).
  // 20/min is generous for a real /success page-load loop and tight
  // enough to stop session-id brute-forcing.
  const limit = rateLimit(req, {
    prefix: "verify",
    max: 20,
    windowMs: 60_000,
  });
  if (!limit.ok) return limit.response;

  const parsed = await parseJsonBody<{ session_id?: unknown }>(req, {
    maxBytes: 4 * 1024,
  });
  if (!parsed.ok) return parsed.response;

  const session_id = validId(parsed.body.session_id, { min: 10, max: 200 });
  if (!session_id) {
    return NextResponse.json(
      { valid: false, reason: "missing_session_id" },
      { status: 400 }
    );
  }

  try {
    const supabase = getServiceSupabase();

    // Fast path: webhook already processed this session.
    const { data: userBySession } = await supabase
      .from("users")
      .select("email, paid, admin")
      .eq("stripe_session_id", session_id)
      .maybeSingle();

    if (userBySession?.paid) {
      // Fast path. The webhook has already processed this session, which
      // means the server-side Purchase event was fired from the webhook.
      // No client-side eventId returned — /success skips its client fire
      // and we avoid double-counting.
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

    // Pull the conversion-tracking event_id stamped onto the Stripe
    // session by /api/checkout so /success can fire the matching
    // client-side Purchase event with the same eventId. This is what
    // makes Meta + TikTok dedupe the client and server fires.
    const eventId =
      typeof session.metadata?.eventId === "string"
        ? session.metadata.eventId
        : undefined;

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
      eventId,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "unknown";
    console.error("[verify] failed:", msg);
    return NextResponse.json({ valid: false, reason: "server_error" }, { status: 500 });
  }
}

async function mintAndRespond(args: {
  email: string;
  paid: boolean;
  admin: boolean;
  eventId?: string;
}) {
  const jwt = await signSession({ sub: args.email, paid: args.paid, admin: args.admin });
  const res = NextResponse.json({
    valid: true,
    email: args.email,
    ...(args.eventId ? { eventId: args.eventId } : {}),
  });
  setSessionCookie(res, jwt);
  return res;
}
