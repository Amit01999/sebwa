export type RichBlockSeed =
  | { type: "p" | "quote"; text: string }
  | { type: "h2" | "h3"; text: string }
  | { type: "ul" | "ol"; items: string[] }
  | { type: "callout"; title?: string; text: string }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "image"; mediaAssetId: string; alt: string; caption?: string }
  | {
      type: "links";
      items: { label: string; to: string; variant: "teal" | "orange" | "outline" }[];
    }
  | { type: "video"; provider: "vimeo"; videoId: string; h?: string; title: string }
  | { type: "deflist"; rows: { title: string; blocks: RichBlockSeed[] }[] }
  | { type: "courseTableRef"; fragmentKey: string };

export type SectionSeed =
  | {
      type: "hero";
      data: {
        backgroundImage: string;
        eyebrowLines: string[];
        heading: string;
        ctaLabel?: string;
        ctaHref?: string;
      };
    }
  | { type: "pageHero"; data: { title: string; crumbLabel?: string } }
  | {
      type: "about";
      data: {
        eyebrow?: string;
        lead: string;
        bullets: string[];
        video?: { provider: "vimeo"; videoId: string; h?: string; title: string };
        closing?: string;
      };
    }
  | {
      type: "programsGrid";
      data: {
        heading: string;
        heroImage: string;
        icon: string;
        items: { title: string; sub: string }[];
      };
    }
  | { type: "whyWace"; data: { heading: string; paragraph: string; bullets: string[] } }
  | {
      type: "universitiesGrid";
      data: { heading: string; rows: { mediaAssetId: string; alt: string }[][] };
    }
  | { type: "cta"; data: { heading: string; ctaLabel: string; ctaHref: string } }
  | { type: "richContent"; data: { intro?: string; blocks: RichBlockSeed[] } }
  | { type: "leadForm"; data: { variant: "contact" | "lead"; heading?: string; intro?: string } };

export type PageSeed = {
  slug: string;
  title: string;
  seo?: { title?: string; description?: string };
  sections: SectionSeed[];
};

export type NavChildSeed = { label: string; to: string; order: number };
export type NavItemSeed = { label: string; to: string; order: number; children: NavChildSeed[] };
export type NavSeed = {
  items: NavItemSeed[];
  ctaButton: { label: string; to: string };
};

export type SettingsSeed = {
  contact: { phones: string[]; email: string; address: string; hours: string };
  social: { facebook: string; instagram: string; youtube: string };
  footer: {
    navLinks: { label: string; href: string; order: number; visible: boolean }[];
    accreditationLogos: { mediaAssetTag: string; alt: string; order: number }[];
  };
  seoDefaults: { titleSuffix: string };
};

export type FragmentSeed = {
  key: string;
  type: "courseTable";
  data: { columns: string[]; rows: { program: string; values: (boolean | string)[] }[] };
};
