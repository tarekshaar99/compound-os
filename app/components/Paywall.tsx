"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface PricingLite {
  display: string;
  isFounding: boolean;
}

function CheckoutButton({ className }: { className?: string }) {
  const [loading, setLoading] = useState(false);
  const [pricing, setPricing] = useState<PricingLite | null>(null);

  useEffect(() => {
    fetch("/api/pricing", { credentials: "same-origin" })
      .then((r) => r.json())
      .then((d) => setPricing(d))
      .catch(() => {});
  }, []);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      setLoading(false);
    }
  };

  const label = pricing
    ? pricing.isFounding
      ? `Get full access — ${pricing.display} (founding price)`
      : `Get full access — ${pricing.display} one-time`
    : "Get full access";

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className={
        className ||
        "px-8 py-4 rounded-xl bg-[var(--accent)] text-[#0a0b0f] font-bold text-base transition-all hover:opacity-90 hover:-translate-y-0.5 disabled:opacity-50 cursor-pointer"
      }
    >
      {loading ? "Redirecting..." : label}
    </button>
  );
}

export default function Paywall({
  children,
  previewContent,
  accent = "var(--accent)",
}: {
  children: React.ReactNode;
  previewContent: React.ReactNode;
  accent?: string;
}) {
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);

  useEffect(() => {
    // Middleware is the real gate — if this component renders, the cookie
    // was already validated server-side. This check is only for the edge case
    // where Paywall is used on a route that middleware doesn't cover (e.g.,
    // an embedded preview on a marketing page). It hits /api/me which reads
    // the httpOnly cookie server-side.
    let cancelled = false;
    fetch("/api/me", { credentials: "same-origin" })
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        setHasAccess(Boolean(data?.authenticated && (data.paid || data.admin)));
      })
      .catch(() => {
        if (!cancelled) setHasAccess(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Still checking - show nothing to avoid flash
  if (hasAccess === null) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Full access
  if (hasAccess) {
    return <>{children}</>;
  }

  // No access - show preview + paywall
  return (
    <div className="relative">
      {/* Preview section - first category only */}
      <div>{previewContent}</div>

      {/* Fade overlay + paywall CTA */}
      <div className="relative">
        {/* Gradient fade from content to blur */}
        <div
          className="h-48 -mt-48 relative z-10"
          style={{
            background:
              "linear-gradient(to bottom, transparent, #0A0A0A)",
          }}
        />

        {/* Paywall block */}
        <div className="bg-[#0A0A0A] relative z-10 flex flex-col items-center justify-center text-center px-6 py-20 md:py-32">
          {/* Lock icon */}
          <div className="w-14 h-14 rounded-full border-2 border-white/[0.08] flex items-center justify-center mb-8">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--text-muted)]">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-3 tracking-tight">
            You&apos;re seeing a preview
          </h2>
          <p className="text-[var(--text-secondary)] text-base md:text-lg max-w-lg mb-3 leading-relaxed">
            The full system includes structured frameworks, checklists, and protocols across Trading, Fitness, and Mindset — built from years of real execution.
          </p>
          <p className="text-[var(--text-muted)] text-sm max-w-md mb-8 leading-relaxed">
            One purchase. Lifetime access. Every future update included.
          </p>

          <CheckoutButton />

          <div className="flex items-center gap-6 mt-6 text-xs text-[var(--text-muted)]">
            <span className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--accent)]">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Instant access
            </span>
            <span className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--accent)]">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              No subscription
            </span>
            <span className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--accent)]">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Free updates
            </span>
          </div>

          <Link
            href="/login"
            className="mt-8 text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
          >
            Already have access? Sign in &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

export { CheckoutButton };
