import { supportedLocales, type LocaleCode } from './locales';

/** Internal canonical paths — used in LocaleLink, nav config, and SEO keys. */
export const STATIC_ROUTE_PATHS = {
  shop: '/shop',
  cart: '/cart',
  checkout: '/checkout',
  blog: '/blog',
  profile: '/profile',
  orders: '/orders',
  wishlist: '/wishlist',
  search: '/search',
  categories: '/categories',
  login: '/login',
  faq: '/faq',
  shipping: '/shipping',
  contact: '/contact',
  aboutUs: '/about-us',
  peptideGuide: '/peptide-guide',
  peptideCalculator: '/peptide-calculator',
  coas: '/coas',
  peptideInformation: '/peptide-information',
  peptideResearch: '/peptide-research',
  terms: '/terms',
  privacy: '/privacy',
  refundReturns: '/refund-returns',
} as const;

export type StaticRouteId = keyof typeof STATIC_ROUTE_PATHS;

const CANONICAL_BY_SLUG = new Map<string, string>();
const SLUG_BY_CANONICAL = new Map<string, Map<LocaleCode, string>>();
const ALL_SLUG_VARIANTS = new Map<string, Set<string>>();
const PRODUCT_PREFIX_BY_LOCALE = new Map<LocaleCode, string>();
const PRODUCT_PREFIX_TO_CANONICAL = new Map<string, string>();

type SlugRow = Partial<Record<LocaleCode, string>> & { en: string };

function defineRoute(canonical: string, slugs: SlugRow) {
  const perLocale = new Map<LocaleCode, string>();
  const variants = new Set<string>();

  for (const locale of supportedLocales.map((l) => l.code)) {
    const segment = slugs[locale] ?? slugs.en;
    perLocale.set(locale, segment);
    variants.add(segment);
    CANONICAL_BY_SLUG.set(segment, canonical);
  }

  SLUG_BY_CANONICAL.set(canonical, perLocale);
  ALL_SLUG_VARIANTS.set(canonical, variants);
}

function defineProductPrefixes(prefixes: SlugRow) {
  for (const locale of supportedLocales.map((l) => l.code)) {
    const segment = prefixes[locale] ?? prefixes.en;
    PRODUCT_PREFIX_BY_LOCALE.set(locale, segment);
    PRODUCT_PREFIX_TO_CANONICAL.set(segment, 'product');
  }
}

defineRoute(STATIC_ROUTE_PATHS.shop, {
  en: 'shop',
  es: 'tienda',
  nl: 'winkel',
  de: 'shop',
  fr: 'boutique',
  it: 'negozio',
  pt: 'loja',
  hr: 'trgovina',
  pl: 'sklep',
  ro: 'magazin',
  cs: 'obchod',
  da: 'shop',
  sv: 'shop',
  fi: 'kauppa',
  el: 'katastima',
  hu: 'bolt',
  sk: 'obchod',
  sl: 'trgovina',
  bg: 'magazin',
});

defineRoute(STATIC_ROUTE_PATHS.cart, {
  en: 'cart',
  es: 'carrito',
  nl: 'winkelwagen',
  de: 'warenkorb',
  fr: 'panier',
  it: 'carrello',
  pt: 'carrinho',
  hr: 'kosarica',
  pl: 'koszyk',
  ro: 'cos',
  cs: 'kosik',
  da: 'kurv',
  sv: 'varukorg',
  fi: 'ostoskori',
  el: 'kalathi',
  hu: 'kosar',
  sk: 'kosik',
  sl: 'kosarica',
  bg: 'kolichka',
});

defineRoute(STATIC_ROUTE_PATHS.checkout, {
  en: 'checkout',
  es: 'pago',
  nl: 'afrekenen',
  de: 'kasse',
  fr: 'paiement',
  it: 'pagamento',
  pt: 'pagamento',
  hr: 'placanje',
  pl: 'kasa',
  ro: 'plata',
  cs: 'pokladna',
  da: 'betaling',
  sv: 'kassa',
  fi: 'kassa',
  el: 'pliromi',
  hu: 'fizetes',
  sk: 'pokladna',
  sl: 'blagajna',
  bg: 'plashtane',
});

