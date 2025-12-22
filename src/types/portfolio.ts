export type Language = 'en' | 'ja';
export type Section = 'hero' | 'about' | 'projects' | 'contact';

export type TranslationContent = {
  role: string;
  explore: string;
  details: string;
  close: string;
  contact: string;
  about: {
    title: string;
    desc: string;
  };
  projects: {
    title: string;
    desc: string;
  };
};

export type Translations = Record<Language, TranslationContent>;

export type Project = {
  id: number;
  title: string;
  category: string;
  tech: string[];
  desc: string;
};
