/**
 * SEO internal/external link graph for Research Peptides ES.
 * Anchors use ranking + Semrush gap keywords (ES). Paths are canonical (EN segments).
 * Target: every indexable hub / priority PDP has ≥5 inbound edges in this graph;
 * every page that renders RelatedSeoLinks emits ≥2 outbound scientific refs.
 */

export type SeoInternalLink = {
  /** Canonical path, e.g. `/shop` or `/product/dsip` */
  to: string;
  /** Visible keyword anchor */
  anchor: string;
};

export type SeoExternalLink = {
  href: string;
  label: string;
};

export type SeoLinkSet = {
  internal: SeoInternalLink[];
  external: SeoExternalLink[];
};

/** Shared reputable outbound refs (not competitor stores). */
export const SEO_EXTERNAL_POOL = {
  pubmed: {
    href: 'https://pubmed.ncbi.nlm.nih.gov/',
    label: 'PubMed (NCBI)',
  },
  pubchem: {
    href: 'https://pubchem.ncbi.nlm.nih.gov/',
    label: 'PubChem',
  },
  uniprot: {
    href: 'https://www.uniprot.org/',
    label: 'UniProt',
  },
  eurlex: {
    href: 'https://eur-lex.europa.eu/',
    label: 'EUR-Lex',
  },
  ema: {
    href: 'https://www.ema.europa.eu/',
    label: 'EMA',
  },
  peptideAtlas: {
    href: 'https://peptideatlas.org/',
    label: 'PeptideAtlas',
  },
} as const;

const E = SEO_EXTERNAL_POOL;

