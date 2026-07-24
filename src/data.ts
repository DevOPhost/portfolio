export type ProjectPreview = {
  type: "scroll" | "screens" | "static" | "cli";
  images?: string[];
};

export type Project = {
  name: string;
  kicker: string;
  year: string;
  status: string;
  role: string;
  description: string;
  detail: string;
  tags: string[];
  category: string;
  github?: string;
  demo?: string;
  image?: string;
  preview?: ProjectPreview;
};

export const projects: Project[] = [
  {
    name: "DevAtlas",
    kicker: "Orientação para carreiras em tecnologia",
    year: "2026",
    status: "Concluído",
    role: "Produto, UX e desenvolvimento",
    description: "Guia trilíngue para comparar áreas de tecnologia e montar um caminho de estudo.",
    detail: "O DevAtlas reúne áreas, ferramentas, roadmaps e ideias de projetos em português, inglês e espanhol. Desenvolvi a plataforma com Next.js, React e TypeScript, priorizando navegação clara e manutenção simples.",
    tags: ["Next.js", "React", "TypeScript"],
    category: "Produto",
    github: "https://github.com/DevOPhost/dev-atlas",
    demo: "https://devatlas-mauve.vercel.app/pt",
    image: "assets/projects/dev-atlas/screen-1.png",
    preview: {
      type: "screens",
      images: ["assets/projects/dev-atlas/screen-1.png", "assets/projects/dev-atlas/screen-2.png", "assets/projects/dev-atlas/screen-3.png", "assets/projects/dev-atlas/screen-4.png"]
    }
  },
  {
    name: "ArcadeX",
    kicker: "Plataforma de jogos com progressão",
    year: "2026",
    status: "Concluído",
    role: "Produto, front-end e regras de negócio",
    description: "Plataforma com 18 jogos, ranking, progressão, missões, conquistas e loja.",
    detail: "O ArcadeX conecta 18 jogos a um sistema compartilhado de progressão, ranking, missões e conquistas. A aplicação usa Next.js, TypeScript e Supabase para autenticação, dados e regras dos jogadores.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL"],
    category: "Produto",
    github: "https://github.com/DevOPhost/arcadex",
    demo: "https://arcadex-iota.vercel.app/",
    image: "assets/projects/arcadex/screen-2.png",
    preview: {
      type: "screens",
      images: ["assets/projects/arcadex/screen-2.png", "assets/projects/arcadex/screen-3.png", "assets/projects/arcadex/screen-4.png", "assets/projects/arcadex/screen-1.png"]
    }
  },
  {
    name: "TerraVex",
    kicker: "Dados econômicos em contexto",
    year: "2026",
    status: "Concluído",
    role: "Dados, interface e integração",
    description: "Mapa interativo de países com indicadores econômicos e conversão de moedas.",
    detail: "O TerraVex reúne mapa, indicadores econômicos e o CambioX em uma única interface. O projeto usa JavaScript, Leaflet, Chart.js e APIs externas, incluindo tratamento de erros de conexão.",
    tags: ["JavaScript", "Leaflet", "Chart.js", "REST APIs"],
    category: "Dados",
    github: "https://github.com/DevOPhost/terravex",
    demo: "https://devophost.github.io/terravex/",
    image: "assets/projects/terravex/cover.png",
    preview: {
      type: "static",
      images: ["assets/projects/terravex/cover.png"]
    }
  },
  {
    name: "NexusOps",
    kicker: "Visão central da operação de TI",
    year: "2026",
    status: "Estágio Supervisionado",
    role: "Análise, UX e desenvolvimento",
    description: "Dashboard de projetos, indicadores, alertas e prioridades de TI.",
    detail: "Desenvolvi o NexusOps no estágio supervisionado para centralizar projetos, prioridades, indicadores e alertas de TI. A interface usa React e Vite, com foco em leitura rápida e acompanhamento da operação.",
    tags: ["React", "Vite", "JavaScript", "MySQL"],
    category: "Sistemas",
    github: "https://github.com/DevOPhost/nexusops",
    demo: "https://devophost.github.io/nexusops/",
    image: "assets/projects/nexusops/screen-1.png",
    preview: {
      type: "screens",
      images: ["assets/projects/nexusops/screen-1.png", "assets/projects/nexusops/screen-2.png", "assets/projects/nexusops/screen-3.png"]
    }
  },
  {
    name: "StageFlow",
    kicker: "Acompanhamento de estágios",
    year: "2025",
    status: "Estágio Supervisionado",
    role: "Requisitos, produto e desenvolvimento",
    description: "Sistema para controlar estágios, horas, atividades e relatórios.",
    detail: "O StageFlow organiza pessoas, horas, atividades e documentos sem depender de controles isolados. Foi desenvolvido com HTML, CSS e JavaScript após o mapeamento do fluxo institucional.",
    tags: ["JavaScript", "HTML5", "CSS3", "Bootstrap", "Chart.js"],
    category: "Acadêmico",
    github: "https://github.com/DevOPhost/stageflow",
    demo: "https://devophost.github.io/stageflow/",
    image: "assets/projects/stageflow/screen-1.png",
    preview: {
      type: "screens",
      images: ["assets/projects/stageflow/screen-1.png", "assets/projects/stageflow/screen-2.png", "assets/projects/stageflow/screen-3.png"]
    }
  },
  {
    name: "Organize",
    kicker: "Automação segura de arquivos",
    year: "2025",
    status: "Concluído",
    role: "Concepção e desenvolvimento",
    description: "CLI em Python que organiza arquivos após uma prévia segura.",
    detail: "O Organize classifica arquivos, mostra as mudanças em modo dry-run e evita sobrescritas quando encontra nomes duplicados. É uma automação pequena, criada para pastas de trabalho e downloads.",
    tags: ["Python", "CLI"],
    category: "Automação",
    github: "https://github.com/DevOPhost/organize",
    preview: {
      type: "cli"
    }
  },

  {
    name: "Kiminorte",
    kicker: "Produto comercial em operação",
    year: "2024 a 2026",
    status: "Concluído",
    role: "Análise, desenvolvimento e manutenção",
    description: "Site corporativo com catálogo e fluxo direto de orçamento.",
    detail: "O site da Kiminorte apresenta a empresa, organiza o catálogo e direciona pedidos de orçamento. Desenvolvi a interface responsiva em HTML, CSS e JavaScript, com manutenção simples para a rotina comercial.",
    tags: ["JavaScript", "HTML5", "CSS3", "WhatsApp Business"],
    category: "Comercial",
    demo: "https://kiminorte.com/",
    image: "assets/projects/kiminorte/screen-1.png",
    preview: {
      type: "screens",
      images: ["assets/projects/kiminorte/screen-1.png", "assets/projects/kiminorte/screen-2.png", "assets/projects/kiminorte/screen-3.png"]
    }
  }
];

