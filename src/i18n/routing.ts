import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ar"],
  defaultLocale: "en",
  // `/` serves English; Arabic lives at `/ar`.
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];

export const localeDirection: Record<Locale, "ltr" | "rtl"> = {
  en: "ltr",
  ar: "rtl",
};

export const localeLabel: Record<Locale, string> = {
  en: "EN",
  ar: "AR",
};
