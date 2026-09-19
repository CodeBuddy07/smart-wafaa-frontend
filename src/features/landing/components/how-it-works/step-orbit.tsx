"use client";

import { useRef } from "react";

import Image from "next/image";

import { ArrowDown, ArrowUp, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";

import { StepCard } from "@/features/landing/components/how-it-works/step-card";
import { StepPhone } from "@/features/landing/components/how-it-works/step-phone";
import { StepStepper } from "@/features/landing/components/how-it-works/step-stepper";
import type { Step, StepScreen } from "@/features/landing/content";
import { useAutoAdvance } from "@/features/landing/hooks/use-auto-advance";
import { localeDirection } from "@/i18n/routing";
import { cn, mod } from "@/lib/utils";

const INTERVAL = 5200;

/**
 * Ring slots around the phone, in % of the stage. Slot 0 is the focused
 * position (top-start). A card sits in slot `(index - active) mod 5`, so
 * selecting a step rotates the whole ring until that card lands in slot 0.
 */
interface Slot {
  left: string;
  top: string;
  x: string;
  scale: number;
  opacity: number;
  z: number;
  compact?: boolean;
}

const FALLBACK_SLOT: Slot = { left: "0%", top: "0%", x: "0%", scale: 1, opacity: 1, z: 30 };

const SLOTS_LTR: Slot[] = [
  { left: "0%", top: "0%", x: "0%", scale: 1, opacity: 1, z: 30 },
  { left: "0%", top: "56%", x: "0%", scale: 0.94, opacity: 0.92, z: 20 },
  { left: "50%", top: "70%", x: "-50%", scale: 0.94, opacity: 0.95, z: 40, compact: true },
  { left: "100%", top: "56%", x: "-100%", scale: 0.94, opacity: 0.92, z: 20 },
  { left: "100%", top: "0%", x: "-100%", scale: 0.94, opacity: 0.92, z: 20 },
];

/** Mirror the ring for RTL so "start" is on the right. */
const SLOTS_RTL: Slot[] = SLOTS_LTR.map((s) => ({
  ...s,
  left: s.left === "0%" ? "100%" : s.left === "100%" ? "0%" : s.left,
  x: s.x === "0%" ? "-100%" : s.x === "-100%" ? "0%" : s.x,
}));

interface StepOrbitProps {
  steps: Step[];
  screens: StepScreen[];
}

export function StepOrbit({ steps, screens }: StepOrbitProps) {
  const t = useTranslations("common");
  const locale = useLocale();
  const rtl = localeDirection[locale] === "rtl";
  const slots = rtl ? SLOTS_RTL : SLOTS_LTR;

  const stageRef = useRef<HTMLDivElement>(null);
  const inView = useInView(stageRef, { margin: "-15% 0px -15% 0px" });
  const reduceMotion = useReducedMotion();

  const { active, select, next, prev, running, cycle, setHovering } = useAutoAdvance({
    count: steps.length,
    interval: INTERVAL,
    enabled: inView && !reduceMotion,
  });

  const activeStep = steps[active] ?? steps[0];
  // The right connector sits between slot 3 (bottom-end) and slot 4 (top-end) and
  // points up, so it carries the "next" label of the card in slot 3.
  const bottomEndStep = steps[mod(active + 3, steps.length)] ?? steps[0];

  return (
    <div className="mt-10">
      <StepStepper
        steps={steps}
        active={active}
        onSelect={select}
        running={running}
        cycle={cycle}
        interval={INTERVAL}
      />

      {/* ------------------------------------------------------------ desktop stage */}
      <div
        ref={stageRef}
        onPointerEnter={() => setHovering(true)}
        onPointerLeave={() => setHovering(false)}
        className="relative mt-12 hidden h-[760px] lg:block"
      >
        {/* orbit rings */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-start justify-center"
        >
          <motion.div
            className="ring-dotted motion-ok:animate-spin-slow absolute top-[6%] size-[540px]"
            animate={{ rotate: active * 72 }}
            transition={{ type: "spring", stiffness: 40, damping: 18 }}
          />
          <motion.div
            className="ring-dotted-gold absolute top-[-4%] size-[680px]"
            animate={{ rotate: -active * 72 }}
            transition={{ type: "spring", stiffness: 30, damping: 18 }}
          />
          <span className="absolute start-1/2 top-[-4%] size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-500 shadow-[0_0_0_6px_rgb(212_175_55/0.2)] rtl:translate-x-1/2" />
          <span className="absolute start-[17%] top-[50%] size-2.5 rounded-full bg-brand-400 shadow-[0_0_0_6px_rgb(74_222_128/0.2)]" />
        </div>

        {/* hand + phone */}
        <div className="pointer-events-none absolute start-1/2 top-[3%] z-10 -translate-x-1/2 rtl:translate-x-1/2">
          <PhoneScene active={active} screens={screens} />
        </div>

        {/* connectors */}
        <Connector
          className="absolute start-[7%] top-[47%] z-30"
          icon={<ArrowDown className="size-3" />}
          label={t("next", { label: activeStep?.next ?? "" })}
        />
        <Connector
          className="absolute end-[7%] top-[47%] z-30"
          icon={<ArrowUp className="size-3" />}
          label={t("next", { label: bottomEndStep?.next ?? "" })}
          gold
        />

        {/* cards */}
        {steps.map((step, i) => {
          const slotIndex = mod(i - active, steps.length);
          const slot = slots[slotIndex] ?? FALLBACK_SLOT;
          const focused = slotIndex === 0;
          return (
            <motion.div
              key={step.title}
              className="absolute w-[320px] will-change-transform"
              initial={false}
              animate={{
                left: slot.left,
                top: slot.top,
                x: slot.x,
                scale: slot.scale,
                opacity: slot.opacity,
                zIndex: slot.z,
              }}
              transition={{ type: "spring", stiffness: 110, damping: 20, mass: 0.9 }}
              style={{ width: slot.compact ? 360 : 320 }}
            >
              <StepCard
                step={step}
                index={i}
                total={steps.length}
                focused={focused}
                compact={slot.compact}
                onSelect={() => select(i)}
              />
            </motion.div>
          );
        })}
      </div>

      {/* ------------------------------------------------------------ mobile / tablet */}
      <div className="mt-10 lg:hidden">
        <div className="relative mx-auto w-fit">
          <PhoneScene active={active} screens={screens} compact />
        </div>

        <div className="relative mt-8">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              initial={{ opacity: 0, x: rtl ? -40 : 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: rtl ? 40 : -40 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {activeStep && (
                <StepCard
                  step={activeStep}
                  index={active}
                  total={steps.length}
                  focused
                  onSelect={() => select(active)}
                />
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-5 flex items-center justify-between">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous step"
              className="inline-flex size-10 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-700 shadow-card hover:border-brand-300"
            >
              <ChevronLeft className="size-4 rtl:-scale-x-100" />
            </button>
            <div className="flex items-center gap-1.5">
              {steps.map((s, i) => (
                <button
                  key={s.title}
                  type="button"
                  aria-label={t("stepShort", { n: i + 1 })}
                  aria-current={i === active}
                  onClick={() => select(i)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    i === active ? "w-6 bg-brand-800" : "w-1.5 bg-ink-300",
                  )}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={next}
              aria-label="Next step"
              className="inline-flex size-10 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-700 shadow-card hover:border-brand-300"
            >
              <ChevronRight className="size-4 rtl:-scale-x-100" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

interface ConnectorProps {
  icon: React.ReactNode;
  label: string;
  gold?: boolean;
  className?: string;
}

function Connector({ icon, label, gold, className }: ConnectorProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={label}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "glass pointer-events-none inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-sans text-[11px] font-bold",
          gold ? "border-gold-300 text-accent-amber" : "border-brand-200 text-brand-800",
          className,
        )}
      >
        {icon}
        {label}
      </motion.span>
    </AnimatePresence>
  );
}

/* -------------------------------------------------------------------------- */

interface PhoneSceneProps {
  active: number;
  screens: StepScreen[];
  compact?: boolean;
}

/**
 * Photo geometry of `hand-phone.webp` (1200×1406): the phone in the photo spans
 * 32.6%→68% of the width and 9.4%→76.6% of the height. We scale the photo so its
 * phone sits just inside our CSS phone frame, which is drawn on top of it.
 */
const HAND = {
  w: 1200,
  h: 1406,
  phoneWidthRatio: 0.353,
  phoneTopRatio: 0.094,
  phoneHeightRatio: 0.672,
} as const;

function handLayout(frameWidth: number) {
  const frameHeight = (frameWidth * 19.2) / 9; // PhoneFrame aspect
  const width = Math.round((frameWidth - 14) / HAND.phoneWidthRatio); // photo phone 14px narrower than frame
  const height = Math.round((width * HAND.h) / HAND.w);
  const photoPhoneTop = HAND.phoneTopRatio * height;
  const photoPhoneHeight = HAND.phoneHeightRatio * height;
  const frameTop = 24; // pt-6 on the frame wrapper
  const top = Math.round(frameTop + (frameHeight - photoPhoneHeight) / 2 - photoPhoneTop);
  return { width, height, top };
}

/**
 * Wooden mannequin hand (photo) holding the interactive phone. The hand image
 * sits behind the CSS phone; its backdrop is keyed to transparency at build time.
 */
function PhoneScene({ active, screens, compact }: PhoneSceneProps) {
  const frameWidth = compact ? 220 : 250;
  const hand = handLayout(frameWidth);

  return (
    <div className={cn("relative", compact ? "w-[300px]" : "w-[420px]")}>
      <Image
        src="/images/how-it-works/hand-phone.webp"
        alt=""
        aria-hidden
        width={HAND.w}
        height={HAND.h}
        sizes={`${hand.width}px`}
        draggable={false}
        className="pointer-events-none absolute start-1/2 max-w-none -translate-x-1/2 [mask-image:linear-gradient(to_bottom,black_78%,transparent_100%)] select-none rtl:translate-x-1/2 rtl:-scale-x-100"
        style={{ width: hand.width, height: hand.height, top: hand.top }}
      />
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ type: "spring", stiffness: 90, damping: 18 }}
        className="relative pt-6"
      >
        <StepPhone
          active={active}
          screens={screens}
          className={compact ? "w-[220px]" : "w-[250px]"}
        />
      </motion.div>
    </div>
  );
}
