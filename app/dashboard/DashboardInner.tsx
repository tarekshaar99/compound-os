"use client";

import Link from "next/link";
import type { Pillar } from "../lib/modules";

const PILLAR_META: Record<
  Pillar,
  { label: string; accent: string; icon: string; href: string; tagline: string }
> = {
  trading: {
    label: "Markets",
    accent: "#00d4aa",
    icon: "◈",
    href: "/trading",
    tagline: "Capital, regimes, income",
  },
  fitness: {
    label: "Fitness",
    accent: "#f97316",
    icon: "⚡",
    href: "/fitness",
    tagline: "Strength, cardio, recovery",
  },
  mindset: {
    label: "Mindset",
    accent: "#a78bfa",
    icon: "◉",
    href: "/mindset",
    tagline: "Identity, regulation, discipline",
  },
};

interface PillarBreakdown {
  pillar: Pillar;
  stats: { completed: number; total: number; pct: number };
  modules: Array<{
    id: string;
    title: string;
    tier: "core" | "advanced";
    completed: boolean;
    locked: boolean;
    path: string;
  }>;
}

export default function DashboardInner({
  displayName,
  priorityPillar,
  lastModule,
  nextModule,
  pillarBreakdown,
  totalCompleted,
  totalModules,
}: {
  displayName: string | null;
  priorityPillar: Pillar | null;
  lastModule: {
    id: string;
    title: string;
    pillar: Pillar;
    path: string;
  } | null;
  nextModule: {
    id: string;
    title: string;
    blurb: string;
    pillar: Pillar;
    path: string;
    estMinutes: number;
  } | null;
  pillarBreakdown: PillarBreakdown[];
  totalCompleted: number;
  totalModules: number;
}) {
  const overallPct = totalModules === 0 ? 0 : Math.round((totalCompleted / totalModules) * 100);
  const isFresh = totalCompleted === 0;

  return (
    <div className="max-w-5xl mx-auto px-6 pt-24 pb-20">
      {/* Welcome */}
      <div className="flex items-start justify-between gap-6 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] tracking-tight">
            {isFresh
              ? displayName
                ? `Let's get to work, ${displayName}.`
                : "Let's get to work."
              : displayName
                ? `Welcome back, ${displayName}.`
                : "Welcome back."}
          </h1>
          <p className="text-sm text-[var(--text-muted)] mt-1.5">
            {isFresh
              ? "Start with what's recommended. Momentum compounds."
              : overallPct >= 100
                ? "Every module complete. Come back for updates."
                : `${totalCompleted} of ${totalModules} modules complete.`}
          </p>
        </div>
        {!isFresh && (
          <div className="shrink-0 hidden sm:flex items-center gap-3 px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--card-bg)]">
            <div className="relative w-10 h-10">
              <svg className="w-10 h-10 -rotate-90" viewBox="0 0 40 40">
                <circle cx="20" cy="20" r="17" fill="none" stroke="var(--border)" strokeWidth="3" />
                <circle
                  cx="20"
                  cy="20"
                  r="17"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 17}`}
                  strokeDashoffset={`${2 * Math.PI * 17 * (1 - overallPct / 100)}`}
                  className="transition-all duration-700"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-[var(--text-primary)] tabular-nums">
                {overallPct}%
              </span>
            </div>
            <div>
              <div className="text-[11px] text-[var(--text-muted)] uppercase tracking-widest">Overall</div>
              <div className="text-sm font-semibold text-[var(--text-primary)] tabular-nums">
                {totalCompleted}/{totalModules}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Today's priority: big anchor card */}
      {nextModule && (
        <section className="mb-10">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)] mb-3">
            Today's priority
          </h2>
          <Link
            href={nextModule.path}
            className="block p-6 md:p-7 rounded-2xl border border-[var(--accent)]/30 bg-gradient-to-br from-[var(--accent)]/[0.06] to-transparent hover:border-[var(--accent)]/50 transition-all group"
          >
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0"
                style={{
                  background: `${PILLAR_META[nextModule.pillar].accent}20`,
                  color: PILLAR_META[nextModule.pillar].accent,
                }}
              >
                {PILLAR_META[nextModule.pillar].icon}
              </div>
              <div className="flex-1 min-w-0">
                <div
                  className="text-[11px] uppercase tracking-widest font-medium mb-2"
                  style={{ color: PILLAR_META[nextModule.pillar].accent }}
                >
                  {PILLAR_META[nextModule.pillar].label}
                  <span className="text-[var(--text-muted)]"> &middot; {nextModule.estMinutes} min</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] leading-tight mb-2">
                  {nextModule.title}
                </h3>
                <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed max-w-lg">
                  {nextModule.blurb}
                </p>
              </div>
              <span
                className="hidden sm:flex self-center text-sm font-semibold shrink-0 group-hover:translate-x-0.5 transition-transform"
                style={{ color: PILLAR_META[nextModule.pillar].accent }}
              >
                {totalCompleted === 0 ? "Start" : "Open"} →
              </span>
            </div>
          </Link>
        </section>
      )}

      {/* Continue where you left off */}
      {lastModule && nextModule && lastModule.id !== nextModule.id && (
        <section className="mb-10">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)] mb-3">
            Continue where you left off
          </h2>
          <Link
            href={lastModule.path}
            className="flex items-center gap-4 p-4 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] hover:border-white/[0.15] transition-all group"
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center text-base shrink-0"
              style={{
                background: `${PILLAR_META[lastModule.pillar].accent}20`,
                color: PILLAR_META[lastModule.pillar].accent,
              }}
            >
              {PILLAR_META[lastModule.pillar].icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-[var(--text-primary)] truncate">
                {lastModule.title}
              </div>
              <div className="text-[12px] text-[var(--text-muted)]">
                {PILLAR_META[lastModule.pillar].label}
              </div>
            </div>
            <span className="text-sm font-semibold text-[var(--text-muted)] group-hover:text-[var(--text-secondary)] transition-colors">
              Resume →
            </span>
          </Link>
        </section>
      )}

      {/* Pillar breakdown */}
      <section className="mb-10">
        <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)] mb-3">
          Your pillars
        </h2>
        <div className="space-y-4">
          {pillarBreakdown.map((pb) => {
            const meta = PILLAR_META[pb.pillar];
            const isPriority = pb.pillar === priorityPillar;
            return (
              <div
                key={pb.pillar}
                className="p-5 md:p-6 rounded-2xl border border-[var(--border)] bg-[var(--card-bg)]"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-start gap-3 min-w-0">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-lg shrink-0"
                      style={{ background: `${meta.accent}20`, color: meta.accent }}
                    >
                      {meta.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <Link
                          href={meta.href}
                          className="text-[16px] font-bold text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
                        >
                          {meta.label}
                        </Link>
                        {isPriority && (
                          <span
                            className="text-[9px] uppercase tracking-widest font-bold px-1.5 py-0.5 rounded"
                            style={{
                              background: `${meta.accent}18`,
                              color: meta.accent,
                            }}
                          >
                            Priority
                          </span>
                        )}
                      </div>
                      <div className="text-[12px] text-[var(--text-muted)] mt-0.5">
                        {meta.tagline}
                      </div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-sm font-bold tabular-nums" style={{ color: meta.accent }}>
                      {pb.stats.pct}%
                    </div>
                    <div className="text-[11px] text-[var(--text-muted)] tabular-nums">
                      {pb.stats.completed}/{pb.stats.total}
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden mb-4">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${pb.stats.pct}%`, background: meta.accent }}
                  />
                </div>

                {/* Module chips */}
                <div className="flex flex-wrap gap-2">
                  {pb.modules.map((m) => {
                    const base =
                      "inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[12px] transition-colors";
                    if (m.completed) {
                      return (
                        <Link
                          key={m.id}
                          href={m.path}
                          className={`${base} border border-[var(--accent)]/25 bg-[var(--accent)]/[0.06] text-[var(--text-secondary)] hover:text-[var(--text-primary)]`}
                          title="Completed"
                        >
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="var(--accent)" strokeWidth="2">
                            <polyline points="1.5 5 4 7.5 8.5 2.5" />
                          </svg>
                          {m.title}
                        </Link>
                      );
                    }
                    if (m.locked) {
                      return (
                        <span
                          key={m.id}
                          className={`${base} border border-[var(--border)] bg-white/[0.02] text-[var(--text-muted)]`}
                          title="Complete prerequisites to unlock"
                        >
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <rect x="2.5" y="4.5" width="5" height="4" rx="0.5" />
                            <path d="M3.75 4.5v-1.5a1.25 1.25 0 0 1 2.5 0v1.5" />
                          </svg>
                          {m.title}
                        </span>
                      );
                    }
                    return (
                      <Link
                        key={m.id}
                        href={m.path}
                        className={`${base} border border-[var(--border)] bg-[var(--card-bg)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-white/[0.15]`}
                      >
                        {m.title}
                        {m.tier === "advanced" && (
                          <span className="text-[9px] uppercase tracking-widest opacity-60">Adv</span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Quick anchor links */}
      <section>
        <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)] mb-3">
          Quick links
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
          <Link href="/trading" className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] hover:border-white/[0.15] text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-sm font-medium transition-all text-center">
            Markets
          </Link>
          <Link href="/fitness" className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] hover:border-white/[0.15] text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-sm font-medium transition-all text-center">
            Fitness
          </Link>
          <Link href="/mindset" className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] hover:border-white/[0.15] text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-sm font-medium transition-all text-center">
            Mindset
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Link href="/reflections" className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] hover:border-white/[0.15] text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-sm font-medium transition-all text-center">
            Your reflections
          </Link>
          <Link href="/account" className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] hover:border-white/[0.15] text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-sm font-medium transition-all text-center">
            Account
          </Link>
        </div>
      </section>
    </div>
  );
}
