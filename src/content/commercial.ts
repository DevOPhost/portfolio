import type { PageId } from "../routes";

export type CommercialPageId = PageId;
export type CommercialLanguage = "pt" | "en";

export type ActionCopy = {
  label: string;
  ariaLabel: string;
};

export type IntroCopy = {
  eyebrow: string;
  title: string;
  description: string;
};

export type PageMetaCopy = {
  title: string;
  description: string;
};

export type ServiceId =
  | "websites"
  | "web-systems"
  | "mobile"
  | "automation"
  | "security";

export type ServiceCopy = {
  id: ServiceId;
  title: string;
  summary: string;
  problem: string;
  solution: string;
  deliverables: string[];
  cta: ActionCopy;
};

type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

type CareerSectionId =
  | "experience"
  | "education"
  | "internships"
  | "certifications"
  | "extension"
  | "resume";

export type CommercialContent = {
  global: {
    brandRole: string;
    navigationLabel: string;
    navigation: Array<{ id: CommercialPageId; label: string }>;
    headerCta: ActionCopy;
  };
  home: {
    meta: PageMetaCopy;
    hero: IntroCopy & {
      primaryAction: ActionCopy;
      projectsAction: ActionCopy;
      githubAction: ActionCopy;
      profileAction: ActionCopy;
    };
    servicesPreview: IntroCopy & {
      items: Array<{ id: ServiceId; title: string; description: string }>;
      action: ActionCopy;
    };
    featuredProjects: IntroCopy & {
      items: Array<{ name: string; proof: string }>;
      action: ActionCopy;
    };
    experienceProof: IntroCopy & {
      points: string[];
      action: ActionCopy;
    };
    finalCta: {
      eyebrow: string;
      title: string;
      description: string;
      whatsappAction: ActionCopy;
      emailAction: ActionCopy;
    };
  };
  services: {
    meta: PageMetaCopy;
    intro: IntroCopy;
    labels: {
      problem: string;
      solution: string;
      deliverables: string;
    };
    items: ServiceCopy[];
    process: IntroCopy & { steps: ProcessStep[] };
    securityScope: { title: string; description: string };
    finalCta: { title: string; description: string; action: ActionCopy };
  };
  projects: {
    meta: PageMetaCopy;
    intro: IntroCopy;
    realInterfaces: { label: string; description: string };
    allRepositoriesAction: ActionCopy;
    finalCta: { title: string; description: string; action: ActionCopy };
  };
  about: {
    meta: PageMetaCopy;
    intro: IntroCopy;
    profile: {
      title: string;
      paragraphs: string[];
      facts: Array<{ label: string; value: string }>;
    };
    method: IntroCopy & { steps: ProcessStep[] };
    differentiators: IntroCopy & {
      items: Array<{ title: string; description: string }>;
    };
    stack: IntroCopy & {
      groups: Array<{ title: string; items: string[] }>;
    };
    careerAction: ActionCopy;
  };
  career: {
    meta: PageMetaCopy;
    intro: IntroCopy;
    sectionNavigationLabel: string;
    sections: Array<{
      id: CareerSectionId;
      label: string;
      title: string;
      description: string;
    }>;
    resumeAction: ActionCopy;
    browserResumeAction: ActionCopy;
  };
  contact: {
    meta: PageMetaCopy;
    intro: IntroCopy;
    clients: {
      eyebrow: string;
      title: string;
      description: string;
      guidance: string;
      whatsappAction: ActionCopy;
      emailAction: ActionCopy;
    };
    recruiters: {
      eyebrow: string;
      title: string;
      description: string;
      linkedinAction: ActionCopy;
      githubAction: ActionCopy;
      resumeAction: ActionCopy;
    };
  };
};

const ptGlobal: CommercialContent["global"] = {
  brandRole: "Analista de Sistemas e Desenvolvedor",
  navigationLabel: "Navegação principal",
  navigation: [
    { id: "inicio", label: "Início" },
    { id: "servicos", label: "Serviços" },
    { id: "projetos", label: "Projetos" },
    { id: "sobre", label: "Sobre" },
    { id: "carreira", label: "Carreira" },
    { id: "contato", label: "Contato" }
  ],
  headerCta: {
    label: "Solicitar projeto",
    ariaLabel: "Solicitar um projeto pelo WhatsApp, abre em nova aba"
  }
};

