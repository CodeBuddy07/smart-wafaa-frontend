import { QrCode } from "@/components/mockups/qr-code";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  Shared bits                                                               */
/* -------------------------------------------------------------------------- */

export interface PassField {
  label: string;
  value: string;
}

/* -------------------------------------------------------------------------- */
/*  Apple Wallet — store card (PassKit `storeCard`)                           */
/* -------------------------------------------------------------------------- */

export interface AppleStoreCardProps {
  /** logo.png + logoText — top leading corner, max 160×50pt. */
  logo?: React.ReactNode;
  logoText: string;
  /** headerFields — stays visible when the pass is stacked in Wallet. */
  header: PassField;
  /** primaryFields — drawn over the strip on store cards. */
  primary: PassField;
  /** The 375×144pt strip image area. */
  strip: React.ReactNode;
  /** secondaryFields / auxiliaryFields — one row, up to 4. */
  fields: PassField[];
  /** barcode.altText */
  barcodeAlt: string;
  barcodeSeed?: string;
  /** backgroundColor / foregroundColor / labelColor from pass.json. */
  backgroundColor?: string;
  foregroundColor?: string;
  labelColor?: string;
  /** Rendered width in px (a real pass is 375pt wide). */
  width?: number;
  className?: string;
}

/**
 * Faithful Apple Wallet store-card layout: logo row → strip (with primary field) →
 * secondary/auxiliary row → barcode. Corner radius scales from the system's ~10pt.
 */
