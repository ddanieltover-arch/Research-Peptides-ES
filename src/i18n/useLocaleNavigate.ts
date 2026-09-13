'use client';

import { useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from './LocaleProvider';
import { pathWithLocale } from './routing';
import { navigateClient } from '../lib/clientNavigation';

type NavigateOptions = { replace?: boolean; scroll?: boolean };

export function useLocaleNavigate() {
  const router = useRouter();
  const pathname = usePathname() || '/';
  const { locale } = useLocale();

  return useCallback(
    (to: string, options?: NavigateOptions) => {
      if (/^https?:\/\//i.test(to)) {
        window.location.assign(to);
        return;
      }
      const path = to.startsWith('/') ? to : `/${to}`;
      const href = pathWithLocale(locale, path);
      navigateClient(router, href, pathname, { replace: options?.replace });
    },
    [router, locale, pathname],
  );
}
