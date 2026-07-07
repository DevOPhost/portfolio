import {
  BarChart3,
  Code2,
  Database,
  FileSpreadsheet,
  Network
} from "lucide-react";
import {
  siCisco,
  siCss,
  siGit,
  siGithub,
  siHtml5,
  siJavascript,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siPostman,
  siPython,
  siReact,
  siSupabase,
  siTypescript,
  siVite
} from "simple-icons";
import { type CSSProperties, type ComponentType, type SVGProps } from "react";

type BrandIcon = { title: string; path: string; hex: string };

export type Technology = {
  name: string;
  icon?: BrandIcon;
  fallback?: ComponentType<SVGProps<SVGSVGElement>>;
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
  { name: "Supabase", icon: siSupabase },
  { name: "SQL", fallback: Database },
  { name: "MySQL", icon: siMysql },
  { name: "Recharts", fallback: BarChart3 },
  { name: "REST APIs", fallback: Network }
];

export const tools: Technology[] = [
  { name: "Git", icon: siGit },
  { name: "GitHub", icon: siGithub },
  { name: "Postman", icon: siPostman },
  { name: "VS Code", fallback: Code2 },
  { name: "Excel", fallback: FileSpreadsheet },
  { name: "ERP", fallback: Database },
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
  const technology: Technology = registry.get(name) ?? { name, fallback: Code2 };

  return (
    <span className={`technology-mark ${className}`.trim()} title={technology.name}>
      {technology.icon ? (
        <svg
          viewBox="0 0 24 24"
          role="img"
          aria-label={`Logo ${technology.name}`}
          style={{
            "--brand-color": ["Next.js", "GitHub"].includes(technology.name)
              ? "var(--text)"
              : `#${technology.icon.hex}`
          } as CSSProperties}
        >
          <path d={technology.icon.path} />
        </svg>
      ) : (
        (() => {
          const Fallback = technology.fallback ?? Code2;
          return <Fallback aria-hidden="true" />;
        })()
      )}
      <strong>{technology.name}</strong>
    </span>
  );
}
