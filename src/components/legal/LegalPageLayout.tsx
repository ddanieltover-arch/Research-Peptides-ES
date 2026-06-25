import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { Container, GlassPanel, PageShell, Reveal } from '../../design-system';
import { pageEnterTransition } from '../../design-system/motion';
import { cn } from '../../lib/utils';

type LegalPageLayoutProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function LegalPageLayout({
  eyebrow,
  title,
  subtitle,
  icon,
  children,
  className,
}: LegalPageLayoutProps) {
  return (
    <PageShell tone="mist" className={cn('pt-12 pb-20', className)}>
      <Container className="max-w-4xl py-12 md:py-16">
        <motion.header
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={pageEnterTransition()}
          className="text-center mb-12 md:mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-50 text-brand-600 rounded-full text-xs font-semibold uppercase tracking-wider mb-5">
            {icon}
            {eyebrow}
          </div>
          <h1 className="text-h1 text-navy-950">{title}</h1>
          {subtitle ? (
            <p className="text-steel-600 mt-4 max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
          ) : null}
        </motion.header>
        <div className="space-y-10 text-steel-600 leading-relaxed">{children}</div>
      </Container>
    </PageShell>
  );
}

export function LegalSection({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <Reveal as="section">
    <GlassPanel variant="light" padding="md" className="shadow-card">
      <h2 className="text-xl font-display font-bold text-navy-950 mb-4">{heading}</h2>
      <div className="text-sm md:text-base space-y-3">{children}</div>
    </GlassPanel>
    </Reveal>
  );
}
