import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Reveal from "../components/motion/Reveal";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that govern your use of Compound OS. Educational product, honest disclaimers, reasonable limits.",
};

export const dynamic = "force-static";

const LAST_UPDATED = "April 16, 2026";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-32 md:pt-36 pb-24">
        <article className="max-w-[680px] mx-auto px-6">
          <Reveal>
            <span className="label-caps text-[var(--accent)] block mb-6">
              Legal &middot; Terms
            </span>
            <h1 className="font-serif text-[44px] md:text-[56px] leading-[1.05] tracking-[-0.02em] text-[var(--text-primary)] font-light">
              Terms of Service
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
              These terms govern your access to and use of Compound OS, a
              digital product published at{" "}
              <a
                href="https://thecompoundsystem.com"
                className="not-italic text-[var(--accent)] hover:opacity-80 border-b border-[var(--accent)]/30"
              >
                thecompoundsystem.com
              </a>
              . By creating an account or purchasing access, you agree to
              them. If you do not agree, do not use the site.
            </p>
          </Reveal>

          <div className="space-y-12">
            <Section number="01" heading="What Compound OS is">
              Compound OS is an educational product. It is a structured
              set of frameworks, checklists, and protocols across three
              pillars: markets, fitness, and mindset. It is built from
              personal experience, reading, and practice. It is not a
              licensed financial service, a medical service, or a
              prescription of any kind.
            </Section>

            <Reveal as="section">
              <SectionHeading number="02">Accounts and access</SectionHeading>
              <ul className="divide-y divide-[var(--border-soft)]">
                {[
                  "Your account is personal to you. Do not share your login credentials, and do not allow others to use your account.",
                  "Access is granted for your personal, non-commercial use. One purchase equals one user.",
                  "You must be at least 18 years old to create an account and purchase access.",
                  "We may suspend or terminate access if you share credentials, distribute our content, attempt to scrape or reverse engineer the product, or otherwise breach these terms.",
                ].map((item, i) => (
                  <li key={i} className="py-4 font-serif text-[16px] text-[var(--text-secondary)] leading-[1.75]">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Section number="03" heading="No financial advice">
              Nothing in Compound OS is personalized financial, investment,
              tax, or legal advice. The Markets pillar describes how the
              author thinks about investing and trading. It does not
              account for your specific financial situation, risk
              tolerance, or objectives. You are solely responsible for
              your trading and investment decisions. Past performance does
              not predict future results. Trading options and equities can
              result in total loss of capital.
            </Section>

            <Section number="04" heading="No medical or health advice">
              The Fitness pillar describes the author&apos;s training,
              nutrition, and recovery approach. It is not medical advice
              and is not a substitute for a qualified physician,
              dietitian, physical therapist, or mental health
              professional. Consult a licensed professional before
              starting any new training, nutrition, fasting, breathwork,
              cold exposure, or supplement protocol. You participate at
              your own risk.
            </Section>

            <Section number="05" heading="Intellectual property">
              All content in Compound OS, including text, frameworks,
              diagrams, code, and underlying structure, is owned by Tarek
              Shaar or licensed to him. You receive a personal,
              non-transferable license to access and use the content for
              your own learning. You may not copy, redistribute,
              republish, resell, or create derivative products based on
              the content without written permission. This includes
              screenshots of substantive content, scraping, AI training,
              or mirroring. Quoting a sentence or two in a review is fine.
            </Section>

            <Section number="06" heading="Acceptable use">
              Do not attempt to interfere with the site&apos;s operation,
              probe its security, bypass access controls, or use it to
              harass anyone. Do not upload content that is unlawful or
              infringes on others&apos; rights. We reserve the right to
              terminate access for violations without refund.
            </Section>

            <Section number="07" heading="Updates and availability">
              We update Compound OS over time. New sections, refinements,
              and corrections are included with your access. We do our
              best to keep the site available, but we do not guarantee
              uninterrupted service and are not liable for downtime caused
              by our hosting providers or external incidents.
            </Section>

            <Reveal as="section">
              <SectionHeading number="08">Payments and refunds</SectionHeading>
              <p className="font-serif text-[16px] md:text-[17px] text-[var(--text-secondary)] leading-[1.85]">
                All payments are processed through Stripe. Refund terms
                are covered separately in our{" "}
                <a
                  href="/refund"
                  className="text-[var(--accent)] hover:opacity-80 border-b border-[var(--accent)]/30"
                >
                  Refund Policy
                </a>
                .
              </p>
            </Reveal>

            <Section number="09" heading="Limitation of liability">
              To the maximum extent permitted by law, Compound OS, Tarek
              Shaar, and any affiliated parties are not liable for any
              indirect, incidental, consequential, special, or punitive
              damages arising from your use of the site or its content.
              Total aggregate liability is limited to the amount you paid
              for access in the twelve months preceding the claim.
            </Section>

            <Section number="10" heading="Indemnification">
              You agree to defend and indemnify Compound OS and Tarek
              Shaar from claims arising out of your breach of these terms
              or your use of the content in a way that causes harm to
              yourself or others.
            </Section>

            <Section number="11" heading="Governing law">
              These terms are governed by the laws of the United Arab
              Emirates. Any dispute not resolved informally will be
              subject to the exclusive jurisdiction of the courts of
              Dubai, UAE. If you are contracting from a jurisdiction
              where this is not enforceable, the closest equivalent local
              law applies.
            </Section>

            <Section number="12" heading="Changes">
              We may update these terms from time to time. Material
              changes will be reflected by updating the &ldquo;last
              updated&rdquo; date at the top of this page. Continued use
              of the site after an update means you accept the revised
              terms.
            </Section>

            <Reveal as="section">
              <SectionHeading number="13">Contact</SectionHeading>
              <p className="font-serif text-[16px] md:text-[17px] text-[var(--text-secondary)] leading-[1.85]">
                Questions about these terms can be sent to{" "}
                <a
                  href="mailto:tarek@thecompoundsystem.com"
                  className="text-[var(--accent)] hover:opacity-80 border-b border-[var(--accent)]/30"
                >
                  tarek@thecompoundsystem.com
                </a>
                .
              </p>
            </Reveal>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}

function Section({
  number,
  heading,
  children,
}: {
  number: string;
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal as="section">
      <SectionHeading number={number}>{heading}</SectionHeading>
      <p className="font-serif text-[16px] md:text-[17px] text-[var(--text-secondary)] leading-[1.85]">
        {children}
      </p>
    </Reveal>
  );
}

function SectionHeading({
  number,
  children,
}: {
  number?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-baseline gap-3 mb-5 pb-3 border-b border-[var(--border)]">
      {number && (
        <span className="label-caps text-[var(--text-muted)]">
          §{number}
        </span>
      )}
      <h2 className="label-caps text-[var(--accent)]">{children}</h2>
    </div>
  );
}
