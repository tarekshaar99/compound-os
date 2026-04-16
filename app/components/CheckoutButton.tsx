"use client";

import { useState } from "react";
import { track } from "../lib/track";

export default function CheckoutButton({
  children,
  className,
  email,
  onRequireEmail,
}: {
  children: React.ReactNode;
  className?: string;
  /** Optional email prefill — locks customer_email on the Stripe session. */
  email?: string;
  /** If provided, called when the button is clicked without an email so the
   *  parent can surface an inline form. Returning a string resolves to the
   *  collected email; returning null aborts the checkout. */
  onRequireEmail?: () => Promise<string | null>;
}) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      let emailToSend = email?.trim() ?? "";
      if (!emailToSend && onRequireEmail) {
        const collected = await onRequireEmail();
        if (!collected) {
          setLoading(false);
          return;
        }
        emailToSend = collected.trim();
      }

      track("checkout_initiated", { source: "checkout_button" }, emailToSend || null);
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailToSend ? { email: emailToSend } : {}),
      });
      const data = await res.json();
      if (res.status === 409 && data.alreadyPaid && emailToSend) {
        // Already has access — route to login with email prefilled.
        window.location.href = `/login?email=${encodeURIComponent(emailToSend)}&existing=1`;
        return;
      }
      if (data.url) {
        window.location.href = data.url;
      } else {
        setLoading(false);
      }
    } catch {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleCheckout} disabled={loading} className={className}>
      {loading ? "Redirecting..." : children}
    </button>
  );
}
