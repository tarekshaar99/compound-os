"use client";

import { useState, useEffect } from "react";
import CheckoutButton from "./CheckoutButton";

interface PricingLite {
  display: string;
  standardDisplay: string;
  isFounding: boolean;
}

/**
 * Sticky-bottom CTA on mobile only. Slides in once the user has scrolled
 * past the hero (~500px), gets out of the way for paid users entirely.
 * Editorial Quarterly styling: hairline top border, no rounded corners,
 * Newsreader serif price, label-caps CTA.
 */
export default function MobileCTA() {
  const [visible, setVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pricing, setPricing] = useState<PricingLite | null>(null);

  useEffect(() => {
    fetch("/api/me", { credentials: "same-origin" })
      .then((r) => r.json())
      .then((d) => {
        if (d?.authenticated && (d.paid || d.admin)) {
          setIsLoggedIn(true);
        }
      })
      .catch(() => {});

    fetch("/api/pricing", { credentials: "same-origin" })
      .then((r) => r.json())
      .then((d) => setPricing(d))
      .catch(() => {});

    const onScroll = () => {
      setVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (isLoggedIn) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 md:hidden transition-transform duration-500 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="bg-[var(--bg)]/95 backdrop-blur-xl border-t border-[var(--border)] px-4 py-3.5 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="label-caps text-[var(--text-muted)] mb-1">
            Compound OS
          </div>
          <div className="font-serif text-[15px] flex items-baseline gap-2 leading-tight">
            {pricing?.isFounding && pricing.standardDisplay && (
              <span className="text-[var(--text-muted)] line-through decoration-1 text-[13px]">
                {pricing.standardDisplay}
              </span>
            )}
            <span className="text-[var(--accent)] text-[20px] font-light tabular-nums">
              {pricing?.display ?? "$49"}
            </span>
            <span className="font-serif italic text-[12px] text-[var(--text-muted)]">
              {pricing?.isFounding ? "founding" : "one-time"}
            </span>
          </div>
        </div>
        <CheckoutButton className="group inline-flex items-center justify-center gap-2 shrink-0 px-5 py-3 bg-[var(--accent)] text-[var(--on-accent)] label-caps border border-[var(--accent)] transition-all duration-300 cursor-pointer">
          Get Access
          <span
            aria-hidden
            className="inline-block transition-transform duration-300 group-hover:translate-x-0.5"
          >
            &rarr;
          </span>
        </CheckoutButton>
      </div>
    </div>
  );
}
