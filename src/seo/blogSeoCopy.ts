import type { LocaleCode } from '../i18n/locales';

export type BlogSeoFaq = { question: string; answer: string };

export type BlogSeoCopy = {
  documentTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  answerCapsule: string;
  faqs: BlogSeoFaq[];
};

const RUO =
  'Solo para investigación. No consumo humano ni veterinario.';

const COPY: Record<string, BlogSeoCopy> = {
  'reconstitucion-peptidos-laboratorio': {
    documentTitle: 'Reconstitución de péptidos liofilizados | laboratorio',
    metaDescription:
      'Cómo reconstituir péptidos liofilizados en el laboratorio: pasos, diluyente y calculadora. Uso exclusivo de investigación, España/UE.',
    primaryKeyword: 'reconstitución de péptidos liofilizados',
    secondaryKeywords: [
      'cómo reconstituir péptidos',
      'agua bacteriostática reconstitución péptidos',
      'calculadora de péptidos',
    ],
    answerCapsule:
      'La reconstitución convierte un péptido liofilizado en solución de trabajo según el SOP del laboratorio. Se añade el diluyente calculado, se gira suavemente y se etiqueta lote, concentración y fecha. Research Peptides ES lo documenta para investigación; no es posología humana.',
    faqs: [
      {
        question: '¿Qué diluyente se usa para reconstituir péptidos de investigación?',
        answer:
          'El SOP del centro decide. Con frecuencia se usa agua bacteriostática o agua estéril. La calculadora del sitio solo apoya el volumen; no sustituye el protocolo validado.',
      },
      {
        question: '¿Se puede agitar el vial con fuerza?',
        answer:
          'No. La agitación vigorosa puede generar espuma y dañar la cadena. Gire suavemente hasta disolver.',
      },
      {
        question: '¿Es para uso humano?',
        answer: RUO,
      },
    ],
  },
  'como-leer-coa-peptidos': {
    documentTitle: 'Cómo leer un COA de péptidos | HPLC y lote',
    metaDescription:
      'Cómo leer un certificado de análisis (COA) de péptidos: lote, HPLC, pureza e identidad. Biblioteca COA para labs en España.',
    primaryKeyword: 'cómo leer un COA de péptido',
    secondaryKeywords: [
      'certificado de análisis COA péptidos',
      'pureza HPLC péptidos',
      'biblioteca COA péptidos',
    ],
    answerCapsule:
      'Un COA vincula un lote de péptido de investigación con método (p. ej. HPLC), resultado de pureza, fecha y laboratorio emisor. No implica eficacia clínica. Archive el PDF junto al albarán y el registro de reconstitución.',
    faqs: [
      {
        question: '¿La pureza HPLC significa que el péptido es un medicamento?',
        answer:
          'No. El porcentaje HPLC describe el perfil cromatográfico del lote analizado. No autoriza uso humano.',
      },
      {
        question: '¿Dónde descargo el COA?',
        answer:
          'En la biblioteca COA del sitio o pidiendo el lote a soporte. Compare también COA vs sin COA.',
      },
      { question: '¿Uso clínico?', answer: RUO },
    ],
  },
  'cadena-frio-peptidos-ue': {
    documentTitle: 'Cadena de frío péptidos UE | envío desde España',
    metaDescription:
      'Cadena de frío para envío de péptidos en la UE: embalaje térmico, plazos y recepción en lab. Envío desde España.',
    primaryKeyword: 'cadena de frío péptidos envío UE',
    secondaryKeywords: [
      'envío péptidos España',
      'logística péptidos liofilizados',
      'embalaje térmico laboratorio',
    ],
    answerCapsule:
      'Los péptidos liofilizados se envían desde Madrid con embalaje térmico para limitar fluctuaciones. Al recibir el paquete, inspeccione el sellado y almacene según la ficha. Plazos y opciones constan en la página de envío.',
    faqs: [
      {
        question: '¿Cuánto tarda el envío a un lab en la UE?',
        answer:
          'Orientativamente 3–7 días estándar y 2–4 express, confirmado en checkout según país.',
      },
      {
        question: '¿Qué hago al recibir el paquete?',
        answer:
          'Revise el sellado, registre temperatura si puede y almacene de inmediato según SOP (-20 °C o 2–8 °C).',
      },
      { question: '¿Uso humano?', answer: RUO },
    ],
  },
  'uso-exclusivo-investigacion-cumplimiento': {
    documentTitle: 'Péptidos solo para investigación | cumplimiento RUO',
    metaDescription:
      'Uso exclusivo para investigación: límites del catálogo RUO, sin consumo humano ni veterinario. Cumplimiento para labs UE.',
    primaryKeyword: 'péptidos solo para investigación',
    secondaryKeywords: [
      'cumplimiento uso exclusivo investigación',
      'faq péptidos investigación',
      'términos RUO',
    ],
    answerCapsule:
      'Todo el catálogo de Research Peptides ES se suministra como material RUO para protocolos de laboratorio. No hay indicaciones clínicas, dosis humanas ni uso veterinario. Los términos y la FAQ detallan el marco de cumplimiento.',
    faqs: [
      {
        question: '¿Puedo usar estos péptidos en personas?',
        answer: 'No. ' + RUO,
      },
      {
        question: '¿Dónde está el marco legal del sitio?',
        answer: 'En términos, FAQ y la política de privacidad (RGPD).',
      },
      {
        question: '¿Sirve para pedidos institucionales?',
        answer:
          'Sí: documentación de lote, COA y facturación a laboratorios en España/UE.',
      },
    ],
  },
  'glp1-investigacion-metabolica': {
    documentTitle: 'Péptidos GLP-1 investigación metabólica | laboratorio UE',
    metaDescription:
      'Péptidos GLP-1 en investigación metabólica para laboratorios europeos: semaglutida, retatrutide, COA y RUO.',
    primaryKeyword: 'semaglutida investigación laboratorio',
    secondaryKeywords: [
      'péptidos GLP-1 investigación',
      'retatrutide españa',
      'investigación peptídica Europa',
    ],
    answerCapsule:
      'Los agonistas GLP-1 de referencia (p. ej. semaglutida, retatrutide) se estudian en modelos de laboratorio. Research Peptides ES los ofrece solo como material RUO con COA de lote y envío UE — sin claims clínicos.',
    faqs: [
      {
        question: '¿GLP-1 del catálogo es un fármaco listo para pacientes?',
        answer: 'No. Es material de referencia para investigación. ' + RUO,
      },
      {
        question: '¿Relacionados en el catálogo?',
        answer:
          'Retatrutide, semaglutide y blends cagrilintide–semaglutide, cada uno en su ficha.',
      },
      {
        question: '¿Hay COA?',
        answer: 'Cuando está disponible, en la biblioteca COA por lote.',
      },
    ],
  },
  'coa-certificados-analisis-lote': {
    documentTitle: 'COA y trazabilidad de lote | péptidos investigación',
    metaDescription:
      'Por qué cada lote de péptidos de investigación necesita COA: HPLC, identidad y archivo para labs europeos.',
    primaryKeyword: 'certificado de análisis COA péptidos',
    secondaryKeywords: [
      'biblioteca COA péptidos',
      'trazabilidad de lote',
      'COA vs sin COA péptidos',
    ],
    answerCapsule:
      'El COA es el documento que une un lote con pureza e identidad analítica. Sin lote + método + fecha, la trazabilidad entre laboratorios se rompe. Archive el PDF con el protocolo.',
    faqs: [
      {
        question: '¿Qué debe incluir un COA fiable?',
        answer:
          'Compuesto, número de lote, método (HPLC/EM), resultado, fecha y laboratorio emisor.',
      },
      {
        question: '¿Dónde lo obtengo?',
        answer: 'Biblioteca COA del sitio o soporte con el número de lote.',
      },
      { question: '¿Uso humano?', answer: RUO },
    ],
  },
  'envio-cadena-frio-ue': {
    documentTitle: 'Envío cadena de frío UE | péptidos desde Madrid',
    metaDescription:
      'Envío de péptidos en cadena de frío desde España a labs UE: embalaje, plazos y recepción.',
    primaryKeyword: 'envío péptidos España',
    secondaryKeywords: [
      'cadena de frío péptidos envío UE',
      'logística Madrid laboratorio',
      'recepción péptidos liofilizados',
    ],
    answerCapsule:
      'Research Peptides ES envía desde Madrid con embalaje térmico para péptidos liofilizados. Inspeccione el paquete al llegar y almacene según ficha. Detalles de plazos en la página de envío.',
    faqs: [
      {
        question: '¿Hay express a la UE?',
        answer: 'Sí, según país y transportista; se confirma en el checkout.',
      },
      {
        question: '¿Qué registrar en recepción?',
        answer: 'Sellado, lote, y temperatura de llegada si el SOP lo pide.',
      },
      { question: '¿Uso humano?', answer: RUO },
    ],
  },
  'almacenamiento-peptidos-liofilizados': {
    documentTitle: 'Almacenamiento de péptidos liofilizados | lab',
    metaDescription:
      'Almacenamiento de péptidos liofilizados: temperatura, luz y estabilidad antes y después de reconstituir. Solo investigación.',
    primaryKeyword: 'almacenamiento péptidos liofilizados',
    secondaryKeywords: [
      'estabilidad péptidos laboratorio',
      'reconstitución de péptidos liofilizados',
      'agua bacteriostática reconstitución péptidos',
    ],
    answerCapsule:
      'El liofilizado se guarda en envase original, protegido de luz y humedad, a menudo a -20 °C. Tras reconstituir, el SOP fija 2–8 °C y la ventana de uso. Evite ciclos de congelación-descongelación no validados.',
    faqs: [
      {
        question: '¿Temperatura típica del polvo?',
        answer:
          'Muchas fichas indican -20 °C; confirme siempre el lote y la ficha técnica.',
      },
      {
        question: '¿Y después de reconstituir?',
        answer:
          'Suele refrigerarse (2–8 °C) con fecha de mezcla anotada. Siga su SOP.',
      },
      { question: '¿Uso humano?', answer: RUO },
    ],
  },
  'hplc-espectrometria-masas': {
    documentTitle: 'HPLC y pureza de péptidos | espectrometría de masas',
    metaDescription:
      'Qué significan HPLC y espectrometría de masas en un COA de péptidos de investigación. Pureza vs identidad.',
    primaryKeyword: 'pureza HPLC péptidos',
    secondaryKeywords: [
      'espectrometría de masas péptidos',
      'cómo leer un COA de péptido',
      'biblioteca COA péptidos',
    ],
    answerCapsule:
      'HPLC estima la fracción del pico principal frente a impurezas relacionadas. La espectrometría de masas confirma la masa esperada. Ambos describen el material analizado, no un uso clínico.',
    faqs: [
      {
        question: '¿99,8 % HPLC es “calidad clínica”?',
        answer:
          'No. Es un dato analítico del lote. El investigador valida idoneidad para su modelo.',
      },
      {
        question: '¿Dónde veo los gráficos?',
        answer: 'En el COA del lote, descargable en la biblioteca.',
      },
      { question: '¿Uso humano?', answer: RUO },
    ],
  },
  'calculadora-peptidos-guia': {
    documentTitle: 'Guía calculadora de péptidos | concentraciones lab',
    metaDescription:
      'Guía de la calculadora de péptidos: mg, ml y concentración de trabajo para reconstitución de laboratorio.',
    primaryKeyword: 'calculadora de péptidos',
    secondaryKeywords: [
      'calculadora peptidos',
      'reconstitución de péptidos liofilizados',
      'concentración mg/ml laboratorio',
    ],
    answerCapsule:
      'La calculadora convierte masa del vial y volumen de diluyente en concentración de trabajo. Es una ayuda volumétrica: no sustituye el SOP ni indica dosis humanas.',
    faqs: [
      {
        question: '¿Qué datos necesito?',
        answer: 'Masa del vial (mg), volumen de diluyente (ml) y unidad objetivo del protocolo.',
      },
      {
        question: '¿Dónde está la herramienta?',
        answer: 'En /calculadora-de-peptidos, enlazada desde la guía y este artículo.',
      },
      { question: '¿Uso humano?', answer: RUO },
    ],
  },
  'bpc-157-comprehensive-guide': {
    documentTitle: 'BPC-157 investigación | guía para laboratorios',
    metaDescription:
      'Qué es el BPC-157 en investigación: pentadécapeptido de referencia, COA y framing RUO. No uso clínico.',
    primaryKeyword: 'BPC-157 investigación',
    secondaryKeywords: [
      'bpc 157 peptide',
      'BPC-157 laboratorio España',
      'TB-500 frente a BPC-157',
    ],
    answerCapsule:
      'BPC-157 es un pentadécapeptido sintético usado como material de referencia en investigación. Research Peptides ES lo suministra liofilizado con soporte de COA. No hay indicación terapéutica ni consumo humano.',
    faqs: [
      {
        question: '¿BPC-157 del catálogo es un fármaco?',
        answer: 'No. Es material RUO de laboratorio.',
      },
      {
        question: '¿Relacionado con TB-500?',
        answer:
          'Son referencias distintas; hay un artículo comparativo de modelos. Elija según el diseño experimental.',
      },
      { question: '¿Uso humano?', answer: RUO },
    ],
  },
  'reconstitute-research-peptides': {
    documentTitle: 'Cómo reconstituir péptidos de investigación | SOP',
    metaDescription:
      'Pasos para reconstituir péptidos de investigación con agua bacteriostática. Calculadora y framing RUO.',
    primaryKeyword: 'cómo reconstituir péptidos de investigación',
    secondaryKeywords: [
      'reconstitución de péptidos liofilizados',
      'agua bacteriostatica comprar',
      'calculadora peptidos',
    ],
    answerCapsule:
      'Desinfecte el tapón, añada el diluyente por la pared del vial y gire suavemente. No agite. Calcule el volumen con la calculadora y etiquete lote y concentración. Solo investigación.',
    faqs: [
      {
        question: '¿BAC o agua estéril?',
        answer:
          'El BAC suele usarse si el SOP contempla varias extracciones. El agua estéril es de un solo uso. Decide el protocolo interno.',
      },
      {
        question: '¿Dónde compro agua bacteriostática de lab?',
        answer: 'Ficha de agua bacteriostática en el catálogo — suministro RUO, no farmacia clínica.',
      },
      { question: '¿Uso humano?', answer: RUO },
    ],
  },
  'tb-500-vs-bpc-157-synergistic-effects': {
    documentTitle: 'TB-500 vs BPC-157 | modelos de investigación',
    metaDescription:
      'TB-500 frente a BPC-157 en modelos animales e in vitro: vías distintas, framing RUO, sin claims clínicos.',
    primaryKeyword: 'TB-500 frente a BPC-157',
    secondaryKeywords: [
      'BPC-157 investigación',
      'TB-500 investigación',
      'péptidos laboratorio España',
    ],
    answerCapsule:
      'BPC-157 y TB-500 (timosina beta-4) son materiales de referencia distintos. Se estudian por vías complementarias en modelos controlados. La elección es experimental, no clínica.',
    faqs: [
      {
        question: '¿Debo comprar ambos juntos?',
        answer:
          'Solo si el protocolo institucional lo define. Cada ficha y lote se documenta por separado.',
      },
      {
        question: '¿Hay claims de curación humana?',
        answer: 'No. ' + RUO,
      },
      {
        question: '¿Dónde están en el catálogo?',
        answer: 'BPC-157 y TB-500 / TB500 frag en la tienda, con COA cuando exista.',
      },
    ],
  },
  'donde-comprar-retatrutide-espana': {
    documentTitle: 'Dónde comprar retatrutide en España | laboratorio',
    metaDescription:
      'Dónde comprar retatrutide en España para investigación: ficha, precio, COA y envío UE. Solo laboratorio.',
    primaryKeyword: 'dónde comprar retatrutide en España',
    secondaryKeywords: [
      'retatrutide comprar',
      'retatrutide españa',
      'comprar retatrutide',
    ],
    answerCapsule:
      'Retatrutide para laboratorio se pide en la ficha de producto de Research Peptides ES, con variantes, COA de lote y envío a España/UE. Es material RUO: no es un medicamento de farmacia.',
    faqs: [
      {
        question: '¿Dónde está la ficha?',
        answer: 'En /producto/retatrutide. El catálogo general está en la tienda.',
      },
      {
        question: '¿Hay precio visible?',
        answer: 'Sí, por variante en EUR. “Barato” solo como transparencia de precio, no claim clínico.',
      },
      { question: '¿Uso humano?', answer: RUO },
    ],
  },
  'como-comprar-peptidos-investigacion-espana': {
    documentTitle: 'Cómo comprar péptidos de investigación en España',
    metaDescription:
      'Cómo comprar péptidos en España para el lab: COA, cadena de frío y tienda RUO. Péptidos comprar en línea.',
    primaryKeyword: 'comprar peptidos en España',
    secondaryKeywords: [
      'péptidos comprar en linea',
      'comprar peptidos',
      'peptidos españa',
    ],
    answerCapsule:
      'Comprar péptidos de investigación en España es un proceso de procurement de laboratorio: elija el compuesto, verifique COA, confirme envío en frío y archive el lote. Research Peptides ES opera desde Madrid. No es dispensación clínica.',
    faqs: [
      {
        question: '¿Por dónde empiezo?',
        answer: 'Catálogo /tienda, luego ficha del compuesto y biblioteca COA.',
      },
      {
        question: '¿Qué es “inyectables” aquí?',
        answer:
          'Formato de vial para reconstitución bajo SOP, no vía de administración humana.',
      },
      { question: '¿Uso humano?', answer: RUO },
    ],
  },
  'donde-comprar-cagrilintide-laboratorio': {
    documentTitle: 'Dónde comprar cagrilintide | investigación',
    metaDescription:
      'Dónde comprar cagrilintide para laboratorio: precio, COA y blends. Framing RUO, envío España/UE.',
    primaryKeyword: 'dónde comprar cagrilintide',
    secondaryKeywords: [
      'cagrilintide precio',
      'cagrilintide venta',
      'comprar original cagrilintide',
    ],
    answerCapsule:
      'Cagrilintide de investigación se ofrece solo o en blend con semaglutide. Pida por ficha de producto, archive el COA y no lo trate como fármaco de farmacia.',
    faqs: [
      {
        question: '¿Solo o blend?',
        answer:
          'Depende del protocolo. Hay ficha de cagrilintide y de cagrilintide–semaglutide.',
      },
      {
        question: '¿Cómo verifico el lote?',
        answer: 'Número de lote + PDF en la biblioteca COA.',
      },
      { question: '¿Uso humano?', answer: RUO },
    ],
  },
  'por-que-agua-bacteriostatica-laboratorio': {
    documentTitle: 'Agua bacteriostática de laboratorio | no farmacia',
    metaDescription:
      'Por qué el agua bacteriostática del catálogo es suministro de lab, no de farmacia clínica. Comprar BAC RUO.',
    primaryKeyword: 'agua bacteriostatica comprar',
    secondaryKeywords: [
      'agua bacteriostática farmacia',
      'bacteriostatic water',
      'agua bacteriostática para inyección',
    ],
    answerCapsule:
      'El agua bacteriostática de Research Peptides ES es un reactivo de laboratorio para reconstitución según SOP. No sustituye una dispensación de farmacia comunitaria ni un uso clínico humano.',
    faqs: [
      {
        question: '¿Es el mismo producto que “farmacia”?',
        answer:
          'No en nuestro framing: aquí es suministro RUO. Quien busca farmacia clínica debe entender esa diferencia.',
      },
      {
        question: '¿Con qué se usa?',
        answer:
          'Con péptidos liofilizados cuando el SOP lo indica, más calculadora y guía de reconstitución.',
      },
      { question: '¿Uso humano?', answer: RUO },
    ],
  },
  'como-comprar-folistatina-investigacion': {
    documentTitle: 'Cómo comprar folistatina (follistatin) | lab',
    metaDescription:
      'Cómo comprar folistatina / follistatin para investigación: ficha, COA y envío UE. Solo laboratorio.',
    primaryKeyword: 'folistatina comprar',
    secondaryKeywords: [
      'follistatin venta',
      'follistatin investigación',
      'igf-1 comprar',
    ],
    answerCapsule:
      'Folistatina (follistatin) se pide en la ficha de catálogo RUO. Verifique presentación, COA y reconstitución según SOP. Relaciónese con IGF-1 u otros solo si el protocolo lo exige.',
    faqs: [
      {
        question: '¿Dónde está el producto?',
        answer: 'Ficha /producto/follistatin y tienda general.',
      },
      {
        question: '¿Hay COA?',
        answer: 'Solicítelo o descárguelo en la biblioteca cuando el lote esté publicado.',
      },
      { question: '¿Uso humano?', answer: RUO },
    ],
  },
  'donde-comprar-igf-1-lr3-espana': {
    documentTitle: 'Dónde comprar IGF-1 LR3 en España | igf-1',
    metaDescription:
      'Dónde comprar IGF-1 LR3 (igf-1 comprar) en España para investigación: COA, variantes y envío.',
    primaryKeyword: 'igf-1 comprar',
    secondaryKeywords: [
      'IGF-1 LR3 España',
      'péptidos comprar en linea',
      'folistatina comprar',
    ],
    answerCapsule:
      'IGF-1 LR3 de investigación se adquiere en la ficha dedicada, con COA y envío a labs en España/UE. No es un producto de farmacia. Archive lote y condiciones de almacenamiento.',
    faqs: [
      {
        question: '¿URL del producto?',
        answer: '/producto/igf-1-lr3',
      },
      {
        question: '¿Relacionados?',
        answer: 'Folistatina y frag 176-191 si el diseño experimental lo contempla.',
      },
      { question: '¿Uso humano?', answer: RUO },
    ],
  },
  'como-comprar-peptidos-inyectables-lab': {
    documentTitle: 'Péptidos inyectables comprar | solo laboratorio',
    metaDescription:
      'Cómo comprar péptidos inyectables para investigación: viales RUO, COA y reconstitución. No uso clínico.',
    primaryKeyword: 'péptidos inyectables comprar',
    secondaryKeywords: [
      'comprar peptidos en españa',
      'agua bacteriostatica comprar',
      'calculadora peptidos',
    ],
    answerCapsule:
      '“Inyectables” en este catálogo significa vial liofilizado para reconstitución bajo SOP de laboratorio, no una indicación clínica. Compre en la tienda, archive el COA y lea los términos RUO.',
    faqs: [
      {
        question: '¿Implica inyección humana?',
        answer: 'No. ' + RUO,
      },
      {
        question: '¿Qué más necesito?',
        answer:
          'Diluyente según SOP (a menudo agua bacteriostática) y la calculadora para volúmenes.',
      },
      {
        question: '¿Dónde comprar en España?',
        answer: 'Research Peptides ES (Madrid) — tienda online con envío UE.',
      },
    ],
  },
  'por-que-calculadora-peptidos-antes-reconstituir': {
    documentTitle: 'Por qué usar la calculadora de péptidos | lab',
    metaDescription:
      'Por qué calcular volúmenes antes de reconstituir: evita errores de concentración. Calculadora peptidos RUO.',
    primaryKeyword: 'calculadora peptidos',
    secondaryKeywords: [
      'calculadora de péptidos',
      'reconstitución de péptidos liofilizados',
      'cómo reconstituir péptidos',
    ],
    answerCapsule:
      'Un error de orden de magnitud invalida el ensayo. La calculadora traduce mg y ml a concentración de trabajo. Apoya el SOP; no indica dosis humanas.',
    faqs: [
      {
        question: '¿Sustituye al SOP?',
        answer: 'No. Es apoyo volumétrico y de etiquetado.',
      },
      {
        question: '¿Qué sigue después de comprar?',
        answer:
          'COA + cálculo + reconstitución documentada + almacenamiento según ficha.',
      },
      { question: '¿Uso humano?', answer: RUO },
    ],
  },
  'como-elegir-retatrutide-cagrilintide-semaglutide': {
    documentTitle: 'Retatrutide vs cagrilintide vs semaglutide | lab',
    metaDescription:
      'Cómo elegir entre retatrutide, cagrilintide y semaglutide para investigación: fichas, COA y compra RUO.',
    primaryKeyword: 'retatrutide cagrilintide semaglutide investigación',
    secondaryKeywords: [
      'retatrutide comprar',
      'cagrilintide precio',
      'semaglutide investigación',
    ],
    answerCapsule:
      'La elección entre retatrutide, cagrilintide y semaglutide es de diseño experimental, no clínica. Abra la ficha exacta, pida COA de cada lote y evite canibalizar URLs en la SERP.',
    faqs: [
      {
        question: '¿Puedo mezclar keywords en una sola URL?',
        answer:
          'No: use la ficha del compuesto que el protocolo pide. El catálogo general es la tienda.',
      },
      {
        question: '¿Hay blend?',
        answer: 'Sí, cagrilintide–semaglutide en ficha propia.',
      },
      { question: '¿Uso humano?', answer: RUO },
    ],
  },
};

