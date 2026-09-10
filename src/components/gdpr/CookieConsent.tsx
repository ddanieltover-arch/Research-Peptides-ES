import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../../design-system';
import { useLocalizedPath } from '../../i18n/useLocalizedPath';

const CONSENT_KEY = 'rp-eu-cookie-consent';

export type CookieConsentLevel = 'all' | 'essential';

export function CookieConsent() {
  const { t } = useTranslation('legal');
  const privacyPath = useLocalizedPath('/privacy');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_KEY);
      if (!stored) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const save = (level: CookieConsentLevel) => {
    try {
      localStorage.setItem(CONSENT_KEY, level);
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-labelledby="cookie-consent-title"
          aria-describedby="cookie-consent-desc"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          /* Mobile: top under header so hero CTAs stay visible. Desktop: bottom corner. */
          className="fixed z-[90] left-3 right-3 top-[4.75rem] md:top-auto md:bottom-6 md:left-auto md:right-6 md:max-w-md bg-white border border-slate-200 rounded-xl shadow-elevated p-4 md:p-5"
        >
          <div className="flex gap-3 mb-3">
            <div className="shrink-0 w-9 h-9 rounded-lg bg-brand-50 flex items-center justify-center">
              <Shield className="h-4 w-4 text-brand-600" aria-hidden />
            </div>
            <div className="min-w-0">
              <h2 id="cookie-consent-title" className="font-display font-bold text-navy-950 text-sm">
                {t('cookie.title')}
              </h2>
              <p id="cookie-consent-desc" className="text-xs text-steel-600 mt-1 leading-relaxed">
                {t('cookie.description')}
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button size="sm" fullWidth onClick={() => save('all')}>
              {t('cookie.acceptAll')}
            </Button>
            <Button size="sm" variant="secondary" fullWidth onClick={() => save('essential')}>
              {t('cookie.essentialOnly')}
            </Button>
          </div>
          <Link
            href={privacyPath}
            className="block text-center text-xs text-brand-600 font-semibold mt-2.5 hover:text-brand-700"
          >
            {t('cookie.privacyLink')}
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
