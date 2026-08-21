/**
 * Keyword-anchored internal/external SEO links — Research Peptides ES.
 * Source: seed map + Semrush gap (2026-08-21). Outbounds are scientific authorities only.
 */
import {
  countInboundFromGraph,
  FOOTER_SEO_LINKS,
  SEO_PAGE_LINKS,
} from '../src/seo/seoLinkGraph.ts';

const counts = countInboundFromGraph();
const footerTargets = new Set(FOOTER_SEO_LINKS.map((l) => l.to));

const targets = [
  '/',
  '/shop',
  '/categories',
  '/blog',
  '/faq',
  '/shipping',
  '/contact',
  '/about-us',
  '/peptide-guide',
  '/peptide-calculator',
  '/coas',
  '/peptide-information',
  '/peptide-research',
  '/peptide-glossary',
  '/peptide-stats',
  '/coa-vs-no-coa',
  '/terms',
  '/privacy',
  '/refund-returns',
  '/product/dsip',
  '/product/hexarelin-acetate',
  '/product/sermorelin-acetate',
  '/product/peg-mgf',
  '/product/hgh-fragment-176-191',
];

let fail = 0;
for (const t of targets) {
  const g = counts[t] ?? 0;
  const inFooter = footerTargets.has(t);
  // Footer appears on every public page → sitewide inbound; graph should still prefer ≥5.
  const ok = g >= 5 || inFooter;
  if (!ok) {
    fail++;
    console.log('LOW', t, 'graph', g);
  }
}

for (const [key, set] of Object.entries(SEO_PAGE_LINKS)) {
  if (set.external.length < 2) {
    fail++;
    console.log('EXT_FAIL', key, set.external.length);
  }
  if (set.internal.length < 5) {
    fail++;
    console.log('INT_OUT_FAIL', key, set.internal.length);
  }
}

console.log(fail === 0 ? 'PASS all hubs ≥5 inbound (graph and/or footer); ≥2 outbound each' : `FAILS:${fail}`);
