import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CheckoutButton from "../components/CheckoutButton";
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

      <main className="flex-1 pt-28 md:pt-32 pb-20">
        <article className="max-w-2xl mx-auto px-6">
          {/* Header */}
          <p className="text-xs uppercase tracking-widest text-[var(--accent)] font-medium mb-4">
            About
          </p>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.15]">
            Built for the version of you who actually does the work.
          </h1>
          <p className="mt-6 text-[var(--text-secondary)] text-lg leading-relaxed">
            Compound OS is a structured system for trading, training, and the
            mindset underneath both. It exists because most of what gets sold
            online is content. Content does not compound. Systems do.
          </p>

          {/* Who */}
          <section className="mt-16">
            <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-semibold mb-4">
              Who built this
            </h2>
            <p className="text-[var(--text-secondary)] text-[15px] leading-[1.9] mb-4">
              My name is Tarek. I spent over $20,000 on trading programs from
              people who were better at marketing than executing. I ego-lifted
              my way into a bad shoulder injury and a wrecked lower back. I
              swung between extremes in every domain I touched: crypto to day
              trading, powerlifting to triathlons, hustle culture to complete
              withdrawal.
            </p>
            <p className="text-[var(--text-secondary)] text-[15px] leading-[1.9] mb-4">
              Eventually I stopped chasing and started building. The trading
              framework came from blowing up accounts until the rules were
              unavoidable. The fitness system came from injuries that forced
              me to train like an adult. The mindset protocols came from years
              of forced self-examination, mostly in periods I did not enjoy.
            </p>
            <p className="text-[var(--text-secondary)] text-[15px] leading-[1.9]">
              Compound OS is the operating manual I wish existed when I
              started. I built it for myself first. It now lives here because
              a handful of people asked for it and I ran out of reasons not to
              share it.
            </p>
          </section>

          {/* What I believe */}
          <section className="mt-16">
            <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-semibold mb-4">
              What I believe
            </h2>
            <ul className="space-y-4">
              {[
                "Motivation is unreliable. Structure is not. Every result worth having is the output of a system you run on a day you do not feel like running it.",
                "You already know what to do in most areas of your life. What you need are fewer decisions, clearer rules, and faster recovery from breaking them.",
                "Information is cheap and almost always free. Frameworks that hold up in real conditions are not. That is what this system tries to be.",
                "Trading, fitness, and mindset are the same discipline in three costumes. The person who can run a patient options strategy is the same person who can hold a rep on the edge of failure and the same person who can sit with an uncomfortable emotion without acting.",
                "A paid product should feel like a tool, not a content feed. You should be able to open it, use it, close it, and be slightly better off than when you started.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] mt-2.5 shrink-0" />
                  <span className="text-[var(--text-secondary)] text-[15px] leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Who it's for */}
          <section className="mt-16">
            <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-semibold mb-4">
              Who it is for
            </h2>
            <p className="text-[var(--text-secondary)] text-[15px] leading-[1.9] mb-4">
              People who are already moving. Who do not need a pep talk. Who
              have tried the bootcamps, the signal groups, the influencer
              meal plans, the productivity apps, and who want something that
              treats them like an adult running a real life.
            </p>
            <p className="text-[var(--text-secondary)] text-[15px] leading-[1.9]">
              If that is you, the rest of the site is the product. If it is
              not, no hard feelings. I would rather have a small group of
              people who use the system than a large group who paid for it
              and never opened it.
            </p>
          </section>

          {/* CTA */}
          <section className="mt-16 pt-10 border-t border-[var(--border)] text-center">
            <h3 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] mb-3 tracking-tight">
              Ready to see inside?
            </h3>
            <p className="text-[var(--text-secondary)] text-sm mb-8 max-w-md mx-auto">
              One payment. Lifetime access. Every future update included.
            </p>
            <CheckoutButton className="inline-block px-8 py-3.5 rounded-xl bg-[var(--accent)] text-[#0a0b0f] font-bold text-base transition-all hover:opacity-90 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_-6px_rgba(0,212,170,0.35)] cursor-pointer">
              Get Compound OS {pricing.display}
            </CheckoutButton>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}
