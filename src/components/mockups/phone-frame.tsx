import { cn } from "@/lib/utils";

interface PhoneFrameProps {
  children: React.ReactNode;
  className?: string;
  /** iOS = Dynamic Island + SF-style status bar; Android = punch-hole camera + Material status bar. */
  platform?: "ios" | "android";
  /** Frame colour. */
  tone?: "black" | "dark";
  /** Show the status bar. */
  statusBar?: boolean;
  time?: string;
}

/**
 * Generic smartphone frame. The screen is a positioned slot — pass any
 * absolutely/relatively laid out content. Radii follow real devices scaled to
 * the frame width (~55pt screen corner on a 393pt iPhone; ~40dp on Pixel).
 */
export function PhoneFrame({
  children,
  className,
  platform = "ios",
  tone = "black",
  statusBar = true,
  time = "12:45",
}: PhoneFrameProps) {
  const ios = platform === "ios";
  return (
    <div
      className={cn(
        "relative aspect-[9/19.2] w-[250px] p-[10px] shadow-[0_40px_80px_-30px_rgb(0_0_0/0.55),inset_0_0_0_1px_rgb(255_255_255/0.08)]",
        ios ? "rounded-[42px]" : "rounded-[34px]",
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

      <div
        className={cn(
          "relative h-full w-full overflow-hidden bg-white",
          ios ? "rounded-[34px]" : "rounded-[26px]",
        )}
      >
        {ios ? (
          <span
            aria-hidden
            className="absolute start-1/2 top-2.5 z-20 h-[22px] w-[74px] -translate-x-1/2 rounded-full bg-black rtl:translate-x-1/2"
          />
        ) : (
          <span
            aria-hidden
            className="absolute start-1/2 top-3 z-20 size-[11px] -translate-x-1/2 rounded-full bg-black ring-2 ring-black/40 rtl:translate-x-1/2"
          />
        )}
        {statusBar && (
          <div
            className={cn(
              "pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between px-6 font-semibold text-ink-900",
              ios ? "pt-3 text-[11px]" : "pt-2.5 text-[10px] font-medium",
            )}
          >
            <span>{time}</span>
            <span className="flex items-center gap-1">
              <svg width="14" height="10" viewBox="0 0 14 10" fill="currentColor" aria-hidden>
                <rect x="0" y="6" width="2.5" height="4" rx="0.5" />
                <rect x="3.8" y="4" width="2.5" height="6" rx="0.5" />
                <rect x="7.6" y="2" width="2.5" height="8" rx="0.5" />
                <rect x="11.4" y="0" width="2.5" height="10" rx="0.5" />
              </svg>
              {ios ? (
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
              ) : (
                <svg width="8" height="12" viewBox="0 0 8 12" fill="currentColor" aria-hidden>
                  <rect x="2.5" y="0" width="3" height="1.5" rx="0.5" />
                  <rect x="0" y="1.5" width="8" height="10.5" rx="1.5" />
                </svg>
              )}
            </span>
          </div>
        )}
        {children}
        {/* home / gesture indicator */}
        <span
          aria-hidden
          className={cn(
            "absolute start-1/2 bottom-2 z-10 h-1 -translate-x-1/2 rounded-full bg-ink-900/70 rtl:translate-x-1/2",
            ios ? "w-24" : "w-16",
          )}
        />
      </div>
    </div>
  );
}
