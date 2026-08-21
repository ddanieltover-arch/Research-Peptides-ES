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
  return buildPageMetadata(locale as LocaleCode, '/peptide-calculator');
}

export default function Page() {
  return (
    <StaticPageHost
      page="PeptideCalculator"
      answer={"La calculadora estima volumenes de diluyente para reconstituir peptidos liofilizados en contextos de investigacion de laboratorio."}
    />
  );
}
