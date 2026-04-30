import { NextRequest, NextResponse } from "next/server";
import { getCurrentSession } from "../../lib/session";
import { setOnboardingComplete } from "../../lib/progress-server";
import { rateLimit } from "../../lib/rate-limit";
import { parseJsonBody, validEnum } from "../../lib/validate";
import type { Pillar } from "../../lib/modules";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const VALID_PILLARS = ["trading", "fitness", "mindset"] as const satisfies readonly Pillar[];

/**
 * POST /api/onboarding
 * Body: { priorityPillar: "trading" | "fitness" | "mindset" }
 *
 * Marks the user's onboarding complete and records their self-declared
 * priority pillar. After this, middleware stops forcing /onboarding.
 *
 * Hardening: requires auth (paid OR admin); rate-limited per session
 * (5/min) to prevent a logged-in attacker from flipping the flag in
 * a tight loop; body capped at 1KB; pillar validated against enum.
 */
export async function POST(req: NextRequest) {
  const session = await getCurrentSession();
  if (!session || !(session.paid || session.admin)) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  // Per-session rate limit (uses email as the discriminator since IP
  // alone would over-throttle behind shared NATs).
  const limit = rateLimit(req, {
    prefix: "onboarding",
    extra: session.sub,
    max: 5,
    windowMs: 60_000,
  });
  if (!limit.ok) return limit.response;

  const parsed = await parseJsonBody<{ priorityPillar?: unknown }>(req, {
    maxBytes: 1024,
  });
  if (!parsed.ok) return parsed.response;

  const pillar = validEnum(parsed.body.priorityPillar, VALID_PILLARS);
  if (!pillar) {
    return NextResponse.json({ error: "bad_pillar" }, { status: 400 });
  }

  const ok = await setOnboardingComplete(session.sub, pillar);
  return NextResponse.json({ ok });
}
