'use client';

import { useCallback, useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type SearchParamUpdates = Record<string, string | null | undefined>;

/**
 * Next.js-friendly stand-in for react-router's useSearchParams.
 */
export function useAppSearchParams() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname() || '/';

  const setSearchParams = useCallback(
    (
      update: SearchParamUpdates | URLSearchParams | ((prev: URLSearchParams) => URLSearchParams),
      _options?: { replace?: boolean },
    ) => {
      const current = new URLSearchParams(searchParams?.toString() || '');
      let next: URLSearchParams;
      if (typeof update === 'function') {
        next = update(current);
      } else if (update instanceof URLSearchParams) {
        next = update;
      } else {
        next = current;
        for (const [key, value] of Object.entries(update)) {
          if (value == null || value === '') next.delete(key);
          else next.set(key, value);
        }
      }
      const qs = next.toString();
      const href = qs ? `${pathname}?${qs}` : pathname;
      if (_options?.replace) router.replace(href);
      else router.push(href);
    },
    [pathname, router, searchParams],
  );

  const params = useMemo(() => searchParams ?? new URLSearchParams(), [searchParams]);

  return [params, setSearchParams] as const;
}
