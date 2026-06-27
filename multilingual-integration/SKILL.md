---
name: multilingual-integration
description: >
  Universal Multi-Language Website Integration Engine. Use this skill whenever
  a user wants to add multilingual or internationalization (i18n) support to
  any existing website or web app — regardless of framework. Triggers on phrases
  like "add multiple languages", "make my site multilingual", "add i18n",
  "translate my website", "support French/Spanish/etc on my site", "add a
  language switcher", "localize my website", "support international users",
  "add hreflang", or any combination of website + language/translation/localization
  intent. Also triggers if the user shares a codebase and asks how to reach
  international audiences. Always use this skill before writing any i18n or
  localization code — it covers framework detection, translation architecture,
  SEO localization, URL routing, language switching UI, browser detection,
  performance, security, and deployment for all major frameworks.
---

# Universal Multi-Language Website Integration Engine

## Supported Languages (Default Set)

| Code | Language | Flag |
|------|----------|------|
| en | English | 🇬🇧 |
| fr | Français | 🇫🇷 |
| pt | Português | 🇵🇹 |
| cs | Čeština | 🇨🇿 |
| th | ไทย | 🇹🇭 |
| id | Bahasa Indonesia | 🇮🇩 |

The user may request a different or expanded language set — adapt accordingly.

---

## Step 1: Framework Detection

Before writing any code, scan the codebase and identify the framework:

- **Next.js** → use `next-intl` or `next-i18next`; App Router or Pages Router?
- **React (SPA)** → use `react-i18next` + `i18next`
- **Vue / Nuxt** → use `vue-i18n` / `@nuxtjs/i18n`
- **Angular** → use `@ngx-translate/core` or Angular built-in i18n
- **Astro** → use `astro-i18next` or manual routing
- **Remix** → use `remix-i18next`
- **Svelte / SvelteKit** → use `svelte-i18n` or `@inlang/paraglide-js`
- **Laravel / PHP** → use Laravel `lang/` files + `App::setLocale()`
- **WordPress** → use `__()` / `_e()` functions + `.pot` files + WPML/Polylang
- **Django** → use `django.utils.translation` + `gettext`
- **Flask** → use `Flask-Babel`
- **Static HTML/CSS/JS** → generate separate locale folders or inject via JS i18n library
- **Express / Node** → use `i18next` with `i18next-http-middleware`

Announce the detected framework and chosen strategy before proceeding.

---

## Step 2: Translation Architecture

### File Structure

```
/locales/
  en.json
  fr.json
  pt.json
  cs.json
  th.json
  id.json
```

### Key Naming Convention

Use dot-notation namespaces:

```json
{
  "nav.home": "Home",
  "nav.about": "About",
  "hero.title": "Welcome to Our Platform",
  "hero.cta": "Get Started",
  "footer.copyright": "© 2025 Company. All rights reserved.",
  "form.email_label": "Email Address",
  "form.submit": "Submit",
  "errors.required": "This field is required"
}
```

### Text Extraction Checklist

Scan for and extract:
- [ ] Navigation items
- [ ] Buttons and CTAs
- [ ] Form labels, placeholders, validation messages
- [ ] Hero section copy
- [ ] Feature/service descriptions
- [ ] Testimonials
- [ ] Pricing tables
- [ ] Footer links and legal text
- [ ] Error messages (404, 500, etc.)
- [ ] Email templates
- [ ] Meta titles and descriptions
- [ ] Open Graph content
- [ ] Alt text for images

Replace all hardcoded strings. Example:

```jsx
// Before
<button>Contact Us</button>

// After
<button>{t('nav.contact')}</button>
```

---

## Step 3: URL Routing

Implement locale-prefixed URLs:

```
/en/about
/fr/about
/pt/about
/cs/about
/th/about
/id/about
```

- Root `/` should detect browser language and redirect
- Preserve existing URL slugs within each locale prefix
- For framework-specific routing, see `/references/` files

---

## Step 4: Language Switcher Component

### Requirements
- Desktop dropdown + mobile-friendly version
- Accessible: keyboard navigable, ARIA labels
- Show current language as selected
- Display flag emoji + native language name

### HTML Structure Template

```html
<div class="lang-switcher" role="navigation" aria-label="Language selector">
  <button aria-haspopup="listbox" aria-expanded="false">
    🇬🇧 English ▾
  </button>
  <ul role="listbox">
    <li role="option" data-lang="en">🇬🇧 English</li>
    <li role="option" data-lang="fr">🇫🇷 Français</li>
    <li role="option" data-lang="pt">🇵🇹 Português</li>
    <li role="option" data-lang="cs">🇨🇿 Čeština</li>
    <li role="option" data-lang="th">🇹🇭 ไทย</li>
    <li role="option" data-lang="id">🇮🇩 Bahasa Indonesia</li>
  </ul>
</div>
```

Adapt to the target framework's component model (React, Vue, etc.).

---

## Step 5: Browser Language Detection & Persistence

