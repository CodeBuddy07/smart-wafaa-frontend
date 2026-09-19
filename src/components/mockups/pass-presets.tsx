import Image from "next/image";

import { Coffee, Gem, ShoppingBag } from "lucide-react";

import {
  AppleStoreCard,
  GoogleLoyaltyCard,
  StampGrid,
  type PassField,
} from "@/components/mockups/wallet-pass";

/**
 * Concrete demo passes used across the landing page. Copy comes from
 * `messages/*.json` (hero.cards); visuals live here so every section shows the
 * same three "merchants".
 */

export interface AppleCopy {
  logoText: string;
  headerLabel: string;
  headerValue: string;
  primaryLabel: string;
  primaryValue: string;
  fields: PassField[];
  barcodeAlt: string;
}
export interface GoogleCopy {
  issuerName: string;
  programName: string;
  rows: PassField[];
  barcodeAlt: string;
}

/** Roast & Brew — espresso store card with a cream stamp strip. */
export function CoffeeStampPass({
  copy,
  width,
  stamps = 9,
}: {
  copy: AppleCopy;
  width?: number;
  stamps?: number;
}) {
  return (
    <AppleStoreCard
      width={width}
      backgroundColor="#3b2418"
      labelColor="rgba(255,255,255,0.66)"
      logo={
        <span
          className="flex size-[1.9em] items-center justify-center rounded-md bg-[#f3e7d8] text-[#3b2418]"
          style={{ fontSize: `${(width ?? 236) / 20}px` }}
        >
          <Coffee className="size-[60%]" />
        </span>
      }
      logoText={copy.logoText}
      header={{ label: copy.headerLabel, value: copy.headerValue }}
      primary={{ label: copy.primaryLabel, value: copy.primaryValue }}
      strip={
        // Strip art: stamp grid on cream, fading to the pass colour so the white
        // primary field stays legible (Apple: keep the area behind text uncluttered).
        <div className="relative h-full w-full bg-[linear-gradient(180deg,#f6ecdf_0%,#f1e3d0_52%,#3b2418_100%)]">
          <div className="absolute inset-x-[4%] top-[6%]">
            <StampGrid filled={stamps} className="w-[60%]" />
          </div>
        </div>
      }
      fields={copy.fields}
      barcodeAlt={copy.barcodeAlt}
    />
  );
}

/** Nakheel Boutiques — forest-green Google Wallet loyalty card with hero art. */
export function BoutiqueLoyaltyCard({ copy, width }: { copy: GoogleCopy; width?: number }) {
  return (
    <GoogleLoyaltyCard
      width={width}
      backgroundColor="#0F4C3A"
      logo={<ShoppingBag className="size-1/2 text-[#0F4C3A]" />}
      issuerName={copy.issuerName}
      programName={copy.programName}
      rows={copy.rows}
      barcodeAlt={copy.barcodeAlt}
      hero={
        // class.heroImage — 1032×812 (5:4), no embedded text (Google guideline)
        <Image
          src="/images/passes/boutique-hero.webp"
          alt=""
          aria-hidden
          fill
          sizes="(max-width: 640px) 60vw, 260px"
          className="object-cover"
        />
      }
    />
  );
}

/** Forge Club — black-tier membership store card. */
export function MembershipPass({ copy, width }: { copy: AppleCopy; width?: number }) {
  return (
    <AppleStoreCard
      width={width}
      backgroundColor="#0b1024"
      labelColor="rgba(255,255,255,0.55)"
      logo={
        <span
          className="flex size-[1.9em] items-center justify-center rounded-md bg-gold-500 text-brand-950"
          style={{ fontSize: `${(width ?? 236) / 20}px` }}
        >
          <Gem className="size-[60%]" />
        </span>
      }
      logoText={copy.logoText}
      header={{ label: copy.headerLabel, value: copy.headerValue }}
      primary={{ label: copy.primaryLabel, value: copy.primaryValue }}
      strip={
        <div className="h-full w-full bg-[radial-gradient(90%_70%_at_80%_10%,#4c3f9a_0%,transparent_55%),radial-gradient(70%_60%_at_10%_90%,#1d5fb8_0%,transparent_60%),linear-gradient(160deg,#141c3d_0%,#0b1024_100%)]">
          <div className="absolute inset-0 opacity-60 [background:radial-gradient(1px_1px_at_20%_30%,white_50%,transparent_51%),radial-gradient(1px_1px_at_70%_60%,white_50%,transparent_51%),radial-gradient(1.5px_1.5px_at_40%_80%,white_50%,transparent_51%),radial-gradient(1px_1px_at_85%_25%,white_50%,transparent_51%)]" />
        </div>
      }
      fields={copy.fields}
      barcodeAlt={copy.barcodeAlt}
    />
  );
}