export function AppleStoreCard({
  logo,
  logoText,
  header,
  primary,
  strip,
  fields,
  barcodeAlt,
  barcodeSeed = barcodeAlt,
  backgroundColor = "#3f2a20",
  foregroundColor = "#ffffff",
  labelColor = "rgba(255,255,255,0.7)",
  width = 236,
  className,
}: AppleStoreCardProps) {
  const s = width / 375; // scale factor vs. a real pass
  const px = (pt: number) => `${(pt * s).toFixed(2)}px`;
  const label = { color: labelColor, fontSize: px(10), letterSpacing: "0.06em" } as const;

  return (
    <div
      className={cn(
        "relative flex shrink-0 flex-col overflow-hidden font-sans shadow-dark-card",
        className,
      )}
      style={{ width, backgroundColor, color: foregroundColor, borderRadius: px(10) }}
    >
      {/* logo + header */}
      <div
        className="flex items-center justify-between"
        style={{ padding: `${px(12)} ${px(14)} ${px(10)}` }}
      >
        <div className="flex items-center" style={{ gap: px(8) }}>
          {logo}
          <span className="leading-none font-semibold" style={{ fontSize: px(17) }}>
            {logoText}
          </span>
        </div>
        <div className="text-end leading-none">
          <p className="font-semibold uppercase" style={label}>
            {header.label}
          </p>
          <p className="font-semibold" style={{ fontSize: px(17), marginTop: px(2) }}>
            {header.value}
          </p>
        </div>
      </div>

      {/* strip 375×144 with primary field overlay */}
      <div className="relative w-full overflow-hidden" style={{ height: px(144) }}>
        <div className="absolute inset-0">{strip}</div>
        <div
          className="absolute inset-x-0 bottom-0 leading-none"
          style={{ padding: `0 ${px(14)} ${px(10)}` }}
        >
          <p className="font-semibold uppercase" style={label}>
            {primary.label}
          </p>
          <p className="font-bold tracking-tight" style={{ fontSize: px(34), marginTop: px(2) }}>
            {primary.value}
          </p>
        </div>
      </div>

      {/* secondary / auxiliary */}
      <div
        className="flex justify-between leading-none"
        style={{ padding: `${px(10)} ${px(14)} 0`, gap: px(8) }}
      >
        {fields.slice(0, 4).map((f) => (
          <div key={f.label} className="min-w-0">
            <p className="truncate font-semibold uppercase" style={label}>
              {f.label}
            </p>
            <p className="truncate font-medium" style={{ fontSize: px(15), marginTop: px(3) }}>
              {f.value}
            </p>
          </div>
        ))}
      </div>

      {/* barcode */}
      <div
        className="flex flex-col items-center"
        style={{ padding: `${px(14)} ${px(14)} ${px(14)}` }}
      >
        <div className="bg-white" style={{ padding: px(8), borderRadius: px(6) }}>
          <QrCode seed={barcodeSeed} size={Math.round(120 * s)} />
        </div>
        <p
          className="text-center"
          style={{ fontSize: px(11), marginTop: px(6), color: labelColor }}
        >
          {barcodeAlt}
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Google Wallet — loyalty card (LoyaltyClass / LoyaltyObject)               */
/* -------------------------------------------------------------------------- */

export interface GoogleLoyaltyCardProps {
  /** class.programLogo — circular mask, ≥660×660px. */
  logo: React.ReactNode;
  /** class.issuerName */
  issuerName: string;
  /** class.programName — card title. */
  programName: string;
  /** Default template rows: loyaltyPoints, secondaryLoyaltyPoints (label + balance). */
  rows: PassField[];
  /** object.barcode.alternateText */
  barcodeAlt: string;
  barcodeSeed?: string;
  /** class.heroImage — full width below the barcode, 1032×812 (5:4). */
  hero?: React.ReactNode;
  /** class.hexBackgroundColor — Google picks white/black text automatically. */
  backgroundColor?: string;
  onDark?: boolean;
  width?: number;
  className?: string;
}

/**
 * Google Wallet default loyalty template: card title (logo, issuer, programme)
 * → data rows → barcode + alt text → hero image. 16dp-ish corner radius.
 */
export function GoogleLoyaltyCard({
  logo,
  issuerName,
  programName,
  rows,
  barcodeAlt,
  barcodeSeed = barcodeAlt,
  hero,
  backgroundColor = "#0F4C3A",
  onDark = true,
  width = 236,
  className,
}: GoogleLoyaltyCardProps) {
  const s = width / 360; // vs. a 360dp-wide card
  const px = (dp: number) => `${(dp * s).toFixed(2)}px`;
  const fg = onDark ? "#ffffff" : "#1f1f1f";
  const muted = onDark ? "rgba(255,255,255,0.72)" : "rgba(31,31,31,0.62)";

  return (
    <div
      className={cn(
        "relative flex shrink-0 flex-col overflow-hidden font-sans shadow-dark-card",
        className,
      )}
      style={{ width, backgroundColor, color: fg, borderRadius: px(16) }}
    >
      {/* card title */}
      <div
        className="flex items-center"
        style={{ padding: `${px(16)} ${px(16)} ${px(12)}`, gap: px(12) }}
      >
        <span
          className="flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-white"
          style={{ width: px(40), height: px(40) }}
        >
          {logo}
        </span>
        <div className="min-w-0 leading-tight">
          <p className="truncate" style={{ fontSize: px(12), color: muted }}>
            {issuerName}
          </p>
          <p className="truncate font-semibold" style={{ fontSize: px(18) }}>
            {programName}
          </p>
        </div>
      </div>

      {/* data rows */}
      <div
        className="grid grid-cols-2 leading-tight"
        style={{ padding: `0 ${px(16)} ${px(14)}`, gap: px(12) }}
      >
        {rows.slice(0, 2).map((r) => (
          <div key={r.label} className="min-w-0">
            <p
              className="truncate uppercase"
              style={{ fontSize: px(10), letterSpacing: "0.08em", color: muted }}
            >
              {r.label}
            </p>
            <p className="truncate font-medium" style={{ fontSize: px(16), marginTop: px(2) }}>
              {r.value}
            </p>
          </div>
        ))}
      </div>

      {/* barcode */}
      <div className="flex flex-col items-center" style={{ padding: `0 ${px(16)} ${px(14)}` }}>
        <div className="bg-white" style={{ padding: px(10), borderRadius: px(12) }}>
          <QrCode seed={barcodeSeed} size={Math.round(132 * s)} />
        </div>
        <p style={{ fontSize: px(12), marginTop: px(8), color: muted }}>{barcodeAlt}</p>
      </div>

      {/* hero 5:4 */}
      {hero && (
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: "1032 / 812" }}>
          {hero}
        </div>
      )}
    </div>
  );
}
