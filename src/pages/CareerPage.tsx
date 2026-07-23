import {
  Download,
  ExternalLink
} from "lucide-react";
import { CertificatesGallery } from "../components/CertificatesGallery";
import { Section, SectionIntro } from "../components/SiteChrome";
import { links } from "../config";
import type { CommercialContent } from "../content/commercial";
import type { Certificate, EventEntry, ExtensionEntry } from "../data";
import type { PortfolioContent } from "../i18n";

type CareerPageProps = {
  copy: PortfolioContent;
  commercialCopy: CommercialContent["career"];
  certificates: Certificate[];
  events: EventEntry[];
  extensions: ExtensionEntry[];
};

export function CareerPage({
  copy,
  commercialCopy,
  certificates,
  events,
  extensions
}: CareerPageProps) {
  const sectionLabel = (id: CommercialContent["career"]["sections"][number]["id"], fallback: string) =>
    commercialCopy.sections.find((section) => section.id === id)?.label ?? fallback;

  const careerNavigation = [
    ["experiencia", sectionLabel("experience", copy.experience.intro.label)],
    ["estagios", sectionLabel("internships", copy.experience.internships.eyebrow)],
    ["formacao", sectionLabel("education", copy.education.intro.label)],
    ["certificados", copy.certificates.certificationHeading.label],
    ["eventos", copy.certificates.eventsHeading.label],
    ["extensao", sectionLabel("extension", copy.extension.intro.label)],
    ["curriculo", sectionLabel("resume", copy.resume.label)]
  ] as const;

  return (
    <div className="career-page">
      <Section id="carreira" className="career-page__hero">
        <div className="page-grid">
          <header className="career-page__intro">
            <span>{commercialCopy.intro.eyebrow}</span>
            <h1 data-page-heading tabIndex={-1}>{commercialCopy.intro.title}</h1>
            <p>{commercialCopy.intro.description}</p>
          </header>

          <nav className="career-page__navigation" aria-label={commercialCopy.sectionNavigationLabel}>
            {careerNavigation.map(([id, label]) => (
              <a key={id} href={`#${id}`}>{label}</a>
            ))}
          </nav>
        </div>
      </Section>

      <Section id="experiencia" className="experience-section">
        <div className="page-grid">
          <SectionIntro
            label={copy.experience.intro.label}
            title={copy.experience.intro.title}
            description={copy.experience.intro.description}
          />

          <article className="company-experience">
            <div className="company-brand">
              <img
                src="assets/company/kiminorte/logo.png"
                alt={copy.experience.company.logoAlt}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="company-role">
              <span>{copy.experience.company.period}</span>
              <h3>{copy.experience.company.title}</h3>
              <p>{copy.experience.company.place}</p>
              <a href={links.kiminorte} target="_blank" rel="noopener noreferrer">
                {copy.experience.company.link} <ExternalLink />
              </a>
            </div>
            <div className="company-description">
              <p>{copy.experience.company.description}</p>
              <div>
                {copy.experience.company.points.map(([title, description]) => (
                  <span key={title}><strong>{title}</strong> {description}</span>
                ))}
              </div>
            </div>
          </article>

          <div className="subsection-heading internship-heading" id="estagios">
            <div>
              <span>{copy.experience.internships.eyebrow}</span>
              <h3>{copy.experience.internships.title}</h3>
            </div>
            <p>{copy.experience.internships.note}</p>
          </div>

          <div className="internships-grid">
            {copy.experience.internships.items.map((internship) => (
              <article key={internship.title}>
                <header className="internship-card__header">
                  <span>{internship.area}</span>
                  <img
                    src="assets/education/unic/logo-cropped.png"
                    alt={copy.education.logoAlt}
                    loading="lazy"
                    decoding="async"
                  />
                </header>
                <h4>{internship.title}</h4>
                <p>{internship.description}</p>
                <div className="internship-activities">
                  <strong>{copy.experience.internships.mainActivities}</strong>
                  <p>{internship.activity}</p>
                </div>
                <footer>
                  <a href={internship.file} target="_blank" rel="noopener noreferrer">
                    {copy.experience.internships.viewForm} <ExternalLink />
                  </a>
                </footer>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section id="formacao" className="education-section">
        <div className="page-grid">
          <SectionIntro
            label={copy.education.intro.label}
            title={copy.education.intro.title}
            description={copy.education.intro.description}
          />

          <article className="education-feature">
            <div className="education-photo">
              <img
                src="assets/education/unic/tcc-defesa.jpeg"
                width="1200"
                height="1600"
                alt={copy.education.photoAlt}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="education-content">
              <img
                className="unic-logo"
                src="assets/education/unic/logo.png"
                alt={copy.education.logoAlt}
                loading="lazy"
                decoding="async"
              />
              <span>{copy.education.period}</span>
              <h3>{copy.education.degree}</h3>
              <p>{copy.education.institution}</p>
              <div className="academic-result">
                <div>
                  <strong>{copy.education.achievementTitle}</strong>
                  <span>{copy.education.achievementDescription}</span>
                </div>
              </div>
              <dl>
                {copy.education.metrics.map(([value, label]) => (
                  <div key={label}>
                    <dt>{value}</dt>
                    <dd>{label}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </article>
        </div>
      </Section>

      <CertificatesGallery
        certificates={certificates}
        events={events}
        copy={copy.certificates}
        sectionId="certificados"
      />

      <Section id="extensao" className="extension-section">
        <div className="page-grid">
          <SectionIntro
            label={copy.extension.intro.label}
            title={copy.extension.intro.title}
            description={copy.extension.intro.description}
          />
          <div className="extensions-list">
            {extensions.map((extension) => (
              <article key={extension.title}>
                <div className={`extension-logo extension-logo--${extension.logoFit ?? "wide"}`}>
                  <img src={extension.logo} alt={extension.logoAlt} loading="lazy" decoding="async" />
                </div>
                <span>{extension.period}</span>
                <div>
                  <h3>{extension.title}</h3>
                  <p>{extension.description}</p>
                  <small>{extension.tags.join(" · ")}</small>
                </div>
                <a href={extension.file} target="_blank" rel="noopener noreferrer">
                  {copy.extension.viewDocument} <ExternalLink />
                </a>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section id="curriculo" className="resume-section">
        <div className="page-grid resume-layout">
          <div className="resume-mark" aria-hidden="true"><img src="favicon.svg" alt="" /></div>
          <div>
            <span>{copy.resume.label}</span>
            <h2>{copy.resume.title}</h2>
            <p>{copy.resume.description}</p>
            <div>
              <a
                className="button button--solid"
                href={links.resume}
                download
                aria-label={commercialCopy.resumeAction.ariaLabel}
              >
                <Download /> {commercialCopy.resumeAction.label}
              </a>
              <a
                className="button button--outline"
                href="resume.html"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={commercialCopy.browserResumeAction.ariaLabel}
              >
                <ExternalLink /> {commercialCopy.browserResumeAction.label}
              </a>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