/** Keyword-anchored hub targets used across the site. */
export const SEO_HUB_LINKS = {
  home: { to: '/', anchor: 'péptidos de investigación España' },
  shop: { to: '/shop', anchor: 'comprar péptidos investigación' },
  shopLab: { to: '/shop', anchor: 'péptidos laboratorio España' },
  shopLyophilized: { to: '/shop', anchor: 'péptidos liofilizados comprar' },
  categories: { to: '/categories', anchor: 'categorías de péptidos' },
  contact: { to: '/contact', anchor: 'péptidos de investigación Madrid' },
  coas: { to: '/coas', anchor: 'certificado de análisis COA péptidos' },
  coasHplc: { to: '/coas', anchor: 'pureza HPLC péptidos' },
  coasLib: { to: '/coas', anchor: 'biblioteca COA péptidos' },
  coaCompare: { to: '/coa-vs-no-coa', anchor: 'COA vs sin COA péptidos' },
  calculator: { to: '/peptide-calculator', anchor: 'calculadora de péptidos' },
  guide: { to: '/peptide-guide', anchor: 'guía de péptidos de investigación' },
  glossary: { to: '/peptide-glossary', anchor: 'glosario de péptidos' },
  shipping: { to: '/shipping', anchor: 'cadena de frío péptidos envío UE' },
  shippingEs: { to: '/shipping', anchor: 'envío péptidos España' },
  faq: { to: '/faq', anchor: 'péptidos solo para investigación' },
  faqAlt: { to: '/faq', anchor: 'faq péptidos investigación' },
  blog: { to: '/blog', anchor: 'almacenamiento péptidos liofilizados' },
  about: { to: '/about-us', anchor: 'proveedor péptidos UE' },
  research: { to: '/peptide-research', anchor: 'investigación peptídica Europa' },
  information: { to: '/peptide-information', anchor: 'información de péptidos' },
  stats: { to: '/peptide-stats', anchor: 'estadísticas de péptidos' },
  terms: { to: '/terms', anchor: 'cumplimiento uso exclusivo investigación' },
  privacy: { to: '/privacy', anchor: 'política de privacidad' },
  returns: { to: '/refund-returns', anchor: 'devoluciones y reembolsos' },
  dsip: { to: '/product/dsip', anchor: 'precio y comprar dsip' },
  dsipBuy: { to: '/product/dsip', anchor: 'comprar dsip' },
  hexarelin: { to: '/product/hexarelin-acetate', anchor: 'comprar original hexarelin' },
  hexarelinShort: { to: '/product/hexarelin-acetate', anchor: 'hexarelin' },
  sermorelin: {
    to: '/product/sermorelin-acetate',
    anchor: 'comprar original acetato de sermorelina',
  },
  pegMgf: { to: '/product/peg-mgf', anchor: 'comprar original peg-mgf' },
  frag: { to: '/product/hgh-fragment-176-191', anchor: 'precio y comprar frag 176-191' },
  peptidesEu: { to: '/', anchor: 'peptides eu' },
  peptidesSpain: { to: '/', anchor: 'peptides spain' },
  shopComprar: { to: '/shop', anchor: 'comprar peptidos' },
  shopPeptidosEs: { to: '/shop', anchor: 'peptidos españa' },
  shopPeptidosComprar: { to: '/shop', anchor: 'péptidos comprar' },
  retatrutide: { to: '/product/retatrutide', anchor: 'retatrutide españa' },
  retatrutideBuy: { to: '/product/retatrutide', anchor: 'comprar retatrutide' },
  retatrutideComprar: { to: '/product/retatrutide', anchor: 'retatrutide comprar' },
  retatrutidePrecio: { to: '/product/retatrutide', anchor: 'retatrutide precio españa' },
  retatrutideBarato: { to: '/product/retatrutide', anchor: 'retatrutide barato' },
  retatrutideSpain: { to: '/product/retatrutide', anchor: 'retatrutide spain' },
  cagrilintide: {
    to: '/product/cagrilintide-semaglutide-blend',
    anchor: 'comprar cagrilintide',
  },
  cagrilintidePrecio: {
    to: '/product/cagrilintide-semaglutide-blend',
    anchor: 'cagrilintide precio',
  },
  cagrilintideVenta: {
    to: '/product/cagrilintide-semaglutide-blend',
    anchor: 'cagrilintide venta',
  },
  follistatin: { to: '/product/follistatin', anchor: 'folistatina comprar' },
  follistatinVenta: { to: '/product/follistatin', anchor: 'follistatin venta' },
  igf1: { to: '/product/igf-1-lr3', anchor: 'igf-1 comprar' },
  semaglutide: { to: '/product/semaglutide', anchor: 'semaglutide investigación' },
  ghkCu: { to: '/product/ghk-cu', anchor: 'ghk cu' },
  bpc157: { to: '/product/bpc-157', anchor: 'bpc 157 peptide' },
  pt141: { to: '/product/pt-141', anchor: 'pt-141 comprar' },
  melanotan: { to: '/product/mt-2-melanotan-2-acetate', anchor: 'melanotan 2 donde comprar' },
  bacWater: { to: '/product/bacteriostatic-water', anchor: 'agua bacteriostatica comprar' },
  bacWaterEn: { to: '/product/bacteriostatic-water', anchor: 'bacteriostatic water' },
  bacWaterIny: {
    to: '/product/bacteriostatic-water',
    anchor: 'agua bacteriostática para inyección',
  },
  shopOnline: { to: '/shop', anchor: 'péptidos comprar en linea' },
  shopInyectables: { to: '/shop', anchor: 'péptidos inyectables comprar' },
  shopPeptidesComprar: { to: '/shop', anchor: 'peptides comprar' },
  shopComprarEs: { to: '/shop', anchor: 'comprar peptidos en españa' },
  calculatorAlt: { to: '/peptide-calculator', anchor: 'calculadora peptidos' },
  aboutEuropa: { to: '/about-us', anchor: 'europa peptide' },
  aboutEurope: { to: '/about-us', anchor: 'research peptides-europe' },
} as const;

type HubKey = keyof typeof SEO_HUB_LINKS;

function pick(...keys: HubKey[]): SeoInternalLink[] {
  return keys.map((k) => ({ ...SEO_HUB_LINKS[k] }));
}

function ext(...keys: (keyof typeof SEO_EXTERNAL_POOL)[]): SeoExternalLink[] {
  return keys.map((k) => ({ ...E[k] }));
}

/**
 * Per-page outbound sets. Internal edges are designed so each hub/PDP below
 * is linked from ≥5 other keys (see `assertSeoInboundCoverage` in tests/scripts).
 */
