import type { Certificate, EventEntry, ExtensionEntry, Project } from "./data";

export type Language = "pt" | "en";

export const languageOptions = [
  {
    code: "pt" as const,
    flag: "🇧🇷",
    short: "PT-BR",
    label: "Português"
  },
  {
    code: "en" as const,
    flag: "🇺🇸",
    short: "EN-US",
    label: "English"
  }
];

export function readPreferredLanguage(): Language {
  if (typeof window === "undefined") return "pt";
  const saved = localStorage.getItem("portfolio-language");
  return saved === "en" ? "en" : "pt";
}

export const content = {
  pt: {
    documentTitle: "Leonardo Farias Martins | Analista de Sistemas",
    metaDescription:
      "Portfólio de Leonardo Farias Martins | Analista de Sistemas com experiência em software, automação, desenvolvimento web e dados.",
    skipLink: "Pular para o conteúdo",
    brandRole: "Analista de Sistemas",
    navLabel: "Navegação principal",
    languageSelector: {
      aria: "Selecionar idioma do site",
      label: "Idioma",
      pt: "Português",
      en: "English"
    },
    navigation: [
      ["experiencia", "Experiência"],
      ["projetos", "Projetos"],
      ["stack", "Tecnologias"],
      ["formacao", "Formação"],
      ["certificados", "Certificados"],
      ["extensao", "Extensão"],
      ["contato", "Contato"]
    ] as const,
    accessibility: {
      modalLabel: "Preferências de acessibilidade",
      titleKicker: "Acessibilidade",
      title: "Adapte a leitura ao seu jeito.",
      description: "As preferências ficam salvas neste navegador.",
      theme: "Tema",
      themeDescription: "Escolha a aparência com melhor conforto visual.",
      dark: "Escuro",
      light: "Claro",
      fontSize: "Tamanho do texto",
      fontPercent: (value: number) => `${Math.round(value * 100)}% do tamanho padrão.`,
      decreaseText: "Diminuir texto",
      increaseText: "Aumentar texto",
      toggles: [
        ["highContrast", "Alto contraste", "Reforça textos, bordas e estados interativos."],
        ["reduceMotion", "Reduzir movimentos", "Desativa transições e efeitos de profundidade."],
        ["underlineLinks", "Destacar links", "Sublinha links de texto para facilitar a identificação."]
      ] as const,
      reset: "Restaurar padrão",
      open: "Abrir opções de acessibilidade",
      themeToggle: {
        toLight: "Ativar tema claro",
        toDark: "Ativar tema escuro"
      },
      menu: {
        open: "Abrir menu",
        close: "Fechar menu"
      }
    },
    hero: {
      signatureRole: "Analista de Sistemas & Desenvolvedor",
      eyebrow: "Portfólio profissional · Software, dados e operação",
      title: {
        lead: "Transformo processos e dados em",
        highlight: "sistemas úteis."
      },
      description:
        "Bacharel em Ciência da Computação com experiência em análise de sistemas, automação, desenvolvimento web, ERP e dados — criando soluções que deixam rotinas mais claras, previsíveis e fáceis de operar.",
      actions: {
        projects: "Ver projetos",
        resume: "Currículo"
      }
    },
    portrait: {
      aria: "Perfil profissional de Leonardo Farias Martins",
      alt: "Retrato profissional de Leonardo Farias Martins",
      role: "Analista de Sistemas & Desenvolvedor",
      location: "Cuiabá · Mato Grosso",
      passTitle: "Digital Identity Pass",
      passCode: "LF-2026",
      name: "Leonardo Farias Martins",
      scopeLabel: "Atuação",
      scope: "Software · Dados · Operação",
      reachLabel: "Alcance",
      reach: "Brasil · Remoto internacional",
      verification: "Perfil profissional"
    },
    experience: {
      intro: {
        label: "Experiência",
        title: "Atuação profissional e prática supervisionada.",
        description: "Experiências em que tecnologia, operação e responsabilidade acadêmica se encontram."
      },
      company: {
        logoAlt: "Logo da Kiminorte",
        period: "Agosto de 2023 — atual",
        title: "Analista de Sistemas",
        place: "Kiminorte · Várzea Grande, Mato Grosso",
        link: "Conhecer a empresa",
        description:
          "Atuo entre a operação administrativa e a tecnologia, organizando informações, apoiando o uso de ERP e desenvolvendo soluções para reduzir tarefas manuais.",
        points: [
          ["Sistemas", "suporte, documentação e melhoria de fluxos internos."],
          ["Dados", "controles operacionais, Excel e apoio à decisão."],
          ["Automação", "scripts e rotinas para ganhar previsibilidade."],
          ["Web", "presença digital, catálogo e jornada comercial."]
        ] as const
      },
      internships: {
        eyebrow: "Experiência acadêmica supervisionada",
        title: "Estágios Supervisionados Obrigatórios",
        note: "Projetos e documentação organizados por etapa",
        mainActivities: "Atividades principais",
        viewForm: "Visualizar ficha",
        items: [
          {
            area: "Gestão acadêmica",
            title: "StageFlow",
            description: "Sistema para acompanhar estagiários, supervisores, atividades, horas e relatórios.",
            activity:
              "Mapeamento do fluxo de estágio, modelagem do banco de dados e desenvolvimento das interfaces do sistema.",
            file: "assets/internships/stageflow-acompanhamento.pdf"
          },
          {
            area: "Operações de TI",
            title: "NexusOps",
            description: "Dashboard para reunir projetos, indicadores, alertas e prioridades de gestão.",
            activity:
              "Levantamento de requisitos, integração de APIs, estruturação de dados e criação dos painéis operacionais.",
            file: "assets/internships/nexusops-acompanhamento.pdf"
          }
        ]
      }
    },
    projects: {
      intro: {
        label: "Projetos",
        title: "Produtos construídos para contextos diferentes.",
        description: "Projetos autorais, acadêmicos e comerciais com código, telas e decisões de implementação."
      },
      labels: {
        details: "Detalhes",
        github: "GitHub",
        private: "Código privado",
        privateProject: "Projeto comercial · código privado",
        online: "Ver projeto online",
        website: "Ver site",
        allRepos: "Ver todos os repositórios no GitHub",
        modalLabel: (name: string) => `Detalhes do projeto ${name}`,
        mediaAlt: (name: string) => `Tela inicial do projeto ${name}`,
        mediaAria: (name: string) => `Ver detalhes de ${name}`,
        fallbackAria: (name: string) => `Identidade visual do projeto ${name}`,
        role: "Meu papel",
        technologies: "Tecnologias",
        about: "Sobre o projeto"
      },
      organize: {
        aria: "Prévia do Organize organizando arquivos no terminal",
        title: "organize — dry-run",
        folder: "Downloads",
        folders: ["▾ documentos", "└ relatório.pdf", "▾ imagens", "└ retrato.png", "▾ arquivos", "└ backup.zip"],
        command: "organize ./Downloads --dry-run",
        results: ["18 arquivos analisados", "12 movimentos planejados", "nenhum conflito encontrado"],
        note: "Prévia concluída. Nenhum arquivo foi alterado."
      }
    },
    technologies: {
      intro: {
        label: "Tecnologias & ferramentas",
        title: "Stack aplicada a produtos, dados e operação.",
        description: "Ferramentas que aparecem na experiência profissional e nos projetos apresentados."
      },
      groups: [
        ["Tecnologias", "Linguagens, bibliotecas e serviços usados na implementação."],
        ["Ferramentas", "Ambiente de trabalho, integração, operação e documentação."]
      ] as const
    },
    education: {
      intro: {
        label: "Formação & conquistas acadêmicas",
        title: "Ciência da Computação com desempenho consistente.",
        description:
          "Graduação concluída com excelência acadêmica e nota máxima no Trabalho de Conclusão de Curso."
      },
      photoAlt: "Leonardo segurando a ata após a defesa do Trabalho de Conclusão de Curso",
      logoAlt: "Logo da Universidade de Cuiabá — UNIC",
      period: "Agosto de 2022 — Junho de 2026",
      degree: "Bacharelado em Ciência da Computação",
      institution: "UNIC — Universidade de Cuiabá",
      achievementTitle: "Nota máxima no TCC",
      achievementDescription: "Único aluno do semestre com esse resultado.",
      metrics: [
        ["9,96", "Coeficiente de rendimento"],
        ["42", "Disciplinas concluídas"],
        ["10", "Nota no TCC"]
      ] as const,
      diploma: "Ver diploma",
      soon: "Em breve",
      diplomaTitle: "O diploma será adicionado quando o arquivo estiver disponível"
    },
    certificates: {
      intro: {
        label: "Certificações, cursos & eventos",
        title: "Formação complementar documentada.",
        description: "Cursos técnicos, credenciais verificáveis e participação em atividades acadêmicas."
      },
      modalLabel: (title: string) => `Certificado ${title}`,
      imageAlt: (title: string, issuer: string) => `Certificado ${title}, emitido por ${issuer}`,
      enlarge: "Ampliar",
      validate: "Validar credencial",
      certificationHeading: {
        label: "Certificações e cursos",
        title: "Desenvolvimento, dados, IA, segurança e redes.",
        count: (amount: number) => `${amount} documentos disponíveis`
      },
      eventsHeading: {
        label: "Eventos e palestras",
        title: "Participação acadêmica além da sala de aula.",
        count: (amount: number) => `${amount} documentos de participação confirmados`
      },
      eventPreviewAlt: (title: string) => `Prévia do certificado ${title}`,
      eventViewAria: (title: string) => `Visualizar ${title}`,
      view: "Visualizar",
      viewCertificate: "Ver certificado"
    },
    extension: {
      intro: {
        label: "Extensão & voluntariado tech",
        title: "Tecnologia aplicada à comunidade.",
        description: "Projetos de extensão desenvolvidos ao longo da graduação."
      },
      viewDocument: "Ver documento"
    },
    resume: {
      label: "Currículo profissional",
      title: "Experiência e formação em uma leitura objetiva.",
      description:
        "Versões em PDF e HTML com experiência, formação, projetos, tecnologias e certificações.",
      download: "Baixar PDF",
      browser: "Ver no navegador"
    },
    contact: {
      label: "Contato",
      title: "Vamos conversar sobre sistemas, produtos e dados?",
      description:
        "O contato principal é pelo LinkedIn. Você também pode conhecer meu código no GitHub ou baixar o currículo.",
      links: [
        ["LinkedIn", "Contato profissional e oportunidades"],
        ["GitHub", "Código, projetos e documentação"],
        ["Currículo", "Baixar versão em PDF"]
      ] as const
    },
    footer: {
      role: "Analista de Sistemas",
      location: "© 2026 · Cuiabá, Mato Grosso",
      backTop: "Voltar ao topo"
    }
  },
  en: {
    documentTitle: "Leonardo Farias Martins | Systems Analyst",
    metaDescription:
      "Portfolio of Leonardo Farias Martins | Systems Analyst experienced in software, automation, web development and data.",
    skipLink: "Skip to content",
    brandRole: "Systems Analyst",
    navLabel: "Primary navigation",
    languageSelector: {
      aria: "Select site language",
      label: "Language",
      pt: "Português",
      en: "English"
    },
    navigation: [
      ["experiencia", "Experience"],
      ["projetos", "Projects"],
      ["stack", "Stack"],
      ["formacao", "Education"],
      ["certificados", "Certificates"],
      ["extensao", "Extension"],
      ["contato", "Contact"]
    ] as const,
    accessibility: {
      modalLabel: "Accessibility preferences",
      titleKicker: "Accessibility",
      title: "Adjust the reading experience to your needs.",
      description: "Your preferences are saved in this browser.",
      theme: "Theme",
      themeDescription: "Choose the appearance that feels most comfortable.",
      dark: "Dark",
      light: "Light",
      fontSize: "Text size",
      fontPercent: (value: number) => `${Math.round(value * 100)}% of the default size.`,
      decreaseText: "Decrease text size",
      increaseText: "Increase text size",
      toggles: [
        ["highContrast", "High contrast", "Strengthens text, borders and interactive states."],
        ["reduceMotion", "Reduce motion", "Disables transitions and depth effects."],
        ["underlineLinks", "Highlight links", "Underlines text links to make them easier to identify."]
      ] as const,
      reset: "Restore defaults",
      open: "Open accessibility options",
      themeToggle: {
        toLight: "Switch to light theme",
        toDark: "Switch to dark theme"
      },
      menu: {
        open: "Open menu",
        close: "Close menu"
      }
    },
    hero: {
      signatureRole: "Systems Analyst & Developer",
      eyebrow: "Professional portfolio · Software, data and operations",
      title: {
        lead: "I turn processes and data into",
        highlight: "useful systems."
      },
      description:
        "Computer Science graduate with experience in systems analysis, automation, web development, ERP and data — building solutions that make everyday operations clearer, more predictable and easier to run.",
      actions: {
        projects: "View projects",
        resume: "Resume"
      }
    },
    portrait: {
      aria: "Professional profile of Leonardo Farias Martins",
      alt: "Professional portrait of Leonardo Farias Martins",
      role: "Systems Analyst & Developer",
      location: "Cuiabá · Mato Grosso",
      passTitle: "Digital Identity Pass",
      passCode: "LF-2026",
      name: "Leonardo Farias Martins",
      scopeLabel: "Scope",
      scope: "Software · Data · Operations",
      reachLabel: "Reach",
      reach: "Brazil · International remote",
      verification: "Professional profile"
    },
    experience: {
      intro: {
        label: "Experience",
        title: "Professional work and supervised practice.",
        description: "Experiences where technology, operations and academic responsibility meet."
      },
      company: {
        logoAlt: "Kiminorte logo",
        period: "August 2023 — present",
        title: "Systems Analyst",
        place: "Kiminorte · Várzea Grande, Mato Grosso",
        link: "Visit the company",
        description:
          "I work between administrative operations and technology, organizing information, supporting ERP usage and developing solutions that reduce manual work.",
        points: [
          ["Systems", "support, documentation and improvement of internal workflows."],
          ["Data", "operational controls, Excel and decision support."],
          ["Automation", "scripts and routines for more predictable work."],
          ["Web", "digital presence, catalog and commercial journey."]
        ] as const
      },
      internships: {
        eyebrow: "Supervised academic experience",
        title: "Mandatory Supervised Internships",
        note: "Projects and documents organized by stage",
        mainActivities: "Main activities",
        viewForm: "View evaluation form",
        items: [
          {
            area: "Academic management",
            title: "StageFlow",
            description: "System for tracking interns, supervisors, activities, hours and reports.",
            activity:
              "Internship workflow mapping, database modeling and development of the system interfaces.",
            file: "assets/internships/stageflow-acompanhamento.pdf"
          },
          {
            area: "IT operations",
            title: "NexusOps",
            description: "Dashboard for consolidating projects, indicators, alerts and management priorities.",
            activity:
              "Requirements gathering, API integration, data structuring and creation of operational dashboards.",
            file: "assets/internships/nexusops-acompanhamento.pdf"
          }
        ]
      }
    },
    projects: {
      intro: {
        label: "Projects",
        title: "Products built for different contexts.",
        description: "Personal, academic and commercial projects with code, screens and implementation decisions."
      },
      labels: {
        details: "Details",
        github: "GitHub",
        private: "Private code",
        privateProject: "Commercial project · private code",
        online: "View project online",
        website: "Visit site",
        allRepos: "See all repositories on GitHub",
        modalLabel: (name: string) => `Project details: ${name}`,
        mediaAlt: (name: string) => `Home screen of the ${name} project`,
        mediaAria: (name: string) => `View details for ${name}`,
        fallbackAria: (name: string) => `Visual identity for the ${name} project`,
        role: "My role",
        technologies: "Technologies",
        about: "About the project"
      },
      organize: {
        aria: "Preview of Organize sorting files from the command line",
        title: "organize — dry-run",
        folder: "Downloads",
        folders: ["▾ documents", "└ report.pdf", "▾ images", "└ portrait.png", "▾ archives", "└ backup.zip"],
        command: "organize ./Downloads --dry-run",
        results: ["18 files scanned", "12 planned moves", "no conflicts found"],
        note: "Preview completed. No file was changed."
      }
    },
    technologies: {
      intro: {
        label: "Technologies & tools",
        title: "Stack applied to products, data and operations.",
        description: "Tools that appear throughout the professional experience and the selected projects."
      },
      groups: [
        ["Technologies", "Languages, libraries and services used in implementation."],
        ["Tools", "Work environment, integration, operations and documentation."]
      ] as const
    },
    education: {
      intro: {
        label: "Education & academic achievements",
        title: "Computer Science with consistent performance.",
        description:
          "Degree completed with academic excellence and top score in the final undergraduate project."
      },
      photoAlt: "Leonardo holding the official record after presenting his undergraduate final project",
      logoAlt: "University of Cuiabá — UNIC logo",
      period: "August 2022 — June 2026",
      degree: "Bachelor's Degree in Computer Science",
      institution: "UNIC — University of Cuiabá",
      achievementTitle: "Top score in the final project",
      achievementDescription: "The only student in the semester to achieve this result.",
      metrics: [
        ["9.96", "Academic performance coefficient"],
        ["42", "Completed courses"],
        ["10", "Final project grade"]
      ] as const,
      diploma: "View diploma",
      soon: "Soon",
      diplomaTitle: "The diploma will be added once the file is available"
    },
    certificates: {
      intro: {
        label: "Certificates, courses & events",
        title: "Documented complementary education.",
        description: "Technical courses, verifiable credentials and participation in academic activities."
      },
      modalLabel: (title: string) => `Certificate ${title}`,
      imageAlt: (title: string, issuer: string) => `Certificate ${title}, issued by ${issuer}`,
      enlarge: "Enlarge",
      validate: "Validate credential",
      certificationHeading: {
        label: "Certifications and courses",
        title: "Development, data, AI, security and networking.",
        count: (amount: number) => `${amount} available documents`
      },
      eventsHeading: {
        label: "Events and talks",
        title: "Academic participation beyond the classroom.",
        count: (amount: number) => `${amount} confirmed participation documents`
      },
      eventPreviewAlt: (title: string) => `Certificate preview for ${title}`,
      eventViewAria: (title: string) => `View ${title}`,
      view: "View",
      viewCertificate: "View certificate"
    },
    extension: {
      intro: {
        label: "Extension & tech volunteering",
        title: "Technology applied to the community.",
        description: "Extension projects developed throughout the degree."
      },
      viewDocument: "View document"
    },
    resume: {
      label: "Professional resume",
      title: "Experience and education in an objective format.",
      description:
        "PDF and HTML versions with experience, education, projects, technologies and certifications.",
      download: "Download PDF",
      browser: "Open in browser"
    },
    contact: {
      label: "Contact",
      title: "Shall we talk about systems, products and data?",
      description:
        "LinkedIn is the main contact channel. You can also review my code on GitHub or download the resume.",
      links: [
        ["LinkedIn", "Professional contact and opportunities"],
        ["GitHub", "Code, projects and documentation"],
        ["Resume", "Download the PDF version"]
      ] as const
    },
    footer: {
      role: "Systems Analyst",
      location: "© 2026 · Cuiabá, Mato Grosso",
      backTop: "Back to top"
    }
  }
};

