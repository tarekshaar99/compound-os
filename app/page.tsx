import CheckoutButton from "./components/CheckoutButton";
import EmailCaptureCTA from "./components/EmailCaptureCTA";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MobileCTA from "./components/MobileCTA";
import ProductPreview from "./components/ProductPreview";
import { getPricing } from "./lib/pricing";

// Render fresh every 30s so the founding-spots counter stays current
// without hammering the DB on every request.
export const revalidate = 30;

/* ────────────────────── DATA ────────────────────── */

const systemIncludes = [
  {
    pillar: "Markets",
    accent: "#00d4aa",
    icon: "◈",
    items: [
      "Investing foundations, 4 wealth stages & the 6-step analysis framework",
      "Complete Wheel Strategy (CSPs, covered calls, spreads, LEAPS)",
      "VIX-based capital allocation model",
      "3-tier portfolio allocation & position sizing math",
      "Technical analysis, Elliott Waves, Fibonacci framework",
      "Macro regimes, key indicators, and 11 mistakes to avoid",
    ],
  },
  {
    pillar: "Fitness",
    accent: "#f97316",
    icon: "⚡",
    items: [
      "Full hybrid athlete program (3x strength + 2-3x cardio)",
      "Time-under-tension protocols with progression rules",
      "Zone 2 and interval cardio programming",
      "Nutrition framework with macro targets",
      "Mobility, recovery, and supplement stack",
      "Nervous system regulation: breathwork, fasting, cold exposure",
    ],
  },
  {
    pillar: "Mindset",
    accent: "#a78bfa",
    icon: "◉",
    items: [
      "Identity mapping & ego pattern recognition",
      "Emotional regulation and trigger response system",
      "Habit and addiction pattern-breaking protocols",
      "Wealth psychology, money beliefs, the $500K tipping point",
      "Decision-making and relationship frameworks",
      "Daily execution routine and journaling system",
    ],
  },
];

const forYou = [
  "You want structure, not motivation",
  "You keep starting but can't stay consistent",
  "You've bought courses that collected dust",
  "You want rules you can follow, not content to consume",
  "You're building something and need your systems dialed in",
];

const notForYou = [
  "You want quick wins or get-rich signals",
  "You want to be told what to think instead of how to think",
  "You avoid accountability and blame circumstances",
  "You need hand-holding or a coach to function",
];

function buildFaqs(isFounding: boolean) {
  const pricingFaq = isFounding
    ? {
        q: "Why is it only $49?",
        a: "$49 is the founding-member price for early access. After the founding window closes, the price goes to $99. I built this for myself before I ever sold it; the system already exists, so the price reflects access, not production.",
      }
    : {
        q: "How much is it?",
        a: "$99, one-time. Lifetime access and every future update included. The $49 founding-member window has closed.",
      };

  return [
    {
      q: "Is this a course?",
      a: "No. No videos, no modules, no drip content. Compound OS is a structured reference system - frameworks, checklists, and protocols organized into sections you open and use. Think operating manual, not lecture series.",
    },
    {
      q: "Do I need trading or investing experience?",
      a: "The Markets pillar starts from first principles - investing foundations, wealth stages, the 6-step analysis framework. If you know what a stock is, you can follow it. If you're already trading, the VIX framework, Wheel Strategy, and risk management will sharpen your execution immediately.",
    },
    {
      q: "Will this be updated?",
      a: "Yes. As the frameworks get refined, your access stays current. One payment covers everything - now and every future update.",
    },
    {
      q: "What if it's not for me?",
      a: "Reach out. I'm not interested in taking money from people who won't use it.",
    },
    pricingFaq,
    {
      q: "What format is the content in?",
      a: "A private web app you access from any device. Structured sections with a sidebar, search, and progress tracking. It's designed to be used weekly, not read once.",
    },
    {
      q: "Can I access it on my phone?",
      a: "Yes. The system is fully responsive. Most members use it on mobile during their market session, at the gym, or during their morning routine.",
    },
  ];
}

/* ────────────────────── PAGE ────────────────────── */

