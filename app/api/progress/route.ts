import { NextRequest, NextResponse } from "next/server";
import { getCurrentSession } from "../../lib/session";
import {
  getCompleted,
  getProgressRows,
  getUserMeta,
  markComplete,
  unmarkComplete,
  bumpLastActive,
} from "../../lib/progress-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/progress
 * Returns the caller's completed module set + meta (onboarding, priority, last active).
 * Paid-only (mirrors /dashboard gate).
 */
export async function GET() {
  const session = await getCurrentSession();
  if (!session || !(session.paid || session.admin)) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  const email = session.sub;
  const [completed, meta, rows] = await Promise.all([
    getCompleted(email),
    getUserMeta(email),
    getProgressRows(email),
  ]);
  return NextResponse.json({
    authenticated: true,
    completed: Array.from(completed),
    rows,
    onboardingComplete: meta.onboardingComplete,
    priorityPillar: meta.priorityPillar,
    lastActiveModule: meta.lastActiveModule,
  });
}

/**
 * POST /api/progress
 * Body:
 *   { action: "complete", moduleId, data?: object }
 *   { action: "uncomplete", moduleId }
 *   { action: "visit", moduleId }   // just bump last_active_module
 */
export async function POST(req: NextRequest) {
  const session = await getCurrentSession();
  if (!session || !(session.paid || session.admin)) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  const email = session.sub;

  let body: { action?: string; moduleId?: string; data?: Record<string, unknown> };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }

  const moduleId = typeof body.moduleId === "string" ? body.moduleId : "";
  if (!moduleId) {
    return NextResponse.json({ error: "missing_module" }, { status: 400 });
  }

  switch (body.action) {
    case "complete": {
      const ok = await markComplete(email, moduleId, body.data ?? {});
      return NextResponse.json({ ok });
    }
    case "uncomplete": {
      const ok = await unmarkComplete(email, moduleId);
      return NextResponse.json({ ok });
    }
    case "visit": {
      await bumpLastActive(email, moduleId);
      return NextResponse.json({ ok: true });
    }
    default:
      return NextResponse.json({ error: "bad_action" }, { status: 400 });
  }
}
