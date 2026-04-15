import { NextResponse } from "next/server";
import { getCurrentSession } from "../../lib/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Returns the current session's public fields so client components
 * (Header, Paywall shell, etc.) can render the right state. Because
 * the cookie is httpOnly, JS cannot read it directly; this endpoint
 * exposes only non-sensitive boolean flags.
 */
export async function GET() {
  const s = await getCurrentSession();
  if (!s) {
    return NextResponse.json({ authenticated: false });
  }
  return NextResponse.json({
    authenticated: true,
    email: s.sub,
    paid: s.paid,
    admin: s.admin,
  });
}
