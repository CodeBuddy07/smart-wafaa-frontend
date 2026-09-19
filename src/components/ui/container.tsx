import type * as React from "react";

import { cn } from "@/lib/utils";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: keyof React.JSX.IntrinsicElements;
  /** `content` = 1140px design column; `wide` = 1240px for full-bleed cards. */
  size?: "content" | "wide" | "narrow";
}

/** Column widths include the horizontal padding so the inner content matches the Figma column. */
const sizes = {
  narrow: "max-w-[calc(820px+5rem)]",
  content: "max-w-[calc(var(--container-content)+5rem)]",
  wide: "max-w-[calc(1240px+5rem)]",
} as const;

/** Centers content to the design column with responsive side gutters. */
export function Container({ as = "div", size = "content", className, ...props }: ContainerProps) {
  const Comp = as as React.ElementType;
  return (
    <Comp
      className={cn("mx-auto w-full px-5 sm:px-8 lg:px-10", sizes[size], className)}
      {...props}
    />
  );
}
