# Next.js i18n Implementation

## App Router (Next.js 13+)

### 1. Install

```bash
npm install next-intl
```

### 2. File Structure

```
/messages/
  en.json
  fr.json
  pt.json
  cs.json
  th.json
  id.json
/app/
  [locale]/
    layout.tsx
    page.tsx
middleware.ts
next.config.js
```

### 3. next.config.js

```js
const withNextIntl = require('next-intl/plugin')();
module.exports = withNextIntl({ /* your config */ });
```

### 4. middleware.ts

```ts
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'fr', 'pt', 'cs', 'th', 'id'],
  defaultLocale: 'en',
  localeDetection: true
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
```

### 5. app/[locale]/layout.tsx

```tsx
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

export default async function LocaleLayout({ children, params: { locale } }) {
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

### 6. Using translations

```tsx
import { useTranslations } from 'next-intl';

export default function Page() {
  const t = useTranslations();
  return <h1>{t('hero.title')}</h1>;
}
```

### 7. hreflang in metadata

```tsx
export async function generateMetadata({ params: { locale } }) {
  return {
    alternates: {
      languages: {
        'en': '/en',
        'fr': '/fr',
        'pt': '/pt',
        'cs': '/cs',
        'th': '/th',
        'id': '/id',
      }
    }
  };
}
```

---

## Pages Router (Next.js 12 and below)

### next.config.js

```js
module.exports = {
  i18n: {
    locales: ['en', 'fr', 'pt', 'cs', 'th', 'id'],
    defaultLocale: 'en',
    localeDetection: true,
  }
};
```

### Install next-i18next

```bash
npm install next-i18next react-i18next i18next
```

### next-i18next.config.js

```js
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr', 'pt', 'cs', 'th', 'id'],
  },
};
```

### _app.tsx

```tsx
import { appWithTranslation } from 'next-i18next';
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
export default appWithTranslation(MyApp);
```

### In pages

```tsx
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Home() {
  const { t } = useTranslation('common');
  return <h1>{t('hero.title')}</h1>;
}

export async function getStaticProps({ locale }) {
  return {
    props: { ...(await serverSideTranslations(locale, ['common'])) }
  };
}
```
