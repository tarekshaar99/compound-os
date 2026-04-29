"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { conditionalEnter } from "../lib/motion";

/**
 * Editorial preview of the paid product. Tabbed by pillar, each tab
 * renders a sample module page with the same typographic vocabulary used
 * in actual lessons — Newsreader serif body, label-caps section heads,
 * hairline rules.
 *
 * Old version was a browser-chrome mock with traffic lights. The editorial
 * direction calls for "the interface recedes to let the content speak,"
 * so we drop the chrome and render the content as if you were already
 * reading a live module.
 */

type PillarKey = "markets" | "fitness" | "mindset";

interface PillarContent {
  key: PillarKey;
  label: string;
  accent: string;
  romanNumeral: string;
  /** Meta row above the title, e.g. "Lesson 3 of 8 · 18 min". */
  lessonMeta: string;
  contentTitle: string;
  contentSub: string;
  pullQuote: string;
  stats: { label: string; value: string }[];
  quickTitle: string;
  quickLines: string[];
  /** Preview of the next lesson in the path — triggers curiosity. */
  nextUp: string;
}

const PILLARS: PillarContent[] = [
  {
    key: "markets",
    label: "Markets",
    accent: "var(--accent-trading)",
    romanNumeral: "I",
    lessonMeta: "Lesson 03 of 08 · 18 min",
    contentTitle: "Finding Good Companies",
    contentSub:
      "How to spot businesses worth owning — using AI and free tools. No paid terminals required.",
    pullQuote:
      "The first question is never “is this a good trade.” It's “would I own this business?”",
    stats: [
      { label: "Core Question", value: "“Would I own this?”" },
      { label: "Research Stack", value: "AI + free tools" },
      { label: "Time to Verdict", value: "About 20 min" },
    ],
    quickTitle: "The research workflow",
    quickLines: [
      "Start with the business, not the chart. What do they actually do?",
      "Free cash flow, margins, moat — three non-negotiables.",
      "Let AI pressure-test the thesis. Ask what would make you wrong.",
      "If you can't explain the bull case in one sentence, skip it.",
    ],
    nextUp: "Capital Preservation · 14 min",
  },
  {
    key: "fitness",
    label: "Fitness",
    accent: "var(--accent-fitness)",
    romanNumeral: "II",
    lessonMeta: "Lesson 03 of 06 · 14 min",
    contentTitle: "The Weekly Split",
    contentSub:
      "Three strength days, two to three cardio sessions, mobility daily. The structure that actually works.",
    pullQuote:
      "Volume is the number that liars optimize. Tension and recovery are the numbers operators optimize.",
    stats: [
      { label: "Strength", value: "3× / week" },
      { label: "Cardio", value: "2-3× / week" },
      { label: "Mobility", value: "Daily, 10 min" },
    ],
    quickTitle: "A real operator's week",
    quickLines: [
      "Mon — Lower strength. 60-75 min. TUT tempo, no ego lifts.",
      "Tue — Zone 2 cardio. 45-60 min. Nasal breathing only.",
      "Wed — Upper strength. Press and pull pairs. Clean reps.",
      "Thu — Intervals or rest. Check readiness, not the calendar.",
      "Fri — Full-body strength. Short, heavy, focused.",
    ],
    nextUp: "Zone 2 and Intervals · 13 min",
  },
  {
    key: "mindset",
    label: "Mindset",
    accent: "var(--accent-mindset)",
    romanNumeral: "III",
    lessonMeta: "Lesson 03 of 07 · 10 min",
    contentTitle: "Daily Discipline",
    contentSub:
      "Motivation is unreliable. Systems aren't. The habits that hold everything else up.",
    pullQuote:
      "Discipline is what you do on the day you don't feel like doing it. Everything else is enthusiasm.",
    stats: [
      { label: "The Rule", value: "Never miss twice" },
      { label: "Morning Stack", value: "3 rituals" },
      { label: "Anchor", value: "First hour" },
    ],
    quickTitle: "The discipline that holds everything up",
    quickLines: [
      "Motivation is unreliable. Systems aren't. Start there.",
      "Three morning rituals, non-negotiable, before any screen.",
      "Never miss twice. One slip is human. Two is a new pattern.",
      "Protect the first hour. Your phone isn't your priority.",
    ],
    nextUp: "Trigger Awareness · 10 min",
  },
];

