import { ArrowRight, ChartNoAxesCombined, Nfc, Tags } from "lucide-react";
import { useTranslations } from "next-intl";

import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Card, Container, IconTile } from "@/components/ui";
import { sectionIds } from "@/config/site";
import { SectionHeading } from "@/features/landing/components/section-heading";
import type { FeatureItem } from "@/features/landing/content";
import { cn } from "@/lib/utils";

const META = [
  { Icon: Tags, tone: "brand", link: "text-brand-800" },
  { Icon: Nfc, tone: "gold", link: "text-accent-amber" },
  { Icon: ChartNoAxesCombined, tone: "purple", link: "text-accent-purple" },
] as const;

export function Features() {
  const t = useTranslations("features");
  const items = t.raw("items") as FeatureItem[];

  return (
    <section id={sectionIds.features} className="aurora-soft scroll-mt-28 py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />

        <Stagger className="mt-14 grid gap-6 md:grid-cols-3" gap={0.12}>
          {items.map((item, i) => {
            const meta = META[i] ?? META[0];
            return (
              <StaggerItem key={item.title} className="h-full">
                <Card interactive padding="none" className="group flex h-full flex-col p-6 sm:p-7">
                  <IconTile
                    tone={meta.tone}
                    size="lg"
                    className="transition-transform duration-500 ease-out-expo group-hover:scale-105 group-hover:-rotate-6"
                  >
                    <meta.Icon />
                  </IconTile>
                  <h3 className="mt-7 font-display text-[19px] font-bold text-ink-900">
                    {item.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-ink-600">
                    {item.description}
                  </p>
                  <a
                    href="#"
                    className={cn(
                      "mt-6 inline-flex items-center gap-1.5 font-sans text-[12.5px] font-bold",
                      meta.link,
                    )}
                  >
                    {item.link}
                    <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
                  </a>
                </Card>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}
