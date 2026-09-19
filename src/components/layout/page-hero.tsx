import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";

import { Reveal } from "@/components/motion/reveal";
import { Badge, Container } from "@/components/ui";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  children?: React.ReactNode;
  /** Right-hand visual for two-column heroes. */
  aside?: React.ReactNode;
  className?: string;
  align?: "start" | "center";
}

/** Sub-page hero: back link, eyebrow, H1, lead and optional actions/aside. */
export function PageHero({
  eyebrow,
  title,
  description,
  children,
  aside,
  className,
  align = "start",
}: PageHeroProps) {
  const t = useTranslations("solutions");
  return (
    <section
      className={cn(
        "aurora-bg relative overflow-hidden pt-[calc(var(--header-height)+var(--header-offset)+44px)] pb-16 sm:pb-20",
        className,
      )}
    >
      <Container>
        <Reveal from="none">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-brand-800"
          >
            <ArrowLeft className="size-4 rtl:-scale-x-100" />
            {t("backHome")}
          </Link>
        </Reveal>
        <div
          className={cn(
            "mt-8 grid gap-10",
            aside ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:items-center" : "",
            align === "center" && "text-center",
          )}
        >
          <Reveal
            className={cn(
              "flex flex-col gap-5",
              align === "center" ? "items-center" : "items-start",
            )}
          >
            <Badge tone="brand">{eyebrow}</Badge>
            <h1 className="max-w-[680px] text-display-sm font-extrabold sm:text-display-md lg:text-display-lg">
              {title}
            </h1>
            <p className="max-w-[620px] text-[17px] leading-relaxed text-ink-600 sm:text-lead">
              {description}
            </p>
            {children && <div className="mt-2 flex flex-wrap items-center gap-3">{children}</div>}
          </Reveal>
          {aside && (
            <Reveal from="right" distance={40} className="relative">
              {aside}
            </Reveal>
          )}
        </div>
      </Container>
    </section>
  );
}
