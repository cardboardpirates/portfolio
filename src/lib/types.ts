// Este arquivo só tem tipos TypeScript (nenhum código roda em tempo de execução).
// Ele existe para descrever "a forma" dos dados usados no site, e é apagado
// completamente na hora do build (TypeScript vira JavaScript puro).

// Union type: Language só pode ser a string "en" ou a string "pt", nunca outra coisa.
export type Language = "en" | "pt";

// As quatro páginas do "livreto de ficha": capa/identidade, diário de missões,
// portfólio visual e contato.
export type PageId = "cover" | "log" | "portfolio" | "contact";

export interface NavPageContent {
  id: PageId;
  label: string;
}

export interface LinkContent {
  label: string;
  href: string;
  external?: boolean;
}

export interface StatTileContent {
  value: number;
  suffix?: string;
  label: string;
}

// Categoria usada só para agrupar visualmente a lista de proficiências
// (habilidades de design/desenvolvimento vs. ferramentas), sem implicar nível.
export type ProficiencyCategory = "design" | "development" | "tool";

export interface ProficiencyTagContent {
  label: string;
  category: ProficiencyCategory;
}

// Os quatro níveis reais de idioma do currículo. Sempre exibidos junto do
// rótulo textual (tierLabel), nunca como um número inventado.
export type LanguageTier = "native" | "advanced" | "intermediate" | "basic";

export interface LanguageTierContent {
  label: string;
  tier: LanguageTier;
  tierLabel: string;
}

export type QuestStatus = "active" | "completed";

export interface QuestLogEntryContent {
  id: string;
  guild: string;
  role: string;
  period: string;
  location?: string;
  description: string;
  status: QuestStatus;
}

export type TrainingStatus = "completed" | "incomplete";

export interface TrainingEntryContent {
  id: string;
  institution: string;
  program: string;
  period: string;
  status: TrainingStatus;
}

// Um "azulejo" da parede de portfólio (imagem + título opcional + link opcional).
export interface PortfolioTileContent {
  id: string;
  image: string;
  title?: string;
  description?: string;
  href?: string;
}

// Um azulejo de projeto real, com a posição (0-based) do azulejo de exemplo
// que ele substitui na parede.
export interface FeaturedPortfolioTileContent extends PortfolioTileContent {
  slot: number;
}

// SiteContent descreve TODO o texto do site. Cada página do livreto de ficha
// (cover, log, portfolio, contact) tem seu próprio sub-objeto de textos.
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
    pages: NavPageContent[];
  };
  cover: {
    eyebrow: string;
    name: string;
    classIntro: string;
    classes: string[];
    classOutro: string;
    tagline: string;
    portraitAlt: string;
    swapClassLabel: string;
    statsLabel: string;
    stats: StatTileContent[];
    proficienciesLabel: string;
    proficiencyGroups: Record<ProficiencyCategory, string>;
    proficiencies: ProficiencyTagContent[];
    languagesLabel: string;
    languages: LanguageTierContent[];
    ctaPrimary: string;
    ctaSecondary: string;
  };
  log: {
    eyebrow: string;
    heading: string;
    headingItalic: string;
    bio: string;
    questsLabel: string;
    activeQuestLabel: string;
    quests: QuestLogEntryContent[];
    trainingLabel: string;
    incompleteTrainingLabel: string;
    training: TrainingEntryContent[];
    sideQuest: {
      eyebrow: string;
      title: string;
      body: string;
      links: LinkContent[];
    };
  };
  portfolio: {
    eyebrow: string;
    heading: string;
    headingItalic: string;
    subtext: string;
    // Enquanto não há imagens reais de projeto, a parede usa os azulejos de
    // exemplo do próprio componente e mostra este aviso, no mesmo espírito
    // honesto do card de "missão selada" do Diário de Missões.
    placeholderNote: string;
    tiles?: PortfolioTileContent[];
    // Projetos reais já disponíveis, exibidos no lugar de alguns azulejos de
    // exemplo enquanto os demais ainda são placeholders.
    featuredTiles?: FeaturedPortfolioTileContent[];
  };
  contact: {
    eyebrow: string;
    heading: string;
    headingItalic: string;
    subtext: string;
    ctaLabel: string;
    diceLabel: string;
    diceSuccessLabel: string;
    diceSuccessDetail: string;
    statusLabel: string;
    copyright: string;
  };
  social: LinkContent[];
}
