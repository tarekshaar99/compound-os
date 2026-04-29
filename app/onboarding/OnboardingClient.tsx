"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import type { Pillar } from "../lib/modules";
import { MODULES } from "../lib/modules";
import { conditionalEnter } from "../lib/motion";

/**
 * Three-step onboarding. First login after purchase only. Runs once.
 *
 *   Step 0: welcome + what this is
 *   Step 1: pick priority pillar
 *   Step 2: show recommended starting module + "Start here"
 *
 * Visual: Editorial Quarterly direction — Newsreader serif, sharp 0px
 * corners, hairline rules, champagne accent for active states.
 */

const PILLAR_OPTIONS: Array<{
  id: Pillar;
  label: string;
  romanNumeral: string;
  tagline: string;
  accent: string;
}> = [
  {
    id: "trading",
    label: "Markets",
    romanNumeral: "I",
    tagline: "Build income. Protect capital. Think in regimes.",
    accent: "var(--accent-trading)",
  },
  {
    id: "fitness",
    label: "Fitness",
    romanNumeral: "II",
    tagline: "Strength, cardio, mobility, recovery. A hybrid athlete system.",
    accent: "var(--accent-fitness)",
  },
  {
    id: "mindset",
    label: "Mindset",
    romanNumeral: "III",
    tagline:
      "Identity, regulation, discipline. The operating system for the other two.",
    accent: "var(--accent-mindset)",
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

  // Best-effort first name from email local part. Strip trailing digits
  // (tarekshaar22 → tarekshaar) and split on common separators.
  const rawFirst = email.split("@")[0].split(/[._-]/)[0];
  const firstName = rawFirst.replace(/\d+$/, "") || rawFirst;
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

  const stepLabels = ["I. Proem", "II. Focus", "III. Module"];

  return (
    <div className="min-h-screen bg-[var(--bg)] flex flex-col px-6 py-12 md:py-16 relative overflow-hidden">
      {/* Editorial header */}
      <header className="max-w-[1200px] mx-auto w-full flex items-center justify-between mb-12 md:mb-16">
        <span
          className="font-serif italic text-[var(--accent)] text-[20px] tracking-tight"
        >
          Compound OS
        </span>
        <span className="label-caps text-[var(--text-muted)]">
          Initial Sequence
        </span>
      </header>

      <div className="max-w-[640px] mx-auto w-full flex-1 flex items-center">
        <div className="w-full">
          {/* Step indicator */}
          <div className="flex items-center justify-between gap-4 mb-12 pb-6 border-b border-[var(--border)]">
            {stepLabels.map((label, i) => (
              <span
                key={i}
                className={`label-caps transition-colors duration-300 ${
                  i === step
                    ? "text-[var(--accent)]"
                    : i < step
                      ? "text-[var(--text-secondary)]"
                      : "text-[var(--text-muted)] opacity-50"
                }`}
              >
                {label}
              </span>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="step-0"
                variants={conditionalEnter}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="text-center md:text-left"
              >
                <span className="label-caps text-[var(--accent)] block mb-6">
                  Welcome aboard
                </span>
                <h1 className="font-serif text-[44px] md:text-[64px] leading-[1.05] tracking-[-0.02em] text-[var(--text-primary)] font-light mb-6">
                  A deliberate
                  <br />
                  approach to growth.
                </h1>
                <p className="font-serif text-[17px] md:text-[18px] text-[var(--text-secondary)] leading-[1.7] mb-6">
                  Welcome to Compound OS, {greeting}. This environment is
                  designed for intentional focus. Before we configure your
                  dashboard, we&apos;ll establish your primary pillar of
                  pursuit.
                </p>
                <p className="font-serif italic text-[16px] text-[var(--text-secondary)] leading-[1.7] mb-10">
                  This next step takes ten seconds.
                </p>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-[var(--accent)] text-[var(--on-accent)] label-caps border border-[var(--accent)] hover:bg-transparent hover:text-[var(--accent)] transition-all duration-300 cursor-pointer"
                >
                  Pick my pillar
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                    &rarr;
                  </span>
                </button>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="step-1"
                variants={conditionalEnter}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="mb-10">
                  <span className="label-caps text-[var(--accent)] block mb-4">
                    Select Core Focus
                  </span>
                  <h1 className="font-serif text-[34px] md:text-[44px] leading-[1.1] tracking-[-0.015em] text-[var(--text-primary)] font-light mb-4">
                    What are you here to solve first?
                  </h1>
                  <p className="font-serif italic text-[15px] text-[var(--text-secondary)] leading-relaxed">
                    Be honest. Your dashboard will anchor on this pillar
                    until you change it.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)]">
                  {PILLAR_OPTIONS.map((opt) => {
                    const selected = choice === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setChoice(opt.id)}
                        className="bg-[var(--bg)] hover:bg-[var(--card-bg)] transition-colors duration-300 p-6 text-left group relative"
                        style={
                          selected
                            ? {
                                background: "var(--card-bg)",
                                outline: `1px solid ${opt.accent}`,
                                outlineOffset: "-1px",
                              }
                            : undefined
                        }
                      >
                        <span
                          className="label-caps block mb-3"
                          style={{ color: opt.accent }}
                        >
                          {opt.romanNumeral}
                        </span>
                        <h3
                          className="font-serif text-[22px] mb-2 transition-colors"
                          style={{
                            color: selected ? opt.accent : undefined,
                          }}
                        >
                          {opt.label}
                        </h3>
                        <p className="font-serif italic text-[13px] text-[var(--text-muted)] leading-relaxed">
                          {opt.tagline}
                        </p>
                        {selected && (
                          <span
                            className="absolute top-4 right-4 w-5 h-5 flex items-center justify-center"
                            style={{ background: opt.accent }}
                            aria-hidden="true"
                          >
                            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="#0a0b0f" strokeWidth="2.5">
                              <polyline points="2 6 4.5 8.5 9 3" />
                            </svg>
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-10 flex items-center justify-between pt-6 border-t border-[var(--border)]">
                  <button
                    type="button"
                    onClick={() => setStep(0)}
                    className="label-caps text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                  >
                    &larr; Back
                  </button>
                  <button
                    type="button"
                    onClick={() => choice && setStep(2)}
                    disabled={!choice}
                    className="group inline-flex items-center gap-3 px-7 py-3.5 bg-[var(--accent)] text-[var(--on-accent)] label-caps border border-[var(--accent)] hover:bg-transparent hover:text-[var(--accent)] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    Initialize Configuration
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                      &rarr;
                    </span>
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && choice && firstModule && (
              <motion.div
                key="step-2"
                variants={conditionalEnter}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="mb-10">
                  <span
                    className="label-caps block mb-4"
                    style={{
                      color: PILLAR_OPTIONS.find((p) => p.id === choice)
                        ?.accent,
                    }}
                  >
                    Recommended Start
                  </span>
                  <h1 className="font-serif text-[34px] md:text-[44px] leading-[1.1] tracking-[-0.015em] text-[var(--text-primary)] font-light mb-4">
                    Begin with{" "}
                    <span className="italic">{firstModule.title}</span>.
                  </h1>
                  <p className="font-serif italic text-[15px] text-[var(--text-secondary)] leading-relaxed">
                    About {firstModule.estMinutes} minutes. Ends with a
                    short action checklist so you walk away with something
                    done, not just read.
                  </p>
                </div>

                <div className="relative bg-[var(--card-bg)] border border-[var(--border)] p-6 md:p-8 mb-10">
                  <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[var(--accent)]" />
                  <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[var(--accent)]" />

                  <span className="label-caps text-[var(--text-muted)] block mb-3">
                    What this module covers
                  </span>
                  <p className="font-serif text-[15px] md:text-[16px] text-[var(--text-primary)] leading-[1.75]">
                    {firstModule.blurb}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => finish("module")}
                    disabled={saving}
                    className="group flex-1 inline-flex items-center justify-center gap-3 px-6 py-4 bg-[var(--accent)] text-[var(--on-accent)] label-caps border border-[var(--accent)] hover:bg-transparent hover:text-[var(--accent)] transition-all duration-300 disabled:opacity-60 cursor-pointer"
                  >
                    {saving ? "Starting…" : "Start this module"}
                    {!saving && (
                      <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                        &rarr;
                      </span>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => finish("dashboard")}
                    disabled={saving}
                    className="flex-1 px-6 py-4 label-caps text-[var(--text-secondary)] border border-[var(--border)] hover:border-[var(--text-primary)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
                  >
                    Explore dashboard
                  </button>
                </div>

                <div className="mt-8 text-center">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="label-caps text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                  >
                    &larr; Pick a different pillar
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Editorial footer note */}
      <footer className="max-w-[1200px] mx-auto w-full text-center mt-16 pt-8 border-t border-[var(--border)]">
        <p className="label-caps text-[var(--text-muted)]">
          &copy; MMXXVI Compound OS
        </p>
      </footer>
    </div>
  );
}
