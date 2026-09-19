import {
  Award,
  BadgePercent,
  CreditCard,
  HandCoins,
  Receipt,
  RefreshCw,
  Stamp,
  Star,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Badge, Card, Container } from "@/components/ui";
import { sectionIds } from "@/config/site";
import { SectionHeading } from "@/features/landing/components/section-heading";
import type { ComboItem, FormatItem } from "@/features/landing/content";

const META = [
  { Icon: Stamp, tone: "brand" },
  { Icon: RefreshCw, tone: "neutral" },
  { Icon: CreditCard, tone: "purple" },
  { Icon: Receipt, tone: "neutral" },
  { Icon: HandCoins, tone: "gold" },
  { Icon: Award, tone: "brand" },
  { Icon: BadgePercent, tone: "neutral" },
  { Icon: Star, tone: "gold" },
] as const;

export function RewardFormats() {
  const t = useTranslations("formats");
  const items = t.raw("items") as FormatItem[];
  const combos = t.raw("grouped.combos") as ComboItem[];

  return (
    <section id={sectionIds.formats} className="scroll-mt-28 bg-white py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />

        <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" gap={0.06}>
          {items.map((item, i) => {
            const meta = META[i] ?? META[0];
            return (
              <StaggerItem key={item.title} className="h-full" distance={20}>
                <Card interactive variant="flat" padding="none" className="group h-full p-5">
                  <div className="flex items-start justify-between">
                    <meta.Icon className="size-5 text-brand-800 transition-transform duration-500 ease-out-expo group-hover:scale-110" />
                    <Badge tone={meta.tone} size="xs">
                      {item.tag}
                    </Badge>
                  </div>
                  <h3 className="mt-5 font-display text-[16px] font-bold text-ink-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-ink-500">
                    {item.description}
                  </p>
                </Card>
              </StaggerItem>
            );
          })}
        </Stagger>

        {/* grouped architecture banner */}
        <Reveal className="mt-8" distance={40}>
          <div className="dark-forest-bg noise relative overflow-hidden rounded-[28px] p-7 text-white shadow-[0_40px_80px_-30px_rgb(6_78_59/0.6)] sm:p-9 lg:p-10">
            <div aria-hidden className="noise-after" />
            <div className="relative grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
              <div>
                <Badge tone="goldSolid">{t("grouped.eyebrow")}</Badge>
                <h3 className="mt-4 text-display-sm font-extrabold text-white sm:text-[34px] sm:leading-[1.15]">
                  {t("grouped.title")}
                </h3>
                <p className="mt-4 max-w-[420px] text-[14.5px] leading-relaxed text-brand-100/80">
                  {t("grouped.description")}
                </p>
              </div>
              <Stagger className="grid gap-3 sm:grid-cols-3" gap={0.1} delay={0.2}>
                {combos.map((combo) => (
                  <StaggerItem key={combo.title} distance={16}>
                    <div className="h-full rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-sm transition-colors duration-300 hover:bg-white/[0.1]">
                      <p className="font-sans text-[11px] font-bold tracking-[0.12em] text-gold-400 uppercase">
                        {combo.title}
                      </p>
                      <p className="mt-2.5 text-[12.5px] leading-relaxed text-brand-50/85">
                        {combo.description}
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
