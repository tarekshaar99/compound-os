"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Pillar } from "../lib/modules";
import Reveal from "../components/motion/Reveal";
import { Stagger, StaggerItem } from "../components/motion/Stagger";
import { EASE_SOFT } from "../lib/motion";

const PILLAR_META: Record<
  Pillar,
  {
    label: string;
    accent: string;
    chapter: string;
    href: string;
    tagline: string;
  }
> = {
  trading: {
    label: "Markets",
    accent: "var(--accent-trading)",
    chapter: "Chapter I",
    href: "/trading",
    tagline: "Capital, regimes, income",
  },
  fitness: {
    label: "Fitness",
    accent: "var(--accent-fitness)",
    chapter: "Chapter II",
    href: "/fitness",
    tagline: "Strength, cardio, recovery",
  },
  mindset: {
    label: "Mindset",
    accent: "var(--accent-mindset)",
    chapter: "Chapter III",
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
  const overallPct =
    totalModules === 0 ? 0 : Math.round((totalCompleted / totalModules) * 100);
  const isFresh = totalCompleted === 0;

  return (
    <div className="max-w-[1100px] mx-auto px-6 md:px-12 pt-32 md:pt-36 pb-24">
      {/* Editorial masthead */}
      <Reveal className="flex items-baseline justify-between border-b border-[var(--border)] pb-6 mb-12">
        <span className="label-caps text-[var(--text-muted)]">
          The Operator&apos;s Quarterly
        </span>
        <span className="label-caps text-[var(--text-muted)] hidden sm:block">
          {new Date().toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      </Reveal>

      {/* Welcome */}
      <Reveal delay={0.1}>
        <div className="flex items-end justify-between gap-6 mb-12 md:mb-16">
          <div>
            <span className="label-caps text-[var(--accent)] block mb-3">
              {isFresh ? "Volume I — Issue 01" : "Continuing"}
            </span>
            <h1 className="font-serif text-[36px] md:text-[56px] leading-[1.05] tracking-[-0.02em] text-[var(--text-primary)] font-light">
              {isFresh
                ? displayName
                  ? `Let's get to work, ${displayName}.`
                  : "Let's get to work."
                : displayName
                  ? `Welcome back, ${displayName}.`
                  : "Welcome back."}
            </h1>
            <p className="mt-5 font-serif italic text-[16px] md:text-[18px] text-[var(--text-secondary)] max-w-md">
              {isFresh
                ? "Start with what's recommended. Momentum compounds."
                : overallPct >= 100
                  ? "Every module complete. Come back for updates."
                  : `${totalCompleted} of ${totalModules} modules complete.`}
            </p>
          </div>

          {!isFresh && (
            <div className="shrink-0 hidden md:block text-right">
              <div className="font-serif text-[44px] md:text-[56px] leading-[1] tracking-[-0.02em] text-[var(--accent)] font-light tabular-nums">
                {overallPct}
                <span className="text-[20px] align-top ml-1">%</span>
              </div>
              <div className="label-caps text-[var(--text-muted)] mt-1">
                {totalCompleted} / {totalModules}
              </div>
            </div>
          )}
        </div>
      </Reveal>

      {/* Today's priority */}
      {nextModule && (
        <Reveal delay={0.25}>
          <section className="mb-16 md:mb-20">
            <div className="flex items-baseline justify-between mb-5 pb-3 border-b border-[var(--border)]">
              <span className="label-caps text-[var(--accent)]">
                Today&apos;s reading
              </span>
              <span className="label-caps text-[var(--text-muted)]">
                Recommended
              </span>
            </div>
            <Link
              href={nextModule.path}
              className="block relative bg-[var(--card-bg)] border border-[var(--border)] p-8 md:p-10 hover:border-[var(--accent)] transition-colors duration-500 group"
            >
              {/* Corner accents */}
              <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[var(--accent)]" />
              <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[var(--accent)]" />
              <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[var(--accent)]" />
              <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[var(--accent)]" />

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
                <div className="md:col-span-3">
                  <span
                    className="label-caps block mb-2"
                    style={{ color: PILLAR_META[nextModule.pillar].accent }}
                  >
                    {PILLAR_META[nextModule.pillar].label}
                  </span>
                  <span className="label-caps text-[var(--text-muted)]">
                    {nextModule.estMinutes} min
                  </span>
                </div>
                <div className="md:col-span-9">
                  <h3 className="font-serif text-[28px] md:text-[36px] leading-[1.1] tracking-[-0.015em] text-[var(--text-primary)] font-light mb-4 group-hover:text-[var(--accent)] transition-colors">
                    {nextModule.title}
                  </h3>
                  <p className="font-serif text-[15px] md:text-[16px] text-[var(--text-secondary)] leading-[1.7] max-w-2xl">
                    {nextModule.blurb}
                  </p>
                  <div className="mt-6 inline-flex items-center gap-3 label-caps text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity">
                    {totalCompleted === 0 ? "Begin" : "Open"}
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                      &rarr;
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </section>
        </Reveal>
      )}

      {/* Continue where you left off */}
      {lastModule && nextModule && lastModule.id !== nextModule.id && (
        <Reveal delay={0.3}>
          <section className="mb-16 md:mb-20">
            <div className="flex items-baseline justify-between mb-5 pb-3 border-b border-[var(--border)]">
              <span className="label-caps text-[var(--text-muted)]">
                Continue where you left off
              </span>
            </div>
            <Link
              href={lastModule.path}
              className="flex items-baseline gap-6 py-5 group hover:bg-[var(--card-bg)] transition-colors px-2 -mx-2"
            >
              <span
                className="label-caps shrink-0 w-24"
                style={{ color: PILLAR_META[lastModule.pillar].accent }}
              >
                {PILLAR_META[lastModule.pillar].label}
              </span>
              <span className="font-serif text-[18px] md:text-[20px] text-[var(--text-primary)] flex-1 group-hover:text-[var(--accent)] transition-colors">
                {lastModule.title}
              </span>
              <span className="label-caps text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors shrink-0">
                Resume &rarr;
              </span>
            </Link>
          </section>
        </Reveal>
      )}

      {/* Pillar breakdown */}
      <section className="mb-16 md:mb-20">
        <Reveal delay={0.35}>
          <div className="flex items-baseline justify-between mb-8 md:mb-12 pb-3 border-b border-[var(--border)]">
            <h2 className="font-serif text-[24px] md:text-[32px] leading-[1.1] text-[var(--text-primary)] font-light">
              Your pillars
            </h2>
            <span className="label-caps text-[var(--text-muted)]">
              Section A
            </span>
          </div>
        </Reveal>

        <Stagger className="space-y-12 md:space-y-16">
          {pillarBreakdown.map((pb) => {
            const meta = PILLAR_META[pb.pillar];
            const isPriority = pb.pillar === priorityPillar;
            return (
              <StaggerItem key={pb.pillar} as="article">
                <header className="flex items-baseline justify-between mb-5 pb-3 border-b border-[var(--border)]">
                  <div className="flex items-baseline gap-4">
                    <span
                      className="label-caps"
                      style={{ color: meta.accent }}
                    >
                      {meta.chapter}
                    </span>
                    <Link
                      href={meta.href}
                      className="font-serif text-[24px] md:text-[28px] tracking-tight text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
                    >
                      {meta.label}
                    </Link>
                    {isPriority && (
                      <span
                        className="label-caps text-[10px]"
                        style={{ color: meta.accent }}
                      >
                        — your anchor
                      </span>
                    )}
                  </div>
                  <span className="label-caps text-[var(--text-muted)] tabular-nums">
                    {pb.stats.completed} / {pb.stats.total}
                  </span>
                </header>

                {/* Progress bar */}
                <div className="relative w-full h-px bg-[var(--border)] mb-6 overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0 origin-left"
                    style={{ background: meta.accent, width: `${pb.stats.pct}%` }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.9, ease: EASE_SOFT, delay: 0.2 }}
                  />
                </div>

                {/* Module list — editorial table style */}
                <ul className="divide-y divide-[var(--border-soft)]">
                  {pb.modules.map((m) => {
                    if (m.completed) {
                      return (
                        <li key={m.id}>
                          <Link
                            href={m.path}
                            className="flex items-baseline gap-4 py-3 hover:bg-[var(--card-bg)] transition-colors px-2 -mx-2 group"
                          >
                            <span
                              className="label-caps w-12 shrink-0"
                              style={{ color: meta.accent }}
                            >
                              ✓ Read
                            </span>
                            <span className="font-serif text-[15px] md:text-[16px] text-[var(--text-secondary)] flex-1 group-hover:text-[var(--text-primary)] transition-colors">
                              {m.title}
                            </span>
                          </Link>
                        </li>
                      );
                    }
                    if (m.locked) {
                      return (
                        <li
                          key={m.id}
                          className="flex items-baseline gap-4 py-3 px-2 -mx-2"
                        >
                          <span className="label-caps text-[var(--text-muted)] w-12 shrink-0 opacity-50">
                            Locked
                          </span>
                          <span className="font-serif italic text-[15px] md:text-[16px] text-[var(--text-muted)] flex-1">
                            {m.title}
                          </span>
                        </li>
                      );
                    }
                    return (
                      <li key={m.id}>
                        <Link
                          href={m.path}
                          className="flex items-baseline gap-4 py-3 hover:bg-[var(--card-bg)] transition-colors px-2 -mx-2 group"
                        >
                          <span className="label-caps text-[var(--text-muted)] w-12 shrink-0">
                            {m.tier === "advanced" ? "Adv" : "Core"}
                          </span>
                          <span className="font-serif text-[15px] md:text-[16px] text-[var(--text-primary)] flex-1 group-hover:text-[var(--accent)] transition-colors">
                            {m.title}
                          </span>
                          <span
                            className="label-caps shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            style={{ color: meta.accent }}
                          >
                            Read &rarr;
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </StaggerItem>
            );
          })}
        </Stagger>
      </section>

      {/* Quick anchor links */}
      <Reveal delay={0.4}>
        <section className="mt-16 md:mt-20 pt-8 border-t border-[var(--border)]">
          <span className="label-caps text-[var(--text-muted)] block mb-6">
            Quick links
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-px bg-[var(--border)] border border-[var(--border)]">
            <QuickLink href="/trading" label="Markets" />
            <QuickLink href="/fitness" label="Fitness" />
            <QuickLink href="/mindset" label="Mindset" />
            <QuickLink href="/reflections" label="Reflections" />
            <QuickLink href="/account" label="Account" />
          </div>
        </section>
      </Reveal>
    </div>
  );
}

function QuickLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="bg-[var(--bg)] hover:bg-[var(--card-bg)] transition-colors p-5 text-center group"
    >
      <span className="label-caps text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors">
        {label}
      </span>
    </Link>
  );
}
