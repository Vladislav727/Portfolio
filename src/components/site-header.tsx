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

function HeaderLink({ href, kind = "link", className, children }: HeaderLinkProps) {
  if (kind === "anchor") {
    return (
      <a className={className} href={href}>
        {children}
      </a>
    );
  }

  return (
    <Link className={className} href={href}>
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
  return (
    <header className={["site-header", className].filter(Boolean).join(" ")} style={style}>
      <HeaderLink className="site-brand" href={brandHref} kind={brandKind}>
        {brandLabel}
      </HeaderLink>

      <div className="site-header-right">
        <nav className="site-nav" aria-label={navLabel}>
          {navItems.map((item) => (
            <HeaderLink key={item.href} href={item.href} kind={item.kind}>
              {item.label}
            </HeaderLink>
          ))}
        </nav>

        <Link
          className={settingsActive ? "settings-btn settings-btn--active" : "settings-btn"}
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
    </header>
  );
}
