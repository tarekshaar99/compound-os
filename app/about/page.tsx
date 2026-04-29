import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CheckoutButton from "../components/CheckoutButton";
import Reveal from "../components/motion/Reveal";
import { getPricing } from "../lib/pricing";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why Compound OS exists, who built it, and who it is for. A structured system for how you trade, train, and operate.",
};

export const revalidate = 60;

export default async function AboutPage() {
  const pricing = await getPricing();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-32 md:pt-36 pb-24">
        <article className="max-w-[680px] mx-auto px-6">
          {/* Editorial masthead */}
          <Reveal>
            <span className="label-caps text-[var(--accent)] block mb-6">
              Letter from the editor
            </span>
            <h1 className="font-serif text-[44px] md:text-[64px] leading-[1.05] tracking-[-0.02em] text-[var(--text-primary)] font-light">
              Built for the version of you who actually does the work.
            </h1>
            <p className="mt-8 font-serif italic text-[18px] md:text-[20px] text-[var(--text-secondary)] leading-[1.6]">
              Compound OS is a structured system for trading, training, and
              the mindset underneath both. It exists because most of what
              gets sold online is content. Content does not compound.
              Systems do.
            </p>
          </Reveal>

          {/* Hairline rule */}
          <Reveal delay={0.2}>
            <div className="my-16 h-px w-12 bg-[var(--accent)]" />
          </Reveal>

          {/* Who built this */}
          <Reveal as="section" delay={0.25}>
            <h2 className="label-caps text-[var(--text-muted)] mb-6 pb-3 border-b border-[var(--border)]">
              Who built this
            </h2>
            <div className="space-y-6 font-serif text-[16px] md:text-[17px] text-[var(--text-secondary)] leading-[1.85]">
              <p>
                My name is Tarek. I spent over $20,000 on trading programs
                from people who were better at marketing than executing. I
                ego-lifted my way into a bad shoulder injury and a wrecked
                lower back. I swung between extremes in every domain I
                touched: crypto to day trading, powerlifting to triathlons,
                hustle culture to complete withdrawal.
              </p>
              <p>
                Eventually I stopped chasing and started building. The
                trading framework came from blowing up accounts until the
                rules were unavoidable. The fitness system came from
                injuries that forced me to train like an adult. The mindset
                protocols came from years of forced self-examination,
                mostly in periods I did not enjoy.
              </p>
              <p className="font-serif italic text-[var(--text-primary)]">
                Compound OS is the operating manual I wish existed when I
                started. I built it for myself first. It now lives here
                because a handful of people asked for it and I ran out of
                reasons not to share it.
              </p>
            </div>
          </Reveal>

          {/* What I believe */}
          <Reveal as="section" delay={0.3} className="mt-16">
            <h2 className="label-caps text-[var(--text-muted)] mb-6 pb-3 border-b border-[var(--border)]">
              What I believe
            </h2>
            <ul className="divide-y divide-[var(--border-soft)]">
              {[
                "Motivation is unreliable. Structure is not. Every result worth having is the output of a system you run on a day you do not feel like running it.",
                "You already know what to do in most areas of your life. What you need are fewer decisions, clearer rules, and faster recovery from breaking them.",
                "Information is cheap and almost always free. Frameworks that hold up in real conditions are not. That is what this system tries to be.",
                "Trading, fitness, and mindset are the same discipline in three costumes. The person who can run a patient options strategy is the same person who can hold a rep on the edge of failure and the same person who can sit with an uncomfortable emotion without acting.",
                "A paid product should feel like a tool, not a content feed. You should be able to open it, use it, close it, and be slightly better off than when you started.",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-5 py-5"
                >
                  <span className="label-caps text-[var(--accent)] mt-1 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-serif text-[16px] md:text-[17px] text-[var(--text-secondary)] leading-[1.75]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Who it is for */}
          <Reveal as="section" delay={0.35} className="mt-16">
            <h2 className="label-caps text-[var(--text-muted)] mb-6 pb-3 border-b border-[var(--border)]">
              Who it is for
            </h2>
            <div className="space-y-6 font-serif text-[16px] md:text-[17px] text-[var(--text-secondary)] leading-[1.85]">
              <p>
                People who are already moving. Who do not need a pep talk.
                Who have tried the bootcamps, the signal groups, the
                influencer meal plans, the productivity apps, and who want
                something that treats them like an adult running a real
                life.
              </p>
              <p className="font-serif italic">
                If that is you, the rest of the site is the product. If it
                is not, no hard feelings. I would rather have a small group
                of people who use the system than a large group who paid
                for it and never opened it.
              </p>
            </div>
          </Reveal>

          {/* CTA */}
          <Reveal delay={0.4}>
            <section className="mt-20 pt-12 border-t border-[var(--border)] text-center">
              <span className="label-caps text-[var(--accent)] block mb-4">
                If you&apos;re ready
              </span>
              <h3 className="font-serif text-[28px] md:text-[36px] leading-[1.1] tracking-tight text-[var(--text-primary)] font-light mb-3">
                See inside the system.
              </h3>
              <p className="font-serif italic text-[16px] text-[var(--text-secondary)] mb-10 max-w-md mx-auto">
                One payment. Lifetime access. Every future update included.
              </p>
              <CheckoutButton className="group inline-flex items-center gap-3 px-8 py-4 bg-[var(--accent)] text-[var(--on-accent)] label-caps border border-[var(--accent)] hover:bg-transparent hover:text-[var(--accent)] transition-all duration-500 cursor-pointer">
                Get Compound OS · {pricing.display}
                <span
                  aria-hidden
                  className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                >
                  &rarr;
                </span>
              </CheckoutButton>
            </section>
          </Reveal>
        </article>
      </main>

      <Footer />
    </div>
  );
}
