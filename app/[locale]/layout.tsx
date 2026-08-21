import { notFound } from 'next/navigation';
import { AppProviders } from '../../src/next/AppProviders';
import { isLocaleCode, supportedLocales, type LocaleCode } from '../../src/i18n/locales';
import {
  localBusinessJsonLd,
  organizationJsonLd,
  websiteJsonLd,
} from '../../src/seo/structuredData';
import { JsonLdScript } from '../../src/seo/buildPageMetadata';

export function generateStaticParams() {
  return supportedLocales.map((l) => ({ locale: l.code }));
}

export const dynamic = 'force-dynamic';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!isLocaleCode(localeParam)) notFound();
  const locale = localeParam as LocaleCode;

  const globalLd = [organizationJsonLd(), websiteJsonLd(locale), localBusinessJsonLd()];

  return (
    <AppProviders locale={locale}>
      <JsonLdScript data={globalLd} />
      {children}
    </AppProviders>
  );
}
