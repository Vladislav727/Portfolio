"use client";

import Image from "next/image";
import vladImg from "../../vlad.png";
import vladRiver from "../../vladokoloriver.jpg";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

import { getContactDialogCopy } from "@/components/contact-dialog";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { DebugFooter } from "@/components/debug-footer";
import { useScrollReveal } from "@/components/use-scroll-reveal";
import { useTranslations } from "@/components/preferences-provider";

import fitLifeLogo from "../../FitLifeLogo.png";
import eShopLogo from "../../e-ShopLogo.png";

const reveal = (delay: string): CSSProperties => ({
  "--reveal-delay": delay,
} as CSSProperties);

type LanguageCardProps = {
  flag: ReactNode;
  name: string;
  level: string;
  note?: string;
};

function LanguageCard({ flag, name, level, note }: LanguageCardProps) {
  return (
    <li className="language-card">
      <span className="language-flag" aria-hidden="true">
        {flag}
      </span>
      <span className="language-copy">
        <span className="language-name">{name}</span>
        {note ? <span className="language-note">{note}</span> : null}
      </span>
      <span className="language-badge">{level}</span>
    </li>
  );
}

export default function Home() {
  const { __ } = useTranslations("page");
  useScrollReveal();
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;

    const adjust = () => {
      // reset to CSS size first
      el.style.fontSize = "";
      const computed = window.getComputedStyle(el);
      let size = Math.max(12, parseFloat(computed.fontSize));

      // shrink until fits or reach minimum
      while (el.scrollWidth > el.clientWidth && size > 12) {
        size -= 1;
        el.style.fontSize = `${size}px`;
      }
    };

    adjust();

    const ro = new ResizeObserver(adjust);
    ro.observe(el);
    if (el.parentElement) ro.observe(el.parentElement);

    window.addEventListener("resize", adjust);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", adjust);
    };
  }, [__]);

  const contactCopy = getContactDialogCopy(__);
  const navItems = [
    { href: "#top", label: __("nav.home"), kind: "anchor" as const },
    { href: "#info", label: __("nav.info"), kind: "anchor" as const },
    { href: "#projects", label: __("nav.projects"), kind: "anchor" as const },
  ];
  const [portraitIndex, setPortraitIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setPortraitIndex((i) => (i + 1) % 2);
    }, 10000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <main className="page-shell">
      <div className="page-frame">
        <SiteHeader
          brandHref="#top"
          brandKind="anchor"
          brandLabel="Vladislav"
          navLabel={__("nav.aria")}
          navItems={navItems}
          settingsAria={__("settings.aria")}
          className="fade-in"
          style={reveal("0ms")}
        />

        <section className="hero" id="top">
          <div className="hero-intro">
            <p className="hero-eyebrow fade-in" style={reveal("90ms")}> {__("hero.eyebrow")} </p>

            <div className="hero-intro-row fade-in" style={reveal("170ms")}>
              <div className="hero-portrait-viewport" aria-hidden="true">
                <div
                  className="portrait-track"
                    style={{ transform: `translateX(${-portraitIndex * 50}%)` }}
                >
                  <div className="portrait-item">
                    <Image src={vladImg} alt="Vladislav" width={120} height={120} />
                  </div>
                  <div className="portrait-item">
                    <Image src={vladRiver} alt="Vlad by the river" width={120} height={120} />
                  </div>
                </div>
              </div>
              <h1
                className="hero-title"
                aria-label={`${__("hero.title.line1")} ${__("hero.title.line2")}`}
                ref={(el) => {
                  // attach ref via callback to keep TS happy
                  titleRef.current = el;
                }}
              >
                {__("hero.title.line1")} {__("hero.title.line2")}
              </h1>
            </div>
          </div>

          <div className="hero-actions fade-in" style={reveal("410ms")}>
            <a className="btn-primary" href="#projects">{__("hero.actions.projects")}</a>
            <a className="btn-ghost" href="#info">{__("hero.actions.about")}</a>
          </div>
        </section>

        <section className="section" id="info">
          <div className="section-head fade-in" style={reveal("60ms")}>
            <span className="section-label">{__("section.info.label")}</span>
          </div>

          <div className="accordion-list">
            <details className="accordion-item fade-in" style={reveal("100ms")}>
              <summary className="accordion-trigger">
                <span>{__("info.education.question")}</span>
                <span className="accordion-marker" aria-hidden="true">+</span>
              </summary>
              <div className="accordion-body">
                <div className="accordion-body-inner">
                  <p>{__("info.education.answer")}</p>
                  <div className="accordion-links">
                    <a
                      className="text-link"
                      href="https://www.vtdt.lv"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true" className="link-icon">
                        <circle cx="7.5" cy="7.5" r="6.5" stroke="currentColor" strokeWidth="1.3" />
                        <path d="M7.5 1C9.7 3 10.8 5.1 10.8 7.5S9.7 12 7.5 14C5.3 12 4.2 9.9 4.2 7.5S5.3 3 7.5 1Z" stroke="currentColor" strokeWidth="1.3" />
                        <path d="M1 7.5h13" stroke="currentColor" strokeWidth="1.3" />
                      </svg>
                      {__("info.education.website")}
                    </a>
                    <a
                      className="text-link text-link--fb"
                      href="https://www.facebook.com/share/1CVT2NAWam/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <svg width="17" height="17" viewBox="0 0 17 17" aria-hidden="true" className="link-icon link-icon--colored">
                        <rect width="17" height="17" rx="4" fill="#1877F2" />
                        <path d="M11.1 8.7H9.4V14H7.2V8.7H5.9V6.7h1.3V5.7C7.2 4.2 8 3.3 9.4 3.3c.6 0 1.2.06 1.2.06V5h-.8c-.68 0-.87.42-.87.85V6.7H11l-.28 2z" fill="white" />
                      </svg>
                      {__("info.education.facebook")}
                    </a>
                  </div>
                </div>
              </div>
            </details>

            <details className="accordion-item fade-in" style={reveal("140ms")}>
              <summary className="accordion-trigger">
                <span>{__("info.timeline.question")}</span>
                <span className="accordion-marker" aria-hidden="true">+</span>
              </summary>
              <div className="accordion-body">
                <div className="accordion-body-inner">
                  <p>{__("info.timeline.answer")}</p>
                </div>
              </div>
            </details>

            <details className="accordion-item fade-in" style={reveal("180ms")}>
              <summary className="accordion-trigger">
                <span>{__("info.speciality.question")}</span>
                <span className="accordion-marker" aria-hidden="true">+</span>
              </summary>
              <div className="accordion-body">
                <div className="accordion-body-inner">
                  <p>{__("info.speciality.answer")}</p>
                </div>
              </div>
            </details>

            <details className="accordion-item fade-in" style={reveal("220ms")}>
              <summary className="accordion-trigger">
                <span>{__("info.location.question")}</span>
                <span className="accordion-marker" aria-hidden="true">+</span>
              </summary>
              <div className="accordion-body">
                <div className="accordion-body-inner">
                  <p>{__("info.location.answer")}</p>
                </div>
              </div>
            </details>

            <details className="accordion-item fade-in" style={reveal("260ms")}>
              <summary className="accordion-trigger">
                <span>{__("info.languages.question")}</span>
                <span className="accordion-marker" aria-hidden="true">+</span>
              </summary>
              <div className="accordion-body">
                <div className="accordion-body-inner">
                  <ul className="language-levels">
                    <LanguageCard
                      flag={(
                        <svg viewBox="0 0 36 36" aria-hidden="true">
                          <rect width="36" height="18" fill="#2563eb" />
                          <rect y="18" width="36" height="18" fill="#facc15" />
                        </svg>
                      )}
                      name={__("info.languages.ukrainian.name")}
                      level={__("info.languages.ukrainian.level")}
                      note={__("info.languages.ukrainian.note") || undefined}
                    />
                    <LanguageCard
                      flag={(
                        <svg viewBox="0 0 36 36" aria-hidden="true">
                          <rect width="36" height="12" fill="#ffffff" />
                          <rect y="12" width="36" height="12" fill="#2563eb" />
                          <rect y="24" width="36" height="12" fill="#dc2626" />
                        </svg>
                      )}
                      name={__("info.languages.russian.name")}
                      level={__("info.languages.russian.level")}
                      note={__("info.languages.russian.note") || undefined}
                    />
                    <LanguageCard
                      flag={(
                        <svg viewBox="0 0 36 36" aria-hidden="true">
                          <rect width="36" height="36" fill="#1d4ed8" />
                          <path d="M0 4.5 4.5 0 36 31.5 31.5 36Z" fill="#ffffff" />
                          <path d="M31.5 0 36 4.5 4.5 36 0 31.5Z" fill="#ffffff" />
                          <path d="M0 7.5 7.5 0 36 28.5 28.5 36Z" fill="#dc2626" />
                          <path d="M28.5 0 36 7.5 7.5 36 0 28.5Z" fill="#dc2626" />
                          <rect x="14" width="8" height="36" fill="#ffffff" />
                          <rect y="14" width="36" height="8" fill="#ffffff" />
                          <rect x="15.5" width="5" height="36" fill="#dc2626" />
                          <rect y="15.5" width="36" height="5" fill="#dc2626" />
                        </svg>
                      )}
                      name={__("info.languages.english.name")}
                      level={__("info.languages.english.level")}
                      note={__("info.languages.english.note") || undefined}
                    />
                    <LanguageCard
                      flag={(
                        <svg viewBox="0 0 36 36" aria-hidden="true">
                          <rect width="36" height="14" fill="#8f1d36" />
                          <rect y="14" width="36" height="8" fill="#ffffff" />
                          <rect y="22" width="36" height="14" fill="#8f1d36" />
                        </svg>
                      )}
                      name={__("info.languages.latvian.name")}
                      level={__("info.languages.latvian.level")}
                      note={__("info.languages.latvian.note") || undefined}
                    />
                  </ul>
                </div>
              </div>
            </details>
          </div>
        </section>

        <section className="section" id="projects">
          <div className="section-head fade-in" style={reveal("60ms")}>
            <span className="section-label">{__("section.projects.label")}</span>
            <h2 className="section-title">{__("projects.title")}</h2>
          </div>

          <div className="project-grid">
            <article className="project-card fade-in" style={reveal("120ms")}>
              <div className="project-logo">
                <Image alt={__("projects.eshop.alt")} src={eShopLogo} />
              </div>
              <div className="project-info">
                <span className="project-tag">{__("projects.eshop.tag")}</span>
                <h3 className="project-name">e-Shop</h3>
                <a
                  className="project-url"
                  href="https://filamentcheckm8.shop"
                  target="_blank"
                  rel="noreferrer"
                >
                  filamentcheckm8.shop ↗
                </a>
              </div>
            </article>

            <article className="project-card fade-in" style={reveal("180ms")}>
              <div className="project-logo">
                <Image alt={__("projects.fitlife.alt")} src={fitLifeLogo} />
              </div>
              <div className="project-info">
                <span className="project-tag">{__("projects.fitlife.tag")}</span>
                <h3 className="project-name">FitLife</h3>
                <a
                  className="project-url"
                  href="https://www.fit-life.style"
                  target="_blank"
                  rel="noreferrer"
                >
                  www.fit-life.style ↗
                </a>
              </div>
            </article>
          </div>
        </section>

        <DebugFooter />

        <SiteFooter
          caption={__("footer.caption")}
          location={__("footer.location")}
          contactCopy={contactCopy}
          className="fade-in"
          style={reveal("120ms")}
        />
      </div>
    </main>
  );
}
