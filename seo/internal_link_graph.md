# SEO link graph (keyword anchors)

## What shipped

- Graph: `src/seo/seoLinkGraph.ts` (ranking + Semrush organic ES anchors through 2026-09-09)
- UI: `src/components/seo/RelatedSeoLinks.tsx`
- Wired: `StaticPageHost` (all indexable static pages), `ProductDetails`, `BlogArticleTemplate`, `SiteFooter`
- Priority PDP copy: `src/seo/productSeoCopy.ts` (includes retatrutide, cagrilintide blend/solo, semaglutide, follistatin, IGF-1 LR3, bacteriostatic water, …)

## Semrush 2026-09-09 additions

New keyword hubs: `retatrutide comprar`, cagrilintide cluster, folistatina/follistatin, `igf-1 comprar`, bacteriostatic water variants, shop intents (`péptidos comprar en linea`, `péptidos inyectables comprar`), `calculadora peptidos`, `europa peptide`.

Skipped noise/unrelated SERP terms (typos like peptdes/peptids, lipofectamine, estreptavidina, competitor brand 24peptides).

## Rules enforced

| Rule | How |
|------|-----|
| Keyword anchors | Internal links use map/gap phrases (e.g. `retatrutide comprar`, `calculadora peptidos`) |
| ≥5 inbound / page | Dense cross-links in graph + footer column linking hubs + priority PDPs on every page |
| ≥2 outbound / page | Each graph set + footer: PubMed, PubChem, EMA (and page-specific UniProt / EUR-Lex / PeptideAtlas) |

Outbound targets are **scientific / regulatory** sites only — not competitor shops.

## Verify

```bash
npx tsx scripts/verify-seo-link-graph.mjs
```
