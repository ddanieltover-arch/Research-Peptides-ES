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
  return buildPageMetadata(locale as LocaleCode, '/about-us');
}

export default function Page() {
  return (
    <StaticPageHost
      page="AboutUs"
      answer={"Research Peptides ES S.L. es un proveedor espanol de peptidos de investigacion con sede en Madrid y distribucion a laboratorios de la UE."}
    />
  );
}