### Detection Order
1. URL locale prefix (highest priority)
2. Cookie: `NEXT_LOCALE` / `i18n_lang` / framework equivalent
3. `localStorage.getItem('preferredLanguage')`
4. `navigator.language` / `navigator.languages`
5. Default: `en`

### Persistence
- Save selection to cookie (30-day expiry)
- Save to `localStorage` as backup
- Apply on every page load before render

---

## Step 6: SEO Localization

### hreflang Tags (in `<head>`)

```html
<link rel="alternate" hreflang="en" href="https://example.com/en/" />
<link rel="alternate" hreflang="fr" href="https://example.com/fr/" />
<link rel="alternate" hreflang="pt" href="https://example.com/pt/" />
<link rel="alternate" hreflang="cs" href="https://example.com/cs/" />
<link rel="alternate" hreflang="th" href="https://example.com/th/" />
<link rel="alternate" hreflang="id" href="https://example.com/id/" />
<link rel="alternate" hreflang="x-default" href="https://example.com/en/" />
```

### Per-Locale Meta Tags

```html
<html lang="fr">
<meta name="title" content="{t('meta.title')}" />
<meta name="description" content="{t('meta.description')}" />
<meta property="og:locale" content="fr_FR" />
<meta property="og:title" content="{t('meta.og_title')}" />
```

### Sitemap

Generate a separate sitemap per locale, or a combined sitemap with locale URLs:

```xml
<url>
  <loc>https://example.com/fr/about</loc>
  <xhtml:link rel="alternate" hreflang="en" href="https://example.com/en/about"/>
  <xhtml:link rel="alternate" hreflang="fr" href="https://example.com/fr/about"/>
</url>
```

---

## Step 7: Translation Quality Standards

- **Never** produce word-for-word machine translation
- Use context-aware, native-level phrasing
- Maintain brand voice and marketing effectiveness
- For Thai (`th`): use proper formal register
- For Czech (`cs`): handle grammatical gender correctly
- For Portuguese (`pt`): default to Brazilian PT unless European PT is specified
- For Indonesian (`id`): use formal Bahasa Indonesia

---

## Step 8: RTL/LTR Architecture

All 6 default languages are LTR. However, build with future RTL support:

```css
/* In global CSS */
[dir="rtl"] .lang-switcher { flex-direction: row-reverse; }
[dir="rtl"] .nav { margin-left: 0; margin-right: auto; }
```

Set `dir` attribute programmatically:

```js
const RTL_LANGS = ['ar', 'he', 'fa', 'ur'];
document.documentElement.dir = RTL_LANGS.includes(locale) ? 'rtl' : 'ltr';
```

---

## Step 9: Performance Requirements

- **Lazy-load** translation files — only load the active locale
- **Code-split** locale bundles in webpack/Vite
- **Cache** translation files at CDN edge
- **No SSR blocking** — hydrate translations client-side when possible
- Target: Lighthouse score ≥ 90 after implementation

---

## Step 10: Security

- Validate locale param against allowlist before use:
  ```js
  const VALID_LOCALES = ['en', 'fr', 'pt', 'cs', 'th', 'id'];
  const locale = VALID_LOCALES.includes(req.params.lang) ? req.params.lang : 'en';
  ```
- Sanitize all translation strings rendered as HTML
- Never interpolate raw user input into translation keys
- Prevent path traversal in locale file loading

---

## Step 11: Fallback Behavior

```
Requested locale → missing key?
  → Fall back to English equivalent
  → If English also missing → render key name (never crash)
```

```js
i18next.init({
  fallbackLng: 'en',
  missingKeyHandler: (lng, ns, key) => console.warn(`Missing: ${lng}/${key}`)
});
```

---

## Step 12: Analytics Tracking

Add events on language switch:

```js
// Google Analytics 4
gtag('event', 'language_switch', {
  from_language: previousLang,
  to_language: newLang
});

// Plausible
plausible('Language Switch', { props: { language: newLang } });
```

---

## Deliverables Checklist

After implementation, confirm:

- [ ] All 6 locale JSON files created and populated
- [ ] All hardcoded text replaced with translation keys
- [ ] Language switcher visible on desktop and mobile
- [ ] URL routing works for all locales
- [ ] Browser language detection and redirect implemented
- [ ] Language preference persisted in cookie + localStorage
- [ ] hreflang tags added to all pages
- [ ] Per-locale meta titles and descriptions
- [ ] Locale-aware sitemap generated
- [ ] `<html lang="">` attribute updates dynamically
- [ ] Fallback to English on missing keys
- [ ] No console errors in any locale
- [ ] Lighthouse score ≥ 90 confirmed
- [ ] Security: locale input validated against allowlist

---

## Framework Reference Files

For deep framework-specific implementation details, see:

- `references/nextjs.md` — Next.js App Router + Pages Router
- `references/react-spa.md` — React SPA with react-i18next
- `references/vue-nuxt.md` — Vue 3 / Nuxt with vue-i18n
- `references/static-html.md` — Static HTML/JS sites
- `references/laravel-php.md` — Laravel and PHP backends
- `references/wordpress.md` — WordPress with Polylang/WPML

Read the relevant file after detecting the framework.
