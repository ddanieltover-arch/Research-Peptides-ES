# KPIs dashboard — Research Peptides ES

**Period baseline start:** 2026-08-20 (post Next SSR cutover)  
**Primary market:** Spain (ES) + EU locales secondary  
**Framing:** Research-use-only catalog — optimize for qualified lab demand, not medical traffic.

## North-star

**Organic-assisted purchases (EUR)** from research-intent landings (`/tienda`, PDPs, COA/educational content) within 28 days.

## KPI definitions

| KPI | Definition | Baseline | 90-day target | Source |
|-----|------------|----------|---------------|--------|
| Organic sessions (ES) | Sessions with medium = organic, country ES | TBD | +25% vs baseline month (**estimate target**) | GA4 G-0CJRFHNL7Z |
| Organic landing CVR | Purchases / organic sessions on shop+PDP landings | TBD | Improve vs baseline (no fake %) | GA4 |
| Indexed URLs | Valid indexed in GSC | TBD | All public sitemap URLs submitted; <2% errors | GSC |
| Top-10 queries | Branded + “péptidos investigación*” style queries in top 10 | TBD | Grow non-brand count | GSC |
| LCP (mobile field) | % URLs Good LCP | TBD | ≥75% Good on primary templates | CrUX / GSC |
| INP / CLS | Field CWV | TBD | Remain Good | CrUX |
| COA/content engagement | Views on `/certificados-coas`, FAQ, guide, blog RUO posts | TBD | +30% (**estimate target**) | GA4 |
| AI referral mentions | Manual monthly sample (Perplexity/ChatGPT citations) | 0 logged | Track qualitatively | Manual / `ai_citation_protocol.md` |
| GBP actions | Calls / direction / site clicks | TBD after claim | Steady MoM | GBP insights |
| Referring domains | New quality domains / quarter | TBD | +5–10 (**estimate**) | Backlink tool |

Baselines marked TBD must be filled from the first full 28-day window after SSR production traffic is stable.

## Reporting cadence

| Cadence | Owner | Artifacts |
|---------|-------|-----------|
| Weekly | SEO | GSC coverage + CWV deltas; Lighthouse CI on PRs |
| Monthly | SEO + Growth | KPI table update; content calendar progress |
| Quarterly | Leadership | Competitor qualitative refresh; link CRM review |

## Alert thresholds

- Any primary template → Poor CWV in GSC
- Sitemap spike of excluded private URLs
- Organic CVR drop >30% week-over-week (**investigate**; may be seasonality)
- New manual action / security issue in GSC

## Dashboard layout (suggested Looker/Sheets)

1. Scorecards: sessions, CVR, revenue organic, indexed count  
2. Table: landing pages  
3. Table: queries  
4. CWV status by URL group  
5. Content published vs planned (`content_calendar.csv`)
