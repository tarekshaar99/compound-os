import Link from "next/link";
import { redirect } from "next/navigation";
import Header from "../Header";
import { getCurrentSession } from "../../lib/session";
import { getCompleted, getUserMeta } from "../../lib/progress-server";
import {
  Pillar,
  computeUnlocked,
  getPillarModules,
  pillarStats,
} from "../../lib/modules";

/**
 * Pillar index page. Used by /trading, /fitness, /mindset. Shows the full
 * module list split into Core (always unlocked) and Advanced (gated).
 *
 * This is a server component so the locked/completed state is rendered
 * from the user's actual DB progress on first paint.
 */

const PILLAR_META: Record<
  Pillar,
  {
    label: string;
    accent: string;
    icon: string;
    tagline: string;
    libraryHref: string;
    libraryLabel: string;
  }
> = {
  trading: {
    label: "Markets",
    accent: "#00d4aa",
    icon: "◈",
    tagline:
      "Capital preservation first. Then regime-aware deployment. Then income strategies. Work top-down.",
    libraryHref: "/trading/library",
    libraryLabel: "Full reference library",
  },
  fitness: {
    label: "Fitness",
    accent: "#f97316",
    icon: "⚡",
    tagline:
      "Hybrid athlete. Strength, cardio, mobility, recovery. Less volume, more intent.",
    libraryHref: "/fitness/library",
    libraryLabel: "Full program library",
  },
  mindset: {
    label: "Mindset",
    accent: "#a78bfa",
    icon: "◉",
    tagline:
      "The operating layer under everything else. Identity, regulation, discipline, self-observation.",
    libraryHref: "/mindset/library",
    libraryLabel: "Deep library",
  },
};

