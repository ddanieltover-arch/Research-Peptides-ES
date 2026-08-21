'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from './LocaleProvider';
import { pathWithLocale } from './routing';

type NavigateOptions = { replace?: boolean; scroll?: boolean };

export function useLocaleNavigate() {
  const router = useRouter();
  const { locale } = useLocale();

  return useCallback(
    (to: string, options?: NavigateOptions) => {
      if (/^https?:\/\//i.test(to)) {
        window.location.assign(to);
        return;
      }
      const path = to.startsWith('/') ? to : `/${to}`;
      const href = pathWithLocale(locale, path);
      if (options?.replace) router.replace(href, { scroll: options.scroll });
      else router.push(href, { scroll: options?.scroll });
    },
    [router, locale],
  );
}
