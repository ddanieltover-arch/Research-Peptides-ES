export type TawkVisitorContext = {
  name?: string | null;
  email?: string | null;
  orderId?: string | null;
  page?: string | null;
};

type TawkApi = {
  maximize?: () => void;
  minimize?: () => void;
  toggle?: () => void;
  hideWidget?: () => void;
  showWidget?: () => void;
  setAttributes?: (
    attributes: Record<string, string>,
    callback?: (error?: unknown) => void,
  ) => void;
  onLoad?: () => void;
  onChatMinimized?: () => void;
  visitor?: { name?: string; email?: string };
};

declare global {
  interface Window {
    Tawk_API?: TawkApi;
    Tawk_LoadStart?: Date;
    __rpTawkReady?: boolean;
    __rpTawkReadyQueue?: Array<() => void>;
    LiveChatWidget?: unknown;
    __lc?: unknown;
    $chatway?: unknown;
    smartsupp?: unknown;
    _smartsupp?: unknown;
  }
}

export const TAWK_PROPERTY_ID = '6ab356b484951a34442d6c2d';
export const TAWK_WIDGET_ID = '1k368lcau';
export const TAWK_EMBED_SRC = `https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}`;

const TAWK_SCRIPT_ID = 'tawk-to-embed';
const TAWK_CHECKOUT_KEY = 'rp_tawk_checkout';

function getApi(): TawkApi | undefined {
  return window.Tawk_API;
}

function isTawkReady(): boolean {
  return window.__rpTawkReady === true && typeof getApi()?.maximize === 'function';
}

function markTawkReady() {
  window.__rpTawkReady = true;
  const queue = window.__rpTawkReadyQueue || [];
  window.__rpTawkReadyQueue = [];
  queue.forEach((callback) => {
    try {
      callback();
    } catch {
      /* ignore */
    }
  });
}

function flushReadyQueue(callback: () => void) {
  if (isTawkReady()) {
    callback();
    return;
  }
  window.__rpTawkReadyQueue = window.__rpTawkReadyQueue || [];
  window.__rpTawkReadyQueue.push(callback);
}

export function removeLegacyLiveChat() {
  document.getElementById('livechat-inc')?.remove();
  document.getElementById('rp-livechat-loader')?.remove();
  document.getElementById('rp-livechat-brand-styles')?.remove();
  document.querySelectorAll('script[src*="cdn.livechatinc.com"]').forEach((el) => el.remove());
  document.getElementById('chat-widget-container')?.remove();
  delete window.LiveChatWidget;
  delete window.__lc;
}

export function ensureTawkScript() {
  if (typeof window === 'undefined') return;
  if (document.getElementById(TAWK_SCRIPT_ID)) return;
  if (document.querySelector(`script[src="${TAWK_EMBED_SRC}"]`)) return;

  window.Tawk_API = window.Tawk_API || {};
  window.Tawk_LoadStart = window.Tawk_LoadStart || new Date();

  const existingOnLoad = window.Tawk_API.onLoad;
  window.Tawk_API.onLoad = () => {
    markTawkReady();
    existingOnLoad?.();
  };

  const script = document.createElement('script');
  script.id = TAWK_SCRIPT_ID;
  script.async = true;
  script.src = TAWK_EMBED_SRC;
  script.charset = 'UTF-8';
  script.setAttribute('crossorigin', '*');
  const first = document.getElementsByTagName('script')[0];
  first?.parentNode?.insertBefore(script, first);
}

export function waitForTawk(timeoutMs = 12_000): Promise<TawkApi> {
  ensureTawkScript();

  if (isTawkReady()) {
    const api = getApi();
    if (api) return Promise.resolve(api);
  }

  return new Promise((resolve, reject) => {
    const startedAt = Date.now();
    let interval = 0;
    let timeout = 0;
    let settled = false;

    const finish = (ok: boolean) => {
      if (settled) return;
      settled = true;
      window.clearInterval(interval);
      window.clearTimeout(timeout);
      const api = getApi();
      if (ok && api) {
        markTawkReady();
        resolve(api);
        return;
      }
      reject(new Error('Tawk.to failed to load'));
    };

    const tryResolve = () => {
      const api = getApi();
      if (api && typeof api.maximize === 'function') {
        finish(true);
        return;
      }
      if (Date.now() - startedAt >= timeoutMs) finish(false);
    };

    flushReadyQueue(tryResolve);
    interval = window.setInterval(tryResolve, 200);
    timeout = window.setTimeout(() => finish(false), timeoutMs);
  });
}

export function hideTawkLauncher() {
  getApi()?.hideWidget?.();
}

export function showTawkWidget() {
  getApi()?.showWidget?.();
}

export async function openTawkPanel(): Promise<void> {
  const api = await waitForTawk();
  api.showWidget?.();
  api.maximize?.();
}

export function installTawkReadyHook(hideLauncher: boolean) {
  ensureTawkScript();
  const api = (window.Tawk_API = window.Tawk_API || {});

  const apply = () => {
    if (hideLauncher) hideTawkLauncher();
    markTawkReady();
  };

  const previousMinimized = api.onChatMinimized;
  api.onChatMinimized = () => {
    if (hideLauncher) hideTawkLauncher();
    previousMinimized?.();
  };

  const previousLoad = api.onLoad;
  api.onLoad = () => {
    apply();
    previousLoad?.();
  };

  if (typeof api.maximize === 'function') apply();
}

export function rememberCheckoutTawkContext(context: TawkVisitorContext) {
  try {
    sessionStorage.setItem(TAWK_CHECKOUT_KEY, JSON.stringify(context));
  } catch {
    /* ignore */
  }
}

export function readCheckoutTawkContext(): TawkVisitorContext | null {
  try {
    const raw = sessionStorage.getItem(TAWK_CHECKOUT_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as TawkVisitorContext;
  } catch {
    return null;
  }
}

export async function syncTawkVisitor(context: TawkVisitorContext) {
  const name = context.name?.trim();
  const email = context.email?.trim();
  const orderId = context.orderId?.trim();
  const page = context.page?.trim();
  if (!name && !email && !orderId && !page) return;

  try {
    const api = await waitForTawk();
    if (name || email) {
      api.visitor = {
        ...(name ? { name } : {}),
        ...(email ? { email } : {}),
      };
    }

    const attributes: Record<string, string> = {};
    if (name) attributes.name = name;
    if (email) attributes.email = email;
    if (orderId) attributes.orderId = orderId;
    if (page) attributes.page = page;

    if (Object.keys(attributes).length > 0) {
      api.setAttributes?.(attributes, () => undefined);
    }
  } catch (error) {
    console.warn('Tawk visitor sync failed:', error);
  }
}
