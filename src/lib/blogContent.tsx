import { cn } from './utils';

/** Plain-text excerpt for blog cards (strips markdown headings). */
export function blogExcerpt(content: string, maxLength = 160): string {
  const plain = content
    .replace(/^##\s+.+$/gm, '')
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

type BlogContentProps = {
  content: string;
};

/** Renders blog body with simple ## heading support. */
export function BlogContent({ content }: BlogContentProps) {
  const blocks = content.split(/\n(?=## )/);

  return (
    <div className="space-y-10">
      {blocks.map((block, index) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        const isFirst = index === 0;

        if (trimmed.startsWith('## ')) {
          const [headingLine, ...rest] = trimmed.split('\n');
          const heading = headingLine.replace(/^##\s+/, '');
          const body = rest.join('\n').trim();
          return (
            <section key={index} className="relative pl-0 md:pl-6">
              <div
                className="hidden md:block absolute left-0 top-1 bottom-1 w-1 rounded-full bg-gradient-to-b from-brand-500 via-accent-500 to-brand-300"
                aria-hidden
              />
              <h2 className="text-xl md:text-2xl font-display font-semibold text-navy-950 mb-4 leading-tight">
                {heading}
              </h2>
              {body ? (
                <p className="text-steel-600 text-base leading-[1.75] font-sans whitespace-pre-wrap">
                  {body}
                </p>
              ) : null}
            </section>
          );
        }

        return (
          <p
            key={index}
            className={cn(
              'text-steel-600 leading-[1.75] font-sans whitespace-pre-wrap',
              isFirst && 'text-lg md:text-xl text-navy-950/90 font-medium leading-relaxed',
            )}
          >
            {trimmed}
          </p>
        );
      })}
    </div>
  );
}
