import { notFound } from "next/navigation";

import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { JsonLd, breadcrumbJsonLd } from "@/components/seo/json-ld";
import { ContactPage } from "@/features/contact/contact-page";
import { routing } from "@/i18n/routing";
import { buildMetadata, resolveLocale } from "@/lib/page-metadata";

import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "contact" });
  return buildMetadata({
    locale,
    path: "/contact",
    title: t("title"),
    description: t("description"),
  });
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contact" });
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(locale, [{ name: t("title"), path: "/contact" }])} />
      <ContactPage />
    </>
  );
}
