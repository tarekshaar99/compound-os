import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Reveal from "../components/motion/Reveal";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "A simple, fair refund window for Compound OS. Email us and we will sort it.",
};

export const dynamic = "force-static";

const LAST_UPDATED = "April 16, 2026";
const REFUND_WINDOW_DAYS = 14;

export default function RefundPage() {
  const sections = [
    {
      heading: `The ${REFUND_WINDOW_DAYS}-day window`,
      body: (
        <>
          If you buy Compound OS and decide it is not for you, you can
          request a full refund within {REFUND_WINDOW_DAYS} days of
          purchase. No form to fill out. No questions asked. Email us and
          we will refund the payment through Stripe.
        </>
      ),
    },
    {
      heading: "After the window",
      body: (
        <>
          Past {REFUND_WINDOW_DAYS} days, the purchase is final. Two weeks
          is enough time to open the product, work through the start-here
          modules in each pillar, and decide if it is for you. If something
          unusual comes up (a family emergency, an illness, a charge you do
          not recognize), email us anyway. We will look at it case by case.
        </>
      ),
    },
    {
      heading: "How to request",
      body: (
        <>
          Send an email to{" "}
          <a
            href="mailto:tarek@thecompoundsystem.com"
            className="text-[var(--accent)] hover:opacity-80 border-b border-[var(--accent)]/30"
          >
            tarek@thecompoundsystem.com
          </a>{" "}
          from the same email address you used to purchase. Include your
          name or order reference if you have it. We will process the
          refund within a few business days.
        </>
      ),
    },
    {
      heading: "Edge cases",
      body: (
        <>
          The 14-day window is for genuine &ldquo;not for me&rdquo;
          decisions. The only cases we push back on are repeated buy-refund
          cycles, chargebacks filed without emailing us first, or use of
          the content in ways that violate our{" "}
          <a
            href="/terms"
            className="text-[var(--accent)] hover:opacity-80 border-b border-[var(--accent)]/30"
          >
            Terms of Service
          </a>
          . Outside of those, the default answer inside the window is yes.
        </>
      ),
    },
    {
      heading: "Processing time",
      body: (
        <>
          Refunds typically appear in your account within 5 to 10 business
          days after Stripe processes them, depending on your bank. We do
          not control that timing.
        </>
      ),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-32 md:pt-36 pb-24">
        <article className="max-w-[680px] mx-auto px-6">
          <Reveal>
            <span className="label-caps text-[var(--accent)] block mb-6">
              Legal &middot; Refunds
            </span>
            <h1 className="font-serif text-[44px] md:text-[56px] leading-[1.05] tracking-[-0.02em] text-[var(--text-primary)] font-light">
              Refund Policy
            </h1>
            <p className="mt-4 label-caps text-[var(--text-muted)]">
              Last updated &middot; {LAST_UPDATED}
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="my-12 h-px w-12 bg-[var(--accent)]" />
          </Reveal>

          <Reveal delay={0.25}>
            <p className="font-serif italic text-[18px] md:text-[20px] text-[var(--text-secondary)] leading-[1.65] mb-16">
              Compound OS is a digital product. You get instant, lifetime
              access the moment your payment succeeds. Because of that, we
              keep the refund rules short and honest.
            </p>
          </Reveal>

          <div className="space-y-12">
            {sections.map((s, i) => (
              <Reveal as="section" key={s.heading} delay={i * 0.05}>
                <h2 className="label-caps text-[var(--accent)] mb-5 pb-3 border-b border-[var(--border)]">
                  {s.heading}
                </h2>
                <p className="font-serif text-[16px] md:text-[17px] text-[var(--text-secondary)] leading-[1.85]">
                  {s.body}
                </p>
              </Reveal>
            ))}
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
