/**
 * Smart Wafaa design tokens (TypeScript view).
 *
 * The CSS side lives in `src/styles/theme.css` and drives Tailwind v4 utilities.
 * Values here MUST mirror that file — they exist for places CSS cannot reach
 * (Motion animation values, canvas, OG images, email templates, native apps).
 */

export const colors = {
  brand: {
    950: "#00261C",
    900: "#064E3B",
    800: "#0F4C3A", // primary
    700: "#166534",
    600: "#15803D",
    500: "#16A34A",
    400: "#22C55E",
    300: "#4ADE80",
    200: "#BBF7D0",
    100: "#DCFCE7",
    50: "#F0FDF4",
  },
  gold: {
    700: "#B8860B",
    600: "#D4AF37", // secondary
    500: "#E8C547",
    400: "#F2D774",
    200: "#F6E7C1", // tertiary
    100: "#FBF3DC",
    50: "#FDF9EE",
  },
  ink: {
    950: "#0B1120",
    900: "#0F172A", // headings
    800: "#1E293B",
    700: "#334155",
    600: "#475569", // body
    500: "#64748B",
    400: "#94A3B8",
    300: "#CBD5E1",
    200: "#E2E8F0",
    100: "#F1F5F9",
    50: "#F8FAFC",
  },
  surface: {
    canvas: "#FFFFFF",
    subtle: "#F8FAF8",
    muted: "#F3F6F4",
    dark: "#0F1A24",
    darker: "#0B1219",
  },
  accent: {
    purple: "#7C3AED",
    purpleSoft: "#F3E8FF",
    amber: "#B45309",
    amberSoft: "#FEF3C7",
    emeraldSoft: "#ECFDF5",
    live: "#10B981",
  },
} as const;

export const fonts = {
  display: "var(--font-display)",
  serif: "var(--font-serif)",
  sans: "var(--font-sans)",
  arabic: "var(--font-arabic)",
} as const;

export const radii = {
  xs: 6,
  sm: 10,
  md: 14,
  lg: 20,
  xl: 24,
  "2xl": 32,
  pill: 9999,
} as const;

export const layout = {
  /** Design canvas width the Figma file was authored at. */
  canvasWidth: 1440,
  /** Content width (1440 - 2 × 150 gutter). */
  contentWidth: 1140,
  gutter: 150,
  headerHeight: 62,
} as const;

/**
 * Motion presets. Springs are tuned to feel "snappy but soft" — the
 * personality the marketing site uses everywhere.
 */
export const motion = {
  spring: {
    soft: { type: "spring", stiffness: 120, damping: 20, mass: 1 },
    snappy: { type: "spring", stiffness: 260, damping: 26, mass: 0.9 },
    bouncy: { type: "spring", stiffness: 380, damping: 18, mass: 0.8 },
  },
  ease: {
    out: [0.16, 1, 0.3, 1],
    inOut: [0.65, 0, 0.35, 1],
  },
  duration: {
    fast: 0.18,
    base: 0.32,
    slow: 0.6,
    reveal: 0.8,
  },
  stagger: {
    tight: 0.05,
    base: 0.08,
    loose: 0.14,
  },
} as const;

export type BrandShade = keyof typeof colors.brand;
export type InkShade = keyof typeof colors.ink;
