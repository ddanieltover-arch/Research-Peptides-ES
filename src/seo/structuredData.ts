import { BRAND_NAME, HQ_ADDRESS, SITE_URL, SUPPORT_EMAIL } from '../config/brand';
import { DEFAULT_CURRENCY } from '../lib/currency';
import { pathWithLocale } from '../i18n/routing';
import { STATIC_ROUTE_PATHS } from '../i18n/routeSlugs';
import type { LocaleCode } from '../i18n/locales';
import { localizedProductDescription, localizedProductTitle } from '../lib/localizedProduct';
import { productPath } from '../lib/productUrl';

export function siteOrigin(): string {
  return SITE_URL.replace(/\/+$/, '');
}

export function organizationJsonLd() {
  const origin = siteOrigin();
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BRAND_NAME,
    url: origin,
    email: SUPPORT_EMAIL,
    logo: {
      '@type': 'ImageObject',
      url: `${origin}/brand_logo.png`,
    },
    areaServed: ['Spain', 'European Union'],
  };
}

export function websiteJsonLd(locale: LocaleCode) {
  const origin = siteOrigin();
  const searchPath = pathWithLocale(locale, STATIC_ROUTE_PATHS.search);
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: BRAND_NAME,
    url: `${origin}${pathWithLocale(locale, '/')}`,
    inLanguage: locale,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${origin}${searchPath}?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function localBusinessJsonLd() {
  const origin = siteOrigin();
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${origin}/#localbusiness`,
    name: BRAND_NAME,
    url: origin,
    logo: `${origin}/brand_logo.png`,
    image: `${origin}/brand_logo.png`,
    description:
      'Péptidos y compuestos de investigación premium para laboratorios europeos. Verificación de terceros, distribución en la UE.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: HQ_ADDRESS.streetAddress,
      postalCode: HQ_ADDRESS.postalCode,
      addressLocality: HQ_ADDRESS.addressLocality,
      addressRegion: HQ_ADDRESS.addressRegion,
      addressCountry: HQ_ADDRESS.addressCountry,
    },
    areaServed: ['Spain', 'European Union'],
    contactPoint: {
      '@type': 'ContactPoint',
      email: SUPPORT_EMAIL,
      contactType: 'customer support',
    },
  };
}

type ProductRow = {
  id: string;
  title: string;
  slug?: string | null;
  description?: string | null;
  price: number;
  compare_at_price?: number | null;
  inventory?: number;
  images?: string[] | null;
  rating?: number | null;
  review_count?: number | null;
};

export function productJsonLd(product: ProductRow, locale: LocaleCode) {
  const path = productPath(product);
  const url = `${siteOrigin()}${pathWithLocale(locale, path)}`;
  const images = (product.images ?? []).filter(Boolean);
  const inStock = Number(product.inventory ?? 0) > 0;
  const title = localizedProductTitle(product, locale);
  const description = localizedProductDescription(product, locale);

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: title,
    description: description || undefined,
    image: images.length ? images : undefined,
    sku: product.slug ?? String(product.id),
    url,
    brand: { '@type': 'Brand', name: BRAND_NAME },
    offers: {
      '@type': 'Offer',
      url,
      priceCurrency: DEFAULT_CURRENCY,
      price: Number(product.price) || 0,
      availability: inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
    },
    ...(product.rating != null && Number(product.review_count) > 0
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: product.rating,
            reviewCount: product.review_count,
          },
        }
      : {}),
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
  locale: LocaleCode,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteOrigin()}${pathWithLocale(locale, item.path)}`,
    })),
  };
}

type ListProduct = { title: string; slug?: string | null; id?: string };

export function itemListJsonLd(products: ListProduct[], locale: LocaleCode, limit = 48) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${BRAND_NAME} catalog`,
    numberOfItems: Math.min(products.length, limit),
    itemListElement: products.slice(0, limit).map((product, index) => {
      const path = productPath(product);
      return {
        '@type': 'ListItem',
        position: index + 1,
        name: product.title,
        url: `${siteOrigin()}${pathWithLocale(locale, path)}`,
      };
    }),
  };
}
