import type { LocaleCode } from '../i18n/locales';
import { BRAND_NAME } from '../config/brand';

type TitleEntry = { es: string; en?: string; nl?: string; de?: string; fr?: string };

export const PAGE_TITLES: Record<string, TitleEntry> = {
  '/': {
    es: 'Péptidos de investigación premium',
    en: 'Premium Research Peptides',
    nl: 'Premium onderzoekspeptiden',
    de: 'Premium-Forschungspeptide',
    fr: 'Peptides de recherche premium',
  },
  '/shop': { es: 'Tienda', en: 'Shop', nl: 'Shop', de: 'Shop', fr: 'Boutique' },
  '/categories': { es: 'Categorías', en: 'Categories', nl: 'Categorieën', de: 'Kategorien', fr: 'Catégories' },
  '/search': { es: 'Buscar', en: 'Search', nl: 'Zoeken', de: 'Suche', fr: 'Recherche' },
  '/cart': { es: 'Carrito', en: 'Cart', nl: 'Winkelwagen', de: 'Warenkorb', fr: 'Panier' },
  '/checkout': { es: 'Pago', en: 'Checkout', nl: 'Afrekenen', de: 'Kasse', fr: 'Paiement' },
  '/login': { es: 'Iniciar sesión', en: 'Log in', nl: 'Inloggen', de: 'Anmelden', fr: 'Connexion' },
  '/profile': { es: 'Perfil', en: 'Profile', nl: 'Profiel', de: 'Profil', fr: 'Profil' },
  '/orders': { es: 'Pedidos', en: 'Orders', nl: 'Bestellingen', de: 'Bestellungen', fr: 'Commandes' },
  '/wishlist': { es: 'Lista de deseos', en: 'Wishlist', nl: 'Verlanglijst', de: 'Wunschliste', fr: 'Liste de souhaits' },
  '/faq': { es: 'Preguntas frecuentes', en: 'FAQ', nl: 'Veelgestelde vragen', de: 'FAQ', fr: 'FAQ' },
  '/shipping': { es: 'Envío', en: 'Shipping', nl: 'Verzending', de: 'Versand', fr: 'Livraison' },
  '/contact': { es: 'Contacto', en: 'Contact', nl: 'Contact', de: 'Kontakt', fr: 'Contact' },
  '/about-us': { es: 'Sobre nosotros', en: 'About Us', nl: 'Over ons', de: 'Über uns', fr: 'À propos' },
  '/terms': { es: 'Términos', en: 'Terms', nl: 'Voorwaarden', de: 'AGB', fr: 'Conditions' },
  '/privacy': { es: 'Privacidad', en: 'Privacy', nl: 'Privacy', de: 'Datenschutz', fr: 'Confidentialité' },
  '/refund-returns': { es: 'Devoluciones', en: 'Returns', nl: 'Retourneren', de: 'Rückgabe', fr: 'Retours' },
  '/coas': { es: 'Biblioteca COA', en: 'COA Library', nl: 'COA-bibliotheek', de: 'COA-Bibliothek', fr: 'Bibliothèque COA' },
  '/blog': { es: 'Diario de investigación', en: 'Research Journal', nl: 'Onderzoeksjournal', de: 'Forschungsjournal', fr: 'Journal de recherche' },
  '/peptide-guide': {
    es: 'Guía de péptidos',
    en: 'Peptide Guide',
    nl: 'Peptide-gids',
    de: 'Peptid-Leitfaden',
    fr: 'Guide des peptides',
  },
  '/peptide-calculator': {
    es: 'Calculadora de péptidos',
    en: 'Peptide Calculator',
    nl: 'Peptide-calculator',
    de: 'Peptid-Rechner',
    fr: 'Calculateur de peptides',
  },
  '/peptide-information': {
    es: 'Información sobre péptidos',
    en: 'Peptide Information',
    nl: 'Peptide-informatie',
    de: 'Peptid-Informationen',
    fr: 'Informations peptides',
  },
  '/peptide-research': {
    es: 'Investigación de péptidos',
    en: 'Peptide Research',
    nl: 'Peptide-onderzoek',
    de: 'Peptid-Forschung',
    fr: 'Recherche peptides',
  },
};

