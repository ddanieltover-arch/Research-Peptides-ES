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
  return buildPageMetadata(locale as LocaleCode, '/peptide-guide');
}

export default function Page() {
  return (
    <StaticPageHost
      page="PeptideGuide"
      answer={"La guia de peptidos explica manipulacion, almacenamiento y reconstitucion de peptidos liofilizados para uso exclusivo de laboratorio."}
    />
  );
}
