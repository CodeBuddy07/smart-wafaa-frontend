"use client";

import { useRef } from "react";

import {
  ArrowUpRight,
  BadgeCheck,
  ChevronRight,
  Lock,
  Play,
  Stamp,
  Timer,
  TrendingUp,
} from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useTranslations } from "next-intl";

import {
  BoutiqueLoyaltyCard,
  CoffeeStampPass,
  MembershipPass,
  type AppleCopy,
  type GoogleCopy,
} from "@/components/mockups/pass-presets";
import { Floating } from "@/components/motion/floating";
import { TextReveal } from "@/components/motion/text-reveal";
import { Button, Container } from "@/components/ui";
import { sectionIds, siteConfig } from "@/config/site";
import { Link } from "@/i18n/navigation";

const EASE = [0.16, 1, 0.3, 1] as const;

const TRUST_ICONS = [BadgeCheck, Timer, Lock] as const;

export function Hero() {
  const t = useTranslations("hero");
  const trust = t.raw("trust") as string[];

  return (
    <section
      id={sectionIds.hero}
      className="aurora-bg relative overflow-hidden pt-[calc(var(--header-height)+var(--header-offset)+56px)] pb-8 sm:pb-12"
    >
      {/* soft light blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute start-[-10%] -top-32 size-[520px] rounded-full bg-brand-200/40 blur-3xl"
          animate={{ x: [0, 40, 0], y: [0, 24, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute end-[-8%] top-1/3 size-[460px] rounded-full bg-gold-100/60 blur-3xl"
          animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-8">
          {/* ------------------------------------------------ copy */}
          <div className="relative z-10 max-w-[600px]">
            <motion.a
              href="#features"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
              className="group inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 py-1.5 ps-3 pe-2 font-sans text-[12px] font-semibold text-ink-900 shadow-float backdrop-blur transition hover:bg-white"
            >
              <span className="relative flex size-2">
                <span className="motion-ok:animate-pulse-ring absolute inline-flex size-full rounded-full bg-accent-live" />
                <span className="relative inline-flex size-2 rounded-full bg-accent-live" />
              </span>
              {t("eyebrow")}
              <ChevronRight className="size-3.5 text-ink-400 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100" />
            </motion.a>

            <div className="mt-6">
              <TextReveal
                as="h1"
                text={t("title")}
                delay={0.25}
                className="text-[40px] leading-[1.05] font-extrabold tracking-[-0.025em] text-ink-900 sm:text-[52px] lg:text-display-xl"
              />
              <motion.p
                initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.7 }}
                className="text-gradient-brand mt-1 font-serif text-[42px] leading-[1.05] tracking-[-0.01em] italic sm:text-[56px] lg:text-[66px]"
              >
                {t("accent")}
              </motion.p>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.85 }}
              className="mt-6 max-w-[521px] text-[17px] leading-relaxed text-ink-600 sm:text-lead"
            >
              {t("description")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 1 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Button
                asChild
                size="lg"
                className="h-[46px] ps-5 pe-1.5 text-[13px] tracking-[0.05em] uppercase"
              >
                <Link href={siteConfig.links.signup}>
                  {t("ctaPrimary")}
                  <span className="ms-1.5 inline-flex size-8 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover/button:rotate-45 rtl:-scale-x-100 rtl:group-hover/button:-rotate-45">
                    <ArrowUpRight className="size-4" />
                  </span>
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-[46px] ps-4 pe-1.5 text-[14px]"
              >
                <a href={siteConfig.links.demo}>
                  {t("ctaSecondary")}
                  <span className="ms-1.5 inline-flex size-8 items-center justify-center rounded-full bg-brand-800 text-white ring-4 ring-brand-800/10 transition-transform duration-300 group-hover/button:scale-110">
                    <Play className="size-3.5 fill-current rtl:-scale-x-100" />
                  </span>
                </a>
              </Button>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-ink-900/8 pt-6 text-[12px] font-medium text-ink-600"
            >
              {trust.map((label, i) => {
                const Icon = TRUST_ICONS[i] ?? BadgeCheck;
                return (
                  <li key={label} className="inline-flex items-center gap-1.5">
                    <Icon className="size-3.5 text-brand-700" />
                    {label}
                  </li>
                );
              })}
            </motion.ul>
          </div>

          {/* ------------------------------------------------ visual */}
          <HeroCards />
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

/**
 * Fanned wallet cards with pointer-driven parallax. Cards mount stacked and
 * spring into their fan; the whole group tilts gently toward the cursor.
 */
function HeroCards() {
  const t = useTranslations("hero");
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 120, damping: 18 });

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const cards = t.raw("cards") as { apple: AppleCopy; google: GoogleCopy; membership: AppleCopy };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative mx-auto h-[440px] w-full max-w-[540px] [perspective:1400px] sm:h-[500px] lg:h-[540px]"
    >
      <motion.div
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="relative h-full w-full"
      >
        {/* back-start: Google Wallet loyalty card */}
        <motion.div
          className="absolute start-[2%] top-[6%] will-change-transform"
          initial={{ opacity: 0, rotate: 0, x: 80, y: 40 }}
          animate={{ opacity: 1, rotate: -13, x: 0, y: 0 }}
          transition={{ type: "spring", stiffness: 90, damping: 16, delay: 0.5 }}
          style={{ translateZ: -40 }}
        >
          <Floating amplitude={6} duration={6} delay={0.4}>
            <BoutiqueLoyaltyCard copy={cards.google} width={212} />
          </Floating>
        </motion.div>

        {/* back-end: membership pass */}
        <motion.div
          className="absolute end-[2%] top-[14%] will-change-transform"
          initial={{ opacity: 0, rotate: 0, x: -80, y: 40 }}
          animate={{ opacity: 1, rotate: 12, x: 0, y: 0 }}
          transition={{ type: "spring", stiffness: 90, damping: 16, delay: 0.6 }}
          style={{ translateZ: -20 }}
        >
          <Floating amplitude={7} duration={7} delay={0.9}>
            <MembershipPass copy={cards.membership} width={212} />
          </Floating>
        </motion.div>

        {/* front: Apple Wallet coffee stamps */}
        <motion.div
          className="absolute start-1/2 top-[9%] -translate-x-1/2 will-change-transform rtl:translate-x-1/2"
          initial={{ opacity: 0, rotate: 0, y: 60, scale: 0.9 }}
          animate={{ opacity: 1, rotate: -4, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.4 }}
          style={{ translateZ: 40 }}
        >
          <Floating amplitude={9} duration={5.5}>
            <CoffeeStampPass copy={cards.apple} width={240} />
          </Floating>
        </motion.div>

        {/* badge: stamps */}
        <motion.div
          className="absolute end-0 -top-2 will-change-transform sm:end-[-4%]"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 160, damping: 18, delay: 1.1 }}
          style={{ translateZ: 80 }}
        >
          <Floating amplitude={5} duration={4.5} delay={0.2}>
            <div className="flex items-center gap-3 rounded-2xl border border-white/80 bg-white/90 py-2.5 ps-2.5 pe-4 shadow-[0_18px_40px_-16px_rgb(6_78_59/0.3)] backdrop-blur">
              <span className="flex size-8 items-center justify-center rounded-lg bg-brand-50 text-brand-800">
                <Stamp className="size-4" />
              </span>
              <div className="leading-tight">
                <p className="font-sans text-[12px] font-semibold text-ink-900">
                  {t("stampBadge.title")}
                </p>
                <p className="text-[10.5px] text-ink-500">{t("stampBadge.subtitle")}</p>
              </div>
            </div>
          </Floating>
        </motion.div>

        {/* badge: retention */}
        <motion.div
          className="absolute end-0 -bottom-2 will-change-transform sm:end-[-2%]"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 160, damping: 18, delay: 1.25 }}
          style={{ translateZ: 90 }}
        >
          <Floating amplitude={6} duration={5} delay={1}>
            <div className="flex items-center gap-3 rounded-2xl border border-white/80 bg-white/95 p-3 pe-4 shadow-[0_18px_40px_-16px_rgb(6_78_59/0.3)] backdrop-blur">
              <span className="flex size-9 items-center justify-center rounded-lg bg-brand-50 text-brand-800">
                <TrendingUp className="size-4" />
              </span>
              <div className="leading-tight">
                <p className="text-[9px] font-semibold tracking-[0.14em] text-ink-400 uppercase">
                  {t("retentionBadge.label")}
                </p>
                <p className="mt-0.5 font-display text-[14px] font-bold text-ink-900">
                  {t("retentionBadge.value")}
                </p>
              </div>
              <span className="ms-2 inline-flex items-center gap-1.5 rounded-full bg-brand-100 px-2 py-1 text-[9px] font-bold text-brand-800">
                <span className="size-1.5 rounded-full bg-accent-live" />
                {t("retentionBadge.live")}
              </span>
            </div>
          </Floating>
        </motion.div>
      </motion.div>
    </div>
  );
}
