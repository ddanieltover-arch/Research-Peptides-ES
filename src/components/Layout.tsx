import React, { Suspense, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLocaleNavigate } from '../i18n/useLocaleNavigate';
import { ArrowUp } from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { motion, AnimatePresence } from 'motion/react';
import { useAuthStore } from '../store/useAuthStore';
import { useSearchStore } from '../store/useSearchStore';
import { supabase } from '../supabase';
import Header from './navigation/Header';
import MobileNav from './navigation/MobileNav';
import SiteFooter from './navigation/SiteFooter';
import SelectorWizard from './wizard/SelectorWizard';
import RecentlyViewedSidebar from './products/RecentlyViewedSidebar';
import LiveTicker from './ticker/LiveTicker';
import ToastContainer from './ToastContainer';
import MobileBottomNav from './MobileBottomNav';
import SalesNotification from './SalesNotification';
import CartDrawer from './cart/CartDrawer';
import Omnisearch from './search/Omnisearch';
import LiveChatChat from './chat/LiveChatChat';
import LiveChatVisitorSync from './chat/LiveChatVisitorSync';
import { CookieConsent } from './gdpr/CookieConsent';
import { PageLoader } from './PageLoader';
import { postNewsletterSubscribe } from '../lib/transactionalEmailApi';
import { JsonLd } from './seo/JsonLd';
import { BRAND_NAME, SITE_URL } from '../config/brand';
import { DevConfigBanner } from './DevConfigBanner';
import { prefetchCriticalRoutes } from '../lib/routePrefetch';
import { whatsappUrl } from '../lib/whatsapp';

function LayoutShell() {
  const { t } = useTranslation('common');
  const { user, profile, setUser } = useAuthStore();
  const { openSearch } = useSearchStore();
  const navigate = useLocaleNavigate();
  const location = useLocation();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitting, setNewsletterSubmitting] = useState(false);
  const [newsletterMessage, setNewsletterMessage] = useState<string | null>(null);
  const [newsletterError, setNewsletterError] = useState<string | null>(null);

  const handleLogin = () => navigate('/login');

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  useEffect(() => {
    const run = () => prefetchCriticalRoutes();
    if (typeof window === 'undefined') return;
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(run);
      return () => window.cancelIdleCallback(id);
    }
    const timer = globalThis.setTimeout(run, 300);
    return () => globalThis.clearTimeout(timer);
  }, []);

  useEffect(() => {
    setMobileNavOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 500);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newsletterSubmitting) return;

    const email = newsletterEmail.trim();
    if (!email) {
      setNewsletterError(t('footer.newsletterEmptyError'));
      setNewsletterMessage(null);
      return;
    }

    setNewsletterSubmitting(true);
    setNewsletterError(null);
    setNewsletterMessage(null);

    try {
      await postNewsletterSubscribe({ email });
      setNewsletterMessage(t('footer.newsletterSuccess'));
      setNewsletterEmail('');
    } catch (error) {
      const message =
        error instanceof Error ? error.message : t('footer.newsletterFail');
      setNewsletterError(message);
    } finally {
      setNewsletterSubmitting(false);
    }
  };

  const siteUrl = SITE_URL.replace(/\/+$/, '');
  const whatsappHref = whatsappUrl();
  const globalSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": BRAND_NAME,
      "url": siteUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/brand_logo.png`
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "url": siteUrl,
      "name": BRAND_NAME,
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${siteUrl}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": BRAND_NAME,
      "url": siteUrl
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-mist-50 text-navy-950">
      <JsonLd data={globalSchemas} />
      <a
        href="#main-content"
        className="absolute left-4 -top-20 z-[100] rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-navy-950 shadow-elevated ring-2 ring-brand-500 transition-[top] focus:top-4 focus:outline-none"
      >
        Skip to main content
      </a>

      <div className="sticky top-0 z-50 isolate">
        <DevConfigBanner />
        <LiveTicker />
        <Header
          onLogin={handleLogin}
          onLogout={handleLogout}
          mobileMenuOpen={mobileNavOpen}
          onMobileMenuOpen={() => setMobileNavOpen((o) => !o)}
        />
      </div>

      <MobileNav
        open={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        user={user}
        isAdmin={profile?.role === 'admin'}
        onLogin={handleLogin}
        onLogout={handleLogout}
        onOpenSearch={openSearch}
      />

      <main id="main-content" className="flex-grow pb-20 md:pb-0 relative" tabIndex={-1}>
        <Suspense fallback={<PageLoader />}>
          <Outlet key={location.pathname} />
        </Suspense>
      </main>

      <SiteFooter
        newsletterEmail={newsletterEmail}
        newsletterSubmitting={newsletterSubmitting}
        newsletterMessage={newsletterMessage}
        newsletterError={newsletterError}
        onNewsletterEmailChange={setNewsletterEmail}
        onNewsletterSubmit={handleNewsletterSubmit}
      />

      <div className="fixed bottom-24 md:bottom-8 right-4 md:right-8 z-50 flex items-center gap-3">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-brand-500 hover:bg-brand-600 text-white rounded-full p-3 shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2"
          aria-label="Contact us on WhatsApp"
        >
          <WhatsAppIcon className="h-5 w-5" />
        </a>
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              type="button"
              onClick={handleBackToTop}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="bg-brand-500 hover:bg-brand-600 text-white rounded-full p-3 shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2"
              aria-label="Back to top"
            >
              <ArrowUp className="h-5 w-5" aria-hidden />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <MobileBottomNav />
      {!location.pathname.includes('/admin') && <SalesNotification />}
      <CartDrawer />
      <Omnisearch />
      <SelectorWizard />
      <RecentlyViewedSidebar />
      <ToastContainer />
      <CookieConsent />
      <LiveChatVisitorSync />
      <LiveChatChat />
    </div>
  );
}

export default function Layout() {
  return <LayoutShell />;
}
