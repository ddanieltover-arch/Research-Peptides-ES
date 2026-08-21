# SEO link graph (keyword anchors)

## What shipped

- Graph: `src/seo/seoLinkGraph.ts` (ranking + Semrush-gap ES anchors)
- UI: `src/components/seo/RelatedSeoLinks.tsx`
- Wired: `StaticPageHost` (all indexable static pages), `ProductDetails`, `BlogArticleTemplate`, `SiteFooter`

## Rules enforced

| Rule | How |
|------|-----|
| Keyword anchors | Internal links use map/gap phrases (e.g. `comprar dsip`, `calculadora de péptidos`) |
| ≥5 inbound / page | Dense cross-links in graph + footer column linking all hubs + priority PDPs on every page |
| ≥2 outbound / page | Each graph set + footer: PubMed, PubChem (and page-specific UniProt / EUR-Lex / EMA / PeptideAtlas) |

Outbound targets are **scientific / regulatory** sites only — not competitor shops.

## Verify

```bash
npx tsx scripts/verify-seo-link-graph.mjs
```
