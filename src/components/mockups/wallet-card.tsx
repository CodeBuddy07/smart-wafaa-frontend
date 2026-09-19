import { Coffee, Gift } from "lucide-react";

import { QrCode } from "@/components/mockups/qr-code";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  Coffee stamps pass — the hero's front card                                */
/* -------------------------------------------------------------------------- */

export interface CoffeeStampCardProps {
  brand: string;
  stampsLabel: string;
  sweetLabel: string;
  giftLabel: string;
  fullNameLabel: string;
  holder: string;
  stamps?: number;
  sweets?: number;
  className?: string;
}

export function CoffeeStampCard({
  brand,
  stampsLabel,
  sweetLabel,
  giftLabel,
  fullNameLabel,
  holder,
  stamps = 1,
  sweets = 2,
  className,
}: CoffeeStampCardProps) {
  return (
    <div
      className={cn(
        "relative flex w-[212px] flex-col overflow-hidden rounded-[18px] border border-white/40 p-3 text-white shadow-dark-card",
        "bg-[linear-gradient(160deg,#e9c7d6_0%,#c898b2_35%,#9a6f93_70%,#6d5378_100%)]",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_20%_0%,rgb(255_255_255/0.35),transparent_60%)]"
      />

      {/* header */}
      <div className="relative flex items-start justify-between">
        <span className="inline-flex size-9 items-center justify-center rounded-full bg-white/90 text-[#6d5378] shadow">
          <Coffee className="size-4" />
        </span>
        <div className="text-end">
          <p className="text-[8px] font-semibold tracking-[0.18em] text-white/70 uppercase">
            {giftLabel}
          </p>
          <p className="font-display text-lg leading-none font-bold">0</p>
        </div>
      </div>
      <p className="relative mt-1 font-serif text-[11px] text-white/80 italic">{brand}</p>

      {/* stamps */}
      <div className="relative mt-2 rounded-xl bg-white/15 p-2 backdrop-blur-sm">
        <p className="inline-block rounded-full bg-white/85 px-2 py-0.5 text-[7px] font-bold tracking-[0.14em] text-[#6d5378] uppercase">
          {stampsLabel}
        </p>
        <div className="mt-2 flex items-center justify-between">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={cn(
                "flex size-6 items-center justify-center rounded-md",
                i < stamps ? "bg-[#4b2c20] text-white shadow" : "bg-white/80 text-[#c898b2]",
              )}
            >
              <Coffee className="size-3.5" />
            </span>
          ))}
        </div>
        <div className="mt-2 flex items-center justify-between">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={cn(
                "size-5 rounded-full border-2",
                i < sweets ? "border-white bg-[#d77a4c]" : "border-white/70 bg-white/60",
              )}
            />
          ))}
        </div>
        <p className="mt-1.5 inline-block rounded-full bg-white/85 px-2 py-0.5 text-[7px] font-bold tracking-[0.14em] text-[#6d5378] uppercase">
          {sweetLabel}
        </p>
      </div>

      {/* holder */}
      <div className="relative mt-3">
        <p className="text-[7px] font-semibold tracking-[0.18em] text-white/70 uppercase">
          {fullNameLabel}
        </p>
        <p className="font-display text-[15px] leading-tight font-semibold">{holder}</p>
      </div>

      {/* qr */}
      <div className="relative mt-3 flex justify-center">
        <div className="rounded-lg bg-white p-1.5 shadow-inner">
          <QrCode seed={holder} size={72} />
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Dark membership card                                                      */
/* -------------------------------------------------------------------------- */

export interface DarkTierCardProps {
  holder: string;
  tier: string;
  points: string;
  className?: string;
}

export function DarkTierCard({ holder, tier, points, className }: DarkTierCardProps) {
  return (
    <div
      className={cn(
        "relative flex h-[300px] w-[190px] flex-col justify-between overflow-hidden rounded-[18px] border border-white/10 p-4 text-white shadow-dark-card",
        "bg-[radial-gradient(90%_70%_at_80%_10%,#4c3f9a_0%,transparent_55%),radial-gradient(70%_60%_at_10%_90%,#1d5fb8_0%,transparent_60%),linear-gradient(160deg,#0f1c3a_0%,#0a1024_100%)]",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60 [background:radial-gradient(1px_1px_at_20%_30%,white_50%,transparent_51%),radial-gradient(1px_1px_at_70%_60%,white_50%,transparent_51%),radial-gradient(1.5px_1.5px_at_40%_80%,white_50%,transparent_51%),radial-gradient(1px_1px_at_85%_25%,white_50%,transparent_51%)]"
      />
      <div className="relative flex items-center justify-between">
        <span className="rounded-full border border-white/20 bg-white/10 px-2 py-0.5 text-[8px] font-semibold tracking-[0.16em] uppercase">
          {tier}
        </span>
        <Gift className="size-4 text-gold-400" />
      </div>
      <div className="relative">
        <p className="font-serif text-lg tracking-wide italic">{holder}</p>
        <p className="mt-1 text-[10px] text-white/60">{points}</p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Light "Hello Rayan" balance card                                          */
/* -------------------------------------------------------------------------- */

export interface LightBalanceCardProps {
  hello: string;
  holder: string;
  balanceLabel: string;
  amount: string;
  className?: string;
}

export function LightBalanceCard({
  hello,
  holder,
  balanceLabel,
  amount,
  className,
}: LightBalanceCardProps) {
  return (
    <div
      className={cn(
        "relative flex h-[300px] w-[190px] flex-col justify-between overflow-hidden rounded-[18px] border border-ink-200 bg-white p-4 text-ink-900 shadow-dark-card",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <span className="flex size-8 items-center justify-center rounded-lg bg-[#3f2a20] text-white">
          <Coffee className="size-4" />
        </span>
        <span className="flex size-8 items-center justify-center rounded-lg bg-brand-50 text-brand-800">
          <Gift className="size-4" />
        </span>
      </div>
      <div>
        <p className="text-xs text-ink-500">{hello}</p>
        <p className="font-display text-xl font-bold">{holder}</p>
        <div className="mt-3 h-px bg-ink-100" />
        <p className="mt-3 text-[9px] font-semibold tracking-[0.16em] text-ink-400 uppercase">
          {balanceLabel}
        </p>
        <p className="font-display text-base font-semibold text-brand-800">{amount}</p>
      </div>
    </div>
  );
}
