"use client";

import { useState } from "react";

import { Check } from "lucide-react";
import { motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";

import { AnimatedNumber } from "@/components/motion/animated-number";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Badge, Button, Container, type ButtonProps } from "@/components/ui";
import { sectionIds, siteConfig } from "@/config/site";
import { SectionHeading } from "@/features/landing/components/section-heading";
import { HIGHLIGHTED_PLAN_INDEX, PLAN_PRICES, type Plan } from "@/features/landing/content";
import { Link } from "@/i18n/navigation";
import { cn, formatPrice } from "@/lib/utils";

type Billing = "monthly" | "yearly";

const CTA_VARIANTS: Array<NonNullable<ButtonProps["variant"]>> = [
  "secondary",
  "primary",
  "secondary",
  "dark",
];

export function Pricing() {
  const t = useTranslations("pricing");
  const locale = useLocale();
  const plans = t.raw("plans") as Plan[];
  const [billing, setBilling] = useState<Billing>("monthly");

  return (
    <section id={sectionIds.pricing} className="scroll-mt-28 bg-surface-subtle py-20 sm:py-28">
      <Container size="wide">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />

        {/* billing toggle */}
        <Reveal className="mt-8 flex justify-center" delay={0.1}>
          <div
            role="radiogroup"
            aria-label={`${t("monthly")} / ${t("yearly")}`}
            className="relative inline-flex items-center rounded-full border border-ink-200 bg-white p-1 font-sans text-[13px] font-semibold shadow-card"
          >
            {(["monthly", "yearly"] as Billing[]).map((b) => {
              const active = billing === b;
              return (
                <button
                  key={b}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setBilling(b)}
                  className={cn(
                    "relative z-10 inline-flex h-9 items-center gap-2 rounded-full px-4 transition-colors",
                    active ? "text-white" : "text-ink-600 hover:text-ink-900",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="billing-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-brand-800 shadow-glow-brand"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {t(b)}
                  {b === "yearly" && (
                    <span
                      className={cn(
                        "rounded-full px-1.5 py-0.5 text-[10px]",
                        active ? "bg-white/15 text-white" : "bg-brand-50 text-brand-800",
                      )}
                    >
                      {t("yearlySave")}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </Reveal>

        <Stagger className="mt-12 grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-4" gap={0.1}>
          {plans.map((plan, i) => {
            const highlighted = i === HIGHLIGHTED_PLAN_INDEX;
            const price = PLAN_PRICES[i] ?? PLAN_PRICES[0];
            const amount = price[billing];
            return (
              <StaggerItem key={plan.name} className="h-full">
                <article
                  className={cn(
                    "relative flex h-full flex-col rounded-[22px] border bg-white p-6 transition-[transform,box-shadow] duration-500 ease-out-expo",
                    highlighted
                      ? "border-brand-200 bg-[linear-gradient(180deg,#f2faf4_0%,#fffdf5_100%)] shadow-[0_0_0_6px_rgb(187_247_208/0.35),0_30px_60px_-30px_rgb(6_78_59/0.45)] xl:-translate-y-2"
                      : "border-ink-200/70 shadow-card hover:-translate-y-1 hover:shadow-card-hover",
                  )}
                >
                  {highlighted && (
                    <Badge
                      tone="goldSolid"
                      className="absolute start-1/2 -top-3 -translate-x-1/2 rtl:translate-x-1/2"
                    >
                      {t("mostPopular")}
                    </Badge>
                  )}

                  <p
                    className={cn(
                      "font-sans text-[11px] font-bold tracking-[0.16em] uppercase",
                      highlighted ? "text-brand-800" : "text-ink-400",
                    )}
                  >
                    {plan.name}
                  </p>

                  <div className="mt-4 flex items-baseline gap-1.5">
                    {amount === null ? (
                      <span className="font-display text-[34px] leading-none font-extrabold text-ink-900">
                        {t("custom")}
                      </span>
                    ) : (
                      <>
                        <span className="font-display text-[34px] leading-none font-extrabold tracking-tight text-ink-900">
                          <AnimatedNumber
                            value={amount}
                            format={(n) => formatPrice(Math.round(n), locale)}
                            duration={0.5}
                          />
                        </span>
                        <span className="text-[12px] text-ink-400">{t("perMonth")}</span>
                      </>
                    )}
                  </div>
                  {amount !== null && (
                    <p
                      className={cn(
                        "mt-1 h-4 text-[11px] text-ink-400 transition-opacity",
                        billing === "yearly" ? "opacity-100" : "opacity-0",
                      )}
                    >
                      {t("billedYearly")}
                    </p>
                  )}

                  <p className="mt-3 text-[13px] leading-relaxed text-ink-500">
                    {plan.description}
                  </p>

                  <div className="my-6 h-px bg-ink-100" />

                  <ul className="flex flex-1 flex-col gap-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-[13px] text-ink-700">
                        <Check
                          className="mt-0.5 size-3.5 shrink-0 text-brand-600"
                          strokeWidth={2.5}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Button
                    asChild
                    variant={CTA_VARIANTS[i] ?? "secondary"}
                    size="md"
                    className="mt-8 w-full"
                  >
                    <Link
                      href={
                        i === plans.length - 1 ? siteConfig.links.contact : siteConfig.links.signup
                      }
                    >
                      {plan.cta}
                    </Link>
                  </Button>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal className="mt-6 text-center text-[12px] text-ink-400" delay={0.2}>
          <p>{t("vatNote")}</p>
        </Reveal>
      </Container>
    </section>
  );
}
