import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  /* config options here */
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
