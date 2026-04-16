"use client";

import { useState } from "react";
import { track } from "../lib/track";

/**
 * Inline email + CTA pair for the homepage pricing block.
 *
 * Why: collecting email BEFORE Stripe improves conversion (email prefilled,
 * one fewer field on Stripe page) and gives us the customer's address even
 * if they drop out of Stripe - useful for future abandoned-checkout flows.
 *
 * Submit → POST /api/checkout with {email} → redirect to Stripe.
 * Never stores the email locally - Stripe + the webhook handle that.
 */
export default function EmailCaptureCTA({
  label,
  className,
  inputClassName,
}: {
  label: string;
  className?: string;
  inputClassName?: string;
}) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = email.trim().toLowerCase();
    if (!cleaned || !cleaned.includes("@")) {
      setError("Please enter a valid email.");
      return;
    }
    setError(null);
    setLoading(true);
    track("checkout_initiated", { source: "email_capture_cta" }, cleaned);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleaned }),
      });
      const data = await res.json();
      if (res.status === 409 && data.alreadyPaid) {
        // This email already has access - send them to /login with email prefilled.
        window.location.href = `/login?email=${encodeURIComponent(cleaned)}&existing=1`;
        return;
      }
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
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col sm:flex-row gap-2 w-full max-w-md mx-auto">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          autoComplete="email"
          className={
            inputClassName ||
            "flex-1 px-4 py-3.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-[var(--text-primary)] text-[15px] outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]/30 transition-all"
          }
        />
        <button
          type="submit"
          disabled={loading}
          className={
            className ||
            "shrink-0 px-6 py-3.5 rounded-xl bg-[var(--accent)] text-[#0a0b0f] font-bold text-[15px] transition-all hover:opacity-90 disabled:opacity-50 cursor-pointer whitespace-nowrap"
          }
        >
          {loading ? "Redirecting..." : label}
        </button>
      </div>
      {error && (
        <p className="mt-3 text-sm text-[#ef4444] text-center">{error}</p>
      )}
    </form>
  );
}
