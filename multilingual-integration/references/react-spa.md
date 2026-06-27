# React SPA i18n (react-i18next)

## Install

```bash
npm install i18next react-i18next i18next-browser-languagedetector i18next-http-backend
```

## i18n.ts

```ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'fr', 'pt', 'cs', 'th', 'id'],
    backend: { loadPath: '/locales/{{lng}}.json' },
    detection: {
      order: ['cookie', 'localStorage', 'navigator'],
      caches: ['cookie', 'localStorage'],
    },
    interpolation: { escapeValue: false },
  });

export default i18n;
```

## main.tsx

```tsx
import './i18n';
import React, { Suspense } from 'react';

// Wrap in Suspense — translations load asynchronously
ReactDOM.createRoot(document.getElementById('root')!).render(
  <Suspense fallback="Loading...">
    <App />
  </Suspense>
);
```

## Using in components

```tsx
import { useTranslation } from 'react-i18next';

function HeroSection() {
  const { t } = useTranslation();
  return (
    <section>
      <h1>{t('hero.title')}</h1>
      <p>{t('hero.subtitle')}</p>
      <button>{t('hero.cta')}</button>
    </section>
  );
}
```

## Language Switcher Component

```tsx
import { useTranslation } from 'react-i18next';

const LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'pt', label: 'Português', flag: '🇵🇹' },
  { code: 'cs', label: 'Čeština', flag: '🇨🇿' },
  { code: 'th', label: 'ไทย', flag: '🇹🇭' },
  { code: 'id', label: 'Bahasa Indonesia', flag: '🇮🇩' },
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const current = LANGUAGES.find(l => l.code === i18n.language) || LANGUAGES[0];

  return (
    <div className="lang-switcher" role="navigation" aria-label="Language selector">
      <button aria-haspopup="listbox">
        {current.flag} {current.label}
      </button>
      <ul role="listbox">
        {LANGUAGES.map(lang => (
          <li
            key={lang.code}
            role="option"
            aria-selected={lang.code === i18n.language}
            onClick={() => i18n.changeLanguage(lang.code)}
          >
            {lang.flag} {lang.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## URL-based routing (with React Router)

```tsx
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/en" replace />} />
        <Route path="/:lang/*" element={<LocaleWrapper />} />
      </Routes>
    </BrowserRouter>
  );
}

function LocaleWrapper() {
  const { lang } = useParams();
  const { i18n } = useTranslation();
  const VALID = ['en', 'fr', 'pt', 'cs', 'th', 'id'];

  useEffect(() => {
    if (VALID.includes(lang!) && i18n.language !== lang) {
      i18n.changeLanguage(lang!);
    }
  }, [lang]);

  return <Outlet />;
}
```

## Dynamic html lang attribute

```tsx
// In App.tsx or a top-level effect
const { i18n } = useTranslation();
useEffect(() => {
  document.documentElement.lang = i18n.language;
}, [i18n.language]);
```
