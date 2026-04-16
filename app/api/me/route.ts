import { NextResponse } from "next/server";
import { getCurrentSession } from "../../lib/session";
import { getUserMeta } from "../../lib/progress-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Returns the current session's public fields so client components
 * (Header, Paywall shell, etc.) can render the right state. Because
 * the cookie is httpOnly, JS cannot read it directly; this endpoint
 * exposes only non-sensitive boolean flags + onboarding state.
 */
export async function GET() {
  const s = await getCurrentSession();
  if (!s) {
    return NextResponse.json({ authenticated: false });
  }
  // Only fetch meta for paid/admin — unauthed callers shouldn't cost a DB hit.
  let onboardingComplete = false;
  let priorityPillar: string | null = null;
  let lastActiveModule: string | null = null;
  if (s.paid || s.admin) {
    const meta = await getUserMeta(s.sub);
    onboardingComplete = meta.onboardingComplete;
    priorityPillar = meta.priorityPillar;
    lastActiveModule = meta.lastActiveModule;
  }
  return NextResponse.json({
    authenticated: true,
    email: s.sub,
    paid: s.paid,
    admin: s.admin,
    onboardingComplete,
    priorityPillar,
    lastActiveModule,
  });
}
