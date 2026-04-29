import type { MetadataRoute } from "next";

/**
 * Sitemap for search engines. Lists ONLY the public, indexable pages.
 *
 * What's intentionally NOT in here:
 *   - Pillar indexes (/trading, /fitness, /mindset) — middleware 307s
 *     unauthenticated traffic to /login, which Google reports as
 *     "Page with redirect" in Search Console and removes from the index.
 *   - Module pages (/trading/m/*, /fitness/m/*, /mindset/m/*) — same
 *     reason. Listing them creates 21 "redirected" entries that dilute
 *     crawl budget and look like duplicate-content noise.
 *   - /login — no SEO value, just dilutes crawl budget.
 *   - /dashboard, /account, /reflections, /onboarding, /success — all
 *     gated or transactional, none should be indexed.
 *
 * If we ever want module URLs to be indexable, the path is to render an
 * unauthenticated preview at each module URL (first lesson section +
 * <Paywall> block) instead of redirecting. Until then, paywalled paths
 * stay out of the sitemap.
 */

const SITE_URL = "https://thecompoundsystem.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/refund`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
