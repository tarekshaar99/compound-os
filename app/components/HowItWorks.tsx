import CheckoutButton from "./CheckoutButton";
import Reveal from "./motion/Reveal";
import { Stagger, StaggerItem } from "./motion/Stagger";

/**
 * "How Compound OS works" — three-stage editorial feature.
 *
 * Old version was a 3-card grid of rounded mono-style cards with traffic-light
 * artifacts. Reframed as an editorial three-stage spread: each stage gets a
 * Roman-numeral chapter mark, Newsreader serif title, hairline-bordered
 * artifact panel showing diagnostic / module / streak data.
 */

const STREAK: Array<"" | "l1" | "l2" | "l3" | "l4"> = [
  // row 1
  "l1","l1","l2","l1","l2","l3","l2","l3","l3","l4","l3","l4","l4","l4",
  // row 2
  "l2","l3","l2","l3","l3","l4","l3","l4","l4","l3","l4","l4","l4","l4",
];

const streakBg = {
  "":   "var(--card-bg)",
  l1: "rgba(191,154,98,0.18)",
  l2: "rgba(191,154,98,0.36)",
  l3: "rgba(191,154,98,0.6)",
  l4: "var(--accent)",
} as const;

export default function HowItWorks({ label }: { label: string }) {
  return (
    <section
      id="how-it-works"
      className="relative px-6 md:px-12 py-20 md:py-28 border-t border-[var(--border)]"
    >
      {/* Soft champagne wash */}
      <div
        aria-hidden
        className="absolute pointer-events-none top-[8%] left-1/2 -translate-x-1/2 w-[720px] h-[360px] opacity-[0.12]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(191,154,98,0.6), transparent 60%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative max-w-[1200px] mx-auto">
        {/* Header */}
        <Reveal className="text-center mb-16 md:mb-20 max-w-[760px] mx-auto">
          <p className="label-caps text-[var(--accent)] mb-4">
            The System
          </p>
          <h2 className="font-serif text-[34px] md:text-[48px] leading-[1.1] tracking-[-0.02em] text-[var(--text-primary)] font-light mb-5">
            How Compound OS works.
          </h2>
          <p className="font-serif italic text-[18px] md:text-[20px] text-[var(--text-secondary)] leading-[1.55]">
            From scattered inputs to a daily operating rhythm. Three stages.
            No theory.
          </p>
        </Reveal>

        {/* Stages — pixel-gap grid for monolithic interlocking feel */}
        <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)]">
          {/* Stage I: Assess */}
          <StaggerItem
            as="article"
            className="bg-[var(--bg)] p-7 md:p-8 flex flex-col gap-6 hover:bg-[var(--card-bg)] transition-colors duration-500"
          >
            <header>
              <div className="flex items-baseline justify-between mb-4 pb-3 border-b border-[var(--border)]">
                <span className="label-caps text-[var(--accent)]">
                  §I &middot; Assess
                </span>
                <span className="label-caps text-[var(--text-muted)]">
                  Wk 00
                </span>
              </div>
              <h3 className="font-serif text-[26px] md:text-[28px] leading-[1.15] tracking-tight text-[var(--text-primary)] font-light">
                Honest baseline.
              </h3>
              <p className="mt-3 font-serif italic text-[14px] md:text-[15px] text-[var(--text-secondary)] leading-[1.6]">
                Identify where you are losing control across capital, body,
                and discipline. Diagnostics before any prescription.
              </p>
            </header>

            {/* Diagnostic artifact */}
            <div className="mt-auto bg-[var(--card-bg)] border border-[var(--border)] p-5">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-[var(--border-soft)]">
                <span className="label-caps text-[var(--text-muted)]">
                  Baseline
                </span>
                <span className="label-caps text-[var(--text-muted)]">
                  Read
                </span>
              </div>
              {[
                { label: "Capital", score: "Unstructured", color: "#ff8a8a" },
                { label: "Body", score: "Inconsistent", color: "#ffb690" },
                { label: "Discipline", score: "Reactive", color: "#ff8a8a" },
              ].map((row, i, arr) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between gap-3 py-3"
                  style={{
                    borderBottom:
                      i < arr.length - 1
                        ? "1px solid var(--border-soft)"
                        : "none",
                  }}
                >
                  <span className="font-serif text-[15px] text-[var(--text-primary)]">
                    {row.label}
                  </span>
                  <span
                    className="label-caps"
                    style={{ color: row.color }}
                  >
                    {row.score}
                  </span>
                </div>
              ))}
            </div>
          </StaggerItem>

          {/* Stage II: Operate */}
          <StaggerItem
            as="article"
            className="bg-[var(--bg)] p-7 md:p-8 flex flex-col gap-6 hover:bg-[var(--card-bg)] transition-colors duration-500"
          >
            <header>
              <div className="flex items-baseline justify-between mb-4 pb-3 border-b border-[var(--border)]">
                <span className="label-caps text-[var(--accent)]">
                  §II &middot; Operate
                </span>
                <span className="label-caps text-[var(--text-muted)]">
                  Weekly
                </span>
              </div>
              <h3 className="font-serif text-[26px] md:text-[28px] leading-[1.15] tracking-tight text-[var(--text-primary)] font-light">
                Run the system.
              </h3>
              <p className="mt-3 font-serif italic text-[14px] md:text-[15px] text-[var(--text-secondary)] leading-[1.6]">
                Follow clear modules, checklists, and weekly protocols.
                Three pillars, executed.
              </p>
            </header>

            {/* Active modules artifact */}
            <div className="mt-auto bg-[var(--card-bg)] border border-[var(--border)] p-5">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-[var(--border-soft)]">
                <span className="label-caps text-[var(--text-muted)]">
                  Active modules
                </span>
                <span className="label-caps text-[var(--text-muted)]">
                  Done
                </span>
              </div>
              {[
                {
                  color: "var(--accent-trading)",
                  name: "Markets",
                  sub: "Pre-trade checklist",
                  tag: "03 / 03",
                },
                {
                  color: "var(--accent-fitness)",
                  name: "Fitness",
                  sub: "Strength & Zone 2",
                  tag: "05 / 05",
                },
                {
                  color: "var(--accent-mindset)",
                  name: "Mindset",
                  sub: "Daily journal",
                  tag: "07 / 07",
                },
              ].map((row, i, arr) => (
                <div
                  key={row.name}
                  className="flex items-center justify-between gap-3 py-3"
                  style={{
                    borderBottom:
                      i < arr.length - 1
                        ? "1px solid var(--border-soft)"
                        : "none",
                  }}
                >
                  <div className="flex items-baseline gap-3 min-w-0">
                    <span
                      className="label-caps shrink-0 w-16"
                      style={{ color: row.color }}
                    >
                      {row.name}
                    </span>
                    <span className="font-serif italic text-[13px] text-[var(--text-muted)] truncate">
                      {row.sub}
                    </span>
                  </div>
                  <span className="label-caps text-[var(--text-secondary)] tabular-nums shrink-0">
                    {row.tag}
                  </span>
                </div>
              ))}
            </div>
          </StaggerItem>

          {/* Stage III: Compound */}
          <StaggerItem
            as="article"
            className="bg-[var(--bg)] p-7 md:p-8 flex flex-col gap-6 hover:bg-[var(--card-bg)] transition-colors duration-500"
          >
            <header>
              <div className="flex items-baseline justify-between mb-4 pb-3 border-b border-[var(--border)]">
                <span className="label-caps text-[var(--accent)]">
                  §III &middot; Compound
                </span>
                <span className="label-caps text-[var(--text-muted)]">
                  84 days
                </span>
              </div>
              <h3 className="font-serif text-[26px] md:text-[28px] leading-[1.15] tracking-tight text-[var(--text-primary)] font-light">
                Stack edges.
              </h3>
              <p className="mt-3 font-serif italic text-[14px] md:text-[15px] text-[var(--text-secondary)] leading-[1.6]">
                Build consistency, reduce chaos, and make better decisions
                repeatedly. Small edges over months.
              </p>
            </header>

            {/* Streak artifact */}
            <div className="mt-auto bg-[var(--card-bg)] border border-[var(--border)] p-5">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-[var(--border-soft)]">
                <span className="label-caps text-[var(--text-muted)]">
                  Consistency
                </span>
                <span className="label-caps text-[var(--text-muted)]">
                  21 / 21
                </span>
              </div>
              <div
                className="grid gap-1"
                style={{ gridTemplateColumns: "repeat(14, 1fr)" }}
              >
                {STREAK.map((level, i) => (
                  <span
                    key={i}
                    style={{ aspectRatio: "1/1", background: streakBg[level] }}
                  />
                ))}
              </div>
            </div>
          </StaggerItem>
        </Stagger>

        {/* CTA */}
        <Reveal className="mt-16 md:mt-20 flex flex-col items-center gap-5">
          <CheckoutButton className="group inline-flex items-center gap-3 px-8 py-4 bg-[var(--accent)] text-[var(--on-accent)] label-caps border border-[var(--accent)] hover:bg-transparent hover:text-[var(--accent)] transition-all duration-500 cursor-pointer">
            {label}
            <span
              aria-hidden
              className="inline-block transition-transform duration-300 group-hover:translate-x-1"
            >
              &rarr;
            </span>
          </CheckoutButton>
          <p className="font-serif italic text-[14px] text-[var(--text-muted)]">
            One-time access. No subscription.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
