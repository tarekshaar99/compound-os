"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  getProgress,
  markSectionComplete,
  markSectionIncomplete,
  setLastVisited,
} from "../lib/progress";

export interface SectionItem {
  id: string;
  label: string;
  icon: string;
}

/**
 * Editorial Quarterly library shell. Used by /trading/library, /fitness/library,
 * /mindset/library. Persistent sidebar (table of contents) + main reading area.
 *
 * Visual language: hairline borders, sharp 0px corners, Newsreader serif body,
 * label-caps section labels, champagne (or pillar-color) for active state.
 */
export default function SectionLayout({
  title,
  subtitle,
  accent,
  sections,
  children,
  locked = false,
  pillar,
}: {
  title: string;
  subtitle: string;
  accent: string;
  sections: SectionItem[];
  children: (active: string) => React.ReactNode;
  locked?: boolean;
  pillar?: "trading" | "fitness" | "mindset";
}) {
  const [active, setActive] = useState(sections[0]?.id ?? "");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  // Load progress on mount
  useEffect(() => {
    if (pillar) {
      const p = getProgress();
      setCompletedSections(p[pillar].completedSections);
    }
  }, [pillar]);

  // Track last visited section
  useEffect(() => {
    if (pillar && active) {
      setLastVisited(pillar, active);
    }
  }, [pillar, active]);

  useEffect(() => {
    contentRef.current?.scrollTo(0, 0);
  }, [active]);

  const isCompleted = useCallback(
    (sectionId: string) => completedSections.includes(sectionId),
    [completedSections]
  );

  const toggleComplete = useCallback(
    (sectionId: string) => {
      if (!pillar) return;
      if (completedSections.includes(sectionId)) {
        const updated = markSectionIncomplete(pillar, sectionId);
        setCompletedSections(updated[pillar].completedSections);
      } else {
        const updated = markSectionComplete(pillar, sectionId);
        setCompletedSections(updated[pillar].completedSections);
      }
    },
    [pillar, completedSections]
  );

  // When locked, only show the first section
  const visibleSections = locked ? sections.slice(0, 1) : sections;
  const filtered = visibleSections.filter((s) =>
    s.label.toLowerCase().includes(search.toLowerCase())
  );

  const completedCount = completedSections.length;
  const totalCount = sections.length;
  const completionPct =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="h-screen flex overflow-hidden bg-[var(--bg)]">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/70 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <nav
        aria-label={`${title} table of contents`}
        className={`w-72 min-w-[288px] bg-[var(--sidebar-bg)] border-r border-[var(--border)] flex flex-col overflow-hidden
          ${sidebarOpen ? "fixed inset-y-0 left-0 z-50" : "hidden md:flex"}`}
      >
        {/* Sidebar header */}
        <div className="p-6 pb-4 border-b border-[var(--border)]">
          <Link
            href="/dashboard"
            className="label-caps text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors block mb-5"
          >
            &larr; Dashboard
          </Link>
          <span
            className="label-caps block mb-3"
            style={{ color: accent }}
          >
            Reference Library
          </span>
          <h2
            className="font-serif text-[24px] md:text-[28px] tracking-tight font-light leading-tight mb-2"
            style={{ color: "var(--text-primary)" }}
          >
            {title}
          </h2>
          <p className="font-serif italic text-[13px] text-[var(--text-secondary)] leading-relaxed">
            {subtitle}
          </p>

          {/* Progress indicator */}
          {pillar && !locked && (
            <div className="mt-5">
              <div className="flex items-baseline justify-between mb-2">
                <span className="label-caps text-[var(--text-muted)]">
                  Read
                </span>
                <span className="label-caps text-[var(--text-muted)] tabular-nums">
                  {completedCount} / {totalCount} &middot; {completionPct}%
                </span>
              </div>
              <div className="w-full h-px bg-[var(--border)] overflow-hidden">
                <div
                  className="h-full transition-all duration-700 origin-left"
                  style={{
                    width: `${completionPct}%`,
                    background: accent,
                  }}
                />
              </div>
            </div>
          )}

          <label className="sr-only" htmlFor="library-search">
            Search sections
          </label>
          <input
            id="library-search"
            type="text"
            placeholder="Search sections"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full mt-5 px-3 py-2.5 border border-[var(--border)] bg-[var(--bg)] text-[var(--text-primary)] font-serif text-[14px] outline-none placeholder:text-[var(--text-muted)] placeholder:font-serif placeholder:italic focus:border-[var(--accent)]"
          />
        </div>

        {/* Section list */}
        <div className="flex-1 overflow-auto">
          <ul>
            {filtered.map((s) => {
              const isActive = active === s.id;
              const done = pillar && !locked && isCompleted(s.id);
              return (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setActive(s.id);
                      setSidebarOpen(false);
                    }}
                    className="flex items-baseline gap-3 w-full px-6 py-3 text-left transition-colors duration-200 border-l-2"
                    style={{
                      background: isActive
                        ? "var(--card-bg)"
                        : "transparent",
                      borderLeftColor: isActive ? accent : "transparent",
                    }}
                  >
                    <span
                      className="label-caps shrink-0 w-6"
                      style={{
                        color: done
                          ? accent
                          : isActive
                            ? accent
                            : "var(--text-muted)",
                      }}
                    >
                      {done ? "✓" : String(filtered.indexOf(s) + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="font-serif text-[14px] leading-snug truncate"
                      style={{
                        color: isActive
                          ? "var(--text-primary)"
                          : "var(--text-secondary)",
                      }}
                    >
                      {s.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Main reading area */}
      <main
        ref={contentRef}
        className="flex-1 overflow-auto px-6 md:px-12 py-10 md:py-12 pb-20"
      >
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="md:hidden mb-8 px-4 py-2.5 label-caps border border-[var(--border)] bg-[var(--card-bg)] text-[var(--text-primary)] cursor-pointer"
        >
          Contents
        </button>
        <div className="max-w-[760px]">
          {children(active)}

          {/* Mark Complete button at bottom of each section */}
          {pillar && !locked && (
            <div className="mt-16 pt-8 border-t border-[var(--border)]">
              <button
                type="button"
                onClick={() => toggleComplete(active)}
                className="group inline-flex items-center gap-3 px-6 py-3.5 label-caps border transition-all duration-300 cursor-pointer"
                style={{
                  background: isCompleted(active)
                    ? `color-mix(in srgb, ${accent} 10%, transparent)`
                    : "transparent",
                  borderColor: isCompleted(active)
                    ? accent
                    : "var(--border)",
                  color: isCompleted(active)
                    ? accent
                    : "var(--text-secondary)",
                }}
              >
                <span
                  className="w-4 h-4 border flex items-center justify-center transition-all"
                  style={{
                    borderColor: isCompleted(active)
                      ? accent
                      : "var(--text-muted)",
                    background: isCompleted(active)
                      ? accent
                      : "transparent",
                  }}
                  aria-hidden
                >
                  {isCompleted(active) && (
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="#0a0b0f"
                      strokeWidth="2.5"
                    >
                      <polyline points="2 6 5 9 10 3" />
                    </svg>
                  )}
                </span>
                {isCompleted(active) ? "Completed" : "Mark as read"}
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
