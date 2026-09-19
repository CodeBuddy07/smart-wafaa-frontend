import { siteConfig } from "@/config/site";
import type { Locale } from "@/i18n/routing";
import { localizedPath } from "@/lib/page-metadata";

type Thing = Record<string, unknown>;

/** Renders one or more schema.org objects as a JSON-LD script tag. */
export function JsonLd({ data }: { data: Thing | Thing[] }) {
  const graph = Array.isArray(data) ? data : [data];
  return (
    <script
      type="application/ld+json"
      // JSON-LD is data, not executable; escape `<` to keep it inert inside HTML.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph.length === 1 ? graph[0] : graph).replace(/</g, "\\u003c"),
      }}
    />
  );
}

const abs = (locale: Locale, path: string) => `${siteConfig.url}${localizedPath(locale, path)}`;

export function organizationJsonLd(locale: Locale): Thing {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/icon-512.png`,
    email: siteConfig.contact.email,
    foundingDate: String(siteConfig.foundingYear),
    address: { "@type": "PostalAddress", addressLocality: "Riyadh", addressCountry: "SA" },
    areaServed: ["SA", "AE", "KW", "QA", "BH", "OM"],
    sameAs: Object.values(siteConfig.social),
    inLanguage: locale,
  };
}

export function websiteJsonLd(locale: Locale): Thing {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: abs(locale, "/"),
    name: siteConfig.name,
    publisher: { "@id": `${siteConfig.url}/#organization` },
    inLanguage: locale === "ar" ? "ar-SA" : "en",
  };
}

interface Plan {
  name: string;
  monthly: number | null;
  description: string;
}

export function softwareJsonLd(locale: Locale, plans: Plan[], description: string): Thing {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${siteConfig.url}/#software`,
    name: siteConfig.name,
    description,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, iOS Wallet, Android Wallet",
    url: abs(locale, "/"),
    publisher: { "@id": `${siteConfig.url}/#organization` },
    offers: plans
      .filter((p): p is Plan & { monthly: number } => p.monthly !== null)
      .map((p) => ({
        "@type": "Offer",
        name: p.name,
        description: p.description,
        price: p.monthly,
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: p.monthly,
          priceCurrency: "USD",
          billingIncrement: 1,
          unitCode: "MON",
        },
        availability: "https://schema.org/InStock",
        url: abs(locale, "/#pricing"),
      })),
  };
}

export function faqJsonLd(items: Array<{ q: string; a: string }>): Thing {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
}

export function breadcrumbJsonLd(
  locale: Locale,
  trail: Array<{ name: string; path: string }>,
): Thing {
  const items = [{ name: siteConfig.name, path: "/" }, ...trail];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: abs(locale, item.path),
    })),
  };
}

export function serviceJsonLd(
  locale: Locale,
  s: { name: string; description: string; path: string },
): Thing {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${siteConfig.name} — ${s.name}`,
    description: s.description,
    url: abs(locale, s.path),
    provider: { "@id": `${siteConfig.url}/#organization` },
    areaServed: "SA",
    serviceType: "Digital loyalty programme",
  };
}
