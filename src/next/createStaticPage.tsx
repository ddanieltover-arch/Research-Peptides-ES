'use client';

import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';
import { PageLoader } from '../components/PageLoader';

type Loader = () => Promise<{ default: ComponentType<any> }>;

/** Client-side page host so Zustand/i18n/context graphs stay in the client bundle. */
export function createStaticPage(loader: Loader, opts?: { answer?: string }) {
  const Comp = dynamic(loader, {
    loading: () => <PageLoader />,
    ssr: true,
  });

  return function StaticPage() {
    return (
      <>
        {opts?.answer ? (
          <section id="answer" aria-label="Quick Answer" className="mx-auto max-w-3xl px-4 pt-6">
            <p className="rounded-xl border border-brand-100 bg-brand-50/60 px-4 py-3 text-sm text-steel-600">
              <strong className="text-navy-950">Respuesta rápida:</strong> {opts.answer}
            </p>
          </section>
        ) : null}
        <Comp />
      </>
    );
  };
}
