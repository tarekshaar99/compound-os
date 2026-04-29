import Link from "next/link";
import { redirect } from "next/navigation";
import Header from "../Header";
import Footer from "../Footer";
import CheckoutButton from "../CheckoutButton";
import { getCurrentSession } from "../../lib/session";
import { getCompleted, getUserMeta } from "../../lib/progress-server";
import { getPricing } from "../../lib/pricing";
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
 * Renders one of two views based on auth:
 *
 *   - Authenticated paid/admin: full member view with progress bar, Read /
 *     Begin / Locked status column, completion checkmarks, library link.
 *
 *   - Anyone else (Googlebot, prospects, signed-out members): a public
 *     editorial preview with the same module list (titles + blurbs only,
 *     no progress, no completion state, no library link), capped with a
 *     champagne paywall block linking to the founding-price CTA. This
 *     view is what makes /trading, /fitness, /mindset indexable for SEO.
 *
 * Server component — auth resolved on first paint, no flash.
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
    /** Marketing-facing intro for unauthenticated visitors. Slightly more
     *  evocative than the "tagline" we show to members, since this is
     *  what Google indexes and what curious prospects read first. */
    publicIntro: string;
  }
> = {
  trading: {
    label: "Markets",
    chapter: "Chapter I",
    accent: "var(--accent-trading)",
    tagline:
      "Capital preservation first. Then regime-aware deployment. Then income strategies. Work top-down.",
    publicIntro:
      "A structured framework for capital preservation, options income, and finding companies worth owning. No signals. No tips. Rules and protocols you can actually run.",
    libraryHref: "/trading/library",
    libraryLabel: "The deep reference library",
  },
  fitness: {
    label: "Fitness",
    chapter: "Chapter II",
    accent: "var(--accent-fitness)",
    tagline:
      "Hybrid athlete. Strength, cardio, mobility, recovery. Less volume, more intent.",
    publicIntro:
      "A hybrid athlete system: strength, Zone 2, intervals, mobility, and the recovery protocols that make it sustainable. Built to compound over decades, not seasons.",
    libraryHref: "/fitness/library",
    libraryLabel: "The full program library",
  },
  mindset: {
    label: "Mindset",
    chapter: "Chapter III",
    accent: "var(--accent-mindset)",
    tagline:
      "The operating layer under everything else. Identity, regulation, discipline, self-observation.",
    publicIntro:
      "The operating layer under capital and the body — identity, emotional regulation, daily discipline, decision-making under pressure. Frameworks that make willpower unnecessary.",
    libraryHref: "/mindset/library",
    libraryLabel: "The deep library",
  },
};

export default async function PillarIndex({ pillar }: { pillar: Pillar }) {
  const session = await getCurrentSession();
  const authed = !!(session && (session.paid || session.admin));

  // Anonymous + unpaid traffic gets the public editorial preview. This is
  // the Phase 1 SEO surface — Googlebot crawls this view, indexes it, and
  // ranks for pillar-intent queries. Module URLs ARE shown but link out
  // to the gated module pages, which still 307 to /login.
  if (!authed) {
    return <PublicPillarPreview pillar={pillar} />;
  }

  const meta = await getUserMeta(session.sub);
  if (!meta.onboardingComplete) {
    redirect("/onboarding");
  }

  return <AuthedPillarIndex pillar={pillar} email={session.sub} />;
}

/* ─────────────────── Authenticated member view ─────────────────── */

