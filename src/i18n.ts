import type { Certificate, EventEntry, ExtensionEntry, Project } from "./data";

export type Language = "pt" | "en";

export const languageOptions = [
  {
    code: "pt" as const,
    short: "PT-BR",
    label: "Português"
  },
  {
    code: "en" as const,
    short: "EN-US",
    label: "English"
  }
];

export function readPreferredLanguage(): Language {
  if (typeof window === "undefined") return "pt";
  try {
    const saved = window.localStorage.getItem("portfolio-language");
    return saved === "en" ? "en" : "pt";
  } catch {
    return "pt";
  }
}

export const content = {
  pt: {
    documentTitle: "Leonardo Farias Martins | Analista de Sistemas e Desenvolvedor",
    metaDescription:
      "Portfólio de Leonardo Farias Martins | Analista de Sistemas e Desenvolvedor com experiência em software, automação, desenvolvimento web, ERP e dados.",
    skipLink: "Pular para o conteúdo",
    brandRole: "Analista de Sistemas e Desenvolvedor",
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
      close: "Fechar painel de acessibilidade",
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
      signatureRole: "Analista de Sistemas e Desenvolvedor",
      eyebrow: "Portfólio profissional · Sistemas, dados e automação",
      title: {
        lead: "Transformo processos e dados em",
        highlight: "sistemas úteis."
      },
      description:
        "Bacharel em Ciência da Computação com experiência em sistemas, ERP, dados, automação e desenvolvimento web. Organizo processos e reduzo tarefas manuais com software.",
      actions: {
        projects: "Ver projetos",
        resume: "Currículo"
      }
    },
    portrait: {
      aria: "Perfil profissional de Leonardo Farias Martins",
      alt: "Retrato profissional de Leonardo Farias Martins",
      role: "Analista de Sistemas e Desenvolvedor",
      location: "Cuiabá · Mato Grosso",
      name: "Leonardo Farias Martins",
      reach: "Brasil · Remoto internacional",
    },
    experience: {
      intro: {
        label: "Experiência",
        title: "Experiência em sistemas e operação.",
        description: "Trabalho profissional e prática supervisionada com processos, dados e software."
      },
      company: {
        logoAlt: "Logo da Kiminorte",
        period: "Agosto de 2023 até o momento",
        title: "Analista de Sistemas e Desenvolvedor",
        place: "Kiminorte · Várzea Grande, Mato Grosso",
        link: "Conhecer a empresa",
        description:
          "Na Kiminorte, conecto a operação administrativa à tecnologia. Trabalho com ERP, dados, documentação, automação e desenvolvimento web.",
        points: [
          ["Sistemas", "suporte ao ERP e melhoria de processos."],
          ["Dados", "controles operacionais e apoio à decisão."],
          ["Automação", "scripts para reduzir tarefas manuais."],
          ["Web", "catálogo, conteúdo e jornada comercial."]
        ] as const
      },
      internships: {
        eyebrow: "Experiência acadêmica supervisionada",
        title: "Estágios Supervisionados Obrigatórios",
        note: "Documentação acadêmica por etapa",
        mainActivities: "Atividades principais",
        viewForm: "Visualizar ficha",
        items: [
          {
            area: "Gestão acadêmica",
            title: "StageFlow",
            description: "Sistema para controlar estágios, horas, atividades e relatórios.",
            activity:
              "Mapeamento do processo, banco de dados e interfaces.",
            file: "assets/internships/stageflow-acompanhamento.pdf"
          },
          {
            area: "Operações de TI",
            title: "NexusOps",
            description: "Dashboard de projetos, indicadores e prioridades de TI.",
            activity:
              "Requisitos, integração de APIs, estrutura de dados e painéis.",
            file: "assets/internships/nexusops-acompanhamento.pdf"
          }
        ]
      }
    },
    projects: {
      intro: {
        label: "Projetos",
        title: "Projetos que resolvem problemas concretos.",
        description: "Soluções autorais, acadêmicas e comerciais com foco em clareza, utilidade e manutenção simples."
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
        about: "Sobre o projeto",
        close: "Fechar detalhes do projeto"
      },
      previewSteps: {
        DevAtlas: ["Áreas", "Roadmaps", "Comparador", "Projetos"],
        ArcadeX: ["Biblioteca", "Ranking", "Loja", "Conquistas"],
        Organize: ["Dry-run", "Extensões", "Pastas", "Conflitos"],
        TerraVex: ["Mapa", "Indicadores", "CambioX", "Histórico"],
        NexusOps: ["Dashboard", "Projetos", "Alertas", "APIs"],
        StageFlow: ["Estagiários", "Horas", "Relatórios", "Supervisores"],
        Kiminorte: ["Institucional", "Catálogo", "Produtos", "Orçamento"]
      },
      organize: {
        aria: "Prévia do Organize organizando arquivos no terminal",
        title: "organize: dry-run",
        folder: "Depois do dry-run",
        folders: ["docs/relatorio.pdf", "images/retrato.png", "archives/backup.zip", "code/app.py"],
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
        title: "Bacharelado em Ciência da Computação.",
        description:
          "Graduação concluída com coeficiente 9,96 e nota 10 no TCC."
      },
      photoAlt: "Leonardo segurando a ata após a defesa do Trabalho de Conclusão de Curso",
      logoAlt: "Logo da Universidade de Cuiabá, UNIC",
      period: "Agosto de 2022 a Junho de 2026",
      degree: "Bacharelado em Ciência da Computação",
      institution: "UNIC, Universidade de Cuiabá",
      achievementTitle: "Nota máxima no TCC",
      achievementDescription: "Trabalho aprovado com nota 10.",
      metrics: [
        ["9,96", "Coeficiente de rendimento"],
        ["42", "Disciplinas concluídas"],
        ["10", "Nota no TCC"]
      ] as const
    },
    certificates: {
      intro: {
        label: "Certificações, cursos & eventos",
        title: "Certificações e cursos.",
        description: "Credenciais em desenvolvimento, dados, IA, segurança e redes."
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
      viewCertificate: "Ver certificado",
      close: "Fechar certificado"
    },
    extension: {
      intro: {
        label: "Extensão & impacto comunitário",
        title: "Projetos de extensão.",
        description: "Tecnologia aplicada a educação, cultura e negócios locais."
      },
      viewDocument: "Ver documento"
    },
    resume: {
      label: "Currículo profissional",
      title: "Currículo direto para recrutadores e clientes.",
      description:
        "Experiência, formação, projetos e certificações em PDF ou no navegador.",
      download: "Baixar PDF",
      browser: "Ver no navegador"
    },
    contact: {
      label: "Contato",
      title: "Vamos conversar sobre sistemas, automação e dados?",
      description:
        "Para um contato direto, envie um e-mail. O LinkedIn também está disponível para oportunidades e conversas profissionais, enquanto o GitHub reúne projetos e decisões técnicas.",
      email: {
        title: "E-mail direto",
        shortLabel: "E-mail",
        description: "Abrir no seu aplicativo de e-mail",
        copy: "Copiar",
        copied: "Copiado",
        copyAria: "Copiar endereço de e-mail"
      },
      links: [
        ["LinkedIn", "Contato profissional e oportunidades"],
        ["GitHub", "Código, projetos e documentação"],
        ["Currículo", "Baixar versão em PDF"]
      ] as const
    },
    footer: {
      role: "Analista de Sistemas e Desenvolvedor",
      location: "© 2026 · Cuiabá, Mato Grosso",
      backTop: "Voltar ao topo"
    }
  },
  en: {
    documentTitle: "Leonardo Farias Martins | Systems Analyst and Developer",
    metaDescription:
      "Portfolio of Leonardo Farias Martins | Systems Analyst and Developer experienced in software, automation, web development, ERP and data.",
    skipLink: "Skip to content",
    brandRole: "Systems Analyst and Developer",
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
      close: "Close accessibility panel",
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
      signatureRole: "Systems Analyst and Developer",
      eyebrow: "Professional portfolio · Systems, data and automation",
      title: {
        lead: "I turn processes and data into",
        highlight: "useful systems."
      },
      description:
        "Computer Science graduate with experience in systems, ERP, data, automation and web development. I use software to organize processes and reduce manual work.",
      actions: {
        projects: "View projects",
        resume: "Resume"
      }
    },
    portrait: {
      aria: "Professional profile of Leonardo Farias Martins",
      alt: "Professional portrait of Leonardo Farias Martins",
      role: "Systems Analyst and Developer",
      location: "Cuiabá · Mato Grosso",
      name: "Leonardo Farias Martins",
      reach: "Brazil · International remote",
    },
    experience: {
      intro: {
        label: "Experience",
        title: "Experience in systems and operations.",
        description: "Professional work and supervised practice with processes, data and software."
      },
      company: {
        logoAlt: "Kiminorte logo",
        period: "August 2023 to present",
        title: "Systems Analyst and Developer",
        place: "Kiminorte · Várzea Grande, Mato Grosso",
        link: "Visit the company",
        description:
          "At Kiminorte, I connect administrative operations with technology through ERP, data, documentation, automation and web development.",
        points: [
          ["Systems", "ERP support and process improvement."],
          ["Data", "operational controls and decision support."],
          ["Automation", "scripts that reduce manual work."],
          ["Web", "catalog, content and commercial journey."]
        ] as const
      },
      internships: {
        eyebrow: "Supervised academic experience",
        title: "Mandatory Supervised Internships",
        note: "Academic documentation by stage",
        mainActivities: "Main activities",
        viewForm: "View evaluation form",
        items: [
          {
            area: "Academic management",
            title: "StageFlow",
            description: "System for tracking internships, hours, activities and reports.",
            activity:
              "Process mapping, database design and interfaces.",
            file: "assets/internships/stageflow-acompanhamento.pdf"
          },
          {
            area: "IT operations",
            title: "NexusOps",
            description: "Dashboard for IT projects, indicators and priorities.",
            activity:
              "Requirements, API integration, data structure and dashboards.",
            file: "assets/internships/nexusops-acompanhamento.pdf"
          }
        ]
      }
    },
    projects: {
      intro: {
        label: "Projects",
        title: "Projects built around real problems.",
        description: "Personal, academic and commercial solutions focused on clarity, usefulness and simple maintenance."
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
        about: "About the project",
        close: "Close project details"
      },
      previewSteps: {
        DevAtlas: ["Areas", "Roadmaps", "Compare", "Projects"],
        ArcadeX: ["Library", "Ranking", "Store", "Achievements"],
        Organize: ["Dry-run", "Extensions", "Folders", "Conflicts"],
        TerraVex: ["Map", "Indicators", "CambioX", "History"],
        NexusOps: ["Dashboard", "Projects", "Alerts", "APIs"],
        StageFlow: ["Interns", "Hours", "Reports", "Supervisors"],
        Kiminorte: ["Company", "Catalog", "Products", "Quote"]
      },
      organize: {
        aria: "Preview of Organize sorting files from the command line",
        title: "organize: dry-run",
        folder: "After dry-run",
        folders: ["docs/report.pdf", "images/portrait.png", "archives/backup.zip", "code/app.py"],
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
        title: "Bachelor's Degree in Computer Science.",
        description:
          "Degree completed with a 9.96 coefficient and a score of 10 on the final project."
      },
      photoAlt: "Leonardo holding the official record after presenting his undergraduate final project",
      logoAlt: "University of Cuiabá, UNIC logo",
      period: "August 2022 to June 2026",
      degree: "Bachelor's Degree in Computer Science",
      institution: "UNIC, University of Cuiabá",
      achievementTitle: "Top score in the final project",
      achievementDescription: "Final project approved with a score of 10.",
      metrics: [
        ["9.96", "Academic performance coefficient"],
        ["42", "Completed courses"],
        ["10", "Final project grade"]
      ] as const
    },
    certificates: {
      intro: {
        label: "Certificates, courses & events",
        title: "Certificates and courses.",
        description: "Credentials in development, data, AI, security and networking."
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
      viewCertificate: "View certificate",
      close: "Close certificate"
    },
    extension: {
      intro: {
        label: "University extension & community impact",
        title: "University extension projects.",
        description: "Technology applied to education, culture and local businesses."
      },
      viewDocument: "View document"
    },
    resume: {
      label: "Professional resume",
      title: "A focused resume for recruiters and clients.",
      description:
        "Experience, education, projects and certifications in PDF or browser format.",
      download: "Download PDF",
      browser: "Open in browser"
    },
    contact: {
      label: "Contact",
      title: "Shall we talk about systems, automation and data?",
      description:
        "For a direct conversation, send me an email. LinkedIn is also available for opportunities and professional conversations, while GitHub shows projects and technical decisions.",
      email: {
        title: "Direct email",
        shortLabel: "Email",
        description: "Open in your email application",
        copy: "Copy",
        copied: "Copied",
        copyAria: "Copy email address"
      },
      links: [
        ["LinkedIn", "Professional contact and opportunities"],
        ["GitHub", "Code, projects and documentation"],
        ["Resume", "Download the PDF version"]
      ] as const
    },
    footer: {
      role: "Systems Analyst and Developer",
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
      "Trilingual guide for comparing technology fields and building a study path.",
    detail:
      "DevAtlas brings fields, tools, roadmaps and project ideas together in Portuguese, English and Spanish. I built it with Next.js, React and TypeScript, prioritizing clear navigation and simple maintenance.",
    category: "Product"
  },
  ArcadeX: {
    kicker: "Game platform with progression",
    status: "Completed",
    role: "Product, front-end and business rules",
    description:
      "Platform with 18 games, ranking, progression, missions, achievements and a store.",
    detail:
      "ArcadeX connects 18 games to a shared progression, ranking, mission and achievement system. It uses Next.js, TypeScript and Supabase for authentication, data and player rules.",
    category: "Product"
  },
  Organize: {
    kicker: "Safe file automation",
    status: "Completed",
    role: "Concept and development",
    description:
      "Python CLI that organizes files after a safe preview.",
    detail:
      "Organize classifies files, previews changes in dry-run mode and prevents overwrites when names conflict. It is a small automation for work and download folders.",
    category: "Automation"
  },
  TerraVex: {
    kicker: "Economic data in context",
    status: "Completed",
    role: "Data, interface and integration",
    description: "Interactive country map with economic indicators and currency conversion.",
    detail:
      "TerraVex combines a map, economic indicators and CambioX in one interface. It uses JavaScript, Leaflet, Chart.js and external APIs, including connection error handling.",
    category: "Data"
  },
  NexusOps: {
    kicker: "Central view of IT operations",
    status: "Supervised Internship",
    role: "Analysis, UX and development",
    description:
      "Dashboard for IT projects, indicators, alerts and priorities.",
    detail:
      "I developed NexusOps during a supervised internship to centralize IT projects, priorities, indicators and alerts. The React and Vite interface focuses on quick reading and operational follow-up.",
    category: "Systems"
  },
  StageFlow: {
    kicker: "Internship tracking",
    status: "Supervised Internship",
    role: "Requirements, product and development",
    description:
      "System for tracking internships, hours, activities and reports.",
    detail:
      "StageFlow organizes people, hours, activities and documents without isolated controls. It was built with HTML, CSS and JavaScript after mapping the institutional workflow.",
    category: "Academic"
  },
  Kiminorte: {
    kicker: "Commercial product in operation",
    status: "Completed",
    role: "Analysis, development and maintenance",
    description:
      "Corporate website with a catalog and direct quotation flow.",
    detail:
      "Kiminorte's website presents the company, organizes the catalog and directs quotation requests. I built the responsive interface with HTML, CSS and JavaScript for straightforward daily maintenance.",
    category: "Commercial"
  }
};

const certificateEnglish: Partial<Record<Certificate["title"], Partial<Certificate>>> = {
  "IBM SkillsBuild Data Analytics Certificate": { category: "Data" },
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
  "SEMINFO, Semana da Informática": {
    title: "SEMINFO, Computer Science Week",
    issuer: "UNIC",
    detail: "Participation on April 24 and 25, 2024 · 40 hours."
  },
  "Semana de Cursos, Encontro 1": {
    title: "Course Week, Session 1",
    issuer: "UNIC · Sep 19, 2022",
    detail: "Academic lecture cycle · 5 hours."
  },
  "Semana de Cursos, Encontro 2": {
    title: "Course Week, Session 2",
    issuer: "UNIC · Sep 20, 2022",
    detail: "Academic lecture cycle · 5 hours."
  },
  "Semana de Cursos, Encontro 3": {
    title: "Course Week, Session 3",
    issuer: "UNIC · Sep 21, 2022",
    detail: "Academic lecture cycle · 5 hours."
  },
  "Semana de Cursos, Encontro 4": {
    title: "Course Week, Session 4",
    issuer: "UNIC · Sep 22, 2022",
    detail: "Academic lecture cycle · 5 hours."
  },
  "Semana de Cursos, Encontro 5": {
    title: "Course Week, Session 5",
    issuer: "UNIC · Sep 23, 2022",
    detail: "Academic lecture cycle · 5 hours."
  },
  "Estudos Contemporâneos, Encontro 1": {
    title: "Contemporary Studies, Session 1",
    issuer: "UNIC · Nov 14, 2022",
    detail: "Academic lecture cycle · 3 hours."
  },
  "Estudos Contemporâneos, Encontro 2": {
    title: "Contemporary Studies, Session 2",
    issuer: "UNIC · Nov 16, 2022",
    detail: "Academic lecture cycle · 3 hours."
  },
  "Estudos Contemporâneos, Encontro 3": {
    title: "Contemporary Studies, Session 3",
    issuer: "UNIC · Nov 17, 2022",
    detail: "Academic lecture cycle · 3 hours."
  },
  "Estudos Contemporâneos, Encontro 4": {
    title: "Contemporary Studies, Session 4",
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
    period: "August to November 2023",
    description:
      "Developed a page to promote schedules, artists and information for the Multicultural Festival of Northeastern Art.",
    tags: ["Web platform", "Culture"]
  },
  "Inovação e Empreendedorismo": {
    title: "Innovation and Entrepreneurship",
    period: "August to September 2024",
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
  const months: Record<string, string> = {
    Fev: "Feb",
    Abr: "Apr",
    Mai: "May",
    Ago: "Aug",
    Set: "Sep",
    Out: "Oct",
    Dez: "Dec"
  };

  return certificates.map((certificate) => {
    const [month, ...dateParts] = certificate.date.split(" ");
    return {
      ...certificate,
      ...certificateEnglish[certificate.title],
      date: [months[month] ?? month, ...dateParts].join(" ")
    };
  });
}

export function localizeEvents(events: EventEntry[], language: Language): EventEntry[] {
  if (language === "pt") return events;
  return events.map((event) => ({ ...event, ...eventEnglish[event.title] }));
}

export function localizeExtensions(extensions: ExtensionEntry[], language: Language): ExtensionEntry[] {
  if (language === "pt") return extensions;
  return extensions.map((extension) => ({ ...extension, ...extensionEnglish[extension.title] }));
}

