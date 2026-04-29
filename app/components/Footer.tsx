import Link from "next/link";

/**
 * Site-wide footer in the Editorial Quarterly direction.
 *
 * Hairline separators replace shadows; copyright in roman numerals
 * (MMXXVI = 2026) for editorial gravitas.
 *
 * Used on the marketing home + all trust pages. NOT used on paid app
 * routes — those use the dashboard's persistent sidebar instead.
 */
export default function Footer() {
  const year = new Date().getFullYear();
  const yearRoman = toRoman(year);

  return (
    <footer className="border-t border-[var(--border)] mt-auto">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-16 md:py-20">
        {/* Top: brand + columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand column */}
          <div className="md:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center gap-3 text-[var(--text-primary)] hover:opacity-90 transition-opacity"
              aria-label="Compound OS home"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 100 100"
                aria-hidden="true"
                className="shrink-0"
              >
                <rect x="35" y="23" width="30" height="14" fill="#BF9A62" />
                <rect x="25" y="43" width="50" height="14" fill="#BF9A62" />
                <rect x="10" y="63" width="80" height="14" fill="#BF9A62" />
              </svg>
              <span className="font-serif text-base uppercase tracking-[0.18em] text-[var(--accent)]">
                Compound OS
              </span>
            </Link>
            <p className="mt-5 font-serif italic text-[15px] text-[var(--text-secondary)] leading-relaxed max-w-[260px]">
              The complete system for how you trade, train, and operate.
            </p>
          </div>

          <FooterColumn title="Product">
            <FooterLink href="/#whats-inside">What&apos;s inside</FooterLink>
            <FooterLink href="/#pricing">Pricing</FooterLink>
            <FooterLink href="/login">Sign in</FooterLink>
          </FooterColumn>

          <FooterColumn title="Company">
            <FooterLink href="/about">About</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
          </FooterColumn>

          <FooterColumn title="Legal">
            <FooterLink href="/privacy">Privacy Policy</FooterLink>
            <FooterLink href="/terms">Terms of Service</FooterLink>
            <FooterLink href="/refund">Refund Policy</FooterLink>
          </FooterColumn>
        </div>

        {/* Bottom: copyright + contact */}
        <div className="mt-16 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="label-caps text-[var(--text-muted)]">
            &copy; {yearRoman} The Compound System. All rights reserved.
          </p>
          <a
            href="mailto:tarek@thecompoundsystem.com"
            className="label-caps text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
          >
            tarek@thecompoundsystem.com
          </a>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h4 className="label-caps text-[var(--text-muted)] mb-5">{title}</h4>
      <ul className="space-y-3">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="font-serif text-[15px] text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-300"
      >
        {children}
      </Link>
    </li>
  );
}

/**
 * Roman-numeral the year. Cap at 3999 (the conventional upper bound for
 * standard roman numerals).
 */
function toRoman(num: number): string {
  if (num <= 0 || num >= 4000) return String(num);
  const map: Array<[number, string]> = [
    [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
    [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
    [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
  ];
  let n = num;
  let out = "";
  for (const [val, sym] of map) {
    while (n >= val) {
      out += sym;
      n -= val;
    }
  }
  return out;
}
