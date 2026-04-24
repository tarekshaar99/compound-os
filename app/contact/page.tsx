import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";

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

          {/* Contact card */}
          <div className="mt-10">
            {/* Email */}
            <a
              href="mailto:tarek@thecompoundsystem.com"
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
                    tarek@thecompoundsystem.com
                  </div>
                  <div className="text-xs text-[var(--text-muted)] mt-1">
                    Access, billing, refunds, bug reports, partnerships. I
                    usually reply within a business day.
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
