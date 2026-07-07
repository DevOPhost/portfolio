import { Section, SectionIntro } from "./SiteChrome";
import type { PortfolioContent } from "../i18n";
import { technologies, TechnologyMark, tools } from "./TechnologyMark";

type TechnologiesCopy = PortfolioContent["technologies"];

export function Technologies({ copy }: { copy: TechnologiesCopy }) {
  const groups = [
    { title: copy.groups[0][0], description: copy.groups[0][1], items: technologies },
    { title: copy.groups[1][0], description: copy.groups[1][1], items: tools }
  ];

  return (
    <Section id="stack" className="technologies-section">
      <div className="page-grid">
        <SectionIntro
          label={copy.intro.label}
          title={copy.intro.title}
          description={copy.intro.description}
        />
        <div className="technology-groups">
          {groups.map((group) => (
            <article key={group.title}>
              <header><h3>{group.title}</h3><p>{group.description}</p></header>
              <div>
                {group.items.map((technology) => (
                  <TechnologyMark className="technology-item" key={technology.name} name={technology.name} />
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}

