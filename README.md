# Smart Wafaa — Frontend

The public marketing site for **Smart Wafaa**, a native Apple & Google Wallet loyalty engine.
Standalone Next.js project — this folder is its own git repository.

> Design source: [Figma → Smart wafaa / Draft / Landing page](https://www.figma.com/design/ZYy0y4ARsiUHHjvX0CGvtb/Smart-wafaa?node-id=45953-8090)

## Stack

| Concern   | Choice                                                               |
| --------- | -------------------------------------------------------------------- |
| Framework | Next.js 16 (App Router, Turbopack, SSG) · React 19 · TS 5            |
| Styling   | Tailwind CSS v4 — design tokens in `src/styles/theme.css`            |
| Motion    | Motion (Framer Motion 13) · Lenis smooth scroll                      |
| i18n      | next-intl — `en` (default, `/`) and `ar` (RTL, `/ar`)                |
| Icons     | lucide-react                                                         |
| Quality   | ESLint 9 (flat) · Prettier · Husky + lint-staged · commitlint        |
| Tests     | Vitest + Testing Library (unit) · Playwright (e2e, desktop + iPhone) |
| CI        | GitHub Actions (`.github/workflows/ci.yml`)                          |

## Getting started

```bash
corepack enable          # or: npm i -g pnpm
pnpm install
cp .env.example .env.local
pnpm dev                 # http://localhost:3000  (Arabic: /ar)
```

### Scripts

| Script          | What it does                                             |
| --------------- | -------------------------------------------------------- |
| `pnpm dev`      | Dev server with Turbopack                                |
| `pnpm build`    | Production build (static `/en`, `/ar`, sitemap, robots)  |
| `pnpm start`    | Serve the production build                               |
| `pnpm check`    | typecheck + lint + format:check + unit tests (CI parity) |
| `pnpm test`     | Vitest unit tests (`pnpm test:watch` for watch mode)     |
| `pnpm test:e2e` | Playwright — builds are served automatically             |
| `pnpm lint:fix` | ESLint with autofix                                      |
| `pnpm format`   | Prettier write                                           |

First e2e run: `pnpm exec playwright install chromium webkit`.

## Project layout

```
src/
├── app/                    # Next.js App Router
│   ├── [locale]/           # layout, home, 404, catch-all, opengraph-image, and routes:
│   │   ├── solutions/[industry]  · partners · contact · signup · login · [slug] (legal)
│   ├── globals.css         # base styles + decorative utilities + keyframes
│   ├── sitemap.ts · robots.ts · manifest.ts
├── components/
│   ├── ui/                 # design-system primitives (Button, Badge, Card, Container, IconTile)
│   ├── layout/             # SiteHeader, SiteFooter, LocaleSwitcher, SkipLink
│   ├── motion/             # Reveal, Stagger, Floating, TextReveal, Marquee, AnimatedNumber, Providers
│   ├── mockups/            # wallet-pass, pass-presets, strip-art (server-style strip composition), PhoneFrame (iOS/Android), LockscreenPhone, QrCode
│   ├── forms/              # MailtoForm — backend-free forms (swap for an API call later)
│   ├── seo/                # JsonLd helpers (Organization, SoftwareApplication, FAQPage, Breadcrumb, Service)
│   └── brand/              # Logo
├── features/legal/         # LegalPage — /terms, /privacy, /refunds (drafts, EN + AR)
├── features/solutions/     # SolutionPage template — cafes · restaurants · retail · enterprise
├── features/partners/ · contact/ · access/   # partners, contact, signup/login (early access)
├── features/landing/
│   ├── landing-page.tsx    # section order (mirrors the Figma frame + Wallet Preview)
│   ├── sections/           # one file per section — hero, features, how-it-works, pricing, faq…
│   ├── components/         # section-specific pieces (SectionHeading, how-it-works/*)
│   ├── hooks/              # useAutoAdvance (orbit carousel timer)
│   └── content.ts          # typed views over messages + non-translatable data (prices)
├── config/                 # env (zod-validated), site config, section anchors
├── i18n/                   # routing, request config, navigation helpers
├── lib/                    # fonts, tokens (TS mirror of theme.css), utils
├── styles/theme.css        # Tailwind @theme — colour, type, radius, shadow, easing tokens
└── test/                   # Vitest setup
messages/                   # en.json (schema) · ar.json — key parity is unit-tested
public/images/how-it-works/ # hand-phone.webp (Gemini-generated, backdrop keyed to alpha)
public/images/passes/       # boutique-hero.webp (Gemini-generated, Google hero 1032×812)
public/images/strip/        # café scene + keyed stamp icons that compose the Apple strip
public/images/solutions/    # industry hero photos (+ -og.jpg copies for Open Graph)
e2e/                        # Playwright specs
```

### Conventions

- **Copy lives in `messages/*.json`, never in components.** `en.json` is the type schema (see `global.d.ts`); `ar.json` must have identical keys — `src/i18n/messages.test.ts` enforces it.
- **Tokens, not magic values.** Colours/type/radii come from `src/styles/theme.css` (Tailwind utilities) or `src/lib/tokens.ts` (Motion/JS).
- **Sections are self-contained** (`features/landing/sections/*`) and own their vertical spacing so they can be reordered in `landing-page.tsx`.
- **Motion respects `prefers-reduced-motion`** via `MotionConfig` + Lenis opt-out in `components/motion/providers.tsx`.
- **Logical properties for RTL** (`ps-`, `pe-`, `start-`, `end-`); mirror icons with `rtl:-scale-x-100`.
- Commits follow Conventional Commits (`feat(landing): …`); scopes are listed in `commitlint.config.mjs`.

## The "How it works" orbit

`features/landing/components/how-it-works/step-orbit.tsx` places the five step cards in fixed ring slots around the phone.
A card occupies slot `(index − active) mod 5`, so selecting any step rotates the ring until that card lands in the focused
top-start slot. `useAutoAdvance` cycles steps every 5.2 s while the stage is in view, pauses on hover, and pauses for 12 s after a
user selection. On `< lg` screens the ring collapses to a single swipe-style card with prev/next controls.

## Wallet passes are spec-accurate

`components/mockups/wallet-pass.tsx` renders the two real pass layouts rather than decorative cards:

| Component           | Follows                                                                   | Anatomy (top → bottom)                                                                                                |
| ------------------- | ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `AppleStoreCard`    | PassKit `storeCard` (Apple HIG: logo ≤160×50pt, strip 375×144pt)          | logo + logoText · headerFields → strip (primaryFields overlaid) → secondary/auxiliary → barcode + altText             |
| `GoogleLoyaltyCard` | Google Wallet Loyalty default template (`programLogo` circular, hero 5:4) | programLogo · issuerName · programName → loyaltyPoints / secondaryLoyaltyPoints → barcode + alternateText → heroImage |

Both take a `width` and scale every dimension from the platform's reference width (375pt / 360dp), so the same
component is used in the hero fan, the How-it-works phone and the Wallet Preview section. The stamp grid is
drawn _into the strip_ (`StampGrid`) because that is how stamp progress actually ships to Apple Wallet.

## Liquid Glass

`src/app/globals.css` defines `glass`, `glass-refract`, `glass-dark` and `glass-sheen` utilities: saturated backdrop
blur, specular top/edge highlights, a gradient rim, and — on Chromium — an SVG displacement filter
(`LiquidGlassDefs`) referenced through `backdrop-filter: url(#lg-refract)` for real lensing. Applied to the header,
pills, toggles and floating badges; everything degrades to plain frosted glass elsewhere.

## SEO

See `../docs/seo.md`. In short: per-page metadata + hreflang, dynamic OG images (`opengraph-image.tsx`, Satori;
Arabic uses Readex Pro because Noto/Amiri/IBM Plex Arabic hit unsupported GSUB lookups), JSON-LD, full sitemap.
Set `NEXT_PUBLIC_SITE_URL` in Vercel.

## Assets

The wooden-hand photo was generated with Gemini and post-processed (crop → 1200 px → luminance-keyed alpha → WebP) —
see `PhoneScene` in `step-orbit.tsx` for the geometry constants used to align the CSS phone over it.
The logo mark in `components/brand/logo.tsx` is an SVG approximation of the Figma mark (export is disabled on the file);
replace the paths with the official SVG when available.

## Environment

| Variable                   | Purpose                                   |
| -------------------------- | ----------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`     | Canonical URL for metadata/sitemap        |
| `NEXT_PUBLIC_ANALYTICS_ID` | Optional analytics id                     |
| `SKIP_ENV_VALIDATION`      | Set to `1` to bypass zod validation in CI |
