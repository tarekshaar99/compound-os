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

/**
 * Editorial Quarterly header.
 *
 * Marketing variant: brand mark + label-caps nav + ghost CTA.
 * Authed variant: brand mark + dashboard / pillar links + log out.
 *
 * Auth state is sourced from the httpOnly cos_session cookie via /api/me;
 * `checking` blocks the auth-dependent UI from flashing the wrong state on
 * first paint.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checking, setChecking] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);

    fetch("/api/me", { credentials: "same-origin" })
      .then((r) => r.json())
      .then((d) => {
        setIsLoggedIn(Boolean(d?.authenticated && (d.paid || d.admin)));
      })
      .catch(() => {})
      .finally(() => setChecking(false));

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[var(--bg)]/85 backdrop-blur-xl border-b border-[var(--border)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 h-16 md:h-20 flex items-center justify-between">
        {/* Brand mark — Fibonacci stack in champagne */}
        <Link
          href={isLoggedIn ? "/dashboard" : "/"}
          className="group flex items-center gap-3 text-[var(--text-primary)] transition-opacity hover:opacity-90"
          aria-label="Compound OS home"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 100 100"
            aria-hidden="true"
            className="shrink-0"
          >
            <rect x="35" y="23" width="30" height="14" fill="#BF9A62" />
            <rect x="25" y="43" width="50" height="14" fill="#BF9A62" />
            <rect x="10" y="63" width="80" height="14" fill="#BF9A62" />
          </svg>
          <span
            className="font-serif text-lg md:text-xl tracking-tight uppercase text-[var(--accent)]"
            style={{ letterSpacing: "0.18em" }}
          >
            Compound OS
          </span>
        </Link>

        {!checking && (
          <>
            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-2">
              {isLoggedIn ? (
                <>
                  <NavLink href="/dashboard" label="Dashboard" />
                  <NavLink
                    href="/trading"
                    label="Markets"
                    accentColor="var(--accent-trading)"
                  />
                  <NavLink
                    href="/fitness"
                    label="Fitness"
                    accentColor="var(--accent-fitness)"
                  />
                  <NavLink
                    href="/mindset"
                    label="Mindset"
                    accentColor="var(--accent-mindset)"
                  />
                  <NavLink href="/account" label="Account" />
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="ml-2 px-3 py-2 label-caps text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors duration-300 cursor-pointer"
                  >
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <NavLink href="/#whats-inside" label="System" />
                  <NavLink href="/#pricing" label="Pricing" />
                  <NavLink href="/about" label="About" />
                  <Link
                    href="/login"
                    className="ml-2 px-4 py-2 label-caps text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-300"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/#pricing"
                    className="ml-2 px-5 py-2.5 label-caps text-[var(--accent)] border border-[var(--accent)]/40 hover:border-[var(--accent)] hover:bg-[var(--accent)]/10 transition-all duration-300"
                  >
                    Founding Access
                  </Link>
                </>
              )}
            </div>

            {/* Mobile trigger */}
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="md:hidden p-2 text-[var(--accent)] cursor-pointer"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="square"
              >
                {mobileOpen ? (
                  <path d="M18 6 6 18M6 6l12 12" />
                ) : (
                  <>
                    <line x1="4" y1="9" x2="20" y2="9" />
                    <line x1="4" y1="15" x2="20" y2="15" />
                  </>
                )}
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Mobile drawer */}
      {mobileOpen && !checking && (
        <div className="md:hidden border-t border-[var(--border)] bg-[var(--bg)]">
          <nav className="px-6 py-6 flex flex-col">
            {isLoggedIn ? (
              <>
                <MobileLink
                  href="/dashboard"
                  label="Dashboard"
                  onClick={() => setMobileOpen(false)}
                />
                <MobileLink
                  href="/trading"
                  label="Markets"
                  onClick={() => setMobileOpen(false)}
                />
                <MobileLink
                  href="/fitness"
                  label="Fitness"
                  onClick={() => setMobileOpen(false)}
                />
                <MobileLink
                  href="/mindset"
                  label="Mindset"
                  onClick={() => setMobileOpen(false)}
                />
                <MobileLink
                  href="/account"
                  label="Account"
                  onClick={() => setMobileOpen(false)}
                />
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    handleLogout();
                  }}
                  className="text-left py-4 label-caps text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors border-t border-[var(--border-soft)]"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <MobileLink
                  href="/#whats-inside"
                  label="System"
                  onClick={() => setMobileOpen(false)}
                />
                <MobileLink
                  href="/#pricing"
                  label="Pricing"
                  onClick={() => setMobileOpen(false)}
                />
                <MobileLink
                  href="/about"
                  label="About"
                  onClick={() => setMobileOpen(false)}
                />
                <MobileLink
                  href="/login"
                  label="Sign In"
                  onClick={() => setMobileOpen(false)}
                />
                <Link
                  href="/#pricing"
                  onClick={() => setMobileOpen(false)}
                  className="mt-4 block px-5 py-3 label-caps text-center text-[var(--accent)] border border-[var(--accent)]/40"
                >
                  Founding Access
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

function NavLink({
  href,
  label,
  accentColor,
}: {
  href: string;
  label: string;
  accentColor?: string;
}) {
  return (
    <Link
      href={href}
      className="px-3 py-2 label-caps text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-300 relative group"
    >
      <span className="relative z-10">{label}</span>
      <span
        className="absolute bottom-1 left-3 right-3 h-px bg-[var(--accent)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
        style={accentColor ? { background: accentColor } : undefined}
      />
    </Link>
  );
}

function MobileLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="py-4 label-caps text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors border-t border-[var(--border-soft)] first:border-t-0"
    >
      {label}
    </Link>
  );
}