export type Certificate = {
  title: string;
  issuer: string;
  date: string;
  category: string;
  image: string;
  credential?: string;
  hours?: string;
};

export const certificates: Certificate[] = [
  { title: "IBM SkillsBuild Data Analytics Certificate", issuer: "IBM SkillsBuild", date: "Jul 2026", category: "Dados", image: "assets/certificates/ibm-data-analytics-certificate.png", credential: "https://www.credly.com/badges/b9952a5e-ee7a-46a8-8c99-3db138e47df4/public_url" },
  { title: "Data Classification", issuer: "IBM SkillsBuild", date: "Jun 2026", category: "Dados", image: "assets/certificates/ibm-data-classification.png", credential: "https://www.credly.com/badges/baf6172f-9297-4213-a4e6-bffd32f1d582" },
  { title: "Cybersecurity Fundamentals", issuer: "IBM SkillsBuild", date: "Jun 2026", category: "Segurança", image: "assets/certificates/ibm-cybersecurity.png", credential: "https://www.credly.com/badges/4623bf02-4a9a-4b8f-b7a1-15f1fc3bb22e" },
  { title: "Web Development Fundamentals", issuer: "IBM SkillsBuild", date: "Jun 2026", category: "Web", image: "assets/certificates/ibm-web-development.png", credential: "https://www.credly.com/badges/d62c03da-f393-4726-b488-6e48c6730793" },
  { title: "Artificial Intelligence Fundamentals", issuer: "IBM SkillsBuild", date: "Abr 2026", category: "IA", image: "assets/certificates/ibm-ai-fundamentals.png", credential: "https://www.credly.com/badges/39942a26-9c59-481e-879e-56f3e642d9e2" },
  { title: "AI Fundamentals with IBM SkillsBuild", issuer: "Cisco Networking Academy", date: "Abr 2026", category: "IA", image: "assets/certificates/cisco-ai-fundamentals.jpg" },
  { title: "Getting Started with Cisco Packet Tracer", issuer: "Cisco Networking Academy", date: "Abr 2026", category: "Redes", image: "assets/certificates/cisco-packet-tracer.jpg" },
  { title: "Linguagem de Programação Python", issuer: "Fundação Bradesco", date: "Abr 2026", category: "Python", hours: "53h", image: "assets/certificates/bradesco-python.png" },
  { title: "Banco de Dados", issuer: "Fundação Bradesco", date: "Abr 2026", category: "Dados", hours: "38h", image: "assets/certificates/bradesco-database.jpg" },
  { title: "Desenvolvimento Web Completo", issuer: "Udemy", date: "Mar 2026", category: "Web", hours: "126,5h", image: "assets/certificates/udemy-web.jpg" },
  { title: "Programação Python do Zero", issuer: "Udemy", date: "Mar 2026", category: "Python", hours: "8,5h", image: "assets/certificates/udemy-python.jpg" },
  { title: "Análise de Dados com Python", issuer: "Kroton", date: "Mar 2026", category: "Dados", hours: "40h", image: "assets/certificates/kroton-data-python.jpg" }
];

export type EventEntry = {
  title: string;
  issuer: string;
  detail: string;
  file: string;
  image: string;
};

