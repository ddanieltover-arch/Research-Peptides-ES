'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import {
  clearClientNavigation,
  useClientNavigationState,
} from '../lib/clientNavigation';

/** Top progress bar — shows immediately on link click while the route loads. */
export function NavigationProgress() {
  const pathname = usePathname() || '/';
  const { pending } = useClientNavigationState();

  useEffect(() => {
    clearClientNavigation(pathname);
  }, [pathname]);

  if (!pending) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[300] h-0.5 overflow-hidden pointer-events-none"
      role="progressbar"
      aria-busy="true"
      aria-label="Loading page"
    >
      <div className="rp-nav-progress h-full w-full origin-left bg-brand-600" />
    </div>
  );
}
