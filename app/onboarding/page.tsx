import { redirect } from "next/navigation";
import { getCurrentSession } from "../lib/session";
import { getUserMeta } from "../lib/progress-server";
import OnboardingClient from "./OnboardingClient";

export const dynamic = "force-dynamic";

/**
 * Server component shell.
 * - Forces auth.
 * - If the user already finished onboarding once, skip straight to dashboard.
 *   Onboarding is a one-time first-login experience; we don't loop them back.
 */
export default async function OnboardingPage() {
  const session = await getCurrentSession();
  if (!session || !(session.paid || session.admin)) {
    redirect("/login?return=/onboarding");
  }
  const meta = await getUserMeta(session.sub);
  if (meta.onboardingComplete) {
    redirect("/dashboard");
  }
  return <OnboardingClient email={session.sub} />;
}
