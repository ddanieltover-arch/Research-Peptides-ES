import i18n from '../i18n';
import type { LocaleCode } from '../i18n/locales';

type ProductRow = {
  title?: string | null;
  description?: string | null;
  title_i18n?: Record<string, string> | null;
  description_i18n?: Record<string, string> | null;
};

const GENERIC_DESCRIPTION_PATTERNS = [
  /^premium research peptide for laboratory research use only\.?$/i,
  /^scraped from local dump/i,
];

/** Obvious English catalog phrases — fallback on `es` locale only. */
const ENGLISH_CATALOG_PHRASES = [
  /\bresearch use only\b/i,
  /\bsupplied as\b/i,
  /\bsuitable for\b/i,
  /\bdesigned for\b/i,
  /\bbuilt for\b/i,
  /\bfor laboratory\b/i,
  /\bresearch peptide\b/i,
  /\bresearch analog\b/i,
  /\bresearch ligand\b/i,
  /\breference standard\b/i,
  /\bpremium research peptide\b/i,
];

function looksLikeEnglishCatalogCopy(text: string): boolean {
  const trimmed = text.trim();
  if (!trimmed || /[áéíóúñ¿¡]/i.test(trimmed)) return false;
  return ENGLISH_CATALOG_PHRASES.some((pattern) => pattern.test(trimmed));
}

export function isGenericCatalogDescription(text: string): boolean {
  const trimmed = text.trim();
  if (!trimmed) return true;
  return GENERIC_DESCRIPTION_PATTERNS.some((pattern) => pattern.test(trimmed));
}

function defaultDescriptionForLocale(locale: LocaleCode): string {
  return i18n.t('product:defaultDescription', { lng: locale });
}

/** Localized PDP copy from optional JSONB maps; replaces generic English catalog boilerplate. */
export function localizedProductTitle(product: ProductRow, locale: LocaleCode): string {
  const map = product.title_i18n;
  if (map && typeof map === 'object' && map[locale]?.trim()) return map[locale].trim();
  return String(product.title ?? '');
}

export function localizedProductDescription(product: ProductRow, locale: LocaleCode): string {
  const map = product.description_i18n;
  if (map && typeof map === 'object' && map[locale]?.trim()) return map[locale].trim();

  const raw = String(product.description ?? '').trim();
  if (!raw || isGenericCatalogDescription(raw)) {
    return defaultDescriptionForLocale(locale);
  }

  if (locale === 'es' && looksLikeEnglishCatalogCopy(raw)) {
    return defaultDescriptionForLocale(locale);
  }

  return raw;
}
