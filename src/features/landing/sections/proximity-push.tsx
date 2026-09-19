import { BellRing, MessageSquareOff } from "lucide-react";
import { useTranslations } from "next-intl";

import { LockscreenPhone } from "@/components/mockups/lockscreen-phone";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Badge, Container } from "@/components/ui";
import { sectionIds } from "@/config/site";
import type { PushItem } from "@/features/landing/content";

const ICONS = [MessageSquareOff, BellRing] as const;

export function ProximityPush() {
  const t = useTranslations("push");
  const items = t.raw("items") as PushItem[];

  return (
    <section
      id={sectionIds.push}
      className="dark-navy-bg noise relative scroll-mt-28 overflow-hidden py-20 text-white sm:py-28"
    >
      <div aria-hidden className="noise-after" />
      <div
        aria-hidden
        className="pointer-events-none absolute start-1/3 -bottom-40 size-[600px] rounded-full bg-brand-700/20 blur-3xl"
      />

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:gap-16">
          <Reveal from="left" distance={40} className="flex justify-center lg:justify-start">
            <LockscreenPhone
              time={t("phone.time")}
              day={t("phone.day")}
              date={t("phone.date")}
              merchant={t("phone.merchant")}
              distance={t("phone.distance")}
              title={t("phone.title")}
              body={t("phone.body")}
            />
          </Reveal>

          <div>
            <Reveal>
              <Badge tone="brandOnDark">{t("eyebrow")}</Badge>
              <h2 className="mt-5 max-w-[640px] text-display-sm font-extrabold text-white sm:text-display-md">
                {t("title")}
              </h2>
              <p className="mt-5 max-w-[660px] text-[16px] leading-relaxed text-ink-300 sm:text-[17px]">
                {t("description")}
              </p>
            </Reveal>

            <Stagger className="mt-9 grid gap-4 sm:grid-cols-2" gap={0.12} delay={0.15}>
              {items.map((item, i) => {
                const Icon = ICONS[i] ?? BellRing;
                return (
                  <StaggerItem key={item.title}>
                    <div className="h-full rounded-2xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur-sm transition-colors duration-300 hover:bg-white/[0.08]">
                      <p className="inline-flex items-center gap-2 font-display text-[15px] font-bold text-white">
                        <Icon className="size-4 text-brand-300" />
                        {item.title}
                      </p>
                      <p className="mt-2 text-[13px] leading-relaxed text-ink-400">
                        {item.description}
                      </p>
                    </div>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </div>
      </Container>
    </section>
  );
}
