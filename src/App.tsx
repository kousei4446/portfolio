import { useEffect, useRef, useState } from 'react';
import {
  ChevronRight,
  ExternalLink,
  Github,
  Layers,
  Twitter,
  X,
  Mail,
  ArrowDown,
  Sun,
  Moon,
  Globe2
} from 'lucide-react';
import * as THREE from 'three';
import earthBlueMarbleUrl from '../earth-blue-marble.jpg';
// @ts-expect-error troika-three-text does not ship type declarations in this project.
import { Text } from 'troika-three-text';
import { internExperiences } from './features/internships/data/internships';
import { projectsData } from './features/projects/data/projects';
import { SECTIONS as BASE_SECTIONS } from './shared/constants/sections';
import type { Language, Project } from './shared/types/portfolio';

// ==========================================
// Types
// ==========================================
type Theme = 'dark' | 'light';

type FloatingTextMesh = THREE.Object3D & {
  text: string;
  fontSize: number;
  color: string;
  outlineWidth: number;
  outlineColor: string;
  outlineOpacity: number;
  anchorX: 'center' | 'left' | 'right';
  anchorY: 'middle' | 'top' | 'bottom';
  sync: () => void;
  dispose: () => void;
  userData: {
    baseX: number;
    baseY: number;
    phase: number;
    speed: number;
  };
};

declare global {
  interface Window {
    tailwind?: {
      config?: Record<string, unknown>;
    };
  }
}

type LocalizedString = {
  ja: string;
  en: string;
};

interface Research {
  id: number;
  title: LocalizedString;
  conference: LocalizedString;
  date: LocalizedString;
  desc: LocalizedString;
  tags: string[];
  image?: string;
}

interface Others {
  id: number;
  category: LocalizedString;
  title: LocalizedString;
  date: LocalizedString;
  url: string;
}

// ==========================================
// Mock Data
// ==========================================
const SECTIONS: string[] = [
  BASE_SECTIONS[0],
  BASE_SECTIONS[1],
  'research',
  BASE_SECTIONS[2],
  BASE_SECTIONS[3],
  'others',
  BASE_SECTIONS[4],
];

const translations = {
  ja: {
    sections: {
      hero: 'トップ',
      about: '自己紹介',
      research: '研究',
      projects: 'プロジェクト',
      internships: 'インターンシップ',
      others: 'その他',
      contact: 'お問い合わせ',
    },
    hero: {
      titleLine1: 'Crafting',
      titleLine2: 'Global Experiences.',
      role: 'Frontend Engineer / UI/UX Designer',
      summary: ['React / Next.js', 'UI/UX Design', '3D WebGL'],
      interact: 'SCROLL TO EXPLORE',
      ctaProjects: 'プロジェクトを見る',
      ctaContact: '連絡する',
    },
    about: {
      title: 'About Me',
      desc: 'フロントエンド開発とUI/UXデザインを軸に、世界中のユーザーにとって使いやすく魅力的なWeb体験を創造しています。モダンな技術スタックを活用し、言語や国境を越えて直感的に伝わるインターフェースの開発を得意としています。',
    },
    projects: {
      desc: '個人的な探求からハッカソンでの開発まで、形にしてきたプロダクトの一覧です。',
      groupLabels: { personal: '個人開発', hackathon: 'ハッカソン' },
      viewProject: 'サイトを見る',
      articlesLabel: '関連リンク',
    },
    internships: {
      desc: '実務現場で培った開発経験とチームでのコラボレーションの記録です。',
    },
    research: {
      desc: '大学等での研究や学会発表の記録です。',
    },
    others: {
      desc: 'LT登壇、執筆、趣味の制作物など。',
    },
    contactSection: {
      title: 'Let\'s Connect',
      subtitle: '新しいプロジェクトや機会について、世界中のどこからでもお気軽にご連絡ください。',
    },
    details: '詳細を見る',
  },
  en: {
    sections: {
      hero: 'Home',
      about: 'About',
      research: 'Research',
      projects: 'Projects',
      internships: 'Internships',
      others: 'Others',
      contact: 'Contact',
    },
    hero: {
      titleLine1: 'Crafting',
      titleLine2: 'Global Experiences.',
      role: 'Frontend Engineer / UI/UX Designer',
      summary: ['React / Next.js', 'UI/UX Design', '3D WebGL'],
      interact: 'SCROLL TO EXPLORE',
      ctaProjects: 'View Projects',
      ctaContact: 'Contact Me',
    },
    about: {
      title: 'About Me',
      desc: 'Focusing on frontend development and UI/UX design, I create user-friendly and engaging web experiences for users worldwide. I specialize in building intuitive interfaces that transcend languages and borders using modern tech stacks.',
    },
    projects: {
      desc: 'A collection of products I have built, ranging from personal explorations to hackathon projects.',
      groupLabels: { personal: 'Personal', hackathon: 'Hackathons' },
      viewProject: 'Visit Website',
      articlesLabel: 'Related Links',
    },
    internships: {
      desc: 'A record of my professional development experience and team collaboration.',
    },
    research: {
      desc: 'Records of research and conference presentations.',
    },
    others: {
      desc: 'Speaking, writing, and hobby projects.',
    },
    contactSection: {
      title: 'Let\'s Connect',
      subtitle: 'Feel free to reach out from anywhere in the world for new projects or opportunities.',
    },
    details: 'View Details',
  }
} as const;

type Translation = (typeof translations)[Language];

const researchData: Research[] = [
  {
    id: 1,
    title: { ja: 'WebGLを用いた効率的な描画アルゴリズムの提案', en: 'Proposal of Efficient Rendering Algorithm using WebGL' },
    conference: { ja: '情報処理学会 第XX回全国大会', en: 'IPSJ National Convention' },
    date: { ja: '2023.03', en: 'Mar 2023' },
    desc: { ja: 'ブラウザ上での3Dモデルの描画において、カリング処理を最適化することでFPSを30%向上させる手法を提案しました。', en: 'Proposed a method to improve FPS by 30% by optimizing culling processing in 3D model rendering on the browser.' },
    tags: ['WebGL', 'Computer Graphics', 'Performance'],
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    title: { ja: '多文化対応UIのアクセシビリティ調査', en: 'Accessibility Study of Cross-Cultural UI' },
    conference: { ja: 'HCI研究会', en: 'SIGCHI' },
    date: { ja: '2022.11', en: 'Nov 2022' },
    desc: { ja: '異なる文化圏におけるUIデザインの認識の違いと、インクルーシブなインターフェース設計のベストプラクティスを調査しました。', en: 'Investigated differences in UI design perception across cultural contexts and best practices for inclusive interface design.' },
    tags: ['UI/UX', 'HCI', 'Accessibility'],
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
  }
];

const othersData: Others[] = [
  {
    id: 1,
    category: { ja: '登壇', en: 'Speaking' },
    title: { ja: 'フロントエンドLT会：Three.jsで作るリッチなポートフォリオ', en: 'Frontend LT: Rich Portfolio with Three.js' },
    date: { ja: '2023.10', en: 'Oct 2023' },
    url: '#'
  },
  {
    id: 2,
    category: { ja: '執筆', en: 'Writing' },
    title: { ja: 'ReactとTypeScriptで始めるモダンWeb開発入門', en: 'Introduction to Modern Web Dev with React & TS' },
    date: { ja: '2023.05', en: 'May 2023' },
    url: '#'
  },
  {
    id: 3,
    category: { ja: '交流', en: 'Community' },
    title: { ja: 'Global Developer Meetup 運営メンバー', en: 'Organizer at Global Developer Meetup' },
    date: { ja: '2022.08', en: 'Aug 2022' },
    url: '#'
  }
];

const PROFILE_LINKS = {
  email: 'k56797484@gmail.com',
  github: 'https://github.com/kousei4446',
  twitter: 'https://twitter.com',
} as const;

// ==========================================
// 3D Background Data
// ==========================================
const GREETINGS = [
  "Hello", "Hola", "Bonjour", "你好", "こんにちは",
  "안녕하세요", "Ciao", "Salut", "مرحبا", "Olá",
  "Guten Tag", "Namaste", "Sawaddee", "Zdravstvuyte",
  "Ahoj", "Hallo", "Jambo", "Hej", "Merhaba", "Szia"
];

const PASTEL_PALETTE = [
  "#38bdf8", // Light Blue
  "#818cf8", // Indigo
  "#c084fc", // Purple
  "#2dd4bf", // Teal
  "#f472b6", // Rose
];

