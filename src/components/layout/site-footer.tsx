import { ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";

import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/ui";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const COLUMNS = ["product", "solutions", "partners", "security"] as const;
const LEGAL_HREFS = ["/terms", "/privacy", "/refunds"] as const;
/** Destinations for the link columns, in the same order as `footer.columns.*.links`. */
const COLUMN_HREFS: Record<(typeof COLUMNS)[number], readonly string[]> = {
  product: ["/#card-programme", "/#card-programme", "/#card-programme", "/#card-programme"],
  solutions: [
    "/solutions/cafes",
    "/solutions/restaurants",
    "/solutions/retail",
    "/solutions/enterprise",
  ],
  partners: ["/partners", "/partners#white-label", "/partners#portal"],
  security: [],
};

export function SiteFooter() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="dark-navy-bg relative text-ink-300">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(4,1fr)] lg:gap-8">
          <div>
            <Logo onDark />
            <p className="mt-5 max-w-[240px] text-sm leading-relaxed text-ink-400">
              {t("tagline")}
            </p>
            <p className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-brand-300">
              <ShieldCheck className="size-4" />
              {t("certified")}
            </p>
          </div>

          {COLUMNS.map((col) => {
            const links = t.raw(`columns.${col}.links`) as string[];
            const isSecurity = col === "security";
            return (
              <nav key={col} aria-label={t(`columns.${col}.title`)}>
                <h3 className="font-sans text-[11px] font-semibold tracking-[0.16em] text-white uppercase">
                  {t(`columns.${col}.title`)}
                </h3>
                <ul className="mt-5 flex flex-col gap-3">
                  {links.map((label, i) => (
                    <li key={label}>
                      {isSecurity ? (
                        <span className="inline-flex items-center gap-2 text-sm text-ink-300">
                          <span className="size-1.5 rounded-full bg-brand-400" />
                          {label}
                        </span>
                      ) : (
                        <Link
                          href={COLUMN_HREFS[col][i] ?? "/"}
                          className="text-sm text-ink-300 transition-colors hover:text-white"
                        >
                          {label}
                        </Link>
                      )}
                    </li>
                  ))}
                  {isSecurity && (
                    <li className="pt-1">
                      <Link
                        href="/privacy"
                        className="text-sm text-ink-400 underline-offset-4 hover:text-white hover:underline"
                      >
                        {t("privacy")}
                      </Link>
                    </li>
                  )}
                </ul>
              </nav>
            );
          })}
        </div>

        {/* legal / company identity — required for the trade-licence listing */}
        <div className="mt-12 grid gap-6 border-t border-white/10 pt-8 text-xs text-ink-400 md:grid-cols-[1fr_auto] md:items-start">
          <div className="space-y-1.5">
            <p className="font-medium text-ink-300">{t("legal.company")}</p>
            <p>{t("legal.address")}</p>
            <a
              href={`mailto:${t("legal.contact")}`}
              className="inline-block text-brand-300 hover:text-white"
            >
              {t("legal.contact")}
            </a>
          </div>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {(t.raw("legal.links") as string[]).map((label, i) => (
              <li key={label}>
                <Link href={LEGAL_HREFS[i] ?? "/"} className="transition-colors hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex flex-col gap-4 text-xs text-ink-500 sm:flex-row sm:items-center sm:justify-between">
          <p>{t("copyright", { year })}</p>
          <ul className="flex items-center gap-3">
            {routing.locales.map((l, i) => (
              <li key={l} className="flex items-center gap-3">
                {i > 0 && <span className="size-1 rounded-full bg-brand-500" aria-hidden />}
                <Link href="/" locale={l} className="transition-colors hover:text-white">
                  {t(`languages.${l}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
