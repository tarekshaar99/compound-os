/**
 * Runtime env-var validator. Imported by the app's bootstrap path
 * (instrumentation.ts) so production deploys fail loudly the moment a
 * required secret isn't wired up — instead of silently 500-ing on the
 * first user request.
 *
 * This is intentionally split into two checks:
 *
 *   1. **Always required** — variables we rely on for every request,
 *      including local dev. Missing any of these = the app cannot run.
 *
 *   2. **Production required** — variables we only enforce when we
 *      detect production (NODE_ENV=production AND VERCEL_ENV=production).
 *      Email, ad pixels, and Sentry-build-only vars sit here so local
 *      dev keeps working without setting up the full production stack.
 *
 * In Vercel, this validator runs once per cold start of every function.
 * If validation throws, the function returns a 500 — which is precisely
 * what we want for misconfigured deploys.
 */

interface EnvCheck {
  name: string;
  /** Require this var even in dev. Defaults to true. */
  always?: boolean;
  /** Optional minimum length (for secret strength). */
  minLength?: number;
}

/**
 * The full list of env vars this app references. Comments mirror
 * .env.example and tell you where to find each value.
 */
const REQUIRED_ENV: EnvCheck[] = [
  // ── Always required ──────────────────────────────────────────────
  // Supabase data layer
  { name: "NEXT_PUBLIC_SUPABASE_URL", always: true },
  { name: "NEXT_PUBLIC_SUPABASE_ANON_KEY", always: true, minLength: 100 },
  { name: "SUPABASE_SERVICE_ROLE_KEY", always: true, minLength: 100 },

  // Stripe payment + webhook
  { name: "STRIPE_SECRET_KEY", always: true, minLength: 30 },
  { name: "STRIPE_WEBHOOK_SECRET", always: true, minLength: 20 },

  // Session-cookie signing key (≥32 chars enforced inside session.ts already)
  { name: "COS_SESSION_SECRET", always: true, minLength: 32 },

  // ── Production-only ─────────────────────────────────────────────
  // Email (Resend) — locally we let welcome emails skip silently.
  { name: "RESEND_API_KEY", always: false, minLength: 20 },
  { name: "EMAIL_FROM", always: false },

  // Site URL — defaults to origin in dev; required for prod redirects.
  { name: "NEXT_PUBLIC_SITE_URL", always: false },
];

function isProductionEnv(): boolean {
  // Vercel sets VERCEL_ENV=production for the production deployment;
  // preview/development deployments get other values. We check both
  // NODE_ENV and VERCEL_ENV so this is also correct for non-Vercel
  // production hosts.
  return (
    process.env.NODE_ENV === "production" &&
    process.env.VERCEL_ENV !== "preview" &&
    process.env.VERCEL_ENV !== "development"
  );
}

/**
 * Validate the env. Throws a single Error listing every missing or
 * malformed var so a CI / Vercel build log surfaces them all at once,
 * not one at a time.
 */
export function validateEnv(): void {
  const isProd = isProductionEnv();
  const errors: string[] = [];

  for (const check of REQUIRED_ENV) {
    const required = check.always ?? true ? true : isProd;
    if (!required) continue;

    const value = process.env[check.name];
    if (!value || value.trim().length === 0) {
      errors.push(`Missing required env var: ${check.name}`);
      continue;
    }

    if (check.minLength && value.length < check.minLength) {
      errors.push(
        `${check.name} too short (have ${value.length}, need ≥${check.minLength})`
      );
    }
  }

  if (errors.length > 0) {
    const banner = "─".repeat(60);
    const message =
      `\n${banner}\n` +
      `Env validation failed (${errors.length} issue${errors.length === 1 ? "" : "s"}):\n` +
      errors.map((e) => `  • ${e}`).join("\n") +
      `\n\nSee .env.example for documentation.\n${banner}\n`;
    throw new Error(message);
  }
}

/**
 * Soft check — returns the list of missing vars without throwing.
 * Used for diagnostics endpoints / Sentry breadcrumbs.
 */
export function checkEnv(): { ok: boolean; missing: string[] } {
  const isProd = isProductionEnv();
  const missing: string[] = [];

  for (const check of REQUIRED_ENV) {
    const required = check.always ?? true ? true : isProd;
    if (!required) continue;

    const value = process.env[check.name];
    if (!value || value.trim().length === 0) {
      missing.push(check.name);
    }
  }

  return { ok: missing.length === 0, missing };
}
