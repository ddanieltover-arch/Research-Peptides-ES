/**
 * Upserts Semrush-driven question blogs (dónde / cómo / por qué / how to buy)
 * into Supabase `blog_posts`. RUO framing only — no clinical dosing.
 *
 *   npm run db:seed:question-posts
 *
 * Dry-runs when SUPABASE credentials are missing.
 */
import { config as loadEnv } from 'dotenv';
import { createClient } from '@supabase/supabase-js';

loadEnv({ path: '.env.local' });
loadEnv();

const SITE = (process.env.VITE_SITE_URL || 'https://researchpeptides.es').replace(/\/+$/, '');

const IMG = {
  lab: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1200',
  pipette: 'https://images.unsplash.com/photo-1576085898323-218337e3e43c?auto=format&fit=crop&q=80&w=1200',
  vials: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&q=80&w=1200',
  data: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1200',
  cold: 'https://images.unsplash.com/photo-1576671081837-49000212a370?auto=format&fit=crop&q=80&w=1200',
  shop: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&q=80&w=1200',
} as const;

const RUO = `**Aviso:** solo para investigación científica. No destinado a consumo humano ni veterinario. Research Peptides ES — Calle de la Innovación 12, 28001 Madrid.`;

export const questionPosts = [
  {
    id: 'donde-comprar-retatrutide-espana',
    title: '¿Dónde comprar retatrutide en España para el laboratorio?',
    image_url: IMG.vials,
    created_at: '2026-09-10T08:00:00.000Z',
    content: `Si buscas **dónde comprar retatrutide en España** o **retatrutide comprar** para un protocolo de laboratorio, esta guía resume criterios de compra institucionales — sin claims clínicos ni dosis humanas.

## Qué implica «retatrutide comprar» en investigación
Retatrutide se ofrece en Research Peptides ES como material de referencia **research use only (RUO)**. La ficha de producto cubre variantes, precio orientativo y soporte de documentación de lote (COA).

## Cómo comprar retatrutide paso a paso
1. Revisa la ficha [retatrutide](${SITE}/producto/retatrutide) (también buscada como *retatrutide spain* / *buy retatrutide*).
2. Confirma stock y presentación (mg / vial) según tu SOP.
3. Solicita o descarga el [COA](${SITE}/certificados-coas) del lote.
4. Completa el pedido en la [tienda](${SITE}/tienda) y consulta [envío](${SITE}/envio) a España/UE.
5. Archiva albarán + lote en el cuaderno de laboratorio.

## Por qué no mezclar con semaglutide en la SERP
Google a veces asocia *retatrutide barato* con otras fichas GLP. Usa la URL dedicada de retatrutide; para andamiajes relacionados mira [cagrilintide](${SITE}/producto/cagrilintide-semaglutide-blend) o [semaglutide](${SITE}/producto/semaglutide).

## Recursos
- [Guía de péptidos](${SITE}/guia-de-peptidos)
- [Calculadora peptidos](${SITE}/calculadora-de-peptidos)
- [Agua bacteriostática](${SITE}/producto/bacteriostatic-water)

${RUO}`,
  },
  {
    id: 'como-comprar-peptidos-investigacion-espana',
    title: '¿Cómo comprar péptidos de investigación en España?',
    image_url: IMG.shop,
    created_at: '2026-09-11T08:00:00.000Z',
    content: `**Comprar peptidos en España** (también *péptidos comprar en linea*, *peptides comprar*) es un proceso de procurement de laboratorio, no de farmacia clínica. Esta guía explica cómo comprar péptidos RUO con trazabilidad.

## Criterios antes de pedir
- Uso exclusivo de investigación (RUO)
- Documentación de lote (COA HPLC)
- Embalaje y [cadena de frío](${SITE}/envio)
- Proveedor UE con soporte en español (*europa peptide* / *research peptides-europe*)

## Cómo comprar péptidos paso a paso
1. Explora el catálogo en [comprar péptidos España](${SITE}/tienda).
2. Filtra por compuesto (p. ej. BPC-157, retatrutide, IGF-1).
3. Compara [COA vs sin COA](${SITE}/coa-vs-sin-coa).
4. Usa la [calculadora peptidos](${SITE}/calculadora-de-peptidos) solo como apoyo volumétrico tras el pedido.
5. Registra lote, fecha y condiciones de almacenamiento.

## Péptidos inyectables comprar — matiz de laboratorio
La consulta *péptidos inyectables comprar* en investigación se refiere a formatos de vial para reconstitución bajo SOP, **no** a uso clínico humano.

## Dónde comprar en línea con confianza
Research Peptides ES opera desde Madrid y envía a labs en España y la UE. Contacto: info@researchpeptides.es.

${RUO}`,
  },
  {
    id: 'donde-comprar-cagrilintide-laboratorio',
    title: '¿Dónde comprar cagrilintide para investigación?',
    image_url: IMG.data,
    created_at: '2026-09-12T08:00:00.000Z',
    content: `Buscas **dónde comprar cagrilintide**, **cagrilintide precio** o **comprar original cagrilintide** para el lab. Aquí va el marco de compra RUO.

## Cagrilintide venta en el catálogo
En Research Peptides ES encontrarás:
- [Cagrilintide](${SITE}/producto/cagrilintide)
- Blend [cagrilintide–semaglutide](${SITE}/producto/cagrilintide-semaglutide-blend) (URL que suele rankear para *cagrilintide venta* / *cagrilintide barato*)

## Cómo comprar cagrilintide
1. Elige presentación (solo o blend) según el protocolo interno.
2. Revisa precio y variantes en la ficha.
3. Descarga el [COA](${SITE}/certificados-coas).
4. Pedido vía [tienda](${SITE}/tienda) + [envío](${SITE}/envio).

## Relacionados
Si tu ensayo compara andamiajes: [retatrutide comprar](${SITE}/producto/retatrutide) y [semaglutide investigación](${SITE}/producto/semaglutide).

## Por qué importa el lote
*Cagrilintide peptide* como término informacional exige trazabilidad: número de lote en etiqueta, PDF de COA y registro de reconstitución.

${RUO}`,
  },
  {
    id: 'por-que-agua-bacteriostatica-laboratorio',
    title: '¿Por qué usar agua bacteriostática de laboratorio (no de farmacia)?',
    image_url: IMG.pipette,
    created_at: '2026-09-13T08:00:00.000Z',
    content: `Muchas búsquedas de **agua bacteriostática farmacia** o **agua bacteriostática para inyección** llegan a proveedores de lab. En Research Peptides ES el producto es un **suministro de investigación**, no una dispensación de farmacia clínica.

## Bacteriostatic water: qué es en el lab
El **bacteriostatic water** (*water bacteriostatic*, *bacteriostatic water sterile*) se usa en protocolos de reconstitución de péptidos liofilizados según el SOP del centro.

## Cómo «comprar» agua bacteriostática correctamente
1. Abre la ficha [agua bacteriostatica comprar](${SITE}/producto/bacteriostatic-water).
2. Confirma que el uso previsto es de laboratorio (RUO).
3. Empareja con la [calculadora peptidos](${SITE}/calculadora-de-peptidos) y la [guía](${SITE}/guia-de-peptidos).
4. No interpretes el material como producto de farmacia comunitaria.

## Por qué no farmacia clínica
Nuestro catálogo no sustituye receta ni dispensación humana. Quienes buscan *agua bacteriostática farmacia* deben entender el framing RUO antes de pedir.

## Enlaces útiles
- [Cómo reconstituir péptidos](${SITE}/blog/reconstitucion-peptidos-laboratorio)
- [Tienda](${SITE}/tienda)

${RUO}`,
  },
  {
    id: 'como-comprar-folistatina-investigacion',
    title: '¿Cómo comprar folistatina (follistatin) para investigación?',
    image_url: IMG.lab,
    created_at: '2026-09-14T08:00:00.000Z',
    content: `**Folistatina comprar** y **follistatin venta** son consultas transaccionales de laboratorio. Esta guía explica cómo comprar follistatin RUO en España/UE.

## Dónde comprar follistatin
Ficha dedicada: [folistatina / follistatin](${SITE}/producto/follistatin). Catálogo completo: [tienda](${SITE}/tienda).

## Cómo comprar — checklist
1. Verifica pureza y presentación en la ficha.
2. Solicita [COA](${SITE}/certificados-coas) del lote.
3. Planifica reconstitución con [calculadora](${SITE}/calculadora-de-peptidos) y, si aplica, [agua bacteriostática](${SITE}/producto/bacteriostatic-water).
4. Relaciona ensayos con [IGF-1 comprar](${SITE}/producto/igf-1-lr3) o [PEG-MGF](${SITE}/producto/peg-mgf) solo si tu protocolo lo contempla.

## Por qué documentar el pedido
La trazabilidad (lote + COA + cuaderno) es el estándar de labs europeos que adquieren *follistatin venta* online.

${RUO}`,
  },
  {
    id: 'donde-comprar-igf-1-lr3-espana',
    title: '¿Dónde comprar IGF-1 LR3 (igf-1 comprar) en España?',
    image_url: IMG.cold,
    created_at: '2026-09-15T08:00:00.000Z',
    content: `La consulta **igf-1 comprar** suele apuntar a IGF-1 LR3 para investigación. Aquí: dónde y cómo comprarlo con framing RUO.

## Dónde comprar IGF-1
- Producto: [IGF-1 LR3](${SITE}/producto/igf-1-lr3)
- Catálogo: [péptidos comprar en linea](${SITE}/tienda)
- Envío: [envío péptidos España](${SITE}/envio)

## Cómo comprar IGF-1 paso a paso
1. Revisa especificaciones y variantes.
2. Descarga el COA del lote en la [biblioteca](${SITE}/certificados-coas).
3. Prepara reconstitución según SOP (apoyo: [calculadora peptidos](${SITE}/calculadora-de-peptidos)).
4. Archiva lote y condiciones de almacenamiento (-20 °C u otras según ficha).

## Relacionados
[Folistatina comprar](${SITE}/producto/follistatin), [frag 176-191](${SITE}/producto/hgh-fragment-176-191).

${RUO}`,
  },
  {
    id: 'como-comprar-peptidos-inyectables-lab',
    title: '¿Cómo comprar péptidos inyectables para investigación?',
    image_url: IMG.vials,
    created_at: '2026-09-16T08:00:00.000Z',
    content: `**Péptidos inyectables comprar** es una consulta comercial frecuente. En nuestro contexto significa viales liofilizados para reconstitución en laboratorio — **nunca** uso clínico humano.

## Qué significa «inyectables» en RUO
Formato de vial + diluyente según SOP. No implica indicación terapéutica ni vías de administración humanas.

## Cómo comprar de forma segura (lab)
1. Entra en [péptidos inyectables / tienda](${SITE}/tienda).
2. Elige compuestos con COA ([biblioteca](${SITE}/certificados-coas)).
3. Lee [términos RUO](${SITE}/terminos) y [FAQ](${SITE}/preguntas-frecuentes).
4. Usa [calculadora](${SITE}/calculadora-de-peptidos) solo para volúmenes de diluyente de protocolo.
5. Empareja con [agua bacteriostática](${SITE}/producto/bacteriostatic-water) si tu SOP lo indica.

## Dónde comprar en España
Research Peptides ES (Madrid) — *comprar peptidos en españa* con envío UE. Contacto institucional: info@researchpeptides.es.

${RUO}`,
  },
  {
    id: 'por-que-calculadora-peptidos-antes-reconstituir',
    title: '¿Por qué usar una calculadora de péptidos antes de reconstituir?',
    image_url: IMG.pipette,
    created_at: '2026-09-17T08:00:00.000Z',
    content: `La búsqueda **calculadora peptidos** / *calculadora de péptidos* responde a un problema real: errores de volumen al pasar de mg liofilizados a mg/mL de trabajo.

## Por qué calcular antes
Un error de un orden de magnitud invalida el ensayo y pierde trazabilidad. La calculadora no sustituye el SOP: lo apoya.

## Cómo usarla
1. Abre la [calculadora peptidos](${SITE}/calculadora-de-peptidos).
2. Introduce masa del vial y volumen de diluyente previsto.
3. Etiqueta la concentración resultante + lote + fecha.
4. Consulta también [cómo reconstituir](${SITE}/blog/reconstitucion-peptidos-laboratorio).

## Dónde encaja con la compra
Tras **comprar péptidos** en la [tienda](${SITE}/tienda), el cálculo es el siguiente paso de QA interno — junto al [COA](${SITE}/certificados-coas).

${RUO}`,
  },
  {
    id: 'como-elegir-retatrutide-cagrilintide-semaglutide',
    title: '¿Cómo elegir entre retatrutide, cagrilintide y semaglutide para investigación?',
    image_url: IMG.data,
    created_at: '2026-09-18T08:00:00.000Z',
    content: `Labs que buscan **retatrutide comprar**, **cagrilintide precio** o semaglutide a menudo necesitan una comparación de *procurement*, no de clínica.

## Marco de decisión (solo laboratorio)
| Pregunta | Acción |
|----------|--------|
| ¿Qué andamiaje define el protocolo? | Abre la ficha exacta del compuesto |
| ¿Necesitas blend? | [Cagrilintide–semaglutide](${SITE}/producto/cagrilintide-semaglutide-blend) |
| ¿Comparación cruzada? | Pedir lotes con COA de cada uno |

## Dónde comprar cada uno
- [Retatrutide](${SITE}/producto/retatrutide) — *retatrutide spain*, *buy retatrutide*
- [Cagrilintide](${SITE}/producto/cagrilintide) — *dónde comprar cagrilintide*
- [Semaglutide](${SITE}/producto/semaglutide) — no confundir con retatrutide en SERP

## Cómo comprar sin canibalizar keywords
Usa la URL del compuesto que realmente necesitas. El catálogo general: [comprar peptidos en España](${SITE}/tienda).

## Fuentes externas
Para contexto científico general consulta bases como [PubMed](https://pubmed.ncbi.nlm.nih.gov/) o [PubChem](https://pubchem.ncbi.nlm.nih.gov/) — no sustituyen tu diseño experimental.

${RUO}`,
  },
];

async function main() {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    console.warn('Dry-run: missing SUPABASE_URL/VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.');
    console.warn(`Would upsert ${questionPosts.length} question posts:`);
    for (const p of questionPosts) {
      console.log(`  - ${p.id}: ${p.title}`);
    }
    return;
  }

  const supabase = createClient(url, key);
  console.log(`Upserting ${questionPosts.length} question SEO blog posts…`);

  for (const post of questionPosts) {
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