defineRoute(STATIC_ROUTE_PATHS.blog, {
  en: 'blog',
  es: 'blog',
  nl: 'blog',
  de: 'blog',
  fr: 'blog',
  it: 'blog',
  pt: 'blog',
  hr: 'blog',
  pl: 'blog',
  ro: 'blog',
  cs: 'blog',
  da: 'blog',
  sv: 'blog',
  fi: 'blog',
  el: 'blog',
  hu: 'blog',
  sk: 'blog',
  sl: 'blog',
  bg: 'blog',
});

defineRoute(STATIC_ROUTE_PATHS.profile, {
  en: 'profile',
  es: 'perfil',
  nl: 'profiel',
  de: 'profil',
  fr: 'profil',
  it: 'profilo',
  pt: 'perfil',
  hr: 'profil',
  pl: 'profil',
  ro: 'profil',
  cs: 'profil',
  da: 'profil',
  sv: 'profil',
  fi: 'profiili',
  el: 'profil',
  hu: 'profil',
  sk: 'profil',
  sl: 'profil',
  bg: 'profil',
});

defineRoute(STATIC_ROUTE_PATHS.orders, {
  en: 'orders',
  es: 'pedidos',
  nl: 'bestellingen',
  de: 'bestellungen',
  fr: 'commandes',
  it: 'ordini',
  pt: 'pedidos',
  hr: 'narudzbe',
  pl: 'zamowienia',
  ro: 'comenzi',
  cs: 'objednavky',
  da: 'ordrer',
  sv: 'bestallningar',
  fi: 'tilaukset',
  el: 'paraggelies',
  hu: 'rendelesek',
  sk: 'objednavky',
  sl: 'narocila',
  bg: 'porachki',
});

defineRoute(STATIC_ROUTE_PATHS.wishlist, {
  en: 'wishlist',
  es: 'lista-de-deseos',
  nl: 'verlanglijst',
  de: 'wunschliste',
  fr: 'liste-de-souhaits',
  it: 'lista-desideri',
  pt: 'lista-de-desejos',
  hr: 'lista-zelja',
  pl: 'lista-zyczen',
  ro: 'lista-de-dorinte',
  cs: 'seznam-prani',
  da: 'onskeliste',
  sv: 'onskelista',
  fi: 'toivelista',
  el: 'lista-epithymion',
  hu: 'kivansaglista',
  sk: 'zoznam-zelani',
  sl: 'seznam-zelja',
  bg: 'spisyk-s-zhelaniya',
});

defineRoute(STATIC_ROUTE_PATHS.search, {
  en: 'search',
  es: 'buscar',
  nl: 'zoeken',
  de: 'suche',
  fr: 'recherche',
  it: 'cerca',
  pt: 'pesquisar',
  hr: 'pretraga',
  pl: 'szukaj',
  ro: 'cautare',
  cs: 'hledat',
  da: 'soeg',
  sv: 'sok',
  fi: 'haku',
  el: 'anazitisi',
  hu: 'kereses',
  sk: 'hladat',
  sl: 'iskanje',
  bg: 'tursene',
});

defineRoute(STATIC_ROUTE_PATHS.categories, {
  en: 'categories',
  es: 'categorias',
  nl: 'categorieen',
  de: 'kategorien',
  fr: 'categories',
  it: 'categorie',
  pt: 'categorias',
  hr: 'kategorije',
  pl: 'kategorie',
  ro: 'categorii',
  cs: 'kategorie',
  da: 'kategorier',
  sv: 'kategorier',
  fi: 'kategoriat',
  el: 'katigories',
  hu: 'kategoriak',
  sk: 'kategorie',
  sl: 'kategorije',
  bg: 'kategorii',
});

