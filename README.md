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
│   ├── [locale]/           # layout (fonts, metadata, providers), page, 404, catch-all
│   ├── globals.css         # base styles + decorative utilities + keyframes
│   ├── sitemap.ts · robots.ts · manifest.ts
├── components/
│   ├── ui/                 # design-system primitives (Button, Badge, Card, Container, IconTile)
│   ├── layout/             # SiteHeader, SiteFooter, LocaleSwitcher, SkipLink
│   ├── motion/             # Reveal, Stagger, Floating, TextReveal, Marquee, AnimatedNumber, Providers
│   ├── mockups/            # WalletCards, PhoneFrame, LockscreenPhone, QrCode (all CSS/SVG — no images)
│   └── brand/              # Logo
├── features/landing/
│   ├── landing-page.tsx    # section order (mirrors the Figma frame)
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
