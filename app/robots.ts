import type { MetadataRoute } from "next";

/**
 * robots.txt — lets the public marketing pages be crawled while keeping
 * authenticated areas, API endpoints, and auth flows out of the index.
 */

const SITE_URL = "https://thecompoundsystem.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/dashboard",
          "/account",
          "/reflections",
          "/onboarding",
          "/success",
          "/auth/",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
