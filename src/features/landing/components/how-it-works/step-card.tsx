"use client";

import { ArrowRight, Bell, Building2, Palette, Printer, SlidersHorizontal } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import { Badge } from "@/components/ui";
import type { Step } from "@/features/landing/content";
import { cn, pad2 } from "@/lib/utils";

const FOOT_ICONS = [Building2, SlidersHorizontal, Palette, Printer, Bell] as const;

export interface StepCardProps {
  step: Step;
  index: number;
  total: number;
  focused: boolean;
  onSelect: () => void;
  className?: string;
  /** Compact = horizontal layout used for the bottom-centre slot. */
  compact?: boolean;
}

/**
 * One step in the "How it works" ring. Clickable; the focused card gets the
 * brand ring and a contextual badge (Start here / Pass Studio / Active loyalty).
 */
export function StepCard({
  step,
  index,
  total,
  focused,
  onSelect,
  className,
  compact,
}: StepCardProps) {
  const t = useTranslations("howItWorks");
  const tc = useTranslations("common");
  const Icon = FOOT_ICONS[index] ?? Building2;
  const isLast = index === total - 1;

  const badge =
    index === 0 ? (
      <Badge tone="brand" size="sm" dot>
        {t("startHere")}
      </Badge>
    ) : index === 2 ? (
      <Badge tone="brand" size="sm">
        {t("passStudio")}
      </Badge>
    ) : isLast ? (
      <Badge tone="gold" size="sm">
        {t("activeLoyalty")}
      </Badge>
    ) : null;

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      aria-pressed={focused}
      aria-label={`${tc("stepShort", { n: index + 1 })}: ${step.title}`}
      whileHover={focused ? undefined : { y: -4 }}
      whileTap={{ scale: 0.985 }}
      className={cn(
        "group/step w-full cursor-pointer rounded-[20px] border bg-white text-start shadow-card transition-[border-color,box-shadow] duration-500",
        focused
          ? isLast
            ? "border-gold-400 shadow-[0_0_0_4px_rgb(242_215_116/0.35),0_30px_60px_-30px_rgb(180_83_9/0.45)]"
            : "border-brand-300 shadow-[0_0_0_4px_rgb(187_247_208/0.45),0_30px_60px_-30px_rgb(6_78_59/0.45)]"
          : "border-ink-200/70 hover:border-ink-300 hover:shadow-card-hover",
        compact ? "p-4" : "p-5",
        className,
      )}
    >
      <div className={cn("flex", compact ? "items-start gap-4" : "flex-col")}>
        <div
          className={cn(
            "flex items-center justify-between",
            compact ? "shrink-0 flex-col items-start gap-2" : "",
          )}
        >
          <span
            className={cn(
              "flex size-10 items-center justify-center rounded-xl font-display text-[15px] font-bold text-white shadow-glow-brand",
              isLast ? "bg-gold-600 text-brand-950 shadow-glow-gold" : "bg-brand-800",
            )}
          >
            {pad2(index + 1)}
          </span>
          {!compact && (
            <span className="flex items-center gap-2">
              {badge}
              <span className="text-[11px] font-medium text-ink-400">
                {tc("step", { current: index + 1, total })}
              </span>
            </span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className={cn("flex items-center justify-between gap-2", compact ? "" : "mt-4")}>
            <h3 className="font-display text-[17px] font-bold text-ink-900">{step.title}</h3>
            {compact && badge}
          </div>
          <p
            className={cn(
              "mt-2 text-[13px] leading-relaxed text-ink-500",
              compact ? "line-clamp-2" : "",
            )}
          >
            {step.description}
          </p>

          <div
            className={cn(
              "flex items-center justify-between gap-3 border-t border-ink-100 pt-3",
              compact ? "mt-3" : "mt-4",
            )}
          >
            <span
              className={cn(
                "inline-flex items-center gap-1.5 font-sans text-[12px] font-bold",
                isLast ? "text-accent-amber" : "text-brand-800",
              )}
            >
              <Icon className="size-3.5" />
              {step.footnote}
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-ink-400 transition-colors group-hover/step:text-ink-700">
              {isLast ? tc("stepShort", { n: `0${index + 1}` }) : step.next}
              {!isLast && <ArrowRight className="size-3 rtl:-scale-x-100" />}
            </span>
          </div>
        </div>
      </div>
    </motion.button>
  );
}
