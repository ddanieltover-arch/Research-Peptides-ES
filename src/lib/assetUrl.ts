/** Next.js static imports are `{ src, width, height }`; Vite returns a string URL. */
type StaticImageDataLike = { src: string };

export function assetUrl(image: string | StaticImageDataLike | null | undefined): string {
  if (!image) return '';
  if (typeof image === 'string') return image;
  if (typeof image === 'object' && typeof image.src === 'string') return image.src;
  return '';
}
