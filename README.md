# Compound OS

The operating system for a compounding life — three pillars (Markets, Fitness, Mindset), one paid membership product. Live at **[thecompoundsystem.com](https://thecompoundsystem.com)**.

## Stack

- **Framework:** Next.js 16 (App Router, Turbopack, React Server Components)
- **Auth:** Supabase Auth (email OTP, Google OAuth planned). Session is a custom signed cookie (`cos_session`) issued by `/api/session/sync` after a valid Supabase login.
- **DB:** Supabase Postgres. Three tables in `public`:
  - `users` — email, `paid`, `admin`, `onboarding_complete`, `priority_pillar`, `last_active_module`.
  - `user_progress` — `{ user_email, module_id, completion_data (jsonb), completed_at }`.
  - `events` — lightweight event log used by `trackEvent()`.
  - RLS is enabled on all three; all server access uses the service-role key.
- **Payments:** Stripe Checkout (one-time, inline `price_data`, no Price IDs). Webhook at `/api/stripe/webhook` marks `users.paid = true` on `checkout.session.completed`.
- **Email:** Resend. Welcome email sent from `lib/email.ts` after successful payment.
- **Hosting:** Vercel. Analytics via `@vercel/analytics`.

## Local development

Requires Node 20+.

```bash
# Clone, then:
cp .env.example .env.local
# Fill in the values (see below)

npm install
npm run dev
# → http://localhost:3000
```

The dev server runs against **real Supabase and real Stripe test mode** — there is no local mock. Use Stripe test keys and a test Supabase project if you want to experiment without touching prod data.

## Required environment variables

All of these are required in production (Vercel project settings) and for local dev (`.env.local`). `.env.example` has a documented copy.

| Variable | Where it comes from | Notes |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Project Settings → API | Public, safe to expose. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Project Settings → API | Public; RLS must be on. |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Project Settings → API | **Server-only. Bypasses RLS. Never expose to the client.** |
| `STRIPE_SECRET_KEY` | Stripe → Developers → API keys | Use `sk_test_*` locally, `sk_live_*` in prod. |
| `STRIPE_WEBHOOK_SECRET` | Stripe → Developers → Webhooks → [endpoint] | Unique per endpoint. Different for local `stripe listen` vs prod webhook. |
| `COS_SESSION_SECRET` | You generate it | `openssl rand -base64 48`. Signs the session cookie. Must be long and random. |
| `RESEND_API_KEY` | Resend dashboard → API Keys | Optional in dev; welcome emails are skipped if missing. |
| `EMAIL_FROM` | Your verified Resend sender | Bare email (`tarek@yourdomain.com`) is fine — `lib/email.ts` wraps it with a display name. |
| `NEXT_PUBLIC_SITE_URL` | The public URL of this deployment | e.g. `https://thecompoundsystem.com` or `http://localhost:3000`. Used for Stripe redirect URLs and email links. |

## Project structure

```
app/
  api/                  # Route handlers (Stripe webhook, session sync, checkout, etc.)
  auth/callback/        # Supabase OAuth callback landing
  components/           # Shared React components (Header, Footer, LoginForm, etc.)
    module/             # Lesson/Module primitives (Lesson, Reflection, Quiz, ...)
  dashboard/            # Member home
  fitness/ trading/ mindset/
    page.tsx            # Pillar index
    m/<slug>/page.tsx   # Individual module
  lib/
    modules.ts          # Single source of truth for every module
    progress-server.ts  # Supabase progress read/write (service-role)
    session.ts          # Signed-cookie session issuer/verifier
    supabase.ts         # Anon + service-role clients
    email.ts            # Welcome email sender
    track.ts, events.ts # Analytics helpers
  reflections/          # Aggregated reflections across all modules
  trading/patterns/     # Visual chart-patterns reference
  opengraph-image.tsx   # Dynamic OG card
  twitter-image.tsx     # Twitter card (reuses OG)
  sitemap.ts robots.ts  # SEO
  layout.tsx            # Root metadata + fonts + Analytics
middleware.ts           # Gates authenticated routes via cos_session cookie
```

Every module lives in `lib/modules.ts` as a `ModuleDef`. Adding a new module means:
1. Create `app/<pillar>/m/<slug>/page.tsx` using `Lesson`, `Checklist`, `Quiz`, `Reflection`, `CompleteModule` primitives.
2. Append a `ModuleDef` to `MODULES` in `lib/modules.ts`.
3. Update the previous module's `CompleteModule nextPath` to point at the new one.

## Common operations

| Task | Command / location |
|---|---|
| Run dev server | `npm run dev` |
| Build | `npm run build` |
| Deploy to prod | `npx vercel --prod --yes` |
| Tail prod logs | `npx vercel logs <deployment-url>` |
| Stripe webhook (local) | `stripe listen --forward-to localhost:3000/api/stripe/webhook` |
| See who paid | Stripe Dashboard → Payments, or `select email, paid, created_at from users where paid = true;` |
| See active users | Supabase → Authentication → Users |
| See module progress | `select * from user_progress order by completed_at desc limit 50;` |

## Gotchas

- **Never commit `.env.local`.** It's gitignored; keep it that way.
- **RLS is on.** If you ever add client-side Supabase reads, you must add explicit RLS policies or the anon key will silently return zero rows.
- **Stripe webhook must use raw body.** `app/api/stripe/webhook/route.ts` disables body parsing. Don't refactor that handler to use `request.json()`.
- **Modules are chained manually.** Each module's `CompleteModule` hardcodes its own `nextPath`. When you insert a module in the middle, update the previous one.
- **Onboarding gate.** `middleware.ts` + `enforceModule()` redirect paid-but-not-onboarded users to `/onboarding` regardless of the URL they hit.
