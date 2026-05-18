"use client";

import { useEffect, useId, useMemo, useState } from "react";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

type LinkKind = "link" | "anchor";

type HeaderNavItem = {
  href: string;
  label: string;
  kind?: LinkKind;
};

type HeaderLinkProps = {
  href: string;
  kind?: LinkKind;
  className?: string;
  children: ReactNode;
  onNavigate?: () => void;
};

type SiteHeaderProps = {
  brandLabel: string;
  brandHref: string;
  brandKind?: LinkKind;
  navLabel: string;
  navItems: HeaderNavItem[];
  settingsAria: string;
  settingsActive?: boolean;
  className?: string;
  style?: CSSProperties;
};

function HeaderLink({
  href,
  kind = "link",
  className,
  children,
  onNavigate,
}: HeaderLinkProps) {
  if (kind === "anchor") {
    return (
      <a
        className={className}
        href={href}
        onClick={() => onNavigate?.()}
      >
        {children}
      </a>
    );
  }

  return (
    <Link className={className} href={href} onClick={() => onNavigate?.()}>
      {children}
    </Link>
  );
}

export function SiteHeader({
  brandLabel,
  brandHref,
  brandKind = "link",
  navLabel,
  navItems,
  settingsAria,
  settingsActive = false,
  className,
  style,
}: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 700) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);

    // Закрываем мобильное меню при попытке скролла/взаимодействия.
    const onTouchStart = () => setMenuOpen(false);
    window.addEventListener("touchstart", onTouchStart, { passive: true });

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("touchstart", onTouchStart);
    };
  }, []);


  const navItemsMemo = useMemo(() => navItems ?? [], [navItems]);


  return (
    <header
      className={["site-header", className].filter(Boolean).join(" ")}
      style={style}
    >
      <HeaderLink
        className="site-brand"
        href={brandHref}
        kind={brandKind}
        onNavigate={() => setMenuOpen(false)}
      >
        <span className="sr-only">{brandLabel}</span>
      </HeaderLink>

      <div className="site-header-right">
        <nav className="site-nav" aria-label={navLabel}>
          {navItemsMemo.map((item) => (
            <HeaderLink
              key={item.href}
              href={item.href}
              kind={item.kind}
              className="site-nav-link"
              onNavigate={() => setMenuOpen(false)}
            >
              {item.label}
            </HeaderLink>
          ))}
        </nav>

        <div className="site-header-actions">
          <button
            className="menu-btn"
            type="button"
            aria-label="Open navigation"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={() => setMenuOpen(true)}
          >
            <span className="menu-btn-lines" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>

          <Link
            className={
              settingsActive
                ? "settings-btn settings-btn--active"
                : "settings-btn"
            }
            href="/settings"
            aria-label={settingsAria}
            aria-current={settingsActive ? "page" : undefined}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              width="18"
              height="18"
              aria-hidden="true"
            >
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </Link>
        </div>
      </div>

      {menuOpen ? (
        <div
          className="menu-backdrop"
          role="presentation"
          onClick={() => setMenuOpen(false)}
        >
          <div
            id={menuId}
            className="menu-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="menu-head">
              <span className="menu-brand">{brandLabel}</span>
              <button
                className="menu-close"
                type="button"
                aria-label="Close navigation"
                onClick={() => setMenuOpen(false)}
              >
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M6 6 18 18M18 6 6 18"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <nav className="menu-nav" aria-label={navLabel}>
              {navItemsMemo.map((item) => (
                <HeaderLink
                  key={item.href}
                  href={item.href}
                  kind={item.kind}
                  className="menu-nav-link"
                  onNavigate={() => setMenuOpen(false)}
                >
                  {item.label}
                </HeaderLink>
              ))}
            </nav>

            <div className="menu-foot">
              <Link
                className={
                  settingsActive
                    ? "settings-btn settings-btn--active"
                    : "settings-btn"
                }
                href="/settings"
                aria-label={settingsAria}
                aria-current={settingsActive ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                <span className="menu-foot-label">Settings</span>
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

