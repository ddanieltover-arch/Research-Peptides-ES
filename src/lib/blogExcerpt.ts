/** Plain-text excerpt for blog cards (strips markdown headings / markers). */
export function blogExcerpt(content: string, maxLength = 160): string {
  const plain = content
    .replace(/^##\s+.+$/gm, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/\|/g, ' ')
    .replace(/^[-*]+\s+/gm, '')
    .replace(/\n+/g, ' ')
    .trim();
  if (plain.length <= maxLength) return plain;
  return `${plain.slice(0, maxLength).trimEnd()}…`;
}

/** ~200 words per minute for Spanish science copy. */
export function estimateReadMinutes(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(3, Math.round(words / 200));
}
