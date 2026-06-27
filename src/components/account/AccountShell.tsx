import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronRight, Heart, Package, Settings, User } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { Container, PageShell } from '../../design-system';
import { CatalogPageHeader } from '../catalog/CatalogPageHeader';
import { LocaleButton } from '../../i18n/LocaleButton';
import { LocaleLink } from '../../i18n/LocaleLink';
import { cn } from '../../lib/utils';

const NAV = [
  { labelKey: 'nav.overview', icon: User, path: '/profile' },
  { labelKey: 'nav.orders', icon: Package, path: '/orders' },
  { labelKey: 'nav.wishlist', icon: Heart, path: '/wishlist' },
  { labelKey: 'nav.settings', icon: Settings, path: '/profile' },
] as const;

type AccountShellProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export function AccountShell({ title, subtitle, children }: AccountShellProps) {
  const { t } = useTranslation('account');
  const { user, profile } = useAuthStore();
  const location = useLocation();

  if (!user || !profile) {
    return (
      <PageShell tone="mist" className="min-h-[60vh] flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <User className="h-14 w-14 text-brand-200 mx-auto mb-4" aria-hidden />
          <p className="font-display font-bold text-xl text-navy-950 mb-2">{t('signInRequired')}</p>
          <p className="text-steel-600 text-sm mb-6">{t('signInPrompt')}</p>
          <LocaleButton to="/login" size="md">
            {t('signIn')}
          </LocaleButton>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell tone="mist">
      <CatalogPageHeader
        eyebrow={t('eyebrow')}
        title={title}
        description={subtitle ?? t('signedInAs', { email: profile.email })}
      />

      <Container className="py-10 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          <aside className="w-full lg:w-72 shrink-0 space-y-4">
            <div className="bg-white rounded-3xl border border-brand-100 p-6 shadow-card text-center">
              <div className="h-20 w-20 mx-auto rounded-full bg-brand-50 p-1 mb-4">
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-white bg-white flex items-center justify-center">
                  {profile.photo_url ? (
                    <img
                      src={profile.photo_url}
                      alt=""
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <User className="h-10 w-10 text-brand-200" aria-hidden />
                  )}
                </div>
              </div>
              <h2 className="font-display font-bold text-navy-950">
                {profile.display_name || t('defaultName')}
              </h2>
              <p className="text-caption text-brand-600 mt-1">{profile.role}</p>
            </div>

            <nav className="bg-white rounded-3xl border border-brand-100 p-3 shadow-card space-y-1">
              {NAV.map((item) => {
                const active = location.pathname.endsWith(item.path);
                return (
                  <LocaleLink
                    key={item.path + item.labelKey}
                    to={item.path}
                    className={cn(
                      'flex items-center justify-between p-3.5 rounded-2xl transition-all group',
                      active
                        ? 'bg-brand-500 text-white shadow-card'
                        : 'text-steel-600 hover:bg-brand-50 hover:text-brand-700',
                    )}
                  >
                    <span className="flex items-center gap-3 font-semibold text-sm">
                      <item.icon className="h-4 w-4" aria-hidden />
                      {t(item.labelKey)}
                    </span>
                    <ChevronRight
                      className={cn(
                        'h-4 w-4 transition-transform group-hover:translate-x-0.5',
                        active ? 'text-white/70' : 'text-silver-400',
                      )}
                      aria-hidden
                    />
                  </LocaleLink>
                );
              })}
            </nav>
          </aside>

          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </Container>
    </PageShell>
  );
}
