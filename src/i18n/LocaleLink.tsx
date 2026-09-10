'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  useMemo,
  type ComponentProps,
  type ReactNode,
  type MouseEvent,
  type FocusEvent,
  type PointerEvent,
} from 'react';
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

function isModifiedClick(e: MouseEvent<HTMLAnchorElement>) {
  return e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0;
}

type LocaleLinkProps = Omit<ComponentProps<typeof Link>, 'href'> & { to: string; href?: never };

export function LocaleLink({
  to,
  onMouseEnter,
  onFocus,
  onPointerDown,
  onClick,
  ...props
}: LocaleLinkProps) {
  const href = useAppRouterHref(to);
  const router = useRouter();

  return (
    <Link
      href={href}
      prefetch
      {...props}
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
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || isModifiedClick(e)) return;
        // Explicit soft navigation — avoids stalled Link transitions when the
        // address bar is on a pretty alias or hydration is racing overlays.
        e.preventDefault();
        router.push(href);
      }}
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
  onClick,
  children,
  ...props
}: LocaleNavLinkProps) {
  const href = useAppRouterHref(to);
  const router = useRouter();
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
      {...props}
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
      onClick={(e: MouseEvent<HTMLAnchorElement>) => {
        onClick?.(e);
        if (e.defaultPrevented || isModifiedClick(e)) return;
        e.preventDefault();
        router.push(href);
      }}
    >
      {children}
    </Link>
  );
}
