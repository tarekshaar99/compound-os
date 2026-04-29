import { createHash } from "crypto";

/**
 * Server-side conversion mirroring for Meta CAPI + TikTok Events API.
 *
 * Why this exists separate from ads-client:
 *   - iOS 14.5+ App Tracking Transparency, Safari ITP, and ad blockers
 *     drop a meaningful fraction of client-side pixel events. Server-side
 *     events are sent directly from our backend to the platforms, which
 *     improves match rates and conversion attribution.
 *   - Meta + TikTok dedupe matched events from client + server when both
 *     carry the same event_id — so we fire on both sides with the same
 *     UUID and they only count once.
 *
 * Google Ads is intentionally client-only here — gtag in the browser is
 * sufficient for Ads optimization, and the offline-conversion-upload API
 * adds meaningful complexity for marginal gain at this scale. We can
 * upgrade to GA4 Measurement Protocol or Ads offline upload later.
 *
 * All functions are safe to call when env vars aren't set — they just
 * log a debug line and return false.
 */

function sha256Lower(input: string): string {
  return createHash("sha256")
    .update(input.trim().toLowerCase())
    .digest("hex");
}

interface ServerEventInput {
  /** Same UUID that was fired client-side. Used for cross-source dedupe. */
  eventId: string;
  /** Raw email; this module hashes it before sending. */
  email: string;
  /** USD value. Default 49. */
  value?: number;
  currency?: string;
  /** URL the conversion is attributed to. Default /success. */
  eventSourceUrl?: string;
  /** Forwarded from the request, used by Meta's match algorithm. */
  clientIp?: string | null;
  clientUserAgent?: string | null;
  /** Meta's _fbp / _fbc cookies (browser identifiers) if available. */
  fbp?: string | null;
  fbc?: string | null;
}

const META_GRAPH_API_VERSION = "v19.0";
const META_GRAPH_BASE = `https://graph.facebook.com/${META_GRAPH_API_VERSION}`;
const TIKTOK_EVENTS_ENDPOINT =
  "https://business-api.tiktok.com/open_api/v1.3/event/track/";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "") ||
  "https://thecompoundsystem.com";

/**
 * Posts a Purchase event to Meta CAPI. Returns true on 200, false on
 * config-missing or HTTP failure.
 */
async function fireMetaPurchase(input: ServerEventInput): Promise<boolean> {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
  if (!pixelId || !accessToken) {
    console.log("[ads-server] meta CAPI not configured — skipping");
    return false;
  }

  const url = `${META_GRAPH_BASE}/${pixelId}/events?access_token=${encodeURIComponent(
    accessToken
  )}`;

  const userData: Record<string, unknown> = {
    em: [sha256Lower(input.email)],
  };
  if (input.clientIp) userData.client_ip_address = input.clientIp;
  if (input.clientUserAgent) userData.client_user_agent = input.clientUserAgent;
  if (input.fbp) userData.fbp = input.fbp;
  if (input.fbc) userData.fbc = input.fbc;

  const body = {
    data: [
      {
        event_name: "Purchase",
        event_time: Math.floor(Date.now() / 1000),
        event_id: input.eventId,
        event_source_url: input.eventSourceUrl ?? `${SITE_URL}/success`,
        action_source: "website",
        user_data: userData,
        custom_data: {
          currency: input.currency ?? "USD",
          value: input.value ?? 49,
        },
      },
    ],
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error(`[ads-server] meta CAPI ${res.status}: ${text.slice(0, 200)}`);
      return false;
    }
    return true;
  } catch (err) {
    const msg = err instanceof Error ? err.message : "unknown";
    console.error("[ads-server] meta CAPI threw:", msg);
    return false;
  }
}

/**
 * Posts a CompletePayment event to TikTok Events API. Returns true on
 * 200, false on config-missing or HTTP failure.
 */
async function fireTikTokPurchase(input: ServerEventInput): Promise<boolean> {
  const pixelId = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID;
  const accessToken = process.env.TIKTOK_EVENTS_API_TOKEN;
  if (!pixelId || !accessToken) {
    console.log("[ads-server] tiktok events not configured — skipping");
    return false;
  }

  const body = {
    event_source: "web",
    event_source_id: pixelId,
    data: [
      {
        event: "CompletePayment",
        event_time: Math.floor(Date.now() / 1000),
        event_id: input.eventId,
        user: {
          email: sha256Lower(input.email),
          ...(input.clientIp ? { ip: input.clientIp } : {}),
          ...(input.clientUserAgent ? { user_agent: input.clientUserAgent } : {}),
        },
        page: {
          url: input.eventSourceUrl ?? `${SITE_URL}/success`,
        },
        properties: {
          currency: input.currency ?? "USD",
          value: input.value ?? 49,
          content_id: "compound-os",
          content_type: "product",
        },
      },
    ],
  };

  try {
    const res = await fetch(TIKTOK_EVENTS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Token": accessToken,
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error(`[ads-server] tiktok events ${res.status}: ${text.slice(0, 200)}`);
      return false;
    }
    // TikTok returns { code: 0, message: "OK" } on success even with 200
    const json = await res.json().catch(() => null);
    if (json && typeof json === "object" && "code" in json && (json as { code: number }).code !== 0) {
      console.error(`[ads-server] tiktok events api code=${(json as { code: number }).code} msg=${(json as { message?: string }).message ?? "n/a"}`);
      return false;
    }
    return true;
  } catch (err) {
    const msg = err instanceof Error ? err.message : "unknown";
    console.error("[ads-server] tiktok events threw:", msg);
    return false;
  }
}

/**
 * Fires a server-side Purchase to every configured platform. Called from
 * the Stripe webhook after grantAccess succeeds.
 *
 * Always returns — never throws — so a CAPI outage can't take down the
 * webhook (which would cause Stripe to retry and risk double-granting).
 */
export async function serverFirePurchase(input: ServerEventInput): Promise<{
  meta: boolean;
  tiktok: boolean;
}> {
  const [meta, tiktok] = await Promise.all([
    fireMetaPurchase(input).catch(() => false),
    fireTikTokPurchase(input).catch(() => false),
  ]);
  console.log(
    `[ads-server] purchase fired event_id=${input.eventId} meta=${meta} tiktok=${tiktok}`
  );
  return { meta, tiktok };
}
