"use client";

import { useState, useEffect } from "react";
import CheckoutButton from "./CheckoutButton";

export default function MobileCTA() {
  const [visible, setVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Don't show if user is already a member
    const token = localStorage.getItem("cos_access");
    if (token) {
      setIsLoggedIn(true);
      return;
    }

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
          <div className="text-xs text-[var(--text-muted)]">$29 one-time</div>
        </div>
        <CheckoutButton className="shrink-0 px-6 py-2.5 rounded-lg bg-[var(--accent)] text-[#0a0b0f] font-bold text-sm transition-all hover:opacity-90 cursor-pointer">
          Get Access
        </CheckoutButton>
      </div>
    </div>
  );
}
