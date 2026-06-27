/**
 * Audit and localize product descriptions to Spanish.
 *   npx tsx scripts/audit-product-descriptions.ts          # audit only
 *   npx tsx scripts/audit-product-descriptions.ts --apply  # write Spanish copy
 */
import { config as loadEnv } from 'dotenv';
import { createClient } from '@supabase/supabase-js';

loadEnv({ path: '.env.local' });

const ENGLISH_HINTS =
  /\b(research use only|supplied as|suitable for|designed for|built for|for laboratory|research peptide|research analog|research ligand|reference standard|premium research peptide|scraped from)\b/i;

const SPANISH_HINTS =
  /\b(de investigación|para uso|solo para|suministrado|diseñado|adecuado|listado|referencia|andamiaje|mezcla|péptido|gonadotropina|insulina|laboratorio|inyectable|suministro|fragmento|derivado|agonista|receptor|timosina|incretina|secretagoga|estabilizado|hidratante|biorregulador|liofilizado|estéril|viales)\b/i;

function looksEnglish(text: string): boolean {
  const desc = text.trim();
  if (!desc) return false;
  if (/^péptido de investigación premium/i.test(desc)) return false;
  if (SPANISH_HINTS.test(desc)) return false;
  if (/[áéíóúñ¿¡]/i.test(desc)) return false;
  return ENGLISH_HINTS.test(desc);
}
const SPANISH_BY_SLUG: Record<string, string> = {
  '5-amino-1mq':
    'Compuesto de investigación metabólica de molécula pequeña (listado como viales en polvo).',
  'bacteriostatic-water':
    'Diluyente estéril para reconstitución (listado con varios SKU).',
  'bpc-tb-blend-powder':
    'Mezcla liofilizada combinada de BPC / TB en un solo formato de presentación.',
  'bpc-157-ghk-cu-tb500-x-10-vials':
    'Mezcla multi-péptido con BPC-157, GHK-CU y TB500 en 10 viales liofilizados estériles.\n\nApta para ensayos in vitro estructurados e investigación de interacción entre compuestos.\n\nSolo para uso en investigación.',
  'bpc-157-tb500-x-10-vials':
    'Mezcla dual de BPC-157 y TB500 suministrada en 10 viales liofilizados estériles.\n\nDiseñada para protocolos de laboratorio controlados, validación de métodos y trabajo analítico repetible.\n\nSolo para uso en investigación.',
  'bpc-157-x-10-vials':
    'BPC-157 de alta pureza suministrado en 10 viales liofilizados estériles para flujos de trabajo de laboratorio.\n\nDiseñado para estudios controlados de estabilidad de péptidos y desarrollo de ensayos.\n\nSolo para uso en investigación.',
  'bpc-157-ghk-cu-tb500-kpv-blend-80mg':
    'Mezcla liofilizada multi-componente según el listado.',
  'bpc-157-ghk-cu-tb500-blend-70mg':
    'Mezcla liofilizada multi-componente según el listado.',
  'diosa-glow-70mg-prefilled-pen':
    'Mezcla de investigación con BPC-157, TB500 y GHK-CU en formato de pluma precargada de 70 mg.\n\nDiseñada para manipulación precisa y configuración experimental consistente en entornos de laboratorio.\n\nSolo para uso en investigación.',
  'ghk-cu-x-10-vials':
    'Triptípido de cobre (GHK-CU) suministrado en 10 viales liofilizados estériles.\n\nAdecuado para análisis de interacción péptido-metal y ensayos bioquímicos controlados.\n\nSolo para uso en investigación.',
  'hcg-x-10-vials':
    'HCG suministrado en 10 viales liofilizados estériles para aplicaciones estructuradas de laboratorio.\n\nPreparado para flujos analíticos, validación de protocolos y manipulación reproducible.\n\nSolo para uso en investigación.',
  'hgh-191aa-somatropin':
    'Material de referencia liofilizado de clase somatropina (191 AA). Exclusivamente para investigación de laboratorio cualificada.',
  'mots-c-x-10-vials':
    'Péptido MOTS-c suministrado en 10 viales liofilizados estériles para investigación de laboratorio.\n\nOptimizado para estudios de señalización metabólica y flujos analíticos controlados.\n\nSolo para uso en investigación.',
  'mt-2-melanotan-2-acetate':
    'Agonista del receptor de melanocortina (sal acetato). Solo para uso en investigación.',
  nad: 'Viales a granel de nicotinamida adenina dinucleótido (NAD+).',
  selank:
    'Péptido ansiolítico nootrópico para estudios neuroquímicos.',
  tesamorelin:
    'Análogo de GHRH para contextos de investigación sobre adiposidad visceral.',
  'tirzepatide-100mg-one-vial':
    'Vial único liofilizado de Tirzepatida 100 mg para protocolos avanzados de laboratorio.\n\nApto para investigación de péptidos centrada en receptores y estabilidad en entornos controlados.\n\nSolo para uso en investigación.',
  'vio-labs-retatrutide-40mg-3ml-prefilled-pen':
    'Pluma precargada de Retatrutida 40 mg / 3 ml diseñada para manipulación precisa en laboratorio.\n\nOfrece un formato de dosificación consistente para flujos analíticos estructurados y desarrollo de métodos.\n\nSolo para uso en investigación.',
  'ace-031': 'Ligando de investigación de la vía de la miostatina.',
  adamax: 'Análogo de investigación derivado de Semax.',
  adipotide: 'Péptido de investigación proapoptótico.',
  'ahk-cu': 'Análogo de tripéptido con unión al cobre.',
  aicar: 'Modulador de la vía AMPK (investigación).',
  alprostadil: 'Análogo de prostaglandina E1.',
  aod9604: 'Péptido de investigación metabólica de clase fragmento de HGH.',
  'ara-290': 'Péptido derivado de eritropoyetina.',
  'botulinum-toxin-100iu':
    'Pack de viales de referencia de neuromodulador (investigación).',
  'bpc-157': 'Andamiaje de compuesto pentadecapéptido de protección corporal.',
  cagrilintide: 'Análogo de amilina de acción prolongada (investigación).',
  'cagrilintide-semaglutide-blend':
    'Vial de mezcla combinada relacionada con incretinas.',
  cerebrolysin: 'Listado de mezcla derivada de neuropéptidos.',
  'cjc-1295-no-dac-ipamorelin-blend':
    'Mezcla secretagoga combinada en un solo formato de vial.',
  'cjc-1295-with-dac': 'Análogo de GHRH de vida media extendida (DAC).',
  'cjc-1295-without-dac':
    'Andamiaje de análogo GHRH sin complejo de afinidad farmacológica.',
  dermorphin: 'Análogo de heptapéptido opioide.',
  dsip: 'Estándar de referencia de péptido inductor del sueño delta.',
  epithalon: 'Péptido de investigación de la vía de la telomerasa.',
  epo: 'Listado de clase eritropoyetina (investigación).',
  follistatin: 'Proteína de unión / andamiaje regulador.',
  'foxo4-dri': 'Péptido de investigación de la vía de senescencia celular.',
  'gdf-8-myostatin': 'Andamiaje de propéptido de miostatina.',
  'ghk-cu': 'Complejo de tripéptido de cobre.',
  'ghrp-2-acetate':
    'Péptido secretagogo de hormona de crecimiento (sal acetato).',
  'ghrp-6-acetate':
    'Péptido secretagogo de hormona de crecimiento (sal acetato).',
  'glp-1-5mg-vial': 'Clase de agonista del receptor GLP-1 (formato listado).',
  glutathione: 'Referencia a granel de tripéptido antioxidante.',
  'gonadorelin-acetate': 'Péptido análogo de GnRH.',
  hcg: 'Andamiaje de gonadotropina (pureza indicada en UI). Solo para uso en investigación.',
  'hexarelin-acetate': 'Hexapéptido sintético de clase GHRP (acetato).',
  'hgh-fragment-176-191':
    'Material de referencia de fragmento aislado del extremo C-terminal.',
  hmg: 'Mezcla de gonadotropinas (UI indicadas).',
  'hyaluronic-acid': 'Referencia de hidratante de glicosaminoglicano.',
  'igf-1-lr3':
    'Análogo de factor de crecimiento similar a la insulina de acción prolongada.',
  'igf-des': 'Análogo de variante corta de IGF.',
  'insulin-3ml':
    'Listado de referencia de insulina inyectable (suministro de laboratorio).',
  ipamorelin: 'Pentapéptido secretagogo selectivo de GH.',
  'kisspeptin-10': 'Análogo de fragmento de kisspeptina.',
  kpv: 'Fragmento tripéptido antiinflamatorio.',
  'lemon-bottle': 'Accesorio del catálogo (suministro de investigación).',
  'll-37': 'Péptido antimicrobiano de clase catelicidina.',
  mazdutide: 'Clase coagonista GLP-1 / glucagón (investigación).',
  melatonin: 'Estándar de referencia de hormona indolamina.',
  mgf: 'Análogo de variante por splicing del factor de crecimiento mecánico.',
  'mots-c': 'Péptido de señalización codificado mitocondrial.',
  'mt-1': 'Péptido melanotrópico sintético.',
  'n-acetyl-epitalon-amidate': 'Derivado estabilizado de epitalon.',
  'oxytocin-acetate': 'Análogo de hormona nonapéptida (acetato).',
  p21: 'Andamiaje de péptido neurogénico.',
  'pe-22-28': 'Péptido de investigación de la vía del factor tisular.',
  'peg-mgf': 'Análogo PEGilado del factor de crecimiento mecánico.',
  pinealon: 'Tripéptido biorregulador.',
  'pnc-27': 'Análogo de péptido de investigación oncolítico.',
  'pt-141': 'Agonista del receptor de melanocortina.',
  retatrutide:
    'Andamiaje triple agonista de receptores GLP-1 / GIP / glucagón (investigación).',
  'retatrutide-cagrilintide-blend':
    'Vial de mezcla combinada de agonistas metabólicos.',
  semaglutide: 'Andamiaje de agonista del receptor GLP-1 (investigación).',
  semax: 'Andamiaje de neuropéptido derivado de ACTH.',
  'sermorelin-acetate': 'Análogo secretagogo de fragmento GHRH.',
  'slu-pp-332': 'Molécula pequeña de investigación agonista ERR.',
  'snap-8':
    'Péptido de investigación cosmética mimético de neurotransmisor-SNARE.',
  'ss-31': 'Tetrapéptido dirigido a mitocondrias.',
  survodutide: 'Clase de agonista dual GCGR / GLP-1 (investigación).',
  'tb500-frag': 'Andamiaje de fragmento de timosina beta.',
  'tb500-thymosin-beta-4-acetate':
    'Análogo de fragmento de timosina con unión a actina.',
  testagen: 'Listado de péptido de investigación.',
  thymalin: 'Análogo de complejo de péptidos tímico.',
  'thymosin-alpha-1': 'Péptido tímico inmunomodulador.',
  tirzepatide: 'Andamiaje de agonista dual GIP/GLP-1 (investigación).',
  vilon: 'Dipéptido biorregulador.',
  vip: 'Péptido intestinal vasoactivo.',
};

