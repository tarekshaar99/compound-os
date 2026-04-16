/**
 * Server-side progress store. Backed by Supabase so progress persists across
 * devices — this is a paid product, localStorage would be a bad promise.
 *
 * The legacy client-side progress.ts still exists for backwards-compat on
 * the old long-form pillar pages. New modules should use this.
 */

import { getServiceSupabase } from "./supabase";
import { MODULES, Pillar } from "./modules";

export interface ProgressRow {
  module_id: string;
  completed_at: string;
  completion_data: Record<string, unknown>;
}

/** Pull the set of completed module ids for a user. Returns empty set on any
 *  error — progress tracking should never break the app. */
export async function getCompleted(email: string): Promise<Set<string>> {
  try {
    const svc = getServiceSupabase();
    const { data, error } = await svc
      .from("user_progress")
      .select("module_id")
      .eq("user_email", email);
    if (error) throw error;
    return new Set((data ?? []).map((r) => r.module_id));
  } catch (err) {
    console.warn("[progress] getCompleted failed:", err);
    return new Set();
  }
}

export async function getProgressRows(email: string): Promise<ProgressRow[]> {
  try {
    const svc = getServiceSupabase();
    const { data, error } = await svc
      .from("user_progress")
      .select("module_id, completed_at, completion_data")
      .eq("user_email", email)
      .order("completed_at", { ascending: false });
    if (error) throw error;
    return (data ?? []) as ProgressRow[];
  } catch (err) {
    console.warn("[progress] getProgressRows failed:", err);
    return [];
  }
}

/** Mark a module complete. Upsert so re-completing is idempotent. */
export async function markComplete(
  email: string,
  moduleId: string,
  completionData: Record<string, unknown> = {}
): Promise<boolean> {
  // Sanity: the module must actually exist. Stops typos from poisoning the
  // progress table with phantom ids.
  const known = MODULES.find((m) => m.id === moduleId);
  if (!known) {
    console.warn("[progress] refusing to mark unknown module:", moduleId);
    return false;
  }
  try {
    const svc = getServiceSupabase();
    const { error } = await svc
      .from("user_progress")
      .upsert(
        {
          user_email: email,
          module_id: moduleId,
          completion_data: completionData,
        },
        { onConflict: "user_email,module_id" }
      );
    if (error) throw error;
    // Also bump the user's last_active_module so dashboard can show "Continue".
    await svc
      .from("users")
      .update({ last_active_module: moduleId })
      .eq("email", email);
    return true;
  } catch (err) {
    console.warn("[progress] markComplete failed:", err);
    return false;
  }
}

/** Remove a completion — used if the user wants to retake a module. */
export async function unmarkComplete(
  email: string,
  moduleId: string
): Promise<boolean> {
  try {
    const svc = getServiceSupabase();
    const { error } = await svc
      .from("user_progress")
      .delete()
      .eq("user_email", email)
      .eq("module_id", moduleId);
    if (error) throw error;
    return true;
  } catch (err) {
    console.warn("[progress] unmarkComplete failed:", err);
    return false;
  }
}

export async function bumpLastActive(
  email: string,
  moduleId: string
): Promise<void> {
  try {
    const svc = getServiceSupabase();
    await svc
      .from("users")
      .update({ last_active_module: moduleId })
      .eq("email", email);
  } catch {
    // Silent — this is a convenience field, never block on it.
  }
}

export async function getUserMeta(email: string): Promise<{
  onboardingComplete: boolean;
  priorityPillar: Pillar | null;
  lastActiveModule: string | null;
}> {
  try {
    const svc = getServiceSupabase();
    const { data } = await svc
      .from("users")
      .select("onboarding_complete, priority_pillar, last_active_module")
      .eq("email", email)
      .maybeSingle();
    return {
      onboardingComplete: !!data?.onboarding_complete,
      priorityPillar: (data?.priority_pillar ?? null) as Pillar | null,
      lastActiveModule: (data?.last_active_module ?? null) as string | null,
    };
  } catch (err) {
    console.warn("[progress] getUserMeta failed:", err);
    return {
      onboardingComplete: false,
      priorityPillar: null,
      lastActiveModule: null,
    };
  }
}

export async function setOnboardingComplete(
  email: string,
  priorityPillar: Pillar
): Promise<boolean> {
  try {
    const svc = getServiceSupabase();
    const { error } = await svc
      .from("users")
      .update({
        onboarding_complete: true,
        priority_pillar: priorityPillar,
      })
      .eq("email", email);
    if (error) throw error;
    return true;
  } catch (err) {
    console.warn("[progress] setOnboardingComplete failed:", err);
    return false;
  }
}
