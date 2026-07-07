import {
  ArrowDown,
  ArrowRight,
  Award,
  Download,
  ExternalLink,
  FileText,
  Github,
  Linkedin
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { CertificatesGallery } from "./components/CertificatesGallery";
import { ProfilePortrait } from "./components/ProfilePortrait";
import { ProjectsShowcase } from "./components/ProjectsShowcase";
import { Navigation, Section, SectionIntro } from "./components/SiteChrome";
import { Technologies } from "./components/Technologies";
import { links } from "./config";
import { certificates, events, extensions, projects } from "./data";
import {
  content,
  localizeCertificates,
  localizeEvents,
  localizeExtensions,
  localizeProjects,
  readPreferredLanguage,
  type Language
} from "./i18n";

function App() {
  const [language, setLanguage] = useState<Language>(readPreferredLanguage);
  const copy = content[language];

  const localizedProjects = useMemo(() => localizeProjects(projects, language), [language]);
  const localizedCertificates = useMemo(() => localizeCertificates(certificates, language), [language]);
  const localizedEvents = useMemo(() => localizeEvents(events, language), [language]);
  const localizedExtensions = useMemo(() => localizeExtensions(extensions, language), [language]);

  useEffect(() => {
    const htmlLanguage = language === "pt" ? "pt-BR" : "en-US";
    document.documentElement.lang = htmlLanguage;
    document.title = copy.documentTitle;
    localStorage.setItem("portfolio-language", language);

    const updateMeta = (selector: string, value: string) => {
      document.querySelector(selector)?.setAttribute("content", value);
    };

    updateMeta('meta[name="description"]', copy.metaDescription);
    updateMeta('meta[property="og:locale"]', language === "pt" ? "pt_BR" : "en_US");
    updateMeta('meta[property="og:title"]', copy.documentTitle);
    updateMeta('meta[property="og:description"]', copy.metaDescription);
    updateMeta('meta[name="twitter:title"]', copy.documentTitle);
    updateMeta('meta[name="twitter:description"]', copy.metaDescription);
  }, [copy.documentTitle, copy.metaDescription, language]);

  return (
    <>
      <a className="skip-link" href="#conteudo">{copy.skipLink}</a>
      <Navigation
        language={language}
        navigationItems={copy.navigation}
        labels={{
          brandRole: copy.brandRole,
          navLabel: copy.navLabel,
          resume: copy.hero.actions.resume,
          languageSelector: copy.languageSelector,
          accessibility: copy.accessibility
        }}
        onLanguageChange={setLanguage}
      />

      <main id="conteudo">
        <Section id="inicio" className="hero">
          <div className="page-grid hero-layout">
            <div className="hero-copy">
              <span className="hero-eyebrow">{copy.hero.eyebrow}</span>
              <h1><span>{copy.hero.title.lead}</span> <em>{copy.hero.title.highlight}</em></h1>
              <p>{copy.hero.description}</p>
              <div className="hero-actions">
                <a className="button button--solid" href="#projetos">{copy.hero.actions.projects} <ArrowDown /></a>
                <a className="button button--outline" href={links.github} target="_blank" rel="noreferrer"><Github /> GitHub</a>
                <a className="button button--outline" href={links.linkedin} target="_blank" rel="noreferrer"><Linkedin /> LinkedIn</a>
                <a className="button button--outline" href={links.resume} download><Download /> {copy.hero.actions.resume}</a>
              </div>
            </div>
            <ProfilePortrait labels={copy.portrait} />
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
                <img src="assets/company/kiminorte/logo.png" alt={copy.experience.company.logoAlt} />
              </div>
              <div className="company-role">
                <span>{copy.experience.company.period}</span>
                <h3>{copy.experience.company.title}</h3>
                <p>{copy.experience.company.place}</p>
                <a href={links.kiminorte} target="_blank" rel="noreferrer">{copy.experience.company.link} <ExternalLink /></a>
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
                  <span>{internship.area}</span>
                  <h3>{internship.title}</h3>
                  <p>{internship.description}</p>
                  <div className="internship-activities">
                    <strong>{copy.experience.internships.mainActivities}</strong>
                    <p>{internship.activity}</p>
                  </div>
                  <footer>
                    <a href={internship.file} target="_blank" rel="noreferrer"><FileText /> {copy.experience.internships.viewForm} <ExternalLink /></a>
                  </footer>
                </article>
              ))}
            </div>
          </div>
        </Section>

        <ProjectsShowcase projects={localizedProjects} copy={copy.projects} />
        <Technologies copy={copy.technologies} />

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
                />
              </div>
              <div className="education-content">
                <img className="unic-logo" src="assets/education/unic/logo.png" alt={copy.education.logoAlt} />
                <span>{copy.education.period}</span>
                <h3>{copy.education.degree}</h3>
                <p>{copy.education.institution}</p>
                <div className="academic-result">
                  <Award />
                  <div><strong>{copy.education.achievementTitle}</strong><span>{copy.education.achievementDescription}</span></div>
                </div>
                <dl>
                  {copy.education.metrics.map(([value, label]) => (
                    <div key={label}><dt>{value}</dt><dd>{label}</dd></div>
                  ))}
                </dl>
                <button className="button button--outline education-diploma" type="button" disabled title={copy.education.diplomaTitle}>
                  <FileText /> {copy.education.diploma} <span>{copy.education.soon}</span>
                </button>
              </div>
            </article>
          </div>
        </Section>

        <CertificatesGallery certificates={localizedCertificates} events={localizedEvents} copy={copy.certificates} />

        <Section id="extensao" className="extension-section">
          <div className="page-grid">
            <SectionIntro
              label={copy.extension.intro.label}
              title={copy.extension.intro.title}
              description={copy.extension.intro.description}
            />
            <div className="extensions-list">
              {localizedExtensions.map((extension) => (
                <article key={extension.title}>
                  <span>{extension.period}</span>
                  <div><h3>{extension.title}</h3><p>{extension.description}</p><small>{extension.tags.join(" · ")}</small></div>
                  <a href={extension.file} target="_blank" rel="noreferrer">{copy.extension.viewDocument} <ExternalLink /></a>
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
                <a className="button button--solid" href={links.resume} download><Download /> {copy.resume.download}</a>
                <a className="button button--outline" href="resume.html" target="_blank"><ExternalLink /> {copy.resume.browser}</a>
              </div>
            </div>
          </div>
        </Section>

        <Section id="contato" className="contact-section">
          <div className="page-grid contact-layout">
            <div>
              <span>{copy.contact.label}</span>
              <h2>{copy.contact.title}</h2>
              <p>{copy.contact.description}</p>
            </div>
            <div className="contact-links">
              <a href={links.linkedin} target="_blank" rel="noreferrer"><Linkedin /><span><strong>{copy.contact.links[0][0]}</strong><small>{copy.contact.links[0][1]}</small></span><ArrowRight /></a>
              <a href={links.github} target="_blank" rel="noreferrer"><Github /><span><strong>{copy.contact.links[1][0]}</strong><small>{copy.contact.links[1][1]}</small></span><ArrowRight /></a>
              <a href={links.resume} download><Download /><span><strong>{copy.contact.links[2][0]}</strong><small>{copy.contact.links[2][1]}</small></span><ArrowRight /></a>
            </div>
          </div>
        </Section>
      </main>

      <footer className="footer">
        <div className="page-grid">
          <div className="footer-brand"><img src="favicon.svg" alt="" /><span><strong>Leonardo Farias Martins</strong><small>{copy.footer.role}</small></span></div>
          <span>{copy.footer.location}</span>
          <div><a href={links.github} target="_blank" rel="noreferrer">GitHub</a><a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a><a href="#inicio">{copy.footer.backTop}</a></div>
        </div>
      </footer>
    </>
  );
}

export default App;

