# Static HTML/CSS/JS i18n

## Strategy: JS-driven translation injection

For sites with no build step, use a lightweight JS i18n approach.

## File structure

```
/locales/
  en.json
  fr.json
  pt.json
  cs.json
  th.json
  id.json
/i18n.js       ← language engine
/index.html    ← add data-i18n attributes
```

## data-i18n attributes in HTML

```html
<!-- Text content -->
<h1 data-i18n="hero.title">Welcome</h1>
<p data-i18n="hero.subtitle">Default text</p>
<button data-i18n="hero.cta">Get Started</button>

<!-- Placeholders -->
<input data-i18n-placeholder="form.email_placeholder" />

<!-- Aria labels -->
<button data-i18n-aria-label="nav.menu_open">☰</button>
```

## i18n.js

```js
const VALID_LOCALES = ['en', 'fr', 'pt', 'cs', 'th', 'id'];
const DEFAULT_LOCALE = 'en';

function detectLocale() {
  // 1. URL path prefix
  const pathLang = window.location.pathname.split('/')[1];
  if (VALID_LOCALES.includes(pathLang)) return pathLang;
  // 2. Cookie
  const cookie = document.cookie.match(/i18n_lang=([^;]+)/)?.[1];
  if (cookie && VALID_LOCALES.includes(cookie)) return cookie;
  // 3. localStorage
  const stored = localStorage.getItem('preferredLanguage');
  if (stored && VALID_LOCALES.includes(stored)) return stored;
  // 4. Browser
  const browserLang = navigator.language?.split('-')[0];
  if (VALID_LOCALES.includes(browserLang)) return browserLang;
  return DEFAULT_LOCALE;
}

async function loadTranslations(locale) {
  const res = await fetch(`/locales/${locale}.json`);
  return res.json();
}

function applyTranslations(translations) {
  // Text content
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = getNestedKey(translations, key) || el.textContent;
  });
  // Placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    el.placeholder = getNestedKey(translations, key) || el.placeholder;
  });
  // ARIA labels
  document.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
    const key = el.getAttribute('data-i18n-aria-label');
    el.setAttribute('aria-label', getNestedKey(translations, key) || '');
  });
}

function getNestedKey(obj, dotPath) {
  return dotPath.split('.').reduce((acc, k) => acc?.[k], obj);
}

function setLocale(locale) {
  if (!VALID_LOCALES.includes(locale)) return;
  document.cookie = `i18n_lang=${locale};max-age=2592000;path=/`;
  localStorage.setItem('preferredLanguage', locale);
  window.location.pathname = `/${locale}${window.location.pathname.replace(/^\/(en|fr|pt|cs|th|id)/, '')}`;
}

async function init() {
  const locale = detectLocale();
  document.documentElement.lang = locale;
  const translations = await loadTranslations(locale);
  applyTranslations(translations);

  // Wire up language switcher
  document.querySelectorAll('[data-lang-switch]').forEach(el => {
    el.addEventListener('click', () => setLocale(el.getAttribute('data-lang-switch')));
  });
}

document.addEventListener('DOMContentLoaded', init);
```

## Language switcher HTML

```html
<nav class="lang-switcher" aria-label="Language selector">
  <button data-lang-switch="en">🇬🇧 English</button>
  <button data-lang-switch="fr">🇫🇷 Français</button>
  <button data-lang-switch="pt">🇵🇹 Português</button>
  <button data-lang-switch="cs">🇨🇿 Čeština</button>
  <button data-lang-switch="th">🇹🇭 ไทย</button>
  <button data-lang-switch="id">🇮🇩 Bahasa Indonesia</button>
</nav>
```

## Server-side folder strategy (alternative)

If using Apache/Nginx, create locale-specific folders:

```
/en/index.html
/fr/index.html
/pt/index.html
...
```

Add Nginx redirect:

```nginx
location = / {
  set $lang en;
  if ($http_accept_language ~* "^fr") { set $lang fr; }
  if ($http_accept_language ~* "^pt") { set $lang pt; }
  return 302 /$lang/;
}
```
