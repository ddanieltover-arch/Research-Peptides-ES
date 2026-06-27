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

  return raw;
}
