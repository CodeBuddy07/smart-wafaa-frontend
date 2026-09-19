import { Check } from "lucide-react";
import { useTranslations } from "next-intl";

import { MailtoForm } from "@/components/forms/mailto-form";
import { CoffeeStampPass, type AppleCopy } from "@/components/mockups/pass-presets";
import { Reveal } from "@/components/motion/reveal";
import { Badge, Container } from "@/components/ui";
import { Link } from "@/i18n/navigation";

export type AccessMode = "signup" | "login";

/** `/signup` and `/login` — the dashboard is not live yet, so both collect early-access requests. */
export function EarlyAccessPage({ mode }: { mode: AccessMode }) {
  const t = useTranslations("access");
  const th = useTranslations("hero");
  const perks = t.raw("perks") as string[];
  const apple = (th.raw("cards") as { apple: AppleCopy }).apple;

  return (
    <section className="aurora-bg relative overflow-hidden pt-[calc(var(--header-height)+var(--header-offset)+40px)] pb-24">
      <Container className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-16">
        <Reveal>
          <Badge tone="brand">{t(`${mode}.eyebrow`)}</Badge>
          <h1 className="mt-5 text-display-sm font-extrabold sm:text-display-md">
            {t(`${mode}.title`)}
          </h1>
          <p className="mt-4 max-w-[560px] text-[17px] leading-relaxed text-ink-600">
            {t(`${mode}.description`)}
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[13.5px] font-medium text-ink-700">
            {perks.map((p) => (
              <li key={p} className="inline-flex items-center gap-1.5">
                <Check className="size-4 text-brand-600" strokeWidth={2.5} />
                {p}
              </li>
            ))}
          </ul>

          <div className="glass mt-8 rounded-[24px] p-6 sm:p-8">
            <MailtoForm
              className="sm:grid-cols-2"
              subject={t("form.subject", { business: "{business}" })}
              submitLabel={t(`${mode}.submit`)}
              note={t("note")}
              fields={[
                {
                  name: "business",
                  label: t("form.business"),
                  required: true,
                  autoComplete: "organization",
                },
                {
                  name: "email",
                  label: t("form.email"),
                  type: "email",
                  required: true,
                  autoComplete: "email",
                },
                { name: "phone", label: t("form.phone"), type: "tel", autoComplete: "tel" },
                { name: "branches", label: t("form.branches"), type: "number" },
              ]}
            />
          </div>

          <p className="mt-5 text-[13.5px] text-ink-500">
            <Link
              href={mode === "signup" ? "/login" : "/signup"}
              className="font-semibold text-brand-800 underline-offset-4 hover:underline"
            >
              {mode === "signup" ? t("altLogin") : t("altSignup")}
            </Link>
          </p>
        </Reveal>

        <Reveal from="right" distance={40} className="hidden justify-center lg:flex">
          <div className="rotate-[-5deg] drop-shadow-2xl">
            <CoffeeStampPass copy={apple} width={300} />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
