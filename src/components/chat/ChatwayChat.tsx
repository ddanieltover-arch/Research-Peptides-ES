import { useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { accentColors } from '../../design-system/tokens';

declare global {
  interface Window {
    $chatway?: {
      hideChatwayIcon?: () => void;
      showChatwayIcon?: () => void;
      openChatwayWidget?: () => void;
      closeChatwayWidget?: () => void;
    };
    $chatwayOnLoad?: () => void;
    Tawk_API?: unknown;
    __tawkLoaded?: boolean;
    _smartsupp?: Record<string, unknown>;
    smartsupp?: ((...args: unknown[]) => void) & { _: unknown[] };
    __smartsuppLoaded?: boolean;
  }
}

const CHATWAY_STYLE_ID = 'rp-chatway-brand-styles';
const LEGACY_SMARTSUPP_STYLE_ID = 'smartsupp-hide-default-bubble';
const DEFAULT_CHATWAY_WIDGET_ID = 'Mh7Ql3P38I3w';

function getChatwayWidgetId(): string {
  const id = (import.meta.env.VITE_CHATWAY_WIDGET_ID as string | undefined)?.trim();
  return id || DEFAULT_CHATWAY_WIDGET_ID;
}

function removeLegacyChatScripts() {
  document.getElementById('tawk-loader')?.remove();
  document.getElementById('smartsupp-loader')?.remove();
  document.getElementById(LEGACY_SMARTSUPP_STYLE_ID)?.remove();
  document.querySelectorAll('script[src*="smartsuppchat.com"], script[src*="embed.tawk.to"]').forEach((el) => {
    el.remove();
  });
  document.getElementById('smartsupp-widget-container')?.remove();
  delete window.Tawk_API;
  delete window.__tawkLoaded;
  delete window.smartsupp;
  delete window._smartsupp;
  delete window.__smartsuppLoaded;
}

function hideChatwayLauncher() {
  try {
    window.$chatway?.hideChatwayIcon?.();
  } catch {
    /* ignore */
  }
}

function applyChatwayBrandLayout(mobileOffset: number) {
  const container = document.querySelector('.chatway--container');
  if (!container) return;

  container.classList.add('widget--left');
  (container as HTMLElement).style.setProperty('--quick-reply-left', '1rem');
  (container as HTMLElement).style.setProperty('--quick-reply-right', 'unset');
}

function injectChatwayBrandStyles(mobileOffset: number) {
  if (document.getElementById(CHATWAY_STYLE_ID)) return;

  const style = document.createElement('style');
  style.id = CHATWAY_STYLE_ID;
  style.textContent = `
    /* Hide Chatway default launcher — branded trigger is .rp-live-chat-trigger */
    .chatway--container .chatway--trigger-container {
      display: none !important;
      visibility: hidden !important;
      pointer-events: none !important;
    }

    /* Bottom-left panel alignment (garnet brand) */
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

/**
 * Chatway live chat with Iberian Lab branded trigger (bottom-left, garnet + gold).
 * Set widget color to #A91D3A in the Chatway dashboard for matching panel chrome.
 */
export default function ChatwayChat() {
  const widgetId = getChatwayWidgetId();
  const mobileOffset =
    Number(import.meta.env.VITE_CHATWAY_MOBILE_OFFSET_Y as string | undefined) || 96;

  useEffect(() => {
    removeLegacyChatScripts();

    injectChatwayBrandStyles(mobileOffset);

    const previousOnLoad = window.$chatwayOnLoad;
    window.$chatwayOnLoad = function onChatwayLoad() {
      previousOnLoad?.();
      hideChatwayLauncher();
      applyChatwayBrandLayout(mobileOffset);
    };

    if (!document.getElementById('chatway')) {
      const script = document.createElement('script');
      script.id = 'chatway';
      script.async = true;
      script.src = `https://cdn.chatway.app/widget.js?id=${encodeURIComponent(widgetId)}`;
      document.head.appendChild(script);
    } else {
      hideChatwayLauncher();
      applyChatwayBrandLayout(mobileOffset);
    }

    hideChatwayLauncher();

    const observer = new MutationObserver(() => {
      hideChatwayLauncher();
      applyChatwayBrandLayout(mobileOffset);
    });
    observer.observe(document.body, { childList: true, subtree: true });

    const poll = window.setInterval(() => {
      hideChatwayLauncher();
      applyChatwayBrandLayout(mobileOffset);
    }, 400);
    const stopPoll = window.setTimeout(() => window.clearInterval(poll), 12_000);

    return () => {
      observer.disconnect();
      window.clearInterval(poll);
      window.clearTimeout(stopPoll);
    };
  }, [widgetId, mobileOffset]);

  const openChat = () => {
    try {
      window.$chatway?.openChatwayWidget?.();
    } catch (err) {
      console.warn('Chatway open failed:', err);
    }
  };

  return (
    <button
      type="button"
      onClick={openChat}
      className="rp-live-chat-trigger fixed bottom-24 md:bottom-8 left-4 md:left-8 z-[100] bg-brand-500 hover:bg-brand-600 text-white rounded-full p-4 shadow-glow transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center group ring-4 ring-accent-500/20"
      aria-label="Open live chat"
      title="Open live chat"
      style={{
        boxShadow: `0 0 48px ${accentColors[500]}38, 0 4px 24px rgba(15, 8, 10, 0.12)`,
      }}
    >
      <MessageCircle className="h-6 w-6 transition-transform group-hover:rotate-12" aria-hidden />
      <span className="sr-only">Live Chat</span>
      <span
        className="absolute top-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white animate-pulse"
        style={{ backgroundColor: accentColors[500] }}
        aria-hidden
      />
    </button>
  );
}
