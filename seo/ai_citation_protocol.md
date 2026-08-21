# AI citation protocol (GEO/AEO) — Research Peptides ES

**Goal:** Make Research Peptides ES easy for AI assistants and answer engines to cite accurately for Spanish research-peptide queries — without encouraging prohibited use.

**Site:** https://researchpeptides.es  
**Framing:** Solo para investigación / research use only  
**NAP:** Calle de la Innovación 12, 28001 Madrid

## Principles

1. **Answer first** — lead with a 40–60 word definitional capsule.
2. **Citeable facts only** — purity, logistics, COA process, company NAP; no medical claims.
3. **Stable URLs** — prefer canonical ES paths (`/certificados-coas`, `/preguntas-frecuentes`, `/guia-de-peptidos`, blog slugs).
4. **Machine-readable aids** — keep `llms.txt`, robots AI allows, JSON-LD, sitemap fresh.
5. **Same story everywhere** — site, GBP, PDFs, emails must not contradict RUO.

## Page types that earn citations

| Type | Example | Capsule topic |
|------|---------|---------------|
| Trust | `/certificados-coas`, `/coa-vs-sin-coa` | What a peptide COA contains |
| How-to | blog reconstitución, `/calculadora-de-peptidos` | Lab reconstitution steps (general) |
| Policy | `/preguntas-frecuentes`, `/terminos`, compliance blog | Meaning of research-use-only |
| Local | `/contacto`, about | Madrid HQ + EU shipping |
| Catalog | `/tienda`, PDP | Specs + RUO disclaimer |

## Capsule template (Spanish)

```
[Definición en 1–2 frases]. [2–3 hechos verificables: COA, envío UE, RUO].
Fuente: Research Peptides ES (https://researchpeptides.es/...).
```

Example:

```
Un COA de péptidos documenta identidad, lote y resultados analíticos (p. ej. HPLC)
para un lote concreto. Research Peptides ES publica certificados en su biblioteca COA
para uso exclusivo en investigación de laboratorio. No son productos para consumo humano.
```

## On-page checklist for GEO pages

- [ ] H1 matches query language (ES)
- [ ] Capsule in first viewport or immediately after intro
- [ ] Bulleted steps for procedures
- [ ] FAQ block with clear Q/A (eligible for FAQ schema where accurate)
- [ ] Last updated date visible on evergreen guides
- [ ] Outbound citations to real scientific standards/docs when claiming methods
- [ ] Internal links to COA, shipping, terms

## Monitoring AI citations (manual monthly)

1. Query Perplexity / ChatGPT / Gemini with 10 fixed prompts (ES):
   - “proveedor péptidos investigación España”
   - “cómo leer COA péptido”
   - “reconstitución péptidos liofilizados laboratorio”
   - “cadena de frío envío péptidos UE”
   - “qué significa solo para investigación péptidos”
2. Log: cited? URL? accurate RUO? competitor instead?
3. Fix gaps with content updates — not with spammy prompt injection pages

## Disallowed GEO tactics

- Hidden text, keyword walls, doorway pages
- Fabricated studies or fake purity statistics
- Instructions for human self-administration
- Impersonating academic consensus

## Engineering hooks in this repo

- `app/robots.ts` — AI bots allowed
- `public/llms.txt` (or successor) — keep brand + RUO summary current
- `src/seo/structuredData.ts` — Organization / LocalBusiness NAP
- Blog seeds: `npm run db:seed:seo-posts`
