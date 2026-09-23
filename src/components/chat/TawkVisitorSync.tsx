import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '../../store/useAuthStore';
import {
  hideTawkLauncher,
  installTawkReadyHook,
  readCheckoutTawkContext,
  removeLegacyLiveChat,
  syncTawkVisitor,
} from '../../lib/tawk';

function resolveVisitorName(
  displayName: string | null | undefined,
  email: string | null | undefined,
) {
  const trimmed = displayName?.trim();
  if (trimmed) return trimmed;
  const mail = email?.trim();
  if (!mail) return undefined;
  return mail.split('@')[0];
}

export default function TawkVisitorSync() {
  const pathname = usePathname() || '/';
  const { user, profile } = useAuthStore();

  useEffect(() => {
    removeLegacyLiveChat();
    const hideWidget =
      pathname.includes('/admin') || /\/(cart|checkout)(\/|$)/.test(pathname);
    if (hideWidget) hideTawkLauncher();
    else installTawkReadyHook(true);

    const checkoutContext = readCheckoutTawkContext();
    const email = profile?.email || user?.email || checkoutContext?.email;
    const name =
      resolveVisitorName(profile?.display_name, email) ||
      resolveVisitorName(checkoutContext?.name, email);

    void syncTawkVisitor({
      name,
      email,
      orderId: checkoutContext?.orderId,
      page: pathname,
    });
  }, [user, profile, pathname]);

  return null;
}
