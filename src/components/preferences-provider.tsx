"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";

import {
  translate,
  type Locale,
  type Theme,
  type TranslationNamespace,
} from "@/lib/translations";

type PreferencesContextValue = {
  locale: Locale;
  theme: Theme;
  setLocale: (locale: Locale) => void;
  setTheme: (theme: Theme) => void;
};

type PreferencesProviderProps = {
  children: ReactNode;
  initialLocale: Locale;
  initialTheme: Theme;
};

const PREFERENCE_THEME_KEY = "portfolio-theme";
const PREFERENCE_LOCALE_KEY = "portfolio-locale";

const PreferencesContext = createContext<PreferencesContextValue | null>(null);

function persistPreference(name: string, value: string) {
  window.localStorage.setItem(name, value);
  document.cookie = `${name}=${value}; path=/; max-age=31536000; samesite=lax`;
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

function applyLocale(locale: Locale) {
  document.documentElement.lang = locale;
}

export function PreferencesProvider({
  children,
  initialLocale,
  initialTheme,
}: PreferencesProviderProps) {
  const [locale, setLocale] = useState<Locale>(initialLocale);
  const [theme, setTheme] = useState<Theme>(initialTheme);

  useEffect(() => {
    applyTheme(theme);
    persistPreference(PREFERENCE_THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    applyLocale(locale);
    persistPreference(PREFERENCE_LOCALE_KEY, locale);
  }, [locale]);

  return (
    <PreferencesContext.Provider value={{ locale, theme, setLocale, setTheme }}>
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const context = useContext(PreferencesContext);

  if (!context) {
    throw new Error("usePreferences must be used within PreferencesProvider");
  }

  return context;
}

export function useTranslations(namespace: TranslationNamespace) {
  const { locale } = usePreferences();

  const __ = (key: string, replacements?: Record<string, string | number>) =>
    translate(locale, namespace, key, replacements);

  return { __, locale };
}
