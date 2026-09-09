// Este arquivo guarda TODO o texto visível do site, em inglês e português,
// separado do código dos componentes. Os componentes só leem "content[language]"
// e nunca têm texto embutido diretamente no JSX.
import type { Language, SiteContent } from "./types";

const LINKEDIN_URL =
  "https://www.linkedin.com/in/pedro-di-mambro-visnardi-064075145";
const GITHUB_URL = "https://github.com/cardboardpirates";
const EMAIL = "visnardi.pedro@gmail.com";
// import.meta.env.BASE_URL vem da configuração "base" do vite.config.ts (/portfolio/).
const RESUME_URL = `${import.meta.env.BASE_URL}resume.pdf`;

const en: SiteContent = {
  meta: {
    title: "Pedro Visnardi: Frontend Developer & UI Specialist",
    description:
      "Pedro Visnardi: Frontend Developer & UI Specialist based in São Paulo, Brazil. 9 years spanning graphic design and frontend development.",
  },
  loading: {
    label: "Portfolio",
    words: ["Design", "Build", "Ship"],
  },
  nav: {
    pages: [
      { id: "cover", label: "Cover" },
      { id: "log", label: "Quest Log" },
      { id: "portfolio", label: "Portfolio" },
      { id: "contact", label: "Contact" },
    ],
  },
  cover: {
    eyebrow: "Character Sheet",
    name: "Pedro Visnardi",
    classIntro: "A",
    classes: ["Designer", "Developer", "Creator", "Hybrid"],
    classOutro: "based in São Paulo, Brazil.",
    tagline:
      "Nine years spanning graphic design and frontend development, designing interfaces and building the code that ships them.",
    portraitAlt: "Pedro Visnardi",
    statsLabel: "Attributes",
    stats: [
      { value: 9, suffix: "+", label: "Years Experience" },
      { value: 4, label: "Employers" },
      { value: 4, label: "Languages Spoken" },
    ],
    proficienciesLabel: "Proficiencies",
    proficiencyGroups: {
      design: "Design",
      development: "Development",
      tool: "Tools",
    },
    proficiencies: [
      { label: "HTML5", category: "development" },
      { label: "CSS3", category: "development" },
      { label: "JavaScript", category: "development" },
      { label: "Responsive Design", category: "development" },
      { label: "UI Development", category: "development" },
      { label: "Mobile First", category: "development" },
      { label: "Git/GitHub", category: "development" },
      { label: "Accessibility", category: "development" },
      { label: "UX", category: "design" },
      { label: "Branding", category: "design" },
      { label: "Information Architecture", category: "design" },
      { label: "Design Systems", category: "design" },
      { label: "Figma", category: "tool" },
      { label: "WordPress", category: "tool" },
      { label: "Adobe Photoshop", category: "tool" },
      { label: "Adobe Illustrator", category: "tool" },
    ],
    languagesLabel: "Languages",
    languages: [
      { label: "Portuguese", tier: "native", tierLabel: "Native" },
      { label: "English", tier: "advanced", tierLabel: "Advanced" },
      { label: "Spanish", tier: "intermediate", tierLabel: "Intermediate" },
      { label: "French", tier: "basic", tierLabel: "Basic" },
    ],
    ctaPrimary: "View Quest Log",
    ctaSecondary: "Send a Raven",
  },
  log: {
    eyebrow: "Quest Log",
    heading: "The path",
    headingItalic: "so far",
    bio: "The story starts in graphic design (branding, visual identity, logos) and evolves into frontend development (HTML5, CSS3, JavaScript, responsive and mobile-first, design systems). Nine years in, the two halves still work as one: owning the visual layer and shipping the code that carries it.",
    questsLabel: "Employment History",
    activeQuestLabel: "Active Quest",
    quests: [
      {
        id: "grupo-take-5",
        guild: "Grupo Take 5",
        role: "Designer Gráfico",
        period: "2025 - present",
        location: "São Paulo, Brazil",
        description: "Graphic design for internal and marketing materials.",
        status: "active",
      },
      {
        id: "puc-campinas",
        guild: "PUC-Campinas",
        role: "Frontend Developer Pleno",
        period: "2021 - 2025",
        location: "Campinas, Brazil",
        description: "Frontend development for institutional web projects.",
        status: "completed",
      },
      {
        id: "visie-padroes-web",
        guild: "Visie Padrões Web",
        role: "Frontend Developer Pleno",
        period: "2018 - 2019",
        description: "Frontend development for corporate web projects.",
        status: "completed",
      },
      {
        id: "elo-criativo",
        guild: "Elo Criativo Design & Web",
        role: "Frontend Developer & Designer Gráfico",
        period: "2013 - 2018",
        description:
          "Frontend development and graphic design for corporate web projects.",
        status: "completed",
      },
    ],
    trainingLabel: "Training",
    incompleteTrainingLabel: "Interrupted",
    training: [
      {
        id: "fmu",
        institution: "FMU",
        program: "Bachelor's in Graphic Design",
        period: "2013 - 2017",
        status: "completed",
      },
      {
        id: "anhembi-morumbi",
        institution: "Universidade Anhembi Morumbi",
        program: "Game Design",
        period: "2009 - 2011",
        status: "incomplete",
      },
    ],
    sealedQuest: {
      eyebrow: "Sealed Quest",
      title: "Not yet unlocked",
      body: "Rather than fill this space with placeholder projects, here's what's real right now: nine years of hybrid design and frontend work, documented on the résumé and LinkedIn.",
      links: [
        { label: "Résumé", href: RESUME_URL, external: true },
        { label: "LinkedIn", href: LINKEDIN_URL, external: true },
        { label: "GitHub", href: GITHUB_URL, external: true },
      ],
    },
  },
  portfolio: {
    eyebrow: "Portfolio",
    heading: "Work,",
    headingItalic: "on display",
    subtext:
      "A living wall of the work. Drift by, or hover a tile to bring it forward.",
    placeholderNote:
      "Real project tiles are on their way. The wall below is showing sample images until then.",
  },
  contact: {
    eyebrow: "Send a Raven",
    heading: "Let's",
    headingItalic: "talk",
    subtext: "Open to full-time frontend and UI roles. The inbox is open.",
    marqueeText: "DESIGN MEETS CODE • ",
    ctaLabel: "Say Hello",
    statusLabel: "Open to full-time roles",
    copyright: "© 2026 Pedro Visnardi",
  },
  social: [
    { label: "LinkedIn", href: LINKEDIN_URL, external: true },
    { label: "Email", href: `mailto:${EMAIL}` },
    { label: "GitHub", href: GITHUB_URL, external: true },
  ],
};

