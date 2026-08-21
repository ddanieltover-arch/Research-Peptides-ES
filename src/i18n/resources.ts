import type { LocaleCode } from './locales';
import { supportedLocales } from './locales';

type NamespaceBundle = Record<string, object>;

declare const require: {
  context(
    directory: string,
    useSubdirectories?: boolean,
    regExp?: RegExp,
  ): {
    keys(): string[];
    (id: string): { default?: object } & object;
  };
};

function loadViaViteGlob(): Record<string, NamespaceBundle> | null {
  try {
    // Vite-only; Next webpack will warn but we catch empty
    const globber = (import.meta as any).glob as
      | ((pattern: string, opts: { eager: boolean }) => Record<string, Record<string, unknown>>)
      | undefined;
    if (!globber) return null;
    const modules = globber('./locales/*/*.json', { eager: true }) as Record<
      string,
      Record<string, unknown>
    >;
    if (!modules || !Object.keys(modules).length) return null;
    const resources: Record<string, NamespaceBundle> = {};
    for (const path of Object.keys(modules)) {
      const match = path.match(/\.\/locales\/([^/]+)\/([^/]+)\.json$/);
      if (!match) continue;
      const [, lng, ns] = match;
      const data = modules[path];
      const payload = (data && 'default' in data ? data.default : data) as object;
      if (!resources[lng]) resources[lng] = {};
      resources[lng][ns] = payload;
    }
    return resources;
  } catch {
    return null;
  }
}

function loadViaWebpackContext(): Record<string, NamespaceBundle> | null {
  try {
    // Webpack / Next.js
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const ctx = require.context('./locales', true, /\.json$/);
    const resources: Record<string, NamespaceBundle> = {};
    for (const key of ctx.keys()) {
      const match = key.match(/^\.\/([^/]+)\/([^/]+)\.json$/);
      if (!match) continue;
      const [, lng, ns] = match;
      const data = ctx(key);
      const payload = (data && data.default ? data.default : data) as object;
      if (!resources[lng]) resources[lng] = {};
      resources[lng][ns] = payload;
    }
    return Object.keys(resources).length ? resources : null;
  } catch {
    return null;
  }
}

/** All locale JSON under src/i18n/locales/{lng}/{ns}.json */
export function buildI18nResources(): Record<string, NamespaceBundle> {
  return loadViaWebpackContext() || loadViaViteGlob() || {};
}

export const translatedLocales: LocaleCode[] = supportedLocales.map((l) => l.code);

export const i18nNamespaces = [
  'common',
  'nav',
  'home',
  'checkout',
  'shop',
  'shipping',
  'legal',
  'product',
  'auth',
  'blog',
  'coa',
  'research',
  'search',
  'categories',
  'account',
];
