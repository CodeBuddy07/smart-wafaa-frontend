import { notFound } from "next/navigation";

import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { JsonLd, breadcrumbJsonLd, serviceJsonLd } from "@/components/seo/json-ld";
import { INDUSTRIES, SolutionPage, type Industry } from "@/features/solutions/solution-page";
import { routing } from "@/i18n/routing";
import { buildMetadata, resolveLocale } from "@/lib/page-metadata";

import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ locale: string; industry: string }>;
}

const isIndustry = (s: string): s is Industry => (INDUSTRIES as readonly string[]).includes(s);

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => INDUSTRIES.map((industry) => ({ locale, industry })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw, industry } = await params;
  if (!isIndustry(industry)) return {};
  const locale = resolveLocale(raw);
  const t = await getTranslations({ locale, namespace: "solutions" });
  return buildMetadata({
    locale,
    path: `/solutions/${industry}`,
    title: `${t(`industries.${industry}.name`)} — ${t(`industries.${industry}.title`)}`,
    description: t(`industries.${industry}.description`),
    image: `/images/solutions/${industry}.webp`,
  });
}

export default async function SolutionRoute({ params }: PageProps) {
  const { locale, industry } = await params;
  if (!hasLocale(routing.locales, locale) || !isIndustry(industry)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "solutions" });
  const name = t(`industries.${industry}.name`);
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(locale, [
            { name: t("eyebrow"), path: "/#features" },
            { name, path: `/solutions/${industry}` },
          ]),
          serviceJsonLd(locale, {
            name,
            description: t(`industries.${industry}.description`),
            path: `/solutions/${industry}`,
          }),
        ]}
      />
      <SolutionPage industry={industry} />
    </>
  );
}
