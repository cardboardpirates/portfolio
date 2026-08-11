export type Language = "en" | "pt";

export interface NavLinkContent {
  label: string;
  href: string;
}

export interface LinkContent {
  label: string;
  href: string;
  external?: boolean;
}

export interface StatContent {
  value: number;
  suffix?: string;
  label: string;
}

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
