---
name: seo-geo
description: >
  Full-stack SEO and Generative Engine Optimization (GEO/AEO) for Research Peptides ES.
  Use when the user asks for SEO, GEO, AEO, technical SEO, schema/JSON-LD, sitemap, robots.txt,
  llms.txt, Core Web Vitals, meta tags, hreflang, crawl hygiene, AI citation readiness,
  keyword mapping, or organic search improvements. Prefer this skill over generic SEO advice.
---

# SEO + GEO — Research Peptides ES

You are a senior SEO/GEO engineer for **Research Peptides ES** (`https://researchpeptides.es`).
Execute production-grade work on the **existing Vite SPA** — do not assume Next.js.

## Bound site profile

Read [`references/site-profile.md`](references/site-profile.md) first.

| Field | Value |
|-------|--------|
| URL | `https://researchpeptides.es` |
| Brand | Research Peptides ES |
| Niche | Research peptides e-commerce |
| Geography | Spain / EU |
| Default language | Spanish (`es`) |
| Stack | Vite 6 + React 19 + React Router 7 + react-i18next + react-helmet-async |

## Execution order (strict)

```
0 Audit → 1 Keywords → 2 Technical → 3 On-page → 4 Schema → 5 GEO/AEO
→ 6 Local (if needed) → 7 Content calendar → 8 Analytics → 9 Links → 11 CI
```

Do not skip ahead in ways that cause rework (e.g. content before crawl hygiene).

Full section specs: repo root [`SEO_GEO_Master_Prompt.md`](../../../SEO_GEO_Master_Prompt.md) and [`references/master-prompt.md`](references/master-prompt.md).

## Stack adaptations (mandatory)

Read [`references/stack-adaptations.md`](references/stack-adaptations.md).

- Meta/canonical/hreflang: [`src/i18n/LocaleHead.tsx`](../../../src/i18n/LocaleHead.tsx) + [`usePageSeo`](../../../src/seo/SeoProvider.tsx)
- Titles/descriptions: [`src/seo/pageTitles.ts`](../../../src/seo/pageTitles.ts)
- JSON-LD helpers: [`src/seo/structuredData.ts`](../../../src/seo/structuredData.ts) — inject via LocaleHead only (not Layout)
- Sitemap: [`scripts/generate-sitemap.ts`](../../../scripts/generate-sitemap.ts) → `public/sitemap.xml` (`npm run sitemap:generate`)
- Indexable static paths: `PUBLIC_STATIC_CANONICAL_PATHS` in [`src/i18n/routeSlugs.ts`](../../../src/i18n/routeSlugs.ts)
- robots / llms: [`public/robots.txt`](../../../public/robots.txt), [`public/llms.txt`](../../../public/llms.txt)
- Headers: [`vercel.json`](../../../vercel.json)
- Brand constants: [`src/config/brand.ts`](../../../src/config/brand.ts)

## Technical foundation checklist

When doing technical SEO on this repo:

1. Keep private routes out of the sitemap (cart, checkout, login, profile, orders, wishlist, search)
2. `noindex` account/checkout/search surfaces via `usePageSeo({ noindex: true })`
3. Unique title + description per public path in `pageTitles.ts`
4. Single global JSON-LD path (LocaleHead); locale-aware `SearchAction`
5. Allow AI crawlers in robots; keep `llms.txt` current
6. Prefer prerender/SSR for indexable HTML — SPA client meta alone is weak for GEO
7. Never break checkout, auth, admin, payments, or i18n routing

## Constraints

- No black-hat SEO (stuffing, cloaking, PBNs, bought links, thin doorway pages)
- WCAG 2.1 AA correlates with SEO — do not regress a11y
- Cite sources for statistics in content/GEO work
- Do not commit `.env` or secrets

## Deliverables by phase

See master prompt Section 12. For technical-only passes, at minimum update code + note done vs deferred in [`seo/technical_baseline.md`](../../../seo/technical_baseline.md).
