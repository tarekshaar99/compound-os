import { redirect } from "next/navigation";
import { getCurrentSession } from "../../lib/session";
import { getCompleted, getUserMeta } from "../../lib/progress-server";
import { MODULES, getModule } from "../../lib/modules";
import { UnlockGate } from "./Interactive";

/**
 * Server component that enforces access rules for a lesson page:
 *
 *   1. Auth: middleware already blocked non-paid users, but we double-check.
 *   2. Onboarding: if the user never completed onboarding, send them there.
 *   3. Unlock: if the module is `advanced` and its prereqs aren't complete,
 *      render the <UnlockGate /> instead of the lesson content.
 *
 * Usage at the top of each lesson's page.tsx:
 *
 *   export default async function Page() {
 *     const gate = await enforceModule("trading.wheel-strategy");
 *     if (gate) return gate;          // shows lock screen
 *     return <LessonContent />;
 *   }
 */
export async function enforceModule(moduleId: string) {
  const session = await getCurrentSession();
  if (!session || !(session.paid || session.admin)) {
    redirect(`/login?return=/dashboard`);
  }
  const meta = await getUserMeta(session.sub);
  if (!meta.onboardingComplete) {
    redirect("/onboarding");
  }

  const mod = getModule(moduleId);
  if (!mod) {
    // Typo'd module - just bounce to dashboard rather than 500ing.
    redirect("/dashboard");
  }

  if (mod.tier === "advanced" && mod.unlockBy && mod.unlockBy.length > 0) {
    const completed = await getCompleted(session.sub);
    const missing = mod.unlockBy.filter((id) => !completed.has(id));
    if (missing.length > 0) {
      const titles = missing
        .map((id) => MODULES.find((m) => m.id === id)?.title ?? id);
      return (
        <UnlockGate
          requiredTitles={titles}
          pillarHref={`/${mod.pillar}`}
        />
      );
    }
  }
  // null = caller may render the lesson.
  return null;
}
