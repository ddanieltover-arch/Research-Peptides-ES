# Core Web Vitals baseline — Research Peptides ES

**Property:** https://researchpeptides.es  
**Date:** 2026-08-20  
**Status:** Lab baselines **TBD** — measure after Next SSR production deploy stabilizes.

## Measurement method (lab)

Use PageSpeed Insights (mobile + desktop) and/or Lighthouse CI (see `.github/workflows/seo-lighthouse.yml`).

Record for each URL:

| Metric | Good threshold | Field |
|--------|----------------|-------|
| LCP | ≤ 2.5 s | Largest Contentful Paint |
| INP | ≤ 200 ms | Interaction to Next Paint |
| CLS | < 0.1 | Cumulative Layout Shift |
| TTFB | ≤ 800 ms (lab proxy) | Server response (SSR-sensitive) |

Also note Performance score, Total Blocking Time, and any Next.js hydration warnings.

## URLs to measure (Spanish market)

| Label | URL | Why |
|-------|-----|-----|
| Home | https://researchpeptides.es/ | Brand + SSR shell |
| Shop | https://researchpeptides.es/tienda | Catalog weight (images, filters) |
| PDP | https://researchpeptides.es/producto/{slug} | Pick a high-traffic or hero SKU after catalog sync |
| FAQ | https://researchpeptides.es/preguntas-frecuentes | Content + FAQ schema weight |
| Blog | https://researchpeptides.es/blog | Listing; optionally one article URL |

Replace `{slug}` with a real product slug from Supabase before recording.

## Placeholder lab baseline table

| URL | Device | LCP | INP | CLS | Perf score | Date | Notes |
|-----|--------|-----|-----|-----|------------|------|-------|
| `/` | Mobile | TBD | TBD | TBD | TBD | — | Post-SSR |
| `/tienda` | Mobile | TBD | TBD | TBD | TBD | — | Image-heavy |
| PDP | Mobile | TBD | TBD | TBD | TBD | — | Choose slug |
| `/preguntas-frecuentes` | Mobile | TBD | TBD | TBD | TBD | — | |
| `/blog` | Mobile | TBD | TBD | TBD | TBD | — | |
| `/` | Desktop | TBD | TBD | TBD | TBD | — | |
| `/tienda` | Desktop | TBD | TBD | TBD | TBD | — | |

## Field data (CrUX / GSC)

- Connect Search Console → Core Web Vitals report once property is verified.
- Prefer 28-day mobile field data over single lab runs for go/no-go decisions.
- Alert if any URL group moves to “Poor” after a release.

## Next.js SSR notes for CWV

- Prefer server-streamed HTML for LCP text/hero; avoid large client-only above-the-fold blocks.
- Optimize catalog images (dimensions, modern formats, priority only on LCP image).
- Keep third-party scripts (LiveChat, analytics) deferred so INP does not regress.
