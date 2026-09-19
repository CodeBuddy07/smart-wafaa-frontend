"use client";

import { motion } from "motion/react";

import type { Step } from "@/features/landing/content";
import { cn } from "@/lib/utils";

interface StepStepperProps {
  steps: Step[];
  active: number;
  onSelect: (index: number) => void;
  running: boolean;
  cycle: number;
  interval: number;
}

/** 1 Workspace — 2 Rules — 3 Brand — 4 Deploy — 5 Earn, with an auto-advance progress bar. */
export function StepStepper({
  steps,
  active,
  onSelect,
  running,
  cycle,
  interval,
}: StepStepperProps) {
  return (
    <div className="flex justify-center">
      <div
        role="tablist"
        aria-orientation="horizontal"
        className="glass relative flex max-w-full scrollbar-none items-center gap-1 overflow-x-auto rounded-full p-1.5"
      >
        {steps.map((step, i) => {
          const isActive = i === active;
          const isLast = i === steps.length - 1;
          return (
            <div key={step.title} className="flex items-center">
              {i > 0 && <span aria-hidden className="mx-1 h-px w-3 shrink-0 bg-ink-200" />}
              <button
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onSelect(i)}
                className={cn(
                  "relative inline-flex h-9 shrink-0 items-center gap-2 rounded-full ps-1.5 pe-3.5 font-sans text-[12.5px] font-semibold transition-colors",
                  isActive ? "text-ink-900" : "text-ink-500 hover:text-ink-900",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="stepper-pill"
                    className={cn(
                      "absolute inset-0 -z-10 rounded-full border",
                      isLast ? "border-gold-300 bg-gold-50" : "border-brand-200 bg-brand-50",
                    )}
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span
                  className={cn(
                    "flex size-6 items-center justify-center rounded-full text-[11px] font-bold transition-colors",
                    isActive
                      ? isLast
                        ? "bg-gold-500 text-brand-950"
                        : "bg-brand-800 text-white"
                      : isLast
                        ? "bg-gold-100 text-accent-amber"
                        : "bg-ink-100 text-ink-500",
                  )}
                >
                  {i + 1}
                </span>
                {step.short}
                {/* auto-advance progress */}
                {isActive && running && (
                  <motion.span
                    key={cycle}
                    aria-hidden
                    className={cn(
                      "absolute inset-x-3 -bottom-[3px] h-[2px] origin-left rounded-full rtl:origin-right",
                      isLast ? "bg-gold-500" : "bg-brand-500",
                    )}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: interval / 1000, ease: "linear" }}
                  />
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
