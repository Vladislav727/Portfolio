"use client";

import type { ReactNode } from "react";
import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";

export type ContactDialogCopy = {
  trigger: string;
  title: string;
  intro: string;
  githubLabel: string;
  githubHint: string;
  emailLabel: string;
  emailHint: string;
  discordLabel: string;
  discordHint: string;
  bestBadge: string;
  close: string;
};

type ContactDialogProps = {
  copy: ContactDialogCopy;
};

type ContactItem = {
  href: string;
  label: string;
  hint: string;
  value: string;
  priority?: boolean;
  icon: ReactNode;
};

export function getContactDialogCopy(translate: (key: string) => string): ContactDialogCopy {
  return {
    trigger: translate("footer.contact.button"),
    title: translate("footer.contact.title"),
    intro: translate("footer.contact.intro"),
    githubLabel: translate("footer.contact.github.label"),
    githubHint: translate("footer.contact.github.hint"),
    emailLabel: translate("footer.contact.email.label"),
    emailHint: translate("footer.contact.email.hint"),
    discordLabel: translate("footer.contact.discord.label"),
    discordHint: translate("footer.contact.discord.hint"),
    bestBadge: translate("footer.contact.best"),
    close: translate("footer.contact.close"),
  };
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3C7.03 3 3 7.13 3 12.22c0 4.08 2.58 7.54 6.16 8.76.45.09.61-.2.61-.45 0-.22-.01-.95-.01-1.72-2.26.42-2.85-.57-3.03-1.1-.1-.27-.51-1.1-.87-1.32-.29-.16-.71-.55-.01-.56.66-.01 1.13.62 1.29.88.75 1.29 1.96.93 2.44.71.07-.56.29-.93.53-1.14-2-.23-4.09-1.03-4.09-4.58 0-1.01.35-1.83.93-2.47-.09-.23-.4-1.17.09-2.43 0 0 .76-.25 2.48.94A8.3 8.3 0 0 1 12 7.9c.73 0 1.46.1 2.15.31 1.72-1.2 2.48-.94 2.48-.94.49 1.26.18 2.2.09 2.43.58.64.93 1.45.93 2.47 0 3.56-2.1 4.35-4.11 4.58.33.29.61.84.61 1.71 0 1.23-.01 2.22-.01 2.53 0 .25.16.55.61.45A9.31 9.31 0 0 0 21 12.22C21 7.13 16.97 3 12 3Z"
        fill="currentColor"
      />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="m5 7 7 5 7-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DiscordIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M17.47 7.13A13.3 13.3 0 0 0 14.15 6l-.16.33a12.5 12.5 0 0 1 3.16 1.17 9.94 9.94 0 0 0-3.16-1.02 11.64 11.64 0 0 0-4.02 0A10.04 10.04 0 0 0 6.8 7.5c.96-.56 2.01-.95 3.15-1.17L9.8 6a13.4 13.4 0 0 0-3.33 1.13C4.36 10.28 3.8 13.34 4 16.35a13.1 13.1 0 0 0 4.08 2.06l.89-1.47c-.49-.19-.96-.43-1.4-.72.12.09.24.17.37.24 1.19.72 2.6 1.1 4.05 1.08 1.45.02 2.86-.36 4.06-1.08.12-.07.24-.15.36-.24-.44.29-.91.53-1.4.72l.89 1.47A13.1 13.1 0 0 0 20 16.35c.24-3.48-.42-6.52-2.53-9.22ZM9.7 14.52c-.78 0-1.42-.74-1.42-1.65 0-.92.63-1.66 1.42-1.66.8 0 1.43.75 1.42 1.66 0 .91-.63 1.65-1.42 1.65Zm4.6 0c-.78 0-1.42-.74-1.42-1.65 0-.92.63-1.66 1.42-1.66.8 0 1.43.75 1.42 1.66 0 .91-.63 1.65-1.42 1.65Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ContactDialog({ copy }: ContactDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  const contacts: ContactItem[] = [
    {
      href: "https://github.com/Vladislav727",
      label: copy.githubLabel,
      hint: copy.githubHint,
      value: "github.com/Vladislav727",
      icon: <GitHubIcon />,
    },
    {
      href: "mailto:vladislavperviy0702@gmail.com",
      label: copy.emailLabel,
      hint: copy.emailHint,
      value: "vladislavperviy0702@gmail.com",
      icon: <EmailIcon />,
    },
    {
      href: "https://discord.com/users/674198204207857675",
      label: copy.discordLabel,
      hint: copy.discordHint,
      value: "discord.com/users/674198204207857675",
      priority: true,
      icon: <DiscordIcon />,
    },
  ];

  return (
    <>
      <button className="contact-trigger" type="button" onClick={() => setIsOpen(true)}>
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 16.5v-9Z" stroke="currentColor" strokeWidth="1.5" />
          <path d="m6 8 6 4 6-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {copy.trigger}
      </button>

      {isOpen && typeof document !== "undefined"
        ? createPortal(
            <div className="contact-backdrop" role="presentation" onClick={() => setIsOpen(false)}>
              <div
                className="contact-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                aria-describedby={descriptionId}
                onClick={(event) => event.stopPropagation()}
              >
                <div className="contact-modal-head">
                  <div>
                    <p className="contact-modal-kicker">{copy.trigger}</p>
                    <h2 className="contact-modal-title" id={titleId}>{copy.title}</h2>
                  </div>
                  <button
                    className="contact-modal-close"
                    type="button"
                    aria-label={copy.close}
                    onClick={() => setIsOpen(false)}
                  >
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M6 6 18 18M18 6 6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>

                <p className="contact-modal-intro" id={descriptionId}>{copy.intro}</p>

                <div className="contact-list">
                  {contacts.map((contact) => (
                    <a
                      key={contact.label}
                      className={contact.priority ? "contact-card contact-card--priority" : "contact-card"}
                      href={contact.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span className="contact-card-icon" aria-hidden="true">{contact.icon}</span>
                      <span className="contact-card-copy">
                        <span className="contact-card-topline">
                          <span className="contact-card-label">{contact.label}</span>
                          {contact.priority ? <span className="contact-card-badge">{copy.bestBadge}</span> : null}
                        </span>
                        <span className="contact-card-value">{contact.value}</span>
                        <span className="contact-card-hint">{contact.hint}</span>
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