async function main() {
  const apply = process.argv.includes('--apply');
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error('Missing Supabase credentials.');
    process.exit(1);
  }

  const supabase = createClient(url, key);
  const { data, error } = await supabase
    .from('products')
    .select('id, title, slug, description')
    .order('title');

  if (error) throw error;

  const rows = data ?? [];
  const englishRows = rows.filter((p) => looksEnglish(String(p.description ?? '')));

  console.log(`Total products: ${rows.length}`);
  console.log(`English descriptions: ${englishRows.length}`);

  let updated = 0;
  let missing = 0;

  for (const p of englishRows) {
    const slug = String(p.slug);
    const spanish = SPANISH_BY_SLUG[slug];

    if (!spanish) {
      missing++;
      console.warn(`No Spanish mapping for: ${slug}`);
      console.warn(`  EN: ${String(p.description).slice(0, 100)}`);
      continue;
    }

    if (!apply) {
      console.log(`\n${slug}:`);
      console.log(`  → ${spanish.replace(/\n/g, ' | ')}`);
      continue;
    }

    const { error: updateError } = await supabase
      .from('products')
      .update({ description: spanish })
      .eq('id', p.id);

    if (updateError) {
      console.warn(`Skip ${slug}:`, updateError.message);
      continue;
    }
    updated++;
  }

  if (apply) {
    console.log(`Updated ${updated} descriptions to Spanish.`);
    if (missing) console.warn(`${missing} products still need manual translation.`);
  } else if (englishRows.length) {
    console.log('\nRun with --apply to write changes.');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
