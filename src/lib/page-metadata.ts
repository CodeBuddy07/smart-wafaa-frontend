import { hasLocale } from "next-intl";

import { siteConfig } from "@/config/site";
import { routing, type Locale } from "@/i18n/routing";

import type { Metadata } from "next";

/** Resolve a raw `[locale]` param to a supported locale (defaults to `en`). */
export function resolveLocale(raw: string): Locale {
  return hasLocale(routing.locales, raw) ? raw : routing.defaultLocale;
}

/** Locale-prefixed path for `localePrefix: "as-needed"` (English is unprefixed). */
export function localizedPath(locale: Locale, path: string): string {
  const clean = path === "/" ? "" : path;
  return locale === routing.defaultLocale ? clean || "/" : `/${locale}${clean}`;
}

interface PageMeta {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  /** Path (relative to /) of the OG image; defaults to the segment's generated image. */
  image?: string;
  noIndex?: boolean;
}

/** Canonical + hreflang + Open Graph/Twitter for any localised route. */
export function buildMetadata({
  locale,
  path,
  title,
  description,
  image,
  noIndex,
}: PageMeta): Metadata {
  const canonical = localizedPath(locale, path);
  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: localizedPath("en", path),
        ar: localizedPath("ar", path),
        "x-default": localizedPath("en", path),
      },
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title,
      description,
      url: canonical,
      locale: locale === "ar" ? "ar_SA" : "en_US",
      alternateLocale: locale === "ar" ? "en_US" : "ar_SA",
      ...(image ? { images: [{ url: image, width: 1200, height: 630, alt: title }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}
