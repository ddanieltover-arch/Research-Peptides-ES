import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title: string;
  description: string;
  canonicalPath?: string;
  type?: 'website' | 'article' | 'product';
  image?: string;
}

export function SEO({
  title,
  description,
  canonicalPath,
  type = 'website',
  image = 'https://researchpeptide.eu/og-image.jpg',
}: SEOProps) {
  const location = useLocation();
  const currentUrl = `https://researchpeptide.eu${canonicalPath || location.pathname}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Research Peptides EU" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