const ptHome: CommercialContent["home"] = {
  meta: {
    title: "Leonardo Farias Martins | Produtos digitais e automação",
    description:
      "Analista de Sistemas e Desenvolvedor para sites, sistemas web, experiências mobile, automação e segurança de aplicações."
  },
  hero: {
    eyebrow: "Análise de sistemas e desenvolvimento",
    title: "Crio sites, sistemas, aplicativos mobile e automações com segurança em cada decisão.",
    description:
      "Transformo processos manuais em produtos digitais claros, responsivos e preparados para crescer.",
    primaryAction: {
      label: "Conversar sobre um projeto",
      ariaLabel: "Conversar com Leonardo pelo WhatsApp sobre um projeto"
    },
    projectsAction: {
      label: "Conhecer projetos",
      ariaLabel: "Abrir a página de projetos"
    },
    githubAction: {
      label: "GitHub",
      ariaLabel: "Abrir o perfil de Leonardo no GitHub, em uma nova aba"
    },
    profileAction: {
      label: "Ver perfil profissional",
      ariaLabel: "Abrir a página sobre Leonardo"
    }
  },
  servicesPreview: {
    eyebrow: "Como posso ajudar",
    title: "O que eu projeto e entrego.",
    description:
      "Sites, sistemas e automações definidos pela rotina, pelo público e pelo objetivo do negócio.",
    items: [
      {
        id: "websites",
        title: "Sites e experiências digitais",
        description: "Sites responsivos que explicam a oferta e facilitam o contato."
      },
      {
        id: "web-systems",
        title: "Sistemas e aplicações web",
        description: "Processos, dados e regras de negócio em uma única interface."
      },
      {
        id: "mobile",
        title: "Experiências mobile",
        description: "Fluxos responsivos para tarefas realizadas no celular."
      },
      {
        id: "automation",
        title: "Automação e integrações",
        description: "Integrações e scripts para reduzir tarefas manuais."
      },
      {
        id: "security",
        title: "Segurança de aplicações",
        description: "Revisão dos controles essenciais antes da publicação."
      }
    ],
    action: {
      label: "Conhecer os serviços",
      ariaLabel: "Abrir a página de serviços"
    }
  },
  featuredProjects: {
    eyebrow: "Projetos em destaque",
    title: "Projetos construídos para uso real.",
    description: "Telas reais de projetos comerciais, autorais e acadêmicos.",
    items: [
      {
        name: "Kiminorte",
        proof: "Site comercial em operação, com catálogo e jornada de orçamento."
      },
      {
        name: "ArcadeX",
        proof: "Produto autoral com jogos, progressão, ranking e recursos administrativos."
      },
      {
        name: "NexusOps",
        proof: "Dashboard para organizar projetos e indicadores de uma operação de TI."
      }
    ],
    action: {
      label: "Explorar todos os projetos",
      ariaLabel: "Abrir a página com todos os projetos"
    }
  },
  experienceProof: {
    eyebrow: "Experiência aplicada",
    title: "Tecnologia aplicada à rotina da empresa.",
    description:
      "Desde 2023, trabalho na Kiminorte com ERP, dados, processos, automação e desenvolvimento web.",
    points: [
      "Análise e melhoria de fluxos internos",
      "ERP, dados e apoio à decisão",
      "Automação de tarefas recorrentes",
      "Desenvolvimento e manutenção web"
    ],
    action: {
      label: "Conhecer minha trajetória",
      ariaLabel: "Abrir a página de carreira"
    }
  },
  finalCta: {
    eyebrow: "Próximo projeto",
    title: "Quer organizar uma ideia ou melhorar uma operação?",
    description:
      "Conte o que precisa funcionar melhor. A partir disso, definimos o próximo passo.",
    whatsappAction: {
      label: "Solicitar projeto",
      ariaLabel: "Solicitar um projeto pelo WhatsApp"
    },
    emailAction: {
      label: "Enviar e-mail",
      ariaLabel: "Enviar um e-mail sobre um projeto"
    }
  }
};

