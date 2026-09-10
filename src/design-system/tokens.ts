/**
 * Research Peptides ES — Ultra-Clinical Swiss Lab tokens (laser crimson + clinical emerald + obsidian)
 */

export const brandColors = {
  50: '#FDF2F4',
  100: '#FBE5E9',
  200: '#F6C8D2',
  300: '#ED96A9',
  400: '#DD5E7B',
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

export const clinicalColors = {
  400: '#38BDF8',
  500: '#0284C7',
  600: '#0369A1',
} as const;

export const neutralColors = {
  navy950: '#090D16',
  navy900: '#0F172A',
  slate850: '#1E293B',
  mist50: '#FAFAFC',
  mist100: '#F1F5F9',
  silver400: '#94A3B8',
  steel600: '#475569',
} as const;

export const semanticColors = {
  success: '#059669',
  warning: '#D97706',
  error: '#DC2626',
  purity: '#059669',
} as const;

export const gradients = {
  hero: 'linear-gradient(180deg, #FFFFFF 0%, #FAFAFC 60%, #F1F5F9 100%)',
  heroDark: 'linear-gradient(148deg, #090D16 0%, #170A10 42%, #0F172A 72%, #090D16 100%)',
  cta: 'linear-gradient(135deg, #A91D3A 0%, #8B1830 55%, #6E1226 100%)',
  brand: 'linear-gradient(120deg, #DD5E7B 0%, #A91D3A 50%, #8B1830 100%)',
  glow: 'radial-gradient(ellipse at 50% 0%, rgba(169, 29, 58, 0.15), transparent 70%)',
  clinical: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
} as const;

export const fonts = {
  display: 'var(--font-geist-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  sans: 'var(--font-geist-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  mono: 'var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
} as const;

export const spacing = {
  sectionSm: '3.5rem',
  sectionMd: '5rem',
  sectionLg: '7rem',
} as const;

export const radii = {
  sm: '0.375rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  '2xl': '1.25rem',
  '3xl': '1.5rem',
} as const;

export const shadows = {
  card: '0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 1px 2px -1px rgba(15, 23, 42, 0.02)',
  elevated: '0 10px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04)',
  glow: '0 0 32px rgba(169, 29, 58, 0.16)',
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
