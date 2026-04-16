"use client";

import { ReactNode } from "react";
import Link from "next/link";
import Header from "../Header";
import { ModuleProvider } from "./ModuleContext";
import type { Pillar } from "../../lib/modules";

/**
 * Shell every lesson page uses. Sets module context, renders the header/
 * breadcrumb, and gives child sections a consistent vertical rhythm.
 *
 * Usage:
 *   <Lesson moduleId="trading.foundations" pillar="trading"
 *           title="Investing Foundations"
 *           subtitle="The mental model behind every position.">
 *     <LessonSection title="What this is">...</LessonSection>
 *     <Principle>...</Principle>
 *     <Example>...</Example>
 *     <Mistakes items={[...]} />
 *     <Checklist items={[...]} />
 *     <Quiz questions={[...]} />
 *     <Reflection prompt="..." />
 *     <CompleteModule nextPath="/trading" />
 *   </Lesson>
 */

const PILLAR_META: Record<Pillar, { label: string; color: string; href: string }> = {
  trading: { label: "Markets", color: "#00d4aa", href: "/trading" },
  fitness: { label: "Fitness", color: "#f97316", href: "/fitness" },
  mindset: { label: "Mindset", color: "#a78bfa", href: "/mindset" },
};

export function Lesson({
  moduleId,
  pillar,
  title,
  subtitle,
  estMinutes,
  children,
}: {
  moduleId: string;
  pillar: Pillar;
  title: string;
  subtitle?: string;
  estMinutes?: number;
  children: ReactNode;
}) {
  const meta = PILLAR_META[pillar];
  return (
    <ModuleProvider moduleId={moduleId}>
      <div className="min-h-screen bg-[var(--bg)]">
        <Header />
        <article className="max-w-2xl mx-auto px-6 pt-24 pb-24">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-xs uppercase tracking-widest text-[var(--text-muted)]">
            <Link href="/dashboard" className="hover:text-[var(--text-secondary)] transition-colors">
              Dashboard
            </Link>
            <span>/</span>
            <Link href={meta.href} className="hover:text-[var(--text-secondary)] transition-colors" style={{ color: meta.color }}>
              {meta.label}
            </Link>
          </div>

          {/* Hero */}
          <header className="mb-12 pb-8 border-b border-[var(--border)]">
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] tracking-tight leading-[1.15]">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-4 text-[var(--text-secondary)] text-[15px] leading-relaxed">
                {subtitle}
              </p>
            )}
            {estMinutes && (
              <p className="mt-5 text-xs text-[var(--text-muted)] uppercase tracking-widest">
                {estMinutes} min &middot; Read, then do the task
              </p>
            )}
          </header>

          <div className="space-y-14">{children}</div>
        </article>
      </div>
    </ModuleProvider>
  );
}

export function LessonSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)] mb-4">
        {title}
      </h2>
      <div className="space-y-4 text-[var(--text-secondary)] text-[15px] leading-[1.75]">
        {children}
      </div>
    </section>
  );
}

export function P({ children }: { children: ReactNode }) {
  return <p className="text-[var(--text-secondary)] text-[15px] leading-[1.75]">{children}</p>;
}

export function Principle({ children }: { children: ReactNode }) {
  return (
    <section>
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)] mb-4">
        Core principle
      </h2>
      <div className="p-5 md:p-6 rounded-xl border border-[var(--accent)]/25 bg-[var(--accent)]/[0.04]">
        <div className="text-[var(--text-primary)] text-[16px] leading-[1.7] font-medium">
          {children}
        </div>
      </div>
    </section>
  );
}

export function Example({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)] mb-4">
        {title ?? "Real-world example"}
      </h2>
      <div className="p-5 md:p-6 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] space-y-3 text-[var(--text-secondary)] text-[15px] leading-[1.75]">
        {children}
      </div>
    </section>
  );
}

export function Mistakes({ items }: { items: string[] }) {
  return (
    <section>
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)] mb-4">
        Common mistakes
      </h2>
      <ul className="space-y-3">
        {items.map((text, i) => (
          <li
            key={i}
            className="flex gap-3 p-4 rounded-xl border border-[var(--border)] bg-[var(--card-bg)]"
          >
            <span className="text-[#ef4444] font-bold shrink-0" aria-hidden>
              ✕
            </span>
            <span className="text-[var(--text-secondary)] text-[15px] leading-[1.7]">
              {text}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