const ptServices: CommercialContent["services"] = {
  meta: {
    title: "Serviços | Leonardo Farias Martins",
    description:
      "Sites, sistemas web, experiências mobile, automação, integrações e revisão de segurança de aplicações."
  },
  intro: {
    eyebrow: "Serviços",
    title: "Sites, sistemas e automações para necessidades reais.",
    description:
      "Cada projeto começa pelo que precisa funcionar melhor."
  },
  labels: {
    problem: "Quando faz sentido",
    solution: "Como trabalho",
    deliverables: "Pode incluir"
  },
  items: [
    {
      id: "websites",
      title: "Sites e experiências digitais",
      summary: "Sites responsivos que apresentam a empresa e facilitam o contato.",
      problem:
        "Um site confuso ou ruim no celular dificulta a compreensão da oferta e reduz contatos.",
      solution:
        "Sites institucionais, catálogos e landing pages organizados em torno do conteúdo e da ação principal.",
      deliverables: [
        "Arquitetura de conteúdo",
        "Interface responsiva",
        "Integrações de contato",
        "Publicação e documentação"
      ],
      cta: {
        label: "Melhorar minha presença digital",
        ariaLabel: "Conversar pelo WhatsApp sobre um site"
      }
    },
    {
      id: "web-systems",
      title: "Sistemas e aplicações web",
      summary: "Processos e dados reunidos em uma interface de uso diário.",
      problem:
        "Planilhas e controles isolados aumentam o retrabalho e escondem o andamento da operação.",
      solution:
        "Sistemas web alinhados ao processo real, com dados, responsabilidades e ações em um só lugar.",
      deliverables: [
        "Levantamento do processo",
        "Interface e regras de negócio",
        "Estruturação de dados",
        "Integrações e documentação"
      ],
      cta: {
        label: "Conversar sobre um sistema",
        ariaLabel: "Conversar pelo WhatsApp sobre um sistema web"
      }
    },
    {
      id: "mobile",
      title: "Experiências mobile e responsivas",
      summary: "Fluxos pensados para tarefas feitas no celular.",
      problem:
        "Interfaces criadas apenas para desktop dificultam tarefas realizadas em movimento.",
      solution:
        "Jornadas responsivas projetadas conforme o contexto e o escopo do produto.",
      deliverables: [
        "Jornada mobile",
        "Protótipo e interface",
        "Responsividade",
        "Integrações necessárias"
      ],
      cta: {
        label: "Avaliar uma ideia mobile",
        ariaLabel: "Conversar pelo WhatsApp sobre uma solução mobile"
      }
    },
    {
      id: "automation",
      title: "Automação e integrações",
      summary: "Menos repetição e mais controle sobre a rotina.",
      problem:
        "Tarefas manuais consomem tempo, duplicam informações e aumentam o risco de erro.",
      solution:
        "Scripts e integrações com validações, registros e acompanhamento claro do resultado.",
      deliverables: [
        "Mapeamento da rotina",
        "Automação ou integração",
        "Validações e registros",
        "Documentação de uso"
      ],
      cta: {
        label: "Automatizar uma rotina",
        ariaLabel: "Conversar pelo WhatsApp sobre automação"
      }
    },
    {
      id: "security",
      title: "Segurança de aplicações",
      summary: "Revisão dos controles essenciais antes da publicação.",
      problem:
        "Falhas em permissões, APIs e configurações podem expor dados sem sinais claros para o negócio.",
      solution:
        "Revisão de autenticação, autorização, dados e APIs, com prioridades de correção.",
      deliverables: [
        "Levantamento da superfície exposta",
        "Revisão de controles acordados",
        "Lista priorizada de riscos",
        "Plano de correção"
      ],
      cta: {
        label: "Solicitar uma análise",
        ariaLabel: "Conversar pelo WhatsApp sobre segurança de aplicações"
      }
    }
  ],
  process: {
    eyebrow: "Forma de trabalho",
    title: "Do primeiro contexto à entrega.",
    description:
      "Você acompanha as decisões, o andamento e os próximos passos.",
    steps: [
      {
        number: "01",
        title: "Entender",
        description: "Contexto, público, rotina atual e resultado esperado."
      },
      {
        number: "02",
        title: "Definir",
        description: "Escopo, prioridades, dependências e critérios de entrega."
      },
      {
        number: "03",
        title: "Construir",
        description: "Implementação com validações curtas e decisões documentadas."
      },
      {
        number: "04",
        title: "Entregar",
        description: "Publicação, orientação de uso e próximos passos claros."
      }
    ]
  },
  securityScope: {
    title: "Segurança com escopo claro.",
    description:
      "A revisão cobre os controles acordados e resulta em recomendações priorizadas. Testes especializados, auditorias formais e requisitos regulatórios são avaliados separadamente."
  },
  finalCta: {
    title: "Ainda não sabe qual formato atende melhor ao projeto?",
    description:
      "Compartilhe o contexto inicial. A primeira conversa ajuda a organizar a necessidade e o próximo passo.",
    action: {
      label: "Conversar sobre um projeto",
      ariaLabel: "Conversar com Leonardo pelo WhatsApp sobre um projeto"
    }
  }
};

const ptProjects: CommercialContent["projects"] = {
  meta: {
    title: "Projetos | Leonardo Farias Martins",
    description:
      "Showcases de projetos comerciais, autorais e acadêmicos com interfaces e fluxos reais."
  },
  intro: {
    eyebrow: "Projetos",
    title: "Projetos construídos para uso real.",
    description:
      "Sites, sistemas e ferramentas desenvolvidos em contextos comerciais, autorais e acadêmicos."
  },
  realInterfaces: {
    label: "Interfaces e fluxos reais",
    description:
      "As prévias usam telas dos próprios projetos e mostram cada produto em uso."
  },
  allRepositoriesAction: {
    label: "Ver todos os repositórios",
    ariaLabel: "Abrir o perfil de Leonardo no GitHub em nova aba"
  },
  finalCta: {
    title: "Procura uma solução com um contexto parecido?",
    description:
      "Conte o problema e o estágio atual do projeto para avaliarmos um caminho possível.",
    action: {
      label: "Falar sobre um projeto",
      ariaLabel: "Conversar pelo WhatsApp sobre um projeto"
    }
  }
};

