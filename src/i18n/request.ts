import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";

import { routing } from "./routing";

import type en from "../../messages/en.json";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  return {
    locale,
    messages: ((await import(`../../messages/${locale}.json`)) as { default: typeof en }).default,
    timeZone: "Asia/Riyadh",
  };
});
