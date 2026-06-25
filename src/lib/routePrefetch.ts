import { stripLocaleFromPath } from '../i18n/routing';

const prefetched = new Set<string>();

/** Lazy route loaders — warms Vite chunks before navigation. */
const routeLoaders: Record<string, () => Promise<unknown>> = {
  '/': () => import('../pages/Home'),
  '/shop': () => import('../pages/Shop'),
  '/cart': () => import('../pages/Cart'),
  '/checkout': () => import('../pages/Checkout'),
  '/categories': () => import('../pages/Categories'),
  '/search': () => import('../pages/Search'),
  '/wishlist': () => import('../pages/Wishlist'),
  '/login': () => import('../pages/Login'),
  '/faq': () => import('../pages/FAQ'),
  '/shipping': () => import('../pages/Shipping'),
  '/contact': () => import('../pages/Contact'),
  '/about-us': () => import('../pages/AboutUs'),
  '/blog': () => import('../pages/Blog'),
  '/coas': () => import('../pages/COALibrary'),
  '/peptide-guide': () => import('../pages/PeptideGuide'),
  '/peptide-calculator': () => import('../pages/PeptideCalculator'),
  '/peptide-information': () => import('../pages/PeptideInformation'),
  '/peptide-research': () => import('../pages/PeptideResearch'),
  '/terms': () => import('../pages/Terms'),
  '/privacy': () => import('../pages/Privacy'),
  '/refund-returns': () => import('../pages/RefundReturns'),
  '/orders': () => import('../pages/Orders'),
  '/profile': () => import('../pages/Profile'),
};

export function normalizeRoutePath(path: string): string {
  const withSlash = path.startsWith('/') ? path : `/${path}`;
  const stripped = stripLocaleFromPath(withSlash.split('?')[0] ?? withSlash);
  if (stripped === '/' || stripped === '') return '/';
  if (stripped.startsWith('/product/')) return '/shop';
  if (stripped.startsWith('/blog/')) return '/blog';
  return stripped;
}

export function prefetchRoute(path: string): void {
  const key = normalizeRoutePath(path);
  if (prefetched.has(key)) return;
  const loader = routeLoaders[key];
  if (!loader) return;
  prefetched.add(key);
  void loader();
}

export function prefetchCriticalRoutes(): void {
  ['/shop', '/cart', '/checkout', '/categories', '/search', '/faq', '/about-us'].forEach(
    prefetchRoute,
  );
}
