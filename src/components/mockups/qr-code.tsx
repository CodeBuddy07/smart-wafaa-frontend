import { useMemo } from "react";

import { cn } from "@/lib/utils";

interface QrCodeProps {
  /** Any string — drives a deterministic pattern so the same seed renders identically. */
  seed?: string;
  size?: number;
  className?: string;
  dark?: string;
  light?: string;
}

/** Tiny xorshift PRNG so the pattern is stable across server & client renders. */
function makeRng(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  return () => {
    h ^= h << 13;
    h ^= h >>> 17;
    h ^= h << 5;
    return ((h >>> 0) % 1000) / 1000;
  };
}

const MODULES = 21;

/**
 * Decorative QR-code look-alike (NOT scannable). Includes the three finder
 * patterns so it reads as a real code at a glance.
 */
export function QrCode({
  seed = "smart-wafaa",
  size = 96,
  className,
  dark = "#0F172A",
  light = "#FFFFFF",
}: QrCodeProps) {
  const cells = useMemo(() => {
    const rng = makeRng(seed);
    const out: boolean[] = [];
    const isFinder = (x: number, y: number) =>
      (x < 7 && y < 7) || (x >= MODULES - 7 && y < 7) || (x < 7 && y >= MODULES - 7);
    for (let y = 0; y < MODULES; y++) {
      for (let x = 0; x < MODULES; x++) {
        if (isFinder(x, y)) {
          const lx = x < 7 ? x : x - (MODULES - 7);
          const ly = y < 7 ? y : y - (MODULES - 7);
          const ring = lx === 0 || ly === 0 || lx === 6 || ly === 6;
          const core = lx >= 2 && lx <= 4 && ly >= 2 && ly <= 4;
          out.push(ring || core);
        } else {
          out.push(rng() > 0.55);
        }
      }
    }
    return out;
  }, [seed]);

  const cell = size / MODULES;

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      role="img"
      aria-label="QR code"
      className={cn("shrink-0", className)}
      shapeRendering="crispEdges"
    >
      <rect width={size} height={size} fill={light} />
      {cells.map((on, i) =>
        on ? (
          <rect
            key={i}
            x={(i % MODULES) * cell}
            y={Math.floor(i / MODULES) * cell}
            width={cell}
            height={cell}
            fill={dark}
          />
        ) : null,
      )}
    </svg>
  );
}
