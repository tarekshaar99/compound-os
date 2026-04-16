import { redirect } from "next/navigation";
import { getCurrentSession } from "../lib/session";
import { getCompleted, getUserMeta } from "../lib/progress-server";
import {
  MODULES,
  Pillar,
  computeUnlocked,
  getModule,
  getPillarModules,
  pillarStats,
  recommendNext,
} from "../lib/modules";
import Header from "../components/Header";
import DashboardInner from "./DashboardInner";

export const dynamic = "force-dynamic";

/**
 * Dashboard - the member home. Server-rendered so the first paint already
 * has the right state. No flicker between "are you paid?" and "here's your progress."
 *
 * Routing rules enforced here:
 *   - Unauthed → /login (middleware already catches this, but belt & suspenders)
 *   - Paid + !onboarding_complete → /onboarding
 */
export default async function DashboardPage() {
  const session = await getCurrentSession();
  if (!session || !(session.paid || session.admin)) {
    redirect("/login?return=/dashboard");
  }
  const email = session.sub;

  const [completedSet, meta] = await Promise.all([
    getCompleted(email),
    getUserMeta(email),
  ]);

  if (!meta.onboardingComplete) {
    redirect("/onboarding");
  }

  // Precompute everything the client component needs.
  const unlocked = computeUnlocked(completedSet);
  const next = recommendNext(completedSet, meta.priorityPillar);
  const lastModule = meta.lastActiveModule ? getModule(meta.lastActiveModule) : null;
  const pillars: Pillar[] = ["trading", "fitness", "mindset"];
  const pillarBreakdown = pillars.map((p) => ({
    pillar: p,
    stats: pillarStats(p, completedSet),
    modules: getPillarModules(p).map((m) => ({
      id: m.id,
      title: m.title,
      tier: m.tier,
      completed: completedSet.has(m.id),
      locked: !unlocked.has(m.id),
      path: m.path,
    })),
  }));

  // "Today's priority": next recommended module, or a gentle check-in if
  // everything is complete.
  const firstName = email.split("@")[0].split(/[._-]/)[0];
  const displayName = firstName
    ? firstName.charAt(0).toUpperCase() + firstName.slice(1)
    : null;

  const totalModules = MODULES.length;
  const totalCompleted = completedSet.size;

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Header />
      <DashboardInner
        displayName={displayName}
        priorityPillar={meta.priorityPillar}
        lastModule={
          lastModule
            ? {
                id: lastModule.id,
                title: lastModule.title,
                pillar: lastModule.pillar,
                path: lastModule.path,
              }
            : null
        }
        nextModule={
          next
            ? {
                id: next.id,
                title: next.title,
                blurb: next.blurb,
                pillar: next.pillar,
                path: next.path,
                estMinutes: next.estMinutes,
              }
            : null
        }
        pillarBreakdown={pillarBreakdown}
        totalCompleted={totalCompleted}
        totalModules={totalModules}
      />
    </div>
  );
}
