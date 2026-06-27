import { Link, NavLink, type LinkProps, type NavLinkProps } from 'react-router-dom';
import { useLocalizedPath } from './useLocalizedPath';
import { prefetchRoute } from '../lib/routePrefetch';

type LocaleLinkProps = Omit<LinkProps, 'to'> & { to: string };

export function LocaleLink({ to, onMouseEnter, onFocus, onPointerDown, ...props }: LocaleLinkProps) {
  const localized = useLocalizedPath(to);

  return (
    <Link
      to={localized}
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

type LocaleNavLinkProps = Omit<NavLinkProps, 'to'> & { to: string };

export function LocaleNavLink({ to, onMouseEnter, onFocus, onPointerDown, ...props }: LocaleNavLinkProps) {
  const localized = useLocalizedPath(to);

  return (
    <NavLink
      to={localized}
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
