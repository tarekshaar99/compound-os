import CheckoutButton from "./components/CheckoutButton";
import CheckoutCTA from "./components/CheckoutCTA";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HowItWorks from "./components/HowItWorks";
import MobileCTA from "./components/MobileCTA";
import ProductPreview from "./components/ProductPreview";
import Reveal from "./components/motion/Reveal";
import { Stagger, StaggerItem } from "./components/motion/Stagger";
import WordsReveal from "./components/motion/WordsReveal";
import CountUp from "./components/motion/CountUp";
import { getPricing } from "./lib/pricing";
import { MODULES } from "./lib/modules";

// Render fresh every 30s so the founding-spots counter stays current
// without hammering the DB on every request.
export const revalidate = 30;

/* ────────────────────── DATA ────────────────────── */

const systemIncludes = [
  {
    pillar: "Markets",
    accent: "var(--accent-trading)",
    chapter: "Chapter I",
    tagline: "Capital-building without the gambling.",
    body:
      "Clear rules for sizing, drawdown, and the trades you shouldn’t take. Dispassionate frameworks where conviction usually fails.",
  },
  {
    pillar: "Fitness",
    accent: "var(--accent-fitness)",
    chapter: "Chapter II",
    tagline: "Strong, mobile, durable — for decades.",
    body:
      "Hybrid training with honest answers on recovery, intensity, and risk. The protocols that compound across a decade, not a season.",
  },
  {
    pillar: "Mindset",
    accent: "var(--accent-mindset)",
    chapter: "Chapter III",
    tagline: "Execute on days you don’t feel like it.",
    body:
      "Daily anchors and the operational structure that makes willpower unnecessary. Built for operators, not the inspired.",
  },
];

const forYou = [
  "You want structure, not motivation",
  "You have income and ambition but scattered execution",
  "You’ve bought courses that collected dust",
  "You want rules you can follow, not content to consume",
  "You’re building something real and need your systems dialed in",
];

