export type LiveChatVisitorContext = {
  name?: string | null;
  email?: string | null;
  orderId?: string | null;
  page?: string | null;
};

type LiveChatWidgetApi = {
  call: (method: string, ...args: unknown[]) => void;
  on: (event: string, callback: (...args: unknown[]) => void) => void;
  off: (event: string, callback: (...args: unknown[]) => void) => void;
  get?: (method: string) => unknown;
  init?: () => void;
  _h?: unknown;
};

declare global {
  interface Window {
    __lc?: {
      license?: number;
      integration_name?: string;
      product_name?: string;
      asyncInit?: boolean;
    };
    LiveChatWidget?: LiveChatWidgetApi;
    __rpLiveChatReady?: boolean;
    __rpLiveChatReadyQueue?: Array<() => void>;
    __rpLiveChatHookInstalled?: boolean;
    $chatway?: unknown;
    $chatwayOnLoad?: () => void;
    __rpChatwayReady?: boolean;
    __rpChatwayReadyQueue?: Array<() => void>;
    Tawk_API?: unknown;
    __tawkLoaded?: boolean;
    smartsupp?: unknown;
    _smartsupp?: unknown;
    __smartsuppLoaded?: boolean;
  }
}

const LIVECHAT_LICENSE = 19857205;
const LIVECHAT_STYLE_ID = 'rp-livechat-brand-styles';
const LIVECHAT_CHECKOUT_KEY = 'rp_livechat_checkout';
const LIVECHAT_LOADER_ID = 'rp-livechat-loader';

function getWidget(): LiveChatWidgetApi | undefined {
  return window.LiveChatWidget;
}

/** True once LiveChat's tracking.js has hydrated the stub (`_h` set). */
function isWidgetHydrated(widget: LiveChatWidgetApi | undefined = getWidget()): boolean {
  return Boolean(widget && typeof widget.call === 'function' && widget._h);
}

function isLiveChatReady(): boolean {
  return (
    (window.__rpLiveChatReady === true || isWidgetHydrated()) &&
    typeof getWidget()?.call === 'function'
  );
}

function markLiveChatReady() {
  window.__rpLiveChatReady = true;
  const queue = window.__rpLiveChatReadyQueue || [];
  window.__rpLiveChatReadyQueue = [];
  queue.forEach((callback) => {
    try {
      callback();
    } catch {
      /* ignore */
    }
  });
}

/**
 * Inject LiveChat bootstrap if missing (Next layout should load it; this is a
 * client-side fallback for Vite / late mounts).
 */
export function ensureLiveChatScript() {
  if (typeof window === 'undefined') return;
  if (getWidget()) return;
  if (document.getElementById(LIVECHAT_LOADER_ID)) return;
  // Prefer the root-layout Script when it is already in the document.
  if (document.getElementById('livechat-inc')) return;
  if (document.querySelector('script[src*="cdn.livechatinc.com/tracking.js"]')) return;

  window.__lc = window.__lc || {};
  window.__lc.license = LIVECHAT_LICENSE;
  window.__lc.integration_name = 'manual_onboarding';
  window.__lc.product_name = 'livechat';

  const bootstrap = document.createElement('script');
  bootstrap.id = LIVECHAT_LOADER_ID;
  bootstrap.textContent = `
    (function(n,t,c){function i(n){return e._h?e._h.apply(null,n):e._q.push(n)}var e={_q:[],_h:null,_v:"2.0",on:function(){i(["on",c.call(arguments)])},once:function(){i(["once",c.call(arguments)])},off:function(){i(["off",c.call(arguments)])},get:function(){if(!e._h)throw new Error("[LiveChatWidget] You can't use getters before load.");return i(["get",c.call(arguments)])},call:function(){i(["call",c.call(arguments)])},init:function(){var n=t.createElement("script");n.async=!0,n.type="text/javascript",n.src="https://cdn.livechatinc.com/tracking.js",t.head.appendChild(n)}};!n.__lc.asyncInit&&e.init(),n.LiveChatWidget=n.LiveChatWidget||e}(window,document,[].slice));
  `;
  document.head.appendChild(bootstrap);
}

export function onLiveChatReady(callback: () => void) {
  if (isLiveChatReady()) {
    callback();
    return;
  }

  window.__rpLiveChatReadyQueue = window.__rpLiveChatReadyQueue || [];
  window.__rpLiveChatReadyQueue.push(callback);
}

