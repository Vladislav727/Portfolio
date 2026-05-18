"use client";

import type { CSSProperties } from "react";

import { getContactDialogCopy } from "@/components/contact-dialog";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { useScrollReveal } from "@/components/use-scroll-reveal";
import {
  usePreferences,
  useTranslations,
} from "@/components/preferences-provider";

const reveal = (delay: string): CSSProperties => ({
  "--reveal-delay": delay,
} as CSSProperties);

export default function SettingsPage() {
  const { locale, setLocale, setTheme, theme } = usePreferences();
  const { __ } = useTranslations("settings/page");
  useScrollReveal();

  const contactCopy = getContactDialogCopy(__);
  const navItems = [
    { href: "/", label: __("nav.home") },
    { href: "/#info", label: __("nav.info") },
    { href: "/#projects", label: __("nav.projects") },
  ];

  return (
    <main className="page-shell">
      <div className="page-frame">
        <SiteHeader
          brandHref="/"
          brandLabel="Vladislav"
          navLabel={__("nav.aria")}
          navItems={navItems}
          settingsAria={__("settings.aria")}
          settingsActive
          className="fade-in"
          style={reveal("0ms")}
        />

        <section className="settings-page">
          <div className="settings-head fade-in" style={reveal("80ms")}>
            <span className="section-label">{__("header.label")}</span>
            <h1 className="settings-title">{__("header.title")}</h1>
          </div>

          <div className="settings-list fade-in" style={reveal("160ms")}>
            <div className="settings-row">
              <div className="settings-row-info">
                <p className="settings-row-name">{__("theme.title")}</p>
                <p className="settings-row-hint">{__("theme.hint")}</p>
              </div>
              <div className="settings-control">
                <button
                  className={theme === "light" ? "theme-opt theme-opt--active" : "theme-opt"}
                  type="button"
                  onClick={() => setTheme("light")}
                  aria-pressed={theme === "light"}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    width="15"
                    height="15"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                  </svg>
                  {__("theme.light")}
                </button>
                <button
                  className={theme === "dark" ? "theme-opt theme-opt--active" : "theme-opt"}
                  type="button"
                  onClick={() => setTheme("dark")}
                  aria-pressed={theme === "dark"}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    width="15"
                    height="15"
                    aria-hidden="true"
                  >
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                  </svg>
                  {__("theme.dark")}
                </button>
              </div>
            </div>

            <div className="settings-row">
              <div className="settings-row-info">
                <p className="settings-row-name">{__("language.title")}</p>
                <p className="settings-row-hint">{__("language.hint")}</p>
              </div>
              <div className="settings-control">
                <button
                  className={locale === "ru" ? "lang-opt lang-opt--active" : "lang-opt"}
                  type="button"
                  onClick={() => setLocale("ru")}
                  aria-pressed={locale === "ru"}
                >
                  {__("language.ru")}
                </button>
                <button
                  className={locale === "en" ? "lang-opt lang-opt--active" : "lang-opt"}
                  type="button"
                  onClick={() => setLocale("en")}
                  aria-pressed={locale === "en"}
                >
                  {__("language.en")}
                </button>
                <button
                  className={locale === "lv" ? "lang-opt lang-opt--active" : "lang-opt"}
                  type="button"
                  onClick={() => setLocale("lv")}
                  aria-pressed={locale === "lv"}
                >
                  {__("language.lv")}
                </button>
              </div>
            </div>
          </div>

          <div className="settings-note fade-in" style={reveal("240ms")}>
            <svg
              className="settings-note-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              width="15"
              height="15"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4M12 16h.01" />
            </svg>
            {__("note.saved")}
          </div>
        </section>

        <SiteFooter
          caption={__("footer.caption")}
          location={__("footer.location")}
          contactCopy={contactCopy}
          className="fade-in"
          style={reveal("320ms")}
        />
      </div>
    </main>
  );
}
