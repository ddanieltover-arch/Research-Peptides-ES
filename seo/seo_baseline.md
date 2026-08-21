# SEO baseline — Research Peptides ES

**Site:** https://researchpeptides.es  
**Updated:** 2026-08-20  
**Stack:** Next.js App Router SSR (post Vite SPA cutover)

## Analytics property

| Tool | ID / property | Status |
|------|---------------|--------|
| Google Analytics 4 | **G-0CJRFHNL7Z** | Confirm tag fires on production (consent-gated if GDPR banner blocks until accept) |
| Google Search Console | Property for `https://researchpeptides.es` | Verify + submit sitemap |
| Bing Webmaster | Optional mirror of GSC | Recommended for EU discovery |

## GA4 checklist

- [ ] Measurement ID `G-0CJRFHNL7Z` present in production config / consent-aware loader
- [ ] Enhanced measurement: page views, outbound clicks, site search (if search is index-blocked, still track internally)
- [ ] Custom events (recommended): `add_to_cart`, `begin_checkout`, `purchase`, `view_item`, `generate_lead` (contact)
- [ ] Exclude internal traffic (office / agency IPs)
- [ ] Link GA4 ↔ GSC
- [ ] EUR currency in ecommerce params
- [ ] DebugView smoke test on `/`, `/tienda`, one PDP, `/preguntas-frecuentes`

## Google Search Console checklist

- [ ] Domain or URL-prefix property verified (DNS preferred for domain)
- [ ] Sitemap submitted: `https://researchpeptides.es/sitemap.xml`
- [ ] International targeting: Spanish primary; monitor hreflang in Page indexing
- [ ] Coverage: confirm private routes are excluded / noindex (cart, checkout, login, profile, orders, wishlist, search, admin)
- [ ] Inspect sample URLs: `/`, `/tienda`, one `/producto/…`, `/preguntas-frecuentes`, `/blog`
- [ ] Mobile usability / CWV reports reviewed monthly
- [ ] Manual actions & security issues: zero expected
- [ ] robots.txt tester: AI bots allowed; `/api/` and account paths blocked

## Brand & NAP consistency (baseline)

| Field | Value |
|-------|--------|
| Legal / brand | Research Peptides ES |
| Address | Calle de la Innovación 12, 28001 Madrid, España |
| Email | info@researchpeptides.es |
| Framing | Solo para investigación / research use only |

## Related deliverables

- `seo/analytics_setup.md` — implementation detail  
- `seo/kpis_dashboard.md` — targets  
- `seo/core_web_vitals_baseline.md` — performance URLs  
- `seo/technical_baseline.md` — technical done/deferred
