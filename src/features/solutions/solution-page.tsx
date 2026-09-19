import Image from "next/image";

import { ArrowRight, BadgeCheck, Coffee, Gem, ShoppingBag, UtensilsCrossed } from "lucide-react";
import { useTranslations } from "next-intl";

import { PageHero } from "@/components/layout/page-hero";
import {
  BoutiqueLoyaltyCard,
  CoffeeStampPass,
  MembershipPass,
  type AppleCopy,
  type GoogleCopy,
} from "@/components/mockups/pass-presets";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Badge, Button, Card, Container, IconTile } from "@/components/ui";
import { sectionIds, siteConfig } from "@/config/site";
import { Link } from "@/i18n/navigation";

export const INDUSTRIES = ["cafes", "restaurants", "retail", "enterprise"] as const;
export type Industry = (typeof INDUSTRIES)[number];

const ICONS: Record<Industry, typeof Coffee> = {
  cafes: Coffee,
  restaurants: UtensilsCrossed,
  retail: ShoppingBag,
  enterprise: Gem,
};

interface Pain {
  title: string;
  body: string;
}
interface Stat {
  value: string;
  label: string;
}
interface Faq {
  q: string;
  a: string;
}

function IndustryPass({
  industry,
  cards,
}: {
  industry: Industry;
  cards: { apple: AppleCopy; google: GoogleCopy; membership: AppleCopy };
}) {
  switch (industry) {
    case "cafes":
      return <CoffeeStampPass copy={cards.apple} width={236} />;
    case "retail":
      return <BoutiqueLoyaltyCard copy={cards.google} width={236} />;
    case "enterprise":
      return <MembershipPass copy={cards.membership} width={236} />;
    default:
      return (
        <MembershipPass
          copy={{
            ...cards.membership,
            logoText: "Levant Gourmet",
            headerLabel: "Points",
            headerValue: "1,240",
            primaryLabel: "Member",
            primaryValue: cards.membership.primaryValue,
          }}
          width={236}
        />
      );
  }
}

export function SolutionPage({ industry }: { industry: Industry }) {
  const t = useTranslations("solutions");
  const th = useTranslations("hero");
  const ns = `industries.${industry}` as const;
  const short = t(`${ns}.short`);
  const pains = t.raw(`${ns}.pains`) as Pain[];
  const mechanics = t.raw(`${ns}.mechanics`) as string[];
  const stats = t.raw(`${ns}.stats`) as Stat[];
  const faq = t.raw(`${ns}.faq`) as Faq[];
  const cards = th.raw("cards") as { apple: AppleCopy; google: GoogleCopy; membership: AppleCopy };
  const Icon = ICONS[industry];

  return (
    <>
      <PageHero
        eyebrow={`${t("eyebrow")} · ${t(`${ns}.name`)}`}
        title={t(`${ns}.title`)}
        description={t(`${ns}.description`)}
        aside={
          <div className="relative mx-auto max-w-[560px]">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[28px] shadow-[0_40px_80px_-30px_rgb(6_78_59/0.45)]">
              <Image
                src={`/images/solutions/${industry}.webp`}
                alt=""
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 560px"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,rgb(15_23_42/0.35)_100%)]"
              />
            </div>
            <div className="absolute -start-4 -bottom-8 rotate-[-6deg] drop-shadow-2xl sm:-start-8">
              <IndustryPass industry={industry} cards={cards} />
            </div>
          </div>
        }
      >
        <Button asChild size="lg">
          <Link href={siteConfig.links.signup}>
            {t("heroCta")}
            <ArrowRight className="size-4 rtl:-scale-x-100" />
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href={`/#${sectionIds.howItWorks}`}>{t("heroSecondary")}</Link>
        </Button>
      </PageHero>

      {/* pains → solutions */}
      <section className="bg-white py-20">
        <Container>
          <Reveal>
            <h2 className="text-display-sm font-extrabold sm:text-display-md">
              {t("painTitle", { industry: short })}
            </h2>
          </Reveal>
          <Stagger className="mt-10 grid gap-5 md:grid-cols-3" gap={0.1}>
            {pains.map((p, i) => (
              <StaggerItem key={p.title} className="h-full">
                <Card interactive className="h-full">
                  <IconTile tone={i === 1 ? "gold" : "brand"}>
                    <Icon />
                  </IconTile>
                  <h3 className="mt-5 font-display text-[18px] font-bold text-ink-900">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-ink-600">{p.body}</p>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* mechanics + stats */}
      <section className="aurora-soft py-20">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h2 className="text-display-sm font-extrabold">
              {t("mechanicsTitle", { industry: short })}
            </h2>
            <ul className="mt-6 flex flex-col gap-3">
              {mechanics.map((m) => (
                <li
                  key={m}
                  className="flex items-center gap-3 rounded-2xl border border-ink-200/70 bg-white px-4 py-3.5 text-[15px] font-semibold text-ink-900 shadow-card"
                >
                  <BadgeCheck className="size-5 text-brand-600" />
                  {m}
                </li>
              ))}
            </ul>
            <Button asChild variant="link" className="mt-6 text-brand-800">
              <Link href={`/#${sectionIds.formats}`}>
                {t("mechanicsCta")}
                <ArrowRight className="size-4 rtl:-scale-x-100" />
              </Link>
            </Button>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-display-sm font-extrabold">{t("statsTitle")}</h2>
            <dl className="mt-6 grid grid-cols-3 gap-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-ink-200/70 bg-white p-5 shadow-card"
                >
                  <dt className="font-display text-[30px] font-extrabold tracking-tight text-brand-800">
                    {s.value}
                  </dt>
                  <dd className="mt-1 text-[12.5px] leading-snug text-ink-500">{s.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>
      </section>

      {/* faq */}
      <section className="bg-white py-20">
        <Container size="narrow">
          <Reveal>
            <h2 className="text-display-sm font-extrabold">{t("faqTitle")}</h2>
          </Reveal>
          <Stagger className="mt-8 flex flex-col gap-4" gap={0.08}>
            {faq.map((f) => (
              <StaggerItem key={f.q}>
                <div className="rounded-2xl border border-ink-200/70 bg-surface-subtle p-6">
                  <h3 className="font-display text-[16px] font-bold text-ink-900">{f.q}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-ink-600">{f.a}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* cta */}
      <section className="pb-24">
        <Container size="wide">
          <Reveal distance={40}>
            <div className="dark-forest-bg noise relative overflow-hidden rounded-[28px] px-6 py-16 text-center text-white sm:px-12">
              <div aria-hidden className="noise-after" />
              <div className="relative mx-auto flex max-w-[640px] flex-col items-center">
                <Badge tone="goldOnDark">{t(`${ns}.name`)}</Badge>
                <h2 className="mt-5 text-display-sm font-extrabold text-white sm:text-display-md">
                  {t("ctaTitle", { industry: short })}
                </h2>
                <p className="mt-4 text-[16px] text-brand-50/80">{t("ctaBody")}</p>
                <Button asChild variant="gold" size="lg" className="mt-8">
                  <Link href={siteConfig.links.signup}>{t("heroCta")}</Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
