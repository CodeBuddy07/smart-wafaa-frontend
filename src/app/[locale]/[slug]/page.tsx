import { notFound } from "next/navigation";

import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { LegalPage, LEGAL_SLUGS, type LegalSlug } from "@/features/legal/legal-page";
import { routing } from "@/i18n/routing";

import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

const isLegalSlug = (slug: string): slug is LegalSlug =>
  (LEGAL_SLUGS as readonly string[]).includes(slug);

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => LEGAL_SLUGS.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  if (!isLegalSlug(slug)) return {};
  const locale = hasLocale(routing.locales, raw) ? raw : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "legal" });
  return { title: t(`pages.${slug}.title`), robots: { index: true, follow: true } };
}

/** `/terms`, `/privacy`, `/refunds` (and `/ar/…`) — statically generated legal pages. */
export default async function LegalRoute({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale) || !isLegalSlug(slug)) notFound();
  setRequestLocale(locale);
  return <LegalPage slug={slug} />;
}