export default async function PillarIndex({ pillar }: { pillar: Pillar }) {
  const session = await getCurrentSession();
  if (!session || !(session.paid || session.admin)) {
    redirect(`/login?return=/${pillar}`);
  }
  const meta = await getUserMeta(session.sub);
  if (!meta.onboardingComplete) {
    redirect("/onboarding");
  }

  const completed = await getCompleted(session.sub);
  const unlocked = computeUnlocked(completed);
  const mods = getPillarModules(pillar);
  const stats = pillarStats(pillar, completed);
  const core = mods.filter((m) => m.tier === "core");
  const advanced = mods.filter((m) => m.tier === "advanced");
  const p = PILLAR_META[pillar];

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Header />
      <div className="max-w-3xl mx-auto px-6 pt-24 pb-20">
        {/* Pillar header */}
        <div className="mb-12">
          <Link
            href="/dashboard"
            className="text-xs uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
          >
            ← Dashboard
          </Link>
          <div className="mt-6 flex items-start gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0"
              style={{ background: `${p.accent}20`, color: p.accent }}
            >
              {p.icon}
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] tracking-tight leading-[1.1]">
                {p.label}
              </h1>
              <p className="mt-2 text-[var(--text-secondary)] text-[15px] leading-relaxed max-w-xl">
                {p.tagline}
              </p>
            </div>
          </div>
          {/* progress */}
          <div className="mt-6 flex items-center gap-4">
            <div className="flex-1 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${stats.pct}%`, background: p.accent }}
              />
            </div>
            <div className="text-xs text-[var(--text-muted)] tabular-nums shrink-0">
              {stats.completed}/{stats.total} complete
            </div>
          </div>
        </div>

        {/* Core */}
        <section className="mb-12">
          <div className="flex items-end justify-between mb-4">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
              Core modules
            </h2>
            <span className="text-[11px] text-[var(--text-muted)]">
              Unlocked. Start anywhere.
            </span>
          </div>
          <div className="space-y-3">
            {core.map((m) => {
              const done = completed.has(m.id);
              return (
                <Link
                  key={m.id}
                  href={m.path}
                  className="group block p-5 rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] hover:border-white/[0.15] transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${
                        done ? "" : "border-2 border-[var(--text-muted)]/60"
                      }`}
                      style={done ? { background: p.accent } : undefined}
                    >
                      {done && (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#0a0b0f" strokeWidth="2.5">
                          <polyline points="2 6 5 9 10 3" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-[16px] font-bold text-[var(--text-primary)] leading-tight">
                          {m.title}
                        </h3>
                        {m.startHere && !done && (
                          <span
                            className="text-[9px] uppercase tracking-widest font-bold px-1.5 py-0.5 rounded shrink-0"
                            style={{ background: `${p.accent}18`, color: p.accent }}
                          >
                            Start here
                          </span>
                        )}
                      </div>
                      <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed">
                        {m.blurb}
                      </p>
                      <div className="mt-2 text-[11px] text-[var(--text-muted)] uppercase tracking-widest">
                        {m.estMinutes} min
                      </div>
                    </div>
                    <span
                      className="hidden sm:block self-center text-sm font-semibold shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: p.accent }}
                    >
                      →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Advanced */}
        {advanced.length > 0 && (
          <section className="mb-12">
            <div className="flex items-end justify-between mb-4">
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                Advanced modules
              </h2>
              <span className="text-[11px] text-[var(--text-muted)]">
                Unlock by completing prerequisites
              </span>
            </div>
            <div className="space-y-3">
              {advanced.map((m) => {
                const done = completed.has(m.id);
                const isLocked = !unlocked.has(m.id);
                const missing = (m.unlockBy ?? [])
                  .filter((id) => !completed.has(id))
                  .map((id) => mods.find((x) => x.id === id)?.title ?? id);

                if (isLocked) {
                  return (
                    <div
                      key={m.id}
                      className="p-5 rounded-2xl border border-[var(--border)] bg-white/[0.01] opacity-70"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5 text-[var(--text-muted)]">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <rect x="3" y="5.5" width="6" height="5" rx="0.5" />
                            <path d="M4.5 5.5V4a1.5 1.5 0 0 1 3 0v1.5" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-[16px] font-bold text-[var(--text-muted)] leading-tight mb-1">
                            {m.title}
                          </h3>
                          <p className="text-[13px] text-[var(--text-muted)] leading-relaxed mb-2">
                            {m.blurb}
                          </p>
                          <p className="text-[11px] text-[var(--text-muted)]">
                            Unlocks after: {missing.join(", ")}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={m.id}
                    href={m.path}
                    className="group block p-5 rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] hover:border-white/[0.15] transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${
                          done ? "" : "border-2 border-[var(--text-muted)]/60"
                        }`}
                        style={done ? { background: p.accent } : undefined}
                      >
                        {done && (
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#0a0b0f" strokeWidth="2.5">
                            <polyline points="2 6 5 9 10 3" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-[16px] font-bold text-[var(--text-primary)] leading-tight">
                            {m.title}
                          </h3>
                          <span
                            className="text-[9px] uppercase tracking-widest font-bold px-1.5 py-0.5 rounded shrink-0"
                            style={{ background: `${p.accent}18`, color: p.accent }}
                          >
                            Unlocked
                          </span>
                        </div>
                        <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed">
                          {m.blurb}
                        </p>
                        <div className="mt-2 text-[11px] text-[var(--text-muted)] uppercase tracking-widest">
                          {m.estMinutes} min
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Library link */}
        <section className="pt-6 border-t border-[var(--border)]">
          <Link
            href={p.libraryHref}
            className="flex items-center justify-between p-4 rounded-xl border border-[var(--border)] bg-white/[0.02] hover:border-white/[0.15] transition-all group"
          >
            <div>
              <div className="text-[14px] font-semibold text-[var(--text-primary)]">
                {p.libraryLabel}
              </div>
              <div className="text-[12px] text-[var(--text-muted)] mt-0.5">
                The deep-dive reference. Navigate by section. Good once you've done the modules.
              </div>
            </div>
            <span className="text-sm text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors">
              →
            </span>
          </Link>
        </section>
      </div>
    </div>
  );
}
