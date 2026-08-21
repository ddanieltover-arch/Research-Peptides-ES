import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '../../store/useAuthStore';
import {
  readCheckoutLiveChatContext,
  syncLiveChatVisitor,
} from '../../lib/livechat';

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

export default function LiveChatVisitorSync() {
  const pathname = usePathname() || '/';
  const { user, profile } = useAuthStore();

  useEffect(() => {
    const checkoutContext = readCheckoutLiveChatContext();
    const email = profile?.email || user?.email || checkoutContext?.email;
    const name =
      resolveVisitorName(profile?.display_name, email) ||
      resolveVisitorName(checkoutContext?.name, email);

    void syncLiveChatVisitor({
      name,
      email,
      orderId: checkoutContext?.orderId,
      page: pathname,
    });
  }, [user, profile, pathname]);

  return null;
}
