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
  return buildPageMetadata(locale as LocaleCode, '/blog');
}

export default function Page() {
  return (
    <StaticPageHost
      page="Blog"
      answer={"El diario de investigacion de Research Peptides ES publica notas sobre peptidos, calidad de laboratorio y mejores practicas para investigadores."}
    />
  );
}
