import { getServiceSupabase } from "./supabase";

/**
 * Founding-member pricing model.
 *
 * The first FOUNDING_LIMIT paid users get FOUNDING_PRICE_CENTS.
 * After that, new users pay STANDARD_PRICE_CENTS.
 *
 * Source of truth is `count(*) where paid = true` in public.users.
 * The Stripe webhook is the only thing that can flip paid → true,
 * so this count is strictly authoritative.
 */

export const FOUNDING_LIMIT = 100;
export const FOUNDING_PRICE_CENTS = 4900;
export const STANDARD_PRICE_CENTS = 9900;

export interface PricingInfo {
  /** What Stripe should charge right now (cents). */
  cents: number;
  /** Display string for the current price, e.g. "$49". */
  display: string;
  /** Display string for the post-founding price. Always "$99". */
  standardDisplay: string;
  /** True while there are founding spots left. */
  isFounding: boolean;
  /** How many founding seats remain. 0 once sold out. */
  spotsRemaining: number;
  /** How many founding seats are sold. Capped at FOUNDING_LIMIT. */
  foundingSold: number;
}

function formatUsd(cents: number): string {
  // We only use whole-dollar prices, so no need for .00 noise.
  const dollars = Math.round(cents / 100);
  return `$${dollars}`;
}

export async function getPricing(): Promise<PricingInfo> {
  try {
    const svc = getServiceSupabase();
    const { count, error } = await svc
      .from("users")
      .select("*", { count: "exact", head: true })
      .eq("paid", true);

    if (error) throw error;

    const paidCount = count ?? 0;
    const isFounding = paidCount < FOUNDING_LIMIT;
    const cents = isFounding ? FOUNDING_PRICE_CENTS : STANDARD_PRICE_CENTS;

    return {
      cents,
      display: formatUsd(cents),
      standardDisplay: formatUsd(STANDARD_PRICE_CENTS),
      isFounding,
      spotsRemaining: Math.max(0, FOUNDING_LIMIT - paidCount),
      foundingSold: Math.min(paidCount, FOUNDING_LIMIT),
    };
  } catch (err) {
    // Fail-safe: charge the STANDARD price. Better to over-charge by $50 in
    // a DB outage than to give away the founding price to everyone.
    console.error("[pricing] fell back to standard:", err);
    return {
      cents: STANDARD_PRICE_CENTS,
      display: formatUsd(STANDARD_PRICE_CENTS),
      standardDisplay: formatUsd(STANDARD_PRICE_CENTS),
      isFounding: false,
      spotsRemaining: 0,
      foundingSold: FOUNDING_LIMIT,
    };
  }
}
