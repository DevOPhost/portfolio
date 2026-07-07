import {
  ExternalLink,
  Maximize2,
  ShieldCheck
} from "lucide-react";
import { useState } from "react";
import { type Certificate, type EventEntry } from "../data";
import type { PortfolioContent } from "../i18n";
import { Modal } from "./Modal";
import { Section, SectionIntro } from "./SiteChrome";

type CertificatesCopy = PortfolioContent["certificates"];

function CertificateDetail({
  certificate,
  copy,
  onClose
}: {
  certificate: Certificate;
  copy: CertificatesCopy;
  onClose: () => void;
}) {
  return (
    <Modal label={copy.modalLabel(certificate.title)} onClose={onClose} size="document">
      <article className="certificate-detail">
        <div>
          <img src={certificate.image} alt={copy.imageAlt(certificate.title, certificate.issuer)} />
        </div>
        <footer>
          <span>{certificate.category} · {certificate.date}</span>
          <strong>{certificate.title}</strong>
          <small>{certificate.issuer}{certificate.hours ? ` · ${certificate.hours}` : ""}</small>
          {certificate.credential && (
            <a href={certificate.credential} target="_blank" rel="noreferrer">
              <ShieldCheck /> {copy.validate} <ExternalLink />
            </a>
          )}
        </footer>
      </article>
    </Modal>
  );
}

export function CertificatesGallery({
  certificates,
  events,
  copy
}: {
  certificates: Certificate[];
  events: EventEntry[];
  copy: CertificatesCopy;
}) {
  const [selected, setSelected] = useState<Certificate | null>(null);

  return (
    <>
      <Section id="certificados" className="certificates-section">
        <div className="page-grid">
          <SectionIntro
            label={copy.intro.label}
            title={copy.intro.title}
            description={copy.intro.description}
          />

          <div className="subsection-heading">
            <div><span>{copy.certificationHeading.label}</span><h3>{copy.certificationHeading.title}</h3></div>
            <p>{copy.certificationHeading.count(certificates.length)}</p>
          </div>
          <div className="certificates-grid">
            {certificates.map((certificate) => (
              <article className="certificate-card" key={certificate.title}>
                <button type="button" onClick={() => setSelected(certificate)} aria-label={`${copy.enlarge} ${certificate.title}`}>
                  <span><img src={certificate.image} alt="" loading="lazy" /></span>
                  <i><Maximize2 /> {copy.enlarge}</i>
                </button>
                <div>
                  <span>{certificate.issuer}</span>
                  <h3>{certificate.title}</h3>
                  <p>{certificate.date}{certificate.hours ? ` · ${certificate.hours}` : ""}</p>
                  {certificate.credential && <a href={certificate.credential} target="_blank" rel="noreferrer">{copy.validate} <ExternalLink /></a>}
                </div>
              </article>
            ))}
          </div>

          <div className="subsection-heading events-heading" id="eventos">
            <div><span>{copy.eventsHeading.label}</span><h3>{copy.eventsHeading.title}</h3></div>
            <p>{copy.eventsHeading.count(events.length)}</p>
          </div>
          <div className="events-grid">
            {events.map((event) => (
              <article key={event.title}>
                <a className="event-card__preview" href={event.file} target="_blank" rel="noreferrer" aria-label={copy.eventViewAria(event.title)}>
                  <img src={event.image} alt={copy.eventPreviewAlt(event.title)} loading="lazy" />
                  <i><Maximize2 /> {copy.view}</i>
                </a>
                <div className="event-card__content">
                  <span>{event.issuer}</span>
                  <h3>{event.title}</h3>
                  <p>{event.detail}</p>
                  <a href={event.file} target="_blank" rel="noreferrer">{copy.viewCertificate} <ExternalLink /></a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Section>

      {selected && <CertificateDetail certificate={selected} copy={copy} onClose={() => setSelected(null)} />}
    </>
  );
}

