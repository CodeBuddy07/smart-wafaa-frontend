@AGENTS.md

# Smart Wafaa — frontend (marketing site)

Standalone Next.js repo. Umbrella docs for the whole product live one level up: `../README.md`, `../docs/`.

- Layout, scripts and conventions: `README.md`. Design tokens: `src/styles/theme.css` + `src/lib/tokens.ts`.
- All copy lives in `messages/en.json` (type schema) and `messages/ar.json` (must mirror keys — unit-tested).
- Use logical CSS properties (`ps-`/`pe-`/`start-`/`end-`) — the site ships RTL Arabic at `/ar`.
- Before handing work back: `pnpm check` (typecheck + lint + format + unit) and `pnpm test:e2e`.
- Commit locally with Conventional Commits (`feat(landing): …`). **Never push** — the owner pushes manually.
- Image generation for new assets: Gemini (gemini.google.com in the owner's browser), then post-process with
  `sharp` (see `public/images/how-it-works/` provenance in README).
