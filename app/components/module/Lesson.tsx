"use client";

import { ReactNode } from "react";
import Link from "next/link";
import Header from "../Header";
import Reveal from "../motion/Reveal";
import { ModuleProvider } from "./ModuleContext";
import type { Pillar } from "../../lib/modules";

/**
 * Editorial-Quarterly module shell. Every lesson page renders inside this.
 * Sets module context, renders the masthead/breadcrumb, and gives child
 * sections a consistent vertical rhythm.
 */

const PILLAR_META: Record<
  Pillar,
  { label: string; chapter: string; color: string; href: string }
> = {
  trading: {
    label: "Markets",
    chapter: "Chapter I",
    color: "var(--accent-trading)",
    href: "/trading",
  },
  fitness: {
    label: "Fitness",
    chapter: "Chapter II",
    color: "var(--accent-fitness)",
    href: "/fitness",
  },
  mindset: {
    label: "Mindset",
    chapter: "Chapter III",
    color: "var(--accent-mindset)",
    href: "/mindset",
  },
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
        <article className="max-w-[680px] mx-auto px-6 pt-32 md:pt-36 pb-24">
          {/* Editorial breadcrumb */}
          <Reveal>
            <div className="mb-8 flex items-center gap-3 label-caps">
              <Link
                href="/dashboard"
                className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
              >
                Dashboard
              </Link>
              <span className="text-[var(--text-muted)]">/</span>
              <Link
                href={meta.href}
                className="hover:opacity-80 transition-opacity"
                style={{ color: meta.color }}
              >
                {meta.label}
              </Link>
            </div>
          </Reveal>

          {/* Editorial hero */}
          <Reveal delay={0.1}>
            <header className="mb-14 pb-10 border-b border-[var(--border)]">
              <span
                className="label-caps block mb-4"
                style={{ color: meta.color }}
              >
                {meta.chapter} &middot; Module
              </span>
              <h1 className="font-serif text-[40px] md:text-[56px] leading-[1.05] tracking-[-0.02em] text-[var(--text-primary)] font-light">
                {title}
              </h1>
              {subtitle && (
                <p className="mt-5 font-serif italic text-[18px] md:text-[20px] text-[var(--text-secondary)] leading-[1.55] max-w-[560px]">
                  {subtitle}
                </p>
              )}
              {estMinutes && (
                <p className="mt-8 label-caps text-[var(--text-muted)]">
                  {estMinutes} min &middot; Read, then do the task
                </p>
              )}
            </header>
          </Reveal>

          <div className="space-y-16">{children}</div>
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
    <Reveal as="section">
      <h2 className="label-caps text-[var(--accent)] mb-5 pb-3 border-b border-[var(--border)]">
        {title}
      </h2>
      <div className="space-y-4 font-serif text-[16px] md:text-[17px] text-[var(--text-secondary)] leading-[1.75]">
        {children}
      </div>
    </Reveal>
  );
}

export function P({ children }: { children: ReactNode }) {
  return (
    <p className="font-serif text-[16px] md:text-[17px] text-[var(--text-secondary)] leading-[1.75]">
      {children}
    </p>
  );
}

export function Principle({ children }: { children: ReactNode }) {
  return (
    <Reveal as="section">
      <h2 className="label-caps text-[var(--accent)] mb-5 pb-3 border-b border-[var(--border)]">
        Core principle
      </h2>
      <div className="relative bg-[var(--card-bg)] border border-[var(--border)] p-6 md:p-8">
        {/* Corner accents */}
        <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[var(--accent)]" />
        <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[var(--accent)]" />
        <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[var(--accent)]" />
        <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[var(--accent)]" />
        <div className="font-serif italic text-[18px] md:text-[20px] text-[var(--text-primary)] leading-[1.65]">
          {children}
        </div>
      </div>
    </Reveal>
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
    <Reveal as="section">
      <h2 className="label-caps text-[var(--text-muted)] mb-5 pb-3 border-b border-[var(--border)]">
        {title ?? "Real-world example"}
      </h2>
      <div className="bg-[var(--card-bg)] border border-[var(--border)] p-6 md:p-8 space-y-4 font-serif text-[16px] md:text-[17px] text-[var(--text-secondary)] leading-[1.75]">
        {children}
      </div>
    </Reveal>
  );
}

export function Mistakes({ items }: { items: string[] }) {
  return (
    <Reveal as="section">
      <h2 className="label-caps text-[var(--text-muted)] mb-5 pb-3 border-b border-[var(--border)]">
        Common mistakes
      </h2>
      <ul className="divide-y divide-[var(--border)]">
        {items.map((text, i) => (
          <li
            key={i}
            className="flex items-baseline gap-4 py-4"
          >
            <span
              className="label-caps shrink-0 w-10"
              style={{ color: "#ff8a8a" }}
              aria-hidden
            >
              No.
            </span>
            <span className="font-serif text-[16px] md:text-[17px] text-[var(--text-secondary)] leading-[1.7]">
              {text}
            </span>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
