// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Server-side we sample a bit higher because the volume is lower and
  // server errors matter more (Stripe webhook failures, auth errors, etc).
  tracesSampleRate: 0.2,

  enabled: process.env.NODE_ENV === "production",

  debug: false,
});
