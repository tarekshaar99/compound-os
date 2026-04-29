"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * Fires a fresh PageView event on every Next.js client-side route change.
 *
 * The pixel loaders in <AdsPixels /> fire the *initial* PageView when the
 * page first loads, but Next's App Router uses client-side navigation —
 * subsequent route changes don't reload the page, so the pixels never see
 * them unless we tell them. This component listens to the pathname +
 * search params and re-fires.
 */
export default function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const url =
      pathname +
      (searchParams && searchParams.toString()
        ? `?${searchParams.toString()}`
        : "");

    // Meta — re-fire PageView with the current path so attribution windows
    // update correctly on SPA navigations.
    if (typeof window.fbq === "function") {
      window.fbq("track", "PageView");
    }

    // Google Ads — gtag config call updates the page_path under the same
    // measurement ID. Re-firing triggers a virtual pageview the way GA
    // expects.
    if (typeof window.gtag === "function") {
      const id = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
      if (id) {
        window.gtag("config", id, { page_path: url });
      }
    }

    // TikTok — ttq.page() emits a Pageview event in TikTok's format.
    if (window.ttq && typeof window.ttq.page === "function") {
      window.ttq.page();
    }
  }, [pathname, searchParams]);

  return null;
}
