import type { CommercialContent } from "../content/commercial";
import type { Project } from "../data";
import type { PortfolioContent } from "../i18n";
import { links } from "../config";
import { ProjectsShowcase } from "../components/ProjectsShowcase";
import { Section } from "../components/SiteChrome";
import { WhatsAppIcon } from "../components/WhatsAppIcon";

export function ProjectsPage({
  copy,
  commercialCopy,
  projects
}: {
  copy: PortfolioContent;
  commercialCopy: CommercialContent["projects"];
  projects: Project[];
}) {
  return (
    <>
      <Section id="projetos" className="page-hero page-hero--projects">
        <div className="page-grid page-hero__inner">
          <span className="page-eyebrow">{commercialCopy.intro.eyebrow}</span>
          <h1 className="page-title"><span>{commercialCopy.intro.title}</span></h1>
          <p className="page-lead">{commercialCopy.intro.description}</p>
        </div>
      </Section>

      <ProjectsShowcase
        projects={projects}
        copy={copy.projects}
        sectionId="projetos-showcase"
        intro={{
          label: commercialCopy.intro.eyebrow,
          title: commercialCopy.realInterfaces.label,
          description: commercialCopy.realInterfaces.description
        }}
        viewAllLabel={commercialCopy.allRepositoriesAction.label}
      />

      <Section id="projetos-contato" className="commercial-section final-cta-section">
        <div className="page-grid final-cta">
          <h2>{commercialCopy.finalCta.title}</h2>
          <p>{commercialCopy.finalCta.description}</p>
          <a
            className="button button--solid button--whatsapp"
            href={links.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={commercialCopy.finalCta.action.ariaLabel}
          >
            <WhatsAppIcon aria-hidden="true" />
            {commercialCopy.finalCta.action.label}
          </a>
        </div>
      </Section>
    </>
  );
}
