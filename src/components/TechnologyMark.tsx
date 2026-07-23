import {
  siBootstrap,
  siChartdotjs,
  siCisco,
  siCss,
  siGit,
  siGithub,
  siHtml5,
  siJavascript,
  siLeaflet,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPostman,
  siPython,
  siReact,
  siSupabase,
  siTailwindcss,
  siTypescript,
  siVite,
  siWhatsapp
} from "simple-icons";
import {
  Braces,
  Code2,
  Database,
  FileSpreadsheet,
  SquareTerminal,
  Workflow,
  type LucideIcon
} from "lucide-react";
import { type CSSProperties } from "react";

type BrandIcon = { title: string; path: string; hex: string };

export type Technology = {
  name: string;
  icon?: BrandIcon;
  equivalentIcon?: LucideIcon;
};

export const technologies: Technology[] = [
  { name: "JavaScript", icon: siJavascript },
  { name: "TypeScript", icon: siTypescript },
  { name: "Python", icon: siPython },
  { name: "HTML5", icon: siHtml5 },
  { name: "CSS3", icon: siCss },
  { name: "React", icon: siReact },
  { name: "Next.js", icon: siNextdotjs },
  { name: "Node.js", icon: siNodedotjs },
  { name: "Vite", icon: siVite },
  { name: "Tailwind CSS", icon: siTailwindcss },
  { name: "Supabase", icon: siSupabase },
  { name: "PostgreSQL", icon: siPostgresql },
  { name: "MySQL", icon: siMysql },
  { name: "Leaflet", icon: siLeaflet },
  { name: "Chart.js", icon: siChartdotjs },
  { name: "Bootstrap", icon: siBootstrap },
  { name: "WhatsApp Business", icon: siWhatsapp },
  { name: "SQL", equivalentIcon: Database },
  { name: "REST APIs", equivalentIcon: Braces },
  { name: "CLI", equivalentIcon: SquareTerminal }
];

export const tools: Technology[] = [
  { name: "Git", icon: siGit },
  { name: "GitHub", icon: siGithub },
  { name: "Postman", icon: siPostman },
  { name: "VS Code", equivalentIcon: Code2 },
  { name: "Excel", equivalentIcon: FileSpreadsheet },
  { name: "ERP", equivalentIcon: Workflow },
  { name: "Packet Tracer", icon: siCisco }
];

const registry = new Map([...technologies, ...tools].map((technology) => [technology.name, technology]));

export function TechnologyMark({
  name,
  className = ""
}: {
  name: string;
  className?: string;
}) {
  const technology: Technology = registry.get(name) ?? { name };
  const EquivalentIcon = technology.equivalentIcon;
  const hasIcon = Boolean(technology.icon || EquivalentIcon);

  return (
    <span className={`technology-mark ${hasIcon ? "technology-mark--with-icon" : "technology-mark--text"} ${className}`.trim()} title={technology.name}>
      {technology.icon && (
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
          style={{
            "--brand-color": ["Next.js", "GitHub"].includes(technology.name)
              ? "var(--text)"
              : `#${technology.icon.hex}`
          } as CSSProperties}
        >
          <path d={technology.icon.path} />
        </svg>
      )}
      {EquivalentIcon && (
        <EquivalentIcon className="technology-mark__equivalent" aria-hidden="true" strokeWidth={1.8} />
      )}
      <strong>{technology.name}</strong>
    </span>
  );
}
