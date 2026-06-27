import { useEffect } from 'react';
import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LocaleProvider, useLocale } from './LocaleProvider';
import {
  DEFAULT_LOCALE,
  getLocaleFromPath,
  pathWithLocale,
  persistLocaleCookie,
  readStoredLocale,
  stripLocaleFromPath,
} from './routing';
import { toCanonicalPath, toLocalizedPath } from './routeSlugs';
import { isLocaleCode, type LocaleCode } from './locales';
import { LocaleHead } from './LocaleHead';
import { SeoProvider } from '../seo/SeoProvider';

/**
 * Validates locale from the URL, syncs i18n + context.
 * Spanish (default) uses unprefixed paths: /shop, /contact, etc.
 * Other locales use /en/shop, /de/contact, etc.
 * Legacy /es/* URLs redirect to unprefixed paths.
 */
export function LocaleLayout() {
  return (
    <LocaleProvider>
      <LocaleLayoutInner />
    </LocaleProvider>
  );
}

function LocaleLayoutInner() {
  const { locale: paramLocale } = useParams<{ locale?: string }>();
  const location = useLocation();
  const { setLocale } = useLocale();
  const { i18n } = useTranslation();

  const barePath = stripLocaleFromPath(location.pathname);
  const preferred = barePath === '/' && !paramLocale ? readStoredLocale() : null;

  let localeCode: LocaleCode | null = null;
  let redirectTo: string | null = null;

  if (paramLocale === DEFAULT_LOCALE) {
    redirectTo = `${pathWithLocale(DEFAULT_LOCALE, barePath)}${location.search}${location.hash}`;
  } else if (!paramLocale) {
    localeCode = DEFAULT_LOCALE;
    if (preferred && preferred !== DEFAULT_LOCALE) {
      redirectTo = `${pathWithLocale(preferred, barePath)}${location.search}${location.hash}`;
    }
  } else if (isLocaleCode(paramLocale)) {
    localeCode = paramLocale;
  } else if (paramLocale) {
    redirectTo = `${pathWithLocale(DEFAULT_LOCALE, toCanonicalPath(location.pathname))}${location.search}${location.hash}`;
  }

  if (localeCode && !redirectTo) {
    const localizedPath = toLocalizedPath(barePath, localeCode);
    const currentBare =
      getLocaleFromPath(location.pathname) === null
        ? location.pathname || '/'
        : location.pathname.slice((paramLocale?.length ?? 0) + 1) || '/';
    const normalizedCurrent = currentBare.startsWith('/') ? currentBare : `/${currentBare}`;
    if (normalizedCurrent !== localizedPath) {
      redirectTo = `${pathWithLocale(localeCode, barePath)}${location.search}${location.hash}`;
    }
  }

  useEffect(() => {
    if (!localeCode || redirectTo) return;
    setLocale(localeCode);
    void i18n.changeLanguage(localeCode);
    persistLocaleCookie(localeCode);
  }, [localeCode, redirectTo, setLocale, i18n]);

  if (redirectTo) {
    return <Navigate to={redirectTo} replace />;
  }

  if (!localeCode) {
    return (
      <Navigate
        to={`${pathWithLocale(DEFAULT_LOCALE, barePath)}${location.search}${location.hash}`}
        replace
      />
    );
  }

  return (
    <SeoProvider>
      <LocaleHead />
      <Outlet />
    </SeoProvider>
  );
}
