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
 * Pillar index page in the Editorial Quarterly direction. Used by /trading,
 * /fitness, /mindset.
 *
 * Server component — locked/completed state is rendered from the user's
 * actual DB progress on first paint, no flash.
 */

const PILLAR_META: Record<
  Pillar,
  {
    label: string;
    chapter: string;
    accent: string;
    tagline: string;
    libraryHref: string;
    libraryLabel: string;
  }
> = {
  trading: {
    label: "Markets",
    chapter: "Chapter I",
    accent: "var(--accent-trading)",
    tagline:
      "Capital preservation first. Then regime-aware deployment. Then income strategies. Work top-down.",
    libraryHref: "/trading/library",
    libraryLabel: "The deep reference library",
  },
  fitness: {
    label: "Fitness",
    chapter: "Chapter II",
    accent: "var(--accent-fitness)",
    tagline:
      "Hybrid athlete. Strength, cardio, mobility, recovery. Less volume, more intent.",
    libraryHref: "/fitness/library",
    libraryLabel: "The full program library",
  },
  mindset: {
    label: "Mindset",
    chapter: "Chapter III",
    accent: "var(--accent-mindset)",
    tagline:
      "The operating layer under everything else. Identity, regulation, discipline, self-observation.",
    libraryHref: "/mindset/library",
    libraryLabel: "The deep library",
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
      <div className="max-w-[800px] mx-auto px-6 pt-32 md:pt-36 pb-24">
        {/* Back link */}
        <Link
          href="/dashboard"
          className="label-caps text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors inline-block mb-10"
        >
          &larr; Dashboard
        </Link>

        {/* Pillar masthead */}
        <header className="mb-16">
          <span
            className="label-caps block mb-4"
            style={{ color: p.accent }}
          >
            {p.chapter}
          </span>
          <h1 className="font-serif text-[44px] md:text-[64px] leading-[1.05] tracking-[-0.02em] text-[var(--text-primary)] font-light mb-6">
            {p.label}
          </h1>
          <p className="font-serif italic text-[18px] md:text-[20px] text-[var(--text-secondary)] leading-[1.6] max-w-[560px]">
            {p.tagline}
          </p>

          {/* Progress meter — hairline + serif percent */}
          <div className="mt-10 flex items-baseline justify-between pb-3 border-b border-[var(--border)]">
            <span className="label-caps text-[var(--text-muted)]">
              Progress
            </span>
            <span className="font-serif text-[24px] tabular-nums" style={{ color: p.accent }}>
              {stats.completed}{" "}
              <span className="text-[var(--text-muted)]">/ {stats.total}</span>
            </span>
          </div>
          <div className="relative w-full h-px bg-[var(--border)] overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 origin-left transition-transform duration-700"
              style={{ background: p.accent, width: `${stats.pct}%` }}
            />
          </div>
        </header>

        {/* Core modules */}
        <section className="mb-16">
          <div className="flex items-baseline justify-between mb-6 pb-3 border-b border-[var(--border)]">
            <h2 className="label-caps text-[var(--accent)]">
              Core modules
            </h2>
            <span className="label-caps text-[var(--text-muted)]">
              Unlocked &middot; start anywhere
            </span>
          </div>

          <ul className="divide-y divide-[var(--border)]">
            {core.map((m) => {
              const done = completed.has(m.id);
              return (
                <li key={m.id}>
                  <Link
                    href={m.path}
                    className="group flex items-baseline gap-5 py-5 hover:bg-[var(--card-bg)] transition-colors px-2 -mx-2"
                  >
                    {/* status indicator */}
                    <span className="label-caps shrink-0 w-16 mt-1.5">
                      {done ? (
                        <span style={{ color: p.accent }}>&#10003; Read</span>
                      ) : m.startHere ? (
                        <span style={{ color: p.accent }}>Begin</span>
                      ) : (
                        <span className="text-[var(--text-muted)]">Core</span>
                      )}
                    </span>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif text-[19px] md:text-[22px] tracking-tight text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors leading-snug mb-2">
                        {m.title}
                      </h3>
                      <p className="font-serif text-[14px] md:text-[15px] text-[var(--text-secondary)] leading-[1.65] max-w-prose">
                        {m.blurb}
                      </p>
                    </div>

                    <span className="label-caps text-[var(--text-muted)] shrink-0 hidden sm:block mt-1.5">
                      {m.estMinutes} min
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        {/* Advanced modules */}
        {advanced.length > 0 && (
          <section className="mb-16">
            <div className="flex items-baseline justify-between mb-6 pb-3 border-b border-[var(--border)]">
              <h2 className="label-caps text-[var(--text-muted)]">
                Advanced modules
              </h2>
              <span className="label-caps text-[var(--text-muted)]">
                Unlock by completing prerequisites
              </span>
            </div>

            <ul className="divide-y divide-[var(--border)]">
              {advanced.map((m) => {
                const done = completed.has(m.id);
                const isLocked = !unlocked.has(m.id);
                const missing = (m.unlockBy ?? [])
                  .filter((id) => !completed.has(id))
                  .map((id) => mods.find((x) => x.id === id)?.title ?? id);

                if (isLocked) {
                  return (
                    <li
                      key={m.id}
                      className="flex items-baseline gap-5 py-5 px-2 -mx-2 opacity-50"
                    >
                      <span className="label-caps shrink-0 w-16 mt-1.5 text-[var(--text-muted)]">
                        Locked
                      </span>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-serif italic text-[19px] md:text-[22px] tracking-tight text-[var(--text-muted)] leading-snug mb-2">
                          {m.title}
                        </h3>
                        <p className="font-serif text-[13px] text-[var(--text-muted)] leading-[1.6]">
                          Unlocks after: {missing.join(" &middot; ")}
                        </p>
                      </div>
                    </li>
                  );
                }

                return (
                  <li key={m.id}>
                    <Link
                      href={m.path}
                      className="group flex items-baseline gap-5 py-5 hover:bg-[var(--card-bg)] transition-colors px-2 -mx-2"
                    >
                      <span className="label-caps shrink-0 w-16 mt-1.5">
                        {done ? (
                          <span style={{ color: p.accent }}>
                            &#10003; Read
                          </span>
                        ) : (
                          <span style={{ color: p.accent }}>Adv</span>
                        )}
                      </span>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-serif text-[19px] md:text-[22px] tracking-tight text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors leading-snug mb-2">
                          {m.title}
                        </h3>
                        <p className="font-serif text-[14px] md:text-[15px] text-[var(--text-secondary)] leading-[1.65] max-w-prose">
                          {m.blurb}
                        </p>
                      </div>
                      <span className="label-caps text-[var(--text-muted)] shrink-0 hidden sm:block mt-1.5">
                        {m.estMinutes} min
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        {/* Library link */}
        <section className="pt-8 border-t border-[var(--border)]">
          <Link
            href={p.libraryHref}
            className="group flex items-baseline justify-between gap-4 py-4 hover:bg-[var(--card-bg)] transition-colors px-4 -mx-4"
          >
            <div>
              <span className="label-caps text-[var(--text-muted)] block mb-2">
                Reference
              </span>
              <h3 className="font-serif text-[20px] md:text-[24px] text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors mb-1">
                {p.libraryLabel}
              </h3>
              <p className="font-serif italic text-[14px] text-[var(--text-secondary)]">
                Navigate by section. Good once you&apos;ve done the modules.
              </p>
            </div>
            <span
              className="label-caps shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ color: p.accent }}
            >
              Open &rarr;
            </span>
          </Link>
        </section>
      </div>
    </div>
  );
}
