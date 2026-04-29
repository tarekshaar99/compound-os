"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import LoginForm from "../components/LoginForm";
import BrandMark from "../components/BrandMark";
import Reveal from "../components/motion/Reveal";
import { trackPurchase } from "../lib/ads-client";

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

    // /api/verify mints the signed httpOnly cos_session cookie on success.
    // We don't touch localStorage - the cookie is the trust boundary.
    fetch("/api/verify", {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_id: sessionId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.valid) {
          if (data.email) setEmail(data.email);
          setStatus("success");

          // Fire client-side Purchase conversion event for Meta /
          // Google / TikTok pixels. Server-side webhook fires the same
          // event with the same eventId for dedupe; sessionStorage
          // gates against re-firing if the user refreshes /success.
          //
          // eventId is only present on the slow-path response (when
          // verify fetched the Stripe session itself). On the fast
          // path, the webhook already fired server-side, so we skip
          // the client fire to avoid double-counting.
          if (data.eventId && typeof window !== "undefined") {
            const guardKey = `cos_purchase_fired_${sessionId}`;
            if (!window.sessionStorage.getItem(guardKey)) {
              trackPurchase({
                eventId: data.eventId,
                email: data.email ?? null,
                value: 49,
                currency: "USD",
              });
              window.sessionStorage.setItem(guardKey, "1");
            }
          }
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
          <div className="w-10 h-10 border border-[var(--accent)] border-t-transparent rounded-full animate-spin mx-auto mb-6" />
          <p className="font-serif italic text-[16px] text-[var(--text-secondary)]">
            Verifying your payment…
          </p>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <span className="font-serif text-[44px] block mb-4 text-[var(--accent)]/40">
            &mdash;
          </span>
          <h1 className="font-serif text-[34px] text-[var(--text-primary)] mb-4 font-light">
            Something went wrong.
          </h1>
          <p className="font-serif italic text-[16px] text-[var(--text-secondary)] mb-10 leading-relaxed">
            We couldn&apos;t verify your payment. If you were charged, please
            contact us and we&apos;ll sort it out immediately.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="mailto:tarek@thecompoundsystem.com"
              className="px-6 py-3 label-caps text-[var(--accent)] border border-[var(--accent)] hover:bg-[var(--accent)]/10 transition-all"
            >
              Email Support
            </a>
            <Link
              href="/"
              className="px-6 py-3 label-caps text-[var(--text-secondary)] border border-[var(--border)] hover:border-[var(--text-primary)] transition-all"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden">
      {/* Cinematic ambient glow */}
      <div
        aria-hidden
        className="absolute pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-15 rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, rgba(191,154,98,0.55), transparent 65%)",
          filter: "blur(120px)",
        }}
      />

      <div className="relative w-full max-w-xl">
        {/* Brand mark + headline */}
        <Reveal>
          <div className="text-center mb-10">
            {/* Brand mark — three-tower spire in gold gradient */}
            <div className="mx-auto mb-8 inline-block">
              <BrandMark size={72} />
            </div>
            <h1 className="font-serif text-[44px] md:text-[56px] leading-[1.05] tracking-[-0.02em] text-[var(--text-primary)] font-light">
              <span className="font-serif italic font-light text-[var(--accent)] mr-3">The</span>
              system is yours.
            </h1>
            <Reveal delay={0.2}>
              <div className="h-px w-12 bg-[var(--accent)] mx-auto my-8" />
              <p className="font-serif italic text-[16px] md:text-[18px] text-[var(--text-secondary)] leading-relaxed max-w-md mx-auto">
                Your transaction is complete. The digital architecture has
                been provisioned. Save your access below.
              </p>
            </Reveal>
          </div>
        </Reveal>

        {/* Step 1: Save access */}
        <Reveal delay={0.4}>
          <div className="relative bg-[var(--card-bg)] border border-[var(--border)] p-8 md:p-10 mb-5">
            {/* Corner accents */}
            <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[var(--accent)]" />
            <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[var(--accent)]" />
            <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[var(--accent)]" />
            <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[var(--accent)]" />

            <div className="flex items-baseline gap-4 mb-5">
              <span className="label-caps text-[var(--accent)] shrink-0">
                Step I
              </span>
              <h2 className="font-serif text-[22px] md:text-[26px] text-[var(--text-primary)] font-light">
                Save your access.
              </h2>
            </div>
            <p className="font-serif italic text-[14px] text-[var(--text-secondary)] leading-relaxed mb-6 pl-12">
              Create your account so you can sign in from any device.
            </p>
            <div className="pl-12">
              <LoginForm defaultEmail={email} mode="signup" compact />
            </div>
          </div>
        </Reveal>

        {/* Step 2: Choose pillar */}
        <Reveal delay={0.55}>
          <div className="bg-[var(--card-bg)] border border-[var(--border)] p-8 md:p-10">
            <div className="flex items-baseline gap-4 mb-5">
              <span className="label-caps text-[var(--text-muted)] shrink-0">
                Step II
              </span>
              <h2 className="font-serif text-[22px] md:text-[26px] text-[var(--text-primary)] font-light">
                Choose where to start.
              </h2>
            </div>
            <p className="font-serif italic text-[14px] text-[var(--text-secondary)] leading-relaxed mb-6 pl-12">
              All three pillars are unlocked. Start with what matters most
              to you right now.
            </p>
            <div className="grid grid-cols-1 gap-px bg-[var(--border)] border border-[var(--border)] ml-12">
              <PillarLink
                href="/trading"
                label="Markets"
                accent="var(--accent-trading)"
                description="Investing foundations, the Wheel Strategy, VIX framework, weekly review"
              />
              <PillarLink
                href="/fitness"
                label="Fitness"
                accent="var(--accent-fitness)"
                description="Hybrid athlete system, weekly split, Zone 2 & intervals, recovery"
              />
              <PillarLink
                href="/mindset"
                label="Mindset"
                accent="var(--accent-mindset)"
                description="Identity, emotional regulation, daily discipline, the operator's week"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

function PillarLink({
  href,
  label,
  accent,
  description,
}: {
  href: string;
  label: string;
  accent: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-baseline gap-5 px-5 py-5 bg-[var(--bg)] hover:bg-[var(--card-bg-2)] transition-colors duration-300 group"
    >
      <span
        className="label-caps shrink-0 w-20"
        style={{ color: accent }}
      >
        {label}
      </span>
      <span className="font-serif text-[14px] text-[var(--text-secondary)] leading-relaxed flex-1">
        {description}
      </span>
      <span
        className="label-caps shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ color: accent }}
      >
        Begin &rarr;
      </span>
    </Link>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center px-6">
          <div className="w-10 h-10 border border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
