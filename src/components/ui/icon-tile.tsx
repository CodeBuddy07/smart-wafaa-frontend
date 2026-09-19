import type * as React from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export const iconTileVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-md border [&>svg]:size-[45%]",
  {
    variants: {
      tone: {
        brand: "border-brand-200/60 bg-brand-50 text-brand-800",
        gold: "border-gold-200 bg-gold-50 text-accent-amber",
        purple: "border-accent-purple/15 bg-accent-purple-soft text-accent-purple",
        neutral: "border-ink-200 bg-ink-50 text-ink-700",
        white: "border-ink-200/70 bg-white text-brand-800",
        dark: "border-white/10 bg-white/10 text-white",
        solid: "border-brand-700 bg-brand-800 text-white shadow-glow-brand",
        goldSolid: "border-gold-500 bg-gold-600 text-brand-950 shadow-glow-gold",
      },
      size: {
        sm: "size-9 rounded-sm",
        md: "size-11",
        lg: "size-14 rounded-lg",
      },
    },
    defaultVariants: { tone: "brand", size: "md" },
  },
);

export interface IconTileProps
  extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof iconTileVariants> {}

/** Small rounded tile that frames an icon or a step number. */
export function IconTile({ className, tone, size, ...props }: IconTileProps) {
  return <span className={cn(iconTileVariants({ tone, size }), className)} {...props} />;
}
