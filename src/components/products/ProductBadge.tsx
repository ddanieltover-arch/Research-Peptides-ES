import React from 'react';
import { Award, Tag, Zap, Shield, CheckCircle2 } from 'lucide-react';

export type BadgeType = 'elite' | 'bestseller' | 'sale' | 'low_stock' | 'new' | 'verified';

interface ProductBadgeProps {
  type: BadgeType;
  className?: string;
  size?: 'sm' | 'md';
}

const badgeConfigs = {
  elite: {
    label: 'Grado Elite',
    icon: Award,
    classes: 'bg-navy-950 text-white border-slate-700'
  },
  bestseller: {
    label: 'Top Ventas',
    icon: Zap,
    classes: 'bg-amber-50 text-amber-800 border-amber-200'
  },
  sale: {
    label: 'Oferta',
    icon: Tag,
    classes: 'bg-rose-50 text-rose-700 border-rose-200'
  },
  low_stock: {
    label: 'Stock Limitado',
    icon: Zap,
    classes: 'bg-amber-50 text-amber-700 border-amber-200'
  },
  new: {
    label: 'Nuevo Lote',
    icon: Shield,
    classes: 'bg-sky-50 text-sky-700 border-sky-200'
  },
  verified: {
    label: 'HPLC ≥99.4%',
    icon: CheckCircle2,
    classes: 'bg-emerald-50 text-emerald-800 border-emerald-200'
  }
};

export function ProductBadge({ type, className = '', size = 'sm' }: ProductBadgeProps) {
  const config = badgeConfigs[type] ?? badgeConfigs.verified;
  const Icon = config.icon;
  
  return (
    <div className={`
      inline-flex items-center gap-1 px-2 py-0.5 rounded-md border shadow-none
      font-mono font-semibold uppercase tracking-tight leading-none
      ${size === 'sm' ? 'text-[9px]' : 'text-[10px]'}
      ${config.classes}
      ${className}
    `}>
      <Icon className={size === 'sm' ? 'h-2.5 w-2.5' : 'h-3 w-3'} />
      <span>{config.label}</span>
    </div>
  );
}
