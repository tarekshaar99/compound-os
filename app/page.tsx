import CheckoutButton from "./components/CheckoutButton";
import CheckoutCTA from "./components/CheckoutCTA";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HowItWorks from "./components/HowItWorks";
import MobileCTA from "./components/MobileCTA";
import ProductPreview from "./components/ProductPreview";
import { getPricing } from "./lib/pricing";
import { MODULES } from "./lib/modules";

// Render fresh every 30s so the founding-spots counter stays current
// without hammering the DB on every request.
export const revalidate = 30;

/* ────────────────────── DATA ────────────────────── */

/**
 * Public "what's in the product" feature list.
 *
 * Every bullet here maps to an actual module in `app/lib/modules.ts`.
 * If a bullet isn't backed by a real module, it does not belong on the
 * homepage. That rule is the whole reason this list looks short and
 * specific instead of puffy and long.
 */
const systemIncludes = [
  {
    pillar: "Markets",
    accent: "#00d4aa",
    icon: "\u25C8",
    tagline: "Capital-building without the gambling.",
    body: "Clear rules for sizing, drawdown, and the trades you shouldn\u2019t take.",
  },
  {
    pillar: "Fitness",
    accent: "#f97316",
    icon: "\u25B3",
    tagline: "Strong, mobile, durable \u2014 for decades.",
    body: "Hybrid training with honest answers on recovery and risk.",
  },
  {
    pillar: "Mindset",
    accent: "#a78bfa",
    icon: "\u25C9",
    tagline: "Execute on days you don\u2019t feel like it.",
    body: "Daily anchors and the structure that makes willpower unnecessary.",
  },
];

const forYou = [
  "You want structure, not motivation",
  "You have income and ambition but scattered execution",
  "You've bought courses that collected dust",
  "You want rules you can follow, not content to consume",
  "You're building something real and need your systems dialed in",
];

const notForYou = [
  "You\u2019re looking for signals, tips, or quick wins",
  "You prefer prescriptions over frameworks",
  "You want live coaching or ongoing accountability",
  "You believe more information is the answer",
];

function buildFaqs(isFounding: boolean) {
  const pricingFaq = isFounding
    ? {
        q: "Why is it $49?",
        a: "Early-access price while the founding window is open. $99 after. Same product.",
      }
    : {
        q: "How much is it?",
        a: "$99, one-time. Every future update included.",
      };

  return [
    {
      q: "Is this a course?",
      a: "No videos, no drip. A structured reference system of frameworks, checklists, and weekly protocols. An operating manual, not a lecture series.",
    },
    {
      q: "Do I need trading or investing experience?",
      a: "No. Markets opens with the vocabulary, the free tools that replace paid subscriptions, and the framework for telling investing apart from speculating.",
    },
    {
      q: "Will this be updated?",
      a: "Yes. New modules and refinements are added over time, covered by one payment.",
    },
    {
      q: "What if it\u2019s not for me?",
      a: "Fourteen-day refund, no questions. Past that, the purchase is final.",
    },
    pricingFaq,
    {
      q: "What format is the content in?",
      a: "A private web app. Each module is a short read with a principle, a worked example, a checklist, a quick quiz, and a reflection prompt. Progress saves automatically.",
    },
    {
      q: "Can I access it on my phone?",
      a: "Yes. Fully responsive. Built to open on the phone during your market session, at the gym, or in the morning.",
    },
  ];
}

/* ────────────────────── PAGE ────────────────────── */

