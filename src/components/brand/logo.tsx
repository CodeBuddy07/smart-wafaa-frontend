import { cn } from "@/lib/utils";

interface LogoMarkProps extends React.SVGProps<SVGSVGElement> {
  /** `brand` = green badge + white glyph (default). `mono` = single-colour glyph. */
  tone?: "brand" | "white" | "mono";
}

/**
 * Smart Wafaa mark — rounded badge with an interlocking double-leaf "S".
 * NOTE: approximation of the Figma mark (export is disabled on the file);
 * swap the paths for the official SVG when available.
 */
export function LogoMark({ tone = "brand", className, ...props }: LogoMarkProps) {
  const badge = tone === "brand" ? "#0F4C3A" : tone === "white" ? "#FFFFFF" : "currentColor";
  const glyph = tone === "brand" ? "#FFFFFF" : tone === "white" ? "#0F4C3A" : "#FFFFFF";
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden className={cn("size-9", className)} {...props}>
      <rect width="40" height="40" rx="11" fill={badge} />
      <path
        d="M27.2 11.6c-3.9-3.2-10.2-2.6-12.9 1.1-1.9 2.6-1.1 5.9 1.7 7.5 2.3 1.3 5.1 1.4 7.6 1.8 3.6.6 5.4 2.7 4.6 5.4-1 3.4-5.9 4.7-9.7 3.3"
        stroke={glyph}
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      <path
        d="M12.4 17.9c1.4 4.9 6.8 7.2 11.2 5.2M27.4 22.9c-1.1-4.7-6.1-7.1-10.6-5.4"
        stroke={glyph}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}

interface LogoProps {
  className?: string;
  /** Wordmark colour on dark surfaces. */
  onDark?: boolean;
  size?: "sm" | "md";
}

/** Mark + two-line wordmark ("Smart" over "Wafaa"). */
export function Logo({ className, onDark = false, size = "md" }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark tone={onDark ? "white" : "brand"} className={size === "sm" ? "size-8" : "size-9"} />
      <span
        className={cn(
          "flex flex-col font-display leading-none tracking-tight",
          onDark ? "text-white" : "text-brand-900",
        )}
      >
        <span className={cn("font-medium", size === "sm" ? "text-[10px]" : "text-[11px]")}>
          Smart
        </span>
        <span className={cn("font-extrabold", size === "sm" ? "text-[16px]" : "text-[19px]")}>
          Wafaa<span className="align-super text-[7px] font-medium">™</span>
        </span>
      </span>
    </span>
  );
}
