"use client";

import { useState } from "react";

import {
  ArrowLeft,
  BadgeCheck,
  ChevronRight,
  EllipsisVertical,
  KeyRound,
  Send,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";

import {
  BoutiqueLoyaltyCard,
  CoffeeStampPass,
  type AppleCopy,
  type GoogleCopy,
} from "@/components/mockups/pass-presets";
import { PhoneFrame } from "@/components/mockups/phone-frame";
import { Reveal } from "@/components/motion/reveal";
import { Badge, Container } from "@/components/ui";
import { sectionIds } from "@/config/site";
import { SectionHeading } from "@/features/landing/components/section-heading";
import type { WalletNote } from "@/features/landing/content";
import { cn } from "@/lib/utils";

type Platform = "apple" | "google";

/** Callout anchor positions (% of the pass box) for the numbered notes. */
const CALLOUTS: Record<Platform, Array<{ top: string; start: string }>> = {
  apple: [
    { top: "5%", start: "4%" },
    { top: "5%", start: "82%" },
    { top: "36%", start: "84%" },
    { top: "52%", start: "4%" },
    { top: "80%", start: "70%" },
  ],
  google: [
    { top: "5%", start: "4%" },
    { top: "7%", start: "90%" },
    { top: "25%", start: "78%" },
    { top: "52%", start: "72%" },
    { top: "88%", start: "8%" },
  ],
};

const CHIP_ICONS = [KeyRound, BadgeCheck, Send] as const;

/**
 * "Your card, exactly as customers will see it" — the same programme rendered
 * inside real Apple Wallet / Google Wallet chrome, with numbered spec callouts.
 */
export function WalletPreview() {
  const t = useTranslations("walletPreview");
  const th = useTranslations("hero");
  const [platform, setPlatform] = useState<Platform>("apple");
  const [hovered, setHovered] = useState<number | null>(null);

  const cards = th.raw("cards") as { apple: AppleCopy; google: GoogleCopy };
  const notes = t.raw(platform === "apple" ? "appleNotes" : "googleNotes") as WalletNote[];
  const chips = t.raw("chips") as string[];

  return (
    <section
      id={sectionIds.wallet}
      className="relative scroll-mt-28 overflow-hidden bg-white py-20 sm:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[420px] bg-[radial-gradient(60%_70%_at_50%_100%,rgb(220_252_231/0.55),transparent_70%)]"
      />
      <Container className="relative">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />

        {/* platform toggle */}
        <Reveal className="mt-8 flex justify-center" delay={0.1}>
          <div
            role="tablist"
            aria-label="Wallet platform"
            className="glass inline-flex items-center rounded-full p-1 font-sans text-[13px] font-semibold"
          >
            {(["apple", "google"] as Platform[]).map((p) => {
              const active = platform === p;
              return (
                <button
                  key={p}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setPlatform(p)}
                  className={cn(
                    "relative z-10 inline-flex h-9 items-center gap-2 rounded-full px-4 transition-colors",
                    active ? "text-white" : "text-ink-600 hover:text-ink-900",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="wallet-platform-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-ink-950"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {p === "apple" ? (
                    <AppleGlyph className="size-3.5" />
                  ) : (
                    <GoogleGlyph className="size-3.5" />
                  )}
                  {t(p)}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-12 grid items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          {/* phone */}
          <Reveal from="left" distance={40} className="flex justify-center lg:justify-end">
            <PhoneFrame
              className="w-[268px]"
              time="9:41"
              platform={platform === "apple" ? "ios" : "android"}
            >
              <div
                className={cn(
                  "flex h-full flex-col pt-11",
                  platform === "apple" ? "bg-[#f2f2f7]" : "bg-[#f8f9fa]",
                )}
              >
                {/* wallet app chrome */}
                {platform === "apple" ? (
                  <div className="flex items-center justify-between px-4 pb-2">
                    <p className="font-display text-[19px] font-bold text-[#1c1c1e]">
                      {t("walletHeaderApple")}
                    </p>
                    <span className="text-[14px] font-semibold text-[#0a84ff]">
                      {t("walletDone")}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center justify-between px-3 pb-2 text-[#1f1f1f]">
                    <ArrowLeft className="size-4 rtl:-scale-x-100" />
                    <p className="text-[14px] font-medium">{t("walletHeaderGoogle")}</p>
                    <EllipsisVertical className="size-4" />
                  </div>
                )}

                {/* pass */}
                <div className="relative px-2.5 pt-1">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={platform}
                      initial={{ opacity: 0, y: 16, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -12, scale: 0.98 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="relative"
                    >
                      {platform === "apple" ? (
                        <CoffeeStampPass copy={cards.apple} width={227} />
                      ) : (
                        <BoutiqueLoyaltyCard copy={cards.google} width={227} />
                      )}
                      {/* numbered callouts */}
                      {CALLOUTS[platform].map((pos, i) => (
                        <motion.span
                          key={`${platform}-${i}`}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{
                            delay: 0.25 + i * 0.06,
                            type: "spring",
                            stiffness: 300,
                            damping: 18,
                          }}
                          className={cn(
                            "absolute z-10 flex size-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white font-sans text-[10px] font-bold shadow transition-[transform,background-color] duration-300 rtl:translate-x-1/2",
                            hovered === i
                              ? "scale-125 bg-gold-500 text-brand-950"
                              : "bg-brand-800 text-white",
                          )}
                          style={{ top: pos.top, insetInlineStart: pos.start }}
                          aria-hidden
                        >
                          {i + 1}
                        </motion.span>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* below-pass wallet UI — the settings rows both wallets show under a pass */}
                <div className="mx-2.5 mt-3 overflow-hidden rounded-[9px] bg-white text-[11px] text-ink-800 shadow-[0_1px_2px_rgb(0_0_0/0.05)]">
                  {(t.raw(platform === "apple" ? "appleRows" : "googleRows") as string[]).map(
                    (row, i) => (
                      <div
                        key={row}
                        className={cn(
                          "flex items-center justify-between px-3 py-2.5",
                          i > 0 && "border-t border-ink-100",
                        )}
                      >
                        <span>{row}</span>
                        {platform === "apple" && i < 2 ? (
                          <span className="flex h-4 w-7 items-center justify-end rounded-full bg-[#34c759] p-0.5">
                            <span className="size-3 rounded-full bg-white" />
                          </span>
                        ) : (
                          <ChevronRight className="size-3.5 text-ink-300 rtl:-scale-x-100" />
                        )}
                      </div>
                    ),
                  )}
                </div>
              </div>
            </PhoneFrame>
          </Reveal>

          {/* notes */}
          <div>
            <Reveal>
              <Badge tone="outline" className="tracking-normal normal-case">
                {t(platform === "apple" ? "appleTitle" : "googleTitle")}
              </Badge>
            </Reveal>
            <AnimatePresence mode="wait" initial={false}>
              <motion.ol
                key={platform}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="mt-5 flex flex-col divide-y divide-ink-100"
                onMouseLeave={() => setHovered(null)}
              >
                {notes.map((n, i) => (
                  <li
                    key={n.title}
                    onMouseEnter={() => setHovered(i)}
                    onFocus={() => setHovered(i)}
                    className={cn(
                      "group flex gap-4 rounded-xl px-3 py-3.5 transition-colors",
                      hovered === i && "bg-brand-50/70",
                    )}
                  >
                    <span
                      className={cn(
                        "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full font-sans text-[11px] font-bold transition-colors",
                        hovered === i ? "bg-gold-500 text-brand-950" : "bg-brand-800 text-white",
                      )}
                    >
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-display text-[15px] font-bold text-ink-900">{n.title}</p>
                      <p className="mt-1 text-[13.5px] leading-relaxed text-ink-500">{n.body}</p>
                    </div>
                  </li>
                ))}
              </motion.ol>
            </AnimatePresence>

            <Reveal className="mt-6 flex flex-wrap gap-2" delay={0.15}>
              {chips.map((chip, i) => {
                const Icon = CHIP_ICONS[i] ?? BadgeCheck;
                return (
                  <span
                    key={chip}
                    className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 bg-white px-3 py-1.5 text-[12px] font-medium text-ink-700"
                  >
                    <Icon className="size-3.5 text-brand-700" />
                    {chip}
                  </span>
                );
              })}
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

function AppleGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M16.37 12.63c-.02-2.23 1.82-3.3 1.9-3.35-1.04-1.52-2.65-1.73-3.22-1.75-1.37-.14-2.68.81-3.37.81-.7 0-1.77-.79-2.9-.77-1.49.02-2.87.87-3.64 2.2-1.55 2.69-.4 6.67 1.11 8.85.74 1.07 1.62 2.27 2.77 2.23 1.11-.05 1.53-.72 2.88-.72 1.34 0 1.72.72 2.9.7 1.2-.02 1.96-1.09 2.69-2.17.85-1.24 1.2-2.45 1.22-2.51-.03-.01-2.34-.9-2.34-3.52zM14.16 6.08c.61-.74 1.02-1.77.91-2.8-.88.04-1.94.59-2.57 1.33-.56.65-1.06 1.7-.93 2.7.98.08 1.98-.5 2.59-1.23z" />
    </svg>
  );
}

function GoogleGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <path
        fill="#4285F4"
        d="M21.6 12.23c0-.68-.06-1.33-.17-1.96H12v3.7h5.38a4.6 4.6 0 0 1-2 3.02v2.5h3.24c1.9-1.75 2.98-4.32 2.98-7.26z"
      />
      <path
        fill="#34A853"
        d="M12 22c2.7 0 4.96-.9 6.62-2.42l-3.24-2.5c-.9.6-2.04.96-3.38.96-2.6 0-4.8-1.76-5.59-4.12H3.07v2.58A10 10 0 0 0 12 22z"
      />
      <path
        fill="#FBBC05"
        d="M6.41 13.92A6 6 0 0 1 6.1 12c0-.67.11-1.31.31-1.92V7.5H3.07A10 10 0 0 0 2 12c0 1.61.39 3.14 1.07 4.5l3.34-2.58z"
      />
      <path
        fill="#EA4335"
        d="M12 5.96c1.47 0 2.79.5 3.83 1.5l2.87-2.87A9.98 9.98 0 0 0 12 2 10 10 0 0 0 3.07 7.5l3.34 2.58C7.2 7.72 9.4 5.96 12 5.96z"
      />
    </svg>
  );
}
