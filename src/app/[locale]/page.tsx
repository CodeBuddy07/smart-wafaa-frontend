import { notFound } from "next/navigation";

import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";

import { LandingPage } from "@/features/landing/landing-page";
import { routing } from "@/i18n/routing";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return <LandingPage />;
}
