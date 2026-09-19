import * as React from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export const cardVariants = cva("relative overflow-hidden", {
  variants: {
    variant: {
      elevated: "rounded-xl border border-ink-200/70 bg-white shadow-card",
      flat: "rounded-xl border border-ink-200/70 bg-white",
      subtle: "rounded-xl border border-ink-200/60 bg-surface-subtle",
      dark: "rounded-xl border border-white/8 bg-white/[0.04] backdrop-blur-sm",
      glass: "rounded-xl border border-white/60 bg-white/70 shadow-float backdrop-blur-xl",
    },
    padding: {
      none: "p-0",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    },
    interactive: {
      true: "transition-[transform,box-shadow,border-color] duration-300 ease-out-expo hover:-translate-y-1 hover:border-brand-200 hover:shadow-card-hover",
      false: "",
    },
  },
  defaultVariants: { variant: "elevated", padding: "md", interactive: false },
});

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, interactive, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, padding, interactive }), className)}
      {...props}
    />
  ),
);
Card.displayName = "Card";
