import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { accentColors } from '../../design-system/tokens';
import {
  hideChatwayLauncher,
  installChatwayReadyHook,
  openChatwayPanel,
  setupChatwayBranding,
} from '../../lib/chatway';

function removeLegacyChatScripts() {
  document.getElementById('tawk-loader')?.remove();
  document.getElementById('smartsupp-loader')?.remove();
  document.getElementById('smartsupp-hide-default-bubble')?.remove();
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

/**
 * Chatway live chat with Iberian Lab branded trigger (bottom-left, garnet + gold).
 * Widget script loads from index.html; this component handles branding and open actions.
 */
export default function ChatwayChat() {
  const location = useLocation();
  const isAdmin = location.pathname.includes('/admin');
  const [isOpening, setIsOpening] = useState(false);
  const mobileOffset =
    Number(import.meta.env.VITE_CHATWAY_MOBILE_OFFSET_Y as string | undefined) || 96;

  useEffect(() => {
    removeLegacyChatScripts();
    installChatwayReadyHook(mobileOffset);
    setupChatwayBranding(mobileOffset);

    const observer = new MutationObserver(() => {
      setupChatwayBranding(mobileOffset);
    });
    observer.observe(document.body, { childList: true, subtree: true });

    const poll = window.setInterval(() => {
      hideChatwayLauncher();
    }, 500);
    const stopPoll = window.setTimeout(() => window.clearInterval(poll), 20_000);

    return () => {
      observer.disconnect();
      window.clearInterval(poll);
      window.clearTimeout(stopPoll);
    };
  }, [mobileOffset]);

  const openChat = async () => {
    if (isOpening) return;
    setIsOpening(true);
    try {
      await openChatwayPanel();
    } catch (error) {
      console.warn('Chatway open failed:', error);
    } finally {
      setIsOpening(false);
    }
  };

  if (isAdmin) return null;

  return (
    <button
      type="button"
      onClick={() => void openChat()}
      disabled={isOpening}
      className="rp-live-chat-trigger fixed bottom-24 md:bottom-8 left-4 md:left-8 z-[200] bg-brand-500 hover:bg-brand-600 text-white rounded-full p-4 shadow-glow transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center group ring-4 ring-accent-500/20 disabled:opacity-80"
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
