"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
      ? `Get full access · ${pricing.display} founding`
      : `Get full access · ${pricing.display}`
    : "Get full access";

  return (
    <button
      type="button"
      onClick={handleCheckout}
      disabled={loading}
      className={
        className ||
        "group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[var(--accent)] text-[var(--on-accent)] label-caps border border-[var(--accent)] hover:bg-transparent hover:text-[var(--accent)] transition-all duration-500 disabled:opacity-50 cursor-pointer"
      }
    >
      {loading ? (
        "Redirecting…"
      ) : (
        <>
          {label}
          <span
            aria-hidden
            className="inline-block transition-transform duration-300 group-hover:translate-x-1"
          >
            &rarr;
          </span>
        </>
      )}
    </button>
  );
}

export default function Paywall({
  children,
  previewContent,
}: {
  children: React.ReactNode;
  previewContent: React.ReactNode;
  /** Reserved for future pillar-tinted variants. */
  accent?: string;
}) {
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const pathname = usePathname();
  const loginHref = pathname
    ? `/login?return=${encodeURIComponent(pathname)}`
    : "/login";

  useEffect(() => {
    // Middleware is the real gate - if this component renders, the cookie
    // was already validated server-side. This check is only for the edge case
    // where Paywall is used on a route that middleware doesn't cover. It hits
    // /api/me which reads the httpOnly cookie server-side.
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

  // Still checking - show loader to avoid flash
  if (hasAccess === null) {
    return (
      <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center">
        <div className="w-10 h-10 border border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Full access
  if (hasAccess) {
    return <>{children}</>;
  }

  // No access — show preview + paywall
  return (
    <div className="relative">
      {/* Preview section — first category only */}
      <div>{previewContent}</div>

      {/* Fade overlay + paywall CTA */}
      <div className="relative">
        {/* Gradient fade from content to bg */}
        <div
          className="h-48 -mt-48 relative z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, transparent, var(--bg))",
          }}
        />

        {/* Paywall block */}
        <div className="bg-[var(--bg)] relative z-10 flex flex-col items-center justify-center text-center px-6 py-20 md:py-32 border-t border-[var(--border)]">
          {/* Cinematic ambient glow */}
          <div
            aria-hidden
            className="absolute pointer-events-none top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] opacity-15"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(191,154,98,0.5), transparent 70%)",
              filter: "blur(120px)",
            }}
          />

          <div className="relative">
            {/* Lock — editorial mark, not a chunky padlock */}
            <span className="label-caps text-[var(--text-muted)] block mb-8">
              Reading restricted &middot; Members only
            </span>

            <h2 className="font-serif text-[34px] md:text-[48px] leading-[1.1] tracking-[-0.02em] text-[var(--text-primary)] font-light mb-5 max-w-[640px] mx-auto">
              You&apos;re reading a preview.
            </h2>
            <p className="font-serif italic text-[16px] md:text-[18px] text-[var(--text-secondary)] max-w-lg mx-auto mb-3 leading-[1.6]">
              The full system includes structured frameworks, checklists,
              and protocols across Markets, Fitness, and Mindset — built
              from years of real execution.
            </p>
            <p className="font-serif italic text-[14px] text-[var(--text-muted)] max-w-md mx-auto mb-12 leading-relaxed">
              One purchase. Lifetime access. Every future update included.
            </p>

            <CheckoutButton />

            <div className="flex flex-wrap items-baseline justify-center gap-x-8 gap-y-3 mt-10 label-caps text-[var(--text-muted)]">
              <span className="flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "var(--accent)" }}
                  aria-hidden
                />
                Instant access
              </span>
              <span className="flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "var(--accent)" }}
                  aria-hidden
                />
                No subscription
              </span>
              <span className="flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "var(--accent)" }}
                  aria-hidden
                />
                Free updates
              </span>
            </div>

            <Link
              href={loginHref}
              className="mt-10 inline-block label-caps text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
            >
              Already have access? Sign in &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export { CheckoutButton };
