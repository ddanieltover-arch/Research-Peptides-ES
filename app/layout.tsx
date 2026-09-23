import type { Metadata } from 'next';
import Script from 'next/script';
import { Geist, Geist_Mono } from 'next/font/google';
import { BRAND_NAME, SITE_URL } from '../src/config/brand';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

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
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      </head>
      <body className="min-h-screen bg-mist-50 text-navy-950 font-sans antialiased selection:bg-brand-500 selection:text-white">
        {children}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-0CJRFHNL7Z" strategy="afterInteractive" />
        <Script id="ga4" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-0CJRFHNL7Z');
        `}</Script>
        <Script id="tawk-to" strategy="afterInteractive">{`
          var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
          (function(){
            if (document.getElementById('tawk-to-embed')) return;
            var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
            s1.id='tawk-to-embed';
            s1.async=true;
            s1.src='https://embed.tawk.to/6ab356b484951a34442d6c2d/1k368lcau';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
          })();
        `}</Script>
      </body>
    </html>
  );
}