defineRoute(STATIC_ROUTE_PATHS.login, {
  en: 'login',
  es: 'iniciar-sesion',
  nl: 'inloggen',
  de: 'anmelden',
  fr: 'connexion',
  it: 'accedi',
  pt: 'entrar',
  hr: 'prijava',
  pl: 'logowanie',
  ro: 'autentificare',
  cs: 'prihlaseni',
  da: 'log-ind',
  sv: 'logga-in',
  fi: 'kirjaudu',
  el: 'sindesi',
  hu: 'bejelentkezes',
  sk: 'prihlasenie',
  sl: 'prijava',
  bg: 'vhod',
});

defineRoute(STATIC_ROUTE_PATHS.faq, {
  en: 'faq',
  es: 'preguntas-frecuentes',
  nl: 'veelgestelde-vragen',
  de: 'faq',
  fr: 'faq',
  it: 'domande-frequenti',
  pt: 'perguntas-frequentes',
  hr: 'cesta-pitanja',
  pl: 'faq',
  ro: 'intrebari-frecvente',
  cs: 'caste-dotazy',
  da: 'faq',
  sv: 'faq',
  fi: 'ukk',
  el: 'syxnes-erotiseis',
  hu: 'gyik',
  sk: 'casto-kladene-otazky',
  sl: 'pogosta-vprasanja',
  bg: 'chesto-zadavani-vaprosi',
});

defineRoute(STATIC_ROUTE_PATHS.shipping, {
  en: 'shipping',
  es: 'envio',
  nl: 'verzending',
  de: 'versand',
  fr: 'livraison',
  it: 'spedizione',
  pt: 'envio',
  hr: 'dostava',
  pl: 'wysylka',
  ro: 'livrare',
  cs: 'doprava',
  da: 'forsendelse',
  sv: 'frakt',
  fi: 'toimitus',
  el: 'apostoli',
  hu: 'szallitas',
  sk: 'doprava',
  sl: 'dostava',
  bg: 'dostavka',
});

defineRoute(STATIC_ROUTE_PATHS.contact, {
  en: 'contact',
  es: 'contacto',
  nl: 'contact',
  de: 'kontakt',
  fr: 'contact',
  it: 'contatto',
  pt: 'contacto',
  hr: 'kontakt',
  pl: 'kontakt',
  ro: 'contact',
  cs: 'kontakt',
  da: 'kontakt',
  sv: 'kontakt',
  fi: 'yhteystiedot',
  el: 'epikoinonia',
  hu: 'kapcsolat',
  sk: 'kontakt',
  sl: 'kontakt',
  bg: 'kontakt',
});

defineRoute(STATIC_ROUTE_PATHS.aboutUs, {
  en: 'about-us',
  es: 'sobre-nosotros',
  nl: 'over-ons',
  de: 'ueber-uns',
  fr: 'a-propos',
  it: 'chi-siamo',
  pt: 'sobre-nos',
  hr: 'o-nama',
  pl: 'o-nas',
  ro: 'despre-noi',
  cs: 'o-nas',
  da: 'om-os',
  sv: 'om-oss',
  fi: 'meista',
  el: 'sxetika-me-emas',
  hu: 'rolunk',
  sk: 'o-nas',
  sl: 'o-nas',
  bg: 'za-nas',
});

defineRoute(STATIC_ROUTE_PATHS.peptideGuide, {
  en: 'peptide-guide',
  es: 'guia-de-peptidos',
  nl: 'peptide-gids',
  de: 'peptid-leitfaden',
  fr: 'guide-peptides',
  it: 'guida-peptidi',
  pt: 'guia-de-peptideos',
  hr: 'vodic-za-peptide',
  pl: 'przewodnik-peptydowy',
  ro: 'ghid-peptide',
  cs: 'pruvodce-peptidy',
  da: 'peptid-guide',
  sv: 'peptid-guide',
  fi: 'peptidi-opas',
  el: 'odigos-peptidon',
  hu: 'peptid-utmutato',
  sk: 'sprievodca-peptidmi',
  sl: 'vodnik-peptidov',
  bg: 'rakovodstvo-za-peptidi',
});

