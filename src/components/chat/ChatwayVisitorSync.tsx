import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import {
  readCheckoutChatwayContext,
  syncChatwayVisitor,
} from '../../lib/chatway';

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

export default function ChatwayVisitorSync() {
  const location = useLocation();
  const { user, profile } = useAuthStore();

  useEffect(() => {
    const checkoutContext = readCheckoutChatwayContext();
    const email = profile?.email || user?.email || checkoutContext?.email;
    const name =
      resolveVisitorName(profile?.display_name, email) ||
      resolveVisitorName(checkoutContext?.name, email);

    void syncChatwayVisitor({
      name,
      email,
      orderId: checkoutContext?.orderId,
      page: location.pathname,
    });
  }, [user, profile, location.pathname]);

  return null;
}
