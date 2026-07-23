import { ArrowRight } from "lucide-react";
import type { PortfolioContent } from "../i18n";
import type { CommercialContent } from "../content/commercial";
import type { PageId } from "../routes";
import { links } from "../config";
import { BrandIcon } from "../components/BrandIcon";
import { PageLink } from "../components/PageLink";
import { ProfilePortrait } from "../components/ProfilePortrait";
import { Section } from "../components/SiteChrome";
import { WhatsAppIcon } from "../components/WhatsAppIcon";

type Navigate = (page: PageId, options?: { anchor?: string; focus?: boolean }) => void;

export function HomePage({
  copy,
  commercialCopy,
  onNavigate
}: {
  copy: PortfolioContent;
  commercialCopy: CommercialContent["home"];
  onNavigate: Navigate;
}) {
  return (
    <Section id="inicio" className="hero commercial-hero home-cover">
      <div className="page-grid commercial-hero__layout home-cover__layout">
        <div className="commercial-hero__copy home-cover__copy">
          <div className="home-cover__identity reveal-item">
            <strong>{copy.portrait.name}</strong>
            <span>{copy.portrait.role}</span>
          </div>

          <h1 className="page-title home-cover__title">
            <span>{commercialCopy.hero.title}</span>
          </h1>

          <p className="page-lead home-cover__subtitle reveal-item">
            {commercialCopy.hero.description}
          </p>

          <div className="hero-actions home-cover__actions reveal-item">
            <a
              className="button button--solid button--whatsapp"
              href={links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={commercialCopy.hero.primaryAction.ariaLabel}
            >
              <WhatsAppIcon aria-hidden="true" />
              {commercialCopy.hero.primaryAction.label}
            </a>
            <PageLink
              className="button button--outline"
              page="projetos"
              onNavigate={onNavigate}
              aria-label={commercialCopy.hero.projectsAction.ariaLabel}
            >
              {commercialCopy.hero.projectsAction.label}
              <ArrowRight aria-hidden="true" />
            </PageLink>
            <a
              className="button button--outline home-cover__github"
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={commercialCopy.hero.githubAction.ariaLabel}
            >
              <BrandIcon brand="github" />
              {commercialCopy.hero.githubAction.label}
            </a>
          </div>
        </div>

        <div className="home-cover__visual reveal-item">
          <ProfilePortrait labels={copy.portrait} compact />
        </div>
      </div>
    </Section>
  );
}