defineRoute(STATIC_ROUTE_PATHS.peptideCalculator, {
  en: 'peptide-calculator',
  es: 'calculadora-de-peptidos',
  nl: 'peptide-calculator',
  de: 'peptid-rechner',
  fr: 'calculateur-peptides',
  it: 'calcolatore-peptidi',
  pt: 'calculadora-de-peptideos',
  hr: 'kalkulator-peptida',
  pl: 'kalkulator-peptydow',
  ro: 'calculator-peptide',
  cs: 'kalkulacka-peptidu',
  da: 'peptid-beregner',
  sv: 'peptid-kalkylator',
  fi: 'peptidi-laskin',
  el: 'ypologistis-peptidon',
  hu: 'peptid-kalkulator',
  sk: 'kalkulacka-peptidov',
  sl: 'kalkulator-peptidov',
  bg: 'kalkulator-za-peptidi',
});

defineRoute(STATIC_ROUTE_PATHS.coas, {
  en: 'coas',
  es: 'certificados-coas',
  nl: 'coa-bibliotheek',
  de: 'coa-bibliothek',
  fr: 'bibliotheque-coa',
  it: 'biblioteca-coa',
  pt: 'biblioteca-coa',
  hr: 'coa-biblioteka',
  pl: 'biblioteka-coa',
  ro: 'biblioteca-coa',
  cs: 'coa-knihovna',
  da: 'coa-bibliotek',
  sv: 'coa-bibliotek',
  fi: 'coa-kirjasto',
  el: 'vivliothiki-coa',
  hu: 'coa-konyvtar',
  sk: 'coa-kniznica',
  sl: 'coa-knjiznica',
  bg: 'coa-biblioteka',
});

defineRoute(STATIC_ROUTE_PATHS.peptideInformation, {
  en: 'peptide-information',
  es: 'informacion-peptidos',
  nl: 'peptide-informatie',
  de: 'peptid-informationen',
  fr: 'informations-peptides',
  it: 'informazioni-peptidi',
  pt: 'informacao-peptideos',
  hr: 'informacije-o-peptidima',
  pl: 'informacje-o-peptydach',
  ro: 'informatii-peptide',
  cs: 'informace-o-peptidech',
  da: 'peptid-information',
  sv: 'peptid-information',
  fi: 'peptidi-tiedot',
  el: 'plirofories-peptidon',
  hu: 'peptid-informaciok',
  sk: 'informacie-o-peptidoch',
  sl: 'informacije-o-peptidih',
  bg: 'informaciya-za-peptidi',
});

defineRoute(STATIC_ROUTE_PATHS.peptideResearch, {
  en: 'peptide-research',
  es: 'investigacion-peptidos',
  nl: 'peptide-onderzoek',
  de: 'peptid-forschung',
  fr: 'recherche-peptides',
  it: 'ricerca-peptidi',
  pt: 'pesquisa-peptideos',
  hr: 'istrazivanje-peptida',
  pl: 'badania-peptydow',
  ro: 'cercetare-peptide',
  cs: 'vyzkum-peptidu',
  da: 'peptid-forskning',
  sv: 'peptid-forskning',
  fi: 'peptidi-tutkimus',
  el: 'erevna-peptidon',
  hu: 'peptid-kutatas',
  sk: 'vyskum-peptidov',
  sl: 'raziskovanje-peptidov',
  bg: 'izsledvane-na-peptidi',
});

defineRoute(STATIC_ROUTE_PATHS.terms, {
  en: 'terms',
  es: 'terminos',
  nl: 'voorwaarden',
  de: 'agb',
  fr: 'conditions',
  it: 'termini',
  pt: 'termos',
  hr: 'uvjeti',
  pl: 'regulamin',
  ro: 'termeni',
  cs: 'podminky',
  da: 'vilkaar',
  sv: 'villkor',
  fi: 'ehdot',
  el: 'oroi',
  hu: 'feltetelek',
  sk: 'podmienky',
  sl: 'pogoji',
  bg: 'usloviya',
});

