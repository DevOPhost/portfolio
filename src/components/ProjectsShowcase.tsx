import {
  ArrowRight,
  ExternalLink
} from "lucide-react";
import {
  type CSSProperties,
  type RefObject,
  useEffect,
  useRef,
  useState
} from "react";
import { links } from "../config";
import { type Project } from "../data";
import { pageHref } from "../routes";
import { Modal } from "./Modal";
import { Section, SectionIntro } from "./SiteChrome";
import { TechnologyMark } from "./TechnologyMark";
import { BrandIcon } from "./BrandIcon";

import type { PortfolioContent } from "../i18n";

type ProjectsCopy = PortfolioContent["projects"];

function projectSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function OrganizeMockup({
  copy,
  large = false,
  active = false,
  containerRef
}: {
  copy: ProjectsCopy["organize"];
  large?: boolean;
  active?: boolean;
  containerRef?: RefObject<HTMLDivElement>;
}) {
  return (
    <div
      ref={containerRef}
      className={`organize-mockup${large ? " organize-mockup--large" : ""}${active ? " is-active" : ""}`}
      aria-label={copy.aria}
    >
      <div className="organize-mockup__bar">
        <strong>{copy.title}</strong>
      </div>
      <div className="organize-mockup__body">
        <div className="organize-mockup__terminal">
          <div className="organize-mockup__status" aria-hidden="true">
            <span>dry-run</span>
            <span>safe mode</span>
          </div>
          <code><b>$</b> {copy.command}</code>
          <p><span>scan</span> {copy.results[0]}</p>
          <p><span>plan</span> {copy.results[1]}</p>
          <p><span>safe</span> {copy.results[2]}</p>
          <small>{copy.note}</small>
        </div>
        <div className="organize-mockup__tree">
          <small>{copy.folder}</small>
          {copy.folders.map((item) => <span key={item}>{item}</span>)}
        </div>
      </div>
    </div>
  );
}

