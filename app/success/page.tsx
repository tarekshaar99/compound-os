"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

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
        if (data.valid && data.token) {
          localStorage.setItem("cos_access", data.token);
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
          <p className="text-[var(--text-secondary)] text-lg">Verifying your payment...</p>
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
            We couldn&apos;t verify your payment. If you were charged, please contact us and we&apos;ll sort it out immediately.
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
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <div className="w-16 h-16 rounded-full bg-[var(--accent)]/12 flex items-center justify-center text-[var(--accent)] text-3xl mx-auto mb-6">
          ✓
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
          You&apos;re in.
        </h1>
        <p className="text-[var(--text-secondary)] text-lg mb-10 leading-relaxed">
          You now have full access to all three pillars. No subscription, no expiry. Start wherever makes sense for you.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/trading"
            className="px-6 py-4 rounded-xl bg-[var(--card-bg)] border border-[var(--border)] text-[var(--accent-trading)] font-bold transition-all hover:border-[var(--text-muted)] hover:-translate-y-0.5"
          >
            Trading
          </Link>
          <Link
            href="/fitness"
            className="px-6 py-4 rounded-xl bg-[var(--card-bg)] border border-[var(--border)] text-[var(--accent-fitness)] font-bold transition-all hover:border-[var(--text-muted)] hover:-translate-y-0.5"
          >
            Fitness
          </Link>
          <Link
            href="/mindset"
            className="px-6 py-4 rounded-xl bg-[var(--card-bg)] border border-[var(--border)] text-[var(--accent-mindset)] font-bold transition-all hover:border-[var(--text-muted)] hover:-translate-y-0.5"
          >
            Mindset
          </Link>
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
