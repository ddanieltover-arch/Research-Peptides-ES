import { Navigate } from 'react-router-dom';
import { isLocaleCode } from './locales';
import { DEFAULT_LOCALE, pathWithLocale, readLocaleCookie } from './routing';

/** New visitors always land on Spanish unless they previously chose another locale. */
export function LocaleRedirect() {
  let locale = DEFAULT_LOCALE;
  try {
    const ls = localStorage.getItem('rp-es-locale') ?? localStorage.getItem('rp-eu-locale');
    if (ls && isLocaleCode(ls)) locale = ls;
    else {
      const cookie = readLocaleCookie();
      if (cookie) locale = cookie;
    }
  } catch {
    /* keep DEFAULT_LOCALE */
  }

  return <Navigate to={pathWithLocale(locale, '/')} replace />;
}
