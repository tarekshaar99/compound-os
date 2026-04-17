import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Refund Policy | Compound OS",
  description:
    "A simple, fair refund window for Compound OS. Email us and we will sort it.",
};

export const dynamic = "force-static";

const LAST_UPDATED = "April 16, 2026";
const REFUND_WINDOW_DAYS = 14;

export default function RefundPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-28 md:pt-32 pb-20">
        <article className="max-w-2xl mx-auto px-6">
          <p className="text-xs uppercase tracking-widest text-[var(--accent)] font-medium mb-4">
            Legal
          </p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.15]">
            Refund Policy
          </h1>
          <p className="mt-3 text-xs text-[var(--text-muted)]">
            Last updated: {LAST_UPDATED}
          </p>

          <div className="mt-10 space-y-10 text-[var(--text-secondary)] text-[15px] leading-[1.85]">
            <section>
              <p>
                Compound OS is a digital product. You get instant, lifetime
                access the moment your payment succeeds. Because of that, we
                keep the refund rules short and honest.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-3">
                The {REFUND_WINDOW_DAYS}-day window
              </h2>
              <p>
                If you buy Compound OS and decide it is not for you, you can
                request a full refund within {REFUND_WINDOW_DAYS} days of
                purchase. No form to fill out. No questions asked. Email us
                and we will refund the payment through Stripe.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-3">
                After the window
              </h2>
              <p>
                Past {REFUND_WINDOW_DAYS} days, the purchase is final.
                Two weeks is enough time to open the product, work through
                the start-here modules in each pillar, and decide if it is
                for you. If something unusual comes up (a family emergency,
                an illness, a charge you do not recognize), email us anyway.
                We will look at it case by case.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-3">
                How to request
              </h2>
              <p>
                Send an email to{" "}
                <a
                  href="mailto:hello@thecompoundsystem.com"
                  className="text-[var(--text-primary)] hover:text-[var(--accent)] underline underline-offset-4 decoration-[var(--border)]"
                >
                  hello@thecompoundsystem.com
                </a>{" "}
                from the same email address you used to purchase. Include
                your name or order reference if you have it. We will process
                the refund within a few business days.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-3">
                Abuse
              </h2>
              <p>
                We reserve the right to refuse refunds in cases of clear
                abuse: repeated purchases and refunds, chargebacks filed
                without contacting us first, or use of the content in ways
                that violate our{" "}
                <a
                  href="/terms"
                  className="text-[var(--text-primary)] hover:text-[var(--accent)] underline underline-offset-4 decoration-[var(--border)]"
                >
                  Terms of Service
                </a>
                . Outside of those cases, the default answer inside the
                window is yes.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-3">
                Processing time
              </h2>
              <p>
                Refunds typically appear in your account within 5 to 10
                business days after Stripe processes them, depending on your
                bank. We do not control that timing.
              </p>
            </section>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
