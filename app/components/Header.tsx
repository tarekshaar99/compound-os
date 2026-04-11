"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
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
          href="/"
          className="text-base font-bold tracking-tight text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
        >
          Compound OS
        </Link>

        <div className="flex items-center gap-4">
          <a
            href="#login"
            className="px-5 py-2 rounded-lg text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            Sign In
          </a>
          <a
            href="#pricing"
            className="px-5 py-2 rounded-lg bg-[var(--accent)] text-[#0a0b0f] text-sm font-bold transition-all hover:opacity-90"
          >
            Get Access
          </a>
        </div>
      </div>
    </header>
  );
}
