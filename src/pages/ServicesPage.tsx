import { useState } from "react";
import type { CommercialContent } from "../content/commercial";
import { links } from "../config";
import { Section, SectionIntro } from "../components/SiteChrome";
import { WhatsAppIcon } from "../components/WhatsAppIcon";

export function ServicesPage({ copy }: { copy: CommercialContent["services"] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeService = copy.items[activeIndex] ?? copy.items[0];

  return (
    <>
      <Section id="servicos" className="page-hero page-hero--services">
        <div className="page-grid page-hero__inner">
          <span className="page-eyebrow">{copy.intro.eyebrow}</span>
          <h1 className="page-title"><span>{copy.intro.title}</span></h1>
          <p className="page-lead">{copy.intro.description}</p>
        </div>
      </Section>

      <Section id="servicos-ofertas" className="commercial-section services-catalog">
        <div className="page-grid services-workbench">
          <nav className="services-index" aria-label={copy.intro.eyebrow}>
            {copy.items.map((service, index) => (
              <button
                className={activeIndex === index ? "is-active" : ""}
                type="button"
                key={service.id}
                aria-pressed={activeIndex === index}
                aria-controls="service-focus-panel"
                onClick={() => setActiveIndex(index)}
              >
                <span aria-hidden="true" />
                <strong>{service.title}</strong>
              </button>
            ))}
          </nav>

          <article
            className="service-focus-panel"
            id="service-focus-panel"
            key={activeService.id}
            aria-live="polite"
          >
            <header>
              <h2>{activeService.title}</h2>
              <p>{activeService.summary}</p>
            </header>

            <div className="service-focus-panel__body">
              <div>
                <span>{copy.labels.problem}</span>
                <p>{activeService.problem}</p>
              </div>
              <div>
                <span>{copy.labels.solution}</span>
                <p>{activeService.solution}</p>
              </div>
              <div>
                <span>{copy.labels.deliverables}</span>
                <ul>
                  {activeService.deliverables.map((deliverable) => (
                    <li key={deliverable}>{deliverable}</li>
                  ))}
                </ul>
              </div>
            </div>

            <footer>
              <a
                className="button button--outline button--whatsapp-outline"
                href={links.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={activeService.cta.ariaLabel}
              >
                <WhatsAppIcon aria-hidden="true" />
                {activeService.cta.label}
              </a>
            </footer>
          </article>
        </div>
      </Section>

      <Section id="processo" className="commercial-section process-section">
        <div className="page-grid">
          <SectionIntro
            label={copy.process.eyebrow}
            title={copy.process.title}
            description={copy.process.description}
          />
          <ol className="process-grid">
            {copy.process.steps.map((step) => (
              <li key={step.number}>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
          <aside className="security-scope">
            <div>
              <h3>{copy.securityScope.title}</h3>
              <p>{copy.securityScope.description}</p>
            </div>
          </aside>
        </div>
      </Section>

      <Section id="servicos-contato" className="commercial-section final-cta-section">
        <div className="page-grid final-cta">
          <h2>{copy.finalCta.title}</h2>
          <p>{copy.finalCta.description}</p>
          <a
            className="button button--solid button--whatsapp"
            href={links.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={copy.finalCta.action.ariaLabel}
          >
            <WhatsAppIcon aria-hidden="true" />
            {copy.finalCta.action.label}
          </a>
        </div>
      </Section>
    </>
  );
}
