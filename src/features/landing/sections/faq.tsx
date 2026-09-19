"use client";

import { useId, useState } from "react";

import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";

import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Container } from "@/components/ui";
import { sectionIds } from "@/config/site";
import { SectionHeading } from "@/features/landing/components/section-heading";
import type { FaqItem } from "@/features/landing/content";
import { cn } from "@/lib/utils";

export function Faq() {
  const t = useTranslations("faq");
  const items = t.raw("items") as FaqItem[];
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section id={sectionIds.faq} className="scroll-mt-28 bg-surface-subtle py-20 sm:py-28">
      <Container size="narrow">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />

        <Stagger className="mt-12 flex flex-col gap-3" gap={0.06}>
          {items.map((item, i) => {
            const expanded = open === i;
            const panelId = `${baseId}-panel-${i}`;
            const buttonId = `${baseId}-button-${i}`;
            return (
              <StaggerItem key={item.q} distance={16}>
                <div
                  className={cn(
                    "rounded-2xl border bg-white transition-[border-color,box-shadow] duration-300",
                    expanded
                      ? "border-brand-200 shadow-card-hover"
                      : "border-ink-200/70 shadow-card hover:border-ink-300",
                  )}
                >
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={expanded}
                      aria-controls={panelId}
                      onClick={() => setOpen(expanded ? null : i)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-start font-display text-[15px] font-semibold text-ink-900 sm:px-6 sm:py-5"
                    >
                      {item.q}
                      <motion.span
                        animate={{ rotate: expanded ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className={cn(
                          "flex size-7 shrink-0 items-center justify-center rounded-full",
                          expanded ? "bg-brand-800 text-white" : "bg-ink-100 text-ink-500",
                        )}
                      >
                        <ChevronDown className="size-4" />
                      </motion.span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {expanded && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 text-[14.5px] leading-relaxed text-ink-600 sm:px-6 sm:pb-6">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}
