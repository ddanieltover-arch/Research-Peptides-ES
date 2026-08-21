import type { LocaleCode } from '../i18n/locales';

export type ProductSeoFaq = { question: string; answer: string };

export type ProductSeoSection = { heading: string; body: string };

export type ProductSeoCopy = {
  /** `<title>` without brand suffix (page adds `| Research Peptides ES`) */
  documentTitle: string;
  metaDescription: string;
  h1: string;
  /** Short blurb under price (purchase panel) */
  shortDescription: string;
  answerCapsule: string;
  sections: ProductSeoSection[];
  faqs: ProductSeoFaq[];
  relatedLinks: { to: string; label: string }[];
};

type LocaleBundle = { es: ProductSeoCopy; en: ProductSeoCopy };

const RUO_ES =
  'Solo para investigación. No consumo humano ni veterinario.';
const RUO_EN =
  'For research use only. Not for human or veterinary consumption.';

const COPY: Record<string, LocaleBundle> = {
  dsip: {
    es: {
      documentTitle: 'DSIP para investigación | comprar DSIP',
      metaDescription:
        'Comprar DSIP para investigación en España/UE. Viales liofilizados, precio por variante, COA de lote y envío. Uso exclusivo de laboratorio.',
      h1: 'DSIP para investigación',
      shortDescription:
        'DSIP (delta sleep-inducing peptide) como material de referencia para laboratorio. Consulta precio y variantes para comprar DSIP con documentación de lote. ' +
        RUO_ES,
      answerCapsule:
        'DSIP (delta sleep-inducing peptide) es un estándar de referencia peptídico suministrado para investigación de laboratorio. En Research Peptides ES se ofrece en viales liofilizados con documentación de lote bajo pedido. Uso exclusivo de investigación; no apto para consumo humano ni veterinario.',
      sections: [
        {
          heading: 'Precio y comprar DSIP para el laboratorio',
          body: 'Si buscas dónde comprar DSIP o comparar precio y comprar DSIP para ensayos, esta ficha resume variantes en mg, formato liofilizado y opciones de pedido para centros de investigación en España y la UE. Elige la presentación que encaje con tu protocolo interno y solicita el certificado de análisis del lote cuando lo necesites.',
        },
        {
          heading: 'Especificaciones de laboratorio',
          body: 'Presentación típica: polvo liofilizado en vial. Conservar según buenas prácticas de almacén (frío, protegido de la luz) hasta reconstitución según el SOP de tu laboratorio. Para volúmenes y concentraciones orientativos usa la calculadora de péptidos; no sustituye el protocolo validado de tu centro.',
        },
        {
          heading: 'COA y trazabilidad',
          body: 'Para trazabilidad de lote consulta la biblioteca de certificados de análisis. Compara proveedores con y sin documentación publicada en nuestra guía COA vs sin COA.',
        },
      ],
      faqs: [
        {
          question: '¿El DSIP es para uso humano?',
          answer:
            'No. Todo el catálogo, incluido DSIP, se suministra solo para investigación. No consumo humano ni veterinario.',
        },
        {
          question: '¿Cómo reconstituyo el vial?',
          answer:
            'Sigue el SOP de tu laboratorio. Como apoyo general puedes usar la calculadora de reconstitución del sitio; no indicamos dosis clínicas.',
        },
        {
          question: '¿Hay envío a España y la UE?',
          answer:
            'Sí. Consulta plazos y cadena de frío en la página de envío. Los pedidos institucionales pueden solicitar documentación de lote.',
        },
      ],
      relatedLinks: [
        { to: '/shop', label: 'Tienda de péptidos de investigación' },
        { to: '/peptide-calculator', label: 'Calculadora de péptidos' },
        { to: '/peptide-guide', label: 'Guía de péptidos' },
        { to: '/coas', label: 'Biblioteca COA' },
        { to: '/shipping', label: 'Envío péptidos España / UE' },
      ],
    },
    en: {
      documentTitle: 'DSIP for research | buy DSIP',
      metaDescription:
        'Buy DSIP research peptide for laboratory use in the EU. Lyophilized vials, variant pricing, batch COA support, and shipping. Research use only.',
      h1: 'DSIP for research',
      shortDescription:
        'DSIP (delta sleep-inducing peptide) reference material for laboratory research. Review variants and pricing to purchase DSIP with batch documentation. ' +
        RUO_EN,
      answerCapsule:
        'DSIP (delta sleep-inducing peptide) is a peptide reference standard supplied for laboratory research. Research Peptides ES offers lyophilized vials with batch documentation on request. Research use only; not for human or veterinary consumption.',
      sections: [
        {
          heading: 'Buy DSIP for laboratory protocols',
          body: 'This product page outlines vial sizes, lyophilized format, and ordering options for research institutions in Spain and the EU. Select the strength that matches your internal SOP and request the certificate of analysis for your lot when required.',
        },
        {
          heading: 'Laboratory specifications',
          body: 'Typical presentation: lyophilized powder in vial. Store per good laboratory practice until reconstitution under your validated protocol. Use the peptide calculator for general volume guidance only.',
        },
        {
          heading: 'COA and traceability',
          body: 'See the COA library for batch documentation practices and our COA vs no-COA comparison for procurement criteria.',
        },
      ],
      faqs: [
        {
          question: 'Is DSIP for human use?',
          answer: 'No. DSIP is supplied for research use only. Not for human or veterinary consumption.',
        },
        {
          question: 'How do I reconstitute the vial?',
          answer:
            'Follow your laboratory SOP. The on-site calculator is a general aid only and does not provide clinical dosing.',
        },
        {
          question: 'Do you ship to Spain and the EU?',
          answer: 'Yes. See the shipping page for timelines and cold-chain notes.',
        },
      ],
      relatedLinks: [
        { to: '/shop', label: 'Research peptide shop' },
        { to: '/peptide-calculator', label: 'Peptide calculator' },
        { to: '/peptide-guide', label: 'Peptide guide' },
        { to: '/coas', label: 'COA library' },
        { to: '/shipping', label: 'EU shipping' },
      ],
    },
  },

  'hexarelin-acetate': {
    es: {
      documentTitle: 'Hexarelina acetato investigación | comprar hexarelin',
      metaDescription:
        'Comprar original hexarelin (acetato) para investigación. Viales liofilizados, precio transparente y COA de lote. Solo uso de laboratorio en España/UE.',
      h1: 'Hexarelina (acetato) para investigación',
      shortDescription:
        'Acetato de hexarelina (hexapéptido clase GHRP) como material de referencia. Opciones para comprar original hexarelin con trazabilidad de lote. ' +
        RUO_ES,
      answerCapsule:
        'El acetato de hexarelina es un hexapéptido sintético de clase GHRP usado como material de referencia en investigación. Research Peptides ES suministra viales liofilizados para laboratorio con opciones de mg y soporte de documentación de lote. Solo para investigación; no consumo humano ni veterinario.',
      sections: [
        {
          heading: 'Comprar original hexarelin con documentación',
          body: 'Para verificar un suministro “original” en contexto de laboratorio, prioriza lote identificable, COA y un proveedor UE con condiciones claras. Hexarelin en esta ficha se ofrece como acetato liofilizado; el precio por variante se muestra arriba para comparar opciones de compra sin claims clínicos.',
        },
        {
          heading: 'Uso exclusivo de investigación',
          body: 'No indicamos aplicaciones terapéuticas ni de rendimiento. El producto está destinado a ensayos y protocolos de investigación definidos por tu institución.',
        },
      ],
      faqs: [
        {
          question: '¿Qué significa hexarelin “original” aquí?',
          answer:
            'Nos referimos a material de catálogo con identidad de lote y posibilidad de COA, no a claims de eficacia. Revisa la comparación COA vs sin COA.',
        },
        {
          question: '¿Cómo se almacena?',
          answer:
            'Como polvo liofilizado, sigue las condiciones de tu SOP (típicamente frío y protegido de la luz) hasta reconstitución.',
        },
        {
          question: '¿Hay guía de reconstitución?',
          answer:
            'Usa la calculadora de péptidos como apoyo volumétrico general y tu protocolo interno validado.',
        },
      ],
      relatedLinks: [
        { to: '/coa-vs-no-coa', label: 'COA vs sin COA' },
        { to: '/coas', label: 'Certificados COA' },
        { to: '/shop', label: 'Comprar péptidos investigación' },
        { to: '/product/sermorelin-acetate', label: 'Acetato de sermorelina' },
        { to: '/peptide-guide', label: 'Guía de péptidos' },
      ],
    },
    en: {
      documentTitle: 'Hexarelin acetate for research | buy hexarelin',
      metaDescription:
        'Buy hexarelin acetate for laboratory research. Lyophilized vials, clear pricing, and batch COA support. Research use only — Spain/EU supply.',
      h1: 'Hexarelin acetate for research',
      shortDescription:
        'Hexarelin acetate (GHRP-class hexapeptide) as reference material for research. Review variants to purchase with lot traceability. ' + RUO_EN,
      answerCapsule:
        'Hexarelin acetate is a synthetic GHRP-class hexapeptide used as laboratory reference material. Research Peptides ES supplies lyophilized vials with mg options and batch documentation support. Research use only; not for human or veterinary consumption.',
      sections: [
        {
          heading: 'Buying hexarelin with documentation',
          body: 'For laboratory procurement, prioritize identifiable lots, COA availability, and clear EU supplier terms. Pricing by variant appears above. No clinical or performance claims.',
        },
        {
          heading: 'Research use only',
          body: 'Intended solely for institutional research protocols defined by your laboratory.',
        },
      ],
      faqs: [
        {
          question: 'What does “original” mean here?',
          answer:
            'Catalog material with lot identity and COA support — not efficacy claims. See COA vs no-COA.',
        },
        {
          question: 'Storage?',
          answer: 'Follow your SOP for lyophilized peptides until reconstitution.',
        },
        {
          question: 'Reconstitution help?',
          answer: 'Use the peptide calculator for general volume math plus your validated protocol.',
        },
      ],
      relatedLinks: [
        { to: '/coa-vs-no-coa', label: 'COA vs no COA' },
        { to: '/coas', label: 'COA library' },
        { to: '/shop', label: 'Research shop' },
        { to: '/product/sermorelin-acetate', label: 'Sermorelin acetate' },
        { to: '/peptide-guide', label: 'Peptide guide' },
      ],
    },
  },

  'sermorelin-acetate': {
    es: {
      documentTitle: 'Acetato de sermorelina investigación',
      metaDescription:
        'Comprar original acetato de sermorelina para investigación. Ordenar viales 2/5/10 mg liofilizados con COA y envío UE. Solo laboratorio.',
      h1: 'Acetato de sermorelina para investigación',
      shortDescription:
        'Análogo de fragmento GHRH como material de referencia. Opciones para comprar original acetato de sermorelina u ordenar acetato de sermorelina según variante. ' +
        RUO_ES,
      answerCapsule:
        'El acetato de sermorelina es un análogo secretagogo de fragmento GHRH suministrado como material de referencia para investigación. En Research Peptides ES está disponible en viales liofilizados de distintas concentraciones para uso exclusivo de laboratorio. No apto para consumo humano ni veterinario.',
      sections: [
        {
          heading: 'Ordenar acetato de sermorelina para el lab',
          body: 'Selecciona la variante en mg que figure en tu pedido institucional. El envío a España y la UE se detalla en la página de envío; la documentación de lote se gestiona vía certificados COA.',
        },
        {
          heading: 'Contexto de catálogo (sin claims clínicos)',
          body: 'Describimos el compuesto a nivel de clase de referencia de laboratorio. No ofrecemos posología humana ni claims anti-edad o terapéuticos.',
        },
      ],
      faqs: [
        {
          question: '¿En qué se diferencia de otros secretagogos del catálogo?',
          answer:
            'Son materiales de referencia distintos (p. ej. hexarelina). La elección depende del diseño experimental de tu centro, no de indicaciones clínicas.',
        },
        {
          question: '¿Puedo pedir COA?',
          answer: 'Sí. Consulta la biblioteca de COAs o contacta soporte con el número de lote.',
        },
        {
          question: '¿Hay calculadora de reconstitución?',
          answer: 'Sí, en la calculadora de péptidos; úsala solo como apoyo volumétrico general.',
        },
      ],
      relatedLinks: [
        { to: '/shipping', label: 'Envío péptidos España' },
        { to: '/coas', label: 'Certificado de análisis COA' },
        { to: '/peptide-calculator', label: 'Calculadora de péptidos' },
        { to: '/product/hexarelin-acetate', label: 'Hexarelina acetato' },
        { to: '/peptide-research', label: 'Investigación peptídica Europa' },
      ],
    },
    en: {
      documentTitle: 'Sermorelin acetate for research',
      metaDescription:
        'Buy sermorelin acetate for laboratory research. Order lyophilized 2/5/10 mg vials with COA support and EU shipping. Research use only.',
      h1: 'Sermorelin acetate for research',
      shortDescription:
        'GHRH-fragment secretagogue analog as reference material. Review variants to order sermorelin acetate for lab protocols. ' + RUO_EN,
      answerCapsule:
        'Sermorelin acetate is a GHRH-fragment secretagogue analog supplied as research reference material. Research Peptides ES offers lyophilized vials in multiple strengths for laboratory use only. Not for human or veterinary consumption.',
      sections: [
        {
          heading: 'Order sermorelin acetate for the lab',
          body: 'Select the mg variant required by your institutional order. See shipping for Spain/EU dispatch and the COA library for documentation practices.',
        },
        {
          heading: 'Catalog context only',
          body: 'No human dosing or therapeutic claims — research protocols only.',
        },
      ],
      faqs: [
        {
          question: 'How does it differ from other catalog secretagogues?',
          answer: 'Different reference materials (e.g. hexarelin). Choice depends on your experimental design.',
        },
        {
          question: 'Can I request a COA?',
          answer: 'Yes via the COA library or support with your lot number.',
        },
        {
          question: 'Reconstitution calculator?',
          answer: 'Available on the peptide calculator page for general volume guidance.',
        },
      ],
      relatedLinks: [
        { to: '/shipping', label: 'Shipping' },
        { to: '/coas', label: 'COA library' },
        { to: '/peptide-calculator', label: 'Peptide calculator' },
        { to: '/product/hexarelin-acetate', label: 'Hexarelin acetate' },
        { to: '/peptide-research', label: 'Peptide research hub' },
      ],
    },
  },

  'peg-mgf': {
    es: {
      documentTitle: 'PEG-MGF investigación | comprar PEG-MGF',
      metaDescription:
        'Comprar original PEG-MGF para investigación. Ordenar vial liofilizado con precio claro y COA. Uso exclusivo de laboratorio, envío UE.',
      h1: 'PEG-MGF para investigación',
      shortDescription:
        'Análogo PEGilado del factor de crecimiento mecánico para laboratorio. Opciones para comprar original peg-mgf u ordenar peg-mgf según stock. ' +
        RUO_ES,
      answerCapsule:
        'PEG-MGF es un análogo PEGilado del factor de crecimiento mecánico usado como material de referencia en investigación. Research Peptides ES ofrece PEG-MGF liofilizado para laboratorio con documentación de lote bajo los términos de uso exclusivo para investigación. No consumo humano ni veterinario.',
      sections: [
        {
          heading: 'Comprar original PEG-MGF / ordenar para el lab',
          body: 'El precio de la variante aparece en esta ficha para comparar opciones de compra. La PEGilación se menciona solo como característica química de catálogo (estabilidad relativa en modelos de laboratorio), sin claims de rendimiento deportivo ni terapéuticos.',
        },
        {
          heading: 'Relacionado: MGF no PEGilado',
          body: 'Si tu protocolo compara formas PEGiladas y no PEGiladas, revisa también MGF en el catálogo. Para criterios de documentación usa COA vs sin COA y la guía de péptidos.',
        },
      ],
      faqs: [
        {
          question: '¿PEG-MGF es para uso deportivo?',
          answer: 'No. Se vende únicamente como material de investigación de laboratorio.',
        },
        {
          question: '¿Cómo interpreto el precio “barato”?',
          answer:
            'Publicamos el precio EUR de la variante para transparencia de compra. No usamos promesas de descuento engañosas ni claims clínicos.',
        },
        {
          question: '¿Hay COA?',
          answer: 'La documentación de lote se gestiona vía la biblioteca COA / soporte.',
        },
      ],
      relatedLinks: [
        { to: '/shop', label: 'Tienda' },
        { to: '/product/mgf', label: 'MGF (sin PEG)' },
        { to: '/coa-vs-no-coa', label: 'COA vs sin COA' },
        { to: '/peptide-guide', label: 'Guía de péptidos' },
        { to: '/product/hgh-fragment-176-191', label: 'Frag 176-191' },
      ],
    },
    en: {
      documentTitle: 'PEG-MGF for research | buy PEG-MGF',
      metaDescription:
        'Buy PEG-MGF for laboratory research. Order lyophilized vials with clear pricing and COA support. Research use only — EU shipping.',
      h1: 'PEG-MGF for research',
      shortDescription:
        'PEGylated mechano growth factor analog for laboratory research. Review pricing to purchase PEG-MGF with lot documentation. ' + RUO_EN,
      answerCapsule:
        'PEG-MGF is a PEGylated mechano growth factor analog used as research reference material. Research Peptides ES supplies lyophilized PEG-MGF for laboratory use with batch documentation under research-use-only terms. Not for human or veterinary consumption.',
      sections: [
        {
          heading: 'Buy / order PEG-MGF for the lab',
          body: 'Variant pricing is shown above. PEGylation is described as a chemical catalog attribute only — no sports or therapeutic claims.',
        },
        {
          heading: 'Related: non-PEGylated MGF',
          body: 'Compare with MGF in the catalog when your protocol requires both forms.',
        },
      ],
      faqs: [
        {
          question: 'Is PEG-MGF for athletic use?',
          answer: 'No. Laboratory research use only.',
        },
        {
          question: 'Pricing?',
          answer: 'EUR variant price is listed for transparent procurement.',
        },
        {
          question: 'COA?',
          answer: 'Batch documentation via the COA library / support.',
        },
      ],
      relatedLinks: [
        { to: '/shop', label: 'Shop' },
        { to: '/product/mgf', label: 'MGF' },
        { to: '/coa-vs-no-coa', label: 'COA vs no COA' },
        { to: '/peptide-guide', label: 'Peptide guide' },
        { to: '/product/hgh-fragment-176-191', label: 'Frag 176-191' },
      ],
    },
  },

  'hgh-fragment-176-191': {
    es: {
      documentTitle: 'Frag 176-191 investigación | HGH Fragment',
      metaDescription:
        'Precio y comprar frag 176-191 para investigación. Fragmento HGH 176-191 liofilizado, variantes mg, COA y envío España/UE. Solo laboratorio.',
      h1: 'Fragmento HGH 176-191 para investigación',
      shortDescription:
        'Material de referencia del fragmento C-terminal 176-191. Consulta precio y comprar frag 176-191 según variante de mg. ' + RUO_ES,
      answerCapsule:
        'El fragmento HGH 176-191 es un material de referencia del extremo C-terminal usado en investigación de laboratorio. Research Peptides ES lo suministra en viales liofilizados de distintas cantidades para uso exclusivo de investigación. No está destinado a consumo humano ni veterinario.',
      sections: [
        {
          heading: 'Precio y comprar frag 176-191',
          body: 'Esta ficha detalla el fragmento 176-191 como referencia estructural de catálogo. Elige la variante (p. ej. 2, 5 o 10 mg según disponibilidad) y revisa envío a España. No incluimos claims de pérdida de peso ni usos clínicos.',
        },
        {
          heading: 'Relación con otros ítems del catálogo',
          body: 'AOD-9604 aparece en catálogo como compuesto relacionado de clase fragmento; son referencias distintas. Selecciónalas según el diseño experimental, no por indicaciones médicas.',
        },
      ],
      faqs: [
        {
          question: '¿Para qué se usa en el lab?',
          answer:
            'Como material de referencia en protocolos definidos por tu institución. No proporcionamos indicaciones clínicas.',
        },
        {
          question: '¿Reconstitución y almacenamiento?',
          answer:
            'Sigue tu SOP. Apoyo general: calculadora de péptidos y buenas prácticas de almacenamiento de liofilizados.',
        },
        {
          question: '¿Envío en España?',
          answer: 'Sí. Detalles en la página de envío (cadena de frío y plazos).',
        },
      ],
      relatedLinks: [
        { to: '/product/aod9604', label: 'AOD-9604' },
        { to: '/coas', label: 'Biblioteca COA' },
        { to: '/shipping', label: 'Envío péptidos España' },
        { to: '/peptide-information', label: 'Información de péptidos' },
        { to: '/shop', label: 'Tienda' },
      ],
    },
    en: {
      documentTitle: 'HGH Fragment 176-191 for research | Frag 176-191',
      metaDescription:
        'Buy HGH fragment 176-191 for laboratory research. Lyophilized frag 176-191 vials, mg variants, COA support, Spain/EU shipping. Research use only.',
      h1: 'HGH Fragment 176-191 for research',
      shortDescription:
        'C-terminal fragment 176-191 reference material. Review pricing to purchase frag 176-191 by vial strength. ' + RUO_EN,
      answerCapsule:
        'HGH fragment 176-191 is a C-terminal fragment reference material for laboratory research. Research Peptides ES supplies lyophilized vials in multiple strengths for research use only. Not for human or veterinary consumption.',
      sections: [
        {
          heading: 'Buy frag 176-191 for the lab',
          body: 'Catalog reference for structural fragment work. Select mg variant as available. No weight-loss or clinical claims.',
        },
        {
          heading: 'Related catalog items',
          body: 'AOD-9604 is listed separately as a related fragment-class listing — choose by experimental design only.',
        },
      ],
      faqs: [
        {
          question: 'Laboratory use?',
          answer: 'Institutional research protocols only — no clinical indications.',
        },
        {
          question: 'Reconstitution and storage?',
          answer: 'Follow your SOP; calculator available for general volume guidance.',
        },
        {
          question: 'Shipping in Spain?',
          answer: 'Yes — see the shipping page.',
        },
      ],
      relatedLinks: [
        { to: '/product/aod9604', label: 'AOD-9604' },
        { to: '/coas', label: 'COA library' },
        { to: '/shipping', label: 'Shipping' },
        { to: '/peptide-information', label: 'Peptide information' },
        { to: '/shop', label: 'Shop' },
      ],
    },
  },

  retatrutide: {
    es: {
      documentTitle: 'Retatrutide España | comprar retatrutide investigación',
      metaDescription:
        'Retatrutide España para investigación: precio, variantes y COA. Comprar retatrutide para laboratorio con envío UE. Solo uso de investigación.',
      h1: 'Retatrutide para investigación en España',
      shortDescription:
        'Retatrutide como material de referencia para laboratorio. Consulta retatrutide precio España y opciones para comprar retatrutide. Solo investigación. No consumo humano ni veterinario.',
      answerCapsule:
        'Retatrutide es un compuesto de investigación del catálogo de Research Peptides ES, suministrado en viales para uso exclusivo de laboratorio en España y la UE. Incluye soporte de documentación de lote. No apto para consumo humano ni veterinario.',
      sections: [
        {
          heading: 'Retatrutide España — precio y compra para el lab',
          body: 'Si buscas retatrutide comprar en España u opciones de pedido institucional, esta ficha resume variantes y condiciones de envío. Framing exclusivo de investigación: sin indicaciones clínicas ni posología humana.',
        },
        {
          heading: 'Documentación y envío',
          body: 'Consulta COA de lote y la página de envío para plazos a laboratorios en España. Uso exclusivo para investigación.',
        },
      ],
      faqs: [
        {
          question: '¿Cuándo llega retatrutide a España?',
          answer:
            'El catálogo online está disponible para pedidos de laboratorio según stock. Los plazos de envío se detallan en la página de envío.',
        },
        {
          question: '¿Es para uso humano?',
          answer: 'No. Solo para investigación. No consumo humano ni veterinario.',
        },
        {
          question: '¿Hay COA?',
          answer: 'La documentación de lote se gestiona vía la biblioteca COA / soporte.',
        },
      ],
      relatedLinks: [
        { to: '/shop', label: 'Comprar péptidos España' },
        { to: '/coas', label: 'Biblioteca COA' },
        { to: '/shipping', label: 'Envío' },
        { to: '/product/bpc-157', label: 'BPC-157' },
        { to: '/peptide-guide', label: 'Guía de péptidos' },
      ],
    },
    en: {
      documentTitle: 'Retatrutide Spain | buy retatrutide for research',
      metaDescription:
        'Retatrutide for laboratory research in Spain/EU. Variant pricing, COA support, shipping. Research use only.',
      h1: 'Retatrutide for research (Spain/EU)',
      shortDescription:
        'Retatrutide reference material for laboratory research. Review pricing and variants. Research use only.',
      answerCapsule:
        'Retatrutide is supplied by Research Peptides ES as laboratory research material for Spain and the EU, with batch documentation support. Not for human or veterinary consumption.',
      sections: [
        {
          heading: 'Buy retatrutide for laboratory protocols',
          body: 'Institutional ordering only. No clinical indications or human dosing.',
        },
        {
          heading: 'COA and shipping',
          body: 'See the COA library and shipping page for documentation and dispatch details.',
        },
      ],
      faqs: [
        {
          question: 'Human use?',
          answer: 'No — research use only.',
        },
        {
          question: 'COA available?',
          answer: 'Via COA library / support with lot details.',
        },
        {
          question: 'Shipping to Spain?',
          answer: 'Yes — see the shipping page.',
        },
      ],
      relatedLinks: [
        { to: '/shop', label: 'Shop' },
        { to: '/coas', label: 'COA library' },
        { to: '/shipping', label: 'Shipping' },
        { to: '/product/bpc-157', label: 'BPC-157' },
        { to: '/peptide-guide', label: 'Peptide guide' },
      ],
    },
  },

  'ghk-cu': {
    es: {
      documentTitle: 'GHK-CU investigación | ghk cu',
      metaDescription:
        'GHK CU (GHK-Cu) para investigación de laboratorio. Viales, COA y envío España/UE. Solo uso de investigación.',
      h1: 'GHK-CU (ghk cu) para investigación',
      shortDescription:
        'Complejo tripéptido de cobre GHK-CU como material de referencia (ghk cu). Solo para investigación. No consumo humano ni veterinario.',
      answerCapsule:
        'GHK-CU es un complejo tripéptido-cobre suministrado para investigación de laboratorio. Research Peptides ES ofrece ghk cu liofilizado con soporte de documentación de lote. Uso exclusivo de investigación.',
      sections: [
        {
          heading: 'GHK CU en el catálogo de laboratorio',
          body: 'Material de referencia para protocolos definidos por tu institución. Sin claims cosméticos o clínicos.',
        },
      ],
      faqs: [
        {
          question: '¿Uso humano?',
          answer: 'No. Solo investigación.',
        },
        {
          question: '¿COA?',
          answer: 'Consulta la biblioteca COA.',
        },
        {
          question: '¿Reconstitución?',
          answer: 'Sigue tu SOP; calculadora disponible como apoyo volumétrico.',
        },
      ],
      relatedLinks: [
        { to: '/shop', label: 'Tienda' },
        { to: '/product/bpc-157', label: 'BPC-157' },
        { to: '/coas', label: 'COA' },
        { to: '/peptide-calculator', label: 'Calculadora' },
        { to: '/peptide-guide', label: 'Guía' },
      ],
    },
    en: {
      documentTitle: 'GHK-CU for research | ghk cu',
      metaDescription: 'GHK-CU (ghk cu) copper tripeptide for laboratory research. COA support, EU shipping. Research use only.',
      h1: 'GHK-CU for research',
      shortDescription: 'GHK-CU copper tripeptide reference material. Research use only.',
      answerCapsule:
        'GHK-CU is a copper tripeptide complex supplied for laboratory research with batch documentation support. Not for human or veterinary consumption.',
      sections: [{ heading: 'Laboratory catalog listing', body: 'Reference material only — no cosmetic or clinical claims.' }],
      faqs: [
        { question: 'Human use?', answer: 'No — research only.' },
        { question: 'COA?', answer: 'See the COA library.' },
        { question: 'Reconstitution?', answer: 'Follow your SOP; calculator available.' },
      ],
      relatedLinks: [
        { to: '/shop', label: 'Shop' },
        { to: '/product/bpc-157', label: 'BPC-157' },
        { to: '/coas', label: 'COA' },
        { to: '/peptide-calculator', label: 'Calculator' },
        { to: '/peptide-guide', label: 'Guide' },
      ],
    },
  },

  'bpc-157': {
    es: {
      documentTitle: 'BPC-157 peptide investigación | comprar BPC 157',
      metaDescription:
        'BPC 157 peptide para investigación de laboratorio en España. COA, variantes y envío UE. Solo uso de investigación.',
      h1: 'BPC-157 peptide para investigación',
      shortDescription:
        'BPC-157 (bpc 157 peptide / bcp-157) como material de referencia de laboratorio. Solo investigación. No consumo humano ni veterinario.',
      answerCapsule:
        'BPC-157 es un péptido de investigación suministrado por Research Peptides ES para protocolos de laboratorio, con soporte de COA de lote. Uso exclusivo de investigación; no consumo humano ni veterinario.',
      sections: [
        {
          heading: 'BPC 157 peptide en el catálogo',
          body: 'Incluye variantes según stock. Sin claims terapéuticos. Para comprar péptidos relacionados mira también GHK-CU y el catálogo general.',
        },
      ],
      faqs: [
        { question: '¿Uso clínico?', answer: 'No. Solo investigación de laboratorio.' },
        { question: '¿COA?', answer: 'Sí, vía biblioteca COA / soporte.' },
        { question: '¿Envío España?', answer: 'Sí — página de envío.' },
      ],
      relatedLinks: [
        { to: '/shop', label: 'Comprar péptidos' },
        { to: '/product/ghk-cu', label: 'GHK-CU' },
        { to: '/coas', label: 'COA' },
        { to: '/shipping', label: 'Envío' },
        { to: '/peptide-guide', label: 'Guía' },
      ],
    },
    en: {
      documentTitle: 'BPC-157 peptide for research',
      metaDescription: 'BPC-157 peptide for laboratory research. COA support, EU shipping. Research use only.',
      h1: 'BPC-157 peptide for research',
      shortDescription: 'BPC-157 laboratory reference material. Research use only.',
      answerCapsule:
        'BPC-157 is supplied for laboratory research protocols with batch COA support. Not for human or veterinary consumption.',
      sections: [{ heading: 'Catalog listing', body: 'Research-use framing only — no therapeutic claims.' }],
      faqs: [
        { question: 'Clinical use?', answer: 'No — laboratory research only.' },
        { question: 'COA?', answer: 'Via COA library / support.' },
        { question: 'Ship to Spain?', answer: 'Yes — see shipping.' },
      ],
      relatedLinks: [
        { to: '/shop', label: 'Shop' },
        { to: '/product/ghk-cu', label: 'GHK-CU' },
        { to: '/coas', label: 'COA' },
        { to: '/shipping', label: 'Shipping' },
        { to: '/peptide-guide', label: 'Guide' },
      ],
    },
  },

  'pt-141': {
    es: {
      documentTitle: 'PT-141 comprar | investigación',
      metaDescription:
        'PT-141 comprar para investigación de laboratorio. PT 141 España, COA y envío UE. Solo uso de investigación.',
      h1: 'PT-141 para investigación',
      shortDescription:
        'PT-141 como agonista de referencia de melanocortina para laboratorio. Opciones para pt-141 comprar en marco RUO.',
      answerCapsule:
        'PT-141 se suministra como material de investigación de laboratorio en Research Peptides ES, con documentación de lote bajo pedido. Solo para investigación; no consumo humano ni veterinario.',
      sections: [
        {
          heading: 'PT-141 comprar en línea (laboratorio)',
          body: 'Pedido orientado a centros de investigación. Sin claims clínicos. Relacionado: Melanotan 2 en el mismo cluster de catálogo.',
        },
      ],
      faqs: [
        { question: '¿Uso humano?', answer: 'No.' },
        { question: '¿COA?', answer: 'Biblioteca COA / soporte.' },
        { question: '¿Envío?', answer: 'España y UE — ver envío.' },
      ],
      relatedLinks: [
        { to: '/shop', label: 'Tienda' },
        { to: '/product/mt-2-melanotan-2-acetate', label: 'Melanotan 2' },
        { to: '/coas', label: 'COA' },
        { to: '/shipping', label: 'Envío' },
        { to: '/peptide-guide', label: 'Guía' },
      ],
    },
    en: {
      documentTitle: 'Buy PT-141 for research',
      metaDescription: 'PT-141 for laboratory research. COA support, EU shipping. Research use only.',
      h1: 'PT-141 for research',
      shortDescription: 'PT-141 melanocortin receptor agonist class reference. Research use only.',
      answerCapsule:
        'PT-141 is supplied as laboratory research material with batch documentation on request. Not for human or veterinary consumption.',
      sections: [{ heading: 'Laboratory ordering', body: 'No clinical claims. See related Melanotan 2 listing if needed.' }],
      faqs: [
        { question: 'Human use?', answer: 'No.' },
        { question: 'COA?', answer: 'COA library / support.' },
        { question: 'Shipping?', answer: 'Spain and EU — see shipping.' },
      ],
      relatedLinks: [
        { to: '/shop', label: 'Shop' },
        { to: '/product/mt-2-melanotan-2-acetate', label: 'Melanotan 2' },
        { to: '/coas', label: 'COA' },
        { to: '/shipping', label: 'Shipping' },
        { to: '/peptide-guide', label: 'Guide' },
      ],
    },
  },

  'mt-2-melanotan-2-acetate': {
    es: {
      documentTitle: 'Melanotan 2 donde comprar | MT-2 investigación',
      metaDescription:
        'Melanotan 2 donde comprar para laboratorio: MT-2 acetato, precio y COA. Solo investigación — España/UE.',
      h1: 'Melanotan 2 (MT-2) para investigación',
      shortDescription:
        'MT-2 (Melanotan 2 acetato) como material de referencia. Melanotan 2 donde comprar en marco RUO con precio por variante.',
      answerCapsule:
        'Melanotan 2 (MT-2 acetato) se ofrece para investigación de laboratorio en Research Peptides ES. Uso exclusivo de investigación; no farmacia clínica ni consumo humano.',
      sections: [
        {
          heading: 'Melanotan 2 precio y compra (lab)',
          body: 'Catálogo de investigación únicamente. No es un producto de farmacia. Relacionado: PT-141 y agua bacteriostática para reconstitución genérica de laboratorio.',
        },
      ],
      faqs: [
        { question: '¿Se vende en farmacia?', answer: 'No. Solo material de investigación de laboratorio.' },
        { question: '¿Uso humano?', answer: 'No.' },
        { question: '¿COA?', answer: 'Biblioteca COA / soporte.' },
      ],
      relatedLinks: [
        { to: '/shop', label: 'Tienda' },
        { to: '/product/pt-141', label: 'PT-141 comprar' },
        { to: '/product/bacteriostatic-water', label: 'Agua bacteriostática' },
        { to: '/coas', label: 'COA' },
        { to: '/peptide-guide', label: 'Guía' },
      ],
    },
    en: {
      documentTitle: 'Melanotan 2 for research | where to buy MT-2',
      metaDescription: 'Melanotan 2 (MT-2) for laboratory research. Pricing, COA, EU shipping. Research use only.',
      h1: 'Melanotan 2 (MT-2) for research',
      shortDescription: 'MT-2 acetate reference material. Research use only — not a pharmacy product.',
      answerCapsule:
        'Melanotan 2 (MT-2 acetate) is supplied for laboratory research only. Not for human or veterinary consumption.',
      sections: [{ heading: 'Laboratory catalog', body: 'No pharmacy or clinical framing. See PT-141 and bacteriostatic water as related lab supplies.' }],
      faqs: [
        { question: 'Pharmacy product?', answer: 'No — research catalog only.' },
        { question: 'Human use?', answer: 'No.' },
        { question: 'COA?', answer: 'COA library / support.' },
      ],
      relatedLinks: [
        { to: '/shop', label: 'Shop' },
        { to: '/product/pt-141', label: 'PT-141' },
        { to: '/product/bacteriostatic-water', label: 'Bacteriostatic water' },
        { to: '/coas', label: 'COA' },
        { to: '/peptide-guide', label: 'Guide' },
      ],
    },
  },

  'bacteriostatic-water': {
    es: {
      documentTitle: 'Agua bacteriostatica comprar | laboratorio',
      metaDescription:
        'Agua bacteriostatica comprar para reconstitución de péptidos de investigación. Envío España/UE. Solo laboratorio.',
      h1: 'Agua bacteriostática para investigación',
      shortDescription:
        'Agua bacteriostática como suministro de laboratorio para reconstitución según SOP. Agua bacteriostatica comprar con envío UE.',
      answerCapsule:
        'El agua bacteriostática se suministra como material de laboratorio para protocolos de reconstitución de péptidos de investigación. No es un producto de uso clínico humano.',
      sections: [
        {
          heading: 'Agua bacteriostatica comprar para el lab',
          body: 'Úsala según el SOP de tu centro. Apoyo: calculadora de péptidos y guía de reconstitución. Solo investigación.',
        },
      ],
      faqs: [
        { question: '¿Uso humano?', answer: 'No — suministro de laboratorio.' },
        { question: '¿Para qué péptidos?', answer: 'Según el protocolo interno de reconstitución de tu lab.' },
        { question: '¿Envío?', answer: 'España y UE — ver envío.' },
      ],
      relatedLinks: [
        { to: '/peptide-calculator', label: 'Calculadora de péptidos' },
        { to: '/peptide-guide', label: 'Guía' },
        { to: '/shop', label: 'Comprar péptidos' },
        { to: '/blog', label: 'Blog' },
        { to: '/shipping', label: 'Envío' },
      ],
    },
    en: {
      documentTitle: 'Buy bacteriostatic water for research labs',
      metaDescription: 'Bacteriostatic water for peptide reconstitution in laboratory protocols. EU shipping. Research use only.',
      h1: 'Bacteriostatic water for research',
      shortDescription: 'Laboratory bacteriostatic water for reconstitution SOPs. Research supply only.',
      answerCapsule:
        'Bacteriostatic water is supplied as a laboratory reagent for research peptide reconstitution protocols. Not for clinical human use.',
      sections: [{ heading: 'Lab supply', body: 'Follow your institutional SOP. See the peptide calculator and guide for general support.' }],
      faqs: [
        { question: 'Human use?', answer: 'No — laboratory supply.' },
        { question: 'Which peptides?', answer: 'Per your internal reconstitution protocol.' },
        { question: 'Shipping?', answer: 'Spain and EU — see shipping.' },
      ],
      relatedLinks: [
        { to: '/peptide-calculator', label: 'Calculator' },
        { to: '/peptide-guide', label: 'Guide' },
        { to: '/shop', label: 'Shop' },
        { to: '/blog', label: 'Blog' },
        { to: '/shipping', label: 'Shipping' },
      ],
    },
  },
};

const PRIORITY_SLUGS = new Set(Object.keys(COPY));

export function isPriorityProductSeoSlug(slug: string | null | undefined): boolean {
  return Boolean(slug && PRIORITY_SLUGS.has(slug));
}

export function getProductSeoCopy(
  slug: string | null | undefined,
  locale: LocaleCode,
): ProductSeoCopy | null {
  if (!slug) return null;
  const bundle = COPY[slug];
  if (!bundle) return null;
  if (locale === 'es') return bundle.es;
  return bundle.en;
}

/** Document title for `<title>` / OG (brand appended by caller if needed). */
export function getProductSeoDocumentTitle(
  slug: string | null | undefined,
  locale: LocaleCode,
  fallbackTitle: string,
): string {
  return getProductSeoCopy(slug, locale)?.documentTitle ?? fallbackTitle;
}

export function getProductSeoMetaDescription(
  slug: string | null | undefined,
  locale: LocaleCode,
  fallback?: string,
): string | undefined {
  return getProductSeoCopy(slug, locale)?.metaDescription ?? fallback;
}
