/**
 * Client-side event tracker. Fire-and-forget - never awaited by UI.
 * Failures are silent.
 */
export function track(
  name: string,
  props?: Record<string, unknown>,
  email?: string | null
): void {
  if (typeof window === "undefined") return;
  try {
    // keepalive so events fire even as the tab unloads (e.g. on redirect to Stripe)
    fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, props: props ?? {}, email: email ?? null }),
      credentials: "same-origin",
      keepalive: true,
    }).catch(() => {});
  } catch {
    // ignore
  }
}
