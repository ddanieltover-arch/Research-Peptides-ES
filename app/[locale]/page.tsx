import type { Metadata } from 'next';
import type { LocaleCode } from '../../src/i18n/locales';
import { buildPageMetadata } from '../../src/seo/buildPageMetadata';
import { StaticPageHost } from '../../src/next/StaticPageHost';

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale as LocaleCode, '/');
}

export default function HomePage() {
  return (
    <StaticPageHost
      page="Home"
      answer="Research Peptides ES suministra peptidos de investigacion de alta pureza a laboratorios en Espana y la UE, con verificacion de terceros, precios en EUR y distribucion desde Madrid."
    />
  );
}
