# Blog SEO + GEO coverage

## Problem
Older catalog posts and generic seed articles had no unique title/meta, no GEO answer capsule, no keyword chips, and only a shared default link block (or none visible in the article). Question posts had graph keys but still no on-page GEO/FAQ.

## Standard (master prompt §§1, 3, 5, 9)
Every indexable blog URL now gets:

| Layer | Source |
|-------|--------|
| Unique title + meta (keyword + RUO) | `src/seo/blogSeoCopy.ts` → `generateMetadata` + `usePageSeo` |
| GEO answer capsule (`#answer`, 40–60 words) | `BlogSeoContent` |
| Primary + secondary keywords | chips above the body |
| Visible FAQ (question-first) | `BlogSeoContent` + FAQPage JSON-LD |
| ≥5 inbound | graph + footer keyword anchors |
| ≥2 outbound | PubMed / PubChem / EUR-Lex / EMA / UniProt / PeptideAtlas |
| Article schema | `blogArticleJsonLd` |

Unknown/legacy IDs use a title-based fallback so **no post is left blank**.

## Mapped posts (22)
Seed: reconstitucion, como-leer-coa, cadena-frio, uso-exclusivo  
Core: glp1, coa-lote, envio-frio, almacenamiento, hplc, calculadora-guia, bpc-157, reconstitute, tb-500-vs-bpc  
Question: retatrutide, comprar-peptidos, cagrilintide, bacteriostatica, folistatina, igf-1, inyectables, calculadora, compare-GLP

## Reseed body links (optional)
Template links work without a DB write. To refresh **in-article** markdown links on core posts:

```bash
npm run db:seed:blogs
```

(or the existing ES content seed that upserts `esCoreBlogPosts`).
