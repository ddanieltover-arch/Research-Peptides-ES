import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { Container } from '../../design-system';
import { pageEnterTransition } from '../../design-system/motion';

type CatalogPageHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  actions?: ReactNode;
};

export function CatalogPageHeader({ eyebrow, title, description, actions }: CatalogPageHeaderProps) {
  return (
    <div className="bg-gradient-parchment border-b border-brand-100/80 relative overflow-hidden">
      <div className="absolute inset-0 bg-scientific-grid opacity-30 pointer-events-none" aria-hidden />
      <div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-500/60 to-transparent"
        aria-hidden
      />
      <Container className="relative z-10 py-12 md:py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={pageEnterTransition()}
              className="text-eyebrow-accent mb-4"
            >
              {eyebrow}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...pageEnterTransition(), delay: 0.05 }}
              className="text-h1 font-display font-semibold text-navy-950 mb-3 leading-tight"
            >
              {title}
            </motion.h1>
            {description ? (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...pageEnterTransition(), delay: 0.1 }}
                className="text-steel-600 text-sm md:text-base leading-relaxed max-w-xl"
              >
                {description}
              </motion.p>
            ) : null}
          </div>
          {actions ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ...pageEnterTransition(), delay: 0.12 }}
              className="shrink-0"
            >
              {actions}
            </motion.div>
          ) : null}
        </div>
      </Container>
    </div>
  );
}
