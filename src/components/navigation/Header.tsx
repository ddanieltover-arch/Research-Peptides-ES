import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { usePathname } from 'next/navigation';
import { LocaleLink } from '../../i18n/LocaleLink';
import { stripLocaleFromPath } from '../../i18n/routing';
import { Heart, Search, ShoppingCart } from 'lucide-react';
import logo from '../../assets/brandLogo';
import { useAuthStore } from '../../store/useAuthStore';
import { useCartStore } from '../../store/useCartStore';
import { useSearchStore } from '../../store/useSearchStore';
import { primaryNav, type MegaMenuId } from '../../navigation/config';
import { Button } from '../../design-system';
import { cn } from '../../lib/utils';
import { BRAND_NAME } from '../../config/brand';
import LanguageSwitcher from './LanguageSwitcher';
import MegaMenu from './MegaMenu';
import AccountMenu from './AccountMenu';

type HeaderProps = {
  onLogin: () => void;
  onLogout: () => void;
  onMobileMenuOpen: () => void;
  mobileMenuOpen: boolean;
};

function isMegaItem(item: (typeof primaryNav)[number]): item is { labelKey: string; megaMenu: MegaMenuId } {
  return 'megaMenu' in item;
}

export default function Header({
  onLogin,
  onLogout,
  onMobileMenuOpen,
  mobileMenuOpen,
}: HeaderProps) {
  const { user, profile } = useAuthStore();
  const { items, openCart } = useCartStore();
  const { openSearch } = useSearchStore();
  const { t } = useTranslation('common');
  const { t: tNav } = useTranslation('nav');
  const pathname = usePathname() || '/';
  const pathWithoutLocale = stripLocaleFromPath(pathname);
  const [scrolled, setScrolled] = useState(false);
  const [activeMega, setActiveMega] = useState<MegaMenuId | null>(null);
  const [accountOpen, setAccountOpen] = useState(false);

  const cartItemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setActiveMega(null);
    setAccountOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openSearch]);

  const iconBtnClass =
    'relative flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 hover:text-brand-600 hover:bg-slate-100 transition-colors cursor-pointer';

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full transition-all duration-200',
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm'
          : 'bg-white/90 backdrop-blur-sm border-b border-slate-200/80',
      )}
      onMouseLeave={() => setActiveMega(null)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <LocaleLink
            to="/"
            className="shrink-0 flex items-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            aria-label={`${BRAND_NAME} home`}
          >
            <img
              src={logo}
              alt={BRAND_NAME}
              className="h-9 sm:h-10 w-auto"
              width={160}
              height={44}
              fetchPriority="high"
              decoding="async"
            />
          </LocaleLink>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
            {primaryNav.map((item) => {
              if (isMegaItem(item)) {
                const open = activeMega === item.megaMenu;
                const megaHref = item.megaMenu === 'shop' ? '/shop' : '/peptide-research';
                return (
                  <div
                    key={item.labelKey}
                    className="relative"
                    onMouseEnter={() => setActiveMega(item.megaMenu)}
                  >
                    <LocaleLink
                      to={megaHref}
                      onClick={() => setActiveMega(null)}
                      className={cn(
                        'px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors inline-block',
                        open || pathWithoutLocale === megaHref
                          ? 'text-brand-600 bg-brand-50'
                          : 'text-slate-600 hover:text-navy-950 hover:bg-slate-100/70',
                      )}
                      aria-expanded={open}
                      aria-controls="mega-menu-panel"
                    >
                      {tNav(item.labelKey)}
                    </LocaleLink>
                  </div>
                );
              }
              return (
                <LocaleLink
                  key={item.href}
                  to={item.href}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors',
                    pathWithoutLocale === item.href
                      ? 'text-brand-600 bg-brand-50'
                      : 'text-slate-600 hover:text-navy-950 hover:bg-slate-100/70',
                  )}
                >
                  {tNav(item.labelKey)}
                </LocaleLink>
              );
            })}
          </nav>

          <div
            className="hidden md:flex items-center gap-2"
            role="navigation"
            aria-label="Search, language, wishlist, and cart"
          >
            <button
              type="button"
              onClick={openSearch}
              className="hidden xl:flex items-center gap-2 h-9 px-3 rounded-lg border border-slate-200/90 bg-slate-50/80 hover:bg-slate-100/80 hover:border-slate-300 text-xs text-slate-500 transition-all font-sans cursor-pointer"
              aria-label="Open product search (Cmd+K)"
            >
              <Search className="h-3.5 w-3.5 text-slate-400" />
              <span className="font-normal text-slate-500">Buscar péptidos, CAS...</span>
              <kbd className="ml-1 inline-flex items-center gap-0.5 rounded border border-slate-200 bg-white px-1.5 py-0.5 font-mono text-[10px] font-medium text-slate-400 shadow-[0_1px_0_0_rgba(0,0,0,0.05)]">
                ⌘K
              </kbd>
            </button>
            <button type="button" className={cn(iconBtnClass, 'xl:hidden')} onClick={openSearch} aria-label="Open product search">
              <Search className="h-4 w-4" aria-hidden />
            </button>
            <LanguageSwitcher />
            {user ? (
              <LocaleLink
                to="/wishlist"
                className={iconBtnClass}
                aria-label={t('wishlist')}
              >
                <Heart className="h-4 w-4" aria-hidden />
              </LocaleLink>
            ) : null}
            <button
              type="button"
              className={iconBtnClass}
              onClick={openCart}
              aria-label={
                cartItemCount > 0 ? `Open cart, ${cartItemCount} items` : 'Open cart'
              }
            >
              <ShoppingCart className="h-4 w-4" aria-hidden />
              {cartItemCount > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 min-w-[1.125rem] h-[1.125rem] px-0.5 bg-brand-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums"
                  aria-hidden
                >
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </span>
              )}
            </button>
            {user ? (
              <AccountMenu
                open={accountOpen}
                onOpenChange={setAccountOpen}
                photoUrl={profile?.photo_url}
                isAdmin={profile?.role === 'admin'}
                onLogout={onLogout}
              />
            ) : (
              <Button size="sm" onClick={onLogin} className="ml-1">
                {t('login')}
              </Button>
            )}
          </div>

          <div className="flex md:hidden items-center gap-1">
            <button type="button" className={iconBtnClass} onClick={openSearch} aria-label="Open product search">
              <Search className="h-5 w-5" aria-hidden />
            </button>
            <button
              type="button"
              className={iconBtnClass}
              onClick={openCart}
              aria-label={
                cartItemCount > 0 ? `Open cart, ${cartItemCount} items` : 'Open cart'
              }
            >
              <ShoppingCart className="h-5 w-5" aria-hidden />
              {cartItemCount > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 min-w-[1.125rem] h-[1.125rem] px-0.5 bg-brand-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                  aria-hidden
                >
                  {cartItemCount}
                </span>
              )}
            </button>
            <button
              type="button"
              className={cn(iconBtnClass, mobileMenuOpen && 'bg-brand-50 text-brand-600')}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-drawer"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              onClick={onMobileMenuOpen}
            >
              <span className="sr-only">{mobileMenuOpen ? 'Close' : 'Menu'}</span>
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                ) : (
                  <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      <MegaMenu activeMenu={activeMega} onClose={() => setActiveMega(null)} />
    </header>
  );
}
