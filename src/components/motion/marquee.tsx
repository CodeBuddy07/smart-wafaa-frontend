import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  /** Seconds for one full loop. */
  duration?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
  className?: string;
}

/**
 * CSS-driven infinite marquee. Content is duplicated so the loop is seamless.
 * Pure CSS keeps it at 60fps without JS on the main thread.
 */
export function Marquee({
  children,
  duration = 40,
  reverse,
  pauseOnHover = true,
  className,
}: MarqueeProps) {
  return (
    <div
      className={cn("group/marquee mask-fade-x flex overflow-hidden", className)}
      style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
    >
      {[0, 1].map((i) => (
        <div
          key={i}
          aria-hidden={i === 1}
          className={cn(
            "motion-ok:animate-marquee flex shrink-0 items-center justify-around gap-16 pe-16",
            reverse && "motion-ok:[animation-direction:reverse]",
            pauseOnHover && "group-hover/marquee:[animation-play-state:paused]",
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
