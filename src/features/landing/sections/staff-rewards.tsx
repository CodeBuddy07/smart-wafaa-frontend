"use client";

import { useCallback, useState } from "react";

import { CheckCircle2, Gift, Plus, Stamp } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";

import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Badge, Button, Container } from "@/components/ui";
import { sectionIds } from "@/config/site";
import { SectionHeading } from "@/features/landing/components/section-heading";
import { cn } from "@/lib/utils";

const TOTAL_STAMPS = 5;
const INITIAL_STAMPS = 3;
const INITIAL_VISITS = 9;

export function StaffRewards() {
  const t = useTranslations("staff");
  const checklist = t.raw("checklist") as string[];

  return (
    <section id={sectionIds.staff} className="scroll-mt-28 bg-white py-20 sm:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <SectionHeading
              align="start"
              eyebrow={t("eyebrow")}
              title={t("title")}
              description={t("description")}
            />
            <Stagger className="mt-8 flex flex-col gap-3.5" gap={0.1} delay={0.2}>
              {checklist.map((line) => (
                <StaggerItem key={line} distance={12}>
                  <p className="flex items-start gap-3 text-[14.5px] text-ink-700">
                    <CheckCircle2 className="mt-0.5 size-[18px] shrink-0 text-brand-600" />
                    {line}
                  </p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <Reveal from="right" distance={40}>
            <TerminalCard />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

/** Playable staff terminal: add stamps, redeem at 10, watch the log fill. */
function TerminalCard() {
  const t = useTranslations("staff");
  const [stamps, setStamps] = useState(INITIAL_STAMPS);
  const [visits, setVisits] = useState(INITIAL_VISITS);
  const [log, setLog] = useState<string[]>([]);
  const [burst, setBurst] = useState(0);
  const canRedeem = stamps >= TOTAL_STAMPS;

  const pushLog = useCallback((line: string) => setLog((l) => [line, ...l].slice(0, 3)), []);

  const addStamp = () => {
    if (canRedeem) return;
    setStamps((s) => s + 1);
    setVisits((v) => v + 1);
    pushLog(t("terminal.logged"));
  };

  const redeem = () => {
    if (!canRedeem) return;
    setBurst((b) => b + 1);
    setStamps(0);
    pushLog(t("terminal.redeemed"));
  };

  return (
    <div className="relative rounded-[24px] border border-ink-200/70 bg-surface-subtle p-3 shadow-[0_40px_80px_-40px_rgb(15_23_42/0.35)] sm:p-4">
      {/* header */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-2 py-2 font-sans text-[11px] font-semibold tracking-[0.12em] text-ink-700 uppercase">
        <span className="inline-flex items-center gap-2">
          <span className="relative flex size-2">
            <span className="motion-ok:animate-pulse-ring absolute inline-flex size-full rounded-full bg-accent-live" />
            <span className="relative inline-flex size-2 rounded-full bg-accent-live" />
          </span>
          {t("terminal.title")}
        </span>
        <span className="tracking-normal text-ink-400 normal-case">{t("terminal.staff")}</span>
      </div>

      {/* customer */}
      <div className="mt-2 rounded-2xl border border-ink-200/70 bg-white p-4">
        <div className="flex items-center gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-800 font-display text-[13px] font-bold text-white">
            FA
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-[15px] font-bold text-ink-900">
              {t("terminal.customer")}
            </p>
            <p className="text-[12px] text-ink-500">
              {t("terminal.phone")} • {t("terminal.visits", { count: visits })}
            </p>
          </div>
          <Badge tone="gold" size="md" className="tracking-normal normal-case">
            {t("terminal.tier")}
          </Badge>
        </div>

        {/* stamp grid */}
        <div className="mt-4 flex items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            {Array.from({ length: TOTAL_STAMPS }).map((_, i) => {
              const filled = i < stamps;
              return (
                <motion.span
                  key={i}
                  initial={false}
                  animate={
                    filled
                      ? { scale: [1, 1.35, 1], backgroundColor: "#0F4C3A" }
                      : { scale: 1, backgroundColor: "#E2E8F0" }
                  }
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="flex size-6 items-center justify-center rounded-md"
                >
                  <Stamp className={cn("size-3.5", filled ? "text-white" : "text-ink-400")} />
                </motion.span>
              );
            })}
          </div>
          <p className="shrink-0 text-[11px] font-semibold text-ink-500">
            {t("terminal.stamps", { count: stamps, total: TOTAL_STAMPS })}
          </p>
        </div>
      </div>

      {/* actions */}
      <div className="relative mt-3 grid gap-3 sm:grid-cols-2">
        <Button size="lg" onClick={addStamp} disabled={canRedeem} className="rounded-2xl">
          <Plus className="size-4" />
          {t("terminal.addStamp")}
        </Button>
        <Button
          size="lg"
          variant="secondary"
          onClick={redeem}
          disabled={!canRedeem}
          className={cn(
            "relative rounded-2xl",
            canRedeem &&
              "bg-gold-100 text-accent-amber shadow-glow-gold ring-2 ring-gold-400 hover:bg-gold-200",
          )}
        >
          <Gift className={cn("size-4", canRedeem && "motion-ok:animate-bounce")} />
          {t("terminal.redeem")}
        </Button>

        {/* confetti burst */}
        <AnimatePresence>
          {burst > 0 && (
            <motion.div
              key={burst}
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
              aria-hidden
            >
              {Array.from({ length: 14 }).map((_, i) => {
                const angle = (i / 14) * Math.PI * 2;
                const dist = 90 + (i % 3) * 30;
                return (
                  <motion.span
                    key={i}
                    initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                    animate={{
                      x: Math.cos(angle) * dist,
                      y: Math.sin(angle) * dist,
                      scale: [0, 1.2, 0.8],
                      opacity: [1, 1, 0],
                    }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className={cn(
                      "absolute size-2.5 rounded-sm",
                      i % 3 === 0
                        ? "bg-gold-500"
                        : i % 3 === 1
                          ? "bg-brand-500"
                          : "bg-accent-purple",
                    )}
                  />
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* activity log */}
      <div className="mt-3 min-h-[38px] px-2">
        <AnimatePresence initial={false}>
          {log.map((line, i) => (
            <motion.p
              key={`${line}-${log.length - i}`}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1 - i * 0.35, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 py-0.5 text-[11px] text-ink-500"
            >
              <span className="size-1.5 rounded-full bg-brand-500" />
              {line}
            </motion.p>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
