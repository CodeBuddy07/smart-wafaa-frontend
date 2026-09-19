import { notFound } from "next/navigation";

import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import {
  JsonLd,
  faqJsonLd,
  organizationJsonLd,
  softwareJsonLd,
  websiteJsonLd,
} from "@/components/seo/json-ld";
import { PLAN_PRICES, type FaqItem, type Plan } from "@/features/landing/content";
import { LandingPage } from "@/features/landing/landing-page";
import { routing } from "@/i18n/routing";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const [tMeta, tPricing, tFaq] = await Promise.all([
    getTranslations({ locale, namespace: "meta" }),
    getTranslations({ locale, namespace: "pricing" }),
    getTranslations({ locale, namespace: "faq" }),
  ]);
  const plans = (tPricing.raw("plans") as Plan[]).map((p, i) => ({
    name: p.name,
    description: p.description,
    monthly: PLAN_PRICES[i]?.monthly ?? null,
  }));
  const faq = tFaq.raw("items") as FaqItem[];

  return (
    <>
      <JsonLd
        data={[
          organizationJsonLd(locale),
          websiteJsonLd(locale),
          softwareJsonLd(locale, plans, tMeta("description")),
          faqJsonLd(faq),
        ]}
      />
      <LandingPage />
    </>
  );
}
