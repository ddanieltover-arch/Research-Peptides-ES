/**
 * Laboratory identity fields for PDP telemetry.
 * Prefer values parsed from product.specifications; fall back to curated
 * public reference identifiers keyed by normalized slug.
 */

export type ProductLabSpecs = {
  cas?: string;
  mw?: string;
  formula?: string;
  purity?: string;
};

const SPEC_PATTERNS: Array<{ key: keyof ProductLabSpecs; re: RegExp }> = [
  { key: 'cas', re: /(?:^|\b)(?:cas(?:\s*(?:n[ºo°.]?|#))?)\s*[:：]?\s*([0-9]{2,7}-[0-9]{2}-[0-9])\b/i },
  { key: 'mw', re: /(?:^|\b)(?:mw|m\.?\s*w\.?|molecular\s*weight|peso\s*molecular)\s*[:：]?\s*([0-9]+(?:[.,][0-9]+)?)\s*(?:g\/mol|da|u)?\b/i },
  { key: 'formula', re: /(?:^|\b)(?:formula|fórmula|molecular\s*formula)\s*[:：]?\s*([A-Za-z0-9()·•]+)\b/i },
  { key: 'purity', re: /(?:^|\b)(?:purity|pureza|hplc)\s*[:：]?\s*(≥?\s*[0-9]{2,3}(?:[.,][0-9]+)?\s*%?)/i },
];

/** Public reference identifiers for common catalog compounds (research identity only). */
const LAB_SPECS_BY_SLUG: Record<string, ProductLabSpecs> = {
  'bpc-157': { cas: '137525-51-0', mw: '1419.53', formula: 'C62H98N16O22', purity: '≥99%' },
  'tb-500': { cas: '77591-33-4', mw: '4963.4', formula: 'C212H350N56O78S', purity: '≥98%' },
  'thymosin-beta-4': { cas: '77591-33-4', mw: '4963.4', formula: 'C212H350N56O78S', purity: '≥98%' },
  'cjc-1295': { cas: '863288-34-0', mw: '3367.9', purity: '≥98%' },
  'cjc-1295-no-dac': { cas: '863288-34-0', mw: '3367.9', purity: '≥98%' },
  ipamorelin: { cas: '170851-70-4', mw: '711.85', formula: 'C38H49N9O5', purity: '≥99%' },
  dsip: { cas: '62568-57-4', mw: '848.81', formula: 'C35H48N10O15', purity: '≥98%' },
  semaglutide: { cas: '910463-68-2', mw: '4113.58', formula: 'C187H291N45O59', purity: '≥98%' },
  tirzepatide: { cas: '2023788-19-2', mw: '4813.45', formula: 'C225H348N48O68', purity: '≥98%' },
  retatrutide: { cas: '2381089-83-2', mw: '4731.33', purity: '≥98%' },
  'ghk-cu': { cas: '89030-95-5', mw: '403.93', formula: 'C14H22CuN6O4', purity: '≥98%' },
  'melanotan-2': { cas: '121062-08-6', mw: '1024.18', formula: 'C50H69N15O9', purity: '≥98%' },
  'melanotan-ii': { cas: '121062-08-6', mw: '1024.18', formula: 'C50H69N15O9', purity: '≥98%' },
  hexarelin: { cas: '140703-51-1', mw: '887.04', formula: 'C47H58N12O6', purity: '≥98%' },
  'hexarelin-acetate': { cas: '140703-51-1', mw: '887.04', formula: 'C47H58N12O6', purity: '≥98%' },
  sermorelin: { cas: '86168-78-7', mw: '3357.9', purity: '≥98%' },
  'sermorelin-acetate': { cas: '86168-78-7', mw: '3357.9', purity: '≥98%' },
  'aod-9604': { cas: '221231-10-3', mw: '1815.08', purity: '≥98%' },
  'hgh-fragment-176-191': { cas: '66004-57-7', mw: '1815.1', purity: '≥98%' },
  epitalon: { cas: '307297-39-8', mw: '390.35', formula: 'C14H22N4O9', purity: '≥98%' },
  epithalon: { cas: '307297-39-8', mw: '390.35', formula: 'C14H22N4O9', purity: '≥98%' },
  pinealon: { cas: '175175-23-2', mw: '330.34', formula: 'C13H22N4O6', purity: '≥98%' },
  selank: { cas: '129954-34-3', mw: '751.89', formula: 'C33H57N11O9', purity: '≥98%' },
  semax: { cas: '80714-61-0', mw: '813.92', formula: 'C37H51N9O10S', purity: '≥98%' },
  oxytocin: { cas: '50-56-6', mw: '1007.19', formula: 'C43H66N12O12S2', purity: '≥98%' },
  'oxytocin-acetate': { cas: '50-56-6', mw: '1007.19', formula: 'C43H66N12O12S2', purity: '≥98%' },
  'peg-mgf': { purity: '≥98%' },
  'ghrp-2': { cas: '158861-67-7', mw: '817.97', formula: 'C45H55N9O6', purity: '≥98%' },
  'ghrp-2-acetate': { cas: '158861-67-7', mw: '817.97', formula: 'C45H55N9O6', purity: '≥98%' },
  'ghrp-2-pralmorelin': { cas: '158861-67-7', mw: '817.97', formula: 'C45H55N9O6', purity: '≥98%' },
  'ghrp-6': { cas: '87616-84-0', mw: '873.01', formula: 'C46H56N12O6', purity: '≥98%' },
  'ghrp-6-acetate': { cas: '87616-84-0', mw: '873.01', formula: 'C46H56N12O6', purity: '≥98%' },
  'pt-141': { cas: '189691-06-3', mw: '1025.18', formula: 'C50H68N14O10', purity: '≥98%' },
  bremelanotide: { cas: '189691-06-3', mw: '1025.18', formula: 'C50H68N14O10', purity: '≥98%' },
  'mots-c': { cas: '1627580-64-6', mw: '2174.6', purity: '≥98%' },
  'ss-31': { cas: '736992-21-5', mw: '639.79', purity: '≥98%' },
  mazdutide: { cas: '2259884-22-1', purity: '≥98%' },
  aod9604: { cas: '221231-10-3', mw: '1815.08', purity: '≥98%' },
  'tb500': { cas: '77591-33-4', mw: '4963.4', purity: '≥98%' },
  'tb500-frag': { cas: '77591-33-4', purity: '≥98%' },
  'tb500-thymosin-beta-4-acetate': { cas: '77591-33-4', mw: '4963.4', purity: '≥98%' },
  'mt-2': { cas: '121062-08-6', mw: '1024.18', formula: 'C50H69N15O9', purity: '≥98%' },
  'mt-1': { cas: '75921-69-6', mw: '1646.85', purity: '≥98%' },
  'll-37': { cas: '154947-66-7', mw: '4493.4', purity: '≥98%' },
  'kpv': { purity: '≥98%' },
  tesamorelin: { cas: '218949-48-5', mw: '5135.9', purity: '≥98%' },
  'igf-1-lr3': { cas: '143045-27-6', mw: '9111.0', purity: '≥98%' },
  nad: { cas: '53-84-9', mw: '663.43', formula: 'C21H26N7O14P2', purity: '≥98%' },
  'cagrilintide': { cas: '1415456-99-3', purity: '≥98%' },
};

const NOISE_SPEC =
  /source:|price-list|wholesale|usd nominal|gbp using rate|lyophilized powder catalog|línea de catálogo|almacenadas como|research use only|10% below|variant options/i;

export function normalizeProductSlug(slug: string | null | undefined): string {
  return String(slug || '')
    .toLowerCase()
    .trim()
    .replace(/\(.*?\)/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function slugLookupKeys(slug: string): string[] {
  const base = normalizeProductSlug(slug);
  const keys = new Set<string>([base]);
  const stripped = base
    .replace(/-x-\d+-vials?$/, '')
    .replace(/-\d+(?:mg|mcg|iu)(?:-\d+vials?)?$/, '')
    .replace(/-acetate$/, '')
    .replace(/-powder-list$/, '')
    .replace(/-glp-1$/, '')
    .replace(/-glp-3$/, '')
    .replace(/-without-dac$/, '-no-dac')
    .replace(/-with-dac$/, '')
    .replace(/-mitochondrial-derived-peptide$/, '')
    .replace(/-delta-sleep-inducing-peptide$/, '')
    .replace(/-melanotan-2-acetate(?:-\d+mg)?$/, '')
    .replace(/-melanotan-1-acetate(?:-\d+mg)?$/, '');
  keys.add(stripped);
  if (stripped.startsWith('mt-2')) keys.add('mt-2');
  if (stripped.startsWith('mt-1')) keys.add('mt-1');
  if (stripped.includes('tb500') || stripped.includes('tb-500')) keys.add('tb-500');
  if (stripped.includes('bpc-157')) keys.add('bpc-157');
  if (stripped.includes('semaglutide')) keys.add('semaglutide');
  if (stripped.includes('tirzepatide')) keys.add('tirzepatide');
  if (stripped.includes('retatrutide')) keys.add('retatrutide');
  if (stripped.includes('ghk-cu')) keys.add('ghk-cu');
  if (stripped.includes('cjc-1295')) keys.add(stripped.includes('no-dac') || stripped.includes('without') ? 'cjc-1295-no-dac' : 'cjc-1295');
  if (stripped.includes('hgh-fragment')) keys.add('hgh-fragment-176-191');
  if (stripped.includes('aod')) keys.add('aod-9604');
  const parts = stripped.split('-').filter(Boolean);
  if (parts.length >= 2) keys.add(parts.slice(0, 2).join('-'));
  if (parts.length >= 3) keys.add(parts.slice(0, 3).join('-'));
  if (parts.length >= 1) keys.add(parts[0]);
  return [...keys];
}

export function parseLabSpecsFromLines(lines: string[] | null | undefined): ProductLabSpecs {
  const out: ProductLabSpecs = {};
  if (!lines?.length) return out;
  for (const line of lines) {
    for (const { key, re } of SPEC_PATTERNS) {
      if (out[key]) continue;
      const match = line.match(re);
      if (match?.[1]) {
        let value = match[1].trim().replace(/\s+/g, '');
        if (key === 'purity' && !value.includes('%')) value = `${value}%`;
        if (key === 'mw') value = value.replace(',', '.');
        out[key] = value;
      }
    }
  }
  return out;
}

export function resolveProductLabSpecs(
  slug: string | null | undefined,
  specifications?: string[] | null,
): ProductLabSpecs {
  const parsed = parseLabSpecsFromLines(specifications);
  let curated: ProductLabSpecs = {};
  for (const key of slugLookupKeys(slug || '')) {
    if (LAB_SPECS_BY_SLUG[key]) {
      curated = LAB_SPECS_BY_SLUG[key];
      break;
    }
  }
  return {
    cas: parsed.cas || curated.cas,
    mw: parsed.mw || curated.mw,
    formula: parsed.formula || curated.formula,
    purity: parsed.purity || curated.purity,
  };
}

export function hasLabSpecs(specs: ProductLabSpecs): boolean {
  return Boolean(specs.cas || specs.mw || specs.formula || specs.purity);
}

/** Numeric purity percent from strings like "≥99.4%" or "98%". */
export function parsePurityPercent(purity: string | null | undefined): number | null {
  if (!purity) return null;
  const match = String(purity).replace(',', '.').match(/(\d{2,3}(?:\.\d+)?)/);
  if (!match) return null;
  const value = Number(match[1]);
  return Number.isFinite(value) ? value : null;
}

export function productMeetsPurityMin(
  slug: string | null | undefined,
  minPercent: number | null,
  specifications?: string[] | null,
): boolean {
  if (minPercent == null || minPercent <= 0) return true;
  const purity = parsePurityPercent(resolveProductLabSpecs(slug, specifications).purity);
  return purity != null && purity >= minPercent;
}

/** Filter import/noise lines so PDP profile stays useful. */
export function filterDisplaySpecifications(lines: string[] | null | undefined): string[] {
  if (!lines?.length) return [];
  return lines
    .map((s) => s.trim())
    .filter((s) => s.length > 0 && !NOISE_SPEC.test(s))
    .slice(0, 8);
}
