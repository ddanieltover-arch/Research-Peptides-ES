# SEO prerender follow-up

## Decision (2026-08 technical foundation)

Static-route HTML prerender was **not shipped** in the first technical pass.

## Why blocked

- The storefront is a Vite 6 + React Router 7 SPA with locale-prefixed routes and client-side `LocaleHead` meta injection.
- Off-the-shelf `vite-plugin-prerender` assumes simpler route graphs; combining it with `/:locale?/...` slugs, Supabase-backed product/blog pages, and auth-gated shells risks broken builds or incomplete HTML.
- Shipping a half-working prerender would create false confidence for GEO (AI crawlers reading empty shells).

## Recommended next approach

1. **Phase A — Static marketing routes (default locale `es`)**  
   Prerender only: `/`, `/tienda` (or `/shop` depending on slug map), FAQ, guide, calculator, about, shipping, contact, legal, COAs, blog index.  
   Prefer a dedicated build step that boots the app in Playwright/Puppeteer, waits for `document.title` + main content, and writes HTML into `dist/`.

2. **Phase B — Product + blog templates**  
   Generate HTML from Supabase data at build time (or ISR-style edge) for top products and published posts.

3. **Phase C — evaluate SSR migration**  
   Only if Phase A/B prove insufficient for Search Console / AI citation goals — Next.js App Router or similar, without rewriting payment/checkout prematurely.

## Acceptance criteria for “prerender shipped”

- View-source on prerendered URLs shows H1 + primary copy without executing JS
- Title, meta description, and primary JSON-LD present in raw HTML
- Localized `es` paths match production slug map
- `npm run build` remains reliable in CI without flaky browser timeouts
