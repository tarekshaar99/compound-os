import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import * as Sentry from "@sentry/nextjs";
import { getServiceSupabase } from "../../../lib/supabase";
import { sendWelcomeEmail } from "../../../lib/email";
import { FOUNDING_LIMIT } from "../../../lib/pricing";

// Webhook must run on Node.js (not Edge) - needs raw body + stripe SDK.
export const runtime = "nodejs";
// Never cache; every request is a unique event.
export const dynamic = "force-dynamic";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
  return new Stripe(key);
}

function getWebhookSecret(): string {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) throw new Error("STRIPE_WEBHOOK_SECRET is not set");
  return secret;
}

/**
 * Stripe sends events here. Must respond 2xx within 10s or Stripe retries.
 * Source of truth for `users.paid`. DO NOT mutate `paid` anywhere else.
 */
export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json({ error: "Missing stripe-signature" }, { status: 400 });
  }

  // Stripe requires the *raw* body for signature verification.
  // NextRequest.text() gives us that before any JSON parsing.
  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(rawBody, sig, getWebhookSecret());
  } catch (err) {
    const msg = err instanceof Error ? err.message : "unknown";
    console.error("[stripe-webhook] signature verification failed:", msg);

    // Real Stripe webhooks always send User-Agent: Stripe/1.0 (or similar
    // Stripe/<version> string). If the failing request didn't come from
    // Stripe, it's a bot/scraper/probe hitting our public webhook URL —
    // we still 400 it, but we don't fire a Sentry alert for the noise.
    //
    // A real signature mismatch from a genuine Stripe webhook (which would
    // indicate STRIPE_WEBHOOK_SECRET drift between Vercel and the Stripe
    // dashboard) DOES still fire — that's the alert we want to keep.
    const ua = req.headers.get("user-agent") ?? "";
    const isRealStripe = ua.startsWith("Stripe/");

    if (isRealStripe) {
      Sentry.captureException(err, {
        tags: { area: "stripe-webhook", stage: "signature" },
        extra: { user_agent: ua },
      });
    }

    return NextResponse.json({ error: `Webhook Error: ${msg}` }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await grantAccess(session);
        break;
      }

      case "checkout.session.async_payment_succeeded": {
        // Covers delayed payment methods (bank debits, etc.)
        const session = event.data.object as Stripe.Checkout.Session;
        await grantAccess(session);
        break;
      }

      case "charge.refunded": {
        // Optional: revoke access on refund.
        const charge = event.data.object as Stripe.Charge;
        await revokeAccess(charge);
        break;
      }

      default:
        // Ignore everything else, but 200 so Stripe stops retrying.
        break;
    }
  } catch (err) {
    // Log + return 500 so Stripe retries. Do NOT swallow.
    const msg = err instanceof Error ? err.message : "unknown";
    console.error(`[stripe-webhook] handler failed for ${event.type}:`, msg);
    // This is the critical path - failing to grant access means a customer
    // paid and didn't get access. Tag heavily so we can triage fast.
    Sentry.captureException(err, {
      tags: { area: "stripe-webhook", stage: "handler", event_type: event.type },
      extra: { event_id: event.id },
    });
    return NextResponse.json({ error: "Handler failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

/**
 * Idempotent upsert. Safe to call any number of times with the same session.
 * - Uses session.id as a natural unique key (schema enforces UNIQUE).
 * - If the user row already exists (by email), we attach the session id and flip paid=true.
 * - Writes audit timestamp.
 */
async function grantAccess(session: Stripe.Checkout.Session) {
  if (session.payment_status !== "paid") {
    console.warn(`[stripe-webhook] session ${session.id} not paid (${session.payment_status}); skipping`);
    return;
  }

  const email =
    session.customer_details?.email ??
    session.customer_email ??
    (typeof session.customer === "object" && session.customer
      ? (session.customer as Stripe.Customer).email ?? null
      : null);

  if (!email) {
    throw new Error(`checkout session ${session.id} has no email`);
  }

  const normalizedEmail = email.trim().toLowerCase();
  const supabase = getServiceSupabase();

  // Idempotency check: if we've already processed this session, bail.
  const { data: existingBySession } = await supabase
    .from("users")
    .select("id, email, paid")
    .eq("stripe_session_id", session.id)
    .maybeSingle();

  if (existingBySession?.paid) {
    console.log(`[stripe-webhook] session ${session.id} already processed for ${existingBySession.email}`);
    return;
  }

  // Upsert by email. Requires UNIQUE(email) in Supabase (see Phase 2 SQL).
  const { error } = await supabase
    .from("users")
    .upsert(
      {
        email: normalizedEmail,
        paid: true,
        stripe_session_id: session.id,
        stripe_customer_id:
          typeof session.customer === "string" ? session.customer : session.customer?.id ?? null,
        paid_at: new Date().toISOString(),
      },
      { onConflict: "email" }
    );

  if (error) {
    // If the unique violation is on stripe_session_id, someone re-sent the same event.
    // Supabase returns error.code === "23505" for unique_violation.
    if (error.code === "23505") {
      console.log(`[stripe-webhook] duplicate session ${session.id} - ignoring`);
      return;
    }
    throw new Error(`Supabase upsert failed: ${error.message}`);
  }

  console.log(`[stripe-webhook] granted access: ${normalizedEmail} (${session.id})`);

  // Best-effort welcome email. Failures here must NOT propagate - the
  // DB write already succeeded and the webhook must return 2xx to Stripe.
  // If RESEND_API_KEY / EMAIL_FROM are unset, this silently skips.
  try {
    // We consider anyone who made it in while the founding window was
    // still open a founding member. Count again to decide phrasing; we've
    // already inserted them, so they're included in this count.
    const { count } = await supabase
      .from("users")
      .select("*", { count: "exact", head: true })
      .eq("paid", true);
    const isFounding = (count ?? FOUNDING_LIMIT + 1) <= FOUNDING_LIMIT;
    await sendWelcomeEmail({ to: normalizedEmail, isFounding });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "unknown";
    console.error("[stripe-webhook] welcome email failed (non-fatal):", msg);
    // Non-fatal (user already has access) but still worth knowing about.
    // If we see a pattern of these, Resend config or delivery is broken.
    Sentry.captureException(err, {
      level: "warning",
      tags: { area: "stripe-webhook", stage: "welcome-email" },
      extra: { email: normalizedEmail },
    });
  }
}

async function revokeAccess(charge: Stripe.Charge) {
  const sessionId =
    (typeof charge.payment_intent === "string" ? null : charge.payment_intent?.id) ??
    charge.metadata?.session_id ??
    null;

  // Prefer looking up by customer email on the charge; fall back to customer id.
  const email = charge.billing_details?.email?.trim().toLowerCase() ?? null;
  const customerId = typeof charge.customer === "string" ? charge.customer : charge.customer?.id ?? null;

  if (!email && !customerId) {
    console.warn(`[stripe-webhook] refund ${charge.id} has no email/customer; cannot revoke`);
    return;
  }

  const supabase = getServiceSupabase();
  const query = supabase.from("users").update({ paid: false, refunded_at: new Date().toISOString() });

  const { error } = email
    ? await query.eq("email", email)
    : await query.eq("stripe_customer_id", customerId as string);

  if (error) {
    throw new Error(`Supabase revoke failed: ${error.message}`);
  }

  console.log(`[stripe-webhook] revoked access for refund (session=${sessionId ?? "n/a"})`);
}
