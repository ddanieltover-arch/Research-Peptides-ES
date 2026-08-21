# Analytics setup — Research Peptides ES

**Site:** https://researchpeptides.es  
**GA4 measurement ID:** `G-0CJRFHNL7Z`  
**Updated:** 2026-08-20

## Goals

1. Attribute organic sessions and conversions (add_to_cart → purchase) by landing page.
2. Monitor indexation health via GSC (linked to GA4).
3. Respect GDPR cookie consent before non-essential tags fire.

## GA4 configuration

| Setting | Recommendation |
|---------|----------------|
| Property | Production web property for researchpeptides.es |
| Stream | Web → https://researchpeptides.es |
| Measurement ID | G-0CJRFHNL7Z |
| Time zone | Europe/Madrid |
| Currency | EUR |
| Data retention | 14 months (or org policy) |
| Google signals | Per privacy policy / consent mode |

### Events to verify

| Event | Trigger |
|-------|---------|
| `page_view` | All public routes |
| `view_item` | PDP |
| `add_to_cart` | Purchase panel |
| `begin_checkout` | Checkout start |
| `purchase` | Order success |
| `generate_lead` | Contact form success |

### Consent

- Load GA only after analytics consent (see cookie banner component).
- Document Consent Mode v2 mapping if using Google Consent Mode.

## Google Search Console

1. Verify domain (DNS TXT) or URL-prefix https://researchpeptides.es
2. Submit sitemap: `https://researchpeptides.es/sitemap.xml`
3. Link GA4 ↔ GSC in both admin UIs
4. Users: limit to SEO + engineering leads

## Dashboards (minimum)

- Acquisition → Organic Search (ES focus)
- Landing page + ecommerce conversion rate
- GSC: queries, pages, CWV, coverage

## QA checklist after deploy

- [ ] Tag Assistant / DebugView sees G-0CJRFHNL7Z on `/` and `/tienda`
- [ ] No duplicate page_view from legacy SPA + Next double-loading
- [ ] noindex routes still emit analytics if needed for UX funnels, but are excluded from SEO reports via filters
- [ ] Internal traffic filtered

## Related files

- `seo/seo_baseline.md`
- `seo/kpis_dashboard.md`
- `seo/core_web_vitals_baseline.md`
