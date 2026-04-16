import { NextRequest, NextResponse } from "next/server";
import { getCurrentSession } from "../../lib/session";
import { setOnboardingComplete } from "../../lib/progress-server";
import type { Pillar } from "../../lib/modules";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const VALID_PILLARS: readonly Pillar[] = ["trading", "fitness", "mindset"];

/**
 * POST /api/onboarding
 * Body: { priorityPillar: "trading" | "fitness" | "mindset" }
 *
 * Marks the user's onboarding complete and records their self-declared
 * priority pillar. After this, middleware stops forcing /onboarding.
 */
export async function POST(req: NextRequest) {
  const session = await getCurrentSession();
  if (!session || !(session.paid || session.admin)) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  let body: { priorityPillar?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }

  const pillar = body.priorityPillar as Pillar | undefined;
  if (!pillar || !VALID_PILLARS.includes(pillar)) {
    return NextResponse.json({ error: "bad_pillar" }, { status: 400 });
  }

  const ok = await setOnboardingComplete(session.sub, pillar);
  return NextResponse.json({ ok });
}