export type PortfolioContent = (typeof content)[Language];

const projectEnglish: Partial<Record<Project["name"], Partial<Project>>> = {
  DevAtlas: {
    kicker: "Career guidance for technology paths",
    status: "Completed",
    role: "Product, UX and development",
    description:
      "Trilingual guide for comparing areas, technologies and study paths without getting lost in fragmented content.",
    detail:
      "I created DevAtlas to bring together, in one place, the information that is usually scattered when someone starts studying technology. The platform organizes professional areas, tools, roadmaps and project ideas in Portuguese, English and Spanish. It was built with Next.js, React and TypeScript, focusing on clear navigation, accessible content and simple maintenance.",
    category: "Product"
  },
  ArcadeX: {
    kicker: "Game platform with progression",
    status: "Completed",
    role: "Product, front-end and business rules",
    description:
      "Ecosystem with 18 games, ranking, XP, X-Coins, missions, achievements, store and admin panel.",
    detail:
      "ArcadeX started from the idea of connecting casual games to a shared progression system. Beyond the 18 games, the platform includes rankings, experience, virtual currency, missions, achievements and administrative features. I used Next.js and TypeScript in the application and Supabase for authentication, persistence and player-related rules.",
    category: "Product"
  },
  Organize: {
    kicker: "Safe file automation",
    status: "Completed",
    role: "Concept and development",
    description:
      "Python CLI that organizes files by extension, previews changes with dry-run and handles conflicts safely.",
    detail:
      "Organize is a command-line tool created to solve the recurring clutter in work and downloads folders. The script identifies files, shows a simulation before moving anything and handles duplicated names without overwriting content. It was written in Python with special attention to predictable operations.",
    category: "Automation"
  },
  TerraVex: {
    kicker: "Economic data in context",
    status: "Completed",
    role: "Data, interface and integration",
    description: "Interactive map with country indicators and CambioX for currency conversions.",
    detail:
      "TerraVex turns country indicators into a map-based visual experience. The interface allows users to consult economic information and use CambioX for currency conversions in the same product. The project combines HTML, CSS and JavaScript with external APIs, response handling and clear states for connection failures.",
    category: "Data"
  },
  NexusOps: {
    kicker: "Central view of IT operations",
    status: "Supervised Internship",
    role: "Analysis, UX and development",
    description:
      "Dashboard for consolidating projects, indicators, alerts and priorities in a technology operation.",
    detail:
      "NexusOps was developed during the supervised internship to concentrate information that is usually scattered in IT routines. The application brings projects, priorities, indicators and alerts into a single reading experience, making operational follow-up easier. The interface was built with React and Vite, using Recharts for data visualizations.",
    category: "Systems"
  },
  StageFlow: {
    kicker: "Internship tracking",
    status: "Supervised Internship",
    role: "Requirements, product and development",
    description:
      "System for organizing interns, supervisors, activities, hours and reports in the same workflow.",
    detail:
      "StageFlow emerged during the supervised internship from the need to track people, hours, activities and documents without relying on isolated controls. The system organizes each internship's progress and makes pending items and responsible people more visible. It was developed with HTML, CSS and JavaScript based on the institutional workflow mapping.",
    category: "Academic"
  },
  Kiminorte: {
    kicker: "Commercial product in operation",
    status: "Completed",
    role: "Analysis, development and maintenance",
    description:
      "Corporate digital presence with catalog, company information and a direct quotation journey.",
    detail:
      "The Kiminorte project was built for a real company and addresses a direct commercial need: presenting products, strengthening institutional presence and making quotation requests easier. I developed a responsive structure with HTML, CSS and JavaScript, prioritizing clarity for customers and simple day-to-day maintenance.",
    category: "Commercial"
  }
};

