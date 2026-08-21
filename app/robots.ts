import type { MetadataRoute } from 'next';
import { SITE_URL } from '../src/config/brand';

export default function robots(): MetadataRoute.Robots {
  const origin = SITE_URL.replace(/\/+$/, '');
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/*/admin', '/*/checkout', '/*/cart', '/*/login', '/*/profile', '/*/orders', '/*/wishlist', '/*/search'],
      },
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Applebot-Extended', allow: '/' },
    ],
    sitemap: `${origin}/sitemap.xml`,
  };
}
