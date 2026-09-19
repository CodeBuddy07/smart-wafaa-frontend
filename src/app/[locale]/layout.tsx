import { notFound } from "next/navigation";

import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SkipLink } from "@/components/layout/skip-link";
import { LiquidGlassDefs } from "@/components/motion/liquid-glass-defs";
import { Providers } from "@/components/motion/providers";
import { siteConfig } from "@/config/site";
import { localeDirection, routing, type Locale } from "@/i18n/routing";
import { fontVariables } from "@/lib/fonts";

import type { Metadata, Viewport } from "next";

import "../globals.css";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: Omit<LocaleLayoutProps, "children">): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = hasLocale(routing.locales, raw) ? raw : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "meta" });
  const path = locale === routing.defaultLocale ? "" : `/${locale}`;

  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: t("title"), template: t("titleTemplate") },
    description: t("description"),
    keywords: t("keywords")
      .split(",")
      .map((k) => k.trim()),
    applicationName: siteConfig.name,
    alternates: {
      canonical: path || "/",
      languages: { en: "/", ar: "/ar", "x-default": "/" },
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title: t("title"),
      description: t("description"),
      url: path || "/",
      locale: locale === "ar" ? "ar_SA" : "en_US",
    },
    twitter: { card: "summary_large_image", title: t("title"), description: t("description") },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  themeColor: "#0F4C3A",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const dir = localeDirection[locale];

  return (
    <html lang={locale} dir={dir} className={fontVariables} suppressHydrationWarning>
      <body className="relative flex min-h-dvh flex-col">
        <NextIntlClientProvider>
          <Providers>
            <LiquidGlassDefs />
            <SkipLink />
            <SiteHeader />
            <main id="content" className="flex-1">
              {children}
            </main>
            <SiteFooter />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
