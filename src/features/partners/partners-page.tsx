import { ArrowRight, Building2, Coins, LayoutDashboard, Presentation } from "lucide-react";
import { useTranslations } from "next-intl";

import { MailtoForm } from "@/components/forms/mailto-form";
import { PageHero } from "@/components/layout/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Badge, Button, Card, Container, IconTile } from "@/components/ui";
import { Link } from "@/i18n/navigation";
import { pad2 } from "@/lib/utils";

const ICONS = [Coins, Building2, LayoutDashboard, Presentation] as const;

interface Item {
  title: string;
  body: string;
}

export function PartnersPage() {
  const t = useTranslations("partners");
  const tc = useTranslations("contact");
  const benefits = t.raw("benefits") as Item[];
  const steps = t.raw("steps") as Item[];
  const topics = tc.raw("form.topics") as string[];

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} description={t("description")}>
        <Button asChild size="lg">
          <a href="#apply">
            {t("cta")}
            <ArrowRight className="size-4 rtl:-scale-x-100" />
          </a>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/contact">{t("ctaSecondary")}</Link>
        </Button>
      </PageHero>

      <section className="bg-white py-20">
        <Container>
          <Reveal>
            <h2 className="text-display-sm font-extrabold sm:text-display-md">
              {t("benefitsTitle")}
            </h2>
          </Reveal>
          <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" gap={0.08}>
            {benefits.map((b, i) => {
              const Icon = ICONS[i] ?? Coins;
              return (
                <StaggerItem key={b.title} className="h-full">
                  <Card interactive className="h-full">
                    <IconTile tone={i === 0 ? "gold" : "brand"}>
                      <Icon />
                    </IconTile>
                    <h3 className="mt-5 font-display text-[17px] font-bold text-ink-900">
                      {b.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-ink-600">{b.body}</p>
                  </Card>
                </StaggerItem>
              );
            })}
          </Stagger>
        </Container>
      </section>

      <section className="aurora-soft py-20">
        <Container>
          <Reveal>
            <h2 className="text-display-sm font-extrabold">{t("stepsTitle")}</h2>
          </Reveal>
          <Stagger className="mt-10 grid gap-5 md:grid-cols-3" gap={0.1}>
            {steps.map((s, i) => (
              <StaggerItem key={s.title}>
                <div className="rounded-2xl border border-ink-200/70 bg-white p-6 shadow-card">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-brand-800 font-display text-[15px] font-bold text-white">
                    {pad2(i + 1)}
                  </span>
                  <h3 className="mt-5 font-display text-[17px] font-bold text-ink-900">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-ink-600">{s.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <Reveal id="white-label" className="scroll-mt-28">
              <div className="dark-forest-bg noise relative overflow-hidden rounded-[24px] p-8 text-white">
                <div aria-hidden className="noise-after" />
                <div className="relative">
                  <Badge tone="goldOnDark">{t("whiteLabelTitle")}</Badge>
                  <p className="mt-4 text-[15px] leading-relaxed text-brand-50/85">
                    {t("whiteLabelBody")}
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal id="portal" delay={0.1} className="scroll-mt-28">
              <div className="rounded-[24px] border border-ink-200/70 bg-white p-8 shadow-card">
                <Badge tone="brand">{t("portalTitle")}</Badge>
                <p className="mt-4 text-[15px] leading-relaxed text-ink-600">{t("portalBody")}</p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section id="apply" className="scroll-mt-28 bg-white py-20">
        <Container size="narrow">
          <Reveal>
            <h2 className="text-display-sm font-extrabold">{t("cta")}</h2>
            <MailtoForm
              className="mt-8 sm:grid-cols-2"
              subject="Smart Wafaa partner application — {business}"
              submitLabel={t("cta")}
              note={tc("form.note")}
              fields={[
                { name: "name", label: tc("form.name"), required: true, autoComplete: "name" },
                {
                  name: "business",
                  label: tc("form.business"),
                  required: true,
                  autoComplete: "organization",
                },
                {
                  name: "email",
                  label: tc("form.email"),
                  type: "email",
                  required: true,
                  autoComplete: "email",
                },
                {
                  name: "topic",
                  label: tc("form.topic"),
                  type: "select",
                  options: [topics[1] ?? "Partnership", ...topics.filter((_, i) => i !== 1)],
                },
                { name: "message", label: tc("form.message"), type: "textarea", required: true },
              ]}
            />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
