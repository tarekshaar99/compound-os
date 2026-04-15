import { NextResponse } from "next/server";
import { getPricing } from "../../lib/pricing";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Public read-only pricing info. Safe to call from any client.
 * Used by MobileCTA, Paywall, and anything else that needs to display
 * the current checkout price consistently.
 *
 * Cached at the edge for 30s so we don't hammer the DB on page views;
 * the transition from founding → standard price is not time-critical
 * to the second.
 */
export async function GET() {
  const pricing = await getPricing();
  return NextResponse.json(pricing, {
    headers: {
      "Cache-Control": "public, max-age=0, s-maxage=30, stale-while-revalidate=60",
    },
  });
}
