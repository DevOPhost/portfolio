import {
  Download,
  Mail
} from "lucide-react";
import type { CommercialContent } from "../content/commercial";
import { links } from "../config";
import { Section } from "../components/SiteChrome";
import { WhatsAppIcon } from "../components/WhatsAppIcon";
import { BrandIcon } from "../components/BrandIcon";

export function ContactPage({ copy }: { copy: CommercialContent["contact"] }) {
  return (
    <>
      <Section id="contato" className="page-hero page-hero--contact">
        <div className="page-grid page-hero__inner">
          <span className="page-eyebrow">{copy.intro.eyebrow}</span>
          <h1 className="page-title"><span>{copy.intro.title}</span></h1>
          <p className="page-lead">{copy.intro.description}</p>
        </div>
      </Section>

      <Section id="canais-contato" className="commercial-section contact-audiences-section">
        <div className="page-grid contact-audiences">
          <article className="contact-audience contact-audience--clients">
            <span className="page-eyebrow">{copy.clients.eyebrow}</span>
            <h2>{copy.clients.title}</h2>
            <p>{copy.clients.description}</p>
            <small>{copy.clients.guidance}</small>
            <div className="contact-audience__actions">
              <a
                className="button button--solid button--whatsapp"
                href={links.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={copy.clients.whatsappAction.ariaLabel}
              >
                <WhatsAppIcon aria-hidden="true" />
                {copy.clients.whatsappAction.label}
              </a>
              <a
                className="button button--outline"
                href={links.projectEmail}
                aria-label={copy.clients.emailAction.ariaLabel}
              >
                <Mail aria-hidden="true" />
                {copy.clients.emailAction.label}
              </a>
            </div>
          </article>

          <article className="contact-audience contact-audience--recruiters">
            <span className="page-eyebrow">{copy.recruiters.eyebrow}</span>
            <h2>{copy.recruiters.title}</h2>
            <p>{copy.recruiters.description}</p>
            <div className="contact-audience__links">
              <a
                href={links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={copy.recruiters.linkedinAction.ariaLabel}
              >
                <BrandIcon brand="linkedin" />
                <span>{copy.recruiters.linkedinAction.label}</span>
              </a>
              <a
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={copy.recruiters.githubAction.ariaLabel}
              >
                <BrandIcon brand="github" />
                <span>{copy.recruiters.githubAction.label}</span>
              </a>
              <a
                href={links.resume}
                download
                aria-label={copy.recruiters.resumeAction.ariaLabel}
              >
                <Download aria-hidden="true" />
                <span>{copy.recruiters.resumeAction.label}</span>
              </a>
            </div>
          </article>
        </div>
      </Section>
    </>
  );
}
