import type { Metadata } from 'next';
import type { LocaleCode } from '../../../src/i18n/locales';
import { buildPageMetadata } from '../../../src/seo/buildPageMetadata';
import { StaticPageHost } from '../../../src/next/StaticPageHost';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale as LocaleCode, '/shop');
}

export default function Page() {
  return (
    <StaticPageHost
      page="Shop"
      answer={"La tienda de Research Peptides ES ofrece un catalogo de peptidos de investigacion de alta pureza para laboratorios europeos, con certificados COA y envio en cadena de frio."}
    />
  );
}
