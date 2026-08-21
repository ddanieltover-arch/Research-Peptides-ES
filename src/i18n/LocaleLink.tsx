'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo, type ComponentProps, type ReactNode, type MouseEvent, type FocusEvent, type PointerEvent } from 'react';
import { useLocale } from './LocaleProvider';
import { getLocaleFromPath, pathWithLocale, stripLocaleFromPath } from './routing';
import type { LocaleCode } from './locales';
import { prefetchRoute } from '../lib/routePrefetch';

function useAppRouterHref(to: string): string {
  const pathname = usePathname() || '/';
  const { locale: ctxLocale } = useLocale();
  return useMemo(() => {
    const fromUrl = getLocaleFromPath(pathname);
    const locale = (fromUrl ?? ctxLocale) as LocaleCode;
    const path = to.startsWith('/') ? to : `/${to}`;
    return pathWithLocale(locale, path);
  }, [to, pathname, ctxLocale]);
}

type LocaleLinkProps = Omit<ComponentProps<typeof Link>, 'href'> & { to: string; href?: never };

export function LocaleLink({
  to,
  onMouseEnter,
  onFocus,
  onPointerDown,
  ...props
}: LocaleLinkProps) {
  const href = useAppRouterHref(to);

  return (
    <Link
      href={href}
      prefetch
      onMouseEnter={(e) => {
        prefetchRoute(to);
        onMouseEnter?.(e);
      }}
      onFocus={(e) => {
        prefetchRoute(to);
        onFocus?.(e);
      }}
      onPointerDown={(e) => {
        if (e.button === 0) prefetchRoute(to);
        onPointerDown?.(e);
      }}
      {...props}
    />
  );
}

type ClassNameFn = (args: { isActive: boolean }) => string;

type LocaleNavLinkProps = Omit<ComponentProps<typeof Link>, 'href' | 'className'> & {
  to: string;
  end?: boolean;
  className?: string | ClassNameFn;
  children?: ReactNode;
};

export function LocaleNavLink({
  to,
  end,
  className,
  onMouseEnter,
  onFocus,
  onPointerDown,
  children,
  ...props
}: LocaleNavLinkProps) {
  const href = useAppRouterHref(to);
  const pathname = usePathname() || '/';
  const canonicalPath = stripLocaleFromPath(pathname);
  const targetPath = (() => {
    const base = to.split('?')[0] || '/';
    return base.startsWith('/') ? base : `/${base}`;
  })();
  const isActive = end
    ? canonicalPath === targetPath || (targetPath === '/' && canonicalPath === '/')
    : canonicalPath === targetPath || canonicalPath.startsWith(`${targetPath}/`);

  const resolvedClass =
    typeof className === 'function' ? className({ isActive }) : className;

  return (
    <Link
      href={href}
      prefetch
      className={resolvedClass}
      aria-current={isActive ? 'page' : undefined}
      onMouseEnter={(e: MouseEvent<HTMLAnchorElement>) => {
        prefetchRoute(to);
        onMouseEnter?.(e);
      }}
      onFocus={(e: FocusEvent<HTMLAnchorElement>) => {
        prefetchRoute(to);
        onFocus?.(e);
      }}
      onPointerDown={(e: PointerEvent<HTMLAnchorElement>) => {
        if (e.button === 0) prefetchRoute(to);
        onPointerDown?.(e);
      }}
      {...props}
    >
      {children}
    </Link>
  );
}
