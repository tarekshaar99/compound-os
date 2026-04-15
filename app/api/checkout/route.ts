import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getPricing } from "../../lib/pricing";

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
  try {
    // Email is optional here — Stripe collects it on the checkout page.
    // If the client passes it (from the pricing CTA in Phase 5), we lock identity.
    let prefillEmail: string | undefined;
    try {
      const body = await req.json();
      if (typeof body?.email === "string" && body.email.includes("@")) {
        prefillEmail = body.email.trim().toLowerCase();
      }
    } catch {
      // No body is fine.
    }

    const origin = getOrigin(req);
    const stripe = getStripe();

    // Authoritative price lookup — counts paid users in DB. If < 100,
    // charge $49 founding; otherwise $99 standard. On DB failure this
    // defaults to $99 (see getPricing() fail-safe).
    const pricing = await getPricing();

    const productName = pricing.isFounding
      ? "Compound OS - Lifetime Access (Founding Member)"
      : "Compound OS - Lifetime Access";
    const productDescription = pricing.isFounding
      ? `Founding-member early access (${pricing.foundingSold} of 100 claimed). Full access to all three pillars: Markets, Fitness, and Mindset. All future updates included.`
      : "Full access to all three pillars: Markets, Fitness, and Mindset. All future updates included.";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      // Locks the email for the session — user cannot change it on the Stripe page.
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