export const SEO_PAGE_LINKS: Record<string, SeoLinkSet> = {
  home: {
    internal: pick(
      'shopComprar',
      'shopPeptidosEs',
      'shopComprarEs',
      'shopOnline',
      'peptidesSpain',
      'retatrutideComprar',
      'cagrilintide',
      'follistatin',
      'igf1',
      'bacWater',
      'aboutEuropa',
      'guide',
      'coas',
    ),
    external: ext('pubmed', 'pubchem', 'ema'),
  },
  shop: {
    internal: pick(
      'home',
      'shopPeptidosComprar',
      'shopInyectables',
      'shopPeptidesComprar',
      'retatrutideComprar',
      'retatrutideBarato',
      'cagrilintidePrecio',
      'cagrilintideVenta',
      'follistatinVenta',
      'igf1',
      'semaglutide',
      'bacWaterEn',
      'coaCompare',
      'calculatorAlt',
    ),
    external: ext('pubchem', 'peptideAtlas', 'pubmed'),
  },
  categories: {
    internal: pick(
      'shopLab',
      'glossary',
      'research',
      'stats',
      'hexarelinShort',
      'cagrilintide',
      'follistatin',
      'guide',
      'blog',
      'home',
    ),
    external: ext('uniprot', 'pubmed'),
  },
  blog: {
    internal: pick(
      'calculator',
      'guide',
      'coasLib',
      'shippingEs',
      'faqAlt',
      'shopLyophilized',
      'bacWaterIny',
      'categories',
      'privacy',
    ),
    external: ext('pubmed', 'eurlex'),
  },
  faq: {
    internal: pick(
      'terms',
      'shipping',
      'coaCompare',
      'about',
      'shop',
      'guide',
      'returns',
      'retatrutideBuy',
      'privacy',
    ),
    external: ext('ema', 'eurlex'),
  },
  shipping: {
    internal: pick(
      'shop',
      'faq',
      'contact',
      'coas',
      'about',
      'research',
      'returns',
      'cagrilintidePrecio',
      'blog',
    ),
    external: ext('eurlex', 'ema'),
  },
  contact: {
    internal: pick(
      'about',
      'shop',
      'shippingEs',
      'faq',
      'coas',
      'peptidesEu',
      'aboutEuropa',
      'categories',
      'returns',
    ),
    external: ext('ema', 'pubmed'),
  },
  about: {
    internal: pick(
      'shop',
      'research',
      'coas',
      'contact',
      'terms',
      'stats',
      'aboutEurope',
      'retatrutideSpain',
      'privacy',
      'home',
    ),
    external: ext('ema', 'eurlex'),
  },
  guide: {
    internal: pick(
      'calculator',
      'glossary',
      'information',
      'coaCompare',
      'shop',
      'dsip',
      'bacWater',
      'igf1',
      'blog',
      'categories',
    ),
    external: ext('pubmed', 'uniprot'),
  },
  calculator: {
    internal: pick(
      'guide',
      'blog',
      'shop',
      'glossary',
      'information',
      'pegMgf',
      'bacWaterEn',
      'home',
      'categories',
    ),
    external: ext('pubchem', 'peptideAtlas'),
  },
  coas: {
    internal: pick(
      'coaCompare',
      'guide',
      'shop',
      'stats',
      'hexarelin',
      'semaglutide',
      'information',
      'blog',
      'privacy',
    ),
    external: ext('pubchem', 'pubmed'),
  },
  information: {
    internal: pick(
      'guide',
      'research',
      'glossary',
      'calculator',
      'coasHplc',
      'frag',
      'cagrilintideVenta',
      'categories',
      'blog',
    ),
    external: ext('uniprot', 'peptideAtlas'),
  },
  research: {
    internal: pick(
      'information',
      'stats',
      'guide',
      'about',
      'shopLab',
      'sermorelin',
      'follistatin',
      'blog',
      'home',
    ),
    external: ext('pubmed', 'eurlex'),
  },
  glossary: {
    internal: pick(
      'guide',
      'calculator',
      'stats',
      'coas',
      'shop',
      'dsipBuy',
      'bacWaterIny',
      'categories',
      'blog',
    ),
    external: ext('uniprot', 'pubchem'),
  },
  stats: {
    internal: pick(
      'research',
      'coasLib',
      'coaCompare',
      'glossary',
      'about',
      'home',
      'igf1',
      'categories',
      'blog',
    ),
    external: ext('pubmed', 'pubchem'),
  },
  coaCompare: {
    internal: pick(
      'coas',
      'guide',
      'faq',
      'shop',
      'terms',
      'hexarelinShort',
      'semaglutide',
      'blog',
      'privacy',
    ),
    external: ext('pubchem', 'ema'),
  },
  terms: {
    internal: pick('faq', 'privacy', 'about', 'coaCompare', 'shop', 'contact', 'returns', 'home'),
    external: ext('eurlex', 'ema'),
  },
  privacy: {
    internal: pick('terms', 'faq', 'contact', 'about', 'home', 'shipping', 'returns', 'blog'),
    external: ext('eurlex', 'ema'),
  },
  returns: {
    internal: pick('shipping', 'faq', 'terms', 'contact', 'shop', 'about', 'privacy', 'home'),
    external: ext('eurlex', 'ema'),
  },
  /** Priority PDPs */
  'product:dsip': {
    internal: pick('shop', 'calculator', 'coas', 'guide', 'hexarelin', 'faq', 'bacWater'),
    external: ext('pubmed', 'pubchem'),
  },
  'product:hexarelin-acetate': {
    internal: pick('shop', 'coas', 'coaCompare', 'sermorelin', 'guide', 'calculator', 'igf1'),
    external: ext('pubchem', 'uniprot'),
  },
  'product:sermorelin-acetate': {
    internal: pick('shop', 'guide', 'shipping', 'hexarelin', 'coas', 'research', 'bacWater'),
    external: ext('pubmed', 'peptideAtlas'),
  },
  'product:peg-mgf': {
    internal: pick('shop', 'calculator', 'glossary', 'frag', 'guide', 'coas', 'follistatin'),
    external: ext('pubchem', 'pubmed'),
  },
  'product:hgh-fragment-176-191': {
    internal: pick('shop', 'information', 'coaCompare', 'pegMgf', 'calculator', 'faq', 'igf1'),
    external: ext('uniprot', 'pubmed'),
  },
  'product:retatrutide': {
    internal: pick(
      'shopComprar',
      'shopPeptidosEs',
      'cagrilintide',
      'semaglutide',
      'coas',
      'guide',
      'shipping',
      'bacWater',
    ),
    external: ext('pubmed', 'pubchem', 'ema'),
  },
  'product:cagrilintide-semaglutide-blend': {
    internal: pick(
      'shopComprarEs',
      'retatrutideComprar',
      'semaglutide',
      'coas',
      'guide',
      'calculator',
      'shipping',
      'faq',
    ),
    external: ext('pubmed', 'pubchem', 'peptideAtlas'),
  },
  'product:cagrilintide': {
    internal: pick(
      'cagrilintidePrecio',
      'retatrutideBuy',
      'semaglutide',
      'shop',
      'coas',
      'guide',
      'shipping',
    ),
    external: ext('pubmed', 'pubchem'),
  },
  'product:semaglutide': {
    internal: pick(
      'cagrilintideVenta',
      'retatrutideComprar',
      'shopOnline',
      'coas',
      'guide',
      'calculator',
      'bacWater',
      'faq',
    ),
    external: ext('pubmed', 'pubchem', 'ema'),
  },
  'product:follistatin': {
    internal: pick(
      'shopInyectables',
      'igf1',
      'pegMgf',
      'coas',
      'guide',
      'calculator',
      'research',
      'faq',
    ),
    external: ext('uniprot', 'pubmed', 'pubchem'),
  },
  'product:igf-1-lr3': {
    internal: pick(
      'follistatin',
      'frag',
      'shop',
      'coas',
      'guide',
      'calculator',
      'bacWaterEn',
      'research',
    ),
    external: ext('uniprot', 'pubmed', 'peptideAtlas'),
  },
  'product:ghk-cu': {
    internal: pick('shop', 'coas', 'guide', 'bpc157', 'calculator', 'information', 'bacWater'),
    external: ext('pubchem', 'uniprot'),
  },
  'product:bpc-157': {
    internal: pick('shop', 'ghkCu', 'coas', 'guide', 'calculator', 'faq', 'retatrutideBuy'),
    external: ext('pubmed', 'peptideAtlas'),
  },
  'product:pt-141': {
    internal: pick('shop', 'melanotan', 'coas', 'guide', 'shipping', 'faq', 'bacWater'),
    external: ext('pubmed', 'pubchem'),
  },
  'product:mt-2-melanotan-2-acetate': {
    internal: pick('shop', 'pt141', 'coas', 'guide', 'bacWater', 'faq', 'shopOnline'),
    external: ext('pubchem', 'pubmed'),
  },
  'product:bacteriostatic-water': {
    internal: pick(
      'calculatorAlt',
      'guide',
      'shop',
      'blog',
      'coas',
      'faq',
      'retatrutideComprar',
      'semaglutide',
    ),
    external: ext('pubmed', 'eurlex', 'pubchem'),
  },
  /** Default for any other PDP — denser inbound-friendly outlinks */
  'product:default': {
    internal: pick(
      'shopComprarEs',
      'shopOnline',
      'guide',
      'calculator',
      'coas',
      'faq',
      'shipping',
      'bacWater',
      'retatrutideComprar',
    ),
    external: ext('pubmed', 'pubchem', 'peptideAtlas'),
  },
  /** Blog posts share one set (plus related posts in template). */
  'blog:post': {
    internal: pick(
      'blog',
      'guide',
      'calculator',
      'coas',
      'shop',
      'shipping',
      'bacWater',
      'cagrilintide',
    ),
    external: ext('pubmed', 'eurlex', 'pubchem'),
  },
};