export default async function Home() {
  const pricing = await getPricing();
  const faqs = buildFaqs(pricing.isFounding);
  const moduleCount = MODULES.length; // single source of truth
  const totalMinutes = MODULES.reduce((a, m) => a + m.estMinutes, 0);

  const priceBig = pricing.display; // "$49" or "$99"
  const anchorPrice = pricing.standardDisplay; // always "$99"
  const foundingTag = pricing.isFounding
    ? `Founding Member \u00b7 early access pricing`
    : `Standard pricing \u00b7 founding window closed`;
  const foundingNote = pricing.isFounding
    ? `Every future update included.`
    : `Every future update included.`;
  const heroSubcopy = pricing.isFounding
    ? `${anchorPrice} after the founding window.`
    : `One-time. Every future update included.`;
  const primaryCtaLabel = `Get Compound OS \u00b7 ${priceBig}`;
  const stackedCtaLabel = `Get Compound OS \u00b7 ${priceBig}`;
  const finalCtaSubcopy = pricing.isFounding
    ? `${anchorPrice} after the founding window`
    : `No subscription. No upsells.`;

  // Module list, grouped by pillar, for the transparent TOC section.
  const pillarOrder: Array<{ key: "trading" | "fitness" | "mindset"; label: string; accent: string }> = [
    { key: "trading", label: "Markets", accent: "#00d4aa" },
    { key: "fitness", label: "Fitness", accent: "#f97316" },
    { key: "mindset", label: "Mindset", accent: "#a78bfa" },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* ───── HERO ───── */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 pt-28 pb-14 md:pt-36 md:pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[var(--accent)]/5 rounded-full blur-[120px] pointer-events-none" />

        <h1 className="relative text-[1.75rem] md:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-[var(--text-primary)] leading-[1.15] max-w-3xl">
          A practical operating system for trading, fitness, and self-discipline.
        </h1>
        <p className="relative mt-5 text-[var(--text-secondary)] text-base md:text-xl max-w-xl mx-auto leading-relaxed">
          {moduleCount} focused modules across Markets, Fitness, and Mindset.
          Rules, checklists, and weekly protocols built to execute, not consume.
        </p>

        <div className="relative mt-8 md:mt-10">
          <CheckoutButton className="px-10 py-4 rounded-xl bg-[var(--accent)] text-[#0a0b0f] font-bold text-base transition-all hover:opacity-90 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_-6px_rgba(0,212,170,0.35)] cursor-pointer">
            {primaryCtaLabel}
          </CheckoutButton>
          <p className="mt-3.5 text-sm text-[var(--text-muted)]">
            {heroSubcopy}
          </p>
        </div>

        {/* Trust strip */}
        <div className="relative mt-12 flex flex-wrap justify-center gap-x-6 gap-y-2.5 text-xs text-[var(--text-muted)]">
          <span className="flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
            {moduleCount} modules across 3 pillars
          </span>
          <span className="flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
            Roughly {Math.round(totalMinutes / 60 * 10) / 10} hours of applied content
          </span>
        </div>
      </section>

      {/* ───── SEE INSIDE ───── */}
      <section className="px-6 pt-4 pb-16 md:pb-24">
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-medium">
            Preview the product
          </p>
        </div>
        <ProductPreview />
      </section>

      {/* ───── PROBLEM ───── */}
      <section className="px-6 py-16 md:py-24 bg-[var(--sidebar-bg)]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-8 tracking-tight">
            You don&apos;t need more information.<br className="hidden sm:block" />
            You need a system that runs.
          </h2>
          <div className="space-y-4 text-left">
            {[
              "You\u2019ve saved the posts and read the threads, and still feel scattered when it\u2019s time to execute.",
              "You start strong Monday and lose structure by Wednesday.",
              "You know what to do in theory but have no concrete rules for practice.",
              "You\u2019re burning energy deciding what to do instead of doing it.",
            ].map((line, i) => (
              <div key={i} className="flex items-start gap-3.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-muted)] mt-2.5 shrink-0" />
                <p className="text-[var(--text-secondary)] text-[15px] md:text-base leading-relaxed">
                  {line}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-[var(--text-primary)] text-[15px] md:text-base font-medium leading-relaxed max-w-lg mx-auto">
            Compound OS replaces the noise with clear rules and repeatable protocols across the three areas that actually compound.
          </p>
        </div>
      </section>

      {/* ───── WHAT'S INSIDE ───── */}
      <section id="whats-inside" className="px-6 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4 tracking-tight">
              What you get
            </h2>
            <p className="text-[var(--text-secondary)] max-w-lg mx-auto text-[15px]">
              Three pillars. One system.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {systemIncludes.map((pillar) => (
              <div
                key={pillar.pillar}
                className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-6 md:p-7"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                    style={{
                      background: `color-mix(in srgb, ${pillar.accent} 12%, transparent)`,
                      color: pillar.accent,
                    }}
                  >
                    {pillar.icon}
                  </div>
                  <h3
                    className="text-lg font-bold tracking-tight"
                    style={{ color: pillar.accent }}
                  >
                    {pillar.pillar}
                  </h3>
                </div>
                <p className="text-[13px] text-[var(--text-primary)] font-medium mb-2 leading-relaxed">
                  {pillar.tagline}
                </p>
                <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
                  {pillar.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── THE FULL TABLE OF CONTENTS ───── */}
      <section className="px-6 py-16 md:py-24 bg-[var(--sidebar-bg)]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-medium mb-3">
              Full table of contents
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] tracking-tight">
              Every module, every minute.
            </h2>
          </div>

          <div className="space-y-10">
            {pillarOrder.map((po) => {
              const pillarMods = MODULES.filter((m) => m.pillar === po.key);
              return (
                <div key={po.key}>
                  <div className="flex items-baseline justify-between mb-4 pb-3 border-b border-[var(--border)]">
                    <h3 className="text-sm font-bold uppercase tracking-widest" style={{ color: po.accent }}>
                      {po.label}
                    </h3>
                    <span className="text-[11px] text-[var(--text-muted)]">
                      {pillarMods.length} modules
                    </span>
                  </div>
                  <ul className="divide-y divide-[var(--border)]">
                    {pillarMods.map((m) => (
                      <li key={m.id} className="flex items-center justify-between py-2.5 gap-4">
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] w-20 shrink-0">
                            {m.tier === "core" ? "Core" : "Advanced"}
                          </span>
                          <span className="text-[14px] text-[var(--text-secondary)] truncate">
                            {m.title}
                          </span>
                        </div>
                        <span className="text-[11px] text-[var(--text-muted)] shrink-0 whitespace-nowrap">
                          {m.estMinutes} min
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <p className="mt-10 text-center text-xs text-[var(--text-muted)]">
            Plus reference playbooks with templates and quick-access cheat sheets for each pillar.
          </p>
        </div>
      </section>

      {/* ───── HOW IT WORKS ───── */}
      <HowItWorks label={stackedCtaLabel} />

      {/* ───── WHO IT'S FOR / NOT FOR ───── */}
      <section className="px-6 py-16 md:py-24 bg-[var(--sidebar-bg)]">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-7">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-lg bg-[var(--accent)]/12 flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
              <h3 className="text-base font-bold text-[var(--text-primary)]">
                Built for you if
              </h3>
            </div>
            <ul className="space-y-3.5">
              {forYou.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-[var(--accent)] mt-1.5 shrink-0 text-[8px]">●</span>
                  <span className="text-[var(--text-secondary)] text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-7">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-lg bg-[#ef4444]/12 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5"><path d="M18 6 6 18M6 6l12 12" /></svg>
              </div>
              <h3 className="text-base font-bold text-[var(--text-primary)]">
                Not for you if
              </h3>
            </div>
            <ul className="space-y-3.5">
              {notForYou.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-[#ef4444] mt-1.5 shrink-0 text-[8px]">●</span>
                  <span className="text-[var(--text-secondary)] text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ───── WHY THIS EXISTS ───── */}
      <section className="px-6 py-16 md:py-24">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xs uppercase tracking-widest text-[var(--accent)] font-medium mb-8 text-center">
            Why this exists
          </h2>
          <p className="text-[var(--text-secondary)] text-[15px] leading-[1.9] mb-6">
            I built Compound OS after years of learning the expensive way — courses that overpromised, injuries from ego-driven training, inconsistent execution. Eventually I stopped chasing information and started building systems.
          </p>
          <div className="pt-5 border-t border-[var(--border)]">
            <p className="text-[var(--text-primary)] text-[15px] leading-relaxed font-medium">
              This is the one I wish I had earlier. Built for myself first. Shared because it works better than scattered notes and half-finished courses.
            </p>
          </div>
        </div>
      </section>

      {/* ───── OFFER STACK ───── */}
      <section id="pricing" className="px-6 py-16 md:py-24 bg-[var(--sidebar-bg)]">
        <div className="max-w-xl mx-auto">
          <div className="relative bg-[var(--card-bg)] border border-[var(--accent)]/20 rounded-2xl p-8 md:p-12 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[150px] bg-[var(--accent)]/8 rounded-full blur-[80px] pointer-events-none" />

            <div className="relative flex justify-center mb-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/8 text-[11px] font-semibold text-[var(--accent)] uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                {foundingTag}
              </span>
            </div>

            <div className="relative text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] tracking-tight">
                Full system. One price.
              </h2>
            </div>

            <div className="relative text-center mb-8">
              <div className="mb-1 flex items-baseline justify-center gap-3">
                {pricing.isFounding && (
                  <span className="text-3xl md:text-4xl font-bold text-[var(--text-muted)] line-through decoration-2">
                    {anchorPrice}
                  </span>
                )}
                <span className="text-6xl md:text-7xl font-bold text-[var(--accent)]">
                  {priceBig}
                </span>
              </div>
              <p className="text-sm text-[var(--text-muted)] mt-2">
                one-time &middot; no subscription
              </p>
              <p className="text-xs text-[var(--accent)]/90 font-medium mt-3">
                {foundingNote}
              </p>
            </div>

            {/* What you actually get */}
            <ul className="relative space-y-3 max-w-sm mx-auto mb-10">
              {[
                "All three pillars, every module",
                "Checklists, templates, and weekly protocols",
                "Progress saved to any device",
                "Fourteen-day refund",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" className="mt-0.5 shrink-0"><polyline points="20 6 9 17 4 12" /></svg>
                  <span className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <div className="relative">
              <CheckoutCTA label={stackedCtaLabel} />
              <p className="mt-4 text-xs text-[var(--text-muted)] text-center">
                Already have access?{" "}
                <a
                  href="/login"
                  className="text-[var(--text-secondary)] hover:text-[var(--accent)] underline underline-offset-4 decoration-[var(--border)] transition-colors"
                >
                  Sign in &rarr;
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───── FAQ ───── */}
      <section className="px-6 py-16 md:py-24">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] text-center mb-10 tracking-tight">
            Questions
          </h2>

          <div className="space-y-0">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group border-b border-[var(--border)] [&:first-child]:border-t"
              >
                <summary className="flex items-center justify-between py-5 cursor-pointer list-none text-[var(--text-primary)] font-medium text-[15px] hover:text-[var(--accent)] transition-colors">
                  {faq.q}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="shrink-0 ml-4 transition-transform duration-200 group-open:rotate-45 text-[var(--text-muted)]"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </summary>
                <p className="pb-5 text-sm text-[var(--text-secondary)] leading-relaxed pr-8">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ───── FINAL CTA ───── */}
      <section className="px-6 py-16 md:py-24 bg-[var(--sidebar-bg)]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4 tracking-tight">
            Start executing.
          </h2>
          <p className="text-[var(--text-secondary)] mb-10 text-base md:text-lg max-w-md mx-auto">
            One payment. Instant access.
          </p>

          <CheckoutButton className="inline-block px-10 py-4 rounded-xl bg-[var(--accent)] text-[#0a0b0f] font-bold text-lg transition-all hover:opacity-90 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_-6px_rgba(0,212,170,0.35)] cursor-pointer">
            {stackedCtaLabel}
          </CheckoutButton>

          <p className="mt-5 text-xs text-[var(--text-muted)]">
            {finalCtaSubcopy}
          </p>
        </div>
      </section>

      <Footer />

      <MobileCTA />
    </div>
  );
}
