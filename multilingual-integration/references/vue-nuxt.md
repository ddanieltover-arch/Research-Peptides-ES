# Vue 3 / Nuxt i18n

## Vue 3 SPA (vue-i18n)

```bash
npm install vue-i18n@9
```

### i18n.ts

```ts
import { createI18n } from 'vue-i18n';

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('lang') || navigator.language.split('-')[0] || 'en',
  fallbackLocale: 'en',
  messages: {},
});

export async function loadLocale(locale: string) {
  const msgs = await import(`../locales/${locale}.json`);
  i18n.global.setLocaleMessage(locale, msgs.default);
  i18n.global.locale.value = locale;
  document.documentElement.lang = locale;
  localStorage.setItem('lang', locale);
}

export default i18n;
```

### main.ts

```ts
import { createApp } from 'vue';
import i18n, { loadLocale } from './i18n';
import App from './App.vue';

const app = createApp(App);
app.use(i18n);
const startLocale = localStorage.getItem('lang') || 'en';
loadLocale(startLocale).then(() => app.mount('#app'));
```

### In components

```vue
<template>
  <h1>{{ t('hero.title') }}</h1>
  <button>{{ t('hero.cta') }}</button>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>
```

---

## Nuxt 3 (@nuxtjs/i18n)

```bash
npm install @nuxtjs/i18n
```

### nuxt.config.ts

```ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/i18n'],
  i18n: {
    strategy: 'prefix',
    locales: [
      { code: 'en', iso: 'en-US', file: 'en.json', name: 'English' },
      { code: 'fr', iso: 'fr-FR', file: 'fr.json', name: 'Français' },
      { code: 'pt', iso: 'pt-BR', file: 'pt.json', name: 'Português' },
      { code: 'cs', iso: 'cs-CZ', file: 'cs.json', name: 'Čeština' },
      { code: 'th', iso: 'th-TH', file: 'th.json', name: 'ไทย' },
      { code: 'id', iso: 'id-ID', file: 'id.json', name: 'Bahasa Indonesia' },
    ],
    defaultLocale: 'en',
    langDir: 'locales/',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      fallbackLocale: 'en',
    },
  },
});
```

### In pages/components

```vue
<template>
  <h1>{{ $t('hero.title') }}</h1>
</template>
```

### Language Switcher (Nuxt)

```vue
<template>
  <div>
    <NuxtLink
      v-for="locale in availableLocales"
      :key="locale.code"
      :to="switchLocalePath(locale.code)"
    >
      {{ locale.name }}
    </NuxtLink>
  </div>
</template>

<script setup>
const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const availableLocales = computed(() =>
  locales.value.filter(l => l.code !== locale.value)
);
</script>
```
