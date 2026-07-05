import { safeHtml } from './safeHtml.js';

/** Iberian Lab email palette — matches storefront tokens. */
export const EMAIL_BRAND = {
  garnet: '#A91D3A',
  garnetDark: '#8B1830',
  gold: '#C9A961',
  navy: '#0F080A',
  ink: '#1A1014',
  parchment: '#FBF6F1',
  rose: '#FDF2F4',
  roseBorder: '#F9DDE3',
  steel: '#6B5C56',
  muted: '#A39088',
  whatsapp: '#25D366',
  whatsappDark: '#1DA851',
} as const;

const WHATSAPP_ICON_DATA_URI =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'%3E%3Cpath d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z'/%3E%3C/svg%3E";

export function emailSiteUrl(): string {
  return (process.env.SITE_URL || process.env.VITE_SITE_URL || 'https://researchpeptides.es').replace(
    /\/+$/,
    '',
  );
}

export function emailWhatsAppNumber(): string {
  return (process.env.WHATSAPP_NUMBER || '34619862542').replace(/\D/g, '');
}

export function emailWhatsAppUrl(message: string): string {
  return `https://wa.me/${emailWhatsAppNumber()}?text=${encodeURIComponent(message)}`;
}

export function whatsappOrderMessage(
  orderId: string,
  customerName?: string,
  extra?: string,
): string {
  const name = customerName?.trim() || 'Customer';
  let message = `Hello, this is ${name}. I need assistance with my order #${orderId}.`;
  if (extra?.trim()) message += ` ${extra.trim()}`;
  return message;
}

export function whatsappGeneralMessage(customerName?: string): string {
  const name = customerName?.trim();
  return name
    ? `Hello, this is ${name}. I have a question about Research Peptides ES.`
    : 'Hello, I have a question about Research Peptides ES.';
}

type ButtonVariant = 'brand' | 'whatsapp' | 'outline' | 'gold';

export function renderEmailButton(href: string, label: string, variant: ButtonVariant = 'brand') {
  const styles: Record<ButtonVariant, { bg: string; color: string; border: string }> = {
    brand: { bg: EMAIL_BRAND.garnet, color: '#ffffff', border: EMAIL_BRAND.garnet },
    whatsapp: { bg: EMAIL_BRAND.whatsapp, color: '#ffffff', border: EMAIL_BRAND.whatsappDark },
    outline: { bg: '#ffffff', color: EMAIL_BRAND.garnet, border: EMAIL_BRAND.roseBorder },
    gold: { bg: EMAIL_BRAND.gold, color: EMAIL_BRAND.navy, border: EMAIL_BRAND.gold },
  };
  const style = styles[variant];

  return `<table role="presentation" cellspacing="0" cellpadding="0" style="margin:0 auto;">
    <tr>
      <td align="center" style="border-radius:999px;background:${style.bg};border:1px solid ${style.border};">
        <a href="${safeHtml(href)}" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:13px 22px;font-size:14px;font-weight:700;color:${style.color};text-decoration:none;border-radius:999px;font-family:Manrope,Arial,sans-serif;">
          ${safeHtml(label)}
        </a>
      </td>
    </tr>
  </table>`;
}

export function renderWhatsAppButton(href: string, label: string) {
  return `<table role="presentation" cellspacing="0" cellpadding="0" style="margin:0 auto;">
    <tr>
      <td align="center" style="border-radius:999px;background:${EMAIL_BRAND.whatsapp};border:1px solid ${EMAIL_BRAND.whatsappDark};">
        <a href="${safeHtml(href)}" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:13px 22px;font-size:14px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:999px;font-family:Manrope,Arial,sans-serif;">
          <img src="${WHATSAPP_ICON_DATA_URI}" width="18" height="18" alt="" style="display:inline-block;vertical-align:middle;margin-right:8px;border:0;" />
          <span style="vertical-align:middle;">${safeHtml(label)}</span>
        </a>
      </td>
    </tr>
  </table>`;
}

export function renderWhatsAppOrderButton(orderId: string, customerName?: string, note?: string) {
  const href = emailWhatsAppUrl(whatsappOrderMessage(orderId, customerName, note));
  return renderWhatsAppButton(href, 'WhatsApp us about this order');
}

export function renderOrderCustomerCtas(orderId: string, customerName?: string) {
  const site = emailSiteUrl();
  const waPlain = emailWhatsAppUrl(whatsappOrderMessage(orderId, customerName));

  return `
    <div style="margin-top:28px;padding-top:24px;border-top:1px solid ${EMAIL_BRAND.roseBorder};">
      <p style="margin:0 0 16px;font-size:12px;letter-spacing:0.1em;text-transform:uppercase;color:${EMAIL_BRAND.garnet};font-weight:800;text-align:center;">Quick actions</p>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
        <tr>
          <td align="center" style="padding:0 0 12px;">
            ${renderWhatsAppOrderButton(orderId, customerName, 'Please confirm payment instructions.')}
          </td>
        </tr>
        <tr>
          <td align="center" style="padding:0 0 12px;">
            ${renderEmailButton(`${site}/pedidos`, 'View my orders', 'brand')}
          </td>
        </tr>
        <tr>
          <td align="center" style="padding:0 0 12px;">
            ${renderEmailButton(`${site}/tienda`, 'Continue shopping', 'outline')}
          </td>
        </tr>
        <tr>
          <td align="center">
            ${renderEmailButton(`${site}/contacto`, 'Contact support', 'gold')}
          </td>
        </tr>
      </table>
      <p style="margin:16px 0 0;font-size:11px;color:${EMAIL_BRAND.muted};line-height:1.6;text-align:center;">
        WhatsApp link includes your order ID so our team can assist you faster.
      </p>
    </div>
    <!-- plain-text fallback hint -->
    <span style="display:none;">WhatsApp: ${safeHtml(waPlain)}</span>`;
}

