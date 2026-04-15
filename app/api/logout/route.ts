import { NextResponse } from "next/server";
import { clearSessionCookie } from "../../lib/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Clears the cos_session cookie. Client separately calls Supabase signOut()
 * to also drop the Supabase session token from localStorage.
 */
export async function POST() {
  const res = NextResponse.json({ ok: true });
  clearSessionCookie(res);
  return res;
}
