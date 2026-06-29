/** Central brand & contact constants for Research Peptides ES */

export const BRAND_NAME = 'Research Peptides ES';
export const BRAND_SHORT = 'Research Peptides ES';

export const SUPPORT_EMAIL =
  import.meta.env.VITE_SUPPORT_EMAIL || 'info@researchpeptides.es';

/** WhatsApp sales / product enquiries (E.164 without +). */
export const WHATSAPP_NUMBER = '34944643059';

export const SITE_URL =
  import.meta.env.VITE_SITE_URL || 'https://researchpeptides.es';

/** Default Open Graph / Twitter card image (1200×630, logo on white). */
export const DEFAULT_OG_IMAGE_PATH = '/og-image.jpg';

export const LEGAL_ENTITY = 'Research Peptides ES S.L.';
export const HQ_LOCATION = 'Calle de la Innovación 12, 28001 Madrid, España';

export const HQ_ADDRESS = {
  streetAddress: 'Calle de la Innovación 12',
  postalCode: '28001',
  addressLocality: 'Madrid',
  addressRegion: 'Comunidad de Madrid',
  addressCountry: 'ES',
} as const;
