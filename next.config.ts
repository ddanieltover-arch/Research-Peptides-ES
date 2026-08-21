import type { NextConfig } from 'next';
import path from 'path';

/** Bridge Vite-era Vercel env vars into NEXT_PUBLIC_* for the client bundle. */
function bridge(nextKey: string, viteKey: string, fallback = ''): string {
  return process.env[nextKey] || process.env[viteKey] || fallback;
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    NEXT_PUBLIC_SUPABASE_URL: bridge('NEXT_PUBLIC_SUPABASE_URL', 'VITE_SUPABASE_URL'),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: bridge(
      'NEXT_PUBLIC_SUPABASE_ANON_KEY',
      'VITE_SUPABASE_ANON_KEY',
    ),
    NEXT_PUBLIC_SITE_URL: bridge(
      'NEXT_PUBLIC_SITE_URL',
      'VITE_SITE_URL',
      process.env.SITE_URL || 'https://researchpeptides.es',
    ),
    NEXT_PUBLIC_SUPPORT_EMAIL: bridge('NEXT_PUBLIC_SUPPORT_EMAIL', 'VITE_SUPPORT_EMAIL'),
    NEXT_PUBLIC_ADMIN_EMAILS: bridge('NEXT_PUBLIC_ADMIN_EMAILS', 'VITE_ADMIN_EMAILS'),
    NEXT_PUBLIC_LIVECHAT_MOBILE_OFFSET_Y: bridge(
      'NEXT_PUBLIC_LIVECHAT_MOBILE_OFFSET_Y',
      'VITE_LIVECHAT_MOBILE_OFFSET_Y',
    ),
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.supabase.co' },
      { protocol: 'https', hostname: '**.supabase.in' },
    ],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname),
    };
    return config;
  },
  async rewrites() {
    return [
      {
        source: '/product-feed.xml',
        destination: '/api/product-feed',
      },
    ];
  },
};

export default nextConfig;
