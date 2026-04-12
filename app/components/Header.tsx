"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getSupabase } from "../lib/supabase";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);

    // Check auth state
    async function checkAuth() {
      // Check localStorage token first (Stripe flow)
      const token = localStorage.getItem("cos_access");
      if (token) {
        setIsLoggedIn(true);
        setChecking(false);
        return;
      }
      // Check Supabase session
      try {
        const { data: { session } } = await getSupabase().auth.getSession();
        if (session?.user) {
          setIsLoggedIn(true);
        }
      } catch {
        // Silent fail
      }
      setChecking(false);
    }
    checkAuth();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--bg)]/80 backdrop-blur-xl border-b border-[var(--border)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href={isLoggedIn ? "/dashboard" : "/"}
          className="text-base font-bold tracking-tight text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
        >
          Compound OS
        </Link>

        {!checking && (
          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  href="/trading"
                  className="hidden sm:block px-3 py-2 rounded-lg text-sm text-[var(--text-muted)] hover:text-[var(--accent-trading)] transition-colors"
                >
                  Trading
                </Link>
                <Link
                  href="/fitness"
                  className="hidden sm:block px-3 py-2 rounded-lg text-sm text-[var(--text-muted)] hover:text-[var(--accent-fitness)] transition-colors"
                >
                  Fitness
                </Link>
                <Link
                  href="/mindset"
                  className="hidden sm:block px-3 py-2 rounded-lg text-sm text-[var(--text-muted)] hover:text-[var(--accent-mindset)] transition-colors"
                >
                  Mindset
                </Link>
              </>
            ) : (
              <>
                <a
                  href="#login"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  Sign In
                </a>
                <a
                  href="#pricing"
                  className="px-5 py-2 rounded-lg bg-[var(--accent)] text-[#0a0b0f] text-sm font-bold transition-all hover:opacity-90"
                >
                  Start the System
                </a>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
