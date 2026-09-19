import { Layers3, QrCode, Smartphone, WalletCards } from "lucide-react";
import { useTranslations } from "next-intl";

import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Container, IconTile } from "@/components/ui";
import type { ArchitectureItem } from "@/features/landing/content";
import { cn } from "@/lib/utils";

const ICONS = [WalletCards, Layers3, Smartphone, QrCode] as const;
const HIGHLIGHT_INDEX = 1;

/** Dark-green "core architecture" bar that closes the hero. */
export function CoreArchitecture() {
  const t = useTranslations("architecture");
  const items = t.raw("items") as ArchitectureItem[];

  return (
    <section aria-labelledby="architecture-heading" className="relative -mt-2 pb-12">
      <Container size="wide">
        <Reveal distance={40} duration={0.9}>
          <div className="dark-forest-bar noise relative overflow-hidden rounded-[28px] px-6 py-7 shadow-[0_40px_80px_-30px_rgb(6_78_59/0.55)] sm:px-10 sm:py-9">
            <div aria-hidden className="noise-after" />
            <div className="relative flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <h2
                id="architecture-heading"
                className="inline-flex items-center gap-2.5 font-sans text-[13px] font-bold tracking-[0.08em] text-white uppercase"
              >
                <span className="size-2 rounded-full bg-brand-300 shadow-[0_0_12px_2px_rgb(74_222_128/0.7)]" />
                {t("eyebrow")}
              </h2>
              <p className="text-[13px] text-brand-100/80">{t("note")}</p>
            </div>

            <Stagger
              className="relative mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
              gap={0.09}
              delay={0.15}
            >
              {items.map((item, i) => {
                const Icon = ICONS[i] ?? WalletCards;
                const highlighted = i === HIGHLIGHT_INDEX;
                return (
                  <StaggerItem key={item.title} distance={20}>
                    <article
                      className={cn(
                        "group flex h-full gap-3.5 rounded-2xl border p-4 transition-[transform,box-shadow] duration-300 ease-out-expo hover:-translate-y-1",
                        highlighted
                          ? "border-brand-200/80 bg-[linear-gradient(135deg,#eefbf1_0%,#fffbe6_100%)] shadow-[0_0_0_4px_rgb(187_247_208/0.35),0_20px_40px_-20px_rgb(0_0_0/0.45)]"
                          : "border-white/60 bg-surface-subtle shadow-[0_20px_40px_-24px_rgb(0_0_0/0.45)]",
                      )}
                    >
                      <IconTile tone={highlighted ? "gold" : "brand"} size="sm" className="mt-0.5">
                        <Icon />
                      </IconTile>
                      <div>
                        <h3 className="font-display text-[15px] font-bold text-ink-900">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-[12.5px] leading-relaxed text-ink-500">
                          {item.description}
                        </p>
                      </div>
                    </article>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
