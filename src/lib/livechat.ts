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
  init?: () => void;
};

declare global {
  interface Window {
    LiveChatWidget?: LiveChatWidgetApi;
    __rpLiveChatReady?: boolean;
    __rpLiveChatReadyQueue?: Array<() => void>;
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

const LIVECHAT_STYLE_ID = 'rp-livechat-brand-styles';
const LIVECHAT_CHECKOUT_KEY = 'rp_livechat_checkout';

function getWidget(): LiveChatWidgetApi | undefined {
  return window.LiveChatWidget;
}

function isLiveChatReady(): boolean {
  return window.__rpLiveChatReady === true && typeof getWidget()?.call === 'function';
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
  if (isLiveChatReady()) {
    const widget = getWidget();
    if (widget) return Promise.resolve(widget);
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
        resolve(widget);
        return;
      }
      reject(new Error('LiveChat failed to load'));
    };

    const tryResolve = () => {
      const widget = getWidget();
      if (window.__rpLiveChatReady && widget) {
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
  const widget = await waitForLiveChat();
  widget.call('maximize');
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
  const widget = getWidget();
  if (!widget || typeof widget.on !== 'function') return;

  const onReady = () => {
    setupLiveChatBranding(mobileOffset);
    window.__rpLiveChatReady = true;
    window.__rpLiveChatReadyQueue?.forEach((callback) => {
      try {
        callback();
      } catch {
        /* ignore */
      }
    });
    window.__rpLiveChatReadyQueue = [];
  };

  const onVisibilityChanged = (data: unknown) => {
    const visibility = (data as { visibility?: string } | undefined)?.visibility;
    if (visibility === 'minimized' || visibility === 'hidden') {
      keepLauncherHidden();
    }
  };

  widget.on('ready', onReady);
  widget.on('visibility_changed', onVisibilityChanged);

  if (window.__rpLiveChatReady) {
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