// ==========================================
// Components
// ==========================================

interface TopNavProps {
  lang: Language;
  theme: Theme;
  isMenuOpen: boolean;
  isElevated: boolean; // 追加
  onToggleLang: () => void;
  onToggleTheme: () => void;
  onToggleMenu: () => void;
}

function TopNav({ lang, theme, isMenuOpen, isElevated, onToggleLang, onToggleTheme, onToggleMenu }: TopNavProps) {
  const isDark = theme === 'dark';
return (
  <nav className="fixed top-0 w-full z-40 px-4 md:px-8 pt-4 pointer-events-none">
    <div
      className={[
        "pointer-events-auto mx-auto max-w-6xl",
        "flex items-center justify-between gap-4",
        "rounded-2xl px-4 md:px-5 py-3",
        "backdrop-blur-xl transition-all duration-300",
        "border",
        isElevated
          ? isDark
            ? "bg-[color:var(--surfaceSoft)] border-[color:var(--border)] shadow-[0_18px_50px_var(--shadow)]"
            : "bg-[color:var(--surfaceStrong)] border-[color:var(--border)] shadow-[0_18px_50px_var(--shadow)]"
          : "bg-transparent border-transparent shadow-none"
      ].join(" ")}
    >
      <a href="#hero" className="flex flex-col rounded-md focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:outline-none">
        <span className="text-lg md:text-xl font-black tracking-tight text-[color:var(--text)]">KUDOU</span>
        <span className="text-[10px] md:text-xs tracking-[0.3em] font-bold text-[color:var(--accent)]">KOUSEI</span>
      </a>

      <div className="flex gap-2 md:gap-3 items-center">
        {/* theme */}
        <button
          onClick={onToggleTheme}
          aria-label="Toggle Theme"
          className="p-2 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:outline-none
                     bg-[color:var(--chip)] text-[color:var(--muted2)] hover:text-[color:var(--text)]"
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* lang */}
        <button
          onClick={onToggleLang}
          aria-label="Toggle Language"
          className="text-xs font-bold tracking-widest p-2 rounded-md transition-colors
                     focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:outline-none
                     text-[color:var(--muted)] hover:text-[color:var(--text)]"
        >
          {lang === 'en' ? 'JP' : 'EN'}
        </button>

        {/* menu */}
        <button
          onClick={onToggleMenu}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          className="flex flex-col justify-center items-center w-10 h-10 gap-1.5 rounded-md
                     focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:outline-none"
        >
          <div className={`w-6 h-[2px] transition-all duration-300 bg-[color:var(--text)] ${isMenuOpen ? 'rotate-45 translate-y-[8px]' : ''}`} />
          <div className={`w-6 h-[2px] transition-all duration-300 bg-[color:var(--text)] ${isMenuOpen ? 'opacity-0' : ''}`} />
          <div className={`w-6 h-[2px] transition-all duration-300 bg-[color:var(--text)] ${isMenuOpen ? '-rotate-45 -translate-y-[8px]' : ''}`} />
        </button>
      </div>
    </div>
  </nav>
);
}

interface SectionIndicatorProps {
  activeSectionId: string;
  sections: string[];
  theme: Theme;
}

function SectionIndicator({ activeSectionId, sections, theme }: SectionIndicatorProps) {
  const isDark = theme === 'dark';
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3 pointer-events-auto hidden sm:flex">
      {sections.map((id) => (
        <button
          key={id}
          onClick={() => scrollTo(id)}
          aria-label={`Scroll to ${id}`}
          className={`w-1.5 transition-all duration-300 rounded-full focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:outline-none focus-visible:ring-offset-2 ${isDark ? 'focus-visible:ring-offset-slate-900' : 'focus-visible:ring-offset-white'}
            ${activeSectionId === id 
              ? 'h-10 bg-[color:var(--accent)] shadow-[0_0_20px_var(--accentShadow)]' 
              : `h-3 hover:h-5 ${isDark ? 'bg-white/25 hover:bg-white/70' : 'bg-slate-300 hover:bg-slate-500'}`}`}
        />
      ))}
    </div>
  );
}
function splitPeriod(period: string) {
  const daysMatch = period.match(/\(([^)]+)\)/);
  const days = daysMatch?.[1];

  const main = period.replace(/\s*\([^)]+\)\s*/, "").trim();

  // 〜 / - / – / to などを雑に吸収
  const parts = main.split(/\s*(?:〜|~|–|-|to)\s*/).map(s => s.trim()).filter(Boolean);

  return {
    start: parts[0] ?? main,
    end: parts[1],
    days,
  };
}

function PeriodStack({ period }: { period: string }) {
  const p = splitPeriod(period);
  return (
    <div className="leading-tight">
      <span className="block">{p.start}</span>
      {p.end ? <span className="block">〜 {p.end}</span> : null}
      {p.days ? (
        <span className="mt-1 inline-block text-[10px] font-bold font-mono tracking-widest opacity-80">
          ({p.days})
        </span>
      ) : null}
    </div>
  );
}
interface MenuOverlayProps {
  isOpen: boolean;
  sections: string[];
  labels: Record<string, string>;
  theme: Theme;
  onClose: () => void;
}

