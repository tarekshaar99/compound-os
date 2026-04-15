"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import LoginForm from "../components/LoginForm";

function SuccessContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [email, setEmail] = useState("");

  useEffect(() => {
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      setStatus("error");
      return;
    }

    fetch("/api/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_id: sessionId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.valid) {
          // Access is granted server-side by the Stripe webhook (source of truth).
          // Phase 3 replaces this localStorage flag with an httpOnly signed cookie.
          localStorage.setItem("cos_access", "1");
          if (data.email) {
            setEmail(data.email);
            localStorage.setItem("cos_email", data.email);
          }
          setStatus("success");
        } else {
          setStatus("error");
        }
      })
      .catch(() => setStatus("error"));
  }, [searchParams]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin mx-auto mb-6" />
          <p className="text-[var(--text-secondary)] text-lg">
            Verifying your payment...
          </p>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="text-4xl mb-6">⚠</div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
            Something went wrong
          </h1>
          <p className="text-[var(--text-secondary)] mb-8">
            We couldn&apos;t verify your payment. If you were charged, please
            contact us and we&apos;ll sort it out immediately.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/971585658488"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] text-sm font-medium transition-all hover:bg-[#25D366]/20"
            >
              Contact via WhatsApp
            </a>
            <Link
              href="/"
              className="px-6 py-3 rounded-xl border border-[var(--border)] text-[var(--text-primary)] text-sm font-medium transition-all hover:border-[var(--text-muted)]"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-lg">
        {/* Success header */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-full bg-[var(--accent)]/12 flex items-center justify-center mx-auto mb-6">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-3 tracking-tight">
            You&apos;re in. Welcome.
          </h1>
          <p className="text-[var(--text-secondary)] text-lg leading-relaxed max-w-md mx-auto">
            Payment confirmed. You now have lifetime access to the full Compound System.
          </p>
        </div>

        {/* Step 1: Create account */}
        <div className="bg-[var(--sidebar-bg)] border border-[var(--border)] rounded-2xl p-8 mb-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-7 h-7 rounded-full bg-[var(--accent)] text-[#0a0b0f] flex items-center justify-center text-xs font-bold shrink-0">
              1
            </div>
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              Save your access
            </h2>
          </div>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5 pl-10">
            Create your account so you can log in from any device. We&apos;ll send a magic link — no password needed.
          </p>
          <div className="pl-10">
            <LoginForm defaultEmail={email} mode="signup" compact />
          </div>
        </div>

        {/* Step 2: Choose your starting point */}
        <div className="bg-[var(--sidebar-bg)] border border-[var(--border)] rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-7 h-7 rounded-full border-2 border-[var(--text-muted)] text-[var(--text-muted)] flex items-center justify-center text-xs font-bold shrink-0">
              2
            </div>
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              Choose where to start
            </h2>
          </div>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5 pl-10">
            All three pillars are unlocked. Start with what matters most to you right now.
          </p>
          <div className="grid grid-cols-1 gap-3 pl-10">
            <Link
              href="/trading"
              className="flex items-center gap-4 px-5 py-4 rounded-xl bg-[var(--card-bg)] border border-[var(--border)] transition-all hover:border-[var(--accent-trading)]/30 hover:-translate-y-0.5 group"
            >
              <span className="text-xl" style={{ color: "#00d4aa" }}>◈</span>
              <div className="flex-1">
                <div className="text-sm font-semibold text-[var(--text-primary)]">Markets</div>
                <div className="text-xs text-[var(--text-muted)]">Investing foundations, the Wheel Strategy, macro & portfolio</div>
              </div>
              <span className="text-xs font-semibold text-[var(--accent-trading)] opacity-0 group-hover:opacity-100 transition-opacity">
                Start &rarr;
              </span>
            </Link>
            <Link
              href="/fitness"
              className="flex items-center gap-4 px-5 py-4 rounded-xl bg-[var(--card-bg)] border border-[var(--border)] transition-all hover:border-[var(--accent-fitness)]/30 hover:-translate-y-0.5 group"
            >
              <span className="text-xl" style={{ color: "#f97316" }}>⚡</span>
              <div className="flex-1">
                <div className="text-sm font-semibold text-[var(--text-primary)]">Fitness</div>
                <div className="text-xs text-[var(--text-muted)]">Hybrid athlete system, nutrition, recovery protocols</div>
              </div>
              <span className="text-xs font-semibold text-[var(--accent-fitness)] opacity-0 group-hover:opacity-100 transition-opacity">
                Start &rarr;
              </span>
            </Link>
            <Link
              href="/mindset"
              className="flex items-center gap-4 px-5 py-4 rounded-xl bg-[var(--card-bg)] border border-[var(--border)] transition-all hover:border-[var(--accent-mindset)]/30 hover:-translate-y-0.5 group"
            >
              <span className="text-xl" style={{ color: "#a78bfa" }}>◉</span>
              <div className="flex-1">
                <div className="text-sm font-semibold text-[var(--text-primary)]">Mindset</div>
                <div className="text-xs text-[var(--text-muted)]">Identity work, emotional mastery, daily practice</div>
              </div>
              <span className="text-xs font-semibold text-[var(--accent-mindset)] opacity-0 group-hover:opacity-100 transition-opacity">
                Start &rarr;
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center px-6">
          <div className="w-12 h-12 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
