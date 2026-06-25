import { config as loadEnv } from 'dotenv';
import { createClient } from '@supabase/supabase-js';

loadEnv({ path: '.env.local' });
loadEnv();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

/** Verified Unsplash covers (lab / research imagery). */
const IMG = {
  lab1: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1200',
  vials: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&q=80&w=1200',
  microscope: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=1200',
  pipette: 'https://images.unsplash.com/photo-1576085898323-218337e3e43c?auto=format&fit=crop&q=80&w=1200',
  dna: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&q=80&w=1200',
  pills: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=1200',
  cold: 'https://images.unsplash.com/photo-1576671081837-49000212a370?auto=format&fit=crop&q=80&w=1200',
  data: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1200',
  facility: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1200',
} as const;

const blogPosts = [
  {
    id: 'glp1-investigacion-metabolica',
    title: 'Péptidos GLP-1 en investigación metabólica: panorama para laboratorios europeos',
    image_url: IMG.pills,
    created_at: '2026-06-18T10:00:00.000Z',
    content: `Los agonistas del receptor GLP-1 —incluidas moléculas de referencia como semaglutida y tirzepatida— ocupan un lugar central en la investigación metabólica actual. En Research Peptides ES suministramos compuestos exclusivamente para uso en laboratorio, con documentación analítica por lote y envío desde España a toda la UE.

## ¿Por qué interesan a la investigación?
Los péptidos GLP-1 modulan vías relacionadas con la homeostasis glucémica, el apetito y la señalización incretínica. Los modelos in vitro y animales permiten estudiar farmacocinética, estabilidad y selectividad de receptor sin extrapolar a uso humano.

## Criterios de calidad en el catálogo
Cada referencia del catálogo se acompaña de especificaciones transparentes y, cuando está disponible, certificado de análisis (COA) con datos HPLC. Esto facilita la trazabilidad exigida en entornos académicos e industriales europeos.

## Manipulación y almacenamiento
Los péptidos liofilizados deben conservarse protegidos de la luz y la humedad, idealmente entre -20 °C y 2–8 °C según la ficha técnica. Tras la reconstitución, utilice agua bacteriostática y registre fecha y concentración en su cuaderno de laboratorio.

## Cómo empezar
Explore las categorías del catálogo, consulte la biblioteca COA y utilice nuestra calculadora de péptidos para planificar concentraciones antes de iniciar el ensayo.

Aviso: todos los productos son solo para investigación. No están destinados al consumo humano ni veterinario.`,
  },
  {
    id: 'coa-certificados-analisis-lote',
    title: 'COA y trazabilidad: por qué cada lote importa en investigación',
    image_url: IMG.data,
    created_at: '2026-06-15T10:00:00.000Z',
    content: `Un certificado de análisis (COA, por sus siglas en inglés) es la pieza documental que vincula un lote concreto con su perfil de pureza e identidad. En Research Peptides ES publicamos COA en la biblioteca del sitio para que su equipo pueda archivar evidencia analítica junto a cada pedido.

## Qué debe contener un COA fiable
Un informe completo incluye identificación del compuesto, número de lote, método analítico (HPLC, espectrometría de masas u otros), resultado de pureza, fecha de análisis y laboratorio emisor. Sin estos datos, reproducir un protocolo entre laboratorios es considerablemente más difícil.

## Trazabilidad en la cadena de suministro
Desde la recepción en Madrid hasta el envío en cadena de frío en la UE, documentamos el lote asignado a cada línea de pedido. Esto permite auditorías internas y alineación con buenas prácticas de laboratorio (BPL).

## Cómo acceder a los COA en el sitio
Visite la sección Biblioteca COA, busque por compuesto o lote y descargue el PDF correspondiente. Si necesita un documento adicional para un pedido histórico, contacte con info@researchpeptides.es.

## Buenas prácticas al archivar
Guarde el COA junto al registro de reconstitución, temperatura de almacenamiento y fecha de apertura del vial. La trazabilidad completa es la base de la ciencia reproducible.

Solo para investigación. No apto para consumo humano.`,
  },
  {
    id: 'envio-cadena-frio-ue',
    title: 'Envío en cadena de frío en la UE: logística desde España',
    image_url: IMG.cold,
    created_at: '2026-06-12T10:00:00.000Z',
    content: `La estabilidad de los péptidos liofilizados depende en gran medida de la temperatura durante el transporte. Research Peptides ES opera desde Madrid y envía a laboratorios en toda la Unión Europea con embalaje térmico y opciones de envío estándar o express.

## Por qué importa la cadena de frío
Las fluctuaciones térmicas pueden degradar péptidos sensibles antes de llegar al banco de laboratorio. Por eso seleccionamos embalajes aislados y, cuando el protocolo lo requiere, hielo seco o packs fríos según destino y estación del año.

## Plazos orientativos en la UE
El envío estándar suele entregarse en 3–7 días laborables; el express en 2–4 días. Los plazos exactos se confirman en el checkout según país y transportista (PostNL, DPD u otros partners europeos).

## Recepción en laboratorio
Al recibir el paquete, inspeccione el sellado, registre la temperatura de llegada si dispone de termómetro de laboratorio y almacene de inmediato según la ficha del producto (-20 °C o refrigeración 2–8 °C).

## Pedidos y seguimiento
Tras completar el pedido recibirá confirmación por correo. Para consultas logísticas, escriba a info@researchpeptides.es con su número de pedido.

Compuestos exclusivamente para investigación científica.`,
  },
  {
    id: 'almacenamiento-peptidos-liofilizados',
    title: 'Almacenamiento de péptidos liofilizados: temperatura, luz y estabilidad',
    image_url: IMG.facility,
    created_at: '2026-06-10T10:00:00.000Z',
    content: `Una vez recibido el vial, el almacenamiento correcto determina la integridad del péptido durante semanas o meses. Esta guía resume las recomendaciones generales aplicables al catálogo de Research Peptides ES.

## Antes de abrir el vial
Mantenga el polvo liofilizado en su envase original, alejado de la luz directa. La mayoría de referencias se conservan preferentemente a -20 °C; consulte siempre la ficha técnica del lote.

## Tras la reconstitución
Utilice agua bacteriostática (0,9 % alcohol bencilico) para estudios que requieran múltiples extracciones. Almacene a 2–8 °C y anote la fecha de mezcla. Evite ciclos repetidos de congelación-descongelación salvo indicación específica.

## Contaminación y manipulación
Limpie el tapón con alcohol isopropílico antes de cada punción. Emplee jeringas estériles de un solo uso y no agite enérgicamente: gire suavemente hasta disolver.

## Señales de degradación
Turbidez persistente, precipitado inusual o pérdida de solubilidad pueden indicar degradación. En ese caso, documente la incidencia y no utilice la muestra en ensayos críticos.

Consulte nuestro artículo sobre reconstitución y la calculadora de péptidos para planificar volúmenes y concentraciones.

Solo investigación. No consumo humano.`,
  },
  {
    id: 'hplc-espectrometria-masas',
    title: 'HPLC y espectrometría de masas: cómo leemos la pureza en laboratorio',
    image_url: IMG.microscope,
    created_at: '2026-06-08T10:00:00.000Z',
    content: `La pureza declarada en nuestro catálogo —habitualmente ≥ 99,8 %— se apoya en cromatografía líquida de alta resolución (HPLC) y, cuando procede, espectrometría de masas (EM). Esta nota explica qué significan esos datos para el investigador.

## HPLC: separación y cuantificación
La HPLC separa la fracción principal del péptido de impurezas relacionadas (deleción, epímeros, productos de oxidación). El porcentaje de área del pico principal se reporta como pureza. Un cromatograma limpio con un pico dominante es señal de lote homogéneo.

## Espectrometría de masas: identidad
La EM confirma que la masa molecular observada coincide con la secuencia esperada. Es especialmente valiosa en péptidos de cadena larga o modificados.

## Relación con el COA
Cada COA enlaza un lote con sus gráficos y valores numéricos. Archívelo con su protocolo experimental para satisfacer requisitos de auditoría o publicación.

## Limitaciones responsables
Los resultados analíticos describen el material tal como se recibió en el laboratorio certificador. El investigador debe validar idoneidad para su modelo específico (células, tejido, animal).

Visite la biblioteca COA de Research Peptides ES para descargar informes por compuesto.

Uso exclusivo en investigación.`,
  },
  {
    id: 'calculadora-peptidos-guia',
    title: 'Guía de la calculadora de péptidos para concentraciones de laboratorio',
    image_url: IMG.pipette,
    created_at: '2026-06-05T10:00:00.000Z',
    content: `Calcular correctamente la concentración tras reconstituir un vial liofilizado evita errores de dosificación en placas, cultivos o modelos animales. En researchpeptides.es ofrecemos una calculadora gratuita pensada para flujos de laboratorio.

## Datos que necesita
Conozca la cantidad total de péptido en el vial (por ejemplo, 5 mg o 10 mg), el volumen de diluyente que va a añadir (ml) y la dosis objetivo por aplicación (mcg o mg).

## Ejemplo práctico
Si reconstituye 10 mg con 2 ml de agua bacteriostática, la concentración es 5 mg/ml (5000 mcg/ml). Para aspirar 250 mcg, extraiga 0,05 ml (50 unidades en una jeringa de insulina U-100, según calibre).

## Buenas prácticas
Registre siempre lote, fecha de reconstitución y concentración final. No reutilice diluciones antiguas sin verificar estabilidad documentada.

## Enlace con el catálogo
Tras calcular su volumen, explore el catálogo para pedir agua bacteriostática, tapones y el compuesto de estudio con COA incluido.

Herramienta orientativa para investigación. No sustituye el juicio profesional del investigador principal.`,
  },
  {
    id: 'bpc-157-comprehensive-guide',
    title: '¿Qué es el BPC-157? Guía completa para investigadores',
    image_url: IMG.lab1,
    created_at: '2026-05-28T10:00:00.000Z',
    content: `El BPC-157 (Body Protection Compound-157) es un pentadécapeptido sintético de 15 aminoácidos, aislado originalmente del jugo gástrico humano. En investigación de laboratorio se estudia por su posible papel en la angiogénesis, la regulación de receptores de hormona del crecimiento y la reparación tisular en modelos in vitro y animales.

## Estructura molecular
La fórmula química del BPC-157 es C62H98N16O22. Este compuesto está destinado exclusivamente a investigación y flujos in vitro; no es para consumo humano.

## Sal arginato frente a acetato
Los estudios comparan versiones arginato y acetato del BPC-157. La sal arginato ha mostrado mayor estabilidad en modelos de jugo gástrico, relevante para ciertos diseños experimentales orales en animales.

## Mecanismos en estudios celulares
El BPC-157 puede upregular VEGFR2 y favorecer la migración de células endoteliales, lo que se asocia a formación de vasos y reparación de tendón, músculo y tejido nervioso en modelos controlados.

## Almacenamiento y reconstitución
Conserve el liofilizado a -20 °C. Tras reconstituir con agua bacteriostática, mantenga a 2–8 °C y utilice dentro de la ventana de estabilidad documentada.

Explore nuestro BPC-157 con pureza verificada y COA por lote en el catálogo de Research Peptides ES.

Solo investigación científica.`,
  },
  {
    id: 'reconstitute-research-peptides',
    title: 'Cómo reconstituir correctamente péptidos de investigación',
    image_url: IMG.vials,
    created_at: '2026-05-20T10:00:00.000Z',
    content: `Para reconstituir un péptido de investigación, desinfecte el tapón del vial, inyecte lentamente el volumen de agua bacteriostática por la pared de vidrio para evitar espuma y gire suavemente hasta disolver. Nunca agite con fuerza: puede dañar la cadena peptídica.

## Material necesario
- Vial liofilizado
- Agua bacteriostática (BAC)
- Jeringas estériles (1 ml o 3 ml)
- Toallitas con alcohol

## Pasos recomendados
1. Retire las tapas protectoras del vial y del diluyente.
2. Desinfecte ambos tapones con alcohol.
3. Aspire el volumen exacto de BAC necesario para su concentración objetivo.
4. Perfore el vial del péptido y dirija el chorro a la pared interna; vierta despacio.
5. Gire suavemente hasta disolución completa. No agite.

## Agua bacteriostática frente a agua estéril
El BAC contiene 0,9 % de alcohol bencilico, inhibe bacterias y permite usos múltiples durante semanas. El agua estéril carece de conservante y es de un solo uso.

## Cálculo de concentración
Si añade 2 ml de BAC a un vial de 10 mg, obtiene 5 mg/ml (5000 mcg/ml). Use nuestra calculadora de péptidos en el sitio para validar volúmenes antes del ensayo.

Productos solo para investigación. No consumo humano.`,
  },
  {
    id: 'tb-500-vs-bpc-157-synergistic-effects',
    title: 'TB-500 frente a BPC-157: efectos sinérgicos en modelos animales',
    image_url: IMG.dna,
    created_at: '2026-05-12T10:00:00.000Z',
    content: `Mientras el BPC-157 se asocia a angiogénesis y vías de reparación tendinosa, el TB-500 (timosina beta-4) regula la actina celular y favorece la migración celular. En modelos de investigación se combinan a menudo para estudiar curación tisular integral.

## ¿Qué es el TB-500?
Es una versión sintética de la timosina beta-4 natural, implicada en formación de vasos, migración celular y remodelación del citoesqueleto en experimentos controlados.

## Mecanismos comparados
El BPC-157 enfatiza angiogénesis y receptores de GH; el TB-500 se une a la actina y facilita el desplazamiento de células hacia zonas lesionadas en modelos animales.

## Aplicaciones sinérgicas
Al actuar por vías complementarias, ambos péptidos se administran en combinación en algunos protocolos preclínicos para lesiones musculoesqueléticas severas —siempre bajo aprobación ética institucional.

## Reconstitución conjunta
En laboratorio puede reconstituir por separado o emplear mezclas comerciales de investigación para mantener estabilidad y dosificación precisa.

Consulte las referencias BPC-157 y TB-500 en nuestro catálogo con documentación por lote.

Exclusivamente para investigación. No uso clínico.`,
  },
];

async function seed() {
  console.log(`Seeding ${blogPosts.length} blog posts (Spanish)…`);
  for (const post of blogPosts) {
    const { error } = await supabase.from('blog_posts').upsert(
      { ...post, updated_at: new Date().toISOString() },
      { onConflict: 'id' },
    );

    if (error) {
      console.error(`Error inserting "${post.id}":`, error.message);
    } else {
      console.log(`✓ ${post.title}`);
    }
  }
  console.log('Done.');
}

seed();
