/**
 * Upserts 4 Spanish SEO blog posts into Supabase `blog_posts`.
 * Env pattern matches scripts/generate-sitemap.ts.
 *
 *   npm run db:seed:seo-posts
 *
 * Dry-runs (prints titles, no writes) when credentials are missing.
 */
import { config as loadEnv } from 'dotenv';
import { createClient } from '@supabase/supabase-js';

loadEnv({ path: '.env.local' });
loadEnv();

const SITE = (process.env.VITE_SITE_URL || 'https://researchpeptides.es').replace(/\/+$/, '');

const IMG = {
  pipette: 'https://images.unsplash.com/photo-1576085898323-218337e3e43c?auto=format&fit=crop&q=80&w=1200',
  data: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1200',
  cold: 'https://images.unsplash.com/photo-1576671081837-49000212a370?auto=format&fit=crop&q=80&w=1200',
  lab: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1200',
} as const;

const posts = [
  {
    id: 'reconstitucion-peptidos-laboratorio',
    title: 'Cómo reconstituir péptidos liofilizados en el laboratorio',
    image_url: IMG.pipette,
    created_at: '2026-08-25T09:00:00.000Z',
    content: `La reconstitución convierte un péptido liofilizado en una solución de trabajo para ensayos controlados. En Research Peptides ES suministramos compuestos **exclusivamente para investigación**; esta guía es orientativa y no sustituye el SOP de su laboratorio.

## Antes de empezar
Prepare el vial, el diluyente indicado en su protocolo (a menudo agua bacteriostática o agua estéril), pipetas calibradas y etiquetas. Consulte el certificado de análisis (COA) del lote y la ficha del producto.

## Pasos generales
1. Deje equilibrar el vial a temperatura de trabajo según su SOP.
2. Desinfecte el septum y añada el volumen de diluyente calculado con lentitud.
3. Girar suavemente — evite agitación vigorosa que genere espuma.
4. Etiquete concentración, diluyente, fecha y número de lote.
5. Registre todo en el cuaderno de laboratorio.

## Cálculo de concentración
Utilice nuestra [calculadora de péptidos](${SITE}/calculadora-de-peptidos) para planificar mg/mL antes del ensayo. Verifique siempre las unidades.

## Errores frecuentes
Volúmenes mal convertidos, olvido del lote en la etiqueta y almacenamiento incorrecto tras abrir el vial son las causas más habituales de pérdida de trazabilidad.

## Recursos
- [Biblioteca COA](${SITE}/certificados-coas)
- [Guía de péptidos](${SITE}/guia-de-peptidos)
- [FAQ](${SITE}/preguntas-frecuentes)

**Aviso:** solo para investigación científica. No destinado a consumo humano ni veterinario. Research Peptides ES — Calle de la Innovación 12, 28001 Madrid.`,
  },
  {
    id: 'como-leer-coa-peptidos',
    title: 'Cómo leer un certificado de análisis (COA) de péptidos',
    image_url: IMG.data,
    created_at: '2026-08-28T09:00:00.000Z',
    content: `Un **certificado de análisis (COA)** vincula un lote concreto con métodos y resultados analíticos. Es la base de la trazabilidad cuando adquiere péptidos de investigación en Research Peptides ES.

## Campos que debe buscar
- Identificación del compuesto
- Número de lote
- Método (p. ej. HPLC) y resultado de pureza
- Fecha de análisis y laboratorio emisor
- Identidad / métodos complementarios cuando consten

## Pureza: qué significa (y qué no)
Un porcentaje HPLC describe el perfil cromatográfico del lote analizado. **No** equivale a una afirmación de eficacia clínica ni autoriza uso en humanos.

## Archivo recomendado
Guarde el PDF del COA junto al albarán, el registro de reconstitución y las condiciones de almacenamiento. Así cualquier auditor interno puede reconstruir la cadena lote → vial → ensayo.

## Dónde obtenerlos
Visite la [biblioteca COA](${SITE}/certificados-coas) o compare enfoques en [COA vs sin COA](${SITE}/coa-vs-sin-coa). Para pedidos históricos: info@researchpeptides.es.

**Solo para investigación.** No apto para consumo humano ni veterinario.`,
  },
  {
    id: 'cadena-frio-peptidos-ue',
    title: 'Cadena de frío: buenas prácticas de envío de péptidos en la UE',
    image_url: IMG.cold,
    created_at: '2026-09-01T09:00:00.000Z',
    content: `La estabilidad de muchos péptidos liofilizados depende de un transporte cuidadoso. Research Peptides ES opera desde **Madrid** (Calle de la Innovación 12, 28001 Madrid) y envía a laboratorios en España y la UE con embalaje térmico según destino y estación.

## Por qué importa
Fluctuaciones largas de temperatura pueden comprometer la integridad antes de que el vial llegue al banco. El embalaje aislado y los packs fríos mitigan el riesgo en trayectos europeos habituales.

## Al recibir el paquete
1. Inspeccione el embalaje exterior.
2. Verifique albarán y número de lote.
3. Traslade el producto al almacenamiento indicado en la ficha (-20 °C o 2–8 °C según producto).
4. Descargue y archive el [COA](${SITE}/certificados-coas).

## Plazos y opciones
Consulte detalles actualizados en la página de [envío](${SITE}/envio). Para incidencias logísticas, contacte con info@researchpeptides.es indicando el número de pedido.

Compuestos **exclusivamente para investigación científica**. No uso humano ni veterinario.`,
  },
  {
    id: 'uso-exclusivo-investigacion-cumplimiento',
    title: 'Uso exclusivo para investigación: cumplimiento y límites del catálogo',
    image_url: IMG.lab,
    created_at: '2026-09-04T09:00:00.000Z',
    content: `Todos los productos de Research Peptides ES se comercializan con el marco **research use only (RUO)**: destinados a investigación científica en laboratorio, no a diagnóstico, terapéutica ni consumo.

## Qué implica para el comprador
- Uso en entornos de investigación controlados
- Prohibición de claims médicos en comunicaciones derivadas
- Conservación de documentación de lote (COA, factura, registros internos)

## Qué no ofrecemos
No suministramos orientación de dosificación humana, protocolos clínicos ni apoyo a uso personal. Cualquier interpretación en ese sentido queda fuera de nuestras condiciones.

## Documentos de referencia
- [Términos](${SITE}/terminos)
- [FAQ](${SITE}/preguntas-frecuentes)
- [Política de privacidad](${SITE}/privacidad)

## Contacto institucional
Para pedidos de laboratorio o aclaraciones de catálogo: info@researchpeptides.es — Research Peptides ES, Calle de la Innovación 12, 28001 Madrid, España.

**Solo investigación.** No destinado a consumo humano ni veterinario.`,
  },
];

async function main() {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    console.warn('Dry-run: missing SUPABASE_URL/VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.');
    console.warn(`Would upsert ${posts.length} posts:`);
    for (const p of posts) {
      console.log(`  - ${p.id}: ${p.title}`);
    }
    return;
  }

  const supabase = createClient(url, key);
  console.log(`Upserting ${posts.length} SEO blog posts…`);

  for (const post of posts) {
    const { error } = await supabase.from('blog_posts').upsert(
      { ...post, updated_at: new Date().toISOString() },
      { onConflict: 'id' },
    );
    if (error) {
      console.error(`Error "${post.id}":`, error.message);
    } else {
      console.log(`✓ ${post.id}`);
    }
  }

  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
