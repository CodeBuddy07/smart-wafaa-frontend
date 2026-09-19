import * as React from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  [
    "group/button relative inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap select-none",
    "rounded-full font-sans font-medium tracking-[0.01em] transition-[transform,box-shadow,background-color,color] duration-300 ease-out-expo",
    "focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-canvas focus-visible:outline-none",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:scale-[0.98]",
  ],
  {
    variants: {
      variant: {
        /** Deep-green gradient pill with glow — the primary CTA everywhere. */
        primary: [
          "text-white shadow-glow-brand",
          "bg-[linear-gradient(135deg,var(--color-brand-950)_0%,var(--color-brand-800)_55%,var(--color-brand-700)_100%)]",
          "hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-8px_rgb(15_76_58/0.55)]",
          "after:pointer-events-none after:absolute after:inset-0 after:rounded-full after:bg-white/0 after:transition-colors hover:after:bg-white/10",
        ],
        /** Gold pill — used on dark CTA banners. */
        gold: [
          "text-brand-950 shadow-glow-gold",
          "bg-[linear-gradient(180deg,var(--color-gold-500)_0%,var(--color-gold-600)_100%)]",
          "hover:-translate-y-0.5 hover:shadow-[0_14px_36px_-10px_rgb(212_175_55/0.75)]",
        ],
        /** Light neutral surface — secondary actions inside cards. */
        secondary: ["bg-ink-100 text-ink-900 hover:bg-ink-200/80"],
        /** Dark ink — enterprise / contact-sales. */
        dark: ["bg-ink-950 text-white hover:-translate-y-0.5 hover:bg-ink-800"],
        /** Bordered pill on light surfaces. */
        outline: [
          "border border-ink-200 bg-white/70 text-ink-900 backdrop-blur",
          "hover:-translate-y-0.5 hover:border-brand-800/40 hover:bg-white",
        ],
        /** Translucent pill on dark surfaces. */
        ghostOnDark: [
          "border border-white/20 bg-white/5 text-white backdrop-blur",
          "hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/10",
        ],
        /** Plain text link-style. */
        link: ["h-auto rounded-none px-0 text-ink-600 hover:text-brand-800"],
      },
      size: {
        sm: "h-9 px-4 text-[13px]",
        md: "h-11 px-5 text-sm",
        lg: "h-12 px-6 text-[15px]",
        xl: "h-14 px-7 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  /** Render as a child element (e.g. `next/link`) while keeping button styles. */
  asChild?: boolean;
}

/**
 * Button. Pass `asChild` to style an anchor/`Link` as a button without nesting
 * interactive elements.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const classes = cn(buttonVariants({ variant, size }), className);

    if (asChild && React.isValidElement<{ className?: string }>(children)) {
      return React.cloneElement(children, {
        className: cn(classes, children.props.className),
      });
    }

    return (
      <button ref={ref} className={classes} type={props.type ?? "button"} {...props}>
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";
