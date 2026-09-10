'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { MessageCircle } from 'lucide-react';
import { publicEnv } from '../../lib/publicEnv';
import {
  installLiveChatReadyHook,
  openLiveChatPanel,
  setupLiveChatBranding,
} from '../../lib/livechat';

function removeLegacyChatScripts() {
  document.getElementById('chatway')?.remove();
  document.getElementById('tawk-loader')?.remove();
  document.getElementById('smartsupp-loader')?.remove();
  document.getElementById('smartsupp-hide-default-bubble')?.remove();
  document.querySelectorAll(
    'script[src*="smartsuppchat.com"], script[src*="embed.tawk.to"], script[src*="cdn.chatway.app"]',
  ).forEach((el) => {
    el.remove();
  });
  document.getElementById('smartsupp-widget-container')?.remove();
  delete window.$chatway;
  delete window.$chatwayOnLoad;
  delete window.__rpChatwayReady;
  delete window.__rpChatwayReadyQueue;
  delete window.Tawk_API;
  delete window.__tawkLoaded;
  delete window.smartsupp;
  delete window._smartsupp;
  delete window.__smartsuppLoaded;
}

/**
 * LiveChat with clinical brand trigger (bottom-left, crimson).
 * Widget script loads from index.html; this component handles branding and open actions.
 */
export default function LiveChatChat() {
  const pathname = usePathname() || '/';
  const isAdmin = pathname.includes('/admin');
  const [isOpening, setIsOpening] = useState(false);
  const mobileOffset = Number(publicEnv('VITE_LIVECHAT_MOBILE_OFFSET_Y')) || 96;

  useEffect(() => {
    removeLegacyChatScripts();
    installLiveChatReadyHook(mobileOffset);
    setupLiveChatBranding(mobileOffset);
  }, [mobileOffset]);

  const openChat = async () => {
    if (isOpening) return;
    setIsOpening(true);
    try {
      await openLiveChatPanel();
    } catch (error) {
      console.warn('LiveChat open failed:', error);
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
      className="rp-live-chat-trigger fixed bottom-24 md:bottom-8 left-4 md:left-8 z-[200] bg-brand-600 hover:bg-brand-500 text-white rounded-full p-4 transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center group ring-4 ring-brand-500/20 disabled:opacity-80 shadow-elevated"
      aria-label="Open live chat"
      title="Open live chat"
    >
      <MessageCircle
        className="h-6 w-6 text-white transition-transform group-hover:rotate-12"
        strokeWidth={2.25}
        aria-hidden
      />
      <span className="sr-only">Live Chat</span>
      <span
        className="absolute top-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white animate-pulse bg-emerald-500"
        aria-hidden
      />
    </button>
  );
}
