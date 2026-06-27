import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LocaleLayout } from './i18n/LocaleLayout';
import { NON_DEFAULT_LOCALE_ROUTE_PARAM } from './i18n/routing';
import { createAppPageRoutes } from './routes/appPageRoutes';
import ScrollToTop from './components/ScrollToTop';
import { useAuthStore } from './store/useAuthStore';
import { useWishlistStore } from './store/useWishlistStore';
import { supabase, isSupabaseConfigured } from './supabase';

export default function App() {
  const { setUser, fetchProfile, setAuthReady } = useAuthStore();
  const { fetchWishlist } = useWishlistStore();

  React.useEffect(() => {
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

  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppRoutes />
    </BrowserRouter>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LocaleLayout />}>
        {createAppPageRoutes()}
      </Route>
      <Route path={`/:locale(${NON_DEFAULT_LOCALE_ROUTE_PARAM})`} element={<LocaleLayout />}>
        {createAppPageRoutes()}
      </Route>
    </Routes>
  );
}
