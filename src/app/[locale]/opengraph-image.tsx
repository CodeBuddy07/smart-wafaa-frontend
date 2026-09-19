import { getTranslations } from "next-intl/server";

import { OG_SIZE, OgFrame, renderOg } from "@/lib/og";
import { resolveLocale } from "@/lib/page-metadata";

export const alt = "Smart Wafaa — Native Wallet Loyalty Engine";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const locale = resolveLocale((await params).locale);
  const [t, tHero] = await Promise.all([
    getTranslations({ locale, namespace: "meta" }),
    getTranslations({ locale, namespace: "hero" }),
  ]);
  const title = tHero("title");
  const eyebrow = tHero("eyebrow");
  const subtitle = `${t("description").split(".")[0] ?? ""}.`;

  return renderOg(<OgFrame locale={locale} eyebrow={eyebrow} title={title} subtitle={subtitle} />, {
    locale,
    text: `${title}${eyebrow}${subtitle}`,
  });
}