const ptAbout: CommercialContent["about"] = {
  meta: {
    title: "Sobre | Leonardo Farias Martins",
    description:
      "Perfil, forma de trabalho, tecnologias e diferenciais de Leonardo Farias Martins."
  },
  intro: {
    eyebrow: "Sobre",
    title: "Sou Leonardo. Analiso processos e desenvolvo sistemas.",
    description:
      "Trabalho com software, dados e automação a partir do que acontece na operação."
  },
  profile: {
    title: "Analista de Sistemas e Desenvolvedor em Cuiabá.",
    paragraphs: [
      "Sou bacharel em Ciência da Computação pela UNIC e trabalho com sistemas, dados, automação e desenvolvimento web.",
      "Minha experiência com operação e ERP ajuda a entender o que acontece antes e depois da interface. Isso orienta decisões mais simples de usar e manter."
    ],
    facts: [
      { label: "Localização", value: "Cuiabá, Mato Grosso, Brasil" },
      { label: "Formação", value: "Bacharelado em Ciência da Computação" },
      { label: "Idiomas", value: "Português nativo e Inglês avançado C1+" },
      { label: "Alcance", value: "Brasil e trabalho remoto internacional" }
    ]
  },
  method: {
    eyebrow: "Processo",
    title: "Trabalho direto, com etapas visíveis.",
    description: "Cada etapa resolve uma decisão antes de avançar.",
    steps: [
      {
        number: "01",
        title: "Entender o contexto",
        description: "Objetivos, pessoas envolvidas, processo atual e limitações."
      },
      {
        number: "02",
        title: "Definir prioridades",
        description: "Escopo viável, riscos, dependências e sequência de entrega."
      },
      {
        number: "03",
        title: "Construir e validar",
        description: "Implementação com pontos curtos de revisão e feedback."
      },
      {
        number: "04",
        title: "Entregar com clareza",
        description: "Documentação, orientação de uso e continuidade do produto."
      }
    ]
  },
  differentiators: {
    eyebrow: "No trabalho",
    title: "O que orienta minhas decisões.",
    description:
      "Contexto, uso e manutenção têm o mesmo peso que o código.",
    items: [
      {
        title: "Entender a operação",
        description: "Mapeio a rotina, as pessoas envolvidas e os pontos que geram retrabalho."
      },
      {
        title: "Simplificar o uso",
        description: "A interface e a tecnologia precisam facilitar o trabalho diário."
      },
      {
        title: "Entregar com contexto",
        description: "Decisões, limites e documentação seguem junto com o produto."
      }
    ]
  },
  stack: {
    eyebrow: "Tecnologias e ferramentas",
    title: "Tecnologias usadas na prática.",
    description:
      "Ferramentas presentes no trabalho e nos projetos desta página.",
    groups: [
      {
        title: "Desenvolvimento",
        items: [
          "JavaScript",
          "TypeScript",
          "Python",
          "HTML5",
          "CSS3",
          "React",
          "Next.js",
          "Node.js"
        ]
      },
      {
        title: "Dados e integrações",
        items: ["SQL", "PostgreSQL", "MySQL", "Supabase", "REST APIs"]
      },
      {
        title: "Ferramentas",
        items: ["Git", "GitHub", "Postman", "Vite", "Excel", "ERP"]
      }
    ]
  },
  careerAction: {
    label: "Ver experiência e formação",
    ariaLabel: "Abrir a página de carreira"
  }
};

