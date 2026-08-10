import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BRAND_NAME, DEFAULT_OG_IMAGE_PATH } from '../config/brand';
import { supportedLocales } from './locales';
import { pathWithLocale, stripLocaleFromPath } from './routing';
import { useSeoOverride } from '../seo/SeoProvider';
import { descriptionForPath, titleForPath } from '../seo/pageTitles';
import {
  localBusinessJsonLd,
  organizationJsonLd,
  siteOrigin,
  websiteJsonLd,
} from '../seo/structuredData';
import { JsonLd } from '../components/seo/JsonLd';
import type { LocaleCode } from './locales';

const META_ATTR = 'data-rp-seo';

/** Open Graph locale tags (language_TERRITORY). */
const OG_LOCALE: Partial<Record<LocaleCode, string>> & { es: string; en: string } = {
  es: 'es_ES',
  en: 'en_GB',
  nl: 'nl_NL',
  de: 'de_DE',
  fr: 'fr_FR',
  it: 'it_IT',
  pt: 'pt_PT',
};

function upsertMeta(name: string, content: string, property = false) {
  const attr = property ? 'property' : 'name';
  let el = document.querySelector(`meta[${attr}="${name}"][${META_ATTR}]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    el.setAttribute(META_ATTR, '1');
    document.head.appendChild(el);
  }
  el.content = content;
}

function upsertCanonical(href: string) {
  let el = document.querySelector(`link[rel="canonical"][${META_ATTR}]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.rel = 'canonical';
    el.setAttribute(META_ATTR, '1');
    document.head.appendChild(el);
  }
  el.href = href;
}

function upsertRobots(noindex: boolean) {
  upsertMeta('robots', noindex ? 'noindex, nofollow' : 'index, follow');
}

function clearOgLocaleAlternates() {
  document.querySelectorAll(`meta[property="og:locale:alternate"][${META_ATTR}]`).forEach((el) => {
    el.remove();
  });
}

export function LocaleHead() {
  const { i18n } = useTranslation();
  const location = useLocation();
  const { override } = useSeoOverride();
  const locale = i18n.language as LocaleCode;
  const path = stripLocaleFromPath(location.pathname);
  const origin = siteOrigin();

  const globalJsonLd = useMemo(
    () => [organizationJsonLd(), websiteJsonLd(locale), localBusinessJsonLd()],
    [locale],
  );

  const pageJsonLd = override?.jsonLd ?? [];
  const allJsonLd = useMemo(() => [...globalJsonLd, ...pageJsonLd], [globalJsonLd, pageJsonLd]);

  useEffect(() => {
    document.documentElement.lang = locale;

    const title = override?.title ?? titleForPath(path, locale);
    const description = override?.description ?? descriptionForPath(path, locale);
    const canonicalPath = override?.canonicalPath ?? path;
    const canonical = `${origin}${pathWithLocale(locale, canonicalPath === '/' ? '/' : canonicalPath)}`;

    document.title = title;
    upsertMeta('description', description);
    upsertCanonical(canonical);
    upsertRobots(override?.noindex ?? false);

    upsertMeta('og:title', title, true);
    upsertMeta('og:description', description, true);
    upsertMeta('og:url', canonical, true);
    upsertMeta('og:type', override?.ogType ?? 'website', true);
    upsertMeta('og:site_name', BRAND_NAME, true);
    const ogImage = override?.ogImage ?? `${origin}${DEFAULT_OG_IMAGE_PATH}`;
    upsertMeta('og:image', ogImage, true);
    upsertMeta('og:image:width', '1200', true);
    upsertMeta('og:image:height', '630', true);

    const ogLocale = OG_LOCALE[locale] ?? OG_LOCALE.es;
    upsertMeta('og:locale', ogLocale, true);
    clearOgLocaleAlternates();
    for (const loc of supportedLocales.slice(0, 5)) {
      const alt = OG_LOCALE[loc.code];
      if (!alt || alt === ogLocale) continue;
      const el = document.createElement('meta');
      el.setAttribute('property', 'og:locale:alternate');
      el.setAttribute(META_ATTR, '1');
      el.content = alt;
      document.head.appendChild(el);
    }

    upsertMeta('twitter:card', 'summary_large_image');
    upsertMeta('twitter:title', title);
    upsertMeta('twitter:description', description);
    upsertMeta('twitter:image', ogImage);

    const existing = document.querySelectorAll('link[data-rp-hreflang]');
    existing.forEach((el) => el.remove());

    const basePath = path === '/' ? '' : path;
    const hrefPath = override?.canonicalPath?.startsWith('/product/')
      ? override.canonicalPath
      : basePath;

    for (const loc of supportedLocales) {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = loc.code;
      link.href = `${origin}${pathWithLocale(loc.code, hrefPath || '/')}`;
      link.setAttribute('data-rp-hreflang', '1');
      document.head.appendChild(link);
    }

    const xDefault = document.createElement('link');
    xDefault.rel = 'alternate';
    xDefault.hreflang = 'x-default';
    xDefault.href = `${origin}${pathWithLocale('es', hrefPath || '/')}`;
    xDefault.setAttribute('data-rp-hreflang', '1');
    document.head.appendChild(xDefault);
  }, [locale, path, location.search, override, origin]);

  return <JsonLd data={allJsonLd} />;
}
