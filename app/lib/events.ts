import { getServiceSupabase } from "./supabase";

/**
 * Lightweight event tracking. Writes to public.events (see schema below).
 *
 * Required table (run once in Supabase SQL editor):
 *
 *   create table if not exists public.events (
 *     id           bigint generated always as identity primary key,
 *     name         text not null,
 *     email        text,           -- optional actor
 *     props        jsonb not null default '{}'::jsonb,
 *     user_agent   text,
 *     ip           text,
 *     created_at   timestamptz not null default now()
 *   );
 *   create index if not exists events_name_created_at_idx
 *     on public.events (name, created_at desc);
 *   alter table public.events enable row level security;
 *   alter table public.events force row level security;
 *   -- Only service_role writes/reads. No public policies.
 *
 * All event writes are best-effort: failures are swallowed with a log
 * line so analytics never breaks business logic.
 */

export interface TrackArgs {
  name: string;
  email?: string | null;
  props?: Record<string, unknown>;
  userAgent?: string | null;
  ip?: string | null;
}

export async function trackEvent(args: TrackArgs): Promise<void> {
  try {
    const svc = getServiceSupabase();
    const { error } = await svc.from("events").insert({
      name: args.name,
      email: args.email?.trim().toLowerCase() ?? null,
      props: args.props ?? {},
      user_agent: args.userAgent ?? null,
      ip: args.ip ?? null,
    });
    if (error) {
      // Most common case: table doesn't exist yet (user hasn't run the SQL).
      // Don't spam logs - one line at warn level is enough.
      console.warn(`[events] insert failed (${args.name}): ${error.message}`);
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : "unknown";
    console.warn(`[events] threw (${args.name}): ${msg}`);
  }
}
