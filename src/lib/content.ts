// Este arquivo guarda TODO o texto visível do site, em inglês e português,
// separado do código dos componentes. Essa separação (conteúdo x apresentação)
// é o que torna o site "bilíngue": os componentes só leem "content[language]"
// e nunca têm texto embutido diretamente no JSX.
//
// "import type" importa só os TIPOS (Language, SiteContent), não valores.
// Isso deixa claro pro leitor (e pro bundler) que nada em tempo de execução
// está sendo trazido daqui, só as definições usadas pelo TypeScript.
import type { Language, SiteContent } from "./types";

const LINKEDIN_URL =
  "https://www.linkedin.com/in/pedro-di-mambro-visnardi-064075145";
const GITHUB_URL = "https://github.com/cardboardpirates";
const EMAIL = "visnardi.pedro@gmail.com";
// import.meta.env.BASE_URL vem da configuração "base" do vite.config.ts (/portfolio/).
// Usar essa variável em vez de escrever "/portfolio/" na mão garante que os links
// para arquivos estáticos (como o PDF do currículo) continuem certos se o "base" mudar.
const RESUME_URL = `${import.meta.env.BASE_URL}resume.pdf`;

// "en: SiteContent" diz ao TypeScript para checar este objeto contra a interface
// SiteContent (definida em types.ts). Se faltar uma propriedade obrigatória ou o tipo
// estiver errado, o compilador acusa erro aqui mesmo, antes de rodar o site.
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
    links: [
      { label: "Home", href: "#hero" },
      { label: "Work", href: "#work" },
      { label: "Resume", href: RESUME_URL },
    ],
    sayHi: "Say hi",
  },
  hero: {
    eyebrow: "PORTFOLIO 2026",
    name: "Pedro Visnardi",
    roleIntro: "A",
    roles: ["Designer", "Developer", "Creator", "Hybrid"],
    roleOutro: "lives in São Paulo.",
    description:
      "Nine years spanning graphic design and frontend development, designing interfaces and building the code that ships them.",
    ctaPrimary: "See Work",
    ctaSecondary: "Reach Out",
    scrollLabel: "Scroll",
  },
  work: {
    eyebrow: "Selected Work",
    heading: "Case studies,",
    headingItalic: "coming soon",
    subtext:
      "Real project write-ups are still being gathered; here's the evidence available today.",
    panelEyebrow: "In progress",
    panelTitle: "The work is on its way",
    panelBody:
      "Rather than fill this space with placeholder projects, here's what's real right now: nine years of hybrid design and frontend work, documented on the résumé and LinkedIn.",
    panelLinks: [
      { label: "Résumé", href: RESUME_URL, external: true },
      { label: "LinkedIn", href: LINKEDIN_URL, external: true },
      { label: "GitHub", href: GITHUB_URL, external: true },
    ],
    sideLabel: "Currently",
    sideTitle: "Grupo Take 5",
    sideBody:
      "Graphic design for internal and marketing materials, São Paulo, 2025–present.",
  },
  explorations: {
    eyebrow: "Explorations",
    heading: "Visual",
    headingItalic: "playground",
    subtext:
      "A space for visual experiments, with more on the way as new work gets made.",
  },
  stats: {
    eyebrow: "By the Numbers",
    heading: "Nine years,",
    headingItalic: "and counting",
    items: [
      { value: 9, suffix: "+", label: "Years Experience" },
      { value: 4, label: "Employers" },
      { value: 4, label: "Languages Spoken" },
    ],
  },
  contact: {
    eyebrow: "Get in Touch",
    heading: "Let's",
    headingItalic: "talk",
    subtext:
      "Open to full-time frontend and UI roles. The inbox is open.",
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
    links: [
      { label: "Início", href: "#hero" },
      { label: "Trabalho", href: "#work" },
      { label: "Currículo", href: RESUME_URL },
    ],
    sayHi: "Fala comigo",
  },
  hero: {
    eyebrow: "PORTFÓLIO 2026",
    name: "Pedro Visnardi",
    roleIntro: "Um",
    roles: ["Designer", "Desenvolvedor", "Criador", "Híbrido"],
    roleOutro: "mora em São Paulo.",
    description:
      "Nove anos entre design gráfico e desenvolvimento frontend, projetando interfaces e construindo o código que as coloca no ar.",
    ctaPrimary: "Ver Trabalho",
    ctaSecondary: "Fale Comigo",
    scrollLabel: "Rolar",
  },
  work: {
    eyebrow: "Trabalho Selecionado",
    heading: "Estudos de caso,",
    headingItalic: "em breve",
    subtext:
      "Os estudos de caso reais ainda estão sendo reunidos; aqui está a evidência disponível hoje.",
    panelEyebrow: "Em andamento",
    panelTitle: "O trabalho está a caminho",
    panelBody:
      "Em vez de preencher este espaço com projetos fictícios, aqui está o que é real agora: nove anos de trabalho híbrido em design e frontend, documentados no currículo e no LinkedIn.",
    panelLinks: [
      { label: "Currículo", href: RESUME_URL, external: true },
      { label: "LinkedIn", href: LINKEDIN_URL, external: true },
      { label: "GitHub", href: GITHUB_URL, external: true },
    ],
    sideLabel: "Atualmente",
    sideTitle: "Grupo Take 5",
    sideBody:
      "Design gráfico para materiais internos e de marketing, São Paulo, 2025–presente.",
  },
  explorations: {
    eyebrow: "Explorações",
    heading: "Espaço",
    headingItalic: "visual",
    subtext:
      "Um espaço para experimentos visuais, com mais a caminho conforme novos trabalhos forem criados.",
  },
  stats: {
    eyebrow: "Em Números",
    heading: "Nove anos,",
    headingItalic: "e contando",
    items: [
      { value: 9, suffix: "+", label: "Anos de Experiência" },
      { value: 4, label: "Empregadores" },
      { value: 4, label: "Idiomas Falados" },
    ],
  },
  contact: {
    eyebrow: "Entre em Contato",
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

// Record<Language, SiteContent> é um tipo genérico: significa "um objeto cujas
// chaves são valores do tipo Language ('en' | 'pt') e cujos valores são do tipo
// SiteContent". Isso garante, em tempo de compilação, que "content" sempre tem
// uma entrada para cada idioma, sem esquecer nenhum.
// É este objeto que App.tsx usa como "content[language]" para pegar o texto certo.
export const content: Record<Language, SiteContent> = { en, pt };
