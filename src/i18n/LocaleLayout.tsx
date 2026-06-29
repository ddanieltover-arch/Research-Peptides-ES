import { useEffect } from 'react';
import { Navigate, Routes, useLocation } from 'react-router-dom';
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
import { isLocaleCode, type LocaleCode } from './locales';
import { LocaleHead } from './LocaleHead';
import { SeoProvider } from '../seo/SeoProvider';
import { createAppPageRoutes } from '../routes/appPageRoutes';

/**
 * Validates locale from the URL, syncs i18n + context.
 * Spanish (default) uses unprefixed paths: /tienda, /contacto, etc.
 * Other locales use /en/shop, /de/kontakt, etc.
 * Legacy /es/* URLs redirect to unprefixed paths.
 */
export function LocaleLayout() {
  return (
    <LocaleProvider>
      <LocaleLayoutInner />
    </LocaleProvider>
  );
}

/** Path after optional locale prefix — used for inner route matching. */
function pagePathFromLocation(pathname: string): string {
  const locale = getLocaleFromPath(pathname);
  if (!locale) return pathname || '/';
  const rest = pathname.slice(locale.length + 1);
  if (!rest || rest === '/') return '/';
  return rest.startsWith('/') ? rest : `/${rest}`;
}

function LocaleLayoutInner() {
  const location = useLocation();
  const { setLocale } = useLocale();
  const { i18n } = useTranslation();

  const urlLocale = getLocaleFromPath(location.pathname);
  const barePath = stripLocaleFromPath(location.pathname);
  const preferred = barePath === '/' && !urlLocale ? readStoredLocale() : null;

  let localeCode: LocaleCode | null = null;
  let redirectTo: string | null = null;

  if (urlLocale === DEFAULT_LOCALE) {
    redirectTo = `${pathWithLocale(DEFAULT_LOCALE, barePath)}${location.search}${location.hash}`;
  } else if (!urlLocale) {
    localeCode = DEFAULT_LOCALE;
    if (preferred && preferred !== DEFAULT_LOCALE) {
      redirectTo = `${pathWithLocale(preferred, barePath)}${location.search}${location.hash}`;
    }
  } else if (isLocaleCode(urlLocale)) {
    localeCode = urlLocale;
  }

  if (localeCode && !redirectTo) {
    const targetPath = pathWithLocale(localeCode, barePath);
    if (location.pathname !== targetPath) {
      redirectTo = `${targetPath}${location.search}${location.hash}`;
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

  const pagePath = pagePathFromLocation(location.pathname);

  return (
    <SeoProvider>
      <LocaleHead />
      <Routes location={{ ...location, pathname: pagePath }}>
        {createAppPageRoutes()}
      </Routes>
    </SeoProvider>
  );
}
