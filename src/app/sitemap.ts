import { siteConfig } from "@/config/site";
import { LEGAL_SLUGS } from "@/features/legal/legal-page";
import { INDUSTRIES } from "@/features/solutions/solution-page";
import { routing } from "@/i18n/routing";
import { localizedPath } from "@/lib/page-metadata";

import type { MetadataRoute } from "next";

const ROUTES: Array<{
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}> = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  ...INDUSTRIES.map((i) => ({
    path: `/solutions/${i}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
  })),
  { path: "/partners", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
  { path: "/signup", priority: 0.7, changeFrequency: "monthly" },
  { path: "/login", priority: 0.3, changeFrequency: "yearly" },
  ...LEGAL_SLUGS.map((s) => ({ path: `/${s}`, priority: 0.2, changeFrequency: "yearly" as const })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ROUTES.flatMap((r) =>
    routing.locales.map((locale) => ({
      url: `${siteConfig.url}${localizedPath(locale, r.path)}`,
      lastModified: now,
      changeFrequency: r.changeFrequency,
      priority: locale === routing.defaultLocale ? r.priority : Math.max(0.1, r.priority - 0.1),
      alternates: {
        languages: {
          en: `${siteConfig.url}${localizedPath("en", r.path)}`,
          ar: `${siteConfig.url}${localizedPath("ar", r.path)}`,
          "x-default": `${siteConfig.url}${localizedPath("en", r.path)}`,
        },
      },
    })),
  );
}
