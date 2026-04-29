import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Reveal from "../components/motion/Reveal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What information Compound OS collects, how it is stored, and how you can reach us about your data.",
};

export const dynamic = "force-static";

const LAST_UPDATED = "April 16, 2026";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-32 md:pt-36 pb-24">
        <article className="max-w-[680px] mx-auto px-6">
          <Reveal>
            <span className="label-caps text-[var(--accent)] block mb-6">
              Legal &middot; Privacy
            </span>
            <h1 className="font-serif text-[44px] md:text-[56px] leading-[1.05] tracking-[-0.02em] text-[var(--text-primary)] font-light">
              Privacy Policy
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
              This policy explains what information Compound OS collects
              when you visit{" "}
              <a
                href="https://thecompoundsystem.com"
                className="not-italic text-[var(--accent)] hover:opacity-80 border-b border-[var(--accent)]/30"
              >
                thecompoundsystem.com
              </a>
              , how we use it, and how you can reach us about it. We keep
              the surface area as small as possible on purpose.
            </p>
          </Reveal>

          <div className="space-y-12">
            <Reveal as="section">
              <SectionHeading>Who we are</SectionHeading>
              <Body>
                Compound OS is operated by Tarek Shaar, an independent
                operator based in the UAE. Reach us any time at{" "}
                <a
                  href="mailto:tarek@thecompoundsystem.com"
                  className="text-[var(--accent)] hover:opacity-80 border-b border-[var(--accent)]/30"
                >
                  tarek@thecompoundsystem.com
                </a>
                .
              </Body>
            </Reveal>

            <Reveal as="section" delay={0.05}>
              <SectionHeading>Information we collect</SectionHeading>
              <ul className="divide-y divide-[var(--border-soft)]">
                {[
                  [
                    "Email address",
                    "Required to create an account, receive the magic login link, and verify access after purchase.",
                  ],
                  [
                    "Authentication metadata",
                    "When you log in, we store a signed session cookie in your browser so you do not have to re-authenticate on every page load.",
                  ],
                  [
                    "Purchase metadata",
                    "When you buy, Stripe processes the payment and sends us confirmation, your email, and an internal customer identifier. We never see your card number or banking details.",
                  ],
                  [
                    "Product usage",
                    "We store which modules you have opened and completed so your progress persists across devices. We do not track your clicks, scroll depth, or session recordings.",
                  ],
                  [
                    "Basic server logs",
                    "Our hosting provider keeps request logs (IP address, user agent, timestamp) for security and debugging. These are short-lived and not joined to your account.",
                  ],
                ].map(([title, body], i) => (
                  <li key={i} className="py-4">
                    <span className="label-caps text-[var(--accent)] block mb-2">
                      {title}
                    </span>
                    <span className="font-serif text-[16px] text-[var(--text-secondary)] leading-[1.75]">
                      {body}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal as="section" delay={0.05}>
              <SectionHeading>How we use it</SectionHeading>
              <Body>
                We use the information above only to deliver the product
                (give you access, track your progress, support your
                account) and to communicate with you about it (receipts,
                important service messages, the occasional update). We do
                not sell, rent, or trade your data.
              </Body>
            </Reveal>

            <Reveal as="section" delay={0.05}>
              <SectionHeading>Third parties we rely on</SectionHeading>
              <Body>
                Compound OS is intentionally a small operation. We rely on
                a handful of well-known vendors to run it:
              </Body>
              <ul className="mt-6 divide-y divide-[var(--border-soft)]">
                {[
                  ["Stripe", "Processes every payment and stores card details on our behalf."],
                  ["Supabase", "Stores your account email and progress data."],
                  ["Resend", "Delivers transactional and magic-link email."],
                  ["Vercel", "Hosts the site and handles request-level logging."],
                ].map(([vendor, role], i) => (
                  <li
                    key={i}
                    className="flex items-baseline gap-5 py-4"
                  >
                    <span className="label-caps text-[var(--text-muted)] w-20 shrink-0">
                      {vendor}
                    </span>
                    <span className="font-serif text-[16px] text-[var(--text-secondary)] leading-[1.7]">
                      {role}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 font-serif italic text-[15px] text-[var(--text-secondary)]">
                Each provider has its own privacy posture. We share only
                what is necessary for them to do their job.
              </p>
            </Reveal>

            <Reveal as="section" delay={0.05}>
              <SectionHeading>Cookies and analytics</SectionHeading>
              <Body>
                We use one cookie: a signed session cookie that confirms
                you are logged in. We do not run third-party advertising
                pixels or cross-site trackers. If we ever add light product
                analytics, we will list them here before turning them on
                and will prefer tools that are privacy-respecting by
                default.
              </Body>
            </Reveal>

            <Reveal as="section" delay={0.05}>
              <SectionHeading>Your rights</SectionHeading>
              <Body>
                You can request a copy of the data we hold on you, request
                corrections, or ask us to delete your account and
                associated data entirely. Email{" "}
                <a
                  href="mailto:tarek@thecompoundsystem.com"
                  className="text-[var(--accent)] hover:opacity-80 border-b border-[var(--accent)]/30"
                >
                  tarek@thecompoundsystem.com
                </a>{" "}
                and we will respond within a reasonable window, usually a
                few business days.
              </Body>
            </Reveal>

            <Reveal as="section" delay={0.05}>
              <SectionHeading>Retention</SectionHeading>
              <Body>
                We keep your account data for as long as your account is
                active. If you delete your account, we remove your profile
                and progress within 30 days, except where we are required
                to keep transactional records (receipts) for accounting and
                legal reasons.
              </Body>
            </Reveal>

            <Reveal as="section" delay={0.05}>
              <SectionHeading>Changes to this policy</SectionHeading>
              <Body>
                If we make material changes, we will update the &ldquo;last
                updated&rdquo; date at the top of this page and, where
                appropriate, email active members. Continued use of the
                site after an update constitutes acceptance.
              </Body>
            </Reveal>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="label-caps text-[var(--accent)] mb-5 pb-3 border-b border-[var(--border)]">
      {children}
    </h2>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-serif text-[16px] md:text-[17px] text-[var(--text-secondary)] leading-[1.85]">
      {children}
    </p>
  );
}