const ptCareer: CommercialContent["career"] = {
  meta: {
    title: "Carreira | Leonardo Farias Martins",
    description:
      "Experiência profissional, formação, estágios, TCC, certificados, extensão e currículo."
  },
  intro: {
    eyebrow: "Carreira",
    title: "Onde trabalhei, o que construí e como me formei.",
    description:
      "Experiência profissional, formação e documentos em uma trajetória direta de consultar."
  },
  sectionNavigationLabel: "Navegar pelas áreas da carreira",
  sections: [
    {
      id: "experience",
      label: "Experiência",
      title: "Atuação profissional na Kiminorte",
      description:
        "Análise de sistemas, apoio ao ERP, dados operacionais, documentação, automação e desenvolvimento web desde 2023."
    },
    {
      id: "education",
      label: "Formação e TCC",
      title: "Bacharelado em Ciência da Computação",
      description:
        "Graduação concluída na UNIC, com coeficiente 9,96 e nota 10 no Trabalho de Conclusão de Curso."
    },
    {
      id: "internships",
      label: "Estágios",
      title: "Prática supervisionada",
      description:
        "StageFlow e NexusOps documentam a aplicação de requisitos, dados e interfaces em contextos acadêmicos."
    },
    {
      id: "certifications",
      label: "Certificações e eventos",
      title: "Formação complementar documentada",
      description:
        "Cursos, credenciais verificáveis e participação em atividades acadêmicas."
    },
    {
      id: "extension",
      label: "Extensão",
      title: "Tecnologia aplicada à comunidade",
      description:
        "Projetos universitários ligados a educação tecnológica, cultura e negócios locais."
    },
    {
      id: "resume",
      label: "Currículo e documentos",
      title: "Materiais para análise profissional",
      description:
        "Currículo em PDF, versão no navegador e documentos acadêmicos organizados."
    }
  ],
  resumeAction: {
    label: "Baixar currículo",
    ariaLabel: "Baixar o currículo de Leonardo em PDF"
  },
  browserResumeAction: {
    label: "Ver currículo no navegador",
    ariaLabel: "Abrir o currículo de Leonardo no navegador"
  }
};

const ptContact: CommercialContent["contact"] = {
  meta: {
    title: "Contato | Leonardo Farias Martins",
    description:
      "Canais diretos para projetos, parcerias, oportunidades profissionais e recrutamento."
  },
  intro: {
    eyebrow: "Contato",
    title: "Escolha o caminho certo para a conversa.",
    description: "Canais diretos para projetos, parcerias e oportunidades profissionais."
  },
  clients: {
    eyebrow: "Para clientes",
    title: "Precisa criar ou melhorar um produto digital?",
    description:
      "Envie um resumo do projeto, do problema atual ou da rotina que deseja melhorar. A conversa inicial serve para entender o contexto e avaliar o próximo passo.",
    guidance:
      "Se possível, inclua o objetivo, o prazo desejado e o que já existe hoje.",
    whatsappAction: {
      label: "Conversar pelo WhatsApp",
      ariaLabel: "Conversar com Leonardo pelo WhatsApp sobre um projeto"
    },
    emailAction: {
      label: "Enviar e-mail",
      ariaLabel: "Enviar um e-mail para Leonardo sobre um projeto"
    }
  },
  recruiters: {
    eyebrow: "Para recrutadores",
    title: "Quer conhecer meu perfil profissional?",
    description:
      "Experiência, código e currículo organizados para processos seletivos e oportunidades profissionais.",
    linkedinAction: {
      label: "Ver LinkedIn",
      ariaLabel: "Abrir o perfil de Leonardo no LinkedIn em nova aba"
    },
    githubAction: {
      label: "Explorar GitHub",
      ariaLabel: "Abrir o perfil de Leonardo no GitHub em nova aba"
    },
    resumeAction: {
      label: "Baixar currículo",
      ariaLabel: "Baixar o currículo de Leonardo em PDF"
    }
  }
};

const enGlobal: CommercialContent["global"] = {
  brandRole: "Systems Analyst and Developer",
  navigationLabel: "Primary navigation",
  navigation: [
    { id: "inicio", label: "Home" },
    { id: "servicos", label: "Services" },
    { id: "projetos", label: "Projects" },
    { id: "sobre", label: "About" },
    { id: "carreira", label: "Career" },
    { id: "contato", label: "Contact" }
  ],
  headerCta: {
    label: "Start a project",
    ariaLabel: "Start a project through WhatsApp, opens in a new tab"
  }
};

