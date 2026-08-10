# Research Peptides ES — SEO site profile

## Identity

| Key | Value |
|-----|--------|
| Brand | Research Peptides ES |
| Legal entity | Research Peptides ES S.L. |
| Site URL | `https://researchpeptides.es` |
| Support email | `info@researchpeptides.es` |
| HQ | Calle de la Innovación 12, 28001 Madrid, España |
| Currency | EUR |
| Area served | Spain, European Union |

Source of truth: `src/config/brand.ts`.

## Primary locales (SEO-critical)

Sitemap hreflang set typically includes: `es` (default / x-default), `en`, `nl`, `de`, `fr` (see `scripts/generate-sitemap.ts`). Runtime supports additional EU locales via `src/i18n/locales.ts`.

## Code map

| Concern | Path |
|---------|------|
| Page SEO overrides | `src/seo/SeoProvider.tsx` (`usePageSeo`) |
| Head injection | `src/i18n/LocaleHead.tsx` |
| Titles / descriptions | `src/seo/pageTitles.ts` |
| Structured data helpers | `src/seo/structuredData.ts` |
| JSON-LD component | `src/components/seo/JsonLd.tsx` |
| Route slugs + public sitemap paths | `src/i18n/routeSlugs.ts` |
| Locale path helpers | `src/i18n/routing.ts` |
| Sitemap generator | `scripts/generate-sitemap.ts` |
| robots.txt | `public/robots.txt` |
| llms.txt | `public/llms.txt` |
| Deploy / headers | `vercel.json` |
| GA4 | `index.html` (`G-0CJRFHNL7Z`) |
| Baseline notes | `seo/technical_baseline.md` |

## Indexable vs private

**Indexable (examples):** `/`, `/shop`, `/categories`, `/blog`, `/faq`, `/shipping`, `/contact`, `/about-us`, `/peptide-guide`, `/peptide-calculator`, `/coas`, `/peptide-information`, `/peptide-research`, `/terms`, `/privacy`, `/refund-returns`, product + blog post URLs.

**Private / noindex:** `/cart`, `/checkout`, `/login`, `/profile`, `/orders`, `/wishlist`, `/search`, `/admin`.

## Seed keyword themes (optional starting points)

- péptidos de investigación
- péptidos alta pureza España / UE
- certificado de análisis COA péptidos
- reconstitución de péptidos / calculadora
- BPC-157, TB-500, etc. (product-level, research-use framing)
