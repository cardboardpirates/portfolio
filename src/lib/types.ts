// Este arquivo só tem tipos TypeScript (nenhum código roda em tempo de execução).
// Ele existe para descrever "a forma" dos dados usados no site, e é apagado
// completamente na hora do build (TypeScript vira JavaScript puro).

// Union type: Language só pode ser a string "en" ou a string "pt", nunca outra coisa.
// Isso evita erros de digitação como "eng" ou "PT" em qualquer lugar do código.
export type Language = "en" | "pt";

// "interface" descreve o formato de um objeto: quais propriedades ele tem e de que tipo.
export interface NavLinkContent {
  label: string;
  href: string;
}

export interface LinkContent {
  label: string;
  href: string;
  // O "?" torna a propriedade opcional: um LinkContent pode existir sem "external".
  external?: boolean;
}

export interface StatContent {
  value: number;
  suffix?: string;
  label: string;
}

// SiteContent descreve TODO o texto do site (o objeto "site" usado em App.tsx e nas seções).
// Interfaces aninhadas assim documentam a estrutura inteira: cada seção da página
// (hero, work, stats, contact...) tem seu próprio "sub-objeto" de textos.
export interface SiteContent {
  meta: {
    title: string;
    description: string;
  };
  loading: {
    label: string;
    words: string[];
  };
  nav: {
    links: NavLinkContent[];
    sayHi: string;
  };
  hero: {
    eyebrow: string;
    name: string;
    roleIntro: string;
    roles: string[];
    roleOutro: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
    scrollLabel: string;
  };
  work: {
    eyebrow: string;
    heading: string;
    headingItalic: string;
    subtext: string;
    panelEyebrow: string;
    panelTitle: string;
    panelBody: string;
    panelLinks: LinkContent[];
    sideLabel: string;
    sideTitle: string;
    sideBody: string;
  };
  explorations: {
    eyebrow: string;
    heading: string;
    headingItalic: string;
    subtext: string;
  };
  stats: {
    eyebrow: string;
    heading: string;
    headingItalic: string;
    items: StatContent[];
  };
  contact: {
    eyebrow: string;
    heading: string;
    headingItalic: string;
    subtext: string;
    marqueeText: string;
    ctaLabel: string;
    statusLabel: string;
    copyright: string;
  };
  social: LinkContent[];
}
