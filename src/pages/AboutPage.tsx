import { ArrowRight } from "lucide-react";
import type { CommercialContent } from "../content/commercial";
import type { PortfolioContent } from "../i18n";
import type { PageId } from "../routes";
import { PageLink } from "../components/PageLink";
import { ProfilePortrait } from "../components/ProfilePortrait";
import { Section, SectionIntro } from "../components/SiteChrome";
import { Technologies } from "../components/Technologies";

type Navigate = (page: PageId, options?: { anchor?: string; focus?: boolean }) => void;

export function AboutPage({
  copy,
  commercialCopy,
  onNavigate
}: {
  copy: PortfolioContent;
  commercialCopy: CommercialContent["about"];
  onNavigate: Navigate;
}) {
  return (
    <>
      <Section id="sobre" className="page-hero page-hero--about">
        <div className="page-grid page-hero__inner">
          <span className="page-eyebrow">{commercialCopy.intro.eyebrow}</span>
          <h1 className="page-title"><span>{commercialCopy.intro.title}</span></h1>
          <p className="page-lead">{commercialCopy.intro.description}</p>
        </div>
      </Section>

      <Section id="perfil" className="commercial-section about-profile-section">
        <div className="page-grid about-profile">
          <ProfilePortrait labels={copy.portrait} />
          <div className="about-profile__copy">
            <h2>{commercialCopy.profile.title}</h2>
            {commercialCopy.profile.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <dl>
              {commercialCopy.profile.facts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      <Section id="diferenciais" className="commercial-section differentiators-section">
        <div className="page-grid">
          <SectionIntro
            label={commercialCopy.differentiators.eyebrow}
            title={commercialCopy.differentiators.title}
            description={commercialCopy.differentiators.description}
          />
          <div className="differentiators-grid">
            {commercialCopy.differentiators.items.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Technologies copy={copy.technologies} sectionId="stack" />

      <Section id="sobre-carreira" className="commercial-section compact-cta-section">
        <div className="page-grid compact-cta">
          <p>{commercialCopy.stack.description}</p>
          <PageLink
            className="button button--outline"
            page="carreira"
            onNavigate={onNavigate}
            aria-label={commercialCopy.careerAction.ariaLabel}
          >
            {commercialCopy.careerAction.label}
            <ArrowRight aria-hidden="true" />
          </PageLink>
        </div>
      </Section>
    </>
  );
}