const enHome: CommercialContent["home"] = {
  meta: {
    title: "Leonardo Farias Martins | Digital products and automation",
    description:
      "Systems Analyst and Developer for websites, web systems, mobile experiences, automation and application security."
  },
  hero: {
    eyebrow: "Systems analysis and development",
    title: "I build websites, systems, mobile apps and automations with security in every decision.",
    description:
      "I turn manual workflows into clear, responsive digital products designed to grow.",
    primaryAction: {
      label: "Discuss a project",
      ariaLabel: "Discuss a project with Leonardo through WhatsApp"
    },
    projectsAction: {
      label: "Explore projects",
      ariaLabel: "Open the projects page"
    },
    githubAction: {
      label: "GitHub",
      ariaLabel: "Open Leonardo's GitHub profile in a new tab"
    },
    profileAction: {
      label: "View professional profile",
      ariaLabel: "Open the page about Leonardo"
    }
  },
  servicesPreview: {
    eyebrow: "How I can help",
    title: "What I design and deliver.",
    description:
      "Websites, systems and automations shaped by the workflow, audience and business goal.",
    items: [
      {
        id: "websites",
        title: "Websites and digital experiences",
        description:
          "Responsive websites that explain the offer and make contact easy."
      },
      {
        id: "web-systems",
        title: "Web systems and applications",
        description: "Processes, data and business rules in one interface."
      },
      {
        id: "mobile",
        title: "Mobile experiences",
        description: "Responsive workflows for tasks completed on a phone."
      },
      {
        id: "automation",
        title: "Automation and integrations",
        description: "Integrations and scripts that reduce manual work."
      },
      {
        id: "security",
        title: "Application security",
        description: "Review of essential controls before launch."
      }
    ],
    action: {
      label: "Explore services",
      ariaLabel: "Open the services page"
    }
  },
  featuredProjects: {
    eyebrow: "Selected projects",
    title: "Projects built for real use.",
    description:
      "Real screens from commercial, personal and academic projects.",
    items: [
      {
        name: "Kiminorte",
        proof: "Live commercial website with a catalog and quotation journey."
      },
      {
        name: "ArcadeX",
        proof: "Personal product featuring games, progression, rankings and administrative tools."
      },
      {
        name: "NexusOps",
        proof: "Dashboard for organizing projects and indicators in an IT operation."
      }
    ],
    action: {
      label: "Explore all projects",
      ariaLabel: "Open the page with all projects"
    }
  },
  experienceProof: {
    eyebrow: "Applied experience",
    title: "Technology applied to daily operations.",
    description:
      "Since 2023, I have worked at Kiminorte with ERP, data, processes, automation and web development.",
    points: [
      "Analysis and improvement of internal workflows",
      "ERP, data and decision support",
      "Automation of recurring tasks",
      "Web development and maintenance"
    ],
    action: {
      label: "Explore my career",
      ariaLabel: "Open the career page"
    }
  },
  finalCta: {
    eyebrow: "Your next project",
    title: "Want to organize an idea or improve an operation?",
    description:
      "Tell me what needs to work better. From there, we can define the next step.",
    whatsappAction: {
      label: "Start a project",
      ariaLabel: "Start a project through WhatsApp"
    },
    emailAction: {
      label: "Send an email",
      ariaLabel: "Send an email about a project"
    }
  }
};

const enServices: CommercialContent["services"] = {
  meta: {
    title: "Services | Leonardo Farias Martins",
    description:
      "Websites, web systems, mobile experiences, automation, integrations and application security reviews."
  },
  intro: {
    eyebrow: "Services",
    title: "Websites, systems and automation for real needs.",
    description:
      "Every project begins with what needs to work better."
  },
  labels: {
    problem: "When it fits",
    solution: "How I work",
    deliverables: "What it may include"
  },
  items: [
    {
      id: "websites",
      title: "Websites and digital experiences",
      summary: "Responsive websites that present the business and make contact easy.",
      problem:
        "A confusing website or weak mobile experience makes the offer harder to understand and reduces contact.",
      solution:
        "Corporate websites, catalogs and landing pages organized around the content and primary action.",
      deliverables: [
        "Content architecture",
        "Responsive interface",
        "Contact integrations",
        "Publishing and documentation"
      ],
      cta: {
        label: "Improve my digital presence",
        ariaLabel: "Discuss a website through WhatsApp"
      }
    },
    {
      id: "web-systems",
      title: "Web systems and applications",
      summary: "Processes and data brought into one daily-use interface.",
      problem:
        "Disconnected spreadsheets and controls increase rework and hide operational progress.",
      solution:
        "Web systems aligned with the real process, bringing data, responsibilities and actions into one place.",
      deliverables: [
        "Process discovery",
        "Interface and business rules",
        "Data structure",
        "Integrations and documentation"
      ],
      cta: {
        label: "Discuss a web system",
        ariaLabel: "Discuss a web system through WhatsApp"
      }
    },
    {
      id: "mobile",
      title: "Mobile and responsive experiences",
      summary: "Workflows designed for tasks completed on a phone.",
      problem:
        "Desktop-only interfaces make tasks harder to complete while moving.",
      solution:
        "Responsive journeys designed around the product's context and scope.",
      deliverables: [
        "Mobile journey",
        "Prototype and interface",
        "Responsive implementation",
        "Required integrations"
      ],
      cta: {
        label: "Evaluate a mobile idea",
        ariaLabel: "Discuss a mobile solution through WhatsApp"
      }
    },
    {
      id: "automation",
      title: "Automation and integrations",
      summary: "Less repetition and more control over daily work.",
      problem:
        "Manual tasks consume time, duplicate information and increase the risk of error.",
      solution:
        "Scripts and integrations with validation, records and clear result tracking.",
      deliverables: [
        "Workflow mapping",
        "Automation or integration",
        "Validation and records",
        "Usage documentation"
      ],
      cta: {
        label: "Automate a workflow",
        ariaLabel: "Discuss automation through WhatsApp"
      }
    },
    {
      id: "security",
      title: "Application security",
      summary: "Review of essential controls before launch.",
      problem:
        "Weak permissions, APIs and configuration can expose data without obvious signs to the business.",
      solution:
        "Review of authentication, authorization, data and APIs, with clear remediation priorities.",
      deliverables: [
        "Exposed surface review",
        "Review of agreed controls",
        "Prioritized risk list",
        "Remediation plan"
      ],
      cta: {
        label: "Request a review",
        ariaLabel: "Discuss application security through WhatsApp"
      }
    }
  ],
  process: {
    eyebrow: "How I work",
    title: "From the first conversation to delivery.",
    description:
      "You can follow decisions, progress and next steps throughout the work.",
    steps: [
      {
        number: "01",
        title: "Understand",
        description: "Context, audience, current workflow and expected outcome."
      },
      {
        number: "02",
        title: "Define",
        description: "Scope, priorities, dependencies and delivery criteria."
      },
      {
        number: "03",
        title: "Build",
        description: "Implementation with short validation cycles and documented decisions."
      },
      {
        number: "04",
        title: "Deliver",
        description: "Publishing, usage guidance and clear next steps."
      }
    ]
  },
  securityScope: {
    title: "Security with a clear scope.",
    description:
      "The review covers the agreed controls and produces prioritized recommendations. Specialized testing, formal audits and regulatory requirements are assessed separately."
  },
  finalCta: {
    title: "Not sure which format best fits your project?",
    description:
      "Share the initial context. The first conversation helps organize the need and define the next step.",
    action: {
      label: "Discuss a project",
      ariaLabel: "Discuss a project with Leonardo through WhatsApp"
    }
  }
};

