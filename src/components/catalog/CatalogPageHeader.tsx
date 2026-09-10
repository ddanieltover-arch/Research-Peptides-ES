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
    <div className="bg-white border-b border-slate-200/80 relative overflow-hidden">
      <div className="absolute inset-0 bg-scientific-grid opacity-35 pointer-events-none" aria-hidden />
      <Container className="relative z-10 py-10 md:py-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={pageEnterTransition()}
              className="text-eyebrow-accent mb-3 text-brand-600 before:bg-brand-500"
            >
              {eyebrow}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...pageEnterTransition(), delay: 0.04 }}
              className="text-display font-bold text-navy-950 mb-2.5 leading-tight"
            >
              {title}
            </motion.h1>
            {description ? (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...pageEnterTransition(), delay: 0.08 }}
                className="text-slate-600 text-sm md:text-base leading-relaxed max-w-xl font-sans"
              >
                {description}
              </motion.p>
            ) : null}
          </div>
          {actions ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ...pageEnterTransition(), delay: 0.1 }}
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
