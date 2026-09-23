'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { isAdminPath } from '../../i18n/routing';
import { MessageCircle } from 'lucide-react';
import {
  ensureTawkScript,
  hideTawkLauncher,
  installTawkReadyHook,
  openTawkPanel,
  removeLegacyLiveChat,
} from '../../lib/tawk';

/**
 * Branded Tawk.to trigger. Native Tawk bubble stays hidden; this button opens the widget.
 */
export default function TawkChat() {
  const pathname = usePathname() || '/';
  const isAdmin = isAdminPath(pathname);
  const [isOpening, setIsOpening] = useState(false);

  useEffect(() => {
    removeLegacyLiveChat();
    if (isAdmin) {
      hideTawkLauncher();
      return;
    }
    ensureTawkScript();
    installTawkReadyHook(true);
    return () => hideTawkLauncher();
  }, [isAdmin]);

  const openChat = async () => {
    if (isOpening) return;
    setIsOpening(true);
    try {
      await openTawkPanel();
    } catch (error) {
      console.warn('Tawk.to open failed:', error);
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
      className="rp-live-chat-trigger fixed bottom-24 md:bottom-8 right-4 md:right-8 z-[200] bg-brand-600 hover:bg-brand-500 text-white rounded-full p-4 transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center group ring-4 ring-brand-500/20 disabled:opacity-80 shadow-elevated"
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
