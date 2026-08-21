# SEO audit report — Research Peptides ES

**Site:** https://researchpeptides.es  
**Brand:** Research Peptides ES  
**Market:** Spain / EU · language default `es`  
**NAP:** Calle de la Innovación 12, 28001 Madrid · info@researchpeptides.es  
**Audit date:** 2026-08-20  
**Stack note:** Cutover from Vite SPA + client meta to **Next.js App Router SSR** (`app/[locale]/…`). Indexable HTML is now server-rendered for public routes.

## SSR cutover (Wave 1+)

| Before | After |
|--------|--------|
| Thin `index.html` shell; meta via `react-helmet-async` | `generateMetadata` / App Router pages + `app/sitemap.ts`, `app/robots.ts` |
| Prerender deferred | SSR preferred path for crawlers and AI bots |
| Private routes blocked in static sitemap script | Same hygiene via `PUBLIC_STATIC_CANONICAL_PATHS` + robots disallow |

## Indexable routes (Spanish unprefixed URLs)

Public marketing and catalog surfaces should remain `index,follow` and appear in the sitemap:

| Canonical (internal) | ES public path (example) | Type |
|----------------------|--------------------------|------|
| `/` | `/` | Home |
| `/shop` | `/tienda` | Catalog |
| `/categories` | `/categorias` | Hub |
| `/blog`, `/blog/[id]` | `/blog`, `/blog/{id}` | Content |
| `/product/[slug]` | `/producto/{slug}` | PDP |
| `/preguntas-frecuentes` | `/preguntas-frecuentes` | Support |
| `/shipping` | `/envio` | Support |
| `/contact` | `/contacto` | Local / NAP |
| `/about-us` | `/sobre-nosotros` | Brand |
| `/certificados-coas`, `/coa-vs-sin-coa` | `/certificados-coas`, localized | Trust |
| `/peptide-guide`, `/peptide-calculator`, `/peptide-information`, `/peptide-research`, `/peptide-glossary`, `/peptide-stats` | Localized ES slugs | Educational |
| `/terms`, `/privacy`, `/refund-returns` | Localized | Legal |

Source of truth for static public paths: `PUBLIC_STATIC_CANONICAL_PATHS` in `src/i18n/routeSlugs.ts`.

## Noindex / non-sitemap routes

| Route | Reason |
|-------|--------|
| `/cart` (`/carrito`) | Transactional |
| `/checkout` (`/pago`) | Transactional |
| `/login` | Account |
| `/profile` | Account |
| `/orders` | Account |
| `/wishlist` | Account |
| `/search` | Faceted / thin |
| `/admin` | Private ops |
| `/api/*` | Disallow in robots |

Robots also disallow locale-prefixed variants of the above (`/*/cart`, etc.).

## Crawl hygiene summary

- **Sitemap:** dynamic `app/sitemap.ts` (static + products + blog from Supabase when credentials exist).
- **Robots:** `app/robots.ts` — allow AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc.); sitemap URL published.
- **Hreflang:** locale alternates via routing (`es` unprefixed; `en|nl|de|fr` prefixed).
- **Research-use framing:** all public copy must state compounds are for laboratory research only — not for human or veterinary use.

## Priority follow-ups

1. Measure Core Web Vitals lab baselines (see `core_web_vitals_baseline.md`).
2. Confirm GSC property + sitemap submission (`seo_baseline.md`).
3. Execute local GBP claim checklist (`local_seo_playbook.md`) — human only.
4. Publish seeded SEO blog posts (`npm run db:seed:seo-posts`).

Machine-readable twin: `seo/audit_report.json`.
