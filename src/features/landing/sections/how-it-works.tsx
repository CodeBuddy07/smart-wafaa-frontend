import { Fingerprint, ShieldCheck, WifiOff } from "lucide-react";
import { useTranslations } from "next-intl";

import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui";
import { sectionIds } from "@/config/site";
import { StepOrbit } from "@/features/landing/components/how-it-works/step-orbit";
import { SectionHeading } from "@/features/landing/components/section-heading";
import type { Step, StepScreen } from "@/features/landing/content";

const TRUST_ICONS = [ShieldCheck, WifiOff, Fingerprint] as const;

export function HowItWorks() {
  const t = useTranslations("howItWorks");
  const steps = t.raw("steps") as Step[];
  const screens = t.raw("phone.screens") as StepScreen[];
  const trust = t.raw("trust") as string[];

  return (
    <section
      id={sectionIds.howItWorks}
      className="relative scroll-mt-28 overflow-hidden bg-white py-20 sm:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(60%_60%_at_50%_0%,rgb(220_252_231/0.6),transparent_70%)]"
      />
      <Container className="relative">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
          eyebrowDot
          size="lg"
        />

        <StepOrbit steps={steps} screens={screens} />

        <Reveal className="mt-16 border-t border-ink-100 pt-8" delay={0.1}>
          <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-[13px] font-medium text-ink-600">
            {trust.map((label, i) => {
              const Icon = TRUST_ICONS[i] ?? ShieldCheck;
              return (
                <li key={label} className="inline-flex items-center gap-2">
                  <Icon className="size-4 text-brand-700" />
                  {label}
                </li>
              );
            })}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
