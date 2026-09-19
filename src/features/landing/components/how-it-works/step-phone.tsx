"use client";

import { ChevronDown, ChevronLeft } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";

import { CoffeeStampPass, type AppleCopy } from "@/components/mockups/pass-presets";
import { PhoneFrame } from "@/components/mockups/phone-frame";
import type { StepScreen } from "@/features/landing/content";
import { cn } from "@/lib/utils";

interface StepPhoneProps {
  active: number;
  screens: StepScreen[];
  className?: string;
}

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * The phone at the centre of the ring. The status card swaps with each step;
 * the Apple Wallet store card beneath it gets its 10th stamp on the final
 * "Earn" step. Radii follow iOS (≈10pt cards) scaled to the frame width.
 */
export function StepPhone({ active, screens, className }: StepPhoneProps) {
  const t = useTranslations("howItWorks");
  const th = useTranslations("hero");
  const apple = (th.raw("cards") as { apple: AppleCopy }).apple;
  const screen = screens[active] ?? screens[0];
  const earned = active === screens.length - 1;

  return (
    <PhoneFrame className={cn("mx-auto", className)}>
      <div className="flex h-full flex-col bg-[#f2f2f7] pt-11">
        {/* nav */}
        <div className="flex items-center justify-between px-3.5">
          <span className="inline-flex items-center gap-0.5 text-[12px] font-semibold text-[#1c1c1e]">
            <ChevronLeft className="size-3.5 rtl:-scale-x-100" />
            {t("phone.back")}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold text-[#1c1c1e] shadow-[0_1px_2px_rgb(0_0_0/0.06)]">
            {t("phone.actions")}
            <ChevronDown className="size-3" />
          </span>
        </div>

        {/* status card */}
        <div className="mx-2.5 mt-3 rounded-[7px] bg-white px-3 py-2.5 shadow-[0_1px_2px_rgb(0_0_0/0.05)]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8, filter: "blur(3px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(3px)" }}
              transition={{ duration: 0.32, ease: EASE }}
            >
              <div className="flex items-center justify-between">
                <p className="text-[9px] font-bold tracking-[0.12em] text-ink-400 uppercase">
                  {screen?.title}
                </p>
                <span
                  className={cn(
                    "rounded-[4px] px-1.5 py-0.5 text-[8.5px] font-bold tracking-wide uppercase",
                    earned ? "bg-gold-100 text-accent-amber" : "bg-brand-50 text-brand-800",
                  )}
                >
                  {screen?.status}
                </span>
              </div>
              <p className="mt-1 font-display text-[13px] font-bold text-ink-900">
                {screen?.line1}
              </p>
              <p className="text-[11px] text-ink-500">{screen?.line2}</p>
              <div className="mt-2 h-[3px] overflow-hidden rounded-full bg-ink-100">
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

        {/* the real pass, as Wallet renders it */}
        <motion.div
          className="mx-2.5 mt-2.5"
          animate={
            earned
              ? {
                  boxShadow:
                    "0 0 0 2px rgb(242 215 116 / 0.9), 0 14px 30px -14px rgb(180 83 9 / 0.5)",
                }
              : { boxShadow: "0 0 0 0px rgb(242 215 116 / 0)" }
          }
          transition={{ duration: 0.5 }}
          style={{ borderRadius: 6 }}
        >
          <CoffeeStampPass copy={apple} width={205} stamps={earned ? 5 : 4} />
        </motion.div>
      </div>
    </PhoneFrame>
  );
}
