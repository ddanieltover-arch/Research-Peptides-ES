'use client';

import React, { useEffect, type ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import { LocaleProvider } from '../i18n/LocaleProvider';
import { SeoProvider } from '../seo/SeoProvider';
import Layout from '../components/Layout';
import { useAuthStore } from '../store/useAuthStore';
import { useWishlistStore } from '../store/useWishlistStore';
import { supabase, isSupabaseConfigured } from '../supabase';
import type { LocaleCode } from '../i18n/locales';
import { persistLocaleCookie } from '../i18n/routing';
import '../index.css';

function AuthBootstrap({ children }: { children: ReactNode }) {
  const { setUser, fetchProfile, setAuthReady } = useAuthStore();
  const { fetchWishlist } = useWishlistStore();

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setAuthReady(true);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(
          session.user.id,
          session.user.email || '',
          session.user.user_metadata?.full_name || null,
          session.user.user_metadata?.avatar_url || null,
        );
        fetchWishlist(session.user.id);
      }
      setAuthReady(true);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(
          session.user.id,
          session.user.email || '',
          session.user.user_metadata?.full_name || null,
          session.user.user_metadata?.avatar_url || null,
        );
        fetchWishlist(session.user.id);
      } else {
        useAuthStore.getState().setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [setUser, fetchProfile, setAuthReady, fetchWishlist]);

  return <>{children}</>;
}

export function AppProviders({
  locale,
  children,
}: {
  locale: LocaleCode;
  children: ReactNode;
}) {
  useEffect(() => {
    void i18n.changeLanguage(locale);
    persistLocaleCookie(locale);
  }, [locale]);

  return (
    <I18nextProvider i18n={i18n}>
      <LocaleProvider initialLocale={locale}>
        <SeoProvider>
          <AuthBootstrap>
            <Layout>{children}</Layout>
          </AuthBootstrap>
        </SeoProvider>
      </LocaleProvider>
    </I18nextProvider>
  );
}
