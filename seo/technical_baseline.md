# Technical SEO baseline — Research Peptides ES

Last updated: 2026-08-20  
Skill: `.cursor/skills/seo-geo/`  
Source playbook: `SEO_GEO_Master_Prompt.md`

## Stack status — Next SSR cutover

| Era | Status |
|-----|--------|
| Vite SPA + client meta (`react-helmet-async`) | Legacy / optional `dev:vite` |
| **Next.js App Router SSR** (`app/[locale]/…`, `app/sitemap.ts`, `app/robots.ts`) | **Current** — preferred for crawlers & GEO |
| Prerender-only follow-up | Superseded by SSR path |

Indexable HTML for public routes is now server-rendered. Keep private surfaces `noindex` and out of the sitemap.

## Done in prior passes (Wave 1 technical)

| Item | Status |
|------|--------|
| Project Cursor skill `seo-geo` | Done |
| `PUBLIC_STATIC_CANONICAL_PATHS` excludes private routes | Done |
| Robots — `/api/`, search/account disallow, AI bots allowed | Done (`app/robots.ts`) |
| Per-path titles + descriptions (`pageTitles.ts`) | Done |
| `noindex` on login, profile, orders, wishlist, search (+ cart/checkout/admin) | Done |
| JSON-LD helpers (`structuredData.ts`) + brand NAP Madrid | Done |
| `vercel.json` security headers (no CSP yet) | Done |
| `llms.txt` expanded | Done |

## Waves 2–6 deliverables (this drop)

| Wave / theme | Deliverable | Path | Status |
|--------------|-------------|------|--------|
| Audit | Inventory + SSR note | `seo/audit_report.md`, `seo/audit_report.json` | Done |
| CWV | Lab baseline placeholder + URL list | `seo/core_web_vitals_baseline.md` | Done (scores TBD) |
| Baseline | GA4 `G-0CJRFHNL7Z` + GSC checklist | `seo/seo_baseline.md` | Done |
| Competitive | Qualitative ES/EU peers | `seo/competitor_report.md` | Done |
| Keywords | Seed ES map + Semrush gap (2026-08-21) | `seo/keyword_map.csv` | Done |
| Local | GBP playbook (human executes) | `seo/local_seo_playbook.md` | Done |
| Content | Audit + calendar + 8 blog + 5 PDP briefs | `seo/content_audit.csv`, `seo/content_calendar.csv`, `seo/content_briefs/` | Done |
| PDP on-page | ES/EN SEO copy + meta + FAQ for gap PDPs (5 UK + 6 ES) | `src/seo/productSeoCopy.ts`, `ProductSeoContent`, product `generateMetadata` | Done |
| Soft nav | App Router hrefs (`/es/shop`) + middleware rewrite of pretty aliases | `src/i18n/routing.ts`, `middleware.ts` | Done |
| Content ops | SEO blog seed script | `scripts/seed-seo-blog-posts.ts` | Done |
| Analytics | GA4/GSC setup + KPIs | `seo/analytics_setup.md`, `seo/kpis_dashboard.md` | Done |
| Links | Gap list + CRM + email templates | `seo/link_gap_opportunities.csv`, `seo/link_building_crm.csv`, `seo/email_templates.md` | Done |
| GEO | AI citation protocol | `seo/ai_citation_protocol.md` | Done |
| CI | Lighthouse on `/` + `/tienda`; sitemap ping on dispatch | `.github/workflows/seo-lighthouse.yml` | Done |

## Remaining risks

1. **CWV numbers still TBD** — fill `core_web_vitals_baseline.md` after production SSR traffic.
2. **CSP** — not added; GA4 + LiveChat need a staged policy.
3. **Sitemap lastmod** — still often “now”, not content-real dates.
4. **Schema depth** — HowTo for calculator/guide and richer Product fields can expand in GEO polish.
5. **GBP** — claim/verify is human-owned (`local_seo_playbook.md`).

## Explicitly deferred

- Measured competitor traffic/DR exports (attach tool CSVs before treating as fact)
- GTM migration (if desired beyond native GA4)
- Disavow file (only if toxic links appear)
- Full Rich Results validation JSON dump per URL

## Quick verification

```bash
npm run lint                 # tsc --noEmit
npm run build                # next build
npm run db:seed:seo-posts    # dry-run without Supabase creds
npm run sitemap:generate     # legacy static sitemap script (optional; App Router also serves /sitemap.xml)
```

Confirm sitemap / robots no longer promote `/cart`, `/checkout`, `/login`, `/profile`, `/orders`, `/wishlist`, `/search`.
