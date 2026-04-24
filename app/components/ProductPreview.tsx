"use client";

import { useState } from "react";

/**
 * Public homepage preview. Tabbed mock of the paid product across all
 * three pillars. Purely illustrative; no real data.
 *
 * The sidebar items, active lesson, and module ordering mirror the real
 * modules defined in app/lib/modules.ts. We deliberately showcase an
 * approachable lesson per pillar (not the most advanced one) so the
 * preview pulls the viewer in instead of scaring them off.
 */

type PillarKey = "markets" | "fitness" | "mindset";

interface PillarContent {
  key: PillarKey;
  label: string;
  accent: string;
  sidebarHeading: string;
  sidebarSubheading: string;
  progressPct: number;
  sidebarItems: { label: string; active: boolean; done: boolean }[];
  /** Meta row above the title, e.g. "Lesson 3 of 8 · 18 min". */
  lessonMeta: string;
  contentTitle: string;
  contentSub: string;
  stats: { label: string; value: string; sub: string }[];
  quickTitle: string;
  quickLines: string[];
  /** Preview of the next lesson in the path — triggers curiosity. */
  nextUp: string;
  urlPath: string;
}

const PILLARS: PillarContent[] = [
  {
    key: "markets",
    label: "Markets",
    accent: "#00d4aa",
    sidebarHeading: "Markets",
    sidebarSubheading: "Capital, regimes, income",
    progressPct: 32,
    sidebarItems: [
      { label: "Markets 101: Terms and Tools", active: false, done: true },
      { label: "Investing Foundations", active: false, done: true },
      { label: "Finding Good Companies", active: true, done: false },
      { label: "Capital Preservation", active: false, done: false },
      { label: "The Pre-Trade Checklist", active: false, done: false },
      { label: "The Wheel Strategy", active: false, done: false },
      { label: "VIX Regime Framework", active: false, done: false },
      { label: "Weekly Review Ritual", active: false, done: false },
    ],
    lessonMeta: "Lesson 3 of 8 \u00B7 18 min",
    contentTitle: "Finding Good Companies",
    contentSub:
      "How to spot businesses worth owning \u2014 using AI and free tools. No paid terminals required.",
    stats: [
      {
        label: "Core Question",
        value: "\u201CWould I own this?\u201D",
        sub: "Before anything else",
      },
      {
        label: "Research Stack",
        value: "AI + free tools",
        sub: "No paid terminals",
      },
      {
        label: "Time to Verdict",
        value: "~20 min",
        sub: "Ticker to decision",
      },
    ],
    quickTitle: "The research workflow",
    quickLines: [
      "1. Start with the business, not the chart. What do they actually do?",
      "2. Free cash flow, margins, moat \u2014 three non-negotiables.",
      "3. Let AI pressure-test the thesis. Ask what would make you wrong.",
      "4. If you can't explain the bull case in one sentence, skip it.",
    ],
    nextUp: "Next: Capital Preservation \u00B7 14 min",
    urlPath: "thecompoundsystem.com/trading/m/finding-companies",
  },
  {
    key: "fitness",
    label: "Fitness",
    accent: "#f97316",
    sidebarHeading: "Fitness",
    sidebarSubheading: "Strength, cardio, recovery",
    progressPct: 42,
    sidebarItems: [
      { label: "Training Philosophy", active: false, done: true },
      { label: "Time Under Tension", active: false, done: true },
      { label: "The Weekly Split", active: true, done: false },
      { label: "Zone 2 and Intervals", active: false, done: false },
      { label: "Recovery and Sleep", active: false, done: false },
      { label: "Peptides: An Honest Note", active: false, done: false },
    ],
    lessonMeta: "Lesson 3 of 6 \u00B7 14 min",
    contentTitle: "The Weekly Split",
    contentSub:
      "Three strength days, two to three cardio sessions, mobility daily. The structure that actually works.",
    stats: [
      {
        label: "Strength",
        value: "3x / week",
        sub: "Lower / Upper / Full",
      },
      {
        label: "Cardio",
        value: "2-3x / week",
        sub: "Zone 2 + intervals",
      },
      {
        label: "Mobility",
        value: "Daily",
        sub: "10-15 min",
      },
    ],
    quickTitle: "A real operator's week",
    quickLines: [
      "Mon \u2014 Lower strength. 60-75 min. TUT tempo, no ego lifts.",
      "Tue \u2014 Zone 2 cardio. 45-60 min. Nasal breathing only.",
      "Wed \u2014 Upper strength. Press and pull pairs. Clean reps.",
      "Thu \u2014 Intervals or rest. Check readiness, not the calendar.",
      "Fri \u2014 Full-body strength. Short, heavy, focused.",
    ],
    nextUp: "Next: Zone 2 and Intervals \u00B7 13 min",
    urlPath: "thecompoundsystem.com/fitness/m/weekly-split",
  },
  {
    key: "mindset",
    label: "Mindset",
    accent: "#a78bfa",
    sidebarHeading: "Mindset",
    sidebarSubheading: "Identity, regulation, discipline",
    progressPct: 38,
    sidebarItems: [
      { label: "Identity and Self-Image", active: false, done: true },
      { label: "Emotional Regulation", active: false, done: true },
      { label: "Daily Discipline", active: true, done: false },
      { label: "Trigger Awareness", active: false, done: false },
      { label: "Structured Journaling", active: false, done: false },
      { label: "Decision-Making Under Pressure", active: false, done: false },
      { label: "The Operator\u2019s Week", active: false, done: false },
    ],
    lessonMeta: "Lesson 3 of 7 \u00B7 10 min",
    contentTitle: "Daily Discipline",
    contentSub:
      "Motivation is unreliable. Systems aren\u2019t. The habits that hold everything else up.",
    stats: [
      {
        label: "The Rule",
        value: "Never miss twice",
        sub: "One slip is life",
      },
      {
        label: "Morning Stack",
        value: "3 rituals",
        sub: "Before any screen",
      },
      {
        label: "Anchor",
        value: "First hour",
        sub: "Protect it",
      },
    ],
    quickTitle: "The discipline that holds everything up",
    quickLines: [
      "1. Motivation is unreliable. Systems aren\u2019t. Start there.",
      "2. Three morning rituals, non-negotiable, before any screen.",
      "3. Never miss twice. One slip is human. Two is a new pattern.",
      "4. Protect the first hour. Your phone isn\u2019t your priority.",
    ],
    nextUp: "Next: Trigger Awareness \u00B7 10 min",
    urlPath: "thecompoundsystem.com/mindset/m/discipline",
  },
];

