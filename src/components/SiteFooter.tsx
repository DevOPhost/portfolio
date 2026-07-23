import { Download, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Language } from "../i18n";
import { links } from "../config";
import type { PageId } from "../routes";
import { BrandIcon } from "./BrandIcon";
import { PageLink } from "./PageLink";
import { WhatsAppIcon } from "./WhatsAppIcon";

const footerLabels = {
  pt: {
    navigation: "Navegação",
    channels: "Canais profissionais",
    email: "E-mail",
    whatsapp: "WhatsApp",
    resume: "Currículo",
    newTab: "abre em nova aba",
    copyright: "© 2026 Leonardo Farias Martins."
  },
  en: {
    navigation: "Navigation",
    channels: "Professional channels",
    email: "Email",
    whatsapp: "WhatsApp",
    resume: "Resume",
    newTab: "opens in a new tab",
    copyright: "© 2026 Leonardo Farias Martins."
  }
} as const;

export function SiteFooter({
  language,
  role,
  navigationItems,
  onNavigate
}: {
  language: Language;
  role: string;
  navigationItems: ReadonlyArray<{ id: PageId; label: string }>;
  onNavigate: (page: PageId) => void;
}) {
  const footerRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const labels = footerLabels[language];

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.08, rootMargin: "0px 0px -4%" }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      id="site-footer"
      className={`portfolio-footer${visible ? " is-visible" : ""}`}
    >
      <div className="page-grid portfolio-footer__layout">
        <div className="portfolio-footer__identity portfolio-footer__group">
          <a
            className="portfolio-footer__brand"
            href="#conteudo"
            onClick={(event) => {
              event.preventDefault();
              onNavigate("inicio");
            }}
          >
            <img src="favicon.svg" alt="" width="38" height="38" />
            <span>
              <strong>Leonardo Farias Martins</strong>
              <small>{role}</small>
            </span>
          </a>
        </div>

        <div className="portfolio-footer__column portfolio-footer__group">
          <p className="portfolio-footer__label">{labels.navigation}</p>
          <nav aria-label={labels.navigation}>
            {navigationItems.map((item) => (
              <PageLink key={item.id} page={item.id} onNavigate={onNavigate}>
                {item.label}
              </PageLink>
            ))}
          </nav>
        </div>

        <div className="portfolio-footer__column portfolio-footer__group">
          <p className="portfolio-footer__label">{labels.channels}</p>
          <div className="portfolio-footer__channels">
            <a
              href={links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`LinkedIn, ${labels.newTab}`}
            >
              <BrandIcon brand="linkedin" />
              <span>LinkedIn</span>
            </a>
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`GitHub, ${labels.newTab}`}
            >
              <BrandIcon brand="github" />
              <span>GitHub</span>
            </a>
            <a href={`mailto:${links.email}`}>
              <Mail aria-hidden="true" />
              <span>{labels.email}</span>
            </a>
            <a
              className="portfolio-footer__whatsapp"
              href={links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${labels.whatsapp}, ${labels.newTab}`}
            >
              <WhatsAppIcon aria-hidden="true" />
              <span>{labels.whatsapp}</span>
            </a>
            <a href={links.resume} download>
              <Download aria-hidden="true" />
              <span>{labels.resume}</span>
            </a>
          </div>
        </div>

        <div className="portfolio-footer__bottom portfolio-footer__group">
          <small>{labels.copyright}</small>
        </div>
      </div>
    </footer>
  );
}
