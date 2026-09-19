import type en from "@/messages/en.json";

/**
 * Typed views over the message catalogue. `en.json` is the schema — `ar.json`
 * is validated against it by the i18n test.
 */
export type Messages = typeof en;

export type FeatureItem = Messages["features"]["items"][number];
export type ArchitectureItem = Messages["architecture"]["items"][number];
export type Step = Messages["howItWorks"]["steps"][number];
export type StepScreen = Messages["howItWorks"]["phone"]["screens"][number];
export type FormatItem = Messages["formats"]["items"][number];
export type ComboItem = Messages["formats"]["grouped"]["combos"][number];
export type WhyItem = Messages["why"]["items"][number];
export type PushItem = Messages["push"]["items"][number];
export type Plan = Messages["pricing"]["plans"][number];
export type FaqItem = Messages["faq"]["items"][number];
export type WalletNote = Messages["walletPreview"]["appleNotes"][number];

/** Non-translatable pricing data. Currency and amounts live in code, not copy. */
export const PLAN_PRICES = [
  { monthly: 49, yearly: 39 },
  { monthly: 129, yearly: 103 },
  { monthly: 299, yearly: 239 },
  { monthly: null, yearly: null },
] as const;

export const HIGHLIGHTED_PLAN_INDEX = 1;
