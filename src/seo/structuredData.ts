import { BRAND_NAME, HQ_ADDRESS, HQ_GEO, SITE_URL, SUPPORT_EMAIL, WHATSAPP_NUMBER } from '../config/brand';
import { DEFAULT_CURRENCY } from '../lib/currency';
import { pathWithLocale } from '../i18n/routing';
import { STATIC_ROUTE_PATHS } from '../i18n/routeSlugs';
import type { LocaleCode } from '../i18n/locales';
import { localizedProductDescription, localizedProductTitle } from '../lib/localizedProduct';
import { getProductSeoCopy } from './productSeoCopy';
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
    telephone: `+${WHATSAPP_NUMBER}`,
    logo: {
      '@type': 'ImageObject',
      url: `${origin}/brand_logo.png`,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: HQ_ADDRESS.streetAddress,
      postalCode: HQ_ADDRESS.postalCode,
      addressLocality: HQ_ADDRESS.addressLocality,
      addressRegion: HQ_ADDRESS.addressRegion,
      addressCountry: HQ_ADDRESS.addressCountry,
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
    telephone: `+${WHATSAPP_NUMBER}`,
    email: SUPPORT_EMAIL,
    address: {
      '@type': 'PostalAddress',
      streetAddress: HQ_ADDRESS.streetAddress,
      postalCode: HQ_ADDRESS.postalCode,
      addressLocality: HQ_ADDRESS.addressLocality,
      addressRegion: HQ_ADDRESS.addressRegion,
      addressCountry: HQ_ADDRESS.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: HQ_GEO.latitude,
      longitude: HQ_GEO.longitude,
    },
    areaServed: ['Spain', 'European Union'],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: `+${WHATSAPP_NUMBER}`,
      email: SUPPORT_EMAIL,
      contactType: 'customer support',
      areaServed: ['ES', 'EU'],
      availableLanguage: ['Spanish', 'English'],
    },
  };
}

export function howToJsonLd(name: string, description: string, steps: { name: string; text: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
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
  const seo = getProductSeoCopy(product.slug, locale);
  const title = seo?.h1 ?? localizedProductTitle(product, locale);
  const description =
    seo?.metaDescription ??
    seo?.shortDescription ??
    localizedProductDescription(product, locale);

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

export function productFaqJsonLd(slug: string, locale: LocaleCode) {
  const seo = getProductSeoCopy(slug, locale);
  if (!seo?.faqs?.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: seo.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
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
