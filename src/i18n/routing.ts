import { isLocaleCode, type LocaleCode } from './locales';
import { toCanonicalPath, toLocalizedPath } from './routeSlugs';

export const DEFAULT_LOCALE: LocaleCode = 'es';
const LOCALE_COOKIE = 'rp-es-locale';

export function getLocaleFromPath(pathname: string): LocaleCode | null {
  const segment = pathname.split('/').filter(Boolean)[0];
  if (segment && isLocaleCode(segment)) return segment;
  return null;
}

/** Locale implied by the URL (unprefixed paths use Spanish). */
export function resolveLocaleFromPath(pathname: string): LocaleCode {
  return getLocaleFromPath(pathname) ?? DEFAULT_LOCALE;
}

/** Path without leading locale segment, normalized to canonical internal paths. */
export function stripLocaleFromPath(pathname: string): string {
  const locale = getLocaleFromPath(pathname);
  let rest: string;
  if (!locale) {
    rest = pathname || '/';
  } else {
    rest = pathname.slice(locale.length + 1);
    if (!rest || rest === '/') rest = '/';
    else if (!rest.startsWith('/')) rest = `/${rest}`;
  }
  return toCanonicalPath(rest);
}

/** Build a locale-aware path with translated slugs. Spanish (default) has no URL prefix. */
export function pathWithLocale(locale: LocaleCode, path = '/'): string {
  const localized = toLocalizedPath(path, locale);
  const normalized = localized.startsWith('/') ? localized : `/${localized}`;
  const bare = normalized === '/' ? '' : normalized;

  if (locale === DEFAULT_LOCALE) {
    return bare || '/';
  }

  return bare ? `/${locale}${bare}` : `/${locale}`;
}

export function persistLocaleCookie(locale: LocaleCode): void {
  try {
    document.cookie = `${LOCALE_COOKIE}=${locale};path=/;max-age=31536000;SameSite=Lax`;
  } catch {
    /* ignore */
  }
}

export function readLocaleCookie(): LocaleCode | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${LOCALE_COOKIE}=([^;]*)`));
  const value = match?.[1];
  return value && isLocaleCode(value) ? value : null;
}

export function readStoredLocale(): LocaleCode | null {
  try {
    const stored =
      localStorage.getItem('rp-es-locale') ?? localStorage.getItem('rp-eu-locale');
    if (stored && isLocaleCode(stored)) return stored;
  } catch {
    /* private browsing */
  }
  const cookie = readLocaleCookie();
  return cookie ?? null;
}
