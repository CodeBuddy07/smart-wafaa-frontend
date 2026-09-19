import { env } from "./env";

/** Static, non-localised site configuration. */
export const siteConfig = {
  name: "Smart Wafaa",
  legalName: "Smart Wafaa Native Loyalty Engine",
  url: env.NEXT_PUBLIC_SITE_URL,
  foundingYear: 2026,
  locale: { default: "en", supported: ["en", "ar"] },
  social: {
    twitter: "https://x.com/smartwafaa",
    linkedin: "https://www.linkedin.com/company/smartwafaa",
    instagram: "https://www.instagram.com/smartwafaa",
  },
  contact: {
    email: "hello@smartwafaa.com",
  },
  /** External app URLs — the dashboard lives on its own subdomain later. */
  links: {
    login: "/login",
    signup: "/signup",
    demo: "#how-it-works",
    contact: "mailto:hello@smartwafaa.com",
  },
} as const;

/** Anchor ids for in-page navigation. Keep in sync with section `id`s. */
export const sectionIds = {
  hero: "top",
  features: "features",
  wallet: "wallet-preview",
  howItWorks: "how-it-works",
  formats: "card-programme",
  why: "why-loyalty",
  push: "push",
  staff: "staff",
  pricing: "pricing",
  faq: "faq",
  cta: "get-started",
} as const;

export type SectionId = (typeof sectionIds)[keyof typeof sectionIds];
