import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import * as Sentry from "@sentry/nextjs";
import { getServiceSupabase } from "../../../lib/supabase";
import { signSession, setSessionCookie } from "../../../lib/session";
import { rateLimit } from "../../../lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Called by the client after a successful Supabase OTP sign-in.
 *
 * Flow:
 *   1. Client sends its Supabase `access_token` in the Authorization header.
 *   2. We verify that token against Supabase's auth server (so no client can
 *      claim any email they want - we need a real Supabase session).
 *   3. If valid, we look up public.users by the authenticated email.
 *   4. If paid || admin, mint the cos_session cookie and return 200.
 *      Otherwise return 402 Payment Required - middleware will redirect.
 *
 * This is how a user on a NEW device gets access after signing in via email
 * OTP. No payment is required at this step; the user must have already paid
 * on some other device (webhook created the row).
 */
export async function POST(req: NextRequest) {
  // Rate-limit session-sync attempts. Legitimate flow is one call per
  // OAuth/OTP success — bursts of 20+/min from the same IP indicate
  // bearer-token brute-force or scraping. 20/min stays loose enough for
  // dev hot-reload + parallel tabs.
  const limit = rateLimit(req, {
    prefix: "session-sync",
    max: 20,
    windowMs: 60_000,
  });
  if (!limit.ok) return limit.response;

  try {
    const authHeader = req.headers.get("authorization") ?? "";
    // Cap header length so a multi-MB bearer string can't OOM the parser.
    if (authHeader.length > 4096) {
      return NextResponse.json(
        { error: "auth_header_too_large" },
        { status: 400 }
      );
    }
    const match = authHeader.match(/^Bearer (.+)$/i);
    if (!match) {
      return NextResponse.json({ error: "missing_bearer" }, { status: 401 });
    }
    const accessToken = match[1];

    // Verify the access token against Supabase using the anon key - Supabase
    // will reject invalid/expired tokens. We don't trust anything the client
    // puts in the body.
    const anonUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!anonUrl || !anonKey) {
      throw new Error("Supabase anon env not set");
    }

    const anon = createClient(anonUrl, anonKey, {
      auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
      global: { headers: { Authorization: `Bearer ${accessToken}` } },
    });

    const { data: userResp, error: userErr } = await anon.auth.getUser(accessToken);
    if (userErr || !userResp?.user?.email) {
      return NextResponse.json({ error: "invalid_token" }, { status: 401 });
    }

    const email = userResp.user.email.trim().toLowerCase();

    // Look up paid/admin flags via service role (bypasses RLS).
    const svc = getServiceSupabase();
    const { data: row } = await svc
      .from("users")
      .select("email, paid, admin")
      .eq("email", email)
      .maybeSingle();

    const paid = row?.paid === true;
    const admin = row?.admin === true;

    if (!paid && !admin) {
      // User signed in, but has no paid/admin record. Do NOT mint a cookie.
      return NextResponse.json({ error: "no_access", email }, { status: 402 });
    }

    const jwt = await signSession({ sub: email, paid, admin });
    const res = NextResponse.json({ ok: true, email, paid, admin });
    setSessionCookie(res, jwt);
    return res;
  } catch (err) {
    const msg = err instanceof Error ? err.message : "unknown";
    console.error("[session/sync] failed:", msg);
    // Session sync failures = user signed in but can't reach the product.
    // Paid customers hitting this are a support fire - capture with context.
    Sentry.captureException(err, {
      tags: { area: "session-sync" },
    });
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
