import { Reveal } from "@/components/motion/reveal";
import { Badge, type BadgeProps } from "@/components/ui";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "center" | "start";
  tone?: "light" | "dark";
  eyebrowTone?: BadgeProps["tone"];
  eyebrowDot?: boolean;
  uppercase?: boolean;
  size?: "md" | "lg";
  className?: string;
  titleClassName?: string;
}

/** Eyebrow pill + headline + lead paragraph used at the top of every section. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "light",
  eyebrowTone,
  eyebrowDot,
  uppercase,
  size = "md",
  className,
  titleClassName,
}: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-start",
        className,
      )}
    >
      <Badge tone={eyebrowTone ?? (dark ? "brandOnDark" : "brand")} dot={eyebrowDot}>
        {eyebrow}
      </Badge>
      <h2
        className={cn(
          "max-w-[720px] font-extrabold",
          size === "lg"
            ? "text-display-md sm:text-display-lg"
            : "text-display-sm sm:text-display-md",
          uppercase && "tracking-[-0.01em] uppercase",
          dark && "text-white",
          titleClassName,
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "max-w-[640px] text-[17px] leading-relaxed sm:text-lead",
            dark ? "text-ink-300" : "text-ink-600",
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
