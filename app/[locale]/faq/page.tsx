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
  return buildPageMetadata(locale as LocaleCode, '/faq');
}

export default function Page() {
  return (
    <StaticPageHost
      page="FAQ"
      answer={"Las preguntas frecuentes cubren pedidos, envio en frio, COA, pureza y el uso exclusivo para investigacion de los peptidos."}
    />
  );
}
