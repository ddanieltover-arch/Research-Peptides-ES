import React from 'react';
import { motion } from 'motion/react';
import { AlertCircle, TrendingUp, Zap, Globe, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const TICKER_ICONS = [ShieldCheck, Globe, Zap, TrendingUp, AlertCircle] as const;
const TICKER_COLORS = ['text-emerald-400', 'text-sky-400', 'text-brand-400', 'text-emerald-400', 'text-amber-400'] as const;

export default function LiveTicker() {
  const { t } = useTranslation('common');
  const items = t('ticker', { returnObjects: true }) as string[];
  const displayItems = Array.isArray(items) && items.length > 0 ? [...items, ...items] : [];

  if (displayItems.length === 0) return null;

  return (
    <div className="bg-navy-950 border-b border-slate-800/80 py-1.5 overflow-hidden relative group select-none">
      <motion.div 
        className="flex whitespace-nowrap gap-10 items-center"
        animate={{ x: [0, -1400] }}
        transition={{ 
          repeat: Infinity, 
          duration: 38, 
          ease: "linear",
          repeatType: "loop"
        }}
      >
        {displayItems.map((text, i) => {
          const Icon = TICKER_ICONS[i % TICKER_ICONS.length];
          const color = TICKER_COLORS[i % TICKER_COLORS.length];
          return (
            <div key={`${text}-${i}`} className="flex items-center gap-2">
              <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400/90" />
              <Icon className={`h-3 w-3 ${color}`} aria-hidden />
              <span className="text-[10px] font-mono uppercase tracking-[0.12em] text-slate-300">
                {text}
              </span>
              <span className="h-1 w-1 bg-slate-700 rounded-full" />
            </div>
          );
        })}
      </motion.div>
      
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-navy-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-navy-950 to-transparent z-10 pointer-events-none" />
    </div>
  );
}
