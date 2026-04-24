import type { MetadataRoute } from "next";
import { MODULES } from "./lib/modules";

/**
 * Sitemap for search engines. Lists the public, indexable pages.
 *
 * Gated module pages (/trading/m/*, /fitness/m/*, /mindset/m/*) and
 * authenticated routes (/dashboard, /account, /reflections, /onboarding)
 * are intentionally excluded: they require a paid session, so indexing
 * them would just produce broken previews for search traffic.
 *
 * The module paths are listed so the crawler knows they exist (useful for
 * internal link discovery), but they'll 302 to /login for anonymous hits.
 */

const SITE_URL = "https://thecompoundsystem.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
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
    {
      url: `${SITE_URL}/login`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Pillar index pages (public previews that redirect to login when gated).
  const pillarRoutes: MetadataRoute.Sitemap = ["/trading", "/fitness", "/mindset"].map(
    (path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    }),
  );

  // Module pages — included for discoverability even though they gate to paid.
  const moduleRoutes: MetadataRoute.Sitemap = MODULES.map((m) => ({
    url: `${SITE_URL}${m.path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...pillarRoutes, ...moduleRoutes];
}
