import { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { cn } from '../../lib/utils';
import { DEFAULT_BLOG_COVER, resolveBlogImageUrl } from '../../lib/blogImages';

type BlogPostCoverProps = {
  imageUrl?: string | null;
  title: string;
  className?: string;
  imgClassName?: string;
};

export function BlogPostCover({ imageUrl, title, className, imgClassName }: BlogPostCoverProps) {
  const [failed, setFailed] = useState(false);
  const resolved = resolveBlogImageUrl(imageUrl);
  const src = !failed && resolved ? resolved : !failed ? DEFAULT_BLOG_COVER : null;

  if (!src) {
    return (
      <div
        className={cn(
          'w-full h-full flex items-center justify-center bg-brand-50 text-brand-200',
          className,
        )}
        role="img"
        aria-label={title}
      >
        <BookOpen className="h-12 w-12" aria-hidden />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt=""
      aria-hidden
      className={cn('w-full h-full object-cover', imgClassName)}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