const certificateEnglish: Partial<Record<Certificate["title"], Partial<Certificate>>> = {
  "Linguagem de Programação Python": { title: "Python Programming Language", category: "Python", hours: "53h" },
  "Banco de Dados": { title: "Database", category: "Data", hours: "38h" },
  "Desenvolvimento Web Completo": { title: "Complete Web Development", category: "Web", hours: "126.5h" },
  "Programação Python do Zero": { title: "Python Programming from Zero", category: "Python", hours: "8.5h" },
  "Análise de Dados com Python": { title: "Data Analysis with Python", category: "Data", hours: "40h" },
  "Data Classification": { category: "Data" },
  "Cybersecurity Fundamentals": { category: "Security" },
  "Artificial Intelligence Fundamentals": { category: "AI" },
  "AI Fundamentals with IBM SkillsBuild": { category: "AI" },
  "Getting Started with Cisco Packet Tracer": { category: "Networking" }
};

const eventEnglish: Record<string, Partial<EventEntry>> = {
  "SEMINFO — Semana da Informática": {
    title: "SEMINFO — Computer Science Week",
    issuer: "UNIC",
    detail: "Participation on April 24 and 25, 2024 · 40 hours."
  },
  "Semana de Cursos — Encontro 1": {
    title: "Course Week — Session 1",
    issuer: "UNIC · Sep 19, 2022",
    detail: "Academic lecture cycle · 5 hours."
  },
  "Semana de Cursos — Encontro 2": {
    title: "Course Week — Session 2",
    issuer: "UNIC · Sep 20, 2022",
    detail: "Academic lecture cycle · 5 hours."
  },
  "Semana de Cursos — Encontro 3": {
    title: "Course Week — Session 3",
    issuer: "UNIC · Sep 21, 2022",
    detail: "Academic lecture cycle · 5 hours."
  },
  "Semana de Cursos — Encontro 4": {
    title: "Course Week — Session 4",
    issuer: "UNIC · Sep 22, 2022",
    detail: "Academic lecture cycle · 5 hours."
  },
  "Semana de Cursos — Encontro 5": {
    title: "Course Week — Session 5",
    issuer: "UNIC · Sep 23, 2022",
    detail: "Academic lecture cycle · 5 hours."
  },
  "Estudos Contemporâneos — Encontro 1": {
    title: "Contemporary Studies — Session 1",
    issuer: "UNIC · Nov 14, 2022",
    detail: "Academic lecture cycle · 3 hours."
  },
  "Estudos Contemporâneos — Encontro 2": {
    title: "Contemporary Studies — Session 2",
    issuer: "UNIC · Nov 16, 2022",
    detail: "Academic lecture cycle · 3 hours."
  },
  "Estudos Contemporâneos — Encontro 3": {
    title: "Contemporary Studies — Session 3",
    issuer: "UNIC · Nov 17, 2022",
    detail: "Academic lecture cycle · 3 hours."
  },
  "Estudos Contemporâneos — Encontro 4": {
    title: "Contemporary Studies — Session 4",
    issuer: "UNIC · Nov 18, 2022",
    detail: "Academic lecture cycle · 3 hours."
  }
};