function fallbackFromTitle(title: string): BlogSeoCopy {
  const trimmed = title.replace(/\s+/g, ' ').trim() || 'Artículo de investigación';
  const short = trimmed.length > 55 ? `${trimmed.slice(0, 52)}…` : trimmed;
  return {
    documentTitle: short,
    metaDescription: `${trimmed}. Guía RUO para laboratorios en España y la UE. ${RUO}`.slice(
      0,
      158,
    ),
    primaryKeyword: trimmed.toLowerCase(),
    secondaryKeywords: [
      'péptidos de investigación España',
      'comprar péptidos investigación',
      'certificado de análisis COA péptidos',
    ],
    answerCapsule: `${trimmed} se publica para laboratorios que trabajan con péptidos de investigación. Research Peptides ES documenta catálogo, COA y envío UE. ${RUO}`,
    faqs: [
      {
        question: '¿Este contenido autoriza uso humano?',
        answer: RUO,
      },
      {
        question: '¿Dónde compro material relacionado?',
        answer: 'En la tienda y las fichas de producto, con biblioteca COA.',
      },
      {
        question: '¿Hay envío a España?',
        answer: 'Sí. Consulte la página de envío y cadena de frío.',
      },
    ],
  };
}

export function getBlogSeoCopy(
  postId: string | null | undefined,
  _locale: LocaleCode,
  fallbackTitle?: string,
): BlogSeoCopy {
  if (postId && COPY[postId]) return COPY[postId];
  return fallbackFromTitle(fallbackTitle || postId || 'Blog');
}

export function getBlogSeoDocumentTitle(
  postId: string | null | undefined,
  locale: LocaleCode,
  fallbackTitle: string,
): string {
  return getBlogSeoCopy(postId, locale, fallbackTitle).documentTitle;
}

export function getBlogSeoMetaDescription(
  postId: string | null | undefined,
  locale: LocaleCode,
  fallbackTitle?: string,
): string {
  return getBlogSeoCopy(postId, locale, fallbackTitle).metaDescription;
}

export const BLOG_SEO_POST_IDS = Object.keys(COPY);
