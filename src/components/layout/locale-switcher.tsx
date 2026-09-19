"use client";

import { useTransition } from "react";

import { motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";

import { usePathname, useRouter } from "@/i18n/navigation";
import { localeLabel, routing, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

interface LocaleSwitcherProps {
  className?: string;
  onDark?: boolean;
}

/** EN | AR segmented toggle with a sliding highlight. */
export function LocaleSwitcher({ className, onDark }: LocaleSwitcherProps) {
  const locale = useLocale();
  const t = useTranslations("common");
  const router = useRouter();
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();

  const switchTo = (next: Locale) => {
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <div
      role="radiogroup"
      aria-label={t("switchLanguage")}
      className={cn(
        "relative inline-flex h-8 items-center rounded-full border p-0.5 font-sans text-[11px] font-semibold tracking-wide uppercase",
        onDark ? "border-white/15 bg-white/5" : "border-ink-200 bg-ink-50",
        pending && "opacity-70",
        className,
      )}
    >
      {routing.locales.map((l) => {
        const active = l === locale;
        return (
          <button
            key={l}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => switchTo(l)}
            className={cn(
              "relative z-10 h-full rounded-full px-2.5 transition-colors",
              active
                ? onDark
                  ? "text-brand-950"
                  : "text-white"
                : onDark
                  ? "text-white/60"
                  : "text-ink-500",
            )}
          >
            {active && (
              <motion.span
                layoutId="locale-pill"
                className={cn(
                  "absolute inset-0 -z-10 rounded-full",
                  onDark ? "bg-gold-500" : "bg-brand-800",
                )}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            {localeLabel[l]}
          </button>
        );
      })}
    </div>
  );
}
