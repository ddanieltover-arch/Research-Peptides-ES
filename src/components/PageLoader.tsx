import { Container } from '../design-system';

/** Route-level suspense fallback — skeleton with shimmer. */
export function PageLoader() {
  return (
    <Container className="py-12 md:py-16" role="status" aria-live="polite">
      <span className="sr-only">Loading page</span>
      <div className="max-w-3xl mx-auto space-y-6 animate-pulse">
        <div className="h-4 w-32 rounded-full skeleton-shimmer" />
        <div className="h-12 w-full max-w-xl rounded-2xl skeleton-shimmer" />
        <div className="h-4 w-full rounded-lg skeleton-shimmer" />
        <div className="h-4 w-5/6 rounded-lg skeleton-shimmer" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="aspect-[4/5] rounded-[1.75rem] skeleton-shimmer" />
          ))}
        </div>
      </div>
    </Container>
  );
}