export default function ProductPreview() {
  const [active, setActive] = useState<PillarKey>("markets");
  const pillar = PILLARS.find((p) => p.key === active) ?? PILLARS[0];

  return (
    <div className="relative max-w-[960px] mx-auto">
      {/* Tab selector — pixel-gap row for monolithic feel */}
      <div className="grid grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)] mb-px">
        {PILLARS.map((p) => {
          const isActive = p.key === active;
          return (
            <button
              key={p.key}
              type="button"
              onClick={() => setActive(p.key)}
              className="bg-[var(--bg)] py-4 label-caps transition-colors duration-300 cursor-pointer relative"
              style={{
                color: isActive ? p.accent : "var(--text-muted)",
                background: isActive ? "var(--card-bg)" : "var(--bg)",
              }}
              aria-pressed={isActive}
            >
              <span className="block">
                §{p.romanNumeral} &middot; {p.label}
              </span>
              {isActive && (
                <motion.span
                  layoutId="preview-tab-indicator"
                  className="absolute inset-x-0 bottom-0 h-px"
                  style={{ background: p.accent }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Editorial preview frame */}
      <div className="relative bg-[var(--card-bg)] border border-[var(--border)] overflow-hidden">
        {/* Corner accents */}
        <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[var(--accent)]" />
        <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[var(--accent)]" />
        <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[var(--accent)]" />
        <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[var(--accent)]" />

        <AnimatePresence mode="wait">
          <motion.article
            key={pillar.key}
            variants={conditionalEnter}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="px-6 md:px-12 py-10 md:py-14"
          >
            {/* Lesson masthead */}
            <header className="pb-8 mb-10 border-b border-[var(--border)]">
              <span
                className="label-caps block mb-3"
                style={{ color: pillar.accent }}
              >
                {pillar.lessonMeta}
              </span>
              <h3 className="font-serif text-[28px] md:text-[40px] leading-[1.05] tracking-[-0.015em] text-[var(--text-primary)] font-light">
                {pillar.contentTitle}
              </h3>
              <p className="mt-4 font-serif italic text-[16px] md:text-[18px] text-[var(--text-secondary)] leading-[1.55] max-w-[640px]">
                {pillar.contentSub}
              </p>
            </header>

            {/* Pull quote */}
            <blockquote
              className="border-l pl-6 mb-10 font-serif italic text-[18px] md:text-[20px] leading-[1.5] text-[var(--text-primary)]"
              style={{ borderLeftColor: pillar.accent }}
            >
              {pillar.pullQuote}
            </blockquote>

            {/* Stat row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)] mb-10">
              {pillar.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-[var(--bg)] p-5"
                >
                  <span className="label-caps text-[var(--text-muted)] block mb-2">
                    {stat.label}
                  </span>
                  <span
                    className="font-serif text-[18px] md:text-[20px] tracking-tight block"
                    style={{ color: pillar.accent }}
                  >
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Quick reference list */}
            <section className="mb-10">
              <h4 className="label-caps text-[var(--text-muted)] mb-5 pb-3 border-b border-[var(--border)]">
                {pillar.quickTitle}
              </h4>
              <ul className="divide-y divide-[var(--border-soft)]">
                {pillar.quickLines.map((line, i) => (
                  <li
                    key={i}
                    className="flex items-baseline gap-4 py-3"
                  >
                    <span
                      className="label-caps shrink-0"
                      style={{ color: pillar.accent }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-serif text-[15px] md:text-[16px] text-[var(--text-secondary)] leading-[1.7]">
                      {line}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Footer: completion + next */}
            <footer className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-4 pt-6 border-t border-[var(--border)]">
              <div className="flex items-center gap-3">
                <span
                  className="w-4 h-4 border shrink-0"
                  style={{ borderColor: "var(--text-muted)" }}
                  aria-hidden
                />
                <span className="label-caps text-[var(--text-muted)]">
                  Mark complete
                </span>
              </div>
              <span
                className="label-caps"
                style={{ color: pillar.accent }}
              >
                Next &middot; {pillar.nextUp} &rarr;
              </span>
            </footer>
          </motion.article>
        </AnimatePresence>
      </div>
    </div>
  );
}
