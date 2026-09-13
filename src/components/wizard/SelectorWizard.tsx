import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, ArrowLeft, CheckCircle2, Sparkles, Target, Zap, Waves } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useWizardStore } from '../../store/useWizardStore';
import { supabase } from '../../supabase';
import { useLocaleNavigate } from '../../i18n/useLocaleNavigate';
import { ProductImagePlaceholder } from '../products/ProductImagePlaceholder';
import { productPath } from '../../lib/productUrl';

interface WizardOption {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  /** Product `categories` tag used for catalog lookup (English slug/name as stored in DB). */
  category?: string;
  description?: string;
}

interface WizardStep {
  id: string;
  title: string;
  options: WizardOption[];
}

export default function SelectorWizard() {
  const { t } = useTranslation('wizard');
  const { isOpen, closeWizard } = useWizardStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useLocaleNavigate();

  const steps: WizardStep[] = useMemo(
    () => [
      {
        id: 'goal',
        title: t('steps.goal.title'),
        options: [
          {
            id: 'fat-loss',
            label: t('steps.goal.options.fat-loss'),
            icon: Target,
            category: 'peptides',
          },
          {
            id: 'muscle',
            label: t('steps.goal.options.muscle'),
            icon: Zap,
            category: 'peptides',
          },
          {
            id: 'recovery',
            label: t('steps.goal.options.recovery'),
            icon: Waves,
            category: 'peptide-blends',
          },
          {
            id: 'cognitive',
            label: t('steps.goal.options.cognitive'),
            icon: Sparkles,
            category: 'research-chemicals',
          },
        ],
      },
      {
        id: 'experience',
        title: t('steps.experience.title'),
        options: [
          {
            id: 'beginner',
            label: t('steps.experience.options.beginner.label'),
            description: t('steps.experience.options.beginner.description'),
          },
          {
            id: 'intermediate',
            label: t('steps.experience.options.intermediate.label'),
            description: t('steps.experience.options.intermediate.description'),
          },
          {
            id: 'advanced',
            label: t('steps.experience.options.advanced.label'),
            description: t('steps.experience.options.advanced.description'),
          },
        ],
      },
    ],
    [t],
  );

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
      setSelections({});
      setRecommendations([]);
    }
  }, [isOpen]);

  const handleSelect = (stepId: string, optionId: string) => {
    const next = { ...selections, [stepId]: optionId };
    setSelections(next);
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      void fetchRecommendations(next);
    }
  };

  const fetchRecommendations = async (sel: Record<string, string>) => {
    setLoading(true);
    setCurrentStep(steps.length);
    try {
      const selectedGoal = steps[0].options.find((o) => o.id === sel.goal);
      const category = selectedGoal?.category || 'peptides';

      const { data } = await supabase
        .from('products')
        .select('*')
        .contains('categories', [category])
        .limit(3);

      if (!data || data.length === 0) {
        const { data: fallback } = await supabase.from('products').select('*').limit(3);
        setRecommendations(fallback || []);
      } else {
        setRecommendations(data);
      }
    } catch (err) {
      console.error('Wizard error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleProductClick = (product: any) => {
    closeWizard();
    navigate(productPath(product));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6"
        >
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-md" onClick={closeWizard} />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-xl shadow-elevated overflow-hidden border border-slate-200"
          >
            <div className="p-8 border-b dark:border-gray-800 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
                  {t('title')}
                </h2>
                <p className="text-gray-500 text-sm mt-1">{t('subtitle')}</p>
              </div>
              <button
                type="button"
                onClick={closeWizard}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                aria-label={t('title')}
              >
                <X className="h-6 w-6 text-gray-400" />
              </button>
            </div>

            <div className="p-8 min-h-[400px]">
              {currentStep < steps.length ? (
                <div className="space-y-8">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-brand-600 uppercase tracking-widest">
                      {t('stepOf', { current: currentStep + 1, total: steps.length })}
                    </span>
                    <div className="flex gap-1">
                      {steps.map((_, i) => (
                        <div
                          key={i}
                          className={`h-1 w-6 rounded-full ${i <= currentStep ? 'bg-brand-600' : 'bg-gray-100 dark:bg-gray-800'}`}
                        />
                      ))}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {steps[currentStep].title}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {steps[currentStep].options.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => handleSelect(steps[currentStep].id, option.id)}
                        className="group p-6 rounded-xl border-2 border-gray-100 dark:border-gray-800 hover:border-brand-500 dark:hover:border-brand-500 hover:bg-brand-50/30 transition-all text-left flex items-start gap-4"
                      >
                        {option.icon && (
                          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl group-hover:bg-brand-100 dark:group-hover:bg-brand-900/50 transition-colors">
                            <option.icon className="h-6 w-6 text-gray-400 group-hover:text-brand-600" />
                          </div>
                        )}
                        <div>
                          <p className="font-bold text-gray-900 dark:text-white group-hover:text-brand-600 transition-colors">
                            {option.label}
                          </p>
                          {option.description && (
                            <p className="text-sm text-gray-500 mt-1">{option.description}</p>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>

                  {currentStep > 0 && (
                    <button
                      type="button"
                      onClick={() => setCurrentStep((prev) => prev - 1)}
                      className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors"
                    >
                      <ArrowLeft className="h-4 w-4" /> {t('goBack')}
                    </button>
                  )}
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="h-8 w-8 text-green-500" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 dark:text-white">
                      {t('resultsTitle')}
                    </h3>
                    <p className="text-gray-500 mt-1">{t('resultsBody')}</p>
                  </div>

                  {loading ? (
                    <div className="flex flex-col items-center py-12">
                      <div className="h-8 w-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mb-4" />
                      <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">
                        {t('filtering')}
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-4">
                      {recommendations.map((product) => (
                        <div
                          key={product.id}
                          onClick={() => handleProductClick(product)}
                          className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:shadow-elevated transition-all cursor-pointer group"
                        >
                          <div className="h-20 w-20 rounded-xl overflow-hidden bg-gray-50 shrink-0">
                            {product.images?.[0] ? (
                              <img
                                src={product.images[0]}
                                alt=""
                                className="h-full w-full object-cover group-hover:scale-110 transition-transform"
                              />
                            ) : (
                              <ProductImagePlaceholder
                                productId={String(product.id)}
                                title={product.title}
                                className="h-full w-full min-h-20"
                                compact
                              />
                            )}
                          </div>
                          <div className="flex-grow">
                            <p className="text-[10px] font-black text-brand-600 uppercase mb-1">
                              {t('recommended')}
                            </p>
                            <h4 className="font-bold text-gray-900 dark:text-white">{product.title}</h4>
                            <p className="text-sm text-gray-500 line-clamp-1">{product.description}</p>
                          </div>
                          <ArrowRight className="h-5 w-5 text-gray-300 group-hover:text-brand-600 transition-colors" />
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(0)}
                      className="flex-1 py-4 font-bold text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-all"
                    >
                      {t('restart')}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        navigate('/shop');
                        closeWizard();
                      }}
                      className="flex-1 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-black rounded-xl shadow-elevated hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                      {t('viewShop')}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
