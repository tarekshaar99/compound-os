import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentSession } from "../lib/session";
import { getProgressRows } from "../lib/progress-server";
import { getModule, Pillar } from "../lib/modules";
import Header from "../components/Header";

export const dynamic = "force-dynamic";

/**
 * Reflections - a single page that aggregates every reflection the user
 * has written across every module. The Reflection component stores its
 * value as a string in user_progress.completion_data under a key that's
 * either "reflection" (default) or "<slug>-reflection" (explicit).
 *
 * We iterate each row, find the reflection-shaped entries, and group by
 * module so the user can see their own thinking in one place once they
 * finish the course.
 */

const PILLAR_META: Record<
  Pillar,
  { label: string; accent: string; icon: string }
> = {
  trading: { label: "Markets", accent: "#00d4aa", icon: "◈" },
  fitness: { label: "Fitness", accent: "#f97316", icon: "⚡" },
  mindset: { label: "Mindset", accent: "#a78bfa", icon: "◉" },
};

interface CollectedReflection {
  moduleId: string;
  moduleTitle: string;
  pillar: Pillar;
  text: string;
  completedAt: string;
}

function isReflectionKey(key: string): boolean {
  return key === "reflection" || key.endsWith("-reflection");
}

function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

export default async function ReflectionsPage() {
  const session = await getCurrentSession();
  if (!session || !(session.paid || session.admin)) {
    redirect("/login?return=/reflections");
  }
  const email = session.sub;
  const rows = await getProgressRows(email);

  const collected: CollectedReflection[] = [];
  for (const row of rows) {
    const mod = getModule(row.module_id);
    if (!mod) continue;
    const data = row.completion_data ?? {};
    for (const [k, v] of Object.entries(data)) {
      if (!isReflectionKey(k)) continue;
      if (typeof v !== "string") continue;
      const text = v.trim();
      if (text.length < 20) continue;
      collected.push({
        moduleId: mod.id,
        moduleTitle: mod.title,
        pillar: mod.pillar,
        text,
        completedAt: row.completed_at,
      });
    }
  }

  const byPillar: Record<Pillar, CollectedReflection[]> = {
    trading: [],
    fitness: [],
    mindset: [],
  };
  for (const r of collected) byPillar[r.pillar].push(r);

  const totalCount = collected.length;
  const pillars: Pillar[] = ["trading", "fitness", "mindset"];

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Header />
      <div className="max-w-3xl mx-auto px-6 pt-24 pb-20">
        <div className="mb-10">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-[12px] text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors mb-4"
          >
            <span>←</span> Back to dashboard
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] tracking-tight">
            Your reflections
          </h1>
          <p className="text-sm text-[var(--text-muted)] mt-2 leading-relaxed max-w-xl">
            Every reflection you&apos;ve written, in one place. Come back when
            you finish the course and read them in order - the through-line is
            usually more obvious than any single module made it look.
          </p>
        </div>

        {totalCount === 0 ? (
          <div className="p-8 rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] text-center">
            <div className="text-[15px] text-[var(--text-secondary)] leading-relaxed mb-5">
              You haven&apos;t written any reflections yet. They show up here
              as you complete modules with a Reflection prompt.
            </div>
            <Link
              href="/dashboard"
              className="inline-block px-5 py-3 rounded-xl bg-[var(--accent)] text-[#0a0b0f] text-sm font-bold hover:opacity-90 transition-opacity"
            >
              Pick a module →
            </Link>
          </div>
        ) : (
          <div className="space-y-10">
            {pillars.map((p) => {
              const entries = byPillar[p];
              if (entries.length === 0) return null;
              const meta = PILLAR_META[p];
              return (
                <section key={p}>
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-base"
                      style={{ background: `${meta.accent}20`, color: meta.accent }}
                    >
                      {meta.icon}
                    </div>
                    <div>
                      <div
                        className="text-[11px] uppercase tracking-[0.18em] font-semibold"
                        style={{ color: meta.accent }}
                      >
                        {meta.label}
                      </div>
                      <div className="text-[12px] text-[var(--text-muted)] tabular-nums">
                        {entries.length} reflection{entries.length === 1 ? "" : "s"}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {entries.map((r, i) => (
                      <article
                        key={`${r.moduleId}-${i}`}
                        className="p-5 md:p-6 rounded-xl border border-[var(--border)] bg-[var(--card-bg)]"
                      >
                        <div className="flex items-baseline justify-between gap-3 mb-3">
                          <Link
                            href={getModule(r.moduleId)?.path ?? "/dashboard"}
                            className="text-[15px] font-semibold text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors truncate"
                          >
                            {r.moduleTitle}
                          </Link>
                          <span className="text-[11px] text-[var(--text-muted)] tabular-nums shrink-0">
                            {formatDate(r.completedAt)}
                          </span>
                        </div>
                        <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed whitespace-pre-wrap">
                          {r.text}
                        </p>
                      </article>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