const enProjects: CommercialContent["projects"] = {
  meta: {
    title: "Projects | Leonardo Farias Martins",
    description:
      "Product showcases for commercial, personal and academic projects using real interfaces and workflows."
  },
  intro: {
    eyebrow: "Projects",
    title: "Projects built for real use.",
    description:
      "Websites, systems and tools developed for commercial, personal and academic contexts."
  },
  realInterfaces: {
    label: "Real interfaces and workflows",
    description:
      "Each preview uses the project's own screens and shows the product in use."
  },
  allRepositoriesAction: {
    label: "View all repositories",
    ariaLabel: "Open Leonardo's GitHub profile in a new tab"
  },
  finalCta: {
    title: "Looking for a solution with a similar context?",
    description:
      "Share the problem and the project's current stage so we can assess a possible direction.",
    action: {
      label: "Discuss a project",
      ariaLabel: "Discuss a project through WhatsApp"
    }
  }
};

const enAbout: CommercialContent["about"] = {
  meta: {
    title: "About | Leonardo Farias Martins",
    description:
      "Profile, working approach, technologies and professional strengths of Leonardo Farias Martins."
  },
  intro: {
    eyebrow: "About",
    title: "I'm Leonardo. I analyze processes and build systems.",
    description:
      "I work with software, data and automation grounded in day-to-day operations."
  },
  profile: {
    title: "Systems Analyst and Developer based in Cuiabá.",
    paragraphs: [
      "I hold a Computer Science degree from UNIC and work with systems, data, automation and web development.",
      "My experience with operations and ERP systems helps me understand what happens before and after the interface. That leads to decisions that are easier to use and maintain."
    ],
    facts: [
      { label: "Location", value: "Cuiabá, Mato Grosso, Brazil" },
      { label: "Education", value: "Bachelor's Degree in Computer Science" },
      { label: "Languages", value: "Native Portuguese and advanced English, C1+" },
      { label: "Reach", value: "Brazil and international remote work" }
    ]
  },
  method: {
    eyebrow: "Process",
    title: "Direct work with visible steps.",
    description: "Each stage resolves one decision before moving forward.",
    steps: [
      {
        number: "01",
        title: "Understand the context",
        description: "Goals, people involved, current process and constraints."
      },
      {
        number: "02",
        title: "Set priorities",
        description: "A viable scope, risks, dependencies and delivery sequence."
      },
      {
        number: "03",
        title: "Build and validate",
        description: "Implementation with short review and feedback points."
      },
      {
        number: "04",
        title: "Deliver with clarity",
        description: "Documentation, usage guidance and product continuity."
      }
    ]
  },
  differentiators: {
    eyebrow: "At work",
    title: "What guides my decisions.",
    description:
      "Context, everyday use and maintenance matter as much as the code.",
    items: [
      {
        title: "Understand the operation",
        description: "I map the workflow, the people involved and the points that create rework."
      },
      {
        title: "Make it easier to use",
        description: "The interface and technology should make everyday work simpler."
      },
      {
        title: "Deliver with context",
        description: "Decisions, constraints and documentation stay with the product."
      }
    ]
  },
  stack: {
    eyebrow: "Technologies and tools",
    title: "Technologies used in practice.",
    description:
      "Tools used in my work and in the projects on this site.",
    groups: [
      {
        title: "Development",
        items: [
          "JavaScript",
          "TypeScript",
          "Python",
          "HTML5",
          "CSS3",
          "React",
          "Next.js",
          "Node.js"
        ]
      },
      {
        title: "Data and integrations",
        items: ["SQL", "PostgreSQL", "MySQL", "Supabase", "REST APIs"]
      },
      {
        title: "Tools",
        items: ["Git", "GitHub", "Postman", "Vite", "Excel", "ERP"]
      }
    ]
  },
  careerAction: {
    label: "View experience and education",
    ariaLabel: "Open the career page"
  }
};

