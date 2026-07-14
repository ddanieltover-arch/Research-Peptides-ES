export type ChatwayVisitorContext = {
  name?: string | null;
  email?: string | null;
  orderId?: string | null;
  page?: string | null;
};

type ChatwayApi = {
  hideChatwayIcon?: () => void;
  showChatwayIcon?: () => void;
  openChatwayWidget?: () => void;
  closeChatwayWidget?: () => void;
  updateChatwayCustomData?: (field: string, value: string) => void;
  removeChatwayCustomData?: (field: string) => void;
};

declare global {
  interface Window {
    $chatway?: ChatwayApi;
    $chatwayOnLoad?: () => void;
    __rpChatwayReady?: boolean;
    __rpChatwayReadyQueue?: Array<() => void>;
  }
}

const CHATWAY_STYLE_ID = 'rp-chatway-brand-styles';
const CHATWAY_CHECKOUT_KEY = 'rp_chatway_checkout';

function isChatwayReady(): boolean {
  return typeof window.$chatway?.openChatwayWidget === 'function';
}

export function onChatwayReady(callback: () => void) {
  if (isChatwayReady()) {
    callback();
    return;
  }

  window.__rpChatwayReadyQueue = window.__rpChatwayReadyQueue || [];
  window.__rpChatwayReadyQueue.push(callback);
}

export function waitForChatway(timeoutMs = 15_000): Promise<ChatwayApi> {
  if (isChatwayReady() && window.$chatway) {
    return Promise.resolve(window.$chatway);
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
      if (ok && window.$chatway) {
        resolve(window.$chatway);
        return;
      }
      reject(new Error('Chatway failed to load'));
    };

    const tryResolve = () => {
      if (isChatwayReady() && window.$chatway) {
        finish(true);
        return;
      }
      if (Date.now() - startedAt >= timeoutMs) {
        finish(false);
      }
    };

    onChatwayReady(tryResolve);

    interval = window.setInterval(tryResolve, 200);
    timeout = window.setTimeout(() => finish(false), timeoutMs);
  });
}

export async function openChatwayPanel(): Promise<void> {
  const chatway = await waitForChatway();
  chatway.openChatwayWidget?.();
}

export function hideChatwayLauncher() {
  // We hide the launcher entirely via CSS (.chatway--trigger-container { display: none }),
  // so we don't need to call $chatway.hideChatwayIcon(), which actually hides the ENTIRE widget!
}

function applyChatwayBrandLayout(mobileOffset: number) {
  const container = document.querySelector('.chatway--container');
  if (!container) return false;

  container.classList.add('widget--left');
  (container as HTMLElement).style.setProperty('--quick-reply-left', '1rem');
  (container as HTMLElement).style.setProperty('--quick-reply-right', 'unset');
  (container as HTMLElement).style.setProperty('--frame-bottom-mobile', `${mobileOffset}px`);
  
  return true;
}

export function injectChatwayBrandStyles(mobileOffset: number) {
  if (document.getElementById(CHATWAY_STYLE_ID)) return;

  const style = document.createElement('style');
  style.id = CHATWAY_STYLE_ID;
  style.textContent = `
    .rp-live-chat-trigger {
      pointer-events: auto !important;
    }

    /* Container must not block our custom launcher in the bottom-left corner */
    .chatway--container {
      pointer-events: none !important;
    }

    .chatway--container .chatway--frame-container,
    .chatway--container .chatway--quick--reply--container,
    .chatway--container .chatway--preview-container,
    .chatway--container .chatway--preview--only--container {
      pointer-events: auto !important;
    }

    .chatway--container .chatway--trigger-container {
      display: none !important;
      visibility: hidden !important;
      pointer-events: none !important;
    }

    .chatway--container.widget--left .chatway--frame-container,
    .chatway--container.widget--left .chatway--quick--reply--container,
    .chatway--container.widget--left .chatway--preview--only--container {
      left: 1rem !important;
      right: auto !important;
      transform-origin: left bottom !important;
    }

    .chatway--container.widget--left .chatway--preview-container {
      left: 0 !important;
      right: auto !important;
      transform-origin: left bottom !important;
    }

    @media (max-width: 768px) {
      .chatway--container.widget--left .chatway--frame-container.chatway--no-mobile-fullscreen {
        bottom: ${mobileOffset}px !important;
        left: 1rem !important;
        right: auto !important;
      }
    }
  `;
  document.head.appendChild(style);
}

export function setupChatwayBranding(mobileOffset: number) {
  injectChatwayBrandStyles(mobileOffset);
  // We no longer call hideChatwayLauncher() here because it hides the entire widget.
  // The trigger is hidden via CSS in injectChatwayBrandStyles.
  return applyChatwayBrandLayout(mobileOffset);
}

export function installChatwayReadyHook(mobileOffset: number) {
  const previousOnLoad = window.$chatwayOnLoad;
  window.$chatwayOnLoad = function onChatwayLoad() {
    previousOnLoad?.();
    setupChatwayBranding(mobileOffset);
    window.__rpChatwayReady = true;
    window.__rpChatwayReadyQueue?.forEach((callback) => {
      try {
        callback();
      } catch {
        /* ignore */
      }
    });
    window.__rpChatwayReadyQueue = [];
  };

  if (isChatwayReady()) {
    window.$chatwayOnLoad?.();
  }
}

export function rememberCheckoutChatwayContext(context: ChatwayVisitorContext) {
  try {
    sessionStorage.setItem(CHATWAY_CHECKOUT_KEY, JSON.stringify(context));
  } catch {
    /* ignore */
  }
}

export function readCheckoutChatwayContext(): ChatwayVisitorContext | null {
  try {
    const raw = sessionStorage.getItem(CHATWAY_CHECKOUT_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ChatwayVisitorContext;
  } catch {
    return null;
  }
}

export async function syncChatwayVisitor(context: ChatwayVisitorContext) {
  const fields: Array<[string, string | null | undefined]> = [
    ['name', context.name],
    ['email', context.email],
    ['order_id', context.orderId],
    ['page', context.page],
  ];

  const hasData = fields.some(([, value]) => Boolean(value?.trim()));
  if (!hasData) return;

  try {
    const chatway = await waitForChatway();
    const update = chatway.updateChatwayCustomData;
    if (typeof update !== 'function') return;

    for (const [field, value] of fields) {
      const trimmed = value?.trim();
      if (trimmed) {
        update.call(chatway, field, trimmed);
      }
    }
  } catch (error) {
    console.warn('Chatway visitor sync failed:', error);
  }
}