async function AuthedPillarIndex({
  pillar,
  email,
}: {
  pillar: Pillar;
  email: string;
}) {
  const completed = await getCompleted(email);
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

/* ─────────────────── Public preview (SEO surface) ─────────────────── */

async function PublicPillarPreview({ pillar }: { pillar: Pillar }) {
  const p = PILLAR_META[pillar];
  const mods = getPillarModules(pillar);
  const core = mods.filter((m) => m.tier === "core");
  const advanced = mods.filter((m) => m.tier === "advanced");
  const totalMinutes = mods.reduce((a, m) => a + m.estMinutes, 0);
  const pricing = await getPricing();

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)]">
      <Header />
      <main className="flex-1">
        <article className="max-w-[800px] mx-auto px-6 pt-32 md:pt-36 pb-16">
          {/* Pillar masthead */}
          <header className="mb-16">
            <span
              className="label-caps block mb-4"
              style={{ color: p.accent }}
            >
              {p.chapter} &middot; Compound OS
            </span>
            <h1 className="font-serif text-[44px] md:text-[64px] leading-[1.05] tracking-[-0.02em] text-[var(--text-primary)] font-light mb-6">
              {p.label}
            </h1>
            <p className="font-serif italic text-[18px] md:text-[22px] text-[var(--text-secondary)] leading-[1.55] max-w-[640px]">
              {p.publicIntro}
            </p>

            {/* Edition stat row — gives the page editorial weight + structured info for SEO */}
            <div className="mt-12 grid grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)] max-w-md">
              <Stat
                label="Modules"
                value={mods.length.toString()}
                accent={p.accent}
              />
              <Stat
                label="Reading"
                value={`${Math.round(totalMinutes / 60 * 10) / 10}h`}
                accent={p.accent}
              />
              <Stat
                label="Pillar"
                value={`§${p.chapter.split(" ")[1]}`}
                accent={p.accent}
              />
            </div>
          </header>

          {/* Core modules — preview list, titles + blurbs only */}
          {core.length > 0 && (
            <section className="mb-16">
              <div className="flex items-baseline justify-between mb-6 pb-3 border-b border-[var(--border)]">
                <h2
                  className="label-caps"
                  style={{ color: p.accent }}
                >
                  Core modules
                </h2>
                <span className="label-caps text-[var(--text-muted)]">
                  {core.length} included
                </span>
              </div>

              <ul className="divide-y divide-[var(--border)]">
                {core.map((m) => (
                  <li key={m.id}>
                    <article className="flex items-baseline gap-5 py-5">
                      <span
                        className="label-caps shrink-0 w-16 mt-1.5"
                        style={{ color: p.accent }}
                      >
                        Core
                      </span>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-serif text-[19px] md:text-[22px] tracking-tight text-[var(--text-primary)] leading-snug mb-2">
                          {m.title}
                        </h3>
                        <p className="font-serif text-[14px] md:text-[15px] text-[var(--text-secondary)] leading-[1.65] max-w-prose">
                          {m.blurb}
                        </p>
                      </div>
                      <span className="label-caps text-[var(--text-muted)] shrink-0 hidden sm:block mt-1.5">
                        {m.estMinutes} min
                      </span>
                    </article>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Advanced modules */}
          {advanced.length > 0 && (
            <section className="mb-16">
              <div className="flex items-baseline justify-between mb-6 pb-3 border-b border-[var(--border)]">
                <h2 className="label-caps text-[var(--text-muted)]">
                  Advanced modules
                </h2>
                <span className="label-caps text-[var(--text-muted)]">
                  {advanced.length} included
                </span>
              </div>

              <ul className="divide-y divide-[var(--border)]">
                {advanced.map((m) => (
                  <li key={m.id}>
                    <article className="flex items-baseline gap-5 py-5">
                      <span
                        className="label-caps shrink-0 w-16 mt-1.5"
                        style={{ color: p.accent }}
                      >
                        Advanced
                      </span>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-serif text-[19px] md:text-[22px] tracking-tight text-[var(--text-primary)] leading-snug mb-2">
                          {m.title}
                        </h3>
                        <p className="font-serif text-[14px] md:text-[15px] text-[var(--text-secondary)] leading-[1.65] max-w-prose">
                          {m.blurb}
                        </p>
                      </div>
                      <span className="label-caps text-[var(--text-muted)] shrink-0 hidden sm:block mt-1.5">
                        {m.estMinutes} min
                      </span>
                    </article>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Paywall card — editorial pricing block */}
          <section
            id="pricing"
            className="mt-20 pt-10 border-t border-[var(--border)]"
          >
            <div className="relative bg-[var(--card-bg)] border border-[var(--border)] p-8 md:p-12 text-center">
              {/* Corner accents */}
              <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[var(--accent)]" />
              <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[var(--accent)]" />
              <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[var(--accent)]" />
              <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[var(--accent)]" />

              <span className="label-caps text-[var(--accent)] block mb-5">
                Reading restricted &middot; Members only
              </span>
              <h2 className="font-serif text-[28px] md:text-[36px] leading-[1.1] tracking-tight text-[var(--text-primary)] font-light mb-5 max-w-[520px] mx-auto">
                Read every module across all three pillars.
              </h2>
              <p className="font-serif italic text-[15px] md:text-[16px] text-[var(--text-secondary)] leading-[1.6] mb-8 max-w-[480px] mx-auto">
                One purchase. Lifetime access. Every future update included.
                Markets, Fitness, and Mindset — the full system.
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-3">
                <CheckoutButton className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[var(--accent)] text-[var(--on-accent)] label-caps border border-[var(--accent)] hover:bg-transparent hover:text-[var(--accent)] transition-all duration-500 cursor-pointer">
                  Get Compound OS &middot; {pricing.display}
                  <span
                    aria-hidden
                    className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                  >
                    &rarr;
                  </span>
                </CheckoutButton>
                <Link
                  href="/login"
                  className="px-6 py-3 label-caps text-[var(--text-secondary)] border border-[var(--border)] hover:border-[var(--text-primary)] transition-all"
                >
                  Already have access? Sign in
                </Link>
              </div>

              {pricing.isFounding && (
                <p className="mt-6 font-serif italic text-[13px] text-[var(--text-muted)]">
                  Founding price &middot; {pricing.spotsRemaining} spots
                  remaining of {100}.
                </p>
              )}
            </div>

            {/* Cross-pillar links — internal SEO link graph */}
            <nav
              className="mt-10 flex items-center justify-center gap-6 flex-wrap"
              aria-label="Other pillars"
            >
              {(["trading", "fitness", "mindset"] as const)
                .filter((other) => other !== pillar)
                .map((other) => {
                  const o = PILLAR_META[other];
                  return (
                    <Link
                      key={other}
                      href={`/${other}`}
                      className="label-caps transition-colors hover:opacity-80"
                      style={{ color: o.accent }}
                    >
                      {o.chapter} &middot; {o.label} &rarr;
                    </Link>
                  );
                })}
            </nav>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <div className="bg-[var(--bg)] p-4 text-left">
      <span className="label-caps text-[var(--text-muted)] block mb-2">
        {label}
      </span>
      <span
        className="font-serif text-[20px] md:text-[24px] tracking-tight font-light"
        style={{ color: accent }}
      >
        {value}
      </span>
    </div>
  );
}
