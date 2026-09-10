const safe = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export function formatCurrency(value: number, locale = 'en-IE', currency = 'EUR') {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value || 0);
}

/** Clinical Swiss Lab layout for server-side transactional mail. */
export function renderBrandLayout(params: { title: string; preheader: string; bodyHtml: string }) {
  const brandName = process.env.EMAIL_BRAND_NAME || 'Research Peptides ES';
  const supportAddress = process.env.EMAIL_SUPPORT_ADDRESS || 'info@researchpeptides.es';

  return `<!doctype html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${safe(params.title)}</title>
</head>
<body style="margin:0;padding:0;background:#F8FAFC;font-family:Arial,Helvetica,sans-serif;color:#0F172A;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${safe(params.preheader)}</div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #E2E8F0;">
          <tr>
            <td style="background:#0F172A;padding:24px 28px;border-bottom:3px solid #A91D3A;">
              <h1 style="margin:0;font-size:20px;line-height:1.25;color:#ffffff;font-weight:700;letter-spacing:-0.02em;">${safe(brandName)}</h1>
              <p style="margin:8px 0 0;color:#94A3B8;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;font-weight:600;font-family:Consolas,Monaco,monospace;">Research grade · España / EU</p>
            </td>
          </tr>
          <tr>
            <td style="padding:28px;">
              ${params.bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="padding:20px 28px;border-top:1px solid #E2E8F0;background:#F8FAFC;">
              <p style="margin:0;font-size:12px;color:#64748B;line-height:1.6;">
                Need help? Reply to this email or contact <strong style="color:#A91D3A;">${safe(supportAddress)}</strong>.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function stripHtml(input: string) {
  return input
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
