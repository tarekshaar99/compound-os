"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export interface SectionItem {
  id: string;
  label: string;
  icon: string;
}

export default function SectionLayout({
  title,
  subtitle,
  accent,
  sections,
  children,
  locked = false,
}: {
  title: string;
  subtitle: string;
  accent: string;
  sections: SectionItem[];
  children: (active: string) => React.ReactNode;
  locked?: boolean;
}) {
  const [active, setActive] = useState(sections[0]?.id ?? "");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    contentRef.current?.scrollTo(0, 0);
  }, [active]);

  // When locked, only show the first section
  const visibleSections = locked ? sections.slice(0, 1) : sections;
  const filtered = visibleSections.filter((s) =>
    s.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <nav
        className={`w-64 min-w-[256px] bg-[var(--sidebar-bg)] border-r border-[var(--border)] flex flex-col overflow-hidden
          ${sidebarOpen ? "fixed inset-y-0 left-0 z-50" : "hidden md:flex"}`}
      >
        <div className="p-5 pb-3 border-b border-[var(--border)]">
          <Link
            href="/"
            className="text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] uppercase tracking-widest"
          >
            &larr; Compound OS
          </Link>
          <div
            className="text-xl font-bold mt-2 mb-0.5"
            style={{ color: accent }}
          >
            {title}
          </div>
          <div className="text-xs text-[var(--text-muted)]">{subtitle}</div>
          <input
            type="text"
            placeholder="Search sections..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full mt-3 px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-[var(--text-primary)] text-sm outline-none placeholder:text-[var(--text-muted)]"
          />
        </div>
        <div className="flex-1 overflow-auto p-2">
          {filtered.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                setActive(s.id);
                setSidebarOpen(false);
              }}
              className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg text-sm text-left mb-0.5 transition-all"
              style={{
                background:
                  active === s.id ? `${accent}15` : "transparent",
                color: active === s.id ? accent : "var(--text-secondary)",
                fontWeight: active === s.id ? 600 : 400,
              }}
            >
              <span className="text-base min-w-[22px]">{s.icon}</span>
              {s.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Main */}
      <main ref={contentRef} className="flex-1 overflow-auto px-6 md:px-10 py-8 pb-16">
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden mb-5 px-3.5 py-2 rounded-lg border border-[var(--border)] bg-[var(--card-bg)] text-[var(--text-primary)] text-sm"
        >
          Menu
        </button>
        <div className="max-w-[860px]">{children(active)}</div>
      </main>
    </div>
  );
}
