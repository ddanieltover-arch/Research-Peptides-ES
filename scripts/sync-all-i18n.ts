/**
 * Sync all i18n namespaces to every supported locale.
 * - Spanish (es) files are canonical and never overwritten.
 * - English (en) and Spanish (es) are canonical and never overwritten.
 * - Other locales: translate from English using scripts/i18n/maps/{locale}.json,
 *   falling back to the Spanish (es) string when a map entry is missing.
 *
 *   npm run i18n:sync
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const localesDir = path.join(root, 'src/i18n/locales');
const mapsDir = path.join(__dirname, 'i18n/maps');

const ALL_LOCALES = [
  'es', 'en', 'nl', 'fr', 'de', 'it', 'pt', 'hr', 'pl', 'ro', 'cs', 'da', 'sv', 'fi', 'el', 'hu', 'sk', 'sl', 'bg',
] as const;

const SKIP_OVERWRITE = new Set(['es', 'en']);

function loadMap(locale: string): Record<string, string> {
  const file = path.join(mapsDir, `${locale}.json`);
  if (!fs.existsSync(file)) return {};
  return JSON.parse(fs.readFileSync(file, 'utf8')) as Record<string, string>;
}

function loadJson(locale: string, ns: string): object | null {
  const file = path.join(localesDir, locale, `${ns}.json`);
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, 'utf8')) as object;
}

function writeJson(locale: string, ns: string, data: object) {
  const dir = path.join(localesDir, locale);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, `${ns}.json`), `${JSON.stringify(data, null, 2)}\n`, 'utf8');
}

function translateTree<T>(node: T, map: Record<string, string>, esNode: T | undefined): T {
  if (typeof node === 'string') {
    const esStr = typeof esNode === 'string' ? esNode : undefined;
    return (map[node] ?? esStr ?? node) as T;
  }
  if (Array.isArray(node)) {
    return node.map((item, i) =>
      translateTree(item, map, Array.isArray(esNode) ? esNode[i] : undefined),
    ) as T;
  }
  if (node && typeof node === 'object') {
    const out: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(node as Record<string, unknown>)) {
      const esVal =
        esNode && typeof esNode === 'object' && !Array.isArray(esNode)
          ? (esNode as Record<string, unknown>)[key]
          : undefined;
      out[key] = translateTree(val, map, esVal);
    }
    return out as T;
  }
  return node;
}

function main() {
  const esNamespaces = fs
    .readdirSync(path.join(localesDir, 'es'))
    .filter((f) => f.endsWith('.json'))
    .map((f) => f.replace('.json', ''));

  console.log(`Syncing ${esNamespaces.length} namespaces → ${ALL_LOCALES.length} locales`);

  let written = 0;

  for (const locale of ALL_LOCALES) {
    if (SKIP_OVERWRITE.has(locale)) {
      console.log(`  skip ${locale} (canonical ${locale === 'es' ? 'Spanish' : 'English'})`);
      continue;
    }

    const map = loadMap(locale);

    for (const ns of esNamespaces) {
      const en = loadJson('en', ns);
      const es = loadJson('es', ns);
      if (!en) {
        console.warn(`  warn: missing en/${ns}.json`);
        if (es) writeJson(locale, ns, translateTree(es, map, es));
        continue;
      }

      writeJson(locale, ns, translateTree(en, map, es ?? en));
      written++;
    }

    console.log(`  ✓ ${locale}`);
  }

  console.log(`Done. Wrote/updated ${written} locale files.`);
}

main();