const enCareer: CommercialContent["career"] = {
  meta: {
    title: "Career | Leonardo Farias Martins",
    description:
      "Professional experience, education, internships, final project, certificates, extension work and resume."
  },
  intro: {
    eyebrow: "Career",
    title: "Where I worked, what I built and how I learned.",
    description:
      "Professional experience, education and supporting documents in one clear path."
  },
  sectionNavigationLabel: "Navigate career sections",
  sections: [
    {
      id: "experience",
      label: "Experience",
      title: "Professional work at Kiminorte",
      description:
        "Systems analysis, ERP support, operational data, documentation, automation and web development since 2023."
    },
    {
      id: "education",
      label: "Education and final project",
      title: "Bachelor's Degree in Computer Science",
      description:
        "Degree completed at UNIC with a 9.96 academic performance coefficient and a score of 10 on the final undergraduate project."
    },
    {
      id: "internships",
      label: "Internships",
      title: "Supervised practice",
      description:
        "StageFlow and NexusOps document the application of requirements, data and interface work in academic contexts."
    },
    {
      id: "certifications",
      label: "Certificates and events",
      title: "Documented complementary education",
      description:
        "Courses, verifiable credentials and participation in academic activities."
    },
    {
      id: "extension",
      label: "Extension",
      title: "Technology applied to the community",
      description:
        "University projects connected to technology education, culture and local businesses."
    },
    {
      id: "resume",
      label: "Resume and documents",
      title: "Materials for professional review",
      description:
        "PDF resume, browser version and organized academic documents."
    }
  ],
  resumeAction: {
    label: "Download resume",
    ariaLabel: "Download Leonardo's resume as a PDF"
  },
  browserResumeAction: {
    label: "View resume in browser",
    ariaLabel: "Open Leonardo's resume in the browser"
  }
};

const enContact: CommercialContent["contact"] = {
  meta: {
    title: "Contact | Leonardo Farias Martins",
    description:
      "Direct channels for projects, partnerships, professional opportunities and recruitment."
  },
  intro: {
    eyebrow: "Contact",
    title: "Choose the right path for the conversation.",
    description: "Direct channels for projects, partnerships and professional opportunities."
  },
  clients: {
    eyebrow: "For clients",
    title: "Do you need to build or improve a digital product?",
    description:
      "Share a short overview of the project, the current problem or the workflow you want to improve. The initial conversation helps clarify the context and assess the next step.",
    guidance:
      "If possible, include the goal, desired timeline and what already exists today.",
    whatsappAction: {
      label: "Chat on WhatsApp",
      ariaLabel: "Discuss a project with Leonardo through WhatsApp"
    },
    emailAction: {
      label: "Send an email",
      ariaLabel: "Send Leonardo an email about a project"
    }
  },
  recruiters: {
    eyebrow: "For recruiters",
    title: "Would you like to review my professional profile?",
    description:
      "Experience, code and resume organized for hiring processes and professional opportunities.",
    linkedinAction: {
      label: "View LinkedIn",
      ariaLabel: "Open Leonardo's LinkedIn profile in a new tab"
    },
    githubAction: {
      label: "Explore GitHub",
      ariaLabel: "Open Leonardo's GitHub profile in a new tab"
    },
    resumeAction: {
      label: "Download resume",
      ariaLabel: "Download Leonardo's resume as a PDF"
    }
  }
};

export const commercialContent: Record<CommercialLanguage, CommercialContent> = {
  pt: {
    global: ptGlobal,
    home: ptHome,
    services: ptServices,
    projects: ptProjects,
    about: ptAbout,
    career: ptCareer,
    contact: ptContact
  },
  en: {
    global: enGlobal,
    home: enHome,
    services: enServices,
    projects: enProjects,
    about: enAbout,
    career: enCareer,
    contact: enContact
  }
};

export function getCommercialContent(language: CommercialLanguage) {
  return commercialContent[language];
}