defineRoute(STATIC_ROUTE_PATHS.privacy, {
  en: 'privacy',
  es: 'privacidad',
  nl: 'privacy',
  de: 'datenschutz',
  fr: 'confidentialite',
  it: 'privacy',
  pt: 'privacidade',
  hr: 'privatnost',
  pl: 'prywatnosc',
  ro: 'confidentialitate',
  cs: 'soukromi',
  da: 'privatliv',
  sv: 'integritet',
  fi: 'tietosuoja',
  el: 'aporrito',
  hu: 'adatvedelem',
  sk: 'sukromie',
  sl: 'zasebnost',
  bg: 'poveritelnost',
});

defineRoute(STATIC_ROUTE_PATHS.refundReturns, {
  en: 'refund-returns',
  es: 'devoluciones',
  nl: 'retourneren',
  de: 'rueckgabe',
  fr: 'retours',
  it: 'resi',
  pt: 'devolucoes',
  hr: 'povrati',
  pl: 'zwroty',
  ro: 'retururi',
  cs: 'vraceni',
  da: 'returnering',
  sv: 'returer',
  fi: 'palautukset',
  el: 'epistrofes',
  hu: 'visszaterites',
  sk: 'vratenie',
  sl: 'vracila',
  bg: 'vrashtane',
});

defineProductPrefixes({
  en: 'product',
  es: 'producto',
  nl: 'product',
  de: 'produkt',
  fr: 'produit',
  it: 'prodotto',
  pt: 'produto',
  hr: 'proizvod',
  pl: 'produkt',
  ro: 'produs',
  cs: 'produkt',
  da: 'produkt',
  sv: 'produkt',
  fi: 'tuote',
  el: 'proion',
  hu: 'termek',
  sk: 'produkt',
  sl: 'izdelek',
  bg: 'produkt',
});

function normalizeInputPath(path: string): string {
  if (!path || path === '/') return '/';
  const withSlash = path.startsWith('/') ? path : `/${path}`;
  return withSlash.replace(/\/+$/, '') || '/';
}

/** Map any localized URL path to the internal canonical path (English segments). */
export function toCanonicalPath(path: string): string {
  const normalized = normalizeInputPath(path);
  if (normalized === '/') return '/';

  const segments = normalized.slice(1).split('/');
  const first = segments[0] ?? '';

  const productCanonical = PRODUCT_PREFIX_TO_CANONICAL.get(first);
  if (productCanonical && segments.length >= 2) {
    return `/${productCanonical}/${segments.slice(1).join('/')}`;
  }

  const canonical = CANONICAL_BY_SLUG.get(first);
  if (canonical && segments.length === 1) {
    return canonical;
  }

  return normalized;
}

/** Build a locale-specific path from a canonical internal path. */
export function toLocalizedPath(path: string, locale: LocaleCode): string {
  const canonical = toCanonicalPath(path);
  if (canonical === '/') return '/';

  const productMatch = /^\/product\/(.+)$/.exec(canonical);
  if (productMatch) {
    const prefix = PRODUCT_PREFIX_BY_LOCALE.get(locale) ?? 'product';
    return `/${prefix}/${productMatch[1]}`;
  }

  const slugMap = SLUG_BY_CANONICAL.get(canonical);
  if (slugMap) {
    return `/${slugMap.get(locale) ?? slugMap.get('en') ?? canonical.slice(1)}`;
  }

  return canonical;
}

export function getLocalizedSlugVariants(canonicalPath: string): string[] {
  const canonical = toCanonicalPath(canonicalPath);
  const variants = ALL_SLUG_VARIANTS.get(canonical);
  if (!variants) return [canonical.replace(/^\//, '')];
  return [...variants];
}

export function getProductSlugVariants(): string[] {
  return [...new Set(PRODUCT_PREFIX_BY_LOCALE.values())];
}

export const PUBLIC_STATIC_CANONICAL_PATHS = Object.values(STATIC_ROUTE_PATHS);