function MenuOverlay({ isOpen, sections, labels, theme, onClose }: MenuOverlayProps) {
  const isDark = theme === 'dark';
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-30 flex items-center justify-center transition-opacity duration-500 backdrop-blur-md 
        ${isDark ? 'bg-slate-950/85' : 'bg-white/85'} 
        ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      onClick={onClose}
    >
      <nav className={`relative flex flex-col gap-6 md:gap-8 text-center p-10 rounded-[2rem] border shadow-[0_24px_80px_var(--shadow)]
        ${isDark ? 'bg-[color:var(--surface)] border-[color:var(--border)]' : 'bg-[color:var(--surfaceStrong)] border-[color:var(--border)]'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {sections.map((sec) => (
          <button
            key={sec}
            onClick={() => scrollTo(sec)}
            className={`text-2xl md:text-4xl font-black font-display transition-colors uppercase tracking-[0.18em] focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:outline-none p-2 rounded
              ${isDark ? 'text-slate-300 hover:text-[color:var(--accent)]' : 'text-slate-600 hover:text-[color:var(--accent)]'}`}
          >
            {labels[sec]}
          </button>
        ))}
      </nav>
    </div>
  );
}

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: Project | null;
  lang: Language;
  theme: Theme;
  t: Translation;
}

function DetailModal({ isOpen, onClose, data, lang, theme, t }: DetailModalProps) {
  const isDark = theme === 'dark';

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'auto';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen || !data) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md animate-fade-in ${isDark ? 'bg-black/60' : 'bg-slate-900/40'}`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className={`p-6 md:p-8 rounded-3xl max-w-2xl w-full relative shadow-2xl max-h-[90vh] overflow-y-auto transform transition-all animate-scale-in border
          ${isDark ? 'bg-slate-900 border-white/10 shadow-cyan-900/20' : 'bg-white border-slate-200'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          aria-label="Close modal"
          className={`absolute top-4 right-4 p-2 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:outline-none z-10
            ${isDark ? 'text-slate-400 hover:text-white bg-white/5 hover:bg-white/10' : 'text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200'}`}
        >
          <X size={20} />
        </button>
        
        <span className={`text-xs font-mono font-bold mb-2 block uppercase tracking-widest ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>
          {data.category[lang]}
        </span>
        <h3 id="modal-title" className={`display-title text-2xl md:text-3xl font-black mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {data.title[lang]}
        </h3>
        
        {data.image ? (
          <div className={`mb-6 overflow-hidden rounded-2xl aspect-video flex items-center justify-center relative shadow-inner border
            ${isDark ? 'bg-slate-800 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
            <img 
               src={data.image} 
               alt={data.title[lang]} 
               className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className={`mb-6 overflow-hidden rounded-2xl aspect-video flex items-center justify-center shadow-inner border
            ${isDark ? 'bg-slate-800 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
            <div className={`flex flex-col items-center ${isDark ? 'text-slate-500' : 'text-slate-300'}`}>
               <Layers size={48} />
               <span className="mt-2 text-sm font-mono">No Image</span>
            </div>
          </div>
        )}

        <p className={`leading-relaxed mb-8 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{data.desc[lang]}</p>
        
        <div className="mb-8">
          <h4 className={`text-xs font-bold mb-3 uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Technologies</h4>
          <div className="flex flex-wrap gap-2">
            {data.tech.map((tech) => (
              <span key={tech} className={`px-3 py-1 rounded-full text-xs font-semibold border
                ${isDark ? 'bg-white/5 border-white/10 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-600'}`}>
                {tech}
              </span>
            ))}
          </div>
        </div>

        {data.articles?.length ? (
          <div className="mb-8">
            <h4 className={`text-xs font-bold mb-3 uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{t.projects.articlesLabel}</h4>
            <div className="flex flex-col gap-2">
              {data.articles.map((article, idx) => (
                <a
                  key={idx}
                  href={article.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm transition-all focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:outline-none border
                    ${isDark 
                      ? 'bg-white/5 border-white/10 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/50' 
                      : 'bg-white border-slate-200 text-slate-700 hover:text-cyan-600 hover:border-cyan-300 shadow-sm'}`}
                >
                  <span className="font-bold">{article.title}</span>
                  <span className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>{article.platform}</span>
                </a>
              ))}
            </div>
          </div>
        ) : null}

        <div className={`flex flex-col sm:flex-row gap-3 pt-6 border-t ${isDark ? 'border-white/10' : 'border-slate-100'}`}>
          {data.url && data.url !== '#' && (
            <a
              href={data.url}
              target="_blank"
              rel="noreferrer"
              className={`flex-1 py-3 px-4 font-bold rounded-xl transition-all flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:outline-none shadow-md shadow-cyan-500/30
                ${isDark 
                  ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-900 focus-visible:ring-offset-slate-900' 
                  : 'bg-cyan-500 hover:bg-cyan-600 text-white focus-visible:ring-offset-white'}`}
            >
              {t.projects.viewProject} <ExternalLink size={16} />
            </a>
          )}
          {data.githubUrl && data.githubUrl !== '#' && (
            <a
              href={data.githubUrl}
              target="_blank"
              rel="noreferrer"
              className={`flex-1 py-3 px-4 font-bold rounded-xl transition-all flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none
                ${isDark 
                  ? 'bg-white/10 hover:bg-white/20 text-white focus-visible:ring-white focus-visible:ring-offset-slate-900' 
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800 focus-visible:ring-slate-400 focus-visible:ring-offset-white'}`}
            >
              Source Code <Github size={16} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3D Background Component 
// (Earth Globe + Metallic Airplane + Typography)
// ==========================================
interface Background3DProps {
  words?: string[];
  palette?: string[];
  theme: Theme;
}

function createProceduralEarthTexture(): THREE.CanvasTexture | null {
  const size = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  if (!ctx) return null;

  const oceanGradient = ctx.createLinearGradient(0, 0, size, size);
  oceanGradient.addColorStop(0, '#7dd3fc');
  oceanGradient.addColorStop(0.35, '#2563eb');
  oceanGradient.addColorStop(1, '#0b1f4f');
  ctx.fillStyle = oceanGradient;
  ctx.fillRect(0, 0, size, size);

  const glow = ctx.createRadialGradient(size * 0.35, size * 0.25, size * 0.08, size * 0.5, size * 0.5, size * 0.75);
  glow.addColorStop(0, 'rgba(255,255,255,0.35)');
  glow.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, size, size);

  const continents: Array<[number, number, number, number, number]> = [
    [0.22, 0.38, 0.18, 0.12, -20],
    [0.33, 0.56, 0.10, 0.16, 10],
    [0.57, 0.42, 0.20, 0.11, 6],
    [0.70, 0.60, 0.12, 0.08, -18],
    [0.48, 0.72, 0.15, 0.09, 22],
  ];

  ctx.fillStyle = '#22c55e';
  continents.forEach(([x, y, rx, ry, rot]) => {
    ctx.save();
    ctx.translate(size * x, size * y);
    ctx.rotate((rot * Math.PI) / 180);
    ctx.beginPath();
    ctx.ellipse(0, 0, size * rx, size * ry, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });

  ctx.fillStyle = 'rgba(21, 128, 61, 0.65)';
  continents.forEach(([x, y, rx, ry, rot]) => {
    ctx.save();
    ctx.translate(size * x, size * y);
    ctx.rotate((rot * Math.PI) / 180);
    ctx.beginPath();
    ctx.ellipse(size * 0.02, -size * 0.01, size * rx * 0.55, size * ry * 0.5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });

  ctx.strokeStyle = 'rgba(191, 219, 254, 0.22)';
  ctx.lineWidth = 2;
  for (let i = 1; i < 9; i++) {
    const y = (size / 9) * i;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(size, y);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

function Background3D({ words = GREETINGS, palette = PASTEL_PALETTE, theme }: Background3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const targetRotationRef = useRef({ x: 0, y: 0 });
  const sceneRef = useRef<THREE.Scene | null>(null);
  const isDark = theme === 'dark';
  
  // マテリアルの参照を保持してテーマ変更時に更新する
  const materialsRef = useRef({
    earth: null as THREE.MeshPhysicalMaterial | null,
    earthWire: null as THREE.MeshBasicMaterial | null,
    atmos: null as THREE.MeshPhysicalMaterial | null,
    airplane: null as THREE.MeshPhysicalMaterial | null,
    trail: null as THREE.LineBasicMaterial | null,
    texts: [] as FloatingTextMesh[]
  });

  useEffect(() => {
    const mountElement = mountRef.current;
    if (!mountElement) return;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;
    const isDark = theme === 'dark';
    
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(isDark ? 0x0f172a : 0xf8fafc, 0.015);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 8;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    } catch {
      return;
    }
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); 
    mountElement.appendChild(renderer.domElement);

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // ==========================================
    // 1. メインオブジェクト: 地球儀 (Earth Globe)
    // ==========================================
    const earthGroup = new THREE.Group();
    // 画面右寄りで常に見える位置に固定
    earthGroup.position.set(isMobile ? 0.9 : 1.2, isMobile ? -0.2 : -0.35, -1.0);
    mainGroup.add(earthGroup);
    const earthCenter = earthGroup.position.clone();

    const earthRadius = isMobile ? 1.5 : 1.9;
    const earthGeo = new THREE.SphereGeometry(earthRadius, 64, 64);

    // 添付された地球画像を優先して使用。読み込み前/失敗時は生成テクスチャで表示を維持する。
    const fallbackTexture = createProceduralEarthTexture();
    if (fallbackTexture) {
      fallbackTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    }
    let earthTextureFromFile: THREE.Texture | null = null;
    let isDisposed = false;

    // 物理ベース + 発光で視認性を担保
    const earthMat = new THREE.MeshPhysicalMaterial({
      map: fallbackTexture ?? undefined,
      color: fallbackTexture ? 0xffffff : (isDark ? 0x1d4ed8 : 0x2563eb),
      emissive: isDark ? 0x0ea5e9 : 0x38bdf8,
      emissiveIntensity: isDark ? 0.2 : 0.12,
      roughness: 0.58,
      metalness: 0.06,
      clearcoat: 0.32,
      clearcoatRoughness: 0.24,
    });
    materialsRef.current.earth = earthMat;
    const earth = new THREE.Mesh(earthGeo, earthMat);
    earthGroup.add(earth);

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      earthBlueMarbleUrl,
      (loadedTexture) => {
        if (isDisposed) {
          loadedTexture.dispose();
          return;
        }
        loadedTexture.colorSpace = THREE.SRGBColorSpace;
        loadedTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        loadedTexture.wrapS = THREE.RepeatWrapping;
        loadedTexture.wrapT = THREE.ClampToEdgeWrapping;
        earthTextureFromFile = loadedTexture;
        earthMat.map = loadedTexture;
        earthMat.color.setHex(0xffffff);
        earthMat.needsUpdate = true;
      },
      undefined,
      () => {
        // フォールバックテクスチャをそのまま使う
      }
    );

    // セーフティ表示: ライティング不要のワイヤー球（地球が必ず見えるように）
    const earthWireGeo = new THREE.SphereGeometry(earthRadius * 1.01, 20, 20);
    const earthWireMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x93c5fd : 0x1d4ed8,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.22 : 0.18,
      depthWrite: false,
    });
    materialsRef.current.earthWire = earthWireMat;
    const earthWire = new THREE.Mesh(earthWireGeo, earthWireMat);
    earthGroup.add(earthWire);

    // 大気のグロー効果
    const atmosGeo = new THREE.SphereGeometry(earthRadius * 1.15, 32, 32);
    const atmosMat = new THREE.MeshPhysicalMaterial({
      color: isDark ? 0x0ea5e9 : 0x38bdf8,
      transparent: true,
      opacity: 0.15,
      roughness: 1.0,
      transmission: 0.5,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending
    });
    materialsRef.current.atmos = atmosMat;
    const atmos = new THREE.Mesh(atmosGeo, atmosMat);
    earthGroup.add(atmos);

    // ==========================================
    // 2. 軌跡と旅人 (メタリック紙飛行機)
    // ==========================================
    const planeGroup = new THREE.Group();
    // 飛行機の軌道基準位置も地球と同じにする
    planeGroup.position.copy(earthGroup.position);
    mainGroup.add(planeGroup);

    const airplaneGeo = new THREE.ConeGeometry(0.15, 0.6, 3);
    airplaneGeo.rotateX(Math.PI / 2);
    airplaneGeo.scale(1, 0.2, 1);
    
    const airplaneMat = new THREE.MeshPhysicalMaterial({ 
      color: 0xffffff,
      roughness: 0.1,
      metalness: 0.8,
      clearcoat: 1.0,
      flatShading: true,
      emissive: isDark ? 0x2dd4bf : 0x0ea5e9,
      emissiveIntensity: 0.5
    });
    materialsRef.current.airplane = airplaneMat;
    const airplane = new THREE.Mesh(airplaneGeo, airplaneMat);
    planeGroup.add(airplane);

    const trailMaxLen = isMobile ? 30 : 80;
    const trailPositions = new Float32Array(trailMaxLen * 3);
    const trailGeo = new THREE.BufferGeometry();
    trailGeo.setAttribute('position', new THREE.BufferAttribute(trailPositions, 3));
    
    const trailMat = new THREE.LineBasicMaterial({ 
      color: isDark ? 0x2dd4bf : 0x0ea5e9,
      transparent: true, 
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    materialsRef.current.trail = trailMat;
    const trailLine = new THREE.Line(trailGeo, trailMat);
    // 初期位置を見えない場所にセット
    for(let i=0; i<trailMaxLen; i++) {
        trailPositions[i*3] = 0; trailPositions[i*3+1] = 0; trailPositions[i*3+2] = 0;
    }
    planeGroup.add(trailLine);

    // ==========================================
    // 3. タイポグラフィ雲 (SDF Text)
    // ==========================================
    const textGroup = new THREE.Group();
    mainGroup.add(textGroup);
    
    const maxWords = isMobile ? 12 : 22;
    const numWords = Math.min(words.length, maxWords);
    const shuffledWords = [...words].sort(() => 0.5 - Math.random());
    const selectedWords = shuffledWords.slice(0, numWords);

    materialsRef.current.texts = [];

    selectedWords.forEach((word) => {
      const textMesh = new (Text as unknown as { new (): FloatingTextMesh })();
      textMesh.text = word;
      textMesh.fontSize = 0.4 + Math.random() * 0.5;
      textMesh.color = palette[Math.floor(Math.random() * palette.length)];
      
      textMesh.outlineWidth = isDark ? 0.02 : 0.03;
      textMesh.outlineColor = isDark ? '#ffffff' : '#f8fafc';
      textMesh.outlineOpacity = isDark ? 0.4 : 0.9;
      
      textMesh.anchorX = 'center';
      textMesh.anchorY = 'middle';

      // 地球の近傍を避けて配置
      let validPosition = false;
      let x = 0, y = 0, z = 0;
      while (!validPosition) {
        x = (Math.random() - 0.5) * 16;
        y = (Math.random() - 0.5) * 10;
        z = (Math.random() - 0.5) * 6 - 2;

        const distToEarth = Math.sqrt(
          Math.pow(x - earthCenter.x, 2)
          + Math.pow(y - earthCenter.y, 2)
          + Math.pow(z - earthCenter.z, 2)
        );
        if (distToEarth > earthRadius + 1.2) validPosition = true; 
      }

      textMesh.position.set(x, y, z);
      textMesh.userData = { baseX: x, baseY: y, phase: Math.random() * Math.PI * 2, speed: 0.2 + Math.random() * 0.4 };

      textMesh.sync();
      textGroup.add(textMesh);
      materialsRef.current.texts.push(textMesh);
    });

    // ==========================================
    // 4. 空気感のパーティクル
    // ==========================================
    const particleCount = prefersReducedMotion ? 100 : (isMobile ? 150 : 250);
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pPos[i*3] = (Math.random() - 0.5) * 20;
      pPos[i*3+1] = (Math.random() - 0.5) * 20;
      pPos[i*3+2] = (Math.random() - 0.5) * 10;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.05,
      color: 0xffffff,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending, 
    });
    const particles = new THREE.Points(pGeo, pMat);
    mainGroup.add(particles);

    // ==========================================
    // 5. Lights
    // ==========================================
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);
    
    // 地球を綺麗に照らすディレクショナルライト
    const dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    // ----------------------------------------------
    // Interaction & Animation
    // ----------------------------------------------
    const handleMouseMove = (event: MouseEvent) => {
      targetRotationRef.current = {
        x: (event.clientX / width) * 2 - 1,
        y: -(event.clientY / height) * 2 + 1,
      };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    const clock = new THREE.Clock();
    let animationFrameId: number;
    let flightTime = 0;

    const getFlightPath = (t: number) => {
      // 地球の周囲を大きくゆったりと飛ぶ軌道 (ローカル座標系)
      const scaleX = isMobile ? 2.5 : 3.2;
      const scaleY = isMobile ? 1.0 : 1.2;
      const scaleZ = isMobile ? 2.5 : 3.2;
      const x = Math.sin(t * 0.4) * scaleX;
      const y = Math.sin(t * 0.7) * scaleY;
      const z = Math.cos(t * 0.4) * scaleZ;
      return new THREE.Vector3(x, y, z);
    };

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // テキストは常にカメラに向ける
      materialsRef.current.texts.forEach(mesh => mesh.quaternion.copy(camera.quaternion));

      if (!prefersReducedMotion) {
        // パララックス
        mainGroup.rotation.x += (targetRotationRef.current.y * 0.05 - mainGroup.rotation.x) * 0.05;
        mainGroup.rotation.y += (targetRotationRef.current.x * 0.05 - mainGroup.rotation.y) * 0.05;
        
        // 地球の自転
        earthGroup.rotation.y = time * 0.05;

        // タイポグラフィの浮遊
        materialsRef.current.texts.forEach(mesh => {
          mesh.position.y = mesh.userData.baseY + Math.sin(time * mesh.userData.speed + mesh.userData.phase) * 0.4;
          mesh.position.x = mesh.userData.baseX + Math.cos(time * mesh.userData.speed * 0.8 + mesh.userData.phase) * 0.2;
        });

        // パーティクル
        particles.rotation.y = time * 0.015;

        // 飛行機と軌跡
        flightTime += delta;
        const currentPos = getFlightPath(flightTime);
        const nextPos = getFlightPath(flightTime + 0.1);
        
        airplane.position.copy(currentPos);
        airplane.lookAt(nextPos);
        const dx = nextPos.x - currentPos.x;
        airplane.rotateZ(-dx * 1.5); // バンク

        // 軌跡の更新 (ローカル座標)
        for (let i = trailMaxLen - 1; i > 0; i--) {
            trailPositions[i * 3] = trailPositions[(i - 1) * 3];
            trailPositions[i * 3 + 1] = trailPositions[(i - 1) * 3 + 1];
            trailPositions[i * 3 + 2] = trailPositions[(i - 1) * 3 + 2];
        }
        trailPositions[0] = airplane.position.x;
        trailPositions[1] = airplane.position.y;
        trailPositions[2] = airplane.position.z;
        trailGeo.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      isDisposed = true;
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      
      if (mountElement.contains(renderer.domElement)) {
        mountElement.removeChild(renderer.domElement);
      }
      
      earthGeo.dispose();
      earthWireGeo.dispose();
      atmosGeo.dispose();
      airplaneGeo.dispose();
      trailGeo.dispose();
      pGeo.dispose();
      
      if (materialsRef.current.earth) materialsRef.current.earth.dispose();
      if (materialsRef.current.earthWire) materialsRef.current.earthWire.dispose();
      if (materialsRef.current.atmos) materialsRef.current.atmos.dispose();
      if (materialsRef.current.airplane) materialsRef.current.airplane.dispose();
      if (materialsRef.current.trail) materialsRef.current.trail.dispose();
      pMat.dispose();
      
      if (earthTextureFromFile) earthTextureFromFile.dispose();
      if (fallbackTexture) fallbackTexture.dispose();
      renderer.dispose();
      materialsRef.current.texts.forEach(mesh => mesh.dispose());
    };
  }, [words, palette]); // 初期化用（マウント時）

  // テーマ変更時のプロパティ更新
  useEffect(() => {
    const isDark = theme === 'dark';
    if (sceneRef.current) {
      sceneRef.current.fog = new THREE.FogExp2(isDark ? 0x0f172a : 0xf8fafc, 0.015);
    }
    
    if (materialsRef.current.atmos) {
      materialsRef.current.atmos.color.setHex(isDark ? 0x0ea5e9 : 0x38bdf8);
    }
    if (materialsRef.current.earth) {
      materialsRef.current.earth.emissive.setHex(isDark ? 0x0ea5e9 : 0x38bdf8);
      materialsRef.current.earth.emissiveIntensity = isDark ? 0.2 : 0.12;
    }
    if (materialsRef.current.earthWire) {
      materialsRef.current.earthWire.color.setHex(isDark ? 0x93c5fd : 0x1d4ed8);
      materialsRef.current.earthWire.opacity = isDark ? 0.22 : 0.18;
    }
    if (materialsRef.current.airplane) {
      materialsRef.current.airplane.emissive.setHex(isDark ? 0x2dd4bf : 0x0ea5e9);
    }
    if (materialsRef.current.trail) {
      materialsRef.current.trail.color.setHex(isDark ? 0x2dd4bf : 0x0ea5e9);
    }

    materialsRef.current.texts.forEach(mesh => {
      mesh.outlineColor = isDark ? '#ffffff' : '#f8fafc';
      mesh.outlineOpacity = isDark ? 0.4 : 0.9;
      mesh.outlineWidth = isDark ? 0.02 : 0.03;
      mesh.sync();
    });
  }, [theme]);


  return (
  <div ref={mountRef} className="fixed inset-0 z-0 pointer-events-none opacity-80" aria-hidden="true">
    {/* 2枚目の地球(画像)は消して、光だけにする */}
    <div
      style={{
        position: 'absolute',
        right: '7%',
        top: '50%',
        transform: 'translateY(-50%)',
        width: 'min(42vw, 320px)',
        aspectRatio: '1 / 1',
        borderRadius: '9999px',
        background: isDark
          ? 'radial-gradient(circle at 30% 25%, rgba(34,211,238,0.25) 0%, rgba(34,211,238,0) 55%), radial-gradient(circle at 65% 65%, rgba(52,211,153,0.18) 0%, rgba(52,211,153,0) 60%)'
          : 'radial-gradient(circle at 30% 25%, rgba(6,182,212,0.18) 0%, rgba(6,182,212,0) 55%), radial-gradient(circle at 65% 65%, rgba(52,211,153,0.14) 0%, rgba(52,211,153,0) 60%)',
        filter: 'blur(6px)',
        opacity: 0.9,
      }}
    />
    <div
      style={{
        position: 'absolute',
        right: '7%',
        top: '50%',
        transform: 'translateY(-50%)',
        width: 'min(42vw, 320px)',
        aspectRatio: '1 / 1',
        borderRadius: '9999px',
        border: `1px solid ${isDark ? 'rgba(148,163,184,0.18)' : 'rgba(15,23,42,0.10)'}`,
        opacity: 0.35,
      }}
    />
  </div>
);
}

// ==========================================
// Main Layout
// ==========================================

export default function App() {

  const [lang, setLang] = useState<Language>('ja');
  // デフォルトをライトモードに変更
  const [theme, setTheme] = useState<Theme>('light');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState('hero');
  const [modalData, setModalData] = useState<Project | null>(null);
  const mainRef = useRef<HTMLElement>(null);
  const [navElevated, setNavElevated] = useState(false);

  useEffect(() => {
    // CSS変数テーマ切替（style内の :root[data-theme='dark'] が効く）
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;

    const onScroll = () => setNavElevated(el.scrollTop > 8);
    onScroll();

    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);
  const t = translations[lang];
  const isDark = theme === 'dark';

  // Tailwind utility classes are used in this file; load Play CDN when local Tailwind is unavailable.
  useEffect(() => {
    if (document.querySelector('script[data-tailwind-play]')) return;

    window.tailwind = window.tailwind ?? {};
    window.tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['"Manrope"', '"Noto Sans JP"', 'sans-serif'],
            display: ['"Archivo Black"', '"Manrope"', '"Noto Sans JP"', 'sans-serif'],
            mono: ['"JetBrains Mono"', '"IBM Plex Mono"', 'monospace'],
          },
        },
      },
    };

    const script = document.createElement('script');
    script.src = 'https://cdn.tailwindcss.com?plugins=line-clamp';
    script.defer = true;
    script.dataset.tailwindPlay = 'true';
    document.head.appendChild(script);
  }, []);

  // Intersection Observer
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -70% 0px', 
      threshold: 0
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSectionId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    SECTIONS.forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToContact = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  const scrollToProjects = () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  // テーマベースのスタイル定義
const styles = {
  bg: "bg-[radial-gradient(900px_circle_at_20%_10%,var(--bgGlow)_0%,transparent_60%),radial-gradient(900px_circle_at_80%_20%,var(--bgGlow2)_0%,transparent_60%),linear-gradient(135deg,var(--bg0),var(--bg1),var(--bg2))] text-[color:var(--text)]",
  heading: "text-[color:var(--text)]",
  subtext: "text-[color:var(--muted)]",
  muted: "text-[color:var(--muted2)]",

  card:
    "glass-card bg-[color:var(--surface)] border border-[color:var(--border)] " +
    "shadow-[0_18px_60px_var(--shadow)] transition-all duration-500 " +
    "hover:-translate-y-1 hover:border-[color:var(--borderStrong)] hover:shadow-[0_26px_84px_var(--shadow)]",

  iconBox: "chip-surface bg-[color:var(--chip)] text-[color:var(--text)]",
  tag: "chip-surface bg-[color:var(--chip)] border border-[color:var(--border)] text-[color:var(--text)]",

  solidBtn:
    "bg-gradient-to-r from-[color:var(--accent)] to-[color:var(--accent2)] " +
    "text-[color:var(--onAccent)] shadow-[0_14px_34px_var(--accentShadow)] " +
    "hover:brightness-110 btn-primary",

  outlineBtn:
    "bg-[color:var(--surfaceSoft)] border border-[color:var(--border)] " +
    "text-[color:var(--text)] hover:bg-[color:var(--surfaceStrong)] btn-secondary",
};

  return (
    <div className={`${styles.bg} font-sans selection:bg-emerald-500/30 selection:text-white relative transition-colors duration-700`}>
      
      {/* 3D 背景 */}
      <Background3D words={GREETINGS} palette={PASTEL_PALETTE} theme={theme} />
      <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden" aria-hidden="true">
        <div className="noise-layer absolute inset-0 opacity-40" />
        <div className={`orbital-ring orbital-ring-lg ${isDark ? 'border-cyan-200/20' : 'border-sky-500/25'}`} />
        <div className={`orbital-ring orbital-ring-sm ${isDark ? 'border-emerald-200/25' : 'border-emerald-500/25'}`} />
        <div className={`floating-beam absolute -top-44 left-1/2 -translate-x-1/2 w-[44rem] h-[14rem] rounded-full blur-3xl ${isDark ? 'bg-cyan-400/15' : 'bg-cyan-300/35'}`} />
        <div className={`floating-beam floating-beam-reverse absolute bottom-[-8rem] right-[-9rem] w-[32rem] h-[22rem] rounded-full blur-3xl ${isDark ? 'bg-emerald-400/15' : 'bg-emerald-300/35'}`} />
        <div className={`absolute -bottom-40 -left-32 w-[34rem] h-[34rem] rounded-full blur-3xl ${isDark ? 'bg-emerald-400/10' : 'bg-emerald-300/25'}`} />
      </div>

      <TopNav
        lang={lang}
        theme={theme}
        isElevated={navElevated}
        isMenuOpen={isMenuOpen}
        onToggleLang={() => setLang(l => l === 'en' ? 'ja' : 'en')}
        onToggleTheme={toggleTheme}
        onToggleMenu={() => setIsMenuOpen(open => !open)}
      />

      <MenuOverlay
        isOpen={isMenuOpen}
        sections={SECTIONS}
        labels={t.sections}
        theme={theme}
        onClose={() => setIsMenuOpen(false)}
      />

      <SectionIndicator activeSectionId={activeSectionId} sections={SECTIONS} theme={theme} />

      <main ref={mainRef} className="relative z-10 w-full h-screen overflow-y-auto overflow-x-hidden snap-y snap-proximity scroll-smooth">
        
        {/* HERO SECTION */}
        <section id="hero" className="min-h-screen w-full flex items-center px-6 md:px-16 snap-start relative pt-20">
          <div className="max-w-5xl w-full mx-auto relative z-10 reveal-up">
            <div className={`absolute -top-20 -left-20 w-64 h-64 blur-[100px] rounded-full pointer-events-none ${isDark ? 'bg-cyan-500/10' : 'bg-cyan-300/40'}`} />
            <p className={`section-kicker font-bold font-mono text-sm tracking-widest mb-6 inline-flex items-center gap-2 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>
              <Globe2 size={14} aria-hidden="true" /> {t.hero.role.toUpperCase()}
            </p>
            <h1 className={`display-title text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-8 leading-[1.03] tracking-[-0.04em] drop-shadow-lg ${styles.heading}`}>
              <span className="block">{t.hero.titleLine1}</span>
              <span className="block bg-gradient-to-r from-[color:var(--accent)] to-[color:var(--accent2)] bg-clip-text text-transparent">
                {t.hero.titleLine2}
              </span>
            </h1>
            
            <div className="flex flex-wrap gap-3 mb-12">
              {t.hero.summary.map(tag => (
                <span key={tag} className={`px-4 py-2 rounded-full text-sm font-bold shadow-sm backdrop-blur-md border ${styles.tag}`}>
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={scrollToProjects}
                className={`px-8 py-4 font-bold rounded-2xl transition-all flex items-center justify-center gap-2 group focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:outline-none shadow-lg ${styles.solidBtn}`}
              >
                {t.hero.ctaProjects} <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform" />
              </button>
              <button 
                onClick={scrollToContact}
                className={`px-8 py-4 font-bold rounded-2xl transition-all flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:outline-none backdrop-blur-md shadow-sm border ${styles.outlineBtn}`}
              >
                {t.hero.ctaContact} <Mail size={18} />
              </button>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="min-h-screen w-full flex items-center px-6 md:px-16 snap-start py-24">
          <div className="max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
            <div className={`reveal-up relative aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden shadow-xl group border ${isDark ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-white'}`}>
              <div className={`absolute inset-0 z-10 ${isDark ? 'bg-gradient-to-t from-black/60 via-transparent to-transparent' : 'bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent'}`} />
              <img
                src="/me.png"
                alt="Kousei Kudou portrait"
                className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute bottom-6 left-6 z-20 flex gap-4">
                <a href={PROFILE_LINKS.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={`p-3 rounded-full backdrop-blur-md shadow-lg transition-colors focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:outline-none
                  ${isDark ? 'bg-white/20 hover:bg-cyan-500 text-white hover:text-slate-900' : 'bg-white hover:bg-cyan-500 text-slate-700 hover:text-white'}`}>
                  <Github size={20} />
                </a>
                <a href={PROFILE_LINKS.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter" className={`p-3 rounded-full backdrop-blur-md shadow-lg transition-colors focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:outline-none
                  ${isDark ? 'bg-white/20 hover:bg-cyan-500 text-white hover:text-slate-900' : 'bg-white hover:bg-cyan-500 text-slate-700 hover:text-white'}`}>
                  <Twitter size={20} />
                </a>
              </div>
            </div>
            
            <div className={`section-shell reveal-up backdrop-blur-xl p-8 rounded-3xl transition-colors duration-700 border ${styles.card}`}>
              <div className="flex items-center gap-4 mb-8">
                <span className="h-px w-12 bg-cyan-500" />
                <h2 className={`text-xs font-bold font-mono tracking-[0.3em] uppercase ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>{t.sections.about}</h2>
              </div>
              <h3 className={`display-title text-4xl md:text-5xl font-black mb-8 ${styles.heading}`}>{t.about.title}</h3>
              <p className={`text-lg md:text-xl leading-relaxed ${styles.subtext}`}>
                {t.about.desc}
              </p>
            </div>
          </div>
        </section>

        {/* RESEARCH SECTION */}
        <section id="research" className="min-h-screen w-full px-6 md:px-16 snap-start py-24">
          <div className="max-w-6xl w-full mx-auto relative z-10 section-shell rounded-[2rem] px-4 py-6 md:px-10 md:py-10">
            <div className="mb-16 md:mb-20">
              <div className="flex items-center gap-4 mb-4">
                <span className="h-px w-12 bg-sky-500" />
                <h2 className={`text-xs font-bold font-mono tracking-[0.3em] uppercase ${isDark ? 'text-sky-300' : 'text-sky-700'}`}>{t.sections.research}</h2>
              </div>
              <h3 className={`display-title text-4xl md:text-6xl font-black mb-6 drop-shadow-sm ${styles.heading}`}>RESEARCH</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {researchData.map((item, index) => (
                <div
                  key={item.id}
                  className={`reveal-up backdrop-blur-md rounded-3xl overflow-hidden transition-all group flex flex-col h-full border ${styles.card}`}
                  style={{ animationDelay: `${index * 90}ms` }}
                >
                  
                  {item.image && (
                    <div className={`w-full h-48 md:h-56 overflow-hidden relative border-b shrink-0 ${isDark ? 'border-white/10' : 'border-slate-100'}`}>
                      <div className="absolute inset-0 bg-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />
                      <img 
                        src={item.image} 
                        alt={item.title[lang]} 
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                    </div>
                  )}

                  <div className="p-6 md:p-8 flex flex-col flex-grow">
                    <div className="flex flex-col md:flex-row md:items-start justify-between mb-4 gap-4">
                      <h4 className={`text-2xl font-black transition-colors ${styles.heading} ${isDark ? 'group-hover:text-emerald-300' : 'group-hover:text-emerald-600'}`}>{item.title[lang]}</h4>
                      <span className={`text-sm font-bold font-mono px-3 py-1 rounded-full whitespace-nowrap w-fit shrink-0 border
                        ${isDark ? 'text-emerald-200 bg-emerald-500/30 border-emerald-500/50' : 'text-emerald-700 bg-emerald-100 border-emerald-200'}`}>
                        {item.date[lang]}
                      </span>
                    </div>
                    <p className={`text-sm mb-4 font-bold font-mono ${styles.muted}`}>{item.conference[lang]}</p>
                    <p className={`mb-6 leading-relaxed flex-grow ${styles.subtext}`}>{item.desc[lang]}</p>
                    
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {item.tags.map(tag => (
                        <span key={tag} className={`text-xs font-semibold px-3 py-1 rounded-full border ${styles.tag}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="min-h-screen w-full px-6 md:px-16 snap-start py-24">
          <div className="max-w-6xl w-full mx-auto relative z-10 section-shell rounded-[2rem] px-4 py-6 md:px-10 md:py-10">
            <div className={`backdrop-blur-xl p-8 rounded-3xl inline-block border mb-16 md:mb-20 reveal-up ${styles.card}`}>
              <div className="flex items-center gap-4 mb-4">
                <span className="h-px w-12 bg-cyan-500" />
                <h2 className={`text-xs font-bold font-mono tracking-[0.3em] uppercase ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>{t.sections.projects}</h2>
              </div>
              <h3 className={`display-title text-4xl md:text-6xl font-black mb-4 ${styles.heading}`}>SELECTED WORKS</h3>
              <p className={`max-w-2xl text-lg ${styles.subtext}`}>{t.projects.desc}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {projectsData.map((project, index) => (
                <button
                  key={project.id}
                  onClick={() => setModalData(project)}
                  className={`reveal-up group text-left flex flex-col h-full relative overflow-hidden rounded-3xl backdrop-blur-md p-6 md:p-8 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:outline-none border ${styles.card}`}
                  style={{ animationDelay: `${index * 70}ms` }}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className={`p-3 rounded-2xl transition-colors ${styles.iconBox} ${isDark ? 'group-hover:bg-cyan-500/30 group-hover:text-cyan-300' : 'group-hover:bg-cyan-100 group-hover:text-cyan-600'}`}>
                      <Layers size={24} />
                    </div>
                    <span className={`text-xs font-bold font-mono uppercase tracking-widest px-3 py-1 rounded-full border ${styles.tag}`}>
                      {project.category[lang]}
                    </span>
                  </div>
                  
                  {project.image && (
                    <div className={`w-full h-40 md:h-48 mb-6 rounded-xl overflow-hidden relative shadow-inner border ${isDark ? 'border-white/5' : 'border-slate-100'}`}>
                      <div className="absolute inset-0 bg-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />
                      <img 
                        src={project.image} 
                        alt={project.title[lang]} 
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                    </div>
                  )}

                  <h4 className={`text-2xl font-black mb-3 transition-colors ${styles.heading} ${isDark ? 'group-hover:text-cyan-300' : 'group-hover:text-cyan-600'}`}>
                    {project.title[lang]}
                  </h4>
                  <p className={`text-sm mb-6 flex-grow line-clamp-3 ${styles.subtext}`}>
                    {project.desc[lang]}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                     {project.tech.slice(0, 3).map(t => (
                        <span key={t} className={`text-xs font-semibold px-2 py-1 rounded border ${styles.tag}`}>
                          {t}
                        </span>
                     ))}
                     {project.tech.length > 3 && <span className={`text-xs font-bold ${styles.muted}`}>...</span>}
                  </div>

                  <div className={`mt-auto pt-4 border-t flex items-center justify-between text-sm font-bold transition-colors ${isDark ? 'border-white/10 text-slate-400 group-hover:text-cyan-400' : 'border-slate-100 text-slate-500 group-hover:text-cyan-600'}`}>
                    <span>{t.details}</span>
                    <ChevronRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* INTERNSHIPS SECTION */}
        <section id="internships" className="min-h-screen w-full px-6 md:px-16 snap-start py-24">
          <div className="max-w-4xl w-full mx-auto relative z-10 section-shell rounded-[2rem] px-4 py-6 md:px-10 md:py-10">
            <div className={`backdrop-blur-xl p-8 rounded-3xl inline-block border mb-16 md:mb-20 reveal-up ${styles.card}`}>
              <div className="flex items-center gap-4 mb-4">
                <span className="h-px w-12 bg-emerald-500" />
                <h2 className={`text-xs font-bold font-mono tracking-[0.3em] uppercase ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>{t.sections.internships}</h2>
              </div>
              <h3 className={`display-title text-4xl md:text-6xl font-black mb-4 ${styles.heading}`}>EXPERIENCE</h3>
              <p className={`text-lg ${styles.subtext}`}>{t.internships.desc}</p>
            </div>

            <div className="space-y-6">
              {internExperiences.map((intern, index) => (
                <div 
                  key={intern.id} 
                  className="reveal-up relative pl-8 md:pl-0"
                  style={{ animationDelay: `${index * 90}ms` }}
                >
                  <div className={`hidden md:block absolute left-[120px] top-0 bottom-[-24px] w-px ${isDark ? 'bg-white/20' : 'bg-slate-300'}`} />
                  
                  <div className="md:flex gap-12 items-start relative group">
                    <div className={`absolute left-[-36px] md:left-[116px] top-6 w-3 h-3 rounded-full transition-transform group-hover:scale-150 ${isDark ? 'bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.6)]' : 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.6)]'}`} />
                    
                    <div className="hidden md:block w-24 flex-shrink-0 pt-4 text-right">
                      <span className={`text-xs font-bold font-mono tracking-widest block ${styles.muted}`}>
                      <PeriodStack period={intern.period[lang]} />
                    </span>
                    </div>

                    <div className={`flex-grow backdrop-blur-md rounded-3xl p-6 md:p-8 transition-all border ${styles.card} ${isDark ? 'hover:border-emerald-400/50' : 'hover:border-emerald-400'}`}>
                      <div className="md:hidden mb-4">
                        
                        <span className={`text-xs font-bold font-mono tracking-widest ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
  <PeriodStack period={intern.period[lang]} />
</span>
                      </div>
                      <h4 className={`text-2xl font-black mb-4 ${styles.heading}`}>{intern.company[lang]}</h4>
                      <p className={`leading-relaxed mb-6 ${styles.subtext}`}>{intern.summary[lang]}</p>
                      <div className="flex flex-wrap gap-2">
                        {intern.tech.map(tech => (
                          <span key={tech} className={`px-3 py-1 rounded-full text-xs font-bold border 
                            ${isDark ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-200' : 'bg-emerald-50 border-emerald-100 text-emerald-700'}`}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* OTHERS SECTION */}
        <section id="others" className="min-h-screen w-full flex items-center px-6 md:px-16 snap-start py-24">
          <div className="max-w-5xl w-full mx-auto relative z-10 section-shell rounded-[2rem] px-4 py-6 md:px-10 md:py-10">
            <div className="mb-16 md:mb-20">
              <div className="flex items-center gap-4 mb-4">
                <span className="h-px w-12 bg-emerald-500" />
                <h2 className={`text-xs font-bold font-mono tracking-[0.3em] uppercase ${isDark ? 'text-emerald-300' : 'text-emerald-700'}`}>{t.sections.others}</h2>
              </div>
              <h3 className={`display-title text-4xl md:text-6xl font-black mb-6 drop-shadow-sm ${styles.heading}`}>OTHERS</h3>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {othersData.map((item, index) => (
                <a 
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`reveal-up block backdrop-blur-md p-6 rounded-3xl transition-all duration-300 group focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none border hover:-translate-y-2
                    ${styles.card} ${isDark ? 'hover:border-emerald-400/50' : 'hover:border-emerald-300'}`}
                  style={{ animationDelay: `${index * 90}ms` }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className={`text-xs font-bold font-mono px-2 py-1 rounded border
                      ${isDark ? 'text-emerald-300 bg-emerald-500/20 border-emerald-500/30' : 'text-emerald-700 bg-emerald-100 border-emerald-200'}`}>
                      {item.category[lang]}
                    </span>
                    <ExternalLink size={16} className={`transition-colors ${isDark ? 'text-slate-500 group-hover:text-emerald-400' : 'text-slate-400 group-hover:text-emerald-500'}`} />
                  </div>
                  <h4 className={`text-lg font-black mb-4 transition-colors ${styles.heading} ${isDark ? 'group-hover:text-emerald-300' : 'group-hover:text-emerald-600'}`}>{item.title[lang]}</h4>
                  <span className={`text-xs font-bold font-mono ${styles.muted}`}>{item.date[lang]}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="min-h-screen w-full flex items-center justify-center px-6 md:px-16 snap-start py-24 relative overflow-hidden">
          <div className={`absolute inset-0 pointer-events-none ${isDark ? 'bg-gradient-to-t from-emerald-900/30 via-cyan-900/20 to-transparent' : 'bg-gradient-to-t from-emerald-100/55 via-sky-100/50 to-transparent'}`} />
          
          <div className={`max-w-2xl w-full text-center relative z-10 backdrop-blur-xl p-8 md:p-16 rounded-[3rem] shadow-2xl border reveal-up section-shell ${isDark ? 'bg-slate-900/60 border-white/10' : 'bg-white/80 border-slate-200 shadow-emerald-900/10'}`}>
            <div className="mb-8 flex justify-center">
               <div className={`w-20 h-20 rounded-full flex items-center justify-center shadow-inner border
                 ${isDark ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-emerald-100 text-emerald-700 border-emerald-200'}`}>
                  <Globe2 size={32} />
               </div>
            </div>
            <h2 className={`display-title text-4xl md:text-6xl font-black mb-6 ${styles.heading}`}>{t.contactSection.title}</h2>
            <p className={`text-xl mb-10 font-medium ${styles.subtext}`}>{t.contactSection.subtitle}</p>
            
            <a 
              href={`mailto:${PROFILE_LINKS.email}`} 
              className={`inline-flex items-center gap-3 px-8 py-4 font-black rounded-full transition-all hover:-translate-y-1 focus-visible:ring-4 focus-visible:ring-emerald-500 focus-visible:outline-none shadow-lg shadow-emerald-500/30
                ${isDark ? 'bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-slate-950' : 'bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600 text-white'}`}
            >
              {PROFILE_LINKS.email} <ExternalLink size={18} />
            </a>

            <div className={`mt-16 flex flex-col sm:flex-row justify-center gap-6 border-t pt-12 ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
              <a 
                href={PROFILE_LINKS.github} 
                target="_blank" 
                rel="noreferrer"
                aria-label="GitHub" 
                className={`flex items-center justify-center gap-4 px-8 py-4 rounded-2xl shadow-sm transition-all hover:-translate-y-1 focus-visible:ring-2 focus-visible:outline-none group border
                  ${isDark ? 'bg-white/5 hover:bg-white/10 border-white/10 text-white focus-visible:ring-white' : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-800 focus-visible:ring-slate-400'}`}
              >
                <Github size={32} className="group-hover:scale-110 transition-transform" />
                <span className="font-black text-lg tracking-widest">GitHub</span>
              </a>
              <a 
                href={PROFILE_LINKS.twitter} 
                target="_blank" 
                rel="noreferrer"
                aria-label="Twitter" 
                className={`flex items-center justify-center gap-4 px-8 py-4 rounded-2xl shadow-sm transition-all hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-[#1DA1F2] focus-visible:outline-none group border
                  ${isDark ? 'bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 border-[#1DA1F2]/20 text-[#1DA1F2]' : 'bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 border-[#1DA1F2]/20 text-[#1DA1F2]'}`}
              >
                <Twitter size={32} className="group-hover:scale-110 transition-transform" />
                <span className="font-black text-lg tracking-widest">Twitter</span>
              </a>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className={`w-full text-center py-8 text-xs font-bold font-mono pb-24 snap-end ${styles.muted}`}>
          <p>&copy; {new Date().getFullYear()} KOUSEI KUDOU. All rights reserved.</p>
        </footer>

      </main>

      <DetailModal
        isOpen={!!modalData}
        onClose={() => setModalData(null)}
        data={modalData}
        lang={lang}
        theme={theme}
        t={t}
      />

      <style>{`
        :root {
          font-family: "Manrope", "Noto Sans JP", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          --fontDisplay: "Archivo Black", "Manrope", "Noto Sans JP", sans-serif;

          /* light */
          --onAccent: #ffffff;
          --bg0: #f7fbff;
          --bg1: #e9f6ff;
          --bg2: #eefbf5;
          --bgGlow: rgba(6, 182, 212, 0.18);
          --bgGlow2: rgba(52, 211, 153, 0.16);

          --surfaceSoft: rgba(255, 255, 255, 0.55);
          --surface: rgba(255, 255, 255, 0.72);
          --surfaceStrong: rgba(255, 255, 255, 0.92);
          --chip: rgba(255, 255, 255, 0.62);

          --text: #0f172a;
          --muted: #334155;
          --muted2: #64748b;

          --border: rgba(15, 23, 42, 0.10);
          --borderStrong: rgba(6, 182, 212, 0.32);

          --shadow: rgba(2, 6, 23, 0.12);
          --accent: #06b6d4;
          --accent2: #34d399;
          --onAccent: #052f2e;
          --accentShadow: rgba(6, 182, 212, 0.22);

          color-scheme: light;
        }

        :root[data-theme='dark'] {
          --bg0: #020617;
          --bg1: #071a2d;
          --bg2: #022c22;
          --bgGlow: rgba(34, 211, 238, 0.16);
          --bgGlow2: rgba(52, 211, 153, 0.14);

          --surfaceSoft: rgba(2, 14, 27, 0.45);
          --surface: rgba(2, 14, 27, 0.62);
          --surfaceStrong: rgba(2, 14, 27, 0.80);
          --chip: rgba(255, 255, 255, 0.06);

          --text: #f8fafc;
          --muted: #cbd5e1;
          --muted2: #94a3b8;

          --border: rgba(148, 163, 184, 0.14);
          --borderStrong: rgba(34, 211, 238, 0.28);

          --shadow: rgba(0, 0, 0, 0.45);
          --accent: #22d3ee;
          --accent2: #34d399;
          --onAccent: #021826;
          --accentShadow: rgba(34, 211, 238, 0.22);

          color-scheme: dark;
        }

        body {
          margin: 0;
          background: linear-gradient(135deg, var(--bg0), var(--bg1), var(--bg2));
          color: var(--text);
          font-family: "Manrope", "Noto Sans JP", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          text-rendering: optimizeLegibility;
          line-height: 1.55;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .display-title {
          font-family: var(--fontDisplay);
          letter-spacing: -0.035em;
          text-wrap: balance;
        }

        .section-kicker {
          border: 1px solid var(--border);
          border-radius: 9999px;
          padding: 0.35rem 0.75rem;
          background: var(--surfaceSoft);
          backdrop-filter: blur(12px);
          box-shadow: 0 8px 24px var(--shadow);
        }

        .section-shell {
          position: relative;
          isolation: isolate;
        }

        .section-shell::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
          border: 1px solid var(--border);
          background:
            linear-gradient(125deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0) 42%) border-box;
          mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          opacity: 0.65;
        }

        .glass-card {
          backdrop-filter: blur(16px) saturate(135%);
          transform-origin: center;
        }

        .chip-surface {
          backdrop-filter: blur(10px) saturate(130%);
        }

        /* scrollbar */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: rgba(0,0,0,0.05); }
        :root[data-theme='dark'] ::-webkit-scrollbar-track { background: rgba(255,255,255,0.04); }

        ::-webkit-scrollbar-thumb {
          background: rgba(100, 116, 139, 0.55);
          border-radius: 4px;
        }
        :root[data-theme='dark'] ::-webkit-scrollbar-thumb {
          background: rgba(148, 163, 184, 0.35);
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(100, 116, 139, 0.75);
        }
        :root[data-theme='dark'] ::-webkit-scrollbar-thumb:hover {
          background: rgba(148, 163, 184, 0.5);
        }
        .btn-primary {
          background-image: linear-gradient(92deg, var(--accent), var(--accent2));
          color: var(--onAccent);
          box-shadow: 0 14px 34px var(--accentShadow);
          border: 1px solid rgba(255, 255, 255, 0.22);
        }

        .btn-primary:hover {
          filter: brightness(1.06);
          transform: translateY(-2px);
        }

        .btn-secondary {
          background: var(--surfaceSoft);
          border: 1px solid var(--border);
          color: var(--text);
          box-shadow: 0 10px 24px var(--shadow);
        }

        .btn-secondary:hover {
          background: var(--surfaceStrong);
          transform: translateY(-2px);
        }

        .noise-layer {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180' viewBox='0 0 180 180'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.045'%3E%3Ccircle cx='10' cy='10' r='1'/%3E%3Ccircle cx='120' cy='70' r='1'/%3E%3Ccircle cx='62' cy='142' r='1'/%3E%3Ccircle cx='170' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          background-size: 180px 180px;
          mix-blend-mode: soft-light;
        }

        .floating-beam {
          animation: beam-drift 16s ease-in-out infinite;
        }

        .floating-beam-reverse {
          animation-direction: reverse;
          animation-duration: 22s;
        }

        @keyframes beam-drift {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(0, -20px, 0) scale(1.06); }
        }

        .reveal-up {
          opacity: 0;
          transform: translate3d(0, 18px, 0) scale(0.99);
          animation: reveal-up 720ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        @keyframes reveal-up {
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
          }
        }

        .orbital-ring {
          position: absolute;
          border-width: 1px;
          border-style: solid;
          border-radius: 9999px;
          transform-origin: center;
          animation: orbital-spin 34s linear infinite;
        }
        .orbital-ring-lg {
          width: min(72vw, 760px);
          height: min(72vw, 760px);
          top: -12%;
          right: -18%;
        }
        .orbital-ring-sm {
          width: min(48vw, 500px);
          height: min(48vw, 500px);
          bottom: -10%;
          left: -14%;
          animation-duration: 24s;
          animation-direction: reverse;
        }

        @keyframes orbital-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }

        @keyframes scale-in { from { transform: scale(0.95) translateY(10px); opacity: 0; } to { transform: scale(1) translateY(0); opacity: 1; } }
        .animate-scale-in { animation: scale-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

        @media (prefers-reduced-motion: reduce) {
          .orbital-ring,
          .floating-beam,
          .reveal-up,
          .animate-fade-in,
          .animate-scale-in {
            animation: none !important;
          }

          .reveal-up {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </div>
  );
}
