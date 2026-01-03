import type { Language } from '../../shared/types/portfolio';

type TopNavProps = {
  lang: Language;
  isMenuOpen: boolean;
  onToggleLang: () => void;
  onToggleMenu: () => void;
};

export default function TopNav({ lang, isMenuOpen, onToggleLang, onToggleMenu }: TopNavProps) {
  return (
    <nav className="fixed top-0 w-full z-30 p-8 flex justify-between items-start pointer-events-none">
      <div className="pointer-events-auto">
        <div className="text-2xl font-black tracking-tighter flex flex-col">
          <span className="text-white mix-blend-difference">KUDOU</span>
          <span className="text-cyan-400 text-sm tracking-[0.3em] font-light">KOUSEI</span>
        </div>
      </div>

      <div className="flex gap-6 pointer-events-auto items-center">
        <button
          onClick={onToggleLang}
          className="text-xs font-bold tracking-widest hover:text-cyan-400 transition-colors opacity-70 hover:opacity-100"
        >
          {lang === 'en' ? 'JP' : 'EN'}
        </button>
        <div className="flex flex-col gap-2 group cursor-pointer" onClick={onToggleMenu}>
          <div className={`w-8 h-[2px] bg-white transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <div className={`w-6 h-[2px] bg-white ml-auto transition-all ${isMenuOpen ? 'opacity-0' : ''}`} />
          <div className={`w-8 h-[2px] bg-white transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
        </div>
      </div>
    </nav>
  );
}
