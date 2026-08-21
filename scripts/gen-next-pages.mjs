import fs from 'fs';
import path from 'path';

const pageMap = {
  cart: 'Cart',
  checkout: 'Checkout',
  blog: 'Blog',
  profile: 'Profile',
  orders: 'Orders',
  wishlist: 'Wishlist',
  search: 'Search',
  categories: 'Categories',
  login: 'Login',
  faq: 'FAQ',
  shipping: 'Shipping',
  contact: 'Contact',
  'about-us': 'AboutUs',
  'peptide-guide': 'PeptideGuide',
  'peptide-calculator': 'PeptideCalculator',
  coas: 'COALibrary',
  'peptide-information': 'PeptideInformation',
  'peptide-research': 'PeptideResearch',
  'peptide-glossary': 'PeptideGlossary',
  'peptide-stats': 'PeptideStats',
  'coa-vs-no-coa': 'CoaVsNoCoa',
  terms: 'Terms',
  privacy: 'Privacy',
  'refund-returns': 'RefundReturns',
  admin: 'AdminDashboard',
  shop: 'Shop',
};

const routes = [
  { path: 'shop', canon: '/shop', answer: 'La tienda de Research Peptides ES ofrece un catalogo de peptidos de investigacion de alta pureza para laboratorios europeos, con certificados COA y envio en cadena de frio.' },
  { path: 'cart', canon: '/cart', noindex: true },
  { path: 'checkout', canon: '/checkout', noindex: true },
  { path: 'blog', canon: '/blog', answer: 'El diario de investigacion de Research Peptides ES publica notas sobre peptidos, calidad de laboratorio y mejores practicas para investigadores.' },
  { path: 'profile', canon: '/profile', noindex: true },
  { path: 'orders', canon: '/orders', noindex: true },
  { path: 'wishlist', canon: '/wishlist', noindex: true },
  { path: 'search', canon: '/search', noindex: true },
  { path: 'categories', canon: '/categories' },
  { path: 'login', canon: '/login', noindex: true },
  { path: 'faq', canon: '/faq', answer: 'Las preguntas frecuentes cubren pedidos, envio en frio, COA, pureza y el uso exclusivo para investigacion de los peptidos.' },
  { path: 'shipping', canon: '/shipping' },
  { path: 'contact', canon: '/contact' },
  { path: 'about-us', canon: '/about-us', answer: 'Research Peptides ES S.L. es un proveedor espanol de peptidos de investigacion con sede en Madrid y distribucion a laboratorios de la UE.' },
  { path: 'peptide-guide', canon: '/peptide-guide', answer: 'La guia de peptidos explica manipulacion, almacenamiento y reconstitucion de peptidos liofilizados para uso exclusivo de laboratorio.' },
  { path: 'peptide-calculator', canon: '/peptide-calculator', answer: 'La calculadora estima volumenes de diluyente para reconstituir peptidos liofilizados en contextos de investigacion de laboratorio.' },
  { path: 'coas', canon: '/coas' },
  { path: 'peptide-information', canon: '/peptide-information' },
  { path: 'peptide-research', canon: '/peptide-research' },
  { path: 'peptide-glossary', canon: '/peptide-glossary' },
  { path: 'peptide-stats', canon: '/peptide-stats' },
  { path: 'coa-vs-no-coa', canon: '/coa-vs-no-coa' },
  { path: 'terms', canon: '/terms' },
  { path: 'privacy', canon: '/privacy' },
  { path: 'refund-returns', canon: '/refund-returns' },
  { path: 'admin', canon: '/admin', noindex: true },
];

for (const r of routes) {
  const dir = path.join('app', '[locale]', r.path);
  fs.mkdirSync(dir, { recursive: true });
  const comp = pageMap[r.path];
  const noindexMeta = r.noindex ? ', { noindex: true }' : '';
  const answerProp = r.answer ? `\n      answer={${JSON.stringify(r.answer)}}` : '';
  const content = `import type { Metadata } from 'next';
import type { LocaleCode } from '../../../src/i18n/locales';
import { buildPageMetadata } from '../../../src/seo/buildPageMetadata';
import { StaticPageHost } from '../../../src/next/StaticPageHost';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale as LocaleCode, '${r.canon}'${noindexMeta});
}

export default function Page() {
  return (
    <StaticPageHost
      page="${comp}"${answerProp}
    />
  );
}
`;
  fs.writeFileSync(path.join(dir, 'page.tsx'), content);
  console.log('wrote', r.path);
}
