/** Spanish display copy for catalog categories (slug stays English for product filters). */
export type EsCategoryCopy = {
  slug: string;
  name: string;
  description: string;
};

export const esCategories: EsCategoryCopy[] = [
  {
    slug: 'peptides',
    name: 'Péptidos',
    description: 'Péptidos de investigación de alta pureza para estudios científicos y académicos.',
  },
  {
    slug: 'sarms',
    name: 'SARMs',
    description: 'Moduladores selectivos del receptor de andrógenos para aplicaciones de investigación.',
  },
  {
    slug: 'research-chemicals',
    name: 'Productos químicos de investigación',
    description: 'Reactivos y productos químicos de laboratorio de grado premium.',
  },
  {
    slug: 'peptide-blends',
    name: 'Mezclas de péptidos',
    description: 'Combinaciones sinérgicas de péptidos de investigación en un solo vial.',
  },
  {
    slug: 'peptide-capsules',
    name: 'Cápsulas de péptidos',
    description: 'Compuestos de investigación en formato oral para estudios metabólicos y de señalización.',
  },
  {
    slug: 'igf-1-proteins',
    name: 'Proteínas IGF-1',
    description: 'Análogos del factor de crecimiento similar a la insulina y proteínas relacionadas.',
  },
  {
    slug: 'melanotan-peptides',
    name: 'Péptidos Melanotan',
    description: 'Agonistas del receptor de melanocortina para investigación de pigmentación.',
  },
  {
    slug: 'supplements',
    name: 'Suplementos de laboratorio',
    description: 'Compuestos nutricionales de grado investigación para uso en laboratorio.',
  },
  {
    slug: 'lab-supplies',
    name: 'Material de laboratorio',
    description: 'Agua bacteriostática y suministros esenciales para reconstitución química.',
  },
  {
    slug: 'peptide-powder',
    name: 'Polvo de péptidos',
    description: 'Polvos de péptidos liofilizados del listado mayorista (variantes mapeadas por SKU).',
  },
];
