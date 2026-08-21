import { stripLocaleFromPath } from '../i18n/routing';

const prefetched = new Set<string>();

/** Lazy route loaders — warms Vite chunks before navigation. */
const routeLoaders: Record<string, () => Promise<unknown>> = {
  '/': () => import('../views/Home'),
  '/shop': () => import('../views/Shop'),
  '/cart': () => import('../views/Cart'),
  '/checkout': () => import('../views/Checkout'),
  '/categories': () => import('../views/Categories'),
  '/search': () => import('../views/Search'),
  '/wishlist': () => import('../views/Wishlist'),
  '/login': () => import('../views/Login'),
  '/faq': () => import('../views/FAQ'),
  '/shipping': () => import('../views/Shipping'),
  '/contact': () => import('../views/Contact'),
  '/about-us': () => import('../views/AboutUs'),
  '/blog': () => import('../views/Blog'),
  '/coas': () => import('../views/COALibrary'),
  '/peptide-guide': () => import('../views/PeptideGuide'),
  '/peptide-calculator': () => import('../views/PeptideCalculator'),
  '/peptide-information': () => import('../views/PeptideInformation'),
  '/peptide-research': () => import('../views/PeptideResearch'),
  '/terms': () => import('../views/Terms'),
  '/privacy': () => import('../views/Privacy'),
  '/refund-returns': () => import('../views/RefundReturns'),
  '/orders': () => import('../views/Orders'),
  '/profile': () => import('../views/Profile'),
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
  const withSlash = path.startsWith('/') ? path : `/${path}`;
  const stripped = stripLocaleFromPath(withSlash.split('?')[0] ?? withSlash);

  if (stripped.startsWith('/blog/') && stripped !== '/blog') {
    void import('../views/BlogPost');
  }

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
