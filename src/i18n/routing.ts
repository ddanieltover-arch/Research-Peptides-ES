import { isLocaleCode, supportedLocales, type LocaleCode } from './locales';
import { toCanonicalPath, toLocalizedPath } from './routeSlugs';

export const DEFAULT_LOCALE: LocaleCode = 'es';
const LOCALE_COOKIE = 'rp-es-locale';

/** React Router param for non-default locale prefixes only (excludes Spanish root paths). */
export const NON_DEFAULT_LOCALE_ROUTE_PARAM = supportedLocales
  .filter((l) => l.code !== DEFAULT_LOCALE)
  .map((l) => l.code)
  .join('|');

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

/** Internal App Router path: `/{locale}/{english-canonical…}` (`/es/shop`). */
export function internalAppPath(locale: LocaleCode, path = '/'): string {
  const [pathnamePart, query = ''] = path.split('?');
  const raw = pathnamePart && pathnamePart.length > 0 ? pathnamePart : '/';
  const canonical = toCanonicalPath(raw.startsWith('/') ? raw : `/${raw}`);
  const bare = canonical === '/' ? '' : canonical;
  const base = bare ? `/${locale}${bare}` : `/${locale}`;
  return query ? `${base}?${query}` : base;
}

/** Public URL with translated slugs. Spanish is unprefixed (`/tienda`, `/producto/…`). */
export function publicAliasPath(locale: LocaleCode, path = '/'): string {
  const [pathnamePart, query = ''] = path.split('?');
  const raw = pathnamePart && pathnamePart.length > 0 ? pathnamePart : '/';
  const localized = toLocalizedPath(raw.startsWith('/') ? raw : `/${raw}`, locale);
  const normalized = localized.startsWith('/') ? localized : `/${localized}`;
  const bare = normalized === '/' ? '' : normalized;
  const base = locale === DEFAULT_LOCALE ? bare || '/' : bare ? `/${locale}${bare}` : `/${locale}`;
  return query ? `${base}?${query}` : base;
}

/** User-facing localized path — same as publicAliasPath (Spanish page names, not English slugs). */
export function pathWithLocale(locale: LocaleCode, path = '/'): string {
  return publicAliasPath(locale, path);
}

export function matchesCanonicalPath(pathname: string, canonical: string): boolean {
  const current = stripLocaleFromPath(pathname);
  const target = toCanonicalPath(canonical);
  return current === target || (target !== '/' && current.startsWith(`${target}/`));
}

export function isCommercePath(pathname: string): boolean {
  return matchesCanonicalPath(pathname, '/cart') || matchesCanonicalPath(pathname, '/checkout');
}

export function isAdminPath(pathname: string): boolean {
  return matchesCanonicalPath(pathname, '/admin') || pathname.includes('/admin');
}

export function productSlugFromPath(pathname: string): string | undefined {
  const match = /^\/product\/([^/?#]+)/.exec(stripLocaleFromPath(pathname));
  return match?.[1];
}

export function blogPostIdFromPath(pathname: string): string | undefined {
  const match = /^\/blog\/([^/?#]+)/.exec(stripLocaleFromPath(pathname));
  return match?.[1];
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
