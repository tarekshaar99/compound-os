import Link from "next/link";

/**
 * Site-wide footer. Used on the marketing home and on all trust/info
 * pages (about, privacy, terms, refund, contact, login).
 *
 * Not used on paid app routes (dashboard, pillar modules) where the
 * layout already commits the full viewport to the product experience.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Top: brand + nav columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          {/* Brand column */}
          <div className="md:col-span-1">
            <Link
              href="/"
              className="inline-block text-base font-bold tracking-tight text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
            >
              Compound OS
            </Link>
            <p className="mt-3 text-xs text-[var(--text-muted)] leading-relaxed max-w-[220px]">
              The complete system for how you trade, train, and operate.
            </p>
          </div>

          {/* Product column */}
          <div>
            <h4 className="text-[11px] uppercase tracking-widest text-[var(--text-muted)] font-semibold mb-4">
              Product
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/#whats-inside"
                  className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  What&apos;s inside
                </Link>
              </li>
              <li>
                <Link
                  href="/#pricing"
                  className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  Sign in
                </Link>
              </li>
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h4 className="text-[11px] uppercase tracking-widest text-[var(--text-muted)] font-semibold mb-4">
              Company
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal column */}
          <div>
            <h4 className="text-[11px] uppercase tracking-widest text-[var(--text-muted)] font-semibold mb-4">
              Legal
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/refund"
                  className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom: copyright + contact */}
        <div className="mt-12 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-xs text-[var(--text-muted)]">
            &copy; {year} The Compound System. All rights reserved.
          </p>
          <a
            href="mailto:tarek@thecompoundsystem.com"
            className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            tarek@thecompoundsystem.com
          </a>
        </div>
      </div>
    </footer>
  );
}
