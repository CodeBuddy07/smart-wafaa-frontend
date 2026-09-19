"use client";

import { Coffee } from "lucide-react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

export interface LockscreenPhoneProps {
  time: string;
  day: string;
  date: string;
  merchant: string;
  distance: string;
  title: string;
  body: string;
  className?: string;
}

/** Dark lockscreen with a geofenced wallet notification sliding in. */
export function LockscreenPhone({
  time,
  day,
  date,
  merchant,
  distance,
  title,
  body,
  className,
}: LockscreenPhoneProps) {
  return (
    <div
      className={cn(
        "relative aspect-[9/19] w-[270px] rounded-[44px] bg-[#0f1a24] p-[9px] shadow-[0_50px_90px_-30px_rgb(0_0_0/0.7),inset_0_0_0_1px_rgb(255_255_255/0.08)]",
        className,
      )}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[36px] bg-[radial-gradient(90%_60%_at_50%_0%,#1b2b3a_0%,#0b131b_60%,#070c11_100%)] text-white">
        <div className="absolute inset-x-0 top-0 flex items-center justify-between px-6 pt-3 text-[10px] text-white/80">
          <span>{time}</span>
          <span className="flex items-center gap-1">
            <span className="block h-2 w-3 rounded-[2px] border border-white/70" />
            <span className="block h-2 w-4 rounded-[2px] bg-white/80" />
          </span>
        </div>
        <span
          aria-hidden
          className="absolute start-1/2 top-2.5 h-[20px] w-[70px] -translate-x-1/2 rounded-full bg-black rtl:translate-x-1/2"
        />

        <div className="mt-16 text-center">
          <p className="font-display text-[34px] leading-none font-medium tracking-tight">{day}</p>
          <p className="mt-1.5 text-xs text-white/60">{date}</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -24, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "0px 0px -20% 0px" }}
          transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 22 }}
          className="absolute inset-x-3 top-[35%] rounded-[15px] border border-white/10 bg-[#1a2430]/90 p-3 shadow-lg backdrop-blur"
        >
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-[8px] font-bold tracking-[0.16em] text-white/70 uppercase">
              <span className="flex size-4 items-center justify-center rounded-[3px] bg-gold-500 text-brand-950">
                <Coffee className="size-2.5" />
              </span>
              {merchant}
            </span>
            <span className="relative inline-flex items-center text-[8px] font-semibold text-brand-300">
              <span className="relative me-1.5 flex size-1.5">
                <span className="motion-ok:animate-pulse-ring absolute inline-flex size-full rounded-full bg-brand-400" />
                <span className="relative inline-flex size-1.5 rounded-full bg-brand-400" />
              </span>
              {distance}
            </span>
          </div>
          <p className="mt-2 text-[11px] leading-snug font-semibold">{title}</p>
          <p className="mt-1 text-[10px] leading-snug text-white/60">{body}</p>
        </motion.div>

        <span
          aria-hidden
          className="absolute start-1/2 bottom-3 h-1 w-24 -translate-x-1/2 rounded-full bg-white/60 rtl:translate-x-1/2"
        />
      </div>
    </div>
  );
}