export const events: EventEntry[] = [
  {
    title: "SEMINFO, Semana da Informática",
    issuer: "UNIC",
    detail: "Participação em 24 e 25 de abril de 2024 · 40 horas.",
    file: "assets/events/seminfo-2024.pdf",
    image: "assets/events/previews/seminfo-2024.png"
  },
  {
    title: "Semana de Cursos, Encontro 1",
    issuer: "UNIC · 19/09/2022",
    detail: "Ciclo de palestras da programação acadêmica · 5 horas.",
    file: "assets/events/semana-cursos-2022-09-19.pdf",
    image: "assets/events/previews/semana-cursos-2022-09-19.png"
  },
  {
    title: "Semana de Cursos, Encontro 2",
    issuer: "UNIC · 20/09/2022",
    detail: "Ciclo de palestras da programação acadêmica · 5 horas.",
    file: "assets/events/semana-cursos-2022-09-20.pdf",
    image: "assets/events/previews/semana-cursos-2022-09-20.png"
  },
  {
    title: "Semana de Cursos, Encontro 3",
    issuer: "UNIC · 21/09/2022",
    detail: "Ciclo de palestras da programação acadêmica · 5 horas.",
    file: "assets/events/semana-cursos-2022-09-21.pdf",
    image: "assets/events/previews/semana-cursos-2022-09-21.png"
  },
  {
    title: "Semana de Cursos, Encontro 4",
    issuer: "UNIC · 22/09/2022",
    detail: "Ciclo de palestras da programação acadêmica · 5 horas.",
    file: "assets/events/semana-cursos-2022-09-22.pdf",
    image: "assets/events/previews/semana-cursos-2022-09-22.png"
  },
  {
    title: "Semana de Cursos, Encontro 5",
    issuer: "UNIC · 23/09/2022",
    detail: "Ciclo de palestras da programação acadêmica · 5 horas.",
    file: "assets/events/semana-cursos-2022-09-23.pdf",
    image: "assets/events/previews/semana-cursos-2022-09-23.png"
  },
  {
    title: "Estudos Contemporâneos, Encontro 1",
    issuer: "UNIC · 14/11/2022",
    detail: "Ciclo de palestras da programação acadêmica · 3 horas.",
    file: "assets/events/semana-estudos-2022-11-14.pdf",
    image: "assets/events/previews/semana-estudos-2022-11-14.png"
  },
  {
    title: "Estudos Contemporâneos, Encontro 2",
    issuer: "UNIC · 16/11/2022",
    detail: "Ciclo de palestras da programação acadêmica · 3 horas.",
    file: "assets/events/semana-estudos-2022-11-16.pdf",
    image: "assets/events/previews/semana-estudos-2022-11-16.png"
  },
  {
    title: "Estudos Contemporâneos, Encontro 3",
    issuer: "UNIC · 17/11/2022",
    detail: "Ciclo de palestras da programação acadêmica · 3 horas.",
    file: "assets/events/semana-estudos-2022-11-17.pdf",
    image: "assets/events/previews/semana-estudos-2022-11-17.png"
  },
  {
    title: "Estudos Contemporâneos, Encontro 4",
    issuer: "UNIC · 18/11/2022",
    detail: "Ciclo de palestras da programação acadêmica · 3 horas.",
    file: "assets/events/semana-estudos-2022-11-18.pdf",
    image: "assets/events/previews/semana-estudos-2022-11-18.png"
  },
];

export type ExtensionEntry = {
  title: string;
  period: string;
  description: string;
  tags: string[];
  file: string;
  logo: string;
  logoAlt: string;
  logoFit?: "wide" | "square";
};

export const extensions: ExtensionEntry[] = [
  {
    title: "Instrutor de Informática e Tecnologia",
    period: "Agosto de 2022",
    description: "Condução de atividades de informática básica, lógica e uso responsável da tecnologia para a comunidade local.",
    tags: ["Inclusão digital", "Educação"],
    file: "assets/documents/projeto-extensao-i.pdf",
    logo: "assets/institutions/seduc-gov-mt.png",
    logoAlt: "Logo da SEDUC e Governo de Mato Grosso",
    logoFit: "wide"
  },
  {
    title: "Plataforma Web para Eventos Culturais",
    period: "Agosto a Novembro de 2023",
    description: "Desenvolvimento de uma página para divulgar programação, artistas e informações do Festival Multicultural de Arte Nordestina.",
    tags: ["Plataforma web", "Cultura"],
    file: "assets/documents/projeto-extensao-ii.pdf",
    logo: "assets/institutions/mt-criativo.jpg",
    logoAlt: "Logo do MT Criativo",
    logoFit: "square"
  },
  {
    title: "Inovação e Empreendedorismo",
    period: "Agosto a Setembro de 2024",
    description: "Diagnóstico de necessidades de microempreendedores, definição de requisitos e validação de soluções digitais simples.",
    tags: ["Requisitos", "Negócios locais"],
    file: "assets/documents/projeto-extensao-iii.pdf",
    logo: "assets/institutions/accuiaba-cropped.png",
    logoAlt: "Logo da ACCUIABÁ, Associação Comercial e Empresarial de Cuiabá",
    logoFit: "wide"
  }
];


