"use client";

import { useState, useEffect } from "react";
import CheckoutButton from "./CheckoutButton";

export default function MobileCTA() {
  const [visible, setVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Real auth state comes from the httpOnly cos_session cookie,
    // queried via /api/me (reads the cookie server-side).
    fetch("/api/me", { credentials: "same-origin" })
      .then((r) => r.json())
      .then((d) => {
        if (d?.authenticated && (d.paid || d.admin)) {
          setIsLoggedIn(true);
        }
      })
      .catch(() => {});

    const onScroll = () => {
      // Show after scrolling past the hero (~500px)
      setVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (isLoggedIn) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 md:hidden transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="bg-[var(--bg)]/95 backdrop-blur-xl border-t border-[var(--border)] px-4 py-3 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="text-sm font-bold text-[var(--text-primary)]">Compound OS</div>
          <div className="text-xs text-[var(--text-muted)]">
            <span className="line-through text-[var(--text-muted)]/60 mr-1.5">$99</span>
            <span className="text-[var(--accent)] font-semibold">$49</span>
            <span className="ml-1.5">founding price</span>
          </div>
        </div>
        <CheckoutButton className="shrink-0 px-6 py-2.5 rounded-lg bg-[var(--accent)] text-[#0a0b0f] font-bold text-sm transition-all hover:opacity-90 cursor-pointer">
          Get Access
        </CheckoutButton>
      </div>
    </div>
  );
}
