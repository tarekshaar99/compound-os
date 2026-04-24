import CheckoutButton from "./CheckoutButton";

const STREAK: Array<"" | "l1" | "l2" | "l3" | "l4"> = [
  // row 1
  "l1","l1","l2","l1","l2","l3","l2","l3","l3","l4","l3","l4","l4","l4",
  // row 2
  "l2","l3","l2","l3","l3","l4","l3","l4","l4","l3","l4","l4","l4","l4",
];

const streakBg = {
  "":   "#191a22",
  l1: "rgba(0,212,170,0.18)",
  l2: "rgba(0,212,170,0.38)",
  l3: "rgba(0,212,170,0.62)",
  l4: "var(--accent)",
} as const;

export default function HowItWorks({ label }: { label: string }) {
  return (
    <section
      id="how-it-works"
      className="relative px-6 overflow-hidden bg-[var(--bg)]"
      style={{ padding: "112px 24px 128px" }}
    >
      {/* Decorative glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "8%",
          left: "50%",
          width: 720,
          height: 360,
          transform: "translateX(-50%)",
          background: "radial-gradient(ellipse at center, rgba(0,212,170,0.06), transparent 60%)",
          filter: "blur(80px)",
          zIndex: 0,
        }}
      />

      <div className="relative z-10 max-w-[1120px] mx-auto">

        {/* ── Header ── */}
        <div className="text-center max-w-[760px] mx-auto mb-[72px]">
          <p
            className="inline-flex items-center gap-[10px] font-mono text-[12px] font-medium uppercase text-[var(--accent)] mb-5"
            style={{ letterSpacing: "0.18em" }}
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--accent)]"
              style={{ boxShadow: "0 0 12px rgba(0,212,170,0.6)" }}
            />
            The System
          </p>
          <h2
            className="font-bold text-[var(--text-primary)] mb-5"
            style={{
              fontSize: "clamp(32px, 4.6vw, 48px)",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            How Compound OS works
          </h2>
          <p className="text-[18px] text-[var(--text-secondary)] leading-[1.55]">
            From scattered inputs to a daily operating rhythm. Three stages. No theory.
          </p>
        </div>

        {/* ── Steps grid ── */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-5">

          {/* Desktop connector line */}
          <div
            className="hidden md:block absolute z-0 h-px pointer-events-none"
            style={{
              top: 56,
              left: "calc(16.6667% + 12px)",
              right: "calc(16.6667% + 12px)",
              background:
                "linear-gradient(to right, transparent 0%, var(--border) 8%, var(--border) 92%, transparent 100%)",
            }}
          />

          {/* ─── Step 01 - Assess ─── */}
          <article className="relative z-10 bg-[var(--card-bg)] border border-[var(--border)] rounded-[18px] flex flex-col gap-5 transition-all duration-[220ms] hover:-translate-y-[3px] hover:border-[var(--text-muted)] hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.6)]" style={{ padding: "28px 28px 24px" }}>
            <div className="flex items-center gap-[14px]">
              <div className="font-mono text-[13px] font-semibold text-[var(--text-primary)] w-10 h-10 rounded-[10px] bg-[var(--card-bg-2)] border border-[var(--border)] flex items-center justify-center shrink-0">
                01
              </div>
              <span className="font-mono text-[11px] font-medium uppercase text-[var(--text-muted)]" style={{ letterSpacing: "0.18em" }}>
                Stage One
              </span>
            </div>
            <h3 className="text-[26px] font-bold text-[var(--text-primary)] m-0" style={{ letterSpacing: "-0.02em", lineHeight: 1.15 }}>
              Assess
            </h3>
            <p className="text-[14.5px] text-[var(--text-secondary)] leading-[1.65] m-0">
              Identify where you are losing control across capital, body, and discipline. Honest diagnostics before any prescription.
            </p>

            {/* Artifact: diagnostic scores */}
            <div className="mt-auto bg-[#0c0d12] border border-[var(--border)] rounded-[12px] font-mono text-[12px] text-[var(--text-secondary)]" style={{ padding: "16px 16px 14px" }}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10.5px] font-medium uppercase text-[var(--text-muted)]" style={{ letterSpacing: "0.18em" }}>Baseline</span>
                <span className="text-[10.5px] text-[var(--text-muted)]" style={{ letterSpacing: "0.06em" }}>WEEK 00</span>
              </div>
              {[
                { label: "Capital",    score: "UNSTRUCTURED", color: "#ef4444" },
                { label: "Body",       score: "INCONSISTENT", color: "#f97316" },
                { label: "Discipline", score: "REACTIVE",     color: "#ef4444" },
              ].map((row, i, arr) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between gap-3"
                  style={{
                    padding: i === 0 ? "2px 0 8px" : i === arr.length - 1 ? "8px 0 2px" : "8px 0",
                    borderBottom: i < arr.length - 1 ? "1px solid var(--border-soft)" : "none",
                  }}
                >
                  <span className="font-sans text-[13px] font-medium text-[var(--text-primary)]">{row.label}</span>
                  <span className="font-mono text-[11.5px]" style={{ letterSpacing: "0.04em", color: row.color }}>{row.score}</span>
                </div>
              ))}
            </div>
          </article>

          {/* ─── Step 02 - Operate ─── */}
          <article className="relative z-10 bg-[var(--card-bg)] border border-[var(--border)] rounded-[18px] flex flex-col gap-5 transition-all duration-[220ms] hover:-translate-y-[3px] hover:border-[var(--text-muted)] hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.6)]" style={{ padding: "28px 28px 24px" }}>
            <div className="flex items-center gap-[14px]">
              <div className="font-mono text-[13px] font-semibold text-[var(--text-primary)] w-10 h-10 rounded-[10px] bg-[var(--card-bg-2)] border border-[var(--border)] flex items-center justify-center shrink-0">
                02
              </div>
              <span className="font-mono text-[11px] font-medium uppercase text-[var(--text-muted)]" style={{ letterSpacing: "0.18em" }}>
                Stage Two
              </span>
            </div>
            <h3 className="text-[26px] font-bold text-[var(--text-primary)] m-0" style={{ letterSpacing: "-0.02em", lineHeight: 1.15 }}>
              Operate
            </h3>
            <p className="text-[14.5px] text-[var(--text-secondary)] leading-[1.65] m-0">
              Follow clear modules, checklists, and weekly protocols across Trading, Fitness, and Mindset. One system, executed.
            </p>

            {/* Artifact: active modules */}
            <div className="mt-auto bg-[#0c0d12] border border-[var(--border)] rounded-[12px] font-mono text-[12px] text-[var(--text-secondary)]" style={{ padding: "16px 16px 14px" }}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10.5px] font-medium uppercase text-[var(--text-muted)]" style={{ letterSpacing: "0.18em" }}>Active Modules</span>
                <span className="text-[10.5px] text-[var(--text-muted)]" style={{ letterSpacing: "0.06em" }}>WEEKLY</span>
              </div>
              {[
                { glyph: "◈", color: "var(--accent-trading)", name: "Trading", sub: "Pre-trade checklist", tag: "03 / 03" },
                { glyph: "△", color: "var(--accent-fitness)", name: "Fitness", sub: "Strength & Zone 2",    tag: "05 / 05" },
                { glyph: "◉", color: "var(--accent-mindset)", name: "Mindset", sub: "Daily journal",        tag: "07 / 07" },
              ].map((row, i, arr) => (
                <div
                  key={row.name}
                  className="grid items-center gap-3"
                  style={{
                    gridTemplateColumns: "22px 1fr auto",
                    padding: i === 0 ? "2px 0 9px" : i === arr.length - 1 ? "9px 0 2px" : "9px 0",
                    borderBottom: i < arr.length - 1 ? "1px solid var(--border-soft)" : "none",
                  }}
                >
                  <span className="font-mono text-[14px] text-center leading-none" style={{ color: row.color }}>{row.glyph}</span>
                  <span className="font-sans text-[13px] font-medium text-[var(--text-primary)]">
                    {row.name}{" "}
                    <span className="text-[var(--text-muted)] font-normal">· {row.sub}</span>
                  </span>
                  <span className="font-mono text-[10.5px] text-[var(--text-muted)]" style={{ letterSpacing: "0.08em" }}>{row.tag}</span>
                </div>
              ))}
            </div>
          </article>

          {/* ─── Step 03 - Compound ─── */}
          <article className="relative z-10 bg-[var(--card-bg)] border border-[var(--border)] rounded-[18px] flex flex-col gap-5 transition-all duration-[220ms] hover:-translate-y-[3px] hover:border-[var(--text-muted)] hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.6)]" style={{ padding: "28px 28px 24px" }}>
            <div className="flex items-center gap-[14px]">
              <div className="font-mono text-[13px] font-semibold text-[var(--text-primary)] w-10 h-10 rounded-[10px] bg-[var(--card-bg-2)] border border-[var(--border)] flex items-center justify-center shrink-0">
                03
              </div>
              <span className="font-mono text-[11px] font-medium uppercase text-[var(--text-muted)]" style={{ letterSpacing: "0.18em" }}>
                Stage Three
              </span>
            </div>
            <h3 className="text-[26px] font-bold text-[var(--text-primary)] m-0" style={{ letterSpacing: "-0.02em", lineHeight: 1.15 }}>
              Compound
            </h3>
            <p className="text-[14.5px] text-[var(--text-secondary)] leading-[1.65] m-0">
              Build consistency, reduce chaos, and make better decisions repeatedly. Small edges stacked over months.
            </p>

            {/* Artifact: streak grid */}
            <div className="mt-auto bg-[#0c0d12] border border-[var(--border)] rounded-[12px] font-mono text-[12px] text-[var(--text-secondary)]" style={{ padding: "16px 16px 14px" }}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10.5px] font-medium uppercase text-[var(--text-muted)]" style={{ letterSpacing: "0.18em" }}>Consistency</span>
                <span className="text-[10.5px] text-[var(--text-muted)]" style={{ letterSpacing: "0.06em" }}>84 DAYS</span>
              </div>
              <div className="grid gap-1 mb-3" style={{ gridTemplateColumns: "repeat(14, 1fr)" }}>
                {STREAK.map((level, i) => (
                  <span
                    key={i}
                    className="rounded-[3px]"
                    style={{ aspectRatio: "1/1", background: streakBg[level] }}
                  />
                ))}
              </div>
              <div
                className="flex items-center justify-between font-mono uppercase text-[var(--text-muted)]"
                style={{ fontSize: "10.5px", letterSpacing: "0.06em" }}
              >
                <span>Streak</span>
                <span className="text-[var(--text-primary)]" style={{ fontSize: 12, letterSpacing: "0.02em" }}>21 / 21</span>
              </div>
            </div>
          </article>

        </div>

        {/* ── CTA ── */}
        <div className="mt-[72px] flex flex-col items-center gap-4">
          <CheckoutButton
            className="inline-flex items-center gap-[10px] px-7 py-4 bg-[var(--accent)] text-[#0a0b0f] rounded-[12px] font-sans text-[15px] font-bold tracking-[-0.005em] cursor-pointer border-0 transition-all duration-[180ms] hover:opacity-[0.92] hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-6px_rgba(0,212,170,0.4)]"
          >
            {label}
            <span className="font-mono font-medium transition-transform duration-[180ms] group-hover:translate-x-[3px]">→</span>
          </CheckoutButton>
          <p className="text-[14px] text-[var(--text-muted)] m-0">One-time access. No subscription.</p>
        </div>

      </div>
    </section>
  );
}