export default function ProductPreview() {
  const [active, setActive] = useState<PillarKey>("markets");
  const pillar = PILLARS.find((p) => p.key === active) ?? PILLARS[0];

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Tab switcher */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex p-1 rounded-full border border-[var(--border)] bg-[var(--card-bg)]">
          {PILLARS.map((p) => {
            const isActive = p.key === active;
            return (
              <button
                key={p.key}
                onClick={() => setActive(p.key)}
                className="px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold transition-all cursor-pointer"
                style={{
                  background: isActive
                    ? `color-mix(in srgb, ${p.accent} 14%, transparent)`
                    : "transparent",
                  color: isActive ? p.accent : "var(--text-muted)",
                }}
              >
                {p.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Outer wrapper: holds the pillar-keyed accent glow behind the browser chrome */}
      <div className="relative">
        {/* Accent glow — soft, blurred, pillar-colored */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-6 rounded-[32px] blur-2xl transition-colors duration-500"
          style={{
            background: `radial-gradient(60% 60% at 50% 40%, ${pillar.accent}22 0%, transparent 70%)`,
          }}
        />

        {/* Browser chrome mockup */}
        <div
          className="relative rounded-xl border overflow-hidden bg-[var(--card-bg)] shadow-2xl shadow-black/50 transition-colors duration-500"
          style={{
            borderColor: `color-mix(in srgb, ${pillar.accent} 18%, var(--border))`,
          }}
        >
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border)] bg-[var(--sidebar-bg)]">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            </div>
            <div className="flex-1 mx-8">
              <div className="bg-[var(--bg)] rounded-md px-3 py-1 text-[11px] text-[var(--text-muted)] text-center max-w-sm mx-auto truncate">
                {pillar.urlPath}
              </div>
            </div>
          </div>

          {/* App layout mockup */}
          <div className="flex min-h-[460px] md:min-h-[500px]">
            {/* Sidebar */}
            <div className="hidden sm:flex flex-col w-60 border-r border-[var(--border)] bg-[var(--sidebar-bg)] p-4">
              <div
                className="text-sm font-bold mb-1"
                style={{ color: pillar.accent }}
              >
                {pillar.sidebarHeading}
              </div>
              <div className="text-[10px] text-[var(--text-muted)] mb-3">
                {pillar.sidebarSubheading}
              </div>

              {/* Progress row: bar + percentage */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex-1 h-1 rounded-full bg-white/[0.06] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${pillar.progressPct}%`,
                      background: pillar.accent,
                    }}
                  />
                </div>
                <span
                  className="text-[10px] font-semibold tabular-nums"
                  style={{ color: pillar.accent }}
                >
                  {pillar.progressPct}%
                </span>
              </div>

              {pillar.sidebarItems.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-md text-[11px] mb-0.5 transition-all"
                  style={{
                    background: item.active
                      ? `color-mix(in srgb, ${pillar.accent} 12%, transparent)`
                      : "transparent",
                    borderLeft: item.active
                      ? `2px solid ${pillar.accent}`
                      : "2px solid transparent",
                    color: item.done
                      ? pillar.accent
                      : item.active
                        ? pillar.accent
                        : "var(--text-muted)",
                    fontWeight: item.active ? 600 : 400,
                    marginLeft: item.active ? "-2px" : "0",
                  }}
                >
                  <span className="min-w-[12px] text-center text-[10px] leading-none">
                    {item.done ? (
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        stroke={pillar.accent}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="1.5 5 4 7.5 8.5 2.5" />
                      </svg>
                    ) : item.active ? (
                      <span
                        className="inline-block w-1.5 h-1.5 rounded-full"
                        style={{ background: pillar.accent }}
                      />
                    ) : (
                      <span className="inline-block w-1.5 h-1.5 rounded-full border border-[var(--text-muted)]/40" />
                    )}
                  </span>
                  <span className="truncate">{item.label}</span>
                </div>
              ))}
            </div>

            {/* Content area */}
            <div className="flex-1 p-5 md:p-8">
              {/* Lesson meta row */}
              <div
                className="text-[10px] font-semibold uppercase tracking-[0.18em] mb-2"
                style={{ color: pillar.accent }}
              >
                {pillar.lessonMeta}
              </div>

              <div className="text-lg md:text-xl font-bold text-[var(--text-primary)] mb-1 tracking-tight">
                {pillar.contentTitle}
              </div>
              <div className="text-xs text-[var(--text-secondary)] mb-5 leading-relaxed max-w-md">
                {pillar.contentSub}
              </div>

              {/* Stat boxes */}
              <div className="flex flex-wrap gap-2.5 mb-5">
                {pillar.stats.map((stat, i) => (
                  <div
                    key={i}
                    className="flex-1 min-w-[110px] bg-[var(--sidebar-bg)] border border-[var(--border)] rounded-lg p-3"
                  >
                    <div className="text-[9px] text-[var(--text-muted)] uppercase tracking-wider">
                      {stat.label}
                    </div>
                    <div
                      className="text-sm font-bold mt-1 tabular-nums"
                      style={{ color: pillar.accent }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-[9px] text-[var(--text-muted)] mt-0.5">
                      {stat.sub}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Reference — accent-tinted left border pulls the eye */}
              <div
                className="bg-[var(--sidebar-bg)] border border-[var(--border)] rounded-lg p-4 relative overflow-hidden"
                style={{ borderLeftWidth: "3px", borderLeftColor: pillar.accent }}
              >
                <div className="text-xs font-semibold text-[var(--text-primary)] mb-2">
                  {pillar.quickTitle}
                </div>
                <div className="space-y-1.5">
                  {pillar.quickLines.map((line, i) => (
                    <div
                      key={i}
                      className="text-[10px] md:text-[11px] text-[var(--text-secondary)] leading-relaxed"
                    >
                      {line}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom row: mark complete + next up */}
              <div className="mt-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded border-2"
                    style={{ borderColor: "var(--text-muted)" }}
                  />
                  <span className="text-[11px] text-[var(--text-muted)]">
                    Mark as complete
                  </span>
                </div>
                <div
                  className="text-[10px] md:text-[11px] font-medium tabular-nums hidden sm:block"
                  style={{ color: pillar.accent }}
                >
                  {pillar.nextUp} &rarr;
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[var(--bg)] to-transparent rounded-b-xl pointer-events-none" />
    </div>
  );
}
