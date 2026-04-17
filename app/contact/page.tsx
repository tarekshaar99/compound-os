import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Contact | Compound OS",
  description:
    "Reach out about access, billing, refunds, partnerships, or anything else. Real human, usually back within a day.",
};

export const dynamic = "force-static";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-28 md:pt-32 pb-20">
        <article className="max-w-xl mx-auto px-6">
          <p className="text-xs uppercase tracking-widest text-[var(--accent)] font-medium mb-4">
            Contact
          </p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.15]">
            Get in touch.
          </h1>
          <p className="mt-5 text-[var(--text-secondary)] text-[15px] leading-relaxed">
            Compound OS is run by one person. Questions about access,
            billing, refunds, or the product itself go straight to my inbox.
            I usually reply within a business day.
          </p>

          {/* Contact cards */}
          <div className="mt-10 space-y-4">
            {/* Email */}
            <a
              href="mailto:hi@thecompoundsystem.com"
              className="block bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-6 transition-all hover:border-[var(--accent)]/40 hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center shrink-0">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] uppercase tracking-widest text-[var(--text-muted)] font-semibold mb-1">
                    Email
                  </div>
                  <div className="text-base font-semibold text-[var(--text-primary)] truncate">
                    hi@thecompoundsystem.com
                  </div>
                  <div className="text-xs text-[var(--text-muted)] mt-1">
                    Best for anything requiring a trail: billing, refunds,
                    account issues.
                  </div>
                </div>
              </div>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/971585658488"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-6 transition-all hover:border-[#25D366]/40 hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#25D366]/10 flex items-center justify-center shrink-0">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#25D366"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] uppercase tracking-widest text-[var(--text-muted)] font-semibold mb-1">
                    WhatsApp
                  </div>
                  <div className="text-base font-semibold text-[var(--text-primary)]">
                    +971 58 565 8488
                  </div>
                  <div className="text-xs text-[var(--text-muted)] mt-1">
                    Fast questions about access or the product. Please do
                    not send trade ideas or medical questions.
                  </div>
                </div>
              </div>
            </a>
          </div>

          {/* What I can and cannot help with */}
          <section className="mt-14">
            <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">
              What I can help with
            </h2>
            <ul className="space-y-2.5">
              {[
                "Access and login issues",
                "Billing, receipts, and refund requests",
                "Bug reports and product feedback",
                "Press, podcast, or partnership requests",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-[var(--accent)] mt-1.5 shrink-0 text-[8px]">
                    ●
                  </span>
                  <span className="text-[var(--text-secondary)] text-[15px] leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <h2 className="text-lg font-bold text-[var(--text-primary)] mt-10 mb-4">
              What I cannot do
            </h2>
            <ul className="space-y-2.5">
              {[
                "Give personalized financial or investment advice.",
                "Give personalized medical, nutrition, or training prescriptions.",
                "Manage anyone's portfolio, money, or trades.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-[#ef4444] mt-1.5 shrink-0 text-[8px]">
                    ●
                  </span>
                  <span className="text-[var(--text-secondary)] text-[15px] leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs text-[var(--text-muted)] leading-relaxed">
              For the reasoning behind those limits, see the{" "}
              <a
                href="/terms"
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] underline underline-offset-4 decoration-[var(--border)]"
              >
                Terms of Service
              </a>
              .
            </p>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}
