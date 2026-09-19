import { Clock, Mail, MapPin, MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";

import { MailtoForm } from "@/components/forms/mailto-form";
import { PageHero } from "@/components/layout/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Container, IconTile } from "@/components/ui";

const ICONS = [Mail, MessageCircle, MapPin] as const;

interface ContactCard {
  title: string;
  value: string;
  href: string;
}

export function ContactPage() {
  const t = useTranslations("contact");
  const cards = t.raw("cards") as ContactCard[];
  const topics = t.raw("form.topics") as string[];

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />

      <section className="bg-white pb-24">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div>
            <Stagger className="flex flex-col gap-4" gap={0.08}>
              {cards.map((c, i) => {
                const Icon = ICONS[i] ?? Mail;
                return (
                  <StaggerItem key={c.title}>
                    <a
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-4 rounded-2xl border border-ink-200/70 bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-card-hover"
                    >
                      <IconTile tone="brand">
                        <Icon />
                      </IconTile>
                      <div>
                        <p className="text-[12px] font-semibold tracking-[0.12em] text-ink-400 uppercase">
                          {c.title}
                        </p>
                        <p
                          className="mt-0.5 font-display text-[16px] font-bold text-ink-900"
                          dir="ltr"
                        >
                          {c.value}
                        </p>
                      </div>
                    </a>
                  </StaggerItem>
                );
              })}
              <StaggerItem>
                <p className="inline-flex items-center gap-2 px-1 text-[13px] text-ink-500">
                  <Clock className="size-4" />
                  {t("hours")}
                </p>
              </StaggerItem>
            </Stagger>
          </div>

          <Reveal delay={0.1}>
            <div className="rounded-[24px] border border-ink-200/70 bg-surface-subtle p-6 shadow-card sm:p-8">
              <h2 className="font-display text-[22px] font-bold text-ink-900">{t("form.title")}</h2>
              <MailtoForm
                className="mt-6 sm:grid-cols-2"
                subject={t("form.subject", { topic: "{topic}" })}
                submitLabel={t("form.submit")}
                note={t("form.note")}
                fields={[
                  { name: "name", label: t("form.name"), required: true, autoComplete: "name" },
                  { name: "business", label: t("form.business"), autoComplete: "organization" },
                  {
                    name: "email",
                    label: t("form.email"),
                    type: "email",
                    required: true,
                    autoComplete: "email",
                  },
                  { name: "topic", label: t("form.topic"), type: "select", options: topics },
                  { name: "message", label: t("form.message"), type: "textarea", required: true },
                ]}
              />
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
