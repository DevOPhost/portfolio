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
  accent: string;
  glyph: string;
};

export const projects: Project[] = [
  {
    name: "DevAtlas",
    kicker: "Orientação para carreiras em tecnologia",
    year: "2026",
    status: "Concluído",
    role: "Produto, UX e desenvolvimento",
    description: "Guia trilíngue para comparar áreas, tecnologias e caminhos de estudo sem se perder em conteúdo fragmentado.",
    detail: "Criei o DevAtlas para reunir, em um só lugar, as informações que normalmente ficam espalhadas quando alguém começa a estudar tecnologia. A plataforma organiza áreas de atuação, ferramentas, roadmaps e ideias de projetos em português, inglês e espanhol. Foi desenvolvida com Next.js, React e TypeScript, com foco em navegação clara, conteúdo acessível e manutenção simples.",
    tags: ["Next.js", "TypeScript", "React"],
    category: "Produto",
    github: "https://github.com/DevOPhost/dev-atlas",
    image: "assets/projects/dev-atlas/cover.png",
    accent: "#8ba4d6",
    glyph: "DA"
  },
  {
    name: "ArcadeX",
    kicker: "Plataforma de jogos com progressão",
    year: "2026",
    status: "Concluído",
    role: "Produto, front-end e regras de negócio",
    description: "Ecossistema com 18 jogos, ranking, XP, X-Coins, missões, conquistas, loja e painel administrativo.",
    detail: "O ArcadeX nasceu da ideia de conectar jogos casuais a uma progressão compartilhada. Além dos 18 jogos, a plataforma reúne ranking, experiência, moeda virtual, missões, conquistas e recursos administrativos. Usei Next.js e TypeScript na aplicação e Supabase para autenticação, persistência e regras relacionadas aos jogadores.",
    tags: ["Next.js", "TypeScript", "Supabase", "SQL"],
    category: "Produto",
    github: "https://github.com/DevOPhost/arcadex",
    image: "assets/projects/arcadex/cover.png",
    accent: "#a18dbb",
    glyph: "AX"
  },
  {
    name: "Organize",
    kicker: "Automação segura de arquivos",
    year: "2026",
    status: "Concluído",
    role: "Concepção e desenvolvimento",
    description: "CLI em Python que organiza arquivos por extensão, antecipa mudanças com dry-run e resolve conflitos com segurança.",
    detail: "O Organize é uma ferramenta de linha de comando criada para resolver a bagunça recorrente em pastas de trabalho e downloads. O script identifica os arquivos, apresenta uma simulação antes de mover qualquer item e trata nomes duplicados sem sobrescrever conteúdo. Foi escrito em Python com atenção especial à previsibilidade das operações.",
    tags: ["Python"],
    category: "Automação",
    github: "https://github.com/DevOPhost/organize",
    accent: "#7f9f91",
    glyph: "OR"
  },
  {
    name: "TerraVex",
    kicker: "Dados econômicos em contexto",
    year: "2026",
    status: "Concluído",
    role: "Dados, interface e integração",
    description: "Mapa interativo com indicadores de países e o CambioX para conversões de moedas.",
    detail: "O TerraVex transforma indicadores de países em uma experiência visual baseada em mapa. A interface permite consultar informações econômicas e usar o CambioX para conversões de moedas sem sair do mesmo produto. O projeto combina HTML, CSS e JavaScript com APIs externas, tratamento de respostas e estados claros para falhas de conexão.",
    tags: ["JavaScript", "HTML5", "CSS3", "REST APIs"],
    category: "Dados",
    github: "https://github.com/DevOPhost/terravex",
    image: "assets/projects/terravex/cover.png",
    accent: "#b79b68",
    glyph: "TV"
  },
  {
    name: "NexusOps",
    kicker: "Visão central da operação de TI",
    year: "2026",
    status: "Estágio Supervisionado",
    role: "Análise, UX e desenvolvimento",
    description: "Dashboard para reunir projetos, indicadores, alertas e prioridades de uma operação de tecnologia.",
    detail: "O NexusOps foi desenvolvido durante o estágio supervisionado para concentrar informações que costumam ficar dispersas na rotina de TI. A aplicação reúne projetos, prioridades, indicadores e alertas em uma leitura única, facilitando o acompanhamento da operação. A interface foi construída com React e Vite, usando Recharts nas visualizações de dados.",
    tags: ["React", "JavaScript", "Vite", "Recharts"],
    category: "Sistemas",
    github: "https://github.com/DevOPhost/nexusops",
    image: "assets/projects/nexusops/cover.png",
    accent: "#b77f88",
    glyph: "NX"
  },
  {
    name: "StageFlow",
    kicker: "Acompanhamento de estágios",
    year: "2025",
    status: "Estágio Supervisionado",
    role: "Requisitos, produto e desenvolvimento",
    description: "Sistema para organizar estagiários, supervisores, atividades, horas e relatórios em um mesmo fluxo.",
    detail: "O StageFlow surgiu no estágio supervisionado a partir da necessidade de acompanhar pessoas, horas, atividades e documentos sem depender de controles isolados. O sistema organiza o progresso de cada estágio e deixa pendências e responsáveis mais visíveis. Foi desenvolvido com HTML, CSS e JavaScript a partir do levantamento do fluxo institucional.",
    tags: ["JavaScript", "HTML5", "CSS3"],
    category: "Acadêmico",
    github: "https://github.com/DevOPhost/stageflow",
    image: "assets/projects/stageflow/cover.png",
    accent: "#7899b4",
    glyph: "SF"
  },
  {
    name: "Kiminorte",
    kicker: "Produto comercial em operação",
    year: "2024—2026",
    status: "Concluído",
    role: "Análise, desenvolvimento e manutenção",
    description: "Presença digital corporativa com catálogo, informações empresariais e uma jornada direta de orçamento.",
    detail: "O projeto da Kiminorte foi construído para uma empresa real e atende uma necessidade comercial direta: apresentar produtos, fortalecer a presença institucional e facilitar pedidos de orçamento. Desenvolvi uma estrutura responsiva em HTML, CSS e JavaScript, priorizando clareza para o cliente e manutenção simples no dia a dia.",
    tags: ["JavaScript", "HTML5", "CSS3"],
    category: "Comercial",
    demo: "https://kiminorte.com/",
    image: "assets/projects/kiminorte/cover.png",
    accent: "#3088c7",
    glyph: "KM"
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
    title: "SEMINFO — Semana da Informática",
    issuer: "UNIC",
    detail: "Participação em 24 e 25 de abril de 2024 · 40 horas.",
    file: "assets/events/seminfo-2024.pdf",
    image: "assets/events/previews/seminfo-2024.png"
  },
  {
    title: "Semana de Cursos — Encontro 1",
    issuer: "UNIC · 19/09/2022",
    detail: "Ciclo de palestras da programação acadêmica · 5 horas.",
    file: "assets/events/semana-cursos-2022-09-19.pdf",
    image: "assets/events/previews/semana-cursos-2022-09-19.png"
  },
  {
    title: "Semana de Cursos — Encontro 2",
    issuer: "UNIC · 20/09/2022",
    detail: "Ciclo de palestras da programação acadêmica · 5 horas.",
    file: "assets/events/semana-cursos-2022-09-20.pdf",
    image: "assets/events/previews/semana-cursos-2022-09-20.png"
  },
  {
    title: "Semana de Cursos — Encontro 3",
    issuer: "UNIC · 21/09/2022",
    detail: "Ciclo de palestras da programação acadêmica · 5 horas.",
    file: "assets/events/semana-cursos-2022-09-21.pdf",
    image: "assets/events/previews/semana-cursos-2022-09-21.png"
  },
  {
    title: "Semana de Cursos — Encontro 4",
    issuer: "UNIC · 22/09/2022",
    detail: "Ciclo de palestras da programação acadêmica · 5 horas.",
    file: "assets/events/semana-cursos-2022-09-22.pdf",
    image: "assets/events/previews/semana-cursos-2022-09-22.png"
  },
  {
    title: "Semana de Cursos — Encontro 5",
    issuer: "UNIC · 23/09/2022",
    detail: "Ciclo de palestras da programação acadêmica · 5 horas.",
    file: "assets/events/semana-cursos-2022-09-23.pdf",
    image: "assets/events/previews/semana-cursos-2022-09-23.png"
  },
  {
    title: "Estudos Contemporâneos — Encontro 1",
    issuer: "UNIC · 14/11/2022",
    detail: "Ciclo de palestras da programação acadêmica · 3 horas.",
    file: "assets/events/semana-estudos-2022-11-14.pdf",
    image: "assets/events/previews/semana-estudos-2022-11-14.png"
  },
  {
    title: "Estudos Contemporâneos — Encontro 2",
    issuer: "UNIC · 16/11/2022",
    detail: "Ciclo de palestras da programação acadêmica · 3 horas.",
    file: "assets/events/semana-estudos-2022-11-16.pdf",
    image: "assets/events/previews/semana-estudos-2022-11-16.png"
  },
  {
    title: "Estudos Contemporâneos — Encontro 3",
    issuer: "UNIC · 17/11/2022",
    detail: "Ciclo de palestras da programação acadêmica · 3 horas.",
    file: "assets/events/semana-estudos-2022-11-17.pdf",
    image: "assets/events/previews/semana-estudos-2022-11-17.png"
  },
  {
    title: "Estudos Contemporâneos — Encontro 4",
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
};

export const extensions: ExtensionEntry[] = [
  {
    title: "Instrutor de Informática e Tecnologia",
    period: "Agosto de 2022",
    description: "Condução de atividades de informática básica, lógica e uso responsável da tecnologia para a comunidade local.",
    tags: ["Inclusão digital", "Educação"],
    file: "assets/documents/projeto-extensao-i.pdf"
  },
  {
    title: "Plataforma Web para Eventos Culturais",
    period: "Agosto — Novembro de 2023",
    description: "Desenvolvimento de uma página para divulgar programação, artistas e informações do Festival Multicultural de Arte Nordestina.",
    tags: ["Plataforma web", "Cultura"],
    file: "assets/documents/projeto-extensao-ii.pdf"
  },
  {
    title: "Inovação e Empreendedorismo",
    period: "Agosto — Setembro de 2024",
    description: "Diagnóstico de necessidades de microempreendedores, definição de requisitos e validação de soluções digitais simples.",
    tags: ["Requisitos", "Negócios locais"],
    file: "assets/documents/projeto-extensao-iii.pdf"
  }
];



