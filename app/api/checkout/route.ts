import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getPricing } from "../../lib/pricing";
import { getServiceSupabase } from "../../lib/supabase";
import { rateLimit } from "../../lib/rate-limit";
import { parseJsonBody, validEmail, validId } from "../../lib/validate";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
  return new Stripe(key);
}

function cleanUrl(v: string | null | undefined): string | null {
  if (!v) return null;
  // Defensive: trim whitespace/newlines sometimes saved in env vars.
  const t = v.trim().replace(/\/+$/, "");
  return t.length > 0 ? t : null;
}

function getOrigin(req: NextRequest): string {
  // Prefer explicit env in prod, fall back to request origin (preview deploys, local dev).
  return (
    cleanUrl(process.env.NEXT_PUBLIC_SITE_URL) ??
    cleanUrl(process.env.NEXT_PUBLIC_BASE_URL) ??
    cleanUrl(req.headers.get("origin")) ??
    `https://${cleanUrl(req.headers.get("host")) ?? "thecompoundsystem.com"}`
  );
}

export async function POST(req: NextRequest) {
  // Rate limit Stripe-session creation: 10 per minute per IP. A real
  // buyer clicks at most a handful of times; anything heavier looks
  // like checkout-spam (Stripe-API exhaustion, dead-session inflation).
  const limit = rateLimit(req, {
    prefix: "checkout",
    max: 10,
    windowMs: 60_000,
  });
  if (!limit.ok) return limit.response;

  try {
    // Email is optional here — Stripe collects it on the checkout page.
    // If the client passes it (from the pricing CTA), we lock identity.
    //
    // eventId is the conversion-tracking dedupe key minted by the client
    // pixel layer. It travels into Stripe session metadata and back out
    // via the webhook so the server-side Meta CAPI / TikTok Events fire
    // matches the client-side InitiateCheckout / Purchase fires.
    const parsed = await parseJsonBody<{ email?: unknown; eventId?: unknown }>(
      req,
      { maxBytes: 4 * 1024 }
    );
    if (!parsed.ok) return parsed.response;

    let prefillEmail: string | undefined;
    let eventId: string | undefined;
    if (parsed.body.email !== undefined) {
      const e = validEmail(parsed.body.email);
      if (e === null) {
        return NextResponse.json({ error: "bad_email" }, { status: 400 });
      }
      prefillEmail = e;
    }
    if (parsed.body.eventId !== undefined) {
      const id = validId(parsed.body.eventId, { min: 8, max: 128 });
      if (id === null) {
        return NextResponse.json({ error: "bad_event_id" }, { status: 400 });
      }
      eventId = id;
    }

    const origin = getOrigin(req);

    // Block duplicate signups: if this email already has paid access, don't
    // create a new Stripe session - tell the client to route them to /login.
    // Refunded users (paid=false, refunded_at set) are allowed to repurchase.
    if (prefillEmail) {
      try {
        const svc = getServiceSupabase();
        const { data } = await svc
          .from("users")
          .select("paid, admin")
          .eq("email", prefillEmail)
          .maybeSingle();
        if (data && (data.paid || data.admin)) {
          return NextResponse.json(
            {
              alreadyPaid: true,
              email: prefillEmail,
              message: "This email already has access. Sign in to continue.",
            },
            { status: 409 }
          );
        }
      } catch (err) {
        // DB down? Fail open and let them pay - webhook idempotency handles
        // the case where they somehow double-charge. Don't block revenue on
        // a transient DB blip.
        console.warn("[checkout] duplicate-check failed, allowing:", err);
      }
    }

    const stripe = getStripe();

    // Authoritative price lookup - counts paid users in DB. If < 100,
    // charge $49 founding; otherwise $99 standard. On DB failure this
    // defaults to $99 (see getPricing() fail-safe).
    const pricing = await getPricing();

    const productName = pricing.isFounding
      ? "Compound OS - Lifetime Access (Founding Member)"
      : "Compound OS - Lifetime Access";
    // Description intentionally does not leak the founding-member count - we
    // don't want the Stripe page showing "X of 100 claimed" to the public.
    const productDescription =
      "Full access to all three pillars: Markets, Fitness, and Mindset. All future updates included.";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      // Locks the email for the session - user cannot change it on the Stripe page.
      ...(prefillEmail ? { customer_email: prefillEmail } : {}),
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: productName,
              description: productDescription,
            },
            unit_amount: pricing.cents,
          },
          quantity: 1,
        },
      ],
      client_reference_id: prefillEmail ?? undefined,
      ...(eventId ? { metadata: { eventId } } : {}),
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/#pricing`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[checkout] failed:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
