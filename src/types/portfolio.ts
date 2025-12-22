export type Language = 'en' | 'ja';
export type Section = 'hero' | 'about' | 'projects' | 'internships' | 'contact';
export type ProjectGroup = 'personal' | 'hackathon';

export type TranslationContent = {
  role: string;
  explore: string;
  details: string;
  close: string;
  contact: string;
  hero: {
    titleLine1: string;
    titleLine2: string;
    interact: string;
    dragScroll: string;
  };
  sections: Record<Section, string>;
  about: {
    title: string;
    desc: string;
  };
  projects: {
    title: string;
    desc: string;
    viewProject: string;
    groupLabels: Record<ProjectGroup, string>;
    articlesLabel: string;
  };
  internships: {
    title: string;
    desc: string;
  };
  contactSection: {
    title: string;
    subtitle: string;
  };
};

export type Translations = Record<Language, TranslationContent>;

export type Project = {
  id: number;
  group: ProjectGroup;
  title: Record<Language, string>;
  category: Record<Language, string>;
  tech: string[];
  desc: Record<Language, string>;
  viewLabel?: Record<Language, string>;
  url?: string;
  githubUrl?: string;
  image?: string;
  articles?: ProjectArticle[];
};

export type InternExperience = {
  id: number;
  company: Record<Language, string>;
  period: Record<Language, string>;
  summary: Record<Language, string>;
  tech: string[];
  url?: string;
};

export type ArticlePlatform = 'Zenn' | 'Qiita' | 'Youtube' | 'GitHub' | 'Official' | 'Canva';

export type Article = {
  id: number;
  title: string;
  url: string;
  platform: ArticlePlatform;
};

export type ProjectArticle = Omit<Article, 'id'>;
