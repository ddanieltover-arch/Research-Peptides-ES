# Stack adaptations — Vite SPA (not Next.js)

The master prompt examples use Next.js `generateMetadata` / `app/sitemap.ts`. This repo is a **client-rendered Vite SPA** on Vercel. Map concepts as follows:

| Master prompt | Research Peptides ES |
|---------------|----------------------|
| `generateMetadata()` | `usePageSeo()` + `LocaleHead` DOM upserts |
| `app/sitemap.ts` | `scripts/generate-sitemap.ts` → `public/sitemap.xml` |
| `app/robots.ts` | `public/robots.txt` |
| `next/image` | Existing `<img>` / assets; WebP via build scripts |
| `next/font` | Fonts in `index.html` / CSS |
| SSR/SSG HTML | Client meta only unless prerender is added — **GEO weakness** |

## Setting per-page SEO

```tsx
import { usePageSeo } from '../seo/SeoProvider';

usePageSeo({
  title: 'Unique title | Research Peptides ES',
  description: '140–160 char description…',
  canonicalPath: '/peptide-guide',
  ogType: 'website',
  noindex: false,
  jsonLd: [/* page-specific schemas */],
});
```

For private surfaces:

```tsx
usePageSeo({ canonicalPath: '/login', noindex: true });
```

Static titles/descriptions live in `src/seo/pageTitles.ts` (`titleForPath`, `descriptionForPath`). Prefer extending that map so LocaleHead can resolve without every page passing overrides.

## Structured data

- Global Org / WebSite (+ SearchAction) / LocalBusiness: **only** via `LocaleHead` → `structuredData.ts`
- Page-level Product, FAQPage, Article, BreadcrumbList, ItemList: pass through `usePageSeo({ jsonLd })`
- Do **not** re-inject global schemas from `Layout.tsx`

## Sitemap rules

`PUBLIC_STATIC_CANONICAL_PATHS` must list **indexable** static routes only. Products and blog posts are pulled from Supabase in the generator. After changing the list, run `npm run sitemap:generate` (also runs after `npm run build`).

## AI / GEO

- Keep AI bots allowed in `robots.txt` (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc.)
- Maintain `public/llms.txt` with key page URLs
- Critical copy should eventually be in prerendered HTML — JS-only head tags are insufficient for many AI crawlers
