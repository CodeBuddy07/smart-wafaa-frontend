import Image from "next/image";

import { cn } from "@/lib/utils";

interface Mechanic {
  filled: number;
  total: number;
}

interface CafeStripProps {
  /** Coffee stamps — rendered as filled / empty takeaway cups. */
  cups: Mechanic;
  /** Optional second mechanic (sweets) — rendered as croissant plates. */
  plates?: Mechanic;
  className?: string;
}

const ICONS = {
  cup: { full: "/images/strip/cup-full.webp", empty: "/images/strip/cup-empty.webp" },
  plate: { full: "/images/strip/plate-full.webp", empty: "/images/strip/plate-empty.webp" },
} as const;

/**
 * The Roast & Brew `strip.png`, composed the way the server does it on every
 * punch: an illustrated café scene, a dark counter band so the pass's primary
 * field stays legible, and one icon per stamp — filled or empty.
 */
export function CafeStrip({ cups, plates, className }: CafeStripProps) {
  return (
    <div className={cn("relative h-full w-full overflow-hidden", className)}>
      <Image
        src="/images/strip/cafe-strip.webp"
        alt=""
        aria-hidden
        fill
        sizes="(max-width: 640px) 80vw, 375px"
        className="object-cover object-[50%_30%]"
      />
      {/* counter-front band: keeps white primary text readable (Apple contrast guidance) */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[56%] bg-[linear-gradient(to_top,rgb(38_22_14/0.95)_0%,rgb(38_22_14/0.86)_38%,rgb(38_22_14/0.3)_70%,transparent_100%)]"
      />
      {/* stamps */}
      <div className="absolute end-[3.5%] bottom-[8%] flex w-[64%] flex-col gap-[6%]">
        <StampRow kind="cup" {...cups} />
        {plates && <StampRow kind="plate" {...plates} />}
      </div>
    </div>
  );
}

function StampRow({ kind, filled, total }: Mechanic & { kind: keyof typeof ICONS }) {
  return (
    <div
      className="flex justify-between"
      role="img"
      aria-label={`${filled} of ${total} ${kind === "cup" ? "coffee" : "sweet"} stamps`}
    >
      {Array.from({ length: total }).map((_, i) => {
        const on = i < filled;
        return (
          <span key={i} className="relative aspect-square w-[18%]">
            <Image
              src={on ? ICONS[kind].full : ICONS[kind].empty}
              alt=""
              aria-hidden
              fill
              sizes="48px"
              className={cn(
                "object-contain",
                on ? "drop-shadow-[0_2px_3px_rgb(0_0_0/0.45)]" : "opacity-80 saturate-50",
              )}
            />
          </span>
        );
      })}
    </div>
  );
}
