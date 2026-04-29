# Conversion Pixels — Meta + Google Ads + TikTok

Compound OS reports paid conversions to three ad platforms. Each is gated
on its own env vars, so you can configure one, two, or all three
independently. **No env = no script loaded = no events fired** — the site
works exactly the same with the pixels off.

---

## What gets reported

| Event | Fired by | Purpose |
|---|---|---|
| `PageView` | Pixel script on first load + on every SPA route change | Audience building, retargeting |
| `InitiateCheckout` (Meta + TikTok) / `begin_checkout` (Google) | Client when user clicks "Get Compound OS" | Funnel step, optimization signal |
| `Purchase` (Meta + Google) / `CompletePayment` (TikTok) | Client on `/success` + server from Stripe webhook | Conversion event, dedup'd by `event_id` |

Server-side mirroring (Meta CAPI + TikTok Events API) catches conversions
that client-side pixels miss because of iOS ATT, Safari ITP, and ad
blockers — typically recovers 20–40% of attributed conversions.

---

## Env vars to set in Vercel

Open **Vercel → your project → Settings → Environment Variables**. Add
each pair as `Production` + `Preview` scope:

### Meta (Facebook + Instagram)

```
NEXT_PUBLIC_META_PIXEL_ID    = 1234567890123456       # required for client pixel
META_CAPI_ACCESS_TOKEN       = EAAGm...                # required for server-side
```

**Where to get them:**
1. **Pixel ID:** Meta Business Suite → Events Manager → your pixel → "Pixel ID" (16 digits).
   - If you don't have one yet: Events Manager → "Connect Data Sources" → Web → create pixel.
2. **CAPI access token:** Same pixel page → Settings tab → "Generate Access Token". Treat like a secret. Server-side only.

### Google Ads

```
NEXT_PUBLIC_GOOGLE_ADS_ID         = AW-1234567890         # required for gtag
NEXT_PUBLIC_GOOGLE_PURCHASE_LABEL = AbCd-eFG-1234         # optional but recommended
```

**Where to get them:**
1. **Conversion ID:** Google Ads → Tools → Measurement → Conversions → your purchase conversion → "Tag setup" → "Use Google Tag Manager" → look for `'AW-XXXXXXXXXX'`.
   - If no conversion exists yet: create one as **Category: Purchase**, **Goal: Sales → Purchase**, **Conversion source: Website**, **Tracking method: gtag**.
2. **Conversion label:** Same screen, the string after the slash in `send_to: 'AW-XXXXXXXXXX/AbCd-eFG-1234'`.

Without the label, our gtag still fires `purchase` to GA4 but Google Ads
won't have the specific conversion to optimize against — it'll only see
the generic event. Set the label.

### TikTok

```
NEXT_PUBLIC_TIKTOK_PIXEL_ID = ABC123DEF456GHI789J            # required for client pixel
TIKTOK_EVENTS_API_TOKEN     = a1b2c3d4e5f6...                 # required for server-side
```

**Where to get them:**
1. **Pixel ID:** TikTok Ads Manager → Tools → Events → Web Events → your pixel → "Pixel ID" (alphanumeric, ~20 chars).
   - If no pixel: Events → "Set up Web Events" → Manual setup → name it.
2. **Events API access token:** Same pixel page → "Set up Events API" → "Manual setup" → "Generate Access Token". Server-side only.

---

## How to verify it's working

Once you've set the env vars and Vercel has redeployed:

### 1. Browser-side check (Meta)
- Install [Meta Pixel Helper](https://chromewebstore.google.com/detail/meta-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc) Chrome extension
- Open `thecompoundsystem.com` → it should detect your pixel + show "PageView"
- Click "Get Compound OS" → should see "InitiateCheckout"
- Complete a real test purchase ($49 → refund yourself in Stripe after) → on `/success` should see "Purchase" with `Event ID: <uuid>`
- Events Manager → "Test Events" tab → use the Test Event Code to verify both client + server fire and dedupe

### 2. Browser-side check (Google)
- Install [Google Tag Assistant](https://chromewebstore.google.com/detail/tag-assistant-companion/jmekfmbnaedfebfnmakmokmlfpblbfdm)
- Same flow as above. Look for `AW-XXXX` firing on each step
- Google Ads → Conversions → your purchase conversion → "Status" should flip from "No recent conversions" to "Recording conversions" within ~24h

### 3. Browser-side check (TikTok)
- Install [TikTok Pixel Helper](https://chromewebstore.google.com/detail/tiktok-pixel-helper/aelgobmabdmlfmiklcamdkedjpjdpjcg)
- Same flow. Look for `Pageview`, `InitiateCheckout`, `CompletePayment`
- TikTok Events Manager → Diagnostics tab → check Match Rate and any warnings

### 4. Server-side verification
- Vercel → Deployments → Functions → search logs for `[ads-server]`
- After a real test purchase, you should see:
  ```
  [ads-server] purchase fired event_id=<uuid> meta=true tiktok=true
  ```
- `false` for either platform means the API call failed — check Vercel logs above the line for the actual HTTP response

---

## Architecture in 60 seconds

```
                     User clicks Get Compound OS
                              │
                              ▼
                CheckoutButton mints eventId (UUID)
                              │
              ┌───────────────┴────────────────┐
              ▼                                ▼
   trackInitiateCheckout()           POST /api/checkout
   fires fbq + gtag + ttq            with { email, eventId }
                                            │
                                            ▼
                                    Stripe Checkout session
                                    metadata.eventId = <uuid>
                                            │
                                            ▼
                                    User pays on Stripe
                                            │
                ┌───────────────────────────┴──────────────────────┐
                ▼                                                  ▼
     Stripe redirects → /success                  Stripe webhook → /api/stripe/webhook
                │                                                  │
                ▼                                                  ▼
        POST /api/verify                          serverFirePurchase({ eventId })
        returns { eventId } from session.metadata           │
                │                                            ▼
                ▼                                Meta CAPI POST /events
       trackPurchase({ eventId })                TikTok Events API POST /event/track/
       fires fbq Purchase                                 │
       fires gtag purchase                                ▼
       fires ttq CompletePayment                  (server-side mirrors,
                │                                  hashed email, no PII leak)
                ▼
    Same eventId → Meta + TikTok dedupe both fires → counted once
```

---

## What's intentionally not server-side

- **Google Ads** — gtag client-side is sufficient for Ads optimization at
  this scale. Adding the offline-conversion-upload API or Measurement
  Protocol gains marginal accuracy for meaningful complexity. Revisit if
  Ads becomes the dominant channel and ATT-related underreporting
  becomes a real problem.
- **No user-IP forwarding from the webhook** — the IP the webhook sees
  is Stripe's, not the buyer's. Meta's match algorithm scores Stripe
  IP ranges against ad clicks anyway, so we save the round-trip and let
  Meta do its own browser-cookie-based matching from the client fire.

---

## Rollback

Comment out the `NEXT_PUBLIC_*` env vars in Vercel and redeploy. The
pixel scripts won't load and `track*` calls become silent no-ops. The
checkout flow itself is unaffected — `eventId` still travels through the
Stripe metadata, just nobody listens for it.
