import {
  ArrowRight,
  ExternalLink,
  Github
} from "lucide-react";
import { useState } from "react";
import { links } from "../config";
import { type Project } from "../data";
import { Modal } from "./Modal";
import { Section, SectionIntro } from "./SiteChrome";
import { TechnologyMark } from "./TechnologyMark";

import type { PortfolioContent } from "../i18n";

type ProjectsCopy = PortfolioContent["projects"];

function OrganizeMockup({ copy, large = false }: { copy: ProjectsCopy["organize"]; large?: boolean }) {
  return (
    <div className={`organize-mockup ${large ? "organize-mockup--large" : ""}`} aria-label={copy.aria}>
      <div className="organize-mockup__bar">
        <span aria-hidden="true"><i /><i /><i /></span>
        <strong>{copy.title}</strong>
      </div>
      <div className="organize-mockup__body">
        <div className="organize-mockup__tree">
          <small>{copy.folder}</small>
          {copy.folders.map((item) => <span key={item}>{item}</span>)}
        </div>
        <div className="organize-mockup__terminal">
          <code><b>$</b> {copy.command}</code>
          <p><span>✓</span> {copy.results[0]}</p>
          <p><span>→</span> {copy.results[1]}</p>
          <p><span>✓</span> {copy.results[2]}</p>
          <small>{copy.note}</small>
        </div>
      </div>
    </div>
  );
}

function ProjectMedia({
  project,
  copy,
  large = false
}: {
  project: Project;
  copy: ProjectsCopy;
  large?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  if (project.name === "Organize") {
    return <OrganizeMockup copy={copy.organize} large={large} />;
  }

  if (project.image && !failed) {
    return (
      <img
        className={`project-media ${large ? "project-media--large" : ""}`}
        src={project.image}
        width="1440"
        height="900"
        alt={copy.labels.mediaAlt(project.name)}
        loading={large ? "eager" : "lazy"}
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <div className={`project-fallback ${large ? "project-fallback--large" : ""}`} aria-label={copy.labels.fallbackAria(project.name)}>
      <span>{project.glyph}</span>
      <strong>{project.name}</strong>
      <small>{project.tags.join(" · ")}</small>
    </div>
  );
}

function ProjectDetail({ project, copy, onClose }: { project: Project; copy: ProjectsCopy; onClose: () => void }) {
  const onlineLabel = project.name === "Kiminorte" ? copy.labels.website : copy.labels.online;

  return (
    <Modal label={copy.labels.modalLabel(project.name)} onClose={onClose} size="project">
      <article className="project-detail">
        <div className="project-detail__media"><ProjectMedia project={project} copy={copy} large /></div>
        <div className="project-detail__intro">
          <span>{project.year} · {project.status}</span>
          <h2>{project.name}</h2>
          <p>{project.description}</p>
          <dl>
            <div><dt>{copy.labels.role}</dt><dd>{project.role}</dd></div>
            <div><dt>{copy.labels.technologies}</dt><dd className="project-technologies">{project.tags.map((tag) => <TechnologyMark key={tag} name={tag} />)}</dd></div>
          </dl>
        </div>
        <div className="project-detail__story">
          <span>{copy.labels.about}</span>
          <p>{project.detail}</p>
        </div>
        <footer className="project-detail__actions">
          {project.github ? (
            <a className="button button--outline" href={project.github} target="_blank" rel="noreferrer"><Github /> {copy.labels.github}</a>
          ) : (
            <span className="private-project">{copy.labels.privateProject}</span>
          )}
          {project.demo && <a className="button button--solid" href={project.demo} target="_blank" rel="noreferrer"><ExternalLink /> {onlineLabel}</a>}
        </footer>
      </article>
    </Modal>
  );
}

export function ProjectsShowcase({ projects, copy }: { projects: Project[]; copy: ProjectsCopy }) {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <>
      <Section id="projetos" className="projects-section">
        <div className="page-grid">
          <SectionIntro
            label={copy.intro.label}
            title={copy.intro.title}
            description={copy.intro.description}
          />

          <div className="projects-grid">
            {projects.map((project) => {
              const onlineLabel = project.name === "Kiminorte" ? copy.labels.website : copy.labels.online;
              return (
                <article className="project-card" key={project.name}>
                  <button className="project-card__media" type="button" onClick={() => setSelected(project)} aria-label={copy.labels.mediaAria(project.name)}>
                    <ProjectMedia project={project} copy={copy} />
                  </button>
                  <div className="project-card__content">
                    <div className="project-card__meta"><span>{project.year}</span><span>{project.status}</span></div>
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                    <div className="project-technologies">{project.tags.map((tag) => <TechnologyMark key={tag} name={tag} />)}</div>
                    <div className="project-card__actions">
                      {project.github && <a href={project.github} target="_blank" rel="noreferrer"><Github /> {copy.labels.github}</a>}
                      {!project.github && <span className="project-action-unavailable"><Github /> {copy.labels.private}</span>}
                      {project.demo && <a href={project.demo} target="_blank" rel="noreferrer"><ExternalLink /> {onlineLabel}</a>}
                      <button type="button" onClick={() => setSelected(project)}>{copy.labels.details} <ArrowRight /></button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <a className="section-link" href={links.github} target="_blank" rel="noreferrer">
            {copy.labels.allRepos} <ArrowRight />
          </a>
        </div>
      </Section>

      {selected && <ProjectDetail project={selected} copy={copy} onClose={() => setSelected(null)} />}
    </>
  );
}

