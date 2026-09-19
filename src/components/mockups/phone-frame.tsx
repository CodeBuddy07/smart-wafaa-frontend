import { cn } from "@/lib/utils";

interface PhoneFrameProps {
  children: React.ReactNode;
  className?: string;
  /** Frame colour. */
  tone?: "black" | "dark";
  /** Show the iOS status bar. */
  statusBar?: boolean;
  time?: string;
}

/**
 * Generic smartphone frame. The screen is a positioned slot — pass any
 * absolutely/relatively laid out content.
 */
export function PhoneFrame({
  children,
  className,
  tone = "black",
  statusBar = true,
  time = "12:45",
}: PhoneFrameProps) {
  return (
    <div
      className={cn(
        "relative aspect-[9/19.2] w-[250px] rounded-[42px] p-[10px] shadow-[0_40px_80px_-30px_rgb(0_0_0/0.55),inset_0_0_0_1px_rgb(255_255_255/0.08)]",
        tone === "black" ? "bg-[#0b0d10]" : "bg-[#141a22]",
        className,
      )}
    >
      {/* side buttons */}
      <span
        aria-hidden
        className="absolute -start-[2px] top-[18%] h-8 w-[3px] rounded-full bg-[#2a2f36]"
      />
      <span
        aria-hidden
        className="absolute -start-[2px] top-[27%] h-12 w-[3px] rounded-full bg-[#2a2f36]"
      />
      <span
        aria-hidden
        className="absolute -end-[2px] top-[24%] h-16 w-[3px] rounded-full bg-[#2a2f36]"
      />

      <div className="relative h-full w-full overflow-hidden rounded-[34px] bg-white">
        {/* dynamic island */}
        <span
          aria-hidden
          className="absolute start-1/2 top-2.5 z-20 h-[22px] w-[74px] -translate-x-1/2 rounded-full bg-black rtl:translate-x-1/2"
        />
        {statusBar && (
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between px-6 pt-3 text-[11px] font-semibold text-ink-900">
            <span>{time}</span>
            <span className="flex items-center gap-1">
              <svg width="14" height="10" viewBox="0 0 14 10" fill="currentColor" aria-hidden>
                <rect x="0" y="6" width="2.5" height="4" rx="0.5" />
                <rect x="3.8" y="4" width="2.5" height="6" rx="0.5" />
                <rect x="7.6" y="2" width="2.5" height="8" rx="0.5" />
                <rect x="11.4" y="0" width="2.5" height="10" rx="0.5" />
              </svg>
              <svg
                width="22"
                height="10"
                viewBox="0 0 22 10"
                fill="none"
                stroke="currentColor"
                aria-hidden
              >
                <rect x="0.5" y="0.5" width="18" height="9" rx="2.5" />
                <rect
                  x="2"
                  y="2"
                  width="14"
                  height="6"
                  rx="1.5"
                  fill="currentColor"
                  stroke="none"
                />
                <rect
                  x="19.5"
                  y="3"
                  width="2"
                  height="4"
                  rx="1"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
            </span>
          </div>
        )}
        {children}
        {/* home indicator */}
        <span
          aria-hidden
          className="absolute start-1/2 bottom-2 z-10 h-1 w-24 -translate-x-1/2 rounded-full bg-ink-900/70 rtl:translate-x-1/2"
        />
      </div>
    </div>
  );
}
