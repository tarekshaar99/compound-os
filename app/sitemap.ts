import type { MetadataRoute } from "next";

/**
 * Sitemap for search engines. Lists the public, indexable pages.
 *
 * Pillar index pages (/trading, /fitness, /mindset) are public:
 * middleware lets unauthenticated traffic through, and PillarIndex
 * renders an editorial preview (module list + paywall block) for
 * Googlebot and signed-out visitors. Their *sub-paths* — module pages
 * and library pages — remain gated and are NOT in the sitemap.
 *
 * Intentionally NOT in here:
 *   - /trading/m/*, /fitness/m/*, /mindset/m/* — module pages still
 *     307 to /login for unauth traffic. (May change in a future phase
 *     if we want module-level long-tail SEO.)
 *   - /trading/library, /fitness/library, /mindset/library — gated.
 *   - /login — no SEO value, just dilutes crawl budget.
 *   - /dashboard, /account, /reflections, /onboarding, /success — all
 *     gated or transactional, none should be indexed.
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
      url: `${SITE_URL}/trading`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/fitness`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/mindset`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
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
