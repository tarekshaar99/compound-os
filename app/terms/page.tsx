import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service | Compound OS",
  description:
    "The terms that govern your use of Compound OS. Educational product, honest disclaimers, reasonable limits.",
};

export const dynamic = "force-static";

const LAST_UPDATED = "April 16, 2026";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-28 md:pt-32 pb-20">
        <article className="max-w-2xl mx-auto px-6">
          <p className="text-xs uppercase tracking-widest text-[var(--accent)] font-medium mb-4">
            Legal
          </p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.15]">
            Terms of Service
          </h1>
          <p className="mt-3 text-xs text-[var(--text-muted)]">
            Last updated: {LAST_UPDATED}
          </p>

          <div className="mt-10 space-y-10 text-[var(--text-secondary)] text-[15px] leading-[1.85]">
            <section>
              <p>
                These terms govern your access to and use of Compound OS, a
                digital product published at{" "}
                <a
                  href="https://thecompoundsystem.com"
                  className="text-[var(--text-primary)] hover:text-[var(--accent)] underline underline-offset-4 decoration-[var(--border)]"
                >
                  thecompoundsystem.com
                </a>
                . By creating an account or purchasing access, you agree to
                them. If you do not agree, do not use the site.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-3">
                1. What Compound OS is
              </h2>
              <p>
                Compound OS is an educational product. It is a structured
                set of frameworks, checklists, and protocols across three
                pillars: markets, fitness, and mindset. It is built from
                personal experience, reading, and practice. It is not a
                licensed financial service, a medical service, or a
                prescription of any kind.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-3">
                2. Accounts and access
              </h2>
              <ul className="space-y-2.5 list-none">
                {[
                  "Your account is personal to you. Do not share your login credentials, and do not allow others to use your account.",
                  "Access is granted for your personal, non-commercial use. One purchase equals one user.",
                  "You must be at least 18 years old to create an account and purchase access.",
                  "We may suspend or terminate access if you share credentials, distribute our content, attempt to scrape or reverse engineer the product, or otherwise breach these terms.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] mt-2.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-3">
                3. No financial advice
              </h2>
              <p>
                Nothing in Compound OS is personalized financial, investment,
                tax, or legal advice. The Markets pillar describes how the
                author thinks about investing and trading. It does not
                account for your specific financial situation, risk
                tolerance, or objectives. You are solely responsible for
                your trading and investment decisions. Past performance does
                not predict future results. Trading options and equities can
                result in total loss of capital.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-3">
                4. No medical or health advice
              </h2>
              <p>
                The Fitness pillar describes the author&apos;s training,
                nutrition, and recovery approach. It is not medical advice
                and is not a substitute for a qualified physician, dietitian,
                physical therapist, or mental health professional. Consult a
                licensed professional before starting any new training,
                nutrition, fasting, breathwork, cold exposure, or supplement
                protocol. You participate at your own risk.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-3">
                5. Intellectual property
              </h2>
              <p>
                All content in Compound OS, including text, frameworks,
                diagrams, code, and underlying structure, is owned by Tarek
                Shaar or licensed to him. You receive a personal,
                non-transferable license to access and use the content for
                your own learning. You may not copy, redistribute, republish,
                resell, or create derivative products based on the content
                without written permission. This includes screenshots of
                substantive content, scraping, AI training, or mirroring.
                Quoting a sentence or two in a review is fine.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-3">
                6. Acceptable use
              </h2>
              <p>
                Do not attempt to interfere with the site&apos;s operation,
                probe its security, bypass access controls, or use it to
                harass anyone. Do not upload content that is unlawful or
                infringes on others&apos; rights. We reserve the right to
                terminate access for violations without refund.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-3">
                7. Updates and availability
              </h2>
              <p>
                We update Compound OS over time. New sections, refinements,
                and corrections are included with your access. We do our
                best to keep the site available, but we do not guarantee
                uninterrupted service and are not liable for downtime caused
                by our hosting providers or external incidents.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-3">
                8. Payments and refunds
              </h2>
              <p>
                All payments are processed through Stripe. Refund terms are
                covered separately in our{" "}
                <a
                  href="/refund"
                  className="text-[var(--text-primary)] hover:text-[var(--accent)] underline underline-offset-4 decoration-[var(--border)]"
                >
                  Refund Policy
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-3">
                9. Limitation of liability
              </h2>
              <p>
                To the maximum extent permitted by law, Compound OS, Tarek
                Shaar, and any affiliated parties are not liable for any
                indirect, incidental, consequential, special, or punitive
                damages arising from your use of the site or its content.
                Total aggregate liability is limited to the amount you paid
                for access in the twelve months preceding the claim.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-3">
                10. Indemnification
              </h2>
              <p>
                You agree to defend and indemnify Compound OS and Tarek
                Shaar from claims arising out of your breach of these terms
                or your use of the content in a way that causes harm to
                yourself or others.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-3">
                11. Governing law
              </h2>
              <p>
                These terms are governed by the laws of the United Arab
                Emirates. Any dispute not resolved informally will be
                subject to the exclusive jurisdiction of the courts of
                Dubai, UAE. If you are contracting from a jurisdiction where
                this is not enforceable, the closest equivalent local law
                applies.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-3">
                12. Changes
              </h2>
              <p>
                We may update these terms from time to time. Material
                changes will be reflected by updating the &quot;last
                updated&quot; date at the top of this page. Continued use of
                the site after an update means you accept the revised terms.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-3">
                13. Contact
              </h2>
              <p>
                Questions about these terms can be sent to{" "}
                <a
                  href="mailto:hi@thecompoundsystem.com"
                  className="text-[var(--text-primary)] hover:text-[var(--accent)] underline underline-offset-4 decoration-[var(--border)]"
                >
                  hi@thecompoundsystem.com
                </a>
                .
              </p>
            </section>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
