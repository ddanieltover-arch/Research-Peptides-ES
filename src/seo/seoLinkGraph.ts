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
  retatrutidePrecio: { to: '/product/retatrutide', anchor: 'retatrutide precio españa' },
  ghkCu: { to: '/product/ghk-cu', anchor: 'ghk cu' },
  bpc157: { to: '/product/bpc-157', anchor: 'bpc 157 peptide' },
  pt141: { to: '/product/pt-141', anchor: 'pt-141 comprar' },
  melanotan: { to: '/product/mt-2-melanotan-2-acetate', anchor: 'melanotan 2 donde comprar' },
  bacWater: { to: '/product/bacteriostatic-water', anchor: 'agua bacteriostatica comprar' },
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
      'peptidesSpain',
      'retatrutide',
      'ghkCu',
      'bpc157',
      'pt141',
      'guide',
      'coas',
      'shipping',
    ),
    external: ext('pubmed', 'pubchem'),
  },
  shop: {
    internal: pick(
      'home',
      'shopPeptidosComprar',
      'retatrutideBuy',
      'retatrutidePrecio',
      'ghkCu',
      'bpc157',
      'melanotan',
      'bacWater',
      'coaCompare',
      'calculator',
    ),
    external: ext('pubchem', 'peptideAtlas'),
  },
  categories: {
    internal: pick('shopLab', 'glossary', 'research', 'stats', 'hexarelinShort', 'guide', 'blog', 'home'),
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
      'categories',
      'privacy',
    ),
    external: ext('pubmed', 'eurlex'),
  },
  faq: {
    internal: pick('terms', 'shipping', 'coaCompare', 'about', 'shop', 'guide', 'returns', 'privacy'),
    external: ext('ema', 'eurlex'),
  },
  shipping: {
    internal: pick('shop', 'faq', 'contact', 'coas', 'about', 'research', 'returns', 'blog'),
    external: ext('eurlex', 'ema'),
  },
  contact: {
    internal: pick('about', 'shop', 'shippingEs', 'faq', 'coas', 'peptidesEu', 'categories', 'returns'),
    external: ext('ema', 'pubmed'),
  },
  about: {
    internal: pick('shop', 'research', 'coas', 'contact', 'terms', 'stats', 'privacy', 'home'),
    external: ext('ema', 'eurlex'),
  },
  guide: {
    internal: pick('calculator', 'glossary', 'information', 'coaCompare', 'shop', 'dsip', 'blog', 'categories'),
    external: ext('pubmed', 'uniprot'),
  },
  calculator: {
    internal: pick('guide', 'blog', 'shop', 'glossary', 'information', 'pegMgf', 'home', 'categories'),
    external: ext('pubchem', 'peptideAtlas'),
  },
  coas: {
    internal: pick('coaCompare', 'guide', 'shop', 'stats', 'hexarelin', 'information', 'blog', 'privacy'),
    external: ext('pubchem', 'pubmed'),
  },
  information: {
    internal: pick('guide', 'research', 'glossary', 'calculator', 'coasHplc', 'frag', 'categories', 'blog'),
    external: ext('uniprot', 'peptideAtlas'),
  },
  research: {
    internal: pick('information', 'stats', 'guide', 'about', 'shopLab', 'sermorelin', 'blog', 'home'),
    external: ext('pubmed', 'eurlex'),
  },
  glossary: {
    internal: pick('guide', 'calculator', 'stats', 'coas', 'shop', 'dsipBuy', 'categories', 'blog'),
    external: ext('uniprot', 'pubchem'),
  },
  stats: {
    internal: pick('research', 'coasLib', 'coaCompare', 'glossary', 'about', 'home', 'categories', 'blog'),
    external: ext('pubmed', 'pubchem'),
  },
  coaCompare: {
    internal: pick('coas', 'guide', 'faq', 'shop', 'terms', 'hexarelinShort', 'blog', 'privacy'),
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
    internal: pick('shop', 'calculator', 'coas', 'guide', 'hexarelin', 'faq'),
    external: ext('pubmed', 'pubchem'),
  },
  'product:hexarelin-acetate': {
    internal: pick('shop', 'coas', 'coaCompare', 'sermorelin', 'guide', 'calculator'),
    external: ext('pubchem', 'uniprot'),
  },
  'product:sermorelin-acetate': {
    internal: pick('shop', 'guide', 'shipping', 'hexarelin', 'coas', 'research'),
    external: ext('pubmed', 'peptideAtlas'),
  },
  'product:peg-mgf': {
    internal: pick('shop', 'calculator', 'glossary', 'frag', 'guide', 'coas'),
    external: ext('pubchem', 'pubmed'),
  },
  'product:hgh-fragment-176-191': {
    internal: pick('shop', 'information', 'coaCompare', 'pegMgf', 'calculator', 'faq'),
    external: ext('uniprot', 'pubmed'),
  },
  'product:retatrutide': {
    internal: pick('shopComprar', 'shopPeptidosEs', 'coas', 'guide', 'shipping', 'bpc157'),
    external: ext('pubmed', 'pubchem'),
  },
  'product:ghk-cu': {
    internal: pick('shop', 'coas', 'guide', 'bpc157', 'calculator', 'information'),
    external: ext('pubchem', 'uniprot'),
  },
  'product:bpc-157': {
    internal: pick('shop', 'ghkCu', 'coas', 'guide', 'calculator', 'faq'),
    external: ext('pubmed', 'peptideAtlas'),
  },
  'product:pt-141': {
    internal: pick('shop', 'melanotan', 'coas', 'guide', 'shipping', 'faq'),
    external: ext('pubmed', 'pubchem'),
  },
  'product:mt-2-melanotan-2-acetate': {
    internal: pick('shop', 'pt141', 'coas', 'guide', 'bacWater', 'faq'),
    external: ext('pubchem', 'pubmed'),
  },
  'product:bacteriostatic-water': {
    internal: pick('calculator', 'guide', 'shop', 'blog', 'coas', 'faq'),
    external: ext('pubmed', 'eurlex'),
  },
  /** Default for any other PDP */
  'product:default': {
    internal: pick('shop', 'guide', 'calculator', 'coas', 'faq', 'shipping'),
    external: ext('pubmed', 'pubchem'),
  },
  /** Blog posts share one set (plus related posts in template). */
  'blog:post': {
    internal: pick('blog', 'guide', 'calculator', 'coas', 'shop', 'shipping'),
    external: ext('pubmed', 'eurlex'),
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
  SEO_HUB_LINKS.shop,
  SEO_HUB_LINKS.categories,
  SEO_HUB_LINKS.blog,
  SEO_HUB_LINKS.guide,
  SEO_HUB_LINKS.calculator,
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
  SEO_HUB_LINKS.retatrutide,
  SEO_HUB_LINKS.ghkCu,
  SEO_HUB_LINKS.bpc157,
  SEO_HUB_LINKS.pt141,
  SEO_HUB_LINKS.melanotan,
  SEO_HUB_LINKS.bacWater,
  SEO_HUB_LINKS.shopComprar,
  SEO_HUB_LINKS.shopPeptidosEs,
];

export const FOOTER_EXTERNAL_LINKS: SeoExternalLink[] = [E.pubmed, E.pubchem];

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
