import type * as React from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full font-sans font-semibold tracking-[0.12em] whitespace-nowrap uppercase",
  {
    variants: {
      tone: {
        brand: "border border-brand-200 bg-brand-50 text-brand-800",
        brandSolid: "bg-brand-800 text-white",
        brandOnDark: "border border-brand-400/30 bg-brand-400/10 text-brand-300",
        gold: "border border-gold-400/60 bg-gold-100 text-accent-amber",
        goldSolid: "bg-gold-600 text-brand-950",
        goldOnDark: "border border-gold-500/40 bg-gold-500/10 text-gold-400",
        purple: "bg-accent-purple-soft text-accent-purple",
        neutral: "bg-ink-100 text-ink-600",
        outline: "border border-ink-200 bg-white text-ink-700",
      },
      size: {
        xs: "h-5 px-2 text-[9px]",
        sm: "h-6 px-2.5 text-[10px]",
        md: "h-7 px-3 text-[11px]",
      },
    },
    defaultVariants: { tone: "brand", size: "md" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
  /** Show a small live dot before the label. */
  dot?: boolean;
}

export function Badge({ className, tone, size, dot, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ tone, size }), className)} {...props}>
      {dot ? <span aria-hidden className="size-1.5 rounded-full bg-current" /> : null}
      {children}
    </span>
  );
}
