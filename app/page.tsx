import Link from "next/link";

const sections = [
  {
    title: "Trading",
    href: "/trading",
    accent: "var(--accent-trading)",
    icon: "◈",
    description:
      "OTU options framework, The Wheel, VIX allocation, macro regimes, and pre-trade checklists.",
  },
  {
    title: "Mindset",
    href: "/mindset",
    accent: "var(--accent-mindset)",
    icon: "◉",
    description:
      "Mental models, discipline systems, journaling frameworks, and emotional regulation.",
  },
  {
    title: "Fitness",
    href: "/fitness",
    accent: "var(--accent-fitness)",
    icon: "△",
    description:
      "Training programs, nutrition protocols, recovery routines, and progress tracking.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="text-center mb-14">
        <h1 className="text-5xl font-bold tracking-tight text-[var(--text-primary)]">
          Compound OS
        </h1>
        <p className="mt-3 text-[var(--text-secondary)] text-lg max-w-md mx-auto">
          Your personal operating system for trading, mindset, and fitness.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="group bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-8 transition-all hover:border-[var(--text-muted)] hover:-translate-y-1"
          >
            <div
              className="text-3xl mb-4 w-14 h-14 rounded-xl flex items-center justify-center"
              style={{
                background: `color-mix(in srgb, ${s.accent} 12%, transparent)`,
                color: s.accent,
              }}
            >
              {s.icon}
            </div>
            <h2
              className="text-xl font-bold mb-2"
              style={{ color: s.accent }}
            >
              {s.title}
            </h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              {s.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
