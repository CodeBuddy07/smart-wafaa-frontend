import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { Reveal } from "@/components/motion/reveal";
import { Badge, Button, Container } from "@/components/ui";
import { sectionIds, siteConfig } from "@/config/site";
import { Link } from "@/i18n/navigation";

export function CtaBanner() {
  const t = useTranslations("cta");

  return (
    <section id={sectionIds.cta} className="scroll-mt-28 bg-white py-20 sm:py-24">
      <Container size="wide">
        <Reveal distance={48} duration={1}>
          <div className="dark-forest-bg noise relative overflow-hidden rounded-[32px] px-6 py-20 text-center text-white shadow-[0_50px_100px_-40px_rgb(6_78_59/0.7)] sm:px-12 sm:py-24">
            <div aria-hidden className="noise-after" />
            {/* slow-rotating light sweep */}
            <div
              aria-hidden
              className="motion-ok:animate-spin-slow pointer-events-none absolute -inset-[40%] opacity-40"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent 0deg, rgb(74 222 128 / 0.25) 60deg, transparent 120deg, transparent 240deg, rgb(212 175 55 / 0.18) 300deg, transparent 360deg)",
              }}
            />

            <div className="relative mx-auto flex max-w-[720px] flex-col items-center">
              <Badge tone="goldOnDark">{t("eyebrow")}</Badge>
              <h2 className="mt-5 text-display-sm font-extrabold text-white sm:text-display-md lg:text-display-lg">
                {t("title")}
              </h2>
              <p className="mt-5 max-w-[560px] text-[16px] leading-relaxed text-brand-50/80 sm:text-[17px]">
                {t("description")}
              </p>

              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <Button asChild variant="gold" size="lg" className="ps-7 pe-1.5">
                  <Link href={siteConfig.links.signup}>
                    {t("primary")}
                    <span className="ms-3 inline-flex size-10 items-center justify-center rounded-full bg-gold-400 text-brand-950 shadow transition-transform duration-300 group-hover/button:rotate-45 rtl:-scale-x-100 rtl:group-hover/button:-rotate-45">
                      <ArrowUpRight className="size-4" />
                    </span>
                  </Link>
                </Button>
                <Button asChild variant="ghostOnDark" size="lg">
                  <a href={siteConfig.links.contact}>{t("secondary")}</a>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
