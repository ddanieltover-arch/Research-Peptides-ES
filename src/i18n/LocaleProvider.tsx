'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { setActiveLocale } from '../lib/currency';
import { getLocaleDefinition, isLocaleCode, type LocaleCode } from './locales';
import { DEFAULT_LOCALE } from './routing';
const STORAGE_KEY = 'rp-es-locale';
const LEGACY_STORAGE_KEY = 'rp-eu-locale';

type LocaleContextValue = {
  locale: LocaleCode;
  setLocale: (code: LocaleCode) => void;
  localeLabel: string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function readStoredLocale(): LocaleCode | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY) ?? localStorage.getItem(LEGACY_STORAGE_KEY);
    if (stored && isLocaleCode(stored)) return stored;
  } catch {
    /* private browsing */
  }
  return null;
}

export function LocaleProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale?: LocaleCode;
}) {
  const [locale, setLocaleState] = useState<LocaleCode>(
    () => initialLocale ?? readStoredLocale() ?? DEFAULT_LOCALE,
  );

  useEffect(() => {
    if (initialLocale) setLocaleState(initialLocale);
  }, [initialLocale]);

  const setLocale = useCallback((code: LocaleCode) => {
    setLocaleState(code);
  }, []);

  useEffect(() => {
    setActiveLocale(locale);
    try {
      localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      /* ignore */
    }
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      localeLabel: getLocaleDefinition(locale).nativeName,
    }),
    [locale, setLocale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error('useLocale must be used within LocaleProvider');
  }
  return ctx;
}
