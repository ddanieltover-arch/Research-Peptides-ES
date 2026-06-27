import React from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, MessageSquare, Clock, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { Container, GlassPanel, GlowPanel, PageShell, Reveal } from '../design-system';
import { pageEnterTransition } from '../design-system/motion';
import { HQ_LOCATION, SUPPORT_EMAIL } from '../config/brand';
import { useToastStore } from '../store/useToastStore';
import { postContactEmail } from '../lib/transactionalEmailApi';

const SUBJECT_KEYS = ['general', 'bulk', 'coa', 'shipping'] as const;

export default function Contact() {
  const { t } = useTranslation('legal');
  const addToast = useToastStore((state) => state.addToast);
  const defaultSubject = t('contact.subjects.general');
  const [fullName, setFullName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [subject, setSubject] = React.useState(defaultSubject);
  const [message, setMessage] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitState, setSubmitState] = React.useState<'idle' | 'success' | 'error'>('idle');
  const [submitErrorDetail, setSubmitErrorDetail] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitState('idle');
    setSubmitErrorDetail('');
    try {
      await postContactEmail({ fullName, email, subject, message });
      setSubmitState('success');
      addToast(t('contact.toastSuccess'), 'success');
      setFullName('');
      setEmail('');
      setSubject(defaultSubject);
      setMessage('');
    } catch (err: unknown) {
      const detail = err instanceof Error ? err.message : t('contact.failFallback');
      setSubmitState('error');
      setSubmitErrorDetail(detail);
      addToast(t('contact.toastFail'), 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageShell tone="mist" className="pt-12">
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={pageEnterTransition()}
              className="mb-12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-50 text-brand-600 rounded-full text-xs font-semibold uppercase tracking-wider mb-6">
                <MessageSquare className="h-4 w-4" aria-hidden />
                {t('contact.eyebrow')}
              </div>
              <h1 className="text-h1 text-navy-950 mb-6">{t('contact.title')}</h1>
              <p className="text-lg text-steel-600 leading-relaxed max-w-lg">{t('contact.subtitle')}</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <Reveal>
                <GlassPanel variant="light" padding="sm" className="p-6 shadow-card h-full">
                  <Mail className="h-6 w-6 text-brand-600 mb-3" aria-hidden />
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-silver-400 mb-2">
                    {t('contact.emailLabel')}
                  </h4>
                  <a href={`mailto:${SUPPORT_EMAIL}`} className="font-semibold text-navy-950 break-words hover:text-brand-600">
                    {SUPPORT_EMAIL}
                  </a>
                </GlassPanel>
              </Reveal>

              <Reveal delay={0.08} className="sm:col-span-2">
                <GlassPanel variant="light" padding="sm" className="p-6 shadow-card">
                  <MapPin className="h-6 w-6 text-brand-600 mb-3" aria-hidden />
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-silver-400 mb-2">
                    {t('contact.locationLabel')}
                  </h4>
                  <p className="font-semibold text-navy-950">{t('contact.locationValue')}</p>
                  <p className="text-sm text-steel-600 mt-1">{HQ_LOCATION}</p>
                </GlassPanel>
              </Reveal>
              <Reveal delay={0.1} className="sm:col-span-2">
                <GlassPanel variant="light" padding="sm" className="p-6 shadow-card">
                  <Clock className="h-6 w-6 text-brand-600 mb-3" aria-hidden />
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-silver-400 mb-2">
                    {t('contact.supportHoursLabel')}
                  </h4>
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-semibold text-navy-950">{t('contact.supportDays')}</span>
                    <span className="text-brand-600 font-semibold">{t('contact.supportTime')}</span>
                  </div>
                </GlassPanel>
              </Reveal>
            </div>

            <GlowPanel glow="brand" className="mt-12 p-8 bg-gradient-cta text-white relative overflow-hidden rounded-[2.5rem]">
              <ShieldCheck className="absolute -right-8 -bottom-8 h-48 w-48 text-white/10 pointer-events-none" aria-hidden />
              <h4 className="text-lg font-bold mb-2">{t('contact.privacyTitle')}</h4>
              <p className="text-brand-100 text-sm leading-relaxed">{t('contact.privacyBody')}</p>
            </GlowPanel>
          </div>

          <Reveal>
            <GlassPanel variant="light" padding="lg" className="shadow-glow p-8 md:p-12">
              <h3 className="text-2xl font-black mb-8 tracking-tight">{t('contact.formTitle')}</h3>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="contact-full-name" className="text-[10px] font-black uppercase tracking-[0.2em] text-steel-600 ml-4">
                      {t('contact.fullNameLabel')}
                    </label>
                    <input
                      id="contact-full-name"
                      type="text"
                      placeholder={t('contact.fullNamePlaceholder')}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      autoComplete="name"
                      className="w-full px-6 py-4 bg-mist-50 border border-brand-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-400/30 focus:bg-white transition-all text-sm font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="contact-email" className="text-[10px] font-black uppercase tracking-[0.2em] text-steel-600 ml-4">
                      {t('contact.emailAddressLabel')}
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder={t('contact.emailPlaceholder')}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoComplete="email"
                      className="w-full px-6 py-4 bg-mist-50 border border-brand-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-400/30 focus:bg-white transition-all text-sm font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact-subject" className="text-[10px] font-black uppercase tracking-[0.2em] text-steel-600 ml-4">
                    {t('contact.subjectLabel')}
                  </label>
                  <select
                    id="contact-subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-6 py-4 bg-mist-50 border border-brand-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-400/30 focus:bg-white transition-all text-sm font-medium appearance-none"
                  >
                    {SUBJECT_KEYS.map((key) => (
                      <option key={key} value={t(`contact.subjects.${key}`)}>
                        {t(`contact.subjects.${key}`)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact-message" className="text-[10px] font-black uppercase tracking-[0.2em] text-steel-600 ml-4">
                    {t('contact.messageLabel')}
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    placeholder={t('contact.messagePlaceholder')}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="w-full px-6 py-4 bg-mist-50 border border-brand-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-400/30 focus:bg-white transition-all text-sm font-medium"
                  />
                </div>

                {submitState === 'success' && (
                  <p className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
                    {t('contact.successMessage')}
                  </p>
                )}
                {submitState === 'error' && (
                  <div className="text-xs font-bold text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3 space-y-1">
                    <p>{t('contact.failMessage')}</p>
                    {submitErrorDetail && (
                      <p className="font-medium text-red-600/95 whitespace-pre-wrap break-words leading-relaxed">{submitErrorDetail}</p>
                    )}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-500 text-white font-black py-5 rounded-2xl hover:bg-brand-600 transition-all active:scale-95 shadow-lg shadow-glow flex items-center justify-center gap-2 uppercase tracking-widest text-xs disabled:opacity-60"
                >
                  {t('contact.submit')}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </button>
              </form>
            </GlassPanel>
          </Reveal>
        </div>
      </Container>
    </PageShell>
  );
}
