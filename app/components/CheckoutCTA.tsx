"use client";

import { useState } from "react";
import { track } from "../lib/track";
import { newEventId, trackInitiateCheckout } from "../lib/ads-client";

/**
 * Button-only checkout CTA for the homepage pricing block.
 *
 * Why no email field: Stripe Checkout collects and validates email on its
 * own page. Forcing it here was extra friction on mobile. The "already
 * paid" duplicate-purchase guard now lives on /login instead - a small
 * "Already have access? Sign in" link below this button lets returning
 * customers self-route.
 *
 * Click → POST /api/checkout (no body) → redirect to Stripe.
 */
export default function CheckoutCTA({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    setError(null);
    setLoading(true);

    // Same event_id pattern as <CheckoutButton /> — minted client-side,
    // travels through Stripe metadata to the webhook for server-side fire,
    // dedupes matched conversion events on Meta + TikTok.
    const eventId = newEventId();

    track("checkout_initiated", { source: "homepage_cta" }, "anon");
    trackInitiateCheckout({ eventId });

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError("Couldn't start checkout. Please try again.");
        setLoading(false);
      }
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className={
          className ||
          "w-full max-w-md mx-auto block px-8 py-4 rounded-xl bg-[var(--accent)] text-[#0a0b0f] font-bold text-base transition-all hover:opacity-90 hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0 cursor-pointer"
        }
      >
        {loading ? "Redirecting..." : label}
      </button>
      {error && (
        <p className="mt-3 text-sm text-[#ef4444] text-center">{error}</p>
      )}
    </div>
  );
}
