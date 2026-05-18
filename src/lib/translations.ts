import enPage from "@/languages/en/page";
import enSettingsPage from "@/languages/en/settings/page";
import lvPage from "@/languages/lv/page";
import lvSettingsPage from "@/languages/lv/settings/page";
import ruPage from "@/languages/ru/page";
import ruSettingsPage from "@/languages/ru/settings/page";

export const locales = ["ru", "en", "lv"] as const;
export const themes = ["dark", "light"] as const;

export type Locale = (typeof locales)[number];
export type Theme = (typeof themes)[number];
export type TranslationNamespace = "page" | "settings/page";

type TranslationDictionary = Record<string, string>;

export const defaultLocale: Locale = "ru";
export const defaultTheme: Theme = "dark";

const dictionaries: Record<
  Locale,
  Record<TranslationNamespace, TranslationDictionary>
> = {
  ru: {
    page: ruPage,
    "settings/page": ruSettingsPage,
  },
  en: {
    page: enPage,
    "settings/page": enSettingsPage,
  },
  lv: {
    page: lvPage,
    "settings/page": lvSettingsPage,
  },
};

export function isLocale(value: string | null | undefined): value is Locale {
  return typeof value === "string" && locales.includes(value as Locale);
}

export function isTheme(value: string | null | undefined): value is Theme {
  return typeof value === "string" && themes.includes(value as Theme);
}

export function translate(
  locale: Locale,
  namespace: TranslationNamespace,
  key: string,
  replacements: Record<string, string | number> = {},
): string {
  const message =
    dictionaries[locale][namespace][key] ??
    dictionaries[defaultLocale][namespace][key] ??
    key;

  let output = message;

  for (const [name, value] of Object.entries(replacements)) {
    output = output.replaceAll(`:${name}`, String(value));
  }

  return output;
}
