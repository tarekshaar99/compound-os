import Link from "next/link";
import CheckoutButton from "./components/CheckoutButton";
import LoginForm from "./components/LoginForm";
import Header from "./components/Header";

const deliverables = [
  "Options trading system (Wheel, spreads, VIX framework)",
  "Capital allocation model (risk-based)",
  "Pre-trade checklist & execution rules",
  "Weekly trading routine",
  "Hybrid athlete training system (strength + cardio)",
  "Nutrition & recovery protocols",
  "Discipline & journaling framework",
];

const forYou = [
  "You are building capital and want structure",
  "You struggle with consistency and discipline",
  "You want a system, not motivation",
];

const notForYou = [
  "You are looking for quick wins or signals",
  "You avoid responsibility",
  "You want passive learning without execution",
];

const sections = [
  {
    title: "Trading",
    href: "/trading",
    accent: "var(--accent-trading)",
    icon: "◈",
    description:
      "Options framework, capital allocation, risk management, macro regimes, and pre-trade checklists. A complete system for building capital with discipline.",
    tag: "Lead pillar",
  },
  {
    title: "Fitness",
    href: "/fitness",
    accent: "var(--accent-fitness)",
    icon: "△",
    description:
      "Hybrid athlete training: 3x strength sessions with TUT, 2-3 cardio sessions (Zone 2 + intervals), nutrition protocols, mobility, and recovery.",
    tag: "Physical edge",
  },
  {
    title: "Mindset",
    href: "/mindset",
    accent: "var(--accent-mindset)",
    icon: "◉",
    description:
      "Discipline systems, emotional control, decision-making frameworks, and daily practice routines. The mental infrastructure behind consistent execution.",
    tag: "Mental control",
  },
];