export function waitForLiveChat(timeoutMs = 15_000): Promise<LiveChatWidgetApi> {
  ensureLiveChatScript();

  if (isLiveChatReady()) {
    const widget = getWidget();
    if (widget) {
      markLiveChatReady();
      return Promise.resolve(widget);
    }
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
      const widget = getWidget();
      if (ok && widget) {
        markLiveChatReady();
        resolve(widget);
        return;
      }
      reject(new Error('LiveChat failed to load'));
    };

    const tryResolve = () => {
      const widget = getWidget();
      if (widget && (window.__rpLiveChatReady || isWidgetHydrated(widget))) {
        finish(true);
        return;
      }
      if (Date.now() - startedAt >= timeoutMs) {
        finish(false);
      }
    };

    onLiveChatReady(tryResolve);
    interval = window.setInterval(tryResolve, 200);
    timeout = window.setTimeout(() => finish(false), timeoutMs);
  });
}

export async function openLiveChatPanel(): Promise<void> {
  ensureLiveChatScript();

  let widget = getWidget();
  if (!widget || typeof widget.call !== 'function') {
    // Layout Script may still be evaluating — wait for the stub.
    widget = await new Promise<LiveChatWidgetApi>((resolve, reject) => {
      const startedAt = Date.now();
      const interval = window.setInterval(() => {
        ensureLiveChatScript();
        const current = getWidget();
        if (current && typeof current.call === 'function') {
          window.clearInterval(interval);
          resolve(current);
          return;
        }
        if (Date.now() - startedAt >= 10_000) {
          window.clearInterval(interval);
          reject(new Error('LiveChat failed to load'));
        }
      }, 100);
    });
  }

  // Stub queues `maximize` until tracking.js hydrates; no need to block on ready.
  widget.call('maximize');
  if (isWidgetHydrated(widget)) {
    markLiveChatReady();
  }
}

export function hideLiveChatLauncher() {
  getWidget()?.call('hide');
}

export function injectLiveChatBrandStyles(mobileOffset: number) {
  if (document.getElementById(LIVECHAT_STYLE_ID)) return;

  const style = document.createElement('style');
  style.id = LIVECHAT_STYLE_ID;
  style.textContent = `
    .rp-live-chat-trigger {
      pointer-events: auto !important;
    }

    #chat-widget-container {
      left: 1rem !important;
      right: auto !important;
    }

    @media (max-width: 768px) {
      #chat-widget-container {
        bottom: ${mobileOffset}px !important;
      }
    }
  `;
  document.head.appendChild(style);
}

function keepLauncherHidden() {
  hideLiveChatLauncher();
}

export function setupLiveChatBranding(mobileOffset: number) {
  injectLiveChatBrandStyles(mobileOffset);
  keepLauncherHidden();
}

export function installLiveChatReadyHook(mobileOffset: number) {
  ensureLiveChatScript();

  const widget = getWidget();
  if (!widget || typeof widget.on !== 'function') {
    // Stub not present yet — retry shortly after ensure injects.
    window.setTimeout(() => installLiveChatReadyHook(mobileOffset), 250);
    return;
  }

  if (window.__rpLiveChatHookInstalled) {
    if (isWidgetHydrated(widget)) {
      setupLiveChatBranding(mobileOffset);
      markLiveChatReady();
    }
    return;
  }
  window.__rpLiveChatHookInstalled = true;

  const onReady = () => {
    setupLiveChatBranding(mobileOffset);
    markLiveChatReady();
  };

  const onVisibilityChanged = (data: unknown) => {
    const visibility = (data as { visibility?: string } | undefined)?.visibility;
    if (visibility === 'minimized' || visibility === 'hidden') {
      keepLauncherHidden();
    }
  };

  widget.on('ready', onReady);
  widget.on('visibility_changed', onVisibilityChanged);

  // If `ready` already fired before we subscribed, recover via hydration check.
  if (window.__rpLiveChatReady || isWidgetHydrated(widget)) {
    onReady();
  }
}

export function rememberCheckoutLiveChatContext(context: LiveChatVisitorContext) {
  try {
    sessionStorage.setItem(LIVECHAT_CHECKOUT_KEY, JSON.stringify(context));
  } catch {
    /* ignore */
  }
}

export function readCheckoutLiveChatContext(): LiveChatVisitorContext | null {
  try {
    const raw = sessionStorage.getItem(LIVECHAT_CHECKOUT_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as LiveChatVisitorContext;
  } catch {
    return null;
  }
}

export async function syncLiveChatVisitor(context: LiveChatVisitorContext) {
  const name = context.name?.trim();
  const email = context.email?.trim();
  const orderId = context.orderId?.trim();
  const page = context.page?.trim();

  const hasData = Boolean(name || email || orderId || page);
  if (!hasData) return;

  try {
    const widget = await waitForLiveChat();

    if (name) widget.call('set_customer_name', name);
    if (email) widget.call('set_customer_email', email);

    const sessionVars: Record<string, string> = {};
    if (orderId) sessionVars.order_id = orderId;
    if (page) sessionVars.page = page;

    if (Object.keys(sessionVars).length > 0) {
      widget.call('update_session_variables', sessionVars);
    }
  } catch (error) {
    console.warn('LiveChat visitor sync failed:', error);
  }
}
