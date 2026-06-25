/**
 * Research Peptides ES — Iberian Lab design tokens (garnet + gold)
 */

export const brandColors = {
  50: '#FDF2F4',
  100: '#F9DDE3',
  200: '#F0B3C0',
  300: '#E07A92',
  400: '#C93D5E',
  500: '#A91D3A',
  600: '#8B1830',
  700: '#6E1226',
  800: '#520D1C',
  900: '#3A0914',
} as const;

export const accentColors = {
  400: '#E8D5A3',
  500: '#C9A961',
  600: '#A68B4B',
} as const;

export const neutralColors = {
  navy950: '#0F080A',
  navy900: '#1A1014',
  slate850: '#24181C',
  mist50: '#FBF6F1',
  silver400: '#A39088',
  steel600: '#6B5C56',
} as const;

export const semanticColors = {
  success: '#2F7D62',
  warning: '#D97706',
  error: '#DC2626',
  purity: '#3D7A6E',
} as const;

export const gradients = {
  hero: 'linear-gradient(148deg, #0F080A 0%, #3A0914 42%, #1A1014 72%, #0F080A 100%)',
  cta: 'linear-gradient(135deg, #A91D3A 0%, #8B1830 55%, #A68B4B 100%)',
  brand: 'linear-gradient(120deg, #C93D5E 0%, #A91D3A 45%, #C9A961 100%)',
  glow: 'radial-gradient(ellipse at 30% 0%, rgba(201, 169, 97, 0.28), transparent 65%)',
} as const;

export const fonts = {
  display: '"Cormorant Garamond", Georgia, serif',
  sans: '"Manrope", system-ui, sans-serif',
  mono: '"IBM Plex Mono", ui-monospace, monospace',
} as const;

export const spacing = {
  sectionSm: '4rem',
  sectionMd: '6rem',
  sectionLg: '8rem',
} as const;

export const radii = {
  sm: '0.5rem',
  md: '0.75rem',
  lg: '1rem',
  xl: '1.5rem',
  '2xl': '1.75rem',
  '3xl': '2rem',
} as const;

export const shadows = {
  card: '0 4px 24px rgba(15, 8, 10, 0.08)',
  elevated: '0 16px 48px rgba(169, 29, 58, 0.14)',
  glow: '0 0 48px rgba(201, 169, 97, 0.22)',
} as const;

export const motionDuration = {
  fast: 0.12,
  base: 0.24,
  slow: 0.4,
} as const;

export const motionSpring = {
  stiffness: 300,
  damping: 30,
} as const;

export const brandName = 'Research Peptides ES' as const;

export const defaultLocale = 'es' as const;
export const defaultCurrency = 'EUR' as const;