const pricingChecklist = [
  "Full OTU options trading framework",
  "VIX allocation model & macro regimes",
  "Hybrid athlete training program",
  "Nutrition & recovery protocols",
  "Discipline & journaling system",
  "All future updates included",
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* ───── HERO ───── */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        {/* Subtle gradient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[var(--accent)]/5 rounded-full blur-[120px] pointer-events-none" />

        <p className="relative text-sm uppercase tracking-widest text-[var(--accent)] font-medium mb-6">
          by Tarek Shaar
        </p>
        <h1 className="relative text-2xl md:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-[var(--text-primary)] leading-snug md:leading-tight max-w-4xl">
          I was a depressed, overweight kid who couldn&apos;t hold eye contact, lost thousands chasing crypto, paid $15k for courses that taught me nothing, and spent years building in silence because being seen meant being hurt.
        </h1>
        <p className="relative mt-8 text-[var(--text-secondary)] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          This site is everything I had to figure out alone.
        </p>

        <div className="relative mt-10 flex flex-col sm:flex-row gap-4">
          <CheckoutButton className="px-8 py-4 rounded-xl bg-[var(--accent)] text-[#0a0b0f] font-bold text-base transition-all hover:opacity-90 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_-6px_rgba(0,212,170,0.35)] cursor-pointer">
            Get the System — $29
          </CheckoutButton>
          <a
            href="#what-you-get"
            className="px-8 py-4 rounded-xl border border-[var(--border)] text-[var(--text-primary)] font-medium text-base transition-all hover:border-[var(--text-muted)] hover:-translate-y-0.5"
          >
            View What&apos;s Inside
          </a>
        </div>
      </section>

      {/* ───── HOW I GOT HERE ───── */}
      <section className="px-6 py-20 md:py-28">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xs uppercase tracking-widest text-[var(--accent)] font-medium mb-10 text-center">
            How I got here
          </h2>
          <div className="space-y-8">
            <p className="text-[var(--text-secondary)] text-base md:text-lg leading-[1.9]">
              I started lifting to prove something. Ego lifted until I broke my shoulder and lower back. Switched to powerlifting - realized it was feeding the same ego. Went to the other extreme: triathlon training, full cardio, vegan. I do this - I swing hard until something breaks, then I recalibrate. Eventually I found what actually works: a simple hybrid routine, 3x strength per week, Zone 2 cardio on off days, consistent protein. Nothing extreme. Just repeatable.
            </p>

            <p className="text-[var(--text-secondary)] text-base md:text-lg leading-[1.9]">
              I ran a crypto mining farm in 2019. Scaled it up, watched it collapse. Tried to recover through day trading - lost more. Paid $15,000 across multiple courses chasing strategies from 20-year-olds posting PnL screenshots. What I eventually learned: a realistic return is 3-5% per month. If you&apos;re not making 11% per year, you&apos;re losing to inflation. The answer wasn&apos;t a hot strategy. It was a boring, conservative wheel strategy on quality stocks, managed by VIX, compounded over time.
            </p>

            <p className="text-[var(--text-secondary)] text-base md:text-lg leading-[1.9]">
              During COVID I hit a wall I couldn&apos;t lift or trade my way out of. I started journaling, meditating, reading - Eckhart Tolle, Alan Watts, Aaron Abke, Neville Goddard. For the first time I looked directly at how I was wired instead of running from it. What I found: almost everything I was chasing was fear in disguise. The mindset section is my complete notes from that period - what actually shifted things, not what sounds good.
            </p>

            <div className="pt-6 border-t border-[var(--border)]">
              <p className="text-[var(--text-primary)] text-base md:text-lg leading-relaxed font-medium">
                The Compound System is what I built after all of that. Three pillars that reinforce each other - because they did in real life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───── WHAT YOU GET ───── */}
      <section id="what-you-get" className="px-6 py-20 md:py-28 bg-[var(--sidebar-bg)]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] text-center mb-4">
            What you get inside Compound OS
          </h2>
          <p className="text-[var(--text-secondary)] text-center mb-12 max-w-lg mx-auto">
            Every framework, checklist, and protocol - structured and ready to use.
          </p>

          <div className="grid gap-4">
            {deliverables.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-5 bg-[var(--card-bg)] border border-[var(--border)] rounded-xl hover:border-[var(--accent)]/30 transition-colors"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] text-sm font-bold font-mono mt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <p className="text-[var(--text-primary)] text-base leading-relaxed">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── SECTION PILLARS ───── */}
      <section className="px-6 py-20 md:py-28">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] text-center mb-4">
            Three pillars. One system.
          </h2>
          <p className="text-[var(--text-secondary)] text-center mb-12 max-w-lg mx-auto">
            Each section is built to stand alone, but they compound together.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sections.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="group bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-8 transition-all hover:border-[var(--text-muted)] hover:-translate-y-1 hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.5)]"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="text-2xl w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{
                      background: `color-mix(in srgb, ${s.accent} 12%, transparent)`,
                      color: s.accent,
                    }}
                  >
                    {s.icon}
                  </div>
                  <span
                    className="text-xs uppercase tracking-wider font-medium"
                    style={{ color: s.accent }}
                  >
                    {s.tag}
                  </span>
                </div>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ color: s.accent }}
                >
                  {s.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {s.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ───── WHO THIS IS FOR / NOT FOR ───── */}
      <section className="px-6 py-20 md:py-28 bg-[var(--sidebar-bg)]">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* FOR */}
          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/12 flex items-center justify-center text-[var(--accent)] text-lg">
                ✓
              </div>
              <h3 className="text-xl font-bold text-[var(--text-primary)]">
                This is for you if:
              </h3>
            </div>
            <ul className="space-y-4">
              {forYou.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-[var(--accent)] mt-1 flex-shrink-0">●</span>
                  <span className="text-[var(--text-secondary)] leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* NOT FOR */}
          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#ef4444]/12 flex items-center justify-center text-[#ef4444] text-lg">
                ✕
              </div>
              <h3 className="text-xl font-bold text-[var(--text-primary)]">
                This is NOT for you if:
              </h3>
            </div>
            <ul className="space-y-4">
              {notForYou.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-[#ef4444] mt-1 flex-shrink-0">●</span>
                  <span className="text-[var(--text-secondary)] leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ───── HOW IT WORKS ───── */}
      <section className="px-6 py-20 md:py-28">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-12">
            How it works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Instant access",
                desc: "Get access immediately after purchase. No waiting, no drip content.",
              },
              {
                step: "02",
                title: "Structured dashboard",
                desc: "Everything organized in a Notion-style system. Navigate by section, not by guesswork.",
              },
              {
                step: "03",
                title: "A living document",
                desc: "Refined as the system evolves. This is a living document, not a static course.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-8 text-left"
              >
                <span className="text-sm font-mono text-[var(--accent)] mb-3 block">
                  {item.step}
                </span>
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── PRICING ───── */}
      <section id="pricing" className="px-6 py-20 md:py-28 bg-[var(--sidebar-bg)]">
        <div className="max-w-xl mx-auto">
          <div className="relative bg-[var(--card-bg)] border border-[var(--accent)]/20 rounded-2xl p-10 md:p-14 text-center overflow-hidden">
            {/* Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[150px] bg-[var(--accent)]/8 rounded-full blur-[80px] pointer-events-none" />

            <h2 className="relative text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-8">
              One-time access. No subscription.
            </h2>

            <div className="relative mb-2">
              <span className="text-6xl md:text-7xl font-bold text-[var(--accent)]">$29</span>
            </div>
            <p className="relative text-sm text-[var(--text-muted)] mb-8">
              one-time payment
            </p>

            <p className="relative text-[var(--text-secondary)] text-base leading-relaxed mb-10 max-w-md mx-auto">
              Lifetime access to all three pillars - trading, fitness, and mindset. Updated as the system evolves.
            </p>

            <ul className="relative space-y-4 text-left max-w-sm mx-auto mb-10">
              {pricingChecklist.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-[var(--accent)] mt-0.5 flex-shrink-0">✓</span>
                  <span className="text-[var(--text-secondary)] leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            <CheckoutButton className="relative inline-block px-10 py-4 rounded-xl bg-[var(--accent)] text-[#0a0b0f] font-bold text-lg transition-all hover:opacity-90 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_-6px_rgba(0,212,170,0.35)] w-full sm:w-auto cursor-pointer">
              Get the System
            </CheckoutButton>
          </div>
        </div>
      </section>

      {/* ───── SIGN IN / CREATE ACCOUNT ───── */}
      <section id="login" className="px-6 py-20 md:py-28">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-3">
              Member Access
            </h2>
            <p className="text-[var(--text-secondary)] text-sm">
              Sign in to your account or create one after purchasing.
            </p>
          </div>

          <LoginForm />

          <p className="text-center text-sm text-[var(--text-muted)] mt-6">
            No password needed - we&apos;ll email you a secure link.
          </p>
        </div>
      </section>

      {/* ───── COMMUNITY TEASER ───── */}
      <section className="px-6 py-16 md:py-20 bg-[var(--sidebar-bg)]">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-xl md:text-2xl font-bold text-[var(--text-muted)] mb-3">
            Community — Coming Soon
          </h3>
          <p className="text-[var(--text-muted)] text-base leading-relaxed">
            A space for people building in silence. No noise. Just execution.
          </p>
        </div>
      </section>

      {/* ───── FINAL CTA ───── */}
      <section className="px-6 py-20 md:py-28">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
            Stop guessing. Start executing.
          </h2>
          <p className="text-[var(--text-secondary)] mb-10 text-lg">
            One system. Full control.
          </p>

          <CheckoutButton className="inline-block px-10 py-4 rounded-xl bg-[var(--accent)] text-[#0a0b0f] font-bold text-lg transition-all hover:opacity-90 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_-6px_rgba(0,212,170,0.35)] cursor-pointer">
            Get the System — $29
          </CheckoutButton>

          <div className="mt-14 flex justify-center gap-4">
            <a
              href="https://wa.me/971585658488"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-5 py-3 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] text-sm font-medium transition-all hover:bg-[#25D366]/20 hover:-translate-y-0.5"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
            <a
              href="mailto:tarekshaar22@gmail.com"
              className="flex items-center gap-2.5 px-5 py-3 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/20 text-[var(--accent)] text-sm font-medium transition-all hover:bg-[var(--accent)]/20 hover:-translate-y-0.5"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              Email
            </a>
          </div>

          <p className="mt-10 text-xs text-[var(--text-muted)]">
            Built by someone still in the process. Not a guru. Just a system.
          </p>
        </div>
      </section>
    </div>
  );
}
