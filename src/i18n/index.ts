import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { buildI18nResources } from './resources';
import { supportedLocales } from './locales';

const supportedLngs = supportedLocales.map((l) => l.code);

const fallbackLng: Record<string, string[]> = {
  default: ['es'],
};
for (const code of supportedLngs) {
  if (code !== 'es') fallbackLng[code] = ['es'];
}

void i18n.use(initReactI18next).init({
  resources: buildI18nResources(),
  lng: 'es',
  fallbackLng,
  supportedLngs,
  ns: ['common', 'nav', 'home', 'checkout', 'shop', 'shipping', 'legal', 'product', 'auth', 'blog', 'coa', 'research'],
  defaultNS: 'common',
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
});

export default i18n;
