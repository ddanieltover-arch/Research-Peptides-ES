import { NextResponse, type NextRequest } from 'next/server';
import {
  DEFAULT_LOCALE,
  getLocaleFromPath,
  stripLocaleFromPath,
} from './src/i18n/routing';
import { isLocaleCode } from './src/i18n/locales';

/**
 * Soft client navigation only works when the browser URL matches `app/[locale]/…`.
 * Pretty aliases (`/tienda`, `/`, `/producto/x`) must 308 → `/es/shop`, `/es`, etc.
 * Rewrites alone leave the address bar on a non-routable path and Link clicks stall
 * until a hard refresh.
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
  const internalPath = `/${locale}${canonical === '/' ? '' : canonical}`;

  if (pathname === internalPath || pathname === `${internalPath}/`) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = internalPath;
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
