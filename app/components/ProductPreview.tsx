"use client";

import { useState } from "react";

/**
 * Public homepage preview. Tabbed mock of the paid product across all
 * three pillars. Purely illustrative; no real data.
 */

type PillarKey = "markets" | "fitness" | "mindset";

interface PillarContent {
  key: PillarKey;
  label: string;
  accent: string;
  sidebarHeading: string;
  sidebarSubheading: string;
  progressPct: number;
  sidebarItems: { icon: string; label: string; active: boolean; done: boolean }[];
  contentTitle: string;
  contentSub: string;
  stats: { label: string; value: string; sub: string }[];
  quickTitle: string;
  quickLines: string[];
  urlPath: string;
}

const PILLARS: PillarContent[] = [
  {
    key: "markets",
    label: "Markets",
    accent: "#00d4aa",
    sidebarHeading: "Markets",
    sidebarSubheading: "Investing, Trading & Macro",
    progressPct: 35,
    sidebarItems: [
      { icon: "\u2713", label: "Markets 101", active: false, done: true },
      { icon: "\u2713", label: "Investing Foundations", active: false, done: true },
      { icon: "\u27F3", label: "The Wheel Strategy", active: true, done: false },
      { icon: "\u25A1", label: "VIX Regime Framework", active: false, done: false },
      { icon: "\u25A1", label: "Pre-Trade Checklist", active: false, done: false },
      { icon: "\u25A1", label: "Capital Preservation", active: false, done: false },
      { icon: "\u25A1", label: "Weekly Review Ritual", active: false, done: false },
    ],
    contentTitle: "The Wheel Strategy",
    contentSub: "The core income engine behind the Markets system.",
    stats: [
      { label: "Core Setup", value: "CSPs \u2192 CCs", sub: "Assigned by design" },
      { label: "Target Delta", value: "20-25\u03B4", sub: "Risk-adjusted income" },
      { label: "Duration", value: "25-45d", sub: "Optimal theta window" },
    ],
    quickTitle: "Quick Reference - The Wheel",
    quickLines: [
      "1. Sell cash-secured puts on stocks you'd own at 20-25 delta.",
      "2. Get assigned. This is the plan, not a failure.",
      "3. Sell covered calls at cost basis or above, same delta.",
      "4. Adjust allocation by VIX regime. Do not force trades.",
    ],
    urlPath: "thecompoundsystem.com/trading",
  },
  {
    key: "fitness",
    label: "Fitness",
    accent: "#f97316",
    sidebarHeading: "Fitness",
    sidebarSubheading: "Hybrid Athlete System",
    progressPct: 48,
    sidebarItems: [
      { icon: "\u2713", label: "Training Philosophy", active: false, done: true },
      { icon: "\u2713", label: "Time Under Tension", active: false, done: true },
      { icon: "\u27F3", label: "The Weekly Split", active: true, done: false },
      { icon: "\u25A1", label: "Zone 2 and Intervals", active: false, done: false },
      { icon: "\u25A1", label: "Recovery and Sleep", active: false, done: false },
      { icon: "\u25A1", label: "Nutrition Framework", active: false, done: false },
      { icon: "\u25A1", label: "Peptides: An Honest Note", active: false, done: false },
    ],
    contentTitle: "The Weekly Split",
    contentSub: "Strength three times. Cardio two to three times. Mobility daily.",
    stats: [
      { label: "Strength Days", value: "3x", sub: "Lower / Upper / Full" },
      { label: "Cardio", value: "2-3x", sub: "Zone 2 and intervals" },
      { label: "Mobility", value: "Daily", sub: "10 to 15 min" },
    ],
    quickTitle: "A real operator's week",
    quickLines: [
      "Mon: Lower strength. 60-75 min. TUT tempo.",
      "Tue: Zone 2 cardio, 45-60 min, nasal breathing only.",
      "Wed: Upper strength. Press / pull pairs. No ego lifts.",
      "Thu: Intervals or rest. Check readiness, not the schedule.",
      "Fri: Full-body strength, short and heavy. No assistance.",
    ],
    urlPath: "thecompoundsystem.com/fitness",
  },
  {
    key: "mindset",
    label: "Mindset",
    accent: "#a78bfa",
    sidebarHeading: "Mindset",
    sidebarSubheading: "Identity, Regulation, Execution",
    progressPct: 60,
    sidebarItems: [
      { icon: "\u2713", label: "Identity and Self-Image", active: false, done: true },
      { icon: "\u2713", label: "Emotional Regulation", active: false, done: true },
      { icon: "\u2713", label: "Daily Discipline", active: false, done: true },
      { icon: "\u27F3", label: "Trigger Awareness", active: true, done: false },
      { icon: "\u25A1", label: "Structured Journaling", active: false, done: false },
      { icon: "\u25A1", label: "Decision-Making Under Pressure", active: false, done: false },
    ],
    contentTitle: "Trigger Awareness",
    contentSub: "The three-step protocol for catching yourself mid-pattern.",
    stats: [
      { label: "Step 1", value: "Name", sub: "What is the pattern?" },
      { label: "Step 2", value: "Delay", sub: "Install friction" },
      { label: "Step 3", value: "Replace", sub: "Pre-committed behavior" },
    ],
    quickTitle: "The three-step protocol",
    quickLines: [
      "1. Name the pattern out loud or on paper. Unnamed = automatic.",
      "2. Insert a 60-second delay before the old behavior runs.",
      "3. Replace with a smaller, pre-committed alternative.",
      "4. Log it. The pattern you track is the pattern you change.",
    ],
    urlPath: "thecompoundsystem.com/mindset",
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

      {/* Browser chrome mockup */}
      <div className="rounded-xl border border-[var(--border)] overflow-hidden bg-[var(--card-bg)] shadow-2xl shadow-black/40">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border)] bg-[var(--sidebar-bg)]">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex-1 mx-8">
            <div className="bg-[var(--bg)] rounded-md px-3 py-1 text-xs text-[var(--text-muted)] text-center max-w-xs mx-auto truncate">
              {pillar.urlPath}
            </div>
          </div>
        </div>

        {/* App layout mockup */}
        <div className="flex min-h-[400px] md:min-h-[440px]">
          {/* Sidebar */}
          <div className="hidden sm:block w-56 border-r border-[var(--border)] bg-[var(--sidebar-bg)] p-4">
            <div
              className="text-sm font-bold mb-1"
              style={{ color: pillar.accent }}
            >
              {pillar.sidebarHeading}
            </div>
            <div className="text-[10px] text-[var(--text-muted)] mb-4">
              {pillar.sidebarSubheading}
            </div>
            {/* Progress bar */}
            <div className="w-full h-1 rounded-full bg-white/[0.06] mb-4 overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${pillar.progressPct}%`,
                  background: pillar.accent,
                }}
              />
            </div>
            {pillar.sidebarItems.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-md text-[11px] mb-0.5"
                style={{
                  background: item.active
                    ? `color-mix(in srgb, ${pillar.accent} 10%, transparent)`
                    : "transparent",
                  color: item.done
                    ? pillar.accent
                    : item.active
                    ? pillar.accent
                    : "var(--text-muted)",
                  fontWeight: item.active ? 600 : 400,
                }}
              >
                <span className="min-w-[14px] text-center text-[10px]">
                  {item.done ? "\u2713" : item.icon}
                </span>
                {item.label}
              </div>
            ))}
          </div>

          {/* Content area */}
          <div className="flex-1 p-5 md:p-8">
            <div className="text-lg md:text-xl font-bold text-[var(--text-primary)] mb-1">
              {pillar.contentTitle}
            </div>
            <div className="text-xs text-[var(--text-secondary)] mb-5">
              {pillar.contentSub}
            </div>

            {/* Stat boxes */}
            <div className="flex flex-wrap gap-2.5 mb-5">
              {pillar.stats.map((stat, i) => (
                <div
                  key={i}
                  className="flex-1 min-w-[100px] bg-[var(--sidebar-bg)] border border-[var(--border)] rounded-lg p-3"
                >
                  <div className="text-[9px] text-[var(--text-muted)] uppercase tracking-wider">
                    {stat.label}
                  </div>
                  <div
                    className="text-sm font-bold mt-1"
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

            {/* Quick Reference */}
            <div className="bg-[var(--sidebar-bg)] border border-[var(--border)] rounded-lg p-4">
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

            {/* Mark complete row */}
            <div className="mt-5 flex items-center gap-2">
              <div
                className="w-4 h-4 rounded border-2"
                style={{ borderColor: "var(--text-muted)" }}
              />
              <span className="text-[11px] text-[var(--text-muted)]">
                Mark as complete
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[var(--bg)] to-transparent rounded-b-xl pointer-events-none" />
    </div>
  );
}
