import { supabase } from '../supabase';
import { isConfiguredAdminEmail } from '../store/useAuthStore';

function isSafeInternalRedirect(path: string | null | undefined): path is string {
  if (!path) return false;
  if (!path.startsWith('/') || path.startsWith('//')) return false;
  return true;
}

async function fetchUserRole(userId: string): Promise<'admin' | 'customer' | null> {
  const { data, error } = await supabase
    .from('users')
    .select('role')
    .eq('id', userId)
    .maybeSingle();

  if (error) {
    console.error('Failed to resolve user role for post-login redirect:', error);
    return null;
  }

  return data?.role === 'admin' ? 'admin' : data?.role === 'customer' ? 'customer' : null;
}

/** Where to send the user after a successful sign-in. */
export async function resolvePostLoginPath(
  userId: string,
  email: string | null | undefined,
  redirectParam?: string | null,
  knownRole?: 'admin' | 'customer' | null,
): Promise<string> {
  if (isSafeInternalRedirect(redirectParam)) {
    return redirectParam;
  }

  const role = knownRole ?? (await fetchUserRole(userId));
  if (role === 'admin' || isConfiguredAdminEmail(email)) {
    return '/admin';
  }

  return '/profile';
}
