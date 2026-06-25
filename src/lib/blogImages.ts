/** Known-dead remote URLs → working replacements (keeps existing DB rows working). */
const BROKEN_URL_REPLACEMENTS: Record<string, string> = {
  'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&q=80&w=2940':
    'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b':
    'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&q=80&w=1200',
};

export const DEFAULT_BLOG_COVER =
  'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&q=80&w=1200';

export function resolveBlogImageUrl(imageUrl?: string | null): string | null {
  if (!imageUrl?.trim()) return null;
  const trimmed = imageUrl.trim();
  return BROKEN_URL_REPLACEMENTS[trimmed] ?? trimmed;
}