function ProjectPreview({
  project,
  copy,
  large = false
}: {
  project: Project;
  copy: ProjectsCopy;
  large?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const [active, setActive] = useState(large);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = previewRef.current;
    if (!element || large) {
      setActive(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.16, rootMargin: "160px 0px" }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [large]);

  if (project.name === "Organize" || project.preview?.type === "cli") {
    return (
      <OrganizeMockup
        copy={copy.organize}
        large={large}
        active={active}
        containerRef={previewRef}
      />
    );
  }


  const preview = project.preview ?? (project.image ? {
    type: "static" as const,
    images: [project.image]
  } : undefined);
  const images = preview?.images?.length ? preview.images : project.image ? [project.image] : [];

  if (images.length && !failed) {
    const slug = projectSlug(project.name);
    const previewType = preview?.type ?? "static";
    const trackStyle = { "--screen-count": images.length } as CSSProperties;

    return (
      <div
        ref={previewRef}
        className={`project-preview project-preview--${slug} project-preview--${previewType} project-preview--count-${images.length}${large ? " project-preview--large" : ""}${active ? " is-active" : ""}`}
      >
        <div className="project-preview__surface">
          <div className="project-preview__chrome" aria-hidden="true">
            <span className="project-preview__lights"><i /><i /><i /></span>
            <strong>{project.name}</strong>
            <span className="project-preview__progress"><i /></span>
          </div>
          <div className={`project-preview__viewport project-preview__viewport--${previewType}`}>
            <div className="project-preview__track" style={trackStyle}>
              {images.map((src, index) => (
                <img
                  key={src}
                  className={`project-media project-media--${previewType} ${large ? "project-media--large" : ""}`}
                  src={src}
                  width="1440"
                  height="900"
                  alt={index === 0 ? copy.labels.mediaAlt(project.name) : ""}
                  aria-hidden={index === 0 ? undefined : true}
                  loading={large || active ? "eager" : "lazy"}
                  decoding="async"
                  onError={() => setFailed(true)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`project-fallback ${large ? "project-fallback--large" : ""}`} aria-label={copy.labels.fallbackAria(project.name)}>
      <strong>{project.name}</strong>
      <small>{project.tags.join(" · ")}</small>
    </div>
  );
}
function ProjectDetail({ project, copy, onClose }: { project: Project; copy: ProjectsCopy; onClose: () => void }) {
  const onlineLabel = project.name === "Kiminorte" ? copy.labels.website : copy.labels.online;

  return (
    <Modal label={copy.labels.modalLabel(project.name)} onClose={onClose} size="project" closeLabel={copy.labels.close}>
      <article className="project-detail">
        <div className="project-detail__media"><ProjectPreview project={project} copy={copy} large /></div>
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
            <a className="button button--outline" href={project.github} target="_blank" rel="noopener noreferrer"><BrandIcon brand="github" /> {copy.labels.github}</a>
          ) : (
            <span className="private-project">{copy.labels.privateProject}</span>
          )}
          {project.demo && <a className="button button--solid" href={project.demo} target="_blank" rel="noopener noreferrer"><ExternalLink /> {onlineLabel}</a>}
        </footer>
      </article>
    </Modal>
  );
}

export function ProjectsShowcase({
  projects,
  copy,
  sectionId = "projetos",
  intro,
  viewAllLabel,
  onViewAll
}: {
  projects: Project[];
  copy: ProjectsCopy;
  sectionId?: string;
  intro?: ProjectsCopy["intro"];
  viewAllLabel?: string;
  onViewAll?: () => void;
}) {
  const [selected, setSelected] = useState<Project | null>(null);
  const heading = intro ?? copy.intro;
  const featuredProject = projects.find((project) => project.name === "Kiminorte");
  const orderedProjects = featuredProject
    ? [featuredProject, ...projects.filter((project) => project !== featuredProject)]
    : projects;

  return (
    <>
      <Section id={sectionId} className="projects-section">
        <div className="page-grid">
          <SectionIntro
            label={heading.label}
            title={heading.title}
            description={heading.description}
          />

          <div className="projects-grid">
            {orderedProjects.map((project) => {
              const onlineLabel = project.name === "Kiminorte" ? copy.labels.website : copy.labels.online;
              return (
                <article
                  className={`project-card${project.name === "Kiminorte" ? " project-card--featured" : ""}`}
                  key={project.name}
                >
                  <button
                    className="project-card__media"
                    type="button"
                    onClick={() => setSelected(project)}
                    aria-label={copy.labels.mediaAria(project.name)}
                  >
                    <ProjectPreview project={project} copy={copy} />
                  </button>
                  <div className="project-card__content">
                    <div className="project-card__meta"><span>{project.year}</span><span>{project.status}</span></div>
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                    <div className="project-technologies">{project.tags.map((tag) => <TechnologyMark key={tag} name={tag} />)}</div>
                    <div className="project-card__actions">
                      {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer"><BrandIcon brand="github" /> {copy.labels.github}</a>}
                      {!project.github && <span className="project-action-unavailable"><BrandIcon brand="github" /> {copy.labels.private}</span>}
                      {project.demo && <a href={project.demo} target="_blank" rel="noopener noreferrer"><ExternalLink /> {onlineLabel}</a>}
                      <button type="button" onClick={() => setSelected(project)}>{copy.labels.details} <ArrowRight /></button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {onViewAll ? (
            <a
              className="section-link"
              href={pageHref("projetos")}
              onClick={(event) => {
                if (
                  event.button !== 0 ||
                  event.metaKey ||
                  event.ctrlKey ||
                  event.shiftKey ||
                  event.altKey
                ) {
                  return;
                }
                event.preventDefault();
                onViewAll();
              }}
            >
              {viewAllLabel ?? copy.labels.allRepos} <ArrowRight />
            </a>
          ) : (
            <a className="section-link" href={links.github} target="_blank" rel="noopener noreferrer">
              {viewAllLabel ?? copy.labels.allRepos} <ArrowRight />
            </a>
          )}
        </div>
      </Section>

      {selected && <ProjectDetail project={selected} copy={copy} onClose={() => setSelected(null)} />}
    </>
  );
}
