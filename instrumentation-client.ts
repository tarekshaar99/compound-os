// This file configures the initialization of Sentry on the client side.
// The config you add here will be used whenever a user loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Only 10% of transactions get traced. Keeps the free tier from burning on
  // day 1. Bump this up later if you have signal but no volume.
  tracesSampleRate: 0.1,

  // Don't record session replays by default. We'll turn this on if/when we
  // need it for a specific debug session. Replays eat quota fast.
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 0,

  // Skip reporting in development - we don't want local dev noise in Sentry.
  enabled: process.env.NODE_ENV === "production",

  // Send structured console output to Sentry. Useful for post-mortem
  // debugging when an error fires.
  debug: false,
});

// Instrument client-side navigations so Sentry tracks page transitions
// in its Performance view. Required by Sentry for App Router apps.
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
