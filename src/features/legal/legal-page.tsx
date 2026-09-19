import { ArrowLeft } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";

import { Badge, Container } from "@/components/ui";
import { Link } from "@/i18n/navigation";

export const LEGAL_SLUGS = ["terms", "privacy", "refunds"] as const;
export type LegalSlug = (typeof LEGAL_SLUGS)[number];

/** Bump when the legal text changes — shown as "Last updated". */
const LAST_UPDATED = new Date("2026-09-19");

interface LegalSection {
  heading: string;
  body: string;
}

export function LegalPage({ slug }: { slug: LegalSlug }) {
  const t = useTranslations("legal");
  const format = useFormatter();
  const sections = t.raw(`pages.${slug}.sections`) as LegalSection[];

  return (
    <article className="pt-[calc(var(--header-height)+var(--header-offset)+48px)] pb-24">
      <Container size="narrow">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-brand-800"
        >
          <ArrowLeft className="size-4 rtl:-scale-x-100" />
          {t("back")}
        </Link>

        <header className="mt-8">
          <Badge tone="gold" size="sm">
            {t("draftNotice")}
          </Badge>
          <h1 className="mt-5 text-display-sm font-extrabold sm:text-display-md">
            {t(`pages.${slug}.title`)}
          </h1>
          <p className="mt-3 text-sm text-ink-400">
            {t("updated", { date: format.dateTime(LAST_UPDATED, { dateStyle: "long" }) })}
          </p>
          <p className="mt-6 text-lead text-ink-600">{t(`pages.${slug}.intro`)}</p>
        </header>

        <div className="mt-10 space-y-8 border-t border-ink-100 pt-10">
          {sections.map((s) => (
            <section key={s.heading}>
              <h2 className="font-display text-[19px] font-bold text-ink-900">{s.heading}</h2>
              <p className="mt-2 text-[15.5px] leading-relaxed text-ink-600">{s.body}</p>
            </section>
          ))}
        </div>
      </Container>
    </article>
  );
}
