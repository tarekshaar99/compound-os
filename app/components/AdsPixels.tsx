"use client";

import Script from "next/script";

/**
 * Loads conversion-tracking pixels for Meta (Facebook/Instagram), Google
 * Ads, and TikTok. Each is gated on its own NEXT_PUBLIC_* env var so the
 * site works fine if any platform isn't configured yet.
 *
 * What this component does:
 *   - Loads the platform pixel scripts (fbq, gtag, ttq)
 *   - Fires the initial PageView for each
 *   - Subsequent SPA route changes are handled by <PageViewTracker />
 *
 * What it does NOT do:
 *   - Conversion event firing (InitiateCheckout, Purchase) — those live
 *     in app/lib/ads-client.ts and are called from CheckoutButton +
 *     /success after /api/verify confirms.
 *
 * Server-side conversion mirroring (Meta CAPI, TikTok Events API) is in
 * app/lib/ads-server.ts and runs from the Stripe webhook.
 */
export default function AdsPixels() {
  const metaId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const tiktokId = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID;

  return (
    <>
      {/* Meta Pixel — loads fbq, fires initial PageView */}
      {metaId && (
        <>
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaId}');fbq('track','PageView');`}
          </Script>
          {/* noscript fallback — fires a tracking pixel even when JS is blocked */}
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${metaId}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        </>
      )}

      {/* Google Ads / Tag Manager — loads gtag, configures the Ads container */}
      {googleAdsId && (
        <>
          <Script
            id="google-tag-loader"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${googleAdsId}`}
          />
          <Script id="google-tag-config" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${googleAdsId}');`}
          </Script>
        </>
      )}

      {/* TikTok Pixel — loads ttq, fires initial page view */}
      {tiktokId && (
        <Script id="tiktok-pixel" strategy="afterInteractive">
          {`!function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"];ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};ttq.load('${tiktokId}');ttq.page();}(window,document,'ttq');`}
        </Script>
      )}
    </>
  );
}
