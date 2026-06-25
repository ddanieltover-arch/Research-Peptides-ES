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
  '/faq': { es: 'Preguntas frecuentes', en: 'FAQ', nl: 'Veelgestelde vragen', de: 'FAQ', fr: 'FAQ' },
  '/shipping': { es: 'Envío', en: 'Shipping', nl: 'Verzending', de: 'Versand', fr: 'Livraison' },
  '/contact': { es: 'Contacto', en: 'Contact', nl: 'Contact', de: 'Kontakt', fr: 'Contact' },
  '/about-us': { es: 'Sobre nosotros', en: 'About Us', nl: 'Over ons', de: 'Über uns', fr: 'À propos' },
  '/terms': { es: 'Términos', en: 'Terms', nl: 'Voorwaarden', de: 'AGB', fr: 'Conditions' },
  '/privacy': { es: 'Privacidad', en: 'Privacy', nl: 'Privacy', de: 'Datenschutz', fr: 'Confidentialité' },
  '/refund-returns': { es: 'Devoluciones', en: 'Returns', nl: 'Retourneren', de: 'Rückgabe', fr: 'Retours' },
  '/coas': { es: 'Biblioteca COA', en: 'COA Library', nl: 'COA-bibliotheek', de: 'COA-Bibliothek', fr: 'Bibliothèque COA' },
  '/blog': { es: 'Diario de investigación', en: 'Research Journal', nl: 'Onderzoeksjournal', de: 'Forschungsjournal', fr: 'Journal de recherche' },
};

export const DEFAULT_DESCRIPTION =
  'Research Peptides ES — péptidos de investigación premium para laboratorios europeos. Verificación de terceros, precios en EUR, distribución desde España.';

export function titleForPath(path: string, locale: LocaleCode): string {
  const base = path.startsWith('/product/') ? 'Product' : path;
  const entry = PAGE_TITLES[base] ?? PAGE_TITLES['/'];
  const localized = (entry as Record<string, string>)[locale] ?? entry.es ?? entry.en ?? 'Shop';
  return `${localized} | ${BRAND_NAME}`;
}
