"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getSupabase } from "../lib/supabase";
import { track } from "../lib/track";

async function handleLogout() {
  // Fire-and-forget telemetry before we tear down auth.
  track("signout", {}, null);
  // Clear cos_session cookie server-side.
  try {
    await fetch("/api/logout", { method: "POST", credentials: "same-origin" });
  } catch {
    // Ignore - worst case the cookie expires in 30d.
  }
  // Clear Supabase session from localStorage.
  try {
    await getSupabase().auth.signOut();
  } catch {
    // Ignore.
  }
  // Hard redirect clears all in-memory state.
  window.location.href = "/";
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);

    // Real auth state comes from the httpOnly cos_session cookie,
    // queried via /api/me (which reads the cookie server-side).
    fetch("/api/me", { credentials: "same-origin" })
      .then((r) => r.json())
      .then((d) => {
        setIsLoggedIn(Boolean(d?.authenticated && (d.paid || d.admin)));
      })
      .catch(() => {})
      .finally(() => setChecking(false));

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
                  Markets
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
                <Link
                  href="/account"
                  className="hidden sm:block px-3 py-2 rounded-lg text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                >
                  Account
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-lg text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <a
                  href="/login"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  Sign In
                </a>
                <a
                  href="#pricing"
                  className="px-5 py-2 rounded-lg bg-[var(--accent)] text-[#0a0b0f] text-sm font-bold transition-all hover:opacity-90"
                >
                  Get the System
                </a>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
