/**
 * Public env for Vite + Next.
 * Next only inlines *static* `process.env.NEXT_PUBLIC_*` member access — dynamic
 * `process.env[name]` is always undefined in the browser bundle.
 */
const STATIC_PUBLIC: Record<string, string | undefined> = {
  NEXT_PUBLIC_SUPABASE_URL:
    process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL,
  VITE_SUPABASE_URL:
    process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY:
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY,
  VITE_SUPABASE_ANON_KEY:
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_SITE_URL:
    process.env.NEXT_PUBLIC_SITE_URL || process.env.VITE_SITE_URL || process.env.SITE_URL,
  VITE_SITE_URL:
    process.env.NEXT_PUBLIC_SITE_URL || process.env.VITE_SITE_URL || process.env.SITE_URL,
  NEXT_PUBLIC_SUPPORT_EMAIL:
    process.env.NEXT_PUBLIC_SUPPORT_EMAIL || process.env.VITE_SUPPORT_EMAIL,
  VITE_SUPPORT_EMAIL:
    process.env.NEXT_PUBLIC_SUPPORT_EMAIL || process.env.VITE_SUPPORT_EMAIL,
  NEXT_PUBLIC_ADMIN_EMAILS:
    process.env.NEXT_PUBLIC_ADMIN_EMAILS || process.env.VITE_ADMIN_EMAILS,
  VITE_ADMIN_EMAILS:
    process.env.NEXT_PUBLIC_ADMIN_EMAILS || process.env.VITE_ADMIN_EMAILS,
  NEXT_PUBLIC_LIVECHAT_MOBILE_OFFSET_Y:
    process.env.NEXT_PUBLIC_LIVECHAT_MOBILE_OFFSET_Y ||
    process.env.VITE_LIVECHAT_MOBILE_OFFSET_Y,
  VITE_LIVECHAT_MOBILE_OFFSET_Y:
    process.env.NEXT_PUBLIC_LIVECHAT_MOBILE_OFFSET_Y ||
    process.env.VITE_LIVECHAT_MOBILE_OFFSET_Y,
};

export function publicEnv(name: string, fallback = ''): string {
  return STATIC_PUBLIC[name] || fallback;
}