const pt: SiteContent = {
  meta: {
    title: "Pedro Visnardi: Frontend Developer & UI Specialist",
    description:
      "Pedro Visnardi: Desenvolvedor Frontend e UI Specialist em São Paulo, Brasil. 9 anos entre design gráfico e desenvolvimento frontend.",
  },
  loading: {
    label: "Portfólio",
    words: ["Criar", "Construir", "Lançar"],
  },
  nav: {
    pages: [
      { id: "cover", label: "Capa" },
      { id: "log", label: "Diário de Missões" },
      { id: "portfolio", label: "Portfólio" },
      { id: "contact", label: "Contato" },
    ],
  },
  cover: {
    eyebrow: "Ficha de Personagem",
    name: "Pedro Visnardi",
    classIntro: "Um",
    classes: ["Designer", "Desenvolvedor", "Criador", "Híbrido"],
    classOutro: "baseado em São Paulo, Brasil.",
    tagline:
      "Nove anos entre design gráfico e desenvolvimento frontend, projetando interfaces e construindo o código que as coloca no ar.",
    portraitAlt: "Pedro Visnardi",
    statsLabel: "Atributos",
    stats: [
      { value: 9, suffix: "+", label: "Anos de Experiência" },
      { value: 4, label: "Empregadores" },
      { value: 4, label: "Idiomas Falados" },
    ],
    proficienciesLabel: "Proficiências",
    proficiencyGroups: {
      design: "Design",
      development: "Desenvolvimento",
      tool: "Ferramentas",
    },
    proficiencies: [
      { label: "HTML5", category: "development" },
      { label: "CSS3", category: "development" },
      { label: "JavaScript", category: "development" },
      { label: "Design Responsivo", category: "development" },
      { label: "Desenvolvimento de UI", category: "development" },
      { label: "Mobile First", category: "development" },
      { label: "Git/GitHub", category: "development" },
      { label: "Acessibilidade", category: "development" },
      { label: "UX", category: "design" },
      { label: "Branding", category: "design" },
      { label: "Arquitetura da Informação", category: "design" },
      { label: "Design Systems", category: "design" },
      { label: "Figma", category: "tool" },
      { label: "WordPress", category: "tool" },
      { label: "Adobe Photoshop", category: "tool" },
      { label: "Adobe Illustrator", category: "tool" },
    ],
    languagesLabel: "Idiomas",
    languages: [
      { label: "Português", tier: "native", tierLabel: "Nativo" },
      { label: "Inglês", tier: "advanced", tierLabel: "Avançado" },
      { label: "Espanhol", tier: "intermediate", tierLabel: "Intermediário" },
      { label: "Francês", tier: "basic", tierLabel: "Básico" },
    ],
    ctaPrimary: "Ver Diário de Missões",
    ctaSecondary: "Enviar um Corvo",
  },
  log: {
    eyebrow: "Diário de Missões",
    heading: "O caminho",
    headingItalic: "até aqui",
    bio: "A jornada começa no design gráfico (branding, identidade visual, logos) e evolui para o desenvolvimento frontend (HTML5, CSS3, JavaScript, responsivo e mobile-first, design systems). Nove anos depois, as duas metades ainda trabalham como uma só: dono da camada visual e do código que a coloca no ar.",
    questsLabel: "Histórico Profissional",
    activeQuestLabel: "Missão Ativa",
    quests: [
      {
        id: "grupo-take-5",
        guild: "Grupo Take 5",
        role: "Designer Gráfico",
        period: "2025 - presente",
        location: "São Paulo, Brasil",
        description:
          "Design gráfico para materiais internos e de marketing.",
        status: "active",
      },
      {
        id: "puc-campinas",
        guild: "PUC-Campinas",
        role: "Frontend Developer Pleno",
        period: "2021 - 2025",
        location: "Campinas, Brasil",
        description:
          "Desenvolvimento frontend para projetos institucionais.",
        status: "completed",
      },
      {
        id: "visie-padroes-web",
        guild: "Visie Padrões Web",
        role: "Frontend Developer Pleno",
        period: "2018 - 2019",
        description: "Desenvolvimento frontend para projetos corporativos.",
        status: "completed",
      },
      {
        id: "elo-criativo",
        guild: "Elo Criativo Design & Web",
        role: "Frontend Developer & Designer Gráfico",
        period: "2013 - 2018",
        description:
          "Desenvolvimento frontend e design gráfico para projetos corporativos.",
        status: "completed",
      },
    ],
    trainingLabel: "Formação",
    incompleteTrainingLabel: "Interrompida",
    training: [
      {
        id: "fmu",
        institution: "FMU",
        program: "Bacharelado em Design Gráfico",
        period: "2013 - 2017",
        status: "completed",
      },
      {
        id: "anhembi-morumbi",
        institution: "Universidade Anhembi Morumbi",
        program: "Design de Jogos",
        period: "2009 - 2011",
        status: "incomplete",
      },
    ],
    sealedQuest: {
      eyebrow: "Missão Selada",
      title: "Ainda não desbloqueada",
      body: "Em vez de preencher este espaço com projetos fictícios, aqui está o que é real agora: nove anos de trabalho híbrido em design e frontend, documentados no currículo e no LinkedIn.",
      links: [
        { label: "Currículo", href: RESUME_URL, external: true },
        { label: "LinkedIn", href: LINKEDIN_URL, external: true },
        { label: "GitHub", href: GITHUB_URL, external: true },
      ],
    },
  },
  portfolio: {
    eyebrow: "Portfólio",
    heading: "Trabalhos,",
    headingItalic: "em exposição",
    subtext:
      "Um mural vivo do trabalho. Deixe passar, ou passe o mouse num azulejo pra trazê-lo pra frente.",
    placeholderNote:
      "Os azulejos com projetos reais estão a caminho. O mural abaixo mostra imagens de exemplo até lá.",
  },
  contact: {
    eyebrow: "Enviar um Corvo",
    heading: "Vamos",
    headingItalic: "conversar",
    subtext:
      "Aberto a vagas de frontend e UI em tempo integral. A caixa de entrada está aberta.",
    marqueeText: "DESIGN ENCONTRA CÓDIGO • ",
    ctaLabel: "Diga Olá",
    statusLabel: "Aberto a vagas full-time",
    copyright: "© 2026 Pedro Visnardi",
  },
  social: [
    { label: "LinkedIn", href: LINKEDIN_URL, external: true },
    { label: "E-mail", href: `mailto:${EMAIL}` },
    { label: "GitHub", href: GITHUB_URL, external: true },
  ],
};

// Record<Language, SiteContent> garante, em tempo de compilação, que "content"
// sempre tem uma entrada para cada idioma, sem esquecer nenhum.
export const content: Record<Language, SiteContent> = { en, pt };