const extensionEnglish: Record<string, Partial<ExtensionEntry>> = {
  "Instrutor de Informática e Tecnologia": {
    title: "Computer and Technology Instructor",
    period: "August 2022",
    description:
      "Led activities on basic computing, logic and responsible technology use for the local community.",
    tags: ["Digital inclusion", "Education"]
  },
  "Plataforma Web para Eventos Culturais": {
    title: "Web Platform for Cultural Events",
    period: "August — November 2023",
    description:
      "Developed a page to promote schedules, artists and information for the Multicultural Festival of Northeastern Art.",
    tags: ["Web platform", "Culture"]
  },
  "Inovação e Empreendedorismo": {
    title: "Innovation and Entrepreneurship",
    period: "August — September 2024",
    description:
      "Diagnosed local micro-entrepreneurs' needs, defined requirements and validated simple digital solutions.",
    tags: ["Requirements", "Local businesses"]
  }
};

export function localizeProjects(projects: Project[], language: Language): Project[] {
  if (language === "pt") return projects;
  return projects.map((project) => ({ ...project, ...projectEnglish[project.name] }));
}

export function localizeCertificates(certificates: Certificate[], language: Language): Certificate[] {
  if (language === "pt") return certificates;
  return certificates.map((certificate) => ({ ...certificate, ...certificateEnglish[certificate.title] }));
}

export function localizeEvents(events: EventEntry[], language: Language): EventEntry[] {
  if (language === "pt") return events;
  return events.map((event) => ({ ...event, ...eventEnglish[event.title] }));
}

export function localizeExtensions(extensions: ExtensionEntry[], language: Language): ExtensionEntry[] {
  if (language === "pt") return extensions;
  return extensions.map((extension) => ({ ...extension, ...extensionEnglish[extension.title] }));
}





