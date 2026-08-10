# Technical SEO baseline — Research Peptides ES

Last updated: 2026-08-09  
Skill: `.cursor/skills/seo-geo/`  
Source playbook: `SEO_GEO_Master_Prompt.md`

## Done in this pass

| Item | Status |
|------|--------|
| Project Cursor skill `seo-geo` | Done |
| `PUBLIC_STATIC_CANONICAL_PATHS` excludes private routes | Done |
| `public/robots.txt` — `/api/`, search disallow, AI bots incl. Google-Extended | Done |
| Per-path titles + descriptions (`pageTitles.ts`) | Done |
| `noindex` on login, profile, orders, wishlist, search (+ existing cart/checkout/admin) | Done |
| Explicit `index, follow` + `og:locale` / alternates in `LocaleHead` | Done |
| Global JSON-LD single path (LocaleHead); locale-aware SearchAction | Done |
| Removed duplicate Layout schemas + orphaned `SEO.tsx` | Done |
| `vercel.json` security headers (no CSP yet) | Done |
| Expanded `public/llms.txt` | Done |
| `usePageSeo` on public marketing/legal pages | Done |
| Prerender static HTML | Deferred — see `docs/seo-prerender-followup.md` |

## Remaining risks

1. **SPA shell** — crawlers/AI that do not execute JS still see thin `index.html`. Highest-impact next step is prerender/SSR.
2. **CSP** — not added; GA4 + LiveChat need a carefully staged policy.
3. **Sitemap lastmod** — still build-time “today”, not content-real dates.
4. **Schema coverage** — HowTo for calculator/guide and richer Product fields can wait for content/GEO phase.

## Explicitly deferred (later phases)

- Section 0 full crawl CSVs / competitor report
- Section 1 keyword map + content briefs
- Answer capsules / glossary / comparison GEO pages
- Link building / disavow
- GTM migration
- Lighthouse CI workflow
- Full Next.js SSR rewrite

## Quick verification

```bash
npm run sitemap:generate   # refresh public/sitemap.xml
npm run lint               # tsc --noEmit
npm run build              # vite build + sitemap
```

Confirm sitemap no longer lists `/cart`, `/checkout`, `/login`, `/profile`, `/orders`, `/wishlist`, `/search`.
