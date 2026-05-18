import type { CSSProperties } from "react";
import type { ContactDialogCopy } from "@/components/contact-dialog";
import { ContactDialog } from "@/components/contact-dialog";

type SiteFooterProps = {
  caption: string;
  location: string;
  contactCopy: ContactDialogCopy;
  className?: string;
  style?: CSSProperties;
};

export function SiteFooter({
  caption,
  location,
  contactCopy,
  className,
  style,
}: SiteFooterProps) {
  return (
    <div className="site-footer-wrap">
      <footer className={["site-footer", className].filter(Boolean).join(" ")} style={style}>
        <div className="site-footer-copy">
          <p>{caption}</p>
          <p>{location}</p>
        </div>
        <ContactDialog copy={contactCopy} />
      </footer>
    </div>
  );

}
