import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Reveal from "../components/motion/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach out about access, billing, refunds, partnerships, or anything else. Real human, usually back within a day.",
};

export const dynamic = "force-static";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-32 md:pt-36 pb-24">
        <article className="max-w-[640px] mx-auto px-6">
          <Reveal>
            <span className="label-caps text-[var(--accent)] block mb-6">
              Correspondence
            </span>
            <h1 className="font-serif text-[44px] md:text-[56px] leading-[1.05] tracking-[-0.02em] text-[var(--text-primary)] font-light">
              Get in touch.
            </h1>
            <p className="mt-6 font-serif italic text-[18px] text-[var(--text-secondary)] leading-[1.6]">
              Compound OS is run by one person. Questions about access,
              billing, refunds, or the product itself go straight to my
              inbox. I usually reply within a business day.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="my-12 h-px w-12 bg-[var(--accent)]" />
          </Reveal>

          {/* Contact card with corner accents */}
          <Reveal delay={0.25}>
            <a
              href="mailto:tarek@thecompoundsystem.com"
              className="relative block bg-[var(--card-bg)] border border-[var(--border)] p-8 hover:border-[var(--accent)] transition-colors duration-500 group"
            >
              <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[var(--accent)]" />
              <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[var(--accent)]" />
              <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[var(--accent)]" />
              <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[var(--accent)]" />

              <span className="label-caps text-[var(--text-muted)] block mb-3">
                Email
              </span>
              <p className="font-serif text-[22px] md:text-[26px] text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors mb-3">
                tarek@thecompoundsystem.com
              </p>
              <p className="font-serif italic text-[14px] text-[var(--text-secondary)]">
                Access, billing, refunds, bug reports, partnerships. Reply
                within a business day.
              </p>
            </a>
          </Reveal>

          {/* What I can help with */}
          <Reveal as="section" delay={0.35} className="mt-16">
            <h2 className="label-caps text-[var(--accent)] mb-6 pb-3 border-b border-[var(--border)]">
              What I can help with
            </h2>
            <ul className="divide-y divide-[var(--border-soft)]">
              {[
                "Access and login issues",
                "Billing, receipts, and refund requests",
                "Bug reports and product feedback",
                "Press, podcast, or partnership requests",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-baseline gap-4 py-4"
                >
                  <span className="label-caps text-[var(--accent)] shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-serif text-[16px] text-[var(--text-secondary)] leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* What I cannot do */}
          <Reveal as="section" delay={0.4} className="mt-12">
            <h2 className="label-caps text-[var(--text-muted)] mb-6 pb-3 border-b border-[var(--border)]">
              What I cannot do
            </h2>
            <ul className="divide-y divide-[var(--border-soft)]">
              {[
                "Give personalized financial or investment advice.",
                "Give personalized medical, nutrition, or training prescriptions.",
                "Manage anyone's portfolio, money, or trades.",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-baseline gap-4 py-4"
                >
                  <span className="label-caps text-[var(--text-muted)] shrink-0">
                    &mdash;
                  </span>
                  <span className="font-serif italic text-[16px] text-[var(--text-secondary)] leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-6 font-serif italic text-[13px] text-[var(--text-muted)] leading-relaxed">
              For the reasoning behind those limits, see the{" "}
              <a
                href="/terms"
                className="text-[var(--accent)] hover:opacity-80 border-b border-[var(--accent)]/30"
              >
                Terms of Service
              </a>
              .
            </p>
          </Reveal>
        </article>
      </main>

      <Footer />
    </div>
  );
}