export function renderGeneralCustomerCtas(customerName?: string) {
  const site = emailSiteUrl();
  const waHref = emailWhatsAppUrl(whatsappGeneralMessage(customerName));

  return `
    <div style="margin-top:28px;padding-top:24px;border-top:1px solid ${EMAIL_BRAND.roseBorder};">
      <p style="margin:0 0 16px;font-size:12px;letter-spacing:0.1em;text-transform:uppercase;color:${EMAIL_BRAND.garnet};font-weight:800;text-align:center;">Quick actions</p>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
        <tr>
          <td align="center" style="padding:0 0 12px;">
            ${renderWhatsAppButton(waHref, 'Chat with us on WhatsApp')}
          </td>
        </tr>
        <tr>
          <td align="center" style="padding:0 0 12px;">
            ${renderEmailButton(`${site}/tienda`, 'Browse the catalog', 'brand')}
          </td>
        </tr>
        <tr>
          <td align="center">
            ${renderEmailButton(`${site}/contacto`, 'Contact support', 'outline')}
          </td>
        </tr>
      </table>
    </div>`;
}

export function renderOrderIdBox(orderId: string) {
  return `<div style="padding:16px;border:1px solid ${EMAIL_BRAND.roseBorder};background:${EMAIL_BRAND.rose};border-radius:14px;margin-bottom:18px;">
    <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:${EMAIL_BRAND.garnet};font-weight:800;">Order ID</p>
    <p style="margin:0;font-size:18px;color:${EMAIL_BRAND.ink};font-weight:800;font-family:Consolas,Monaco,monospace;">${safeHtml(orderId)}</p>
  </div>`;
}

export function renderInfoPanel(title: string, innerHtml: string) {
  return `<div style="margin-bottom:18px;padding:14px;border:1px solid ${EMAIL_BRAND.roseBorder};border-radius:14px;background:${EMAIL_BRAND.parchment};">
    <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:${EMAIL_BRAND.steel};font-weight:800;">${safeHtml(title)}</p>
    ${innerHtml}
  </div>`;
}

export function renderBrandLayout(params: { title: string; preheader: string; bodyHtml: string }) {
  const brandName = process.env.EMAIL_BRAND_NAME || 'Research Peptides ES';
  const supportAddress = process.env.EMAIL_SUPPORT_ADDRESS || 'info@researchpeptides.es';
  const site = emailSiteUrl();
  const waHref = emailWhatsAppUrl(whatsappGeneralMessage());

  return `<!doctype html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${safeHtml(params.title)}</title>
</head>
<body style="margin:0;padding:0;background:${EMAIL_BRAND.parchment};font-family:Manrope,Arial,sans-serif;color:${EMAIL_BRAND.ink};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${safeHtml(params.preheader)}</div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border-radius:20px;overflow:hidden;border:1px solid ${EMAIL_BRAND.roseBorder};box-shadow:0 4px 24px rgba(15,8,10,0.08);">
          <tr>
            <td style="background:linear-gradient(135deg,${EMAIL_BRAND.navy} 0%,${EMAIL_BRAND.garnetDark} 48%,${EMAIL_BRAND.garnet} 100%);padding:26px 28px;">
              <h1 style="margin:0;font-size:22px;line-height:1.2;color:#ffffff;font-weight:800;font-family:Georgia,'Times New Roman',serif;">${safeHtml(brandName)}</h1>
              <p style="margin:8px 0 0;color:${EMAIL_BRAND.gold};font-size:11px;letter-spacing:0.14em;text-transform:uppercase;font-weight:700;">Premium research peptides · España</p>
            </td>
          </tr>
          <tr>
            <td style="padding:28px;">
              ${params.bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="padding:22px 28px;border-top:1px solid ${EMAIL_BRAND.roseBorder};background:${EMAIL_BRAND.parchment};">
              <p style="margin:0 0 14px;font-size:12px;color:${EMAIL_BRAND.steel};line-height:1.7;text-align:center;">
                Need help? Reply to this email, contact <a href="mailto:${safeHtml(supportAddress)}" style="color:${EMAIL_BRAND.garnet};font-weight:700;text-decoration:none;">${safeHtml(supportAddress)}</a>, or message us on WhatsApp.
              </p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="padding-bottom:10px;">
                    ${renderWhatsAppButton(waHref, 'WhatsApp support')}
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <a href="${safeHtml(site)}" style="font-size:12px;color:${EMAIL_BRAND.garnet};font-weight:700;text-decoration:none;">${safeHtml(site.replace(/^https?:\/\//, ''))}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
