import { getTranslations } from "next-intl/server";

import { siteConfig } from "@/config/site";
import { INDUSTRIES, type Industry } from "@/features/solutions/solution-page";
import { OG_SIZE, OgFrame, renderOg } from "@/lib/og";
import { resolveLocale } from "@/lib/page-metadata";

export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; industry: string }>;
}) {
  const { locale: raw, industry: rawIndustry } = await params;
  const locale = resolveLocale(raw);
  const industry = (
    (INDUSTRIES as readonly string[]).includes(rawIndustry) ? rawIndustry : "cafes"
  ) as Industry;
  const t = await getTranslations({ locale, namespace: "solutions" });
  const eyebrow = t(`industries.${industry}.name`);
  const title = t(`industries.${industry}.title`);

  return renderOg(
    <OgFrame
      locale={locale}
      eyebrow={eyebrow}
      title={title}
      photo={`${siteConfig.url}/images/solutions/${industry}-og.jpg`}
    />,
    { locale, text: `${title}${eyebrow}` },
  );
}
