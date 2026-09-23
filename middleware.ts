import { NextResponse, type NextRequest } from 'next/server';
import {
  DEFAULT_LOCALE,
  getLocaleFromPath,
  internalAppPath,
  publicAliasPath,
  stripLocaleFromPath,
} from './src/i18n/routing';
import { isLocaleCode } from './src/i18n/locales';

function normalizePath(path: string): string {
  if (!path || path === '/') return '/';
  return path.replace(/\/+$/, '') || '/';
}

/**
 * Keep translated slugs in the address bar (`/tienda`, `/producto/…`, `/fr/boutique`).
 * Rewrite those pretty URLs onto real App Router segments (`/es/shop`, `/es/product/…`).
 * Old English paths (`/es/shop`, `/shop`) 308 to the localized page name.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname === '/product-feed.xml' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    pathname === '/llms.txt' ||
    /\.[a-zA-Z0-9]+$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  const urlLocale = getLocaleFromPath(pathname);
  const locale = urlLocale && isLocaleCode(urlLocale) ? urlLocale : DEFAULT_LOCALE;
  const canonical = stripLocaleFromPath(pathname);
  const prettyPath = normalizePath(publicAliasPath(locale, canonical));
  const internalPath = normalizePath(internalAppPath(locale, canonical));
  const current = normalizePath(pathname);

  if (current !== prettyPath) {
    const url = request.nextUrl.clone();
    url.pathname = prettyPath;
    return NextResponse.redirect(url, 308);
  }

  if (prettyPath === internalPath) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = internalPath;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
