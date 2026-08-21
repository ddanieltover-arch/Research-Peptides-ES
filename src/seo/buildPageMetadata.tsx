import type { Metadata } from 'next';
import { BRAND_NAME, DEFAULT_OG_IMAGE_PATH, SITE_URL } from '../config/brand';
import { pathWithLocale } from '../i18n/routing';
import { supportedLocales, type LocaleCode } from '../i18n/locales';
import { descriptionForPath, titleForPath } from '../seo/pageTitles';

const origin = SITE_URL.replace(/\/+$/, '');

export function buildPageMetadata(
  locale: LocaleCode,
  canonicalPath: string,
  opts?: { title?: string; description?: string; noindex?: boolean; ogType?: string },
): Metadata {
  const title = opts?.title ?? titleForPath(canonicalPath, locale);
  const description = opts?.description ?? descriptionForPath(canonicalPath, locale);
  const path = pathWithLocale(locale, canonicalPath === '/' ? '/' : canonicalPath);
  const url = `${origin}${path}`;
  const image = `${origin}${DEFAULT_OG_IMAGE_PATH}`;

  const languages: Record<string, string> = {};
  for (const loc of supportedLocales) {
    languages[loc.code] = `${origin}${pathWithLocale(loc.code, canonicalPath)}`;
  }
  languages['x-default'] = `${origin}${pathWithLocale('es', canonicalPath)}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages,
    },
    robots: opts?.noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: BRAND_NAME,
      type: (opts?.ogType as 'website') || 'website',
      locale: locale === 'en' ? 'en_GB' : `${locale}_${locale.toUpperCase()}`,
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

export function JsonLdScript({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const payload = Array.isArray(data) ? data : [data];
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload.length === 1 ? payload[0] : payload) }}
    />
  );
}