export default async function Home() {
  const pricing = await getPricing();
  const faqs = buildFaqs(pricing.isFounding);
  // Dynamic copy snippets. Deliberately no public counts - we keep
  // `spotsRemaining` server-side for the auto-flip at 100 sales, but don't
  // ever leak the running tally to the public.
  const priceBig = pricing.display; // "$49" or "$99"
  const anchorPrice = pricing.standardDisplay; // always "$99"
  const foundingTag = pricing.isFounding
    ? `Founding Member - early access pricing`
    : `Standard pricing - founding window closed`;
  const foundingNote = pricing.isFounding
    ? `Locked in for founding members. Price goes to ${anchorPrice} after the early-access window closes.`
    : `The founding window is closed. ${anchorPrice} gets you lifetime access and every future update.`;
  const heroSubcopy = pricing.isFounding
    ? `Founding-member early access. Price goes to ${anchorPrice} after.`
    : `Lifetime access. Every future update included.`;
  const primaryCtaLabel = `Get Compound OS - ${priceBig}`;
  const stackedCtaLabel = pricing.isFounding
    ? `Claim Founding Price - ${priceBig}`
    : `Get Compound OS - ${priceBig}`;
  const finalCtaSubcopy = pricing.isFounding
    ? `Founding-member pricing \u00b7 Then ${anchorPrice} \u00b7 No subscription`
    : `One-time payment \u00b7 No subscription \u00b7 No upsells`;

  return (
    <div className="min-h-screen">
      <Header />

      {/* ───── HERO ───── */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 pt-28 pb-14 md:pt-36 md:pb-20 overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[var(--accent)]/5 rounded-full blur-[120px] pointer-events-none" />

        <h1 className="relative text-[1.75rem] md:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-[var(--text-primary)] leading-[1.15] max-w-3xl">
          The complete system for how you trade, train, and operate.
        </h1>
        <p className="relative mt-5 text-[var(--text-secondary)] text-base md:text-xl max-w-xl mx-auto leading-relaxed">
          32 structured sections. Rules, checklists, and frameworks for your money, body, and discipline - built to use, not to consume.
        </p>

        <div className="relative mt-8 md:mt-10">
          <CheckoutButton className="px-10 py-4 rounded-xl bg-[var(--accent)] text-[#0a0b0f] font-bold text-base transition-all hover:opacity-90 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_-6px_rgba(0,212,170,0.35)] cursor-pointer">
            {primaryCtaLabel}
          </CheckoutButton>
          <p className="mt-3.5 text-sm text-[var(--text-muted)]">
            {pricing.isFounding && (
              <span className="text-[var(--accent)] font-semibold">Founding price.{" "}</span>
            )}
            {heroSubcopy}
          </p>
        </div>

        {/* Trust strip */}
        <div className="relative mt-12 flex flex-wrap justify-center gap-x-6 gap-y-2.5 text-xs text-[var(--text-muted)]">
          <span className="flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
            32 sections across 3 pillars
          </span>
          <span className="flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
            Use on any device
          </span>
          <span className="flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
            Built from 7+ years of execution
          </span>
        </div>
      </section>

      {/* ───── SEE INSIDE ───── */}
      <section className="px-6 pt-4 pb-16 md:pb-24">
        <div className="text-center mb-3">
          <p className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-medium">
            See what's inside
          </p>
        </div>
        <div className="text-center mb-8">
          <p className="text-sm text-[var(--text-secondary)] max-w-md mx-auto">
            Switch pillars to preview the actual sidebar, content, and
            checklists you&apos;ll be using.
          </p>
        </div>
        <ProductPreview />
      </section>

      {/* ───── PROBLEM ───── */}
      <section className="px-6 py-16 md:py-24 bg-[var(--sidebar-bg)]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-8 tracking-tight">
            You don't need more information.<br className="hidden sm:block" />
            You need a system that runs.
          </h2>
          <div className="space-y-4 text-left">
            {[
              "You've saved the posts, watched the videos, read the threads - and still feel scattered when it's time to execute.",
              "You start strong on Monday and lose structure by Wednesday.",
              "You know what to do in theory but don't have concrete rules for practice.",
              "You're burning energy deciding what to do instead of just doing it.",
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
            Compound OS replaces the chaos with clear rules, structured frameworks, and repeatable protocols - across the three areas that actually compound.
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
              Three pillars. 32 sections. Every framework structured, searchable, and ready to execute from day one.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {systemIncludes.map((pillar) => (
              <div
                key={pillar.pillar}
                className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-6 md:p-7"
              >
                <div className="flex items-center gap-3 mb-5">
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
                <ul className="space-y-2.5">
                  {pillar.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={pillar.accent} strokeWidth="2.5" className="mt-[3px] shrink-0 opacity-50">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── HOW IT WORKS ───── */}
      <section className="px-6 py-16 md:py-24 bg-[var(--sidebar-bg)]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] text-center mb-12 tracking-tight">
            How it works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Buy once",
                desc: "One payment. No subscription, no upsells, no drip. You own lifetime access immediately.",
              },
              {
                step: "02",
                title: "Open and execute",
                desc: "Navigate to the section you need. Follow the framework. Use the checklist. Close the tab. Repeat weekly.",
              },
              {
                step: "03",
                title: "Stay current",
                desc: "The system gets refined over time. New sections, sharper protocols - all included in your access, forever.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center md:text-left">
                <span className="inline-block text-sm font-mono text-[var(--accent)] mb-3 px-2.5 py-1 rounded-md bg-[var(--accent)]/8">
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

      {/* ───── WHO IT'S FOR / NOT FOR ───── */}
      <section className="px-6 py-16 md:py-24">
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
      <section className="px-6 py-16 md:py-24 bg-[var(--sidebar-bg)]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xs uppercase tracking-widest text-[var(--accent)] font-medium mb-8 text-center">
            Why this exists
          </h2>
          <p className="text-[var(--text-secondary)] text-[15px] leading-[1.9] mb-6">
            I spent over $20,000 on trading courses from people who were better at marketing than executing. I ego-lifted my way into a bad shoulder injury and a wrecked lower back. I swung between extremes in every domain: crypto to day trading, powerlifting to triathlons, hustle culture to withdrawal. Eventually I stopped chasing and started building systems that actually worked. The trading framework came from blowing up accounts. The fitness system came from injuries. The mindset protocols came from years of forced self-examination.
          </p>
          <div className="pt-5 border-t border-[var(--border)]">
            <p className="text-[var(--text-primary)] text-[15px] leading-relaxed font-medium">
              Compound OS is what I wish existed when I started. I built it for myself. Now it's available to anyone serious enough to use it.
            </p>
          </div>
        </div>
      </section>

      {/* ───── OFFER STACK ───── */}
      <section id="pricing" className="px-6 py-16 md:py-24">
        <div className="max-w-xl mx-auto">
          <div className="relative bg-[var(--card-bg)] border border-[var(--accent)]/20 rounded-2xl p-8 md:p-12 overflow-hidden">
            {/* Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[150px] bg-[var(--accent)]/8 rounded-full blur-[80px] pointer-events-none" />

            {/* Founding member tag */}
            <div className="relative flex justify-center mb-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/8 text-[11px] font-semibold text-[var(--accent)] uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                {foundingTag}
              </span>
            </div>

            <div className="relative text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-2 tracking-tight">
                Full system. One price.
              </h2>
              <p className="text-[var(--text-secondary)] text-sm mb-8 max-w-sm mx-auto">
                All three pillars, all 32 sections, all future updates.
              </p>
            </div>

            {/* Value anchoring */}
            <div className="relative space-y-0 mb-8">
              {[
                { label: "Trading courses & coaching", crossed: "$2,000+" },
                { label: "Personal training & nutrition plans", crossed: "$1,500+" },
                { label: "Mindset coaching & programs", crossed: "$500+" },
              ].map((row, i) => (
                <div key={i} className="flex items-center justify-between py-2.5 border-b border-[var(--border)]">
                  <span className="text-sm text-[var(--text-secondary)]">{row.label}</span>
                  <span className="text-sm text-[var(--text-muted)] line-through">{row.crossed}</span>
                </div>
              ))}
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
                one-time &middot; lifetime access &middot; no subscription
              </p>
              <p className="text-xs text-[var(--accent)]/90 font-medium mt-3">
                {foundingNote}
              </p>
            </div>

            {/* Checklist */}
            <ul className="relative space-y-3 max-w-sm mx-auto mb-10">
              {[
                "Full options trading framework with checklists",
                "VIX allocation model & macro playbooks",
                "Complete hybrid athlete training system",
                "Nutrition, recovery, and supplement protocols",
                "Mindset frameworks and daily execution system",
                "Progress tracking across all pillars",
                "Every future update - forever",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" className="mt-0.5 shrink-0"><polyline points="20 6 9 17 4 12" /></svg>
                  <span className="text-sm text-[var(--text-secondary)] leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            <div className="relative">
              <EmailCaptureCTA label={stackedCtaLabel} />
              <p className="mt-4 text-xs text-[var(--text-muted)] text-center">
                Instant access. No subscription. Every future update included.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───── FAQ ───── */}
      <section className="px-6 py-16 md:py-24 bg-[var(--sidebar-bg)]">
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
      <section className="px-6 py-16 md:py-24">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4 tracking-tight">
            Your system is ready.
          </h2>
          <p className="text-[var(--text-secondary)] mb-10 text-base md:text-lg max-w-md mx-auto">
            One purchase. Instant access. Start executing today.
          </p>

          <CheckoutButton className="inline-block px-10 py-4 rounded-xl bg-[var(--accent)] text-[#0a0b0f] font-bold text-lg transition-all hover:opacity-90 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_-6px_rgba(0,212,170,0.35)] cursor-pointer">
            {stackedCtaLabel}
          </CheckoutButton>

          <p className="mt-5 text-xs text-[var(--text-muted)]">
            {finalCtaSubcopy}
          </p>
        </div>
      </section>

      {/* ───── FOOTER ───── */}
      <Footer />

      {/* Sticky mobile CTA */}
      <MobileCTA />
    </div>
  );
}
