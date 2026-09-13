'use client';

import { useSyncExternalStore } from 'react';

type NavState = {
  pending: boolean;
  href: string | null;
  fromPath: string | null;
};

let state: NavState = { pending: false, href: null, fromPath: null };
let watchdogTimer = 0;
const listeners = new Set<() => void>();

const HARD_FALLBACK_MS = 900;

function emit() {
  listeners.forEach((listener) => listener());
}

function setState(next: NavState) {
  state = next;
  emit();
}

function targetPathname(href: string): string {
  try {
    if (href.startsWith('http')) return new URL(href).pathname;
    return href.split('?')[0] || '/';
  } catch {
    return href.split('?')[0] || '/';
  }
}

function pathMatches(current: string, target: string): boolean {
  if (current === target) return true;
  if (target !== '/' && current.startsWith(`${target}/`)) return true;
  return false;
}

/** Start pending UI + hard-navigation watchdog if soft nav stalls. */
export function beginClientNavigation(href: string, fromPath: string) {
  const target = targetPathname(href);
  if (pathMatches(fromPath, target)) return;

  if (watchdogTimer) window.clearTimeout(watchdogTimer);

  setState({ pending: true, href, fromPath });

  watchdogTimer = window.setTimeout(() => {
    const stillHere =
      typeof window !== 'undefined' &&
      (window.location.pathname === fromPath ||
        !pathMatches(window.location.pathname, target));

    if (stillHere) {
      // Soft App Router transition stalled — force a real navigation.
      window.location.assign(href);
      return;
    }
    setState({ pending: false, href: null, fromPath: null });
  }, HARD_FALLBACK_MS);
}

/** Clear pending state once the destination route is active. */
export function clearClientNavigation(currentPath: string) {
  if (!state.pending || !state.href) return;
  const target = targetPathname(state.href);
  if (!pathMatches(currentPath, target)) return;

  if (watchdogTimer) {
    window.clearTimeout(watchdogTimer);
    watchdogTimer = 0;
  }
  setState({ pending: false, href: null, fromPath: null });
}

export function cancelClientNavigation() {
  if (watchdogTimer) {
    window.clearTimeout(watchdogTimer);
    watchdogTimer = 0;
  }
  setState({ pending: false, href: null, fromPath: null });
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): NavState {
  return state;
}

function getServerSnapshot(): NavState {
  return { pending: false, href: null, fromPath: null };
}

export function useClientNavigationState(): NavState {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * Navigate immediately. Soft App Router transitions have been stalling site-wide
 * (especially under the locale layout), so we use a real browser navigation.
 * Pending UI still shows until unload; cart/auth survive via persist + cookies.
 */
export function navigateClient(
  _router: { push: (href: string) => void; replace: (href: string) => void },
  href: string,
  fromPath: string,
  options?: { replace?: boolean },
) {
  const target = targetPathname(href);
  if (pathMatches(fromPath, target)) return;

  beginClientNavigation(href, fromPath);

  if (options?.replace) window.location.replace(href);
  else window.location.assign(href);
}
