import { siteConfig } from "@/config/site";
import { routing } from "@/i18n/routing";

import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routing.locales.map((locale) => {
    const path = locale === routing.defaultLocale ? "" : `/${locale}`;
    return {
      url: `${siteConfig.url}${path}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: locale === routing.defaultLocale ? 1 : 0.8,
      alternates: {
        languages: {
          en: `${siteConfig.url}/`,
          ar: `${siteConfig.url}/ar`,
        },
      },
    };
  });
}
