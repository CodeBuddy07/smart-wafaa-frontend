import {
  ArrowRight,
  BellRing,
  ChartLine,
  Gift,
  Handshake,
  Repeat2,
  ShoppingBag,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Button, Card, Container, IconTile } from "@/components/ui";
import { sectionIds, siteConfig } from "@/config/site";
import { SectionHeading } from "@/features/landing/components/section-heading";
import type { WhyItem } from "@/features/landing/content";
import { Link } from "@/i18n/navigation";
import { pad2 } from "@/lib/utils";

const ICONS = [Repeat2, ShoppingBag, Gift, BellRing, ChartLine, Handshake] as const;
const GOLD_INDEX = 2;

export function WhyLoyalty() {
  const t = useTranslations("why");
  const items = t.raw("items") as WhyItem[];

  return (
    <section id={sectionIds.why} className="aurora-soft scroll-mt-28 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
          uppercase
        />

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" gap={0.08}>
          {items.map((item, i) => {
            const Icon = ICONS[i] ?? Repeat2;
            const gold = i === GOLD_INDEX;
            return (
              <StaggerItem key={item.title} className="h-full">
                <Card interactive padding="none" className="group h-full p-6">
                  <div className="flex items-start justify-between">
                    <IconTile
                      tone={gold ? "gold" : "brand"}
                      className="transition-transform duration-500 ease-out-expo group-hover:-rotate-6"
                    >
                      <Icon />
                    </IconTile>
                    <span
                      className={`rounded-full px-2.5 py-1 font-sans text-[11px] font-bold ${
                        gold ? "bg-gold-100 text-accent-amber" : "bg-brand-50 text-brand-800"
                      }`}
                    >
                      {pad2(i + 1)}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-[17px] font-bold text-ink-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-ink-500">
                    {item.description}
                  </p>
                </Card>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal className="mt-12 flex justify-center" delay={0.2}>
          <Button asChild size="lg">
            <Link href={siteConfig.links.signup}>
              {t("cta")}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover/button:translate-x-1 rtl:-scale-x-100 rtl:group-hover/button:-translate-x-1" />
            </Link>
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
