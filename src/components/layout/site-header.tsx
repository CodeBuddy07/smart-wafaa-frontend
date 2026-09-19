"use client";

import { useEffect, useState } from "react";

import { ArrowUpRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useTranslations } from "next-intl";

import { Logo } from "@/components/brand/logo";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { Button, Container } from "@/components/ui";
import { sectionIds, siteConfig } from "@/config/site";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const NAV = [
  { key: "features", href: `#${sectionIds.features}` },
  { key: "howItWorks", href: `#${sectionIds.howItWorks}` },
  { key: "cardProgramme", href: `#${sectionIds.formats}` },
  { key: "pricing", href: `#${sectionIds.pricing}` },
] as const;

/**
 * Floating frosted-glass header (1140px pill, 62px tall in the Figma).
 * Tightens and gains shadow once the page scrolls; tracks the active section.
 */
export function SiteHeader() {
  const t = useTranslations("nav");
  const tc = useTranslations("common");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  // Track which section is in view for the nav highlight.
  useEffect(() => {
    const targets = NAV.map((n) => document.querySelector<HTMLElement>(n.href)).filter(
      Boolean,
    ) as HTMLElement[];
    if (!targets.length) return;
    // Keep the latest ratio per section so we can pick the most visible one
    // (or none) on every change, instead of only reacting to entering entries.
    const ratios = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries)
          ratios.set(`#${e.target.id}`, e.isIntersecting ? e.intersectionRatio : 0);
        const [best] = [...ratios.entries()].sort((a, b) => b[1] - a[1]);
        setActive(best && best[1] > 0 ? best[0] : null);
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0, 0.1, 0.25, 0.5, 0.75] },
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Lock scroll while the mobile menu is open.
  useEffect(() => {
    document.documentElement.classList.toggle("overflow-hidden", open);
    return () => document.documentElement.classList.remove("overflow-hidden");
  }, [open]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-[var(--header-offset)] z-50">
      <Container size="content" className="pointer-events-auto">
        <motion.nav
          aria-label="Primary"
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className={cn(
            "glass glass-refract relative flex h-[var(--header-height)] items-center justify-between rounded-full ps-5 pe-2.5",
            "transition-[box-shadow,background-color] duration-500",
            scrolled ? "bg-white/75 shadow-[0_18px_45px_-12px_rgb(6_78_59/0.2)]" : "",
          )}
        >
          <Link href="/" aria-label={tc("brand")} className="rounded-full">
            <Logo />
          </Link>

          {/* Desktop nav */}
          <ul className="absolute start-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex rtl:translate-x-1/2">
            {NAV.map((item) => {
              const isActive = active === item.href;
              return (
                <li key={item.key}>
                  <a
                    href={item.href}
                    className={cn(
                      "relative rounded-full px-3.5 py-2 font-sans text-[13px] font-medium transition-colors",
                      isActive ? "text-brand-900" : "text-ink-600 hover:text-ink-900",
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-full bg-brand-50"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    {t(item.key)}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <LocaleSwitcher className="hidden sm:inline-flex" />
            <Button
              asChild
              variant="link"
              size="sm"
              className="hidden px-3 text-[13px] text-ink-900 md:inline-flex"
            >
              <Link href={siteConfig.links.login}>{t("login")}</Link>
            </Button>
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <Link href={siteConfig.links.signup}>
                {t("startFreeTrial")}
                <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5 rtl:-scale-x-100" />
              </Link>
            </Button>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? tc("closeMenu") : tc("openMenu")}
              className="inline-flex size-10 items-center justify-center rounded-full text-ink-900 hover:bg-ink-100 lg:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </motion.nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="glass mt-3 rounded-3xl bg-white/85 p-3 shadow-[0_24px_60px_-20px_rgb(6_78_59/0.25)] lg:hidden"
            >
              <ul className="flex flex-col">
                {NAV.map((item, i) => (
                  <motion.li
                    key={item.key}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i + 0.05 }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-2xl px-4 py-3 font-display text-lg font-semibold text-ink-900 hover:bg-brand-50"
                    >
                      {t(item.key)}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-2 flex items-center justify-between gap-3 border-t border-ink-100 px-2 pt-3">
                <LocaleSwitcher />
                <div className="flex items-center gap-2">
                  <Button asChild variant="outline" size="sm">
                    <Link href={siteConfig.links.login}>{t("login")}</Link>
                  </Button>
                  <Button asChild size="sm">
                    <Link href={siteConfig.links.signup}>{t("startFreeTrial")}</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </header>
  );
}
