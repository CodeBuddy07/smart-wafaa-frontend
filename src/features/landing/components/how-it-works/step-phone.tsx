"use client";

import { ChevronDown, ChevronLeft, Coffee } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";

import { PhoneFrame } from "@/components/mockups/phone-frame";
import { QrCode } from "@/components/mockups/qr-code";
import type { StepScreen } from "@/features/landing/content";
import { cn } from "@/lib/utils";

interface StepPhoneProps {
  active: number;
  screens: StepScreen[];
  className?: string;
}

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * The phone at the centre of the ring. The status card at the top swaps with
 * each step; the loyalty pass beneath it lights up on the final "Earn" step.
 */
export function StepPhone({ active, screens, className }: StepPhoneProps) {
  const t = useTranslations("howItWorks");
  const screen = screens[active] ?? screens[0];
  const earned = active === screens.length - 1;

  return (
    <PhoneFrame className={cn("mx-auto", className)}>
      <div className="flex h-full flex-col bg-[#f4f6f5] pt-12">
        {/* nav */}
        <div className="flex items-center justify-between px-4">
          <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-ink-900">
            <ChevronLeft className="size-3.5 rtl:-scale-x-100" />
            {t("phone.back")}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-ink-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-ink-700">
            {t("phone.actions")}
            <ChevronDown className="size-3" />
          </span>
        </div>

        {/* status card */}
        <div className="mx-3 mt-4 rounded-2xl bg-white p-3 shadow-card">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <div className="flex items-center justify-between">
                <p className="text-[9px] font-bold tracking-[0.16em] text-ink-400 uppercase">
                  {screen?.title}
                </p>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[8.5px] font-bold tracking-wide uppercase",
                    earned ? "bg-gold-100 text-accent-amber" : "bg-brand-50 text-brand-800",
                  )}
                >
                  {screen?.status}
                </span>
              </div>
              <p className="mt-1.5 font-display text-[13px] font-bold text-ink-900">
                {screen?.line1}
              </p>
              <p className="text-[11px] text-ink-500">{screen?.line2}</p>
              {/* progress */}
              <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-ink-100">
                <motion.div
                  className={cn("h-full rounded-full", earned ? "bg-gold-500" : "bg-brand-600")}
                  initial={{ width: 0 }}
                  animate={{ width: `${((active + 1) / screens.length) * 100}%` }}
                  transition={{ duration: 0.6, ease: EASE }}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* loyalty pass */}
        <motion.div
          className="mx-3 mt-3 flex-1 overflow-hidden rounded-2xl bg-white shadow-card"
          animate={
            earned
              ? {
                  boxShadow:
                    "0 0 0 3px rgb(242 215 116 / 0.7), 0 20px 40px -20px rgb(180 83 9 / 0.4)",
                }
              : { boxShadow: "0 1px 2px rgb(15 23 42 / 0.04)" }
          }
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2 px-3 pt-3">
            <span className="flex size-7 items-center justify-center rounded-md bg-[#3f2a20] text-white">
              <Coffee className="size-3.5" />
            </span>
            <p className="text-[10px] font-semibold text-ink-700">Roast & Brew</p>
          </div>
          <div className="mx-3 mt-2 grid grid-cols-5 gap-1 rounded-lg bg-[#efe6dc] p-1.5">
            {Array.from({ length: 10 }).map((_, i) => {
              const filled = i < 9 || earned;
              return (
                <motion.span
                  key={i}
                  animate={{
                    backgroundColor: filled ? "#3f2a20" : "#ffffff",
                    scale: earned && i === 9 ? [1, 1.4, 1] : 1,
                  }}
                  transition={{ duration: 0.45, delay: earned && i === 9 ? 0.3 : 0 }}
                  className="flex aspect-square items-center justify-center rounded-[5px]"
                >
                  <Coffee className={cn("size-2.5", filled ? "text-white" : "text-[#c9b8a6]")} />
                </motion.span>
              );
            })}
          </div>
          <div className="mt-2 flex items-center justify-between px-3">
            <div>
              <p className="text-[9px] text-ink-400">{t("phone.hello")}</p>
              <p className="font-display text-[12px] font-bold text-ink-900">{t("phone.holder")}</p>
            </div>
            <div className="text-end">
              <p className="text-[9px] text-ink-400">{t("phone.yourGift")}</p>
              <p className="font-display text-[12px] font-bold text-ink-900">{earned ? 4 : 3}</p>
            </div>
          </div>
          <div className="mt-2 flex justify-center pb-3">
            <QrCode seed="rayan-roast-brew" size={78} />
          </div>
        </motion.div>
      </div>
    </PhoneFrame>
  );
}
