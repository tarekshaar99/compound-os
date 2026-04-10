"use client";

import { useState, useEffect } from "react";

function CheckoutButton({ className }: { className?: string }) {
  const [loading, setLoading] = useState(false);

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

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className={
        className ||
        "px-8 py-4 rounded-xl bg-[var(--accent)] text-[#0a0b0f] font-bold text-base transition-all hover:opacity-90 hover:-translate-y-0.5 disabled:opacity-50"
      }
    >
      {loading ? "Redirecting..." : "Get full access - $29 one-time"}
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
    const token = localStorage.getItem("cos_access");
    setHasAccess(!!token);
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
          className="h-40 -mt-40 relative z-10"
          style={{
            background:
              "linear-gradient(to bottom, transparent, #0A0A0A)",
          }}
        />

        {/* Paywall block */}
        <div className="bg-[#0A0A0A] relative z-10 flex flex-col items-center justify-center text-center px-6 py-20 md:py-32">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl mb-6"
            style={{
              background: `color-mix(in srgb, ${accent} 12%, transparent)`,
              color: accent,
            }}
          >
            ◈
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-3">
            This is a preview
          </h2>
          <p className="text-[var(--text-secondary)] text-base md:text-lg max-w-md mb-8 leading-relaxed">
            You&apos;re seeing the first section. Get lifetime access to the full system for a one-time payment.
          </p>
          <CheckoutButton />
          <p className="mt-5 text-sm text-[var(--text-muted)]">
            One-time payment. No subscription. All future updates included.
          </p>
        </div>
      </div>
    </div>
  );
}

export { CheckoutButton };
