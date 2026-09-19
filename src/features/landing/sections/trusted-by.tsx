import { useTranslations } from "next-intl";

import { Marquee } from "@/components/motion/marquee";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui";

export function TrustedBy() {
  const t = useTranslations("trusted");
  const logos = t.raw("logos") as string[];

  return (
    <section aria-label={t("eyebrow")} className="border-y border-ink-100 bg-white py-14">
      <Container>
        <Reveal>
          <p className="text-center font-sans text-[11px] font-semibold tracking-[0.2em] text-ink-400 uppercase">
            {t("eyebrow")}
          </p>
        </Reveal>
        <Reveal className="mt-8" delay={0.1}>
          <Marquee duration={36}>
            {logos.map((name) => (
              <span
                key={name}
                className="font-display text-[22px] font-bold tracking-tight text-ink-300 transition-colors duration-300 hover:text-brand-800 sm:text-[24px]"
              >
                {name}
              </span>
            ))}
          </Marquee>
        </Reveal>
      </Container>
    </section>
  );
}
