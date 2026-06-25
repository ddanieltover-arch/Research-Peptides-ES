import React from 'react';
import { motion } from 'motion/react';
import { AlertCircle, TrendingUp, Zap, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const TICKER_ICONS = [AlertCircle, Globe, Zap, TrendingUp, AlertCircle] as const;
const TICKER_COLORS = ['text-warning', 'text-brand-400', 'text-success', 'text-purity', 'text-brand-300'] as const;

export default function LiveTicker() {
  const { t } = useTranslation('common');
  const items = t('ticker', { returnObjects: true }) as string[];
  const displayItems = [...items, ...items];

  return (
    <div className="bg-brand-900 border-b border-accent-500/20 py-2.5 overflow-hidden relative group">
      <motion.div 
        className="flex whitespace-nowrap gap-12 items-center"
        animate={{ x: [0, -1500] }}
        transition={{ 
          repeat: Infinity, 
          duration: 35, 
          ease: "linear",
          repeatType: "loop"
        }}
      >
        {displayItems.map((text, i) => {
          const Icon = TICKER_ICONS[i % TICKER_ICONS.length];
          const color = TICKER_COLORS[i % TICKER_COLORS.length];
          return (
            <div key={`${text}-${i}`} className="flex items-center gap-3">
              <Icon className={`h-3.5 w-3.5 ${color}`} />
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-silver-400">
                {text}
              </span>
              <div className="h-1 w-1 bg-gray-700 rounded-full" />
            </div>
          );
        })}
      </motion.div>
      
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-gray-900 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-gray-900 to-transparent z-10 pointer-events-none" />
    </div>
  );
}
