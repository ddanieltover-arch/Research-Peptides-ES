import React from 'react';
import { Helmet } from 'react-helmet-async';

export function JsonLd({ data }: { data: Record<string, unknown>[] | Record<string, unknown> }) {
  const blocks = Array.isArray(data) ? data : [data];
  return (
    <Helmet>
      {blocks.map((block, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(block)}
        </script>
      ))}
    </Helmet>
  );
}