/** Map StaticPageHost ids → graph keys. */
export const STATIC_PAGE_SEO_KEY: Partial<Record<string, string>> = {
  Home: 'home',
  Shop: 'shop',
  Categories: 'categories',
  Blog: 'blog',
  FAQ: 'faq',
  Shipping: 'shipping',
  Contact: 'contact',
  AboutUs: 'about',
  PeptideGuide: 'guide',
  PeptideCalculator: 'calculator',
  COALibrary: 'coas',
  PeptideInformation: 'information',
  PeptideResearch: 'research',
  PeptideGlossary: 'glossary',
  PeptideStats: 'stats',
  CoaVsNoCoa: 'coaCompare',
  Terms: 'terms',
  Privacy: 'privacy',
  RefundReturns: 'returns',
};

export function getSeoLinksForStaticPage(page: string): SeoLinkSet | null {
  const key = STATIC_PAGE_SEO_KEY[page];
  if (!key) return null;
  return SEO_PAGE_LINKS[key] ?? null;
}

export function getSeoLinksForProduct(slug: string): SeoLinkSet {
  return SEO_PAGE_LINKS[`product:${slug}`] ?? SEO_PAGE_LINKS['product:default'];
}

export function getSeoLinksForBlogPost(): SeoLinkSet {
  return SEO_PAGE_LINKS['blog:post'];
}

