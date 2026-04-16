"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Pillar } from "../lib/modules";
import { MODULES } from "../lib/modules";

/**
 * Three-step onboarding. First login after purchase only. Runs once.
 *
 *   Step 0: welcome + what this is
 *   Step 1: pick priority pillar
 *   Step 2: show recommended starting module + "Start here"
 */

const PILLAR_OPTIONS: Array<{
  id: Pillar;
  label: string;
  tagline: string;
  accent: string;
  accentBg: string;
  icon: string;
}> = [
  {
    id: "trading",
    label: "Markets",
    tagline: "Build income. Protect capital. Think in regimes.",
    accent: "#00d4aa",
    accentBg: "rgba(0, 212, 170, 0.12)",
    icon: "◈",
  },
  {
    id: "fitness",
    label: "Fitness",
    tagline: "Strength, cardio, mobility, recovery. A hybrid athlete system.",
    accent: "#f97316",
    accentBg: "rgba(249, 115, 22, 0.12)",
    icon: "⚡",
  },
  {
    id: "mindset",
    label: "Mindset",
    tagline: "Identity, regulation, discipline. The operating system for the other two.",
    accent: "#a78bfa",
    accentBg: "rgba(167, 139, 250, 0.12)",
    icon: "◉",
  },
];

export default function OnboardingClient({ email }: { email: string }) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [choice, setChoice] = useState<Pillar | null>(null);
  const [saving, setSaving] = useState(false);

  const firstModule = choice
    ? MODULES.find((m) => m.pillar === choice && m.startHere) ??
      MODULES.find((m) => m.pillar === choice && m.tier === "core")
    : null;

  const firstName = email.split("@")[0].split(/[._-]/)[0];
  const greeting = firstName.charAt(0).toUpperCase() + firstName.slice(1);

  const finish = async (andGo: "module" | "dashboard") => {
    if (!choice) return;
    setSaving(true);
    try {
      await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ priorityPillar: choice }),
      });
    } catch {
      // Even if the write fails, don't trap the user on this screen.
    }
    if (andGo === "module" && firstModule) {
      router.push(firstModule.path);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-start md:items-center justify-center px-6 py-16">
      <div className="w-full max-w-xl">
        {/* step dots */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`h-1 rounded-full transition-all ${
                i === step
                  ? "w-10 bg-[var(--accent)]"
                  : i < step
                  ? "w-6 bg-[var(--accent)]/40"
                  : "w-6 bg-white/[0.08]"
              }`}
            />
          ))}
        </div>

        {step === 0 && (
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--accent)] font-medium mb-4">
              Welcome aboard
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] tracking-tight leading-[1.1] mb-5">
              You're in, {greeting}.
            </h1>
            <p className="text-[var(--text-secondary)] text-[15px] leading-[1.75] mb-8 max-w-md mx-auto">
              Compound OS is not a course. It's a working system. Three pillars, each with Core modules you can use right away and Advanced modules that open up as you execute. Progress is saved to your account, so you can pick up on any device.
            </p>
            <p className="text-[var(--text-secondary)] text-[15px] leading-[1.75] mb-10 max-w-md mx-auto">
              This next step takes ten seconds. Pick the pillar that matters most to you right now. You can work on all three, but one will be your anchor.
            </p>
            <button
              onClick={() => setStep(1)}
              className="px-6 py-3 rounded-xl bg-[var(--accent)] text-[#0a0b0f] text-sm font-bold hover:opacity-90 transition-opacity cursor-pointer"
            >
              Pick my pillar →
            </button>
          </div>
        )}

        {step === 1 && (
          <div>
            <div className="text-center mb-8">
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)] font-medium mb-3">
                Step 2 of 3
              </p>
              <h1 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] tracking-tight leading-[1.15] mb-3">
                What are you here to solve first?
              </h1>
              <p className="text-[var(--text-secondary)] text-[14px] leading-relaxed max-w-sm mx-auto">
                Be honest. Your dashboard will anchor on this pillar until you change it.
              </p>
            </div>
            <div className="space-y-3">
              {PILLAR_OPTIONS.map((opt) => {
                const selected = choice === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setChoice(opt.id)}
                    className={`w-full text-left p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                      selected
                        ? "bg-white/[0.03]"
                        : "border-[var(--border)] bg-[var(--card-bg)] hover:border-white/[0.15]"
                    }`}
                    style={selected ? { borderColor: opt.accent } : undefined}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center text-lg font-bold shrink-0"
                        style={{ background: opt.accentBg, color: opt.accent }}
                      >
                        {opt.icon}
                      </div>
                      <div className="flex-1">
                        <div className="text-[16px] font-bold text-[var(--text-primary)] mb-0.5">
                          {opt.label}
                        </div>
                        <div className="text-[13px] text-[var(--text-muted)] leading-relaxed">
                          {opt.tagline}
                        </div>
                      </div>
                      <span
                        className={`shrink-0 w-5 h-5 rounded-full border-2 mt-1 flex items-center justify-center transition-all ${
                          selected ? "" : "border-[var(--text-muted)]"
                        }`}
                        style={selected ? { borderColor: opt.accent, background: opt.accent } : undefined}
                      >
                        {selected && (
                          <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="#0a0b0f" strokeWidth="2.5">
                            <polyline points="2 6 4.5 8.5 9 3" />
                          </svg>
                        )}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="mt-8 flex items-center justify-between">
              <button
                onClick={() => setStep(0)}
                className="text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors cursor-pointer"
              >
                ← Back
              </button>
              <button
                onClick={() => choice && setStep(2)}
                disabled={!choice}
                className="px-6 py-3 rounded-xl bg-[var(--accent)] text-[#0a0b0f] text-sm font-bold transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {step === 2 && choice && firstModule && (
          <div>
            <div className="text-center mb-8">
              <p
                className="text-xs uppercase tracking-[0.18em] font-medium mb-3"
                style={{
                  color: PILLAR_OPTIONS.find((p) => p.id === choice)?.accent,
                }}
              >
                Recommended start
              </p>
              <h1 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] tracking-tight leading-[1.15] mb-4">
                Begin with {firstModule.title}.
              </h1>
              <p className="text-[var(--text-secondary)] text-[14px] leading-relaxed max-w-md mx-auto">
                About {firstModule.estMinutes} minutes. Ends with a short action checklist so you walk away with something done, not just read.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] mb-8">
              <div className="text-[13px] uppercase tracking-widest text-[var(--text-muted)] mb-2">
                What {firstModule.title} covers
              </div>
              <div className="text-[15px] text-[var(--text-primary)] leading-[1.75]">
                {firstModule.blurb}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => finish("module")}
                disabled={saving}
                className="flex-1 px-5 py-3.5 rounded-xl bg-[var(--accent)] text-[#0a0b0f] text-sm font-bold transition-all hover:opacity-90 disabled:opacity-60 cursor-pointer"
              >
                {saving ? "Starting..." : "Start this module →"}
              </button>
              <button
                onClick={() => finish("dashboard")}
                disabled={saving}
                className="flex-1 px-5 py-3.5 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] hover:border-white/[0.15] text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-sm font-medium transition-all cursor-pointer"
              >
                Explore dashboard
              </button>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => setStep(1)}
                className="text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors cursor-pointer"
              >
                ← Pick a different pillar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