export const PAGE_DESCRIPTIONS: Record<string, TitleEntry> = {
  '/': {
    es: 'Research Peptides ES — péptidos de investigación premium para laboratorios europeos. Verificación de terceros, precios en EUR, distribución desde España.',
    en: 'Research Peptides ES — premium research peptides for European laboratories. Third-party verification, EUR pricing, distribution from Spain.',
  },
  '/shop': {
    es: 'Catálogo de péptidos de investigación de alta pureza. Compra online con envío a laboratorios en España y la UE.',
    en: 'Shop high-purity research peptides online. Ships to laboratories across Spain and the EU.',
  },
  '/categories': {
    es: 'Explora categorías de péptidos de investigación: elige por uso previsto de laboratorio y tipo de compuesto.',
    en: 'Browse research peptide categories by laboratory use case and compound type.',
  },
  '/faq': {
    es: 'Respuestas sobre pedidos, envío en frío, COA, pureza y uso exclusivo para investigación.',
    en: 'Answers on orders, cold-chain shipping, COAs, purity, and research-use-only terms.',
  },
  '/shipping': {
    es: 'Envío refrigerado y logística a laboratorios en España y la Unión Europea.',
    en: 'Cold-chain shipping and logistics to laboratories in Spain and the European Union.',
  },
  '/contact': {
    es: 'Contacta con Research Peptides ES para consultas de producto, pedidos B2B y soporte.',
    en: 'Contact Research Peptides ES for product questions, B2B orders, and support.',
  },
  '/about-us': {
    es: 'Quiénes somos: proveedor español de péptidos de investigación con verificación de terceros.',
    en: 'About Research Peptides ES — Spanish research peptide supplier with third-party verification.',
  },
  '/coas': {
    es: 'Biblioteca de certificados de análisis (COA) de terceros para péptidos de investigación.',
    en: 'Third-party certificate of analysis (COA) library for research peptides.',
  },
  '/blog': {
    es: 'Artículos y notas de investigación sobre péptidos, calidad de laboratorio y mejores prácticas.',
    en: 'Research notes on peptides, lab quality, and best practices for investigators.',
  },
  '/peptide-guide': {
    es: 'Guía práctica: manipulación, almacenamiento y reconstitución de péptidos liofilizados para investigación.',
    en: 'Practical guide to handling, storage, and reconstitution of lyophilized research peptides.',
  },
  '/peptide-calculator': {
    es: 'Calculadora de reconstitución de péptidos: concentra volúmenes de diluyente para uso de laboratorio.',
    en: 'Peptide reconstitution calculator — compute diluent volumes for laboratory use.',
  },
  '/peptide-information': {
    es: 'Información técnica sobre péptidos de investigación, pureza y documentación de laboratorio.',
    en: 'Technical information on research peptides, purity, and laboratory documentation.',
  },
  '/peptide-research': {
    es: 'Recursos de investigación sobre péptidos: contexto científico y referencias para laboratorios.',
    en: 'Peptide research resources — scientific context and references for laboratories.',
  },
  '/terms': {
    es: 'Términos y condiciones de Research Peptides ES. Uso exclusivo para investigación.',
    en: 'Terms and conditions for Research Peptides ES. Research use only.',
  },
  '/privacy': {
    es: 'Política de privacidad y protección de datos de Research Peptides ES (RGPD).',
    en: 'Privacy policy and data protection for Research Peptides ES (GDPR).',
  },
  '/refund-returns': {
    es: 'Política de devoluciones y reembolsos para pedidos de péptidos de investigación.',
    en: 'Returns and refund policy for research peptide orders.',
  },
};

export const DEFAULT_DESCRIPTION =
  'Research Peptides ES — péptidos de investigación premium para laboratorios europeos. Verificación de terceros, precios en EUR, distribución desde España.';

function localizedEntry(entry: TitleEntry | undefined, locale: LocaleCode): string | undefined {
  if (!entry) return undefined;
  return (entry as Record<string, string>)[locale] ?? entry.es ?? entry.en;
}

export function titleForPath(path: string, locale: LocaleCode): string {
  const base = path.startsWith('/product/') ? 'Product' : path;
  const entry = PAGE_TITLES[base] ?? PAGE_TITLES['/'];
  const localized = localizedEntry(entry, locale) ?? 'Shop';
  return `${localized} | ${BRAND_NAME}`;
}

export function descriptionForPath(path: string, locale: LocaleCode): string {
  const base = path.startsWith('/product/') ? path : path;
  const entry = PAGE_DESCRIPTIONS[base];
  return localizedEntry(entry, locale) ?? DEFAULT_DESCRIPTION;
}