/** Footer keyword anchors (canonical paths). */
export const FOOTER_SEO_LINKS: SeoInternalLink[] = [
  SEO_HUB_LINKS.home,
  SEO_HUB_LINKS.peptidesEu,
  SEO_HUB_LINKS.aboutEuropa,
  SEO_HUB_LINKS.shop,
  SEO_HUB_LINKS.shopComprarEs,
  SEO_HUB_LINKS.shopOnline,
  SEO_HUB_LINKS.shopInyectables,
  SEO_HUB_LINKS.categories,
  SEO_HUB_LINKS.blog,
  SEO_HUB_LINKS.guide,
  SEO_HUB_LINKS.calculator,
  SEO_HUB_LINKS.calculatorAlt,
  SEO_HUB_LINKS.coas,
  SEO_HUB_LINKS.coaCompare,
  SEO_HUB_LINKS.glossary,
  SEO_HUB_LINKS.stats,
  SEO_HUB_LINKS.research,
  SEO_HUB_LINKS.information,
  SEO_HUB_LINKS.shipping,
  SEO_HUB_LINKS.faq,
  SEO_HUB_LINKS.contact,
  SEO_HUB_LINKS.about,
  SEO_HUB_LINKS.terms,
  SEO_HUB_LINKS.privacy,
  SEO_HUB_LINKS.returns,
  SEO_HUB_LINKS.dsip,
  SEO_HUB_LINKS.hexarelin,
  SEO_HUB_LINKS.sermorelin,
  SEO_HUB_LINKS.pegMgf,
  SEO_HUB_LINKS.frag,
  SEO_HUB_LINKS.retatrutideComprar,
  SEO_HUB_LINKS.cagrilintide,
  SEO_HUB_LINKS.cagrilintidePrecio,
  SEO_HUB_LINKS.semaglutide,
  SEO_HUB_LINKS.follistatin,
  SEO_HUB_LINKS.igf1,
  SEO_HUB_LINKS.ghkCu,
  SEO_HUB_LINKS.bpc157,
  SEO_HUB_LINKS.pt141,
  SEO_HUB_LINKS.melanotan,
  SEO_HUB_LINKS.bacWater,
  SEO_HUB_LINKS.bacWaterEn,
  SEO_HUB_LINKS.shopComprar,
  SEO_HUB_LINKS.shopPeptidosEs,
];

export const FOOTER_EXTERNAL_LINKS: SeoExternalLink[] = [E.pubmed, E.pubchem, E.ema];

/** Count inbound edges for verification (excludes footer; footer adds sitewide inbound). */
export function countInboundFromGraph(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const set of Object.values(SEO_PAGE_LINKS)) {
    for (const link of set.internal) {
      counts[link.to] = (counts[link.to] ?? 0) + 1;
    }
  }
  return counts;
}
