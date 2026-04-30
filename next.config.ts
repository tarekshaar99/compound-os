import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

/**
 * Security-relevant response headers applied to every route.
 *
 * Rationale per header:
 *   - X-Frame-Options: DENY → blocks clickjacking. We never embed our app
 *     in iframes, so DENY is safe and stronger than SAMEORIGIN.
 *   - X-Content-Type-Options: nosniff → blocks MIME-sniffing attacks.
 *   - Referrer-Policy: strict-origin-when-cross-origin → leaks origin
 *     only on same-protocol same-origin nav, mitigates token-in-referrer.
 *   - Permissions-Policy → denies APIs we never use (camera/mic/geo).
 *   - Strict-Transport-Security → forces HTTPS for 2y on the apex +
 *     subdomains; preload-eligible.
 *   - Content-Security-Policy → conservative-but-functional. We need to
 *     allow Stripe/Supabase/Sentry/Resend/Vercel-Analytics + the three
 *     ad pixels. Inline scripts are needed by Next.js itself for
 *     hydration. unsafe-eval is required by Sentry's runtime.
 *
 * The CSP is intentionally not super-strict — a too-tight policy would
 * break the embedded checkout, the pixels, or Sentry. We can tighten in
 * a follow-up by moving to nonces + report-only first.
 */
const SECURITY_HEADERS = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' " +
        "https://js.stripe.com " +
        "https://*.sentry.io " +
        "https://va.vercel-scripts.com " +
        "https://*.vercel-insights.com " +
        "https://www.googletagmanager.com " +
        "https://www.google-analytics.com " +
        "https://connect.facebook.net " +
        "https://analytics.tiktok.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' data: https://fonts.gstatic.com",
      "img-src 'self' data: blob: https: " +
        "https://www.facebook.com " +
        "https://analytics.tiktok.com " +
        "https://www.google-analytics.com",
      "connect-src 'self' " +
        "https://*.supabase.co " +
        "https://api.stripe.com " +
        "https://*.sentry.io " +
        "https://va.vercel-scripts.com " +
        "https://*.vercel-insights.com " +
        "https://www.google-analytics.com " +
        "https://stats.g.doubleclick.net " +
        "https://connect.facebook.net " +
        "https://www.facebook.com " +
        "https://analytics.tiktok.com " +
        "https://business-api.tiktok.com",
      "frame-src 'self' https://js.stripe.com https://hooks.stripe.com",
      "frame-ancestors 'none'",
      "form-action 'self'",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  // Apply security headers to every route. Static assets, API routes,
  // and pages all get the same baseline policy.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: SECURITY_HEADERS,
      },
    ];
  },
};

export default withSentryConfig(nextConfig, {
  // Sentry org + project slugs. Set these via env vars in Vercel so this
  // file stays generic.
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,

  // Only print Sentry build output in CI / Vercel, not in local dev.
  silent: !process.env.CI,

  // Upload source maps so stack traces in Sentry point at your real code
  // instead of the minified output. Requires SENTRY_AUTH_TOKEN env var in
  // the build environment (Vercel).
  widenClientFileUpload: true,

  // Route Sentry requests through /monitoring to bypass ad blockers.
  // Makes client-side errors actually reach Sentry even for users with
  // uBlock / Brave shields / etc.
  tunnelRoute: "/monitoring",
});
