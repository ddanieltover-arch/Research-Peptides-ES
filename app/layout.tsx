import type { Metadata } from 'next';
import Script from 'next/script';
import { BRAND_NAME, SITE_URL } from '../src/config/brand';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BRAND_NAME} | Péptidos de investigación premium`,
    template: `%s`,
  },
  description:
    'Research Peptides ES — péptidos y compuestos de investigación premium para laboratorios europeos. Verificación de terceros, distribución en la UE, precios en EUR.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=IBM+Plex+Mono:wght@400;500&family=Manrope:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      </head>
      <body className="min-h-screen bg-mist-50 text-navy-950 antialiased">
        {children}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-0CJRFHNL7Z" strategy="afterInteractive" />
        <Script id="ga4" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-0CJRFHNL7Z');
        `}</Script>
      </body>
    </html>
  );
}