const notForYou = [
  "You’re looking for signals, tips, or quick wins",
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
      q: "What if it’s not for me?",
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
  const moduleCount = MODULES.length;
  const totalMinutes = MODULES.reduce((a, m) => a + m.estMinutes, 0);
  const hours = Math.round((totalMinutes / 60) * 10) / 10;

  const priceBig = pricing.display;
  const anchorPrice = pricing.standardDisplay;
  const foundingTag = pricing.isFounding
    ? "Founding Member · early access pricing"
    : "Standard pricing · founding window closed";
  const heroSubcopy = pricing.isFounding
    ? `${anchorPrice} after the founding window.`
    : `One-time. Every future update included.`;
  const primaryCtaLabel = `Get Compound OS · ${priceBig}`;
  const stackedCtaLabel = `Get Compound OS · ${priceBig}`;
  const finalCtaSubcopy = pricing.isFounding
    ? `${anchorPrice} after the founding window`
    : `No subscription. No upsells.`;

  const pillarOrder: Array<{
    key: "trading" | "fitness" | "mindset";
    label: string;
    accent: string;
  }> = [
    { key: "trading", label: "Markets", accent: "var(--accent-trading)" },
    { key: "fitness", label: "Fitness", accent: "var(--accent-fitness)" },
    { key: "mindset", label: "Mindset", accent: "var(--accent-mindset)" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* ──────────────────── HERO ──────────────────── */}
      <section className="relative px-6 md:px-12 pt-32 md:pt-40 pb-20 md:pb-28 overflow-hidden">
        {/* Soft champagne ambient glow */}
        <div
          aria-hidden
          className="absolute pointer-events-none top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] opacity-[0.18]"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(191,154,98,0.5), transparent 60%)",
            filter: "blur(120px)",
          }}
        />

        <div className="relative max-w-[1280px] mx-auto">
          {/* Issue line — masthead-style "publication" framing */}
          <Reveal className="flex items-center justify-between mb-12 md:mb-16">
            <span className="label-caps text-[var(--text-muted)]">
              Vol. I &middot; Issue 01
            </span>
            <span className="label-caps text-[var(--text-muted)] hidden sm:block">
              {hours} hours &middot; {moduleCount} modules
            </span>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">
            {/* Headline column */}
            <div className="md:col-span-7">
              <WordsReveal
                as="h1"
                text="The operating system for a compounding life."
                className="font-serif text-[44px] sm:text-[58px] md:text-[68px] lg:text-[80px] leading-[1.05] tracking-[-0.02em] text-[var(--text-primary)] font-light"
              />

              <Reveal delay={0.4}>
                <p className="mt-8 md:mt-10 font-serif italic text-[20px] md:text-[22px] text-[var(--text-secondary)] leading-[1.55] max-w-[560px]">
                  Three pillars. One system. Markets, Fitness, Mindset —
                  built for the operator who values precision over noise.
                </p>
              </Reveal>

              {/* Hairline rule */}
              <Reveal delay={0.55} className="mt-10 md:mt-12">
                <div className="h-px w-24 bg-[var(--accent)] origin-left" />
              </Reveal>

              {/* Subhead + CTA */}
              <Reveal delay={0.7} className="mt-10 md:mt-12">
                <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
                  <CheckoutButton className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[var(--accent)] text-[var(--on-accent)] label-caps border border-[var(--accent)] hover:bg-transparent hover:text-[var(--accent)] transition-all duration-500 cursor-pointer">
                    {primaryCtaLabel}
                    <span
                      aria-hidden
                      className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                    >
                      &rarr;
                    </span>
                  </CheckoutButton>

                  <span className="font-serif italic text-[14px] text-[var(--text-muted)]">
                    {heroSubcopy}
                  </span>
                </div>
              </Reveal>
            </div>

            {/* Editorial sidebar — Fibonacci-styled stat block */}
            <div className="md:col-span-5">
              <Reveal delay={0.3}>
                <div className="relative border border-[var(--border)] p-8 md:p-10 bg-[var(--card-bg)]">
                  {/* Corner accents */}
                  <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[var(--accent)]" />
                  <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[var(--accent)]" />
                  <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[var(--accent)]" />
                  <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[var(--accent)]" />

                  <span className="label-caps text-[var(--accent)] block mb-2">
                    The Manuscript
                  </span>
                  <p className="font-serif text-[15px] leading-[1.7] text-[var(--text-secondary)]">
                    A library of {moduleCount} focused modules. Frameworks,
                    checklists, and weekly protocols across the three areas
                    that actually compound — capital, body, and
                    discipline.
                  </p>

                  <div className="mt-8 grid grid-cols-3 gap-4 pt-6 border-t border-[var(--border)]">
                    <Stat label="Modules" value={moduleCount} />
                    <Stat label="Hours" value={hours} suffix="" />
                    <Stat label="Pillars" value={3} />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────── PRODUCT PREVIEW ──────────────────── */}
      <section className="px-6 md:px-12 py-20 md:py-28 border-t border-[var(--border)]">
        <Reveal className="text-center mb-12">
          <p className="label-caps text-[var(--accent)]">
            Preview the product
          </p>
          <h2 className="mt-4 font-serif text-[34px] md:text-[48px] leading-[1.1] tracking-[-0.02em] font-light text-[var(--text-primary)]">
            See inside the system.
          </h2>
        </Reveal>
        <div className="max-w-[1100px] mx-auto">
          <ProductPreview />
        </div>
      </section>

      {/* ──────────────────── PROBLEM (Editorial pull-out) ──────────────────── */}
      <section className="px-6 md:px-12 py-20 md:py-28 border-t border-[var(--border)] bg-[var(--sidebar-bg)]">
        <div className="max-w-[760px] mx-auto">
          <Reveal>
            <span className="label-caps text-[var(--text-muted)] block mb-6">
              Editor&apos;s note
            </span>
            <h2 className="font-serif text-[34px] md:text-[44px] leading-[1.15] tracking-[-0.015em] text-[var(--text-primary)] font-light">
              You don&apos;t need more information. You need a system that
              runs.
            </h2>
          </Reveal>

          <div className="mt-12 space-y-6 max-w-[640px]">
            {[
              "You’ve saved the posts and read the threads, and still feel scattered when it’s time to execute.",
              "You start strong Monday and lose structure by Wednesday.",
              "You know what to do in theory but have no concrete rules for practice.",
              "You’re burning energy deciding what to do instead of doing it.",
            ].map((line, i) => (
              <Reveal key={i} delay={i * 0.06} className="flex items-start gap-4">
                <span className="font-serif italic text-[var(--accent)] text-[15px] mt-1 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="font-serif text-[17px] md:text-[18px] text-[var(--text-secondary)] leading-[1.7]">
                  {line}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3} className="mt-12 pt-8 border-t border-[var(--border)]">
            <p className="font-serif italic text-[18px] md:text-[20px] text-[var(--text-primary)] leading-[1.6] max-w-[560px]">
              Compound OS replaces the noise with clear rules and repeatable
              protocols across the three areas that actually compound.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ──────────────────── THE THREE PILLARS ──────────────────── */}
      <section
        id="whats-inside"
        className="px-6 md:px-12 py-20 md:py-28 border-t border-[var(--border)]"
      >
        <div className="max-w-[1280px] mx-auto">
          <Reveal className="flex items-end justify-between mb-12 md:mb-16">
            <h2 className="font-serif text-[34px] md:text-[48px] leading-[1.1] tracking-[-0.02em] text-[var(--text-primary)] font-light">
              The Three Pillars
            </h2>
            <span className="label-caps text-[var(--text-muted)] hidden sm:block">
              Section A
            </span>
          </Reveal>

          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)]">
            {systemIncludes.map((pillar) => (
              <StaggerItem
                key={pillar.pillar}
                as="article"
                className="bg-[var(--bg)] p-8 md:p-10 transition-colors duration-500 hover:bg-[var(--card-bg)] group"
              >
                <span
                  className="label-caps block mb-6"
                  style={{ color: pillar.accent }}
                >
                  {pillar.chapter}
                </span>
                <h3 className="font-serif text-[28px] md:text-[32px] text-[var(--text-primary)] mb-4 transition-colors duration-300">
                  {pillar.pillar}
                </h3>
                <p className="font-serif italic text-[16px] md:text-[17px] text-[var(--text-primary)] leading-[1.55] mb-4">
                  {pillar.tagline}
                </p>
                <p className="text-[14px] md:text-[15px] text-[var(--text-secondary)] leading-[1.7]">
                  {pillar.body}
                </p>
                <div
                  className="mt-8 h-px bg-[var(--border)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                  style={{ backgroundColor: pillar.accent }}
                />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ──────────────────── EDITORIAL PULL QUOTE ──────────────────── */}
      <section className="px-6 md:px-12 py-24 md:py-32 border-y border-[var(--border)]">
        <div className="max-w-[760px] mx-auto text-center">
          <Reveal>
            <span className="font-serif text-[80px] leading-[1] text-[var(--accent)]/30 block mb-4">
              &ldquo;
            </span>
          </Reveal>
          <Reveal delay={0.2}>
            <blockquote className="font-serif italic text-[26px] md:text-[34px] leading-[1.3] tracking-[-0.01em] text-[var(--text-primary)] font-light">
              Excellence is not a singular act, but a habit. You are what you
              repeatedly do, compounded over decades.
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* ──────────────────── TABLE OF CONTENTS ──────────────────── */}
      <section className="px-6 md:px-12 py-20 md:py-28 bg-[var(--sidebar-bg)] border-b border-[var(--border)]">
        <div className="max-w-[960px] mx-auto">
          <Reveal className="text-center mb-16">
            <p className="label-caps text-[var(--accent)] mb-3">
              Full table of contents
            </p>
            <h2 className="font-serif text-[34px] md:text-[48px] leading-[1.1] tracking-[-0.02em] text-[var(--text-primary)] font-light">
              Every module, every minute.
            </h2>
          </Reveal>

          <div className="space-y-14">
            {pillarOrder.map((po) => {
              const pillarMods = MODULES.filter((m) => m.pillar === po.key);
              return (
                <Reveal key={po.key}>
                  <div className="flex items-baseline justify-between mb-5 pb-4 border-b border-[var(--border)]">
                    <h3
                      className="font-serif text-[24px] md:text-[28px] tracking-tight"
                      style={{ color: po.accent }}
                    >
                      {po.label}
                    </h3>
                    <span className="label-caps text-[var(--text-muted)]">
                      {pillarMods.length} modules
                    </span>
                  </div>
                  <ul>
                    {pillarMods.map((m) => (
                      <li
                        key={m.id}
                        className="flex items-baseline justify-between py-3 gap-4 border-b border-[var(--border-soft)] last:border-b-0"
                      >
                        <div className="flex items-baseline gap-4 min-w-0">
                          <span className="label-caps text-[var(--text-muted)] w-16 shrink-0">
                            {m.tier === "core" ? "Core" : "Adv"}
                          </span>
                          <span className="font-serif text-[15px] md:text-[16px] text-[var(--text-secondary)] truncate">
                            {m.title}
                          </span>
                        </div>
                        <span className="label-caps text-[var(--text-muted)] shrink-0 whitespace-nowrap">
                          {m.estMinutes} min
                        </span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.3} className="mt-14 text-center">
            <p className="font-serif italic text-[14px] text-[var(--text-muted)]">
              Plus reference playbooks with templates and quick-access cheat
              sheets for each pillar.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ──────────────────── HOW IT WORKS ──────────────────── */}
      <HowItWorks label={stackedCtaLabel} />

      {/* ──────────────────── WHO IT'S FOR ──────────────────── */}
      <section className="px-6 md:px-12 py-20 md:py-28 border-t border-[var(--border)]">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--border)] border border-[var(--border)]">
          {/* Built for you */}
          <Reveal>
            <div className="bg-[var(--bg)] p-8 md:p-10">
              <span className="label-caps text-[var(--accent)] block mb-4">
                Built for you if
              </span>
              <h3 className="font-serif text-[24px] md:text-[28px] text-[var(--text-primary)] mb-6 font-light">
                You operate, you don&apos;t consume.
              </h3>
              <ul className="space-y-4">
                {forYou.map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="label-caps text-[var(--accent)] mt-1 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-serif text-[15px] md:text-[16px] text-[var(--text-secondary)] leading-[1.7]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Not for you */}
          <Reveal delay={0.1}>
            <div className="bg-[var(--bg)] p-8 md:p-10">
              <span className="label-caps text-[var(--text-muted)] block mb-4">
                Not for you if
              </span>
              <h3 className="font-serif text-[24px] md:text-[28px] text-[var(--text-primary)] mb-6 font-light">
                You&apos;re looking for shortcuts.
              </h3>
              <ul className="space-y-4">
                {notForYou.map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="label-caps text-[var(--text-muted)] mt-1 shrink-0">
                      &mdash;
                    </span>
                    <span className="font-serif text-[15px] md:text-[16px] text-[var(--text-secondary)] leading-[1.7]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ──────────────────── WHY THIS EXISTS (FOUNDER) ──────────────────── */}
      <section className="px-6 md:px-12 py-20 md:py-28 border-t border-[var(--border)] bg-[var(--sidebar-bg)]">
        <div className="max-w-[720px] mx-auto">
          <Reveal>
            <span className="label-caps text-[var(--accent)] block mb-8 text-center">
              Letter from the editor
            </span>
            <p className="font-serif text-[18px] md:text-[20px] text-[var(--text-secondary)] leading-[1.85]">
              I built Compound OS after years of learning the expensive way
              — courses that overpromised, injuries from ego-driven
              training, inconsistent execution. Eventually I stopped chasing
              information and started building systems.
            </p>
            <div className="mt-10 pt-8 border-t border-[var(--border)]">
              <p className="font-serif italic text-[18px] md:text-[20px] text-[var(--text-primary)] leading-[1.65]">
                This is the one I wish I had earlier. Built for myself first.
                Shared because it works better than scattered notes and
                half-finished courses.
              </p>
              <p className="mt-6 label-caps text-[var(--text-muted)]">
                &mdash; Tarek Shaar, Founder
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ──────────────────── PRICING (Editorial card with corner accents) ──────────────────── */}
      <section
        id="pricing"
        className="px-6 md:px-12 py-20 md:py-28 border-t border-[var(--border)]"
      >
        <div className="max-w-[520px] mx-auto">
          <Reveal>
            <article className="relative bg-[var(--card-bg)] border border-[var(--border)] overflow-hidden">
              {/* Corner accents (4) */}
              <span className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[var(--accent)]" />
              <span className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[var(--accent)]" />
              <span className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[var(--accent)]" />
              <span className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[var(--accent)]" />

              {/* Founding tag */}
              <header className="text-center px-6 md:px-10 pt-10 md:pt-12 pb-6 border-b border-[var(--border)]">
                <span className="label-caps text-[var(--accent)] inline-flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                  {foundingTag}
                </span>
                <h2 className="mt-5 font-serif text-[28px] md:text-[34px] text-[var(--text-primary)] tracking-tight font-light">
                  Compound Access
                </h2>
                <p className="mt-2 font-serif italic text-[14px] text-[var(--text-secondary)]">
                  &ldquo;We choose who buys.&rdquo;
                </p>
              </header>

              {/* Price */}
              <div className="text-center px-6 md:px-10 py-10 md:py-12">
                {pricing.isFounding && (
                  <p className="label-caps text-[var(--text-muted)] line-through decoration-1 mb-2">
                    {anchorPrice} &middot; standard
                  </p>
                )}
                <div className="font-serif text-[80px] md:text-[96px] leading-[0.95] tracking-[-0.04em] text-[var(--accent)] font-light">
                  {priceBig}
                </div>
                <p className="mt-3 label-caps text-[var(--text-muted)]">
                  one-time &middot; no subscription
                </p>
              </div>

              {/* Allocation indicator */}
              {pricing.isFounding && (
                <div className="px-6 md:px-10 py-5 border-y border-[var(--border)] flex items-baseline justify-between">
                  <span className="label-caps text-[var(--text-muted)]">
                    Allocation
                  </span>
                  <span className="font-serif text-[24px] text-[var(--accent)]">
                    <CountUp to={pricing.spotsRemaining} duration={1.6} />
                    <span className="font-serif italic text-[13px] text-[var(--text-muted)] ml-2">
                      spots remaining
                    </span>
                  </span>
                </div>
              )}

              {/* Features list */}
              <ul className="px-6 md:px-10 py-8 space-y-4">
                {[
                  "All three pillars, every module",
                  "Checklists, templates, and weekly protocols",
                  "Progress saved to any device",
                  "Fourteen-day refund window",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-baseline gap-3 font-serif text-[15px] text-[var(--text-secondary)] leading-[1.55]"
                  >
                    <span className="label-caps text-[var(--accent)] shrink-0">
                      &mdash;
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="px-6 md:px-10 pb-10 md:pb-12">
                <CheckoutCTA
                  label={stackedCtaLabel}
                  className="group w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-[var(--accent)] text-[var(--on-accent)] label-caps border border-[var(--accent)] hover:bg-transparent hover:text-[var(--accent)] transition-all duration-500 cursor-pointer disabled:opacity-60"
                />
                <p className="mt-5 text-center font-serif italic text-[13px] text-[var(--text-muted)]">
                  Already have access?{" "}
                  <a
                    href="/login"
                    className="text-[var(--text-secondary)] hover:text-[var(--accent)] underline underline-offset-4 decoration-[var(--border)] transition-colors"
                  >
                    Sign in &rarr;
                  </a>
                </p>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      {/* ──────────────────── FAQ ──────────────────── */}
      <section className="px-6 md:px-12 py-20 md:py-28 border-t border-[var(--border)] bg-[var(--sidebar-bg)]">
        <div className="max-w-[760px] mx-auto">
          <Reveal className="text-center mb-12">
            <span className="label-caps text-[var(--accent)] block mb-3">
              Reader inquiries
            </span>
            <h2 className="font-serif text-[34px] md:text-[44px] leading-[1.1] tracking-[-0.02em] text-[var(--text-primary)] font-light">
              Questions
            </h2>
          </Reveal>

          <div className="border-t border-[var(--border)]">
            {faqs.map((faq, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <details className="group border-b border-[var(--border)]">
                  <summary className="flex items-center justify-between py-6 cursor-pointer list-none font-serif text-[17px] md:text-[18px] text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors">
                    <span className="flex items-baseline gap-4">
                      <span className="label-caps text-[var(--text-muted)] w-8">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {faq.q}
                    </span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="shrink-0 ml-4 transition-transform duration-300 group-open:rotate-45 text-[var(--text-muted)]"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </summary>
                  <p className="pb-6 pl-12 pr-4 font-serif text-[15px] text-[var(--text-secondary)] leading-[1.75]">
                    {faq.a}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────── FINAL CTA ──────────────────── */}
      <section className="px-6 md:px-12 py-24 md:py-32 border-t border-[var(--border)]">
        <div className="max-w-[640px] mx-auto text-center">
          <Reveal>
            <h2 className="font-serif text-[44px] md:text-[64px] leading-[1.05] tracking-[-0.02em] text-[var(--text-primary)] font-light">
              Start executing.
            </h2>
            <p className="mt-6 font-serif italic text-[18px] md:text-[20px] text-[var(--text-secondary)]">
              One payment. Instant access. No subscription.
            </p>
          </Reveal>
          <Reveal delay={0.2} className="mt-12">
            <CheckoutButton className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-[var(--accent)] text-[var(--on-accent)] label-caps border border-[var(--accent)] hover:bg-transparent hover:text-[var(--accent)] transition-all duration-500 cursor-pointer">
              {stackedCtaLabel}
              <span
                aria-hidden
                className="inline-block transition-transform duration-300 group-hover:translate-x-1"
              >
                &rarr;
              </span>
            </CheckoutButton>
            <p className="mt-6 label-caps text-[var(--text-muted)]">
              {finalCtaSubcopy}
            </p>
          </Reveal>
        </div>
      </section>

      <Footer />
      <MobileCTA />
    </div>
  );
}

/**
 * Editorial stat block — used in the hero sidebar. Numerals in serif,
 * label in label-caps, plain hairline separator above. Animated count-up
 * triggers when scrolled into view.
 */
function Stat({
  label,
  value,
  suffix = "",
}: {
  label: string;
  value: number;
  suffix?: string;
}) {
  return (
    <div>
      <span className="font-serif text-[28px] md:text-[32px] text-[var(--text-primary)] block leading-none font-light">
        <CountUp to={value} suffix={suffix} />
      </span>
      <span className="label-caps text-[var(--text-muted)] block mt-2">
        {label}
      </span>
    </div>
  );
}
