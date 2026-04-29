"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import LoginForm from "../components/LoginForm";
import Reveal from "../components/motion/Reveal";

function LoginPageInner() {
  const params = useSearchParams();
  // Set when /api/checkout bounces a user who already has access.
  const existing = params.get("existing") === "1";
  const emailParam = params.get("email") ?? "";
  const returnParam = params.get("return") ?? undefined;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16">
      {/* Soft champagne wash behind everything */}
      <div
        aria-hidden
        className="absolute pointer-events-none top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] opacity-15"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(191,154,98,0.5), transparent 70%)",
          filter: "blur(120px)",
        }}
      />

      <div className="relative w-full max-w-md">
        <Reveal>
          <div className="text-center mb-12">
            <Link
              href="/"
              className="inline-flex items-center gap-3 group"
              aria-label="Back to Compound OS home"
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
              <span className="font-serif text-base uppercase tracking-[0.18em] text-[var(--accent)] group-hover:opacity-80 transition-opacity">
                Compound OS
              </span>
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="text-center mb-10">
            <h1 className="font-serif text-[34px] md:text-[44px] leading-[1.15] tracking-[-0.015em] text-[var(--text-primary)] font-light mb-4">
              {existing ? "Welcome back to the system." : "Welcome back to the system."}
            </h1>
            <p className="font-serif italic text-[16px] text-[var(--text-secondary)] leading-relaxed max-w-sm mx-auto">
              {existing
                ? "This email is already a member. We'll send you a 6-digit sign-in code — no new purchase needed."
                : "Access your quarterly intelligence."}
            </p>
          </div>
        </Reveal>

        {/* Hairline rule */}
        <Reveal delay={0.3} className="flex justify-center mb-8">
          <div className="h-px w-12 bg-[var(--accent)]" />
        </Reveal>

        <Reveal delay={0.4}>
          <LoginForm defaultEmail={emailParam} redirectTo={returnParam} />
        </Reveal>

        <Reveal delay={0.55}>
          <p className="text-center label-caps text-[var(--text-muted)] mt-8">
            {existing ? (
              <>
                Wrong email?{" "}
                <Link
                  href="/#pricing"
                  className="text-[var(--accent)] hover:opacity-80 transition-opacity border-b border-[var(--accent)]/30 pb-0.5"
                >
                  Use a different one
                </Link>
              </>
            ) : (
              <>
                Don&apos;t have access yet?{" "}
                <Link
                  href="/#pricing"
                  className="text-[var(--accent)] hover:opacity-80 transition-opacity border-b border-[var(--accent)]/30 pb-0.5"
                >
                  Get Compound OS
                </Link>
              </>
            )}
          </p>
        </Reveal>

        <Reveal delay={0.7}>
          <p className="text-center font-serif italic text-[12px] text-[var(--text-muted)] mt-12">
            Entry is restricted to active members.
          </p>
        </Reveal>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginPageInner />
    </Suspense>
  );
}
