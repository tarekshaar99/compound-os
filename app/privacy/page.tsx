import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Compound OS",
  description:
    "What information Compound OS collects, how it is stored, and how you can reach us about your data.",
};

export const dynamic = "force-static";

const LAST_UPDATED = "April 16, 2026";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-28 md:pt-32 pb-20">
        <article className="max-w-2xl mx-auto px-6">
          {/* Heading */}
          <p className="text-xs uppercase tracking-widest text-[var(--accent)] font-medium mb-4">
            Legal
          </p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.15]">
            Privacy Policy
          </h1>
          <p className="mt-3 text-xs text-[var(--text-muted)]">
            Last updated: {LAST_UPDATED}
          </p>

          <div className="mt-10 space-y-10 text-[var(--text-secondary)] text-[15px] leading-[1.85]">
            <section>
              <p>
                This policy explains what information Compound OS collects
                when you visit{" "}
                <a
                  href="https://thecompoundsystem.com"
                  className="text-[var(--text-primary)] hover:text-[var(--accent)] underline underline-offset-4 decoration-[var(--border)]"
                >
                  thecompoundsystem.com
                </a>
                , how we use it, and how you can reach us about it. We keep
                the surface area as small as possible on purpose.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-3">
                Who we are
              </h2>
              <p>
                Compound OS is operated by Tarek Shaar, an independent
                operator based in the UAE. Reach us any time at{" "}
                <a
                  href="mailto:hello@thecompoundsystem.com"
                  className="text-[var(--text-primary)] hover:text-[var(--accent)] underline underline-offset-4 decoration-[var(--border)]"
                >
                  hello@thecompoundsystem.com
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-3">
                Information we collect
              </h2>
              <ul className="space-y-2.5 list-none">
                {[
                  [
                    "Email address.",
                    "Required to create an account, receive the magic login link, and verify access after purchase.",
                  ],
                  [
                    "Authentication metadata.",
                    "When you log in, we store a signed session cookie in your browser so you do not have to re-authenticate on every page load.",
                  ],
                  [
                    "Purchase metadata.",
                    "When you buy, Stripe processes the payment and sends us confirmation, your email, and an internal customer identifier. We never see your card number or banking details.",
                  ],
                  [
                    "Product usage.",
                    "We store which modules you have opened and completed so your progress persists across devices. We do not track your clicks, scroll depth, or session recordings.",
                  ],
                  [
                    "Basic server logs.",
                    "Our hosting provider keeps request logs (IP address, user agent, timestamp) for security and debugging. These are short-lived and not joined to your account.",
                  ],
                ].map(([title, body], i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] mt-2.5 shrink-0" />
                    <span>
                      <strong className="text-[var(--text-primary)] font-semibold">
                        {title}
                      </strong>{" "}
                      {body}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-3">
                How we use it
              </h2>
              <p>
                We use the information above only to deliver the product
                (give you access, track your progress, support your account)
                and to communicate with you about it (receipts, important
                service messages, the occasional update). We do not sell,
                rent, or trade your data.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-3">
                Third parties we rely on
              </h2>
              <p className="mb-3">
                Compound OS is intentionally a small operation. We rely on a
                handful of well-known vendors to run it:
              </p>
              <ul className="space-y-2 list-none">
                {[
                  ["Stripe", "processes every payment and stores card details on our behalf."],
                  ["Supabase", "stores your account email and progress data."],
                  ["Resend", "delivers transactional and magic-link email."],
                  ["Vercel", "hosts the site and handles request-level logging."],
                ].map(([vendor, role], i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-muted)] mt-2.5 shrink-0" />
                    <span>
                      <strong className="text-[var(--text-primary)] font-semibold">
                        {vendor}
                      </strong>{" "}
                      {role}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-3">
                Each of these providers has its own privacy posture. We share
                only what is necessary for them to do their job.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-3">
                Cookies and analytics
              </h2>
              <p>
                We use one cookie: a signed session cookie that confirms you
                are logged in. We do not run third-party advertising pixels
                or cross-site trackers. If we ever add light product
                analytics, we will list them here before turning them on and
                will prefer tools that are privacy-respecting by default.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-3">
                Your rights
              </h2>
              <p>
                You can request a copy of the data we hold on you, request
                corrections, or ask us to delete your account and associated
                data entirely. Email{" "}
                <a
                  href="mailto:hello@thecompoundsystem.com"
                  className="text-[var(--text-primary)] hover:text-[var(--accent)] underline underline-offset-4 decoration-[var(--border)]"
                >
                  hello@thecompoundsystem.com
                </a>{" "}
                and we will respond within a reasonable window, usually a
                few business days.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-3">
                Retention
              </h2>
              <p>
                We keep your account data for as long as your account is
                active. If you delete your account, we remove your profile
                and progress within 30 days, except where we are required to
                keep transactional records (receipts) for accounting and
                legal reasons.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-3">
                Changes to this policy
              </h2>
              <p>
                If we make material changes, we will update the &quot;last
                updated&quot; date at the top of this page and, where
                appropriate, email active members. Continued use of the site
                after an update constitutes acceptance.
              </p>
            </section>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
