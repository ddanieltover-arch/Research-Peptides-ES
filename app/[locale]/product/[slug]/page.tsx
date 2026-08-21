import type { Metadata } from 'next';
import type { LocaleCode } from '../../../../src/i18n/locales';
import { buildPageMetadata, JsonLdScript } from '../../../../src/seo/buildPageMetadata';
import { getServerSupabase } from '../../../../src/lib/supabaseServer';
import { breadcrumbJsonLd, productFaqJsonLd, productJsonLd } from '../../../../src/seo/structuredData';
import { BRAND_NAME } from '../../../../src/config/brand';
import { ProductPageClient } from '../../../../src/next/ProductPageClient';
import {
  getProductSeoCopy,
  getProductSeoDocumentTitle,
  getProductSeoMetaDescription,
} from '../../../../src/seo/productSeoCopy';
import { localizedProductDescription, localizedProductTitle } from '../../../../src/lib/localizedProduct';

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const loc = locale as LocaleCode;
  const supabase = getServerSupabase();
  let fallbackTitle = slug;
  let fallbackDescription: string | undefined;
  if (supabase) {
    const { data } = await supabase
      .from('products')
      .select('title, description, title_i18n, description_i18n, slug')
      .eq('slug', slug)
      .maybeSingle();
    if (data) {
      fallbackTitle = localizedProductTitle(data, loc) || slug;
      fallbackDescription = String(localizedProductDescription(data, loc) || '').slice(0, 160);
    }
  }

  const title = `${getProductSeoDocumentTitle(slug, loc, fallbackTitle)} | ${BRAND_NAME}`;
  const description = getProductSeoMetaDescription(slug, loc, fallbackDescription);

  return buildPageMetadata(loc, `/product/${slug}`, {
    title,
    description,
    ogType: 'product',
  });
}

export default async function ProductPage({ params }: Props) {
  const { locale, slug } = await params;
  const loc = locale as LocaleCode;
  const supabase = getServerSupabase();
  let product: Record<string, unknown> | null = null;
  if (supabase) {
    const { data } = await supabase.from('products').select('*').eq('slug', slug).maybeSingle();
    product = data;
  }

  const seo = getProductSeoCopy(slug, loc);
  const displayTitle = seo?.h1 ?? (product ? localizedProductTitle(product as any, loc) : slug);
  const displaySnippet =
    seo?.answerCapsule ??
    (product ? String(localizedProductDescription(product as any, loc) || '').slice(0, 320) : '');

  const ld: Record<string, unknown>[] = [];
  if (product) {
    ld.push(productJsonLd(product as any, loc));
    ld.push(
      breadcrumbJsonLd(
        [
          { name: 'Home', path: '/' },
          { name: 'Shop', path: '/shop' },
          { name: displayTitle, path: `/product/${slug}` },
        ],
        loc,
      ),
    );
    const faqLd = productFaqJsonLd(slug, loc);
    if (faqLd) ld.push(faqLd);
  }

  return (
    <>
      {ld.length ? <JsonLdScript data={ld} /> : null}
      {product ? (
        <article className="sr-only">
          <h1>{displayTitle}</h1>
          <p>{displaySnippet}</p>
        </article>
      ) : null}
      <ProductPageClient />
    </>
  );
}
