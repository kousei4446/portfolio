import { useEffect, useRef, useState } from 'react';
import { Github, Twitter, Layers, Terminal, Maximize2, ChevronRight, MousePointer2 } from 'lucide-react';
import DetailModal from './components/DetailModal';
import FloatingPanel from './components/FloatingPanel';
import ImmersiveScene from './components/ImmersiveScene';
import { SECTIONS } from './constants/sections';
import { projectsData } from './data/projects';
import { translations } from './data/translations';
import type { Language, Project } from './types/portfolio';

// ==========================================
// Main Application
// ==========================================

export default function PortfolioImmersive() {
  const [activeSection, setActiveSection] = useState(0);
  const [lang, setLang] = useState<Language>('ja');
  const [modalData, setModalData] = useState<Project | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Wheel event for snap scrolling (Scroll Jacking)
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (modalData) return; // Disable scroll when modal is open

      if (scrollTimeout.current) return;

      if (e.deltaY > 50) {
        setActiveSection(prev => Math.min(prev + 1, SECTIONS.length - 1));
        scrollTimeout.current = setTimeout(() => { scrollTimeout.current = null; }, 1000);
      } else if (e.deltaY < -50) {
        setActiveSection(prev => Math.max(prev - 1, 0));
        scrollTimeout.current = setTimeout(() => { scrollTimeout.current = null; }, 1000);
      }
    };

    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, [modalData]);

  const t = translations[lang];
  const handleObjectClick = () => {
    // Interactive feedback handled in scene
    // Optionally open relevant info
    if (activeSection === 2 && !modalData) {
      setModalData(projectsData[0]); // Demo: open first project on click
    }
  };

  return (
    <div className="h-screen w-full bg-black text-white overflow-hidden font-sans selection:bg-cyan-500/30">

      {/* 1. The Immersive 3D Layer */}
      <ImmersiveScene sectionIndex={activeSection} onObjectClick={handleObjectClick} />

      {/* 2. Top Navigation (Minimal) */}
      <nav className="fixed top-0 w-full z-20 p-8 flex justify-between items-start pointer-events-none">
        <div className="pointer-events-auto">
          <div className="text-2xl font-black tracking-tighter flex flex-col">
            <span className="text-white mix-blend-difference">KUDOU</span>
            <span className="text-cyan-400 text-sm tracking-[0.3em] font-light">KOUSEI</span>
          </div>
        </div>

        <div className="flex gap-6 pointer-events-auto items-center">
          <button
            onClick={() => setLang(l => l === 'en' ? 'ja' : 'en')}
            className="text-xs font-bold tracking-widest hover:text-cyan-400 transition-colors opacity-70 hover:opacity-100"
          >
            {lang === 'en' ? 'JP' : 'EN'}
          </button>
          <div className="flex flex-col gap-2 group cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <div className={`w-8 h-[2px] bg-white transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <div className={`w-6 h-[2px] bg-white ml-auto transition-all ${isMenuOpen ? 'opacity-0' : ''}`} />
            <div className={`w-8 h-[2px] bg-white transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
          </div>
        </div>
      </nav>

      {/* Menu Overlay */}
      <div className={`fixed inset-0 bg-black/90 z-40 flex items-center justify-center transition-opacity duration-500 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col gap-8 text-center">
          {SECTIONS.map((sec, idx) => (
            <button
              key={sec}
              onClick={() => { setActiveSection(idx); setIsMenuOpen(false); }}
              className="text-4xl font-bold hover:text-cyan-400 transition-colors uppercase tracking-widest"
            >
              {sec}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Dynamic UI Content based on Section */}

      {/* SECTION INDICATOR (Right Side) */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-4 pointer-events-auto">
        {SECTIONS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveSection(idx)}
            className={`w-1 transition-all duration-300 ${activeSection === idx ? 'h-12 bg-cyan-400' : 'h-4 bg-white/20 hover:bg-white/50'}`}
          />
        ))}
      </div>

      {/* HERO CONTENT */}
      <div className={`fixed bottom-12 left-8 z-10 transition-all duration-1000 ${activeSection === 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20 pointer-events-none'}`}>
        <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 mb-2">
          INNOVATIVE
          <br />
          PORTFOLIO
        </h1>
        <p className="text-cyan-400 font-mono text-sm tracking-widest mb-8 flex items-center gap-2">
          <Terminal size={14} /> {t.role.toUpperCase()}
        </p>
        <div className="flex gap-4 text-xs text-gray-500 font-mono">
          <span className="flex items-center gap-1"><MousePointer2 size={12} /> INTERACT</span>
          <span className="flex items-center gap-1"><Maximize2 size={12} /> DRAG & SCROLL</span>
        </div>
      </div>

      {/* ABOUT PANEL (Floating) */}
      <FloatingPanel
        position="center-right"
        className={`max-w-md ${activeSection === 1 ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0 pointer-events-none'}`}
      >
        <h2 className="text-3xl font-bold mb-4 border-b border-white/10 pb-4">{t.about.title}</h2>
        <p className="text-lg leading-relaxed text-gray-300">
          {t.about.desc}
        </p>
        <div className="mt-6 flex gap-4">
          <Github className="text-gray-400 hover:text-white cursor-pointer transition-colors" />
          <Twitter className="text-gray-400 hover:text-white cursor-pointer transition-colors" />
        </div>
      </FloatingPanel>

      {/* PROJECTS LIST (Bottom Horizontal) */}
      <div className={`fixed bottom-0 left-0 w-full p-8 z-20 transition-all duration-700 ${activeSection === 2 ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}`}>
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {projectsData.map((project) => (
            <div
              key={project.id}
              onClick={() => setModalData(project)}
              className="flex-shrink-0 w-80 bg-gray-900/60 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:border-cyan-500/50 hover:bg-gray-800/80 transition-all cursor-pointer group hover:-translate-y-2"
            >
              <div className="flex justify-between items-start mb-4">
                <Layers className="text-cyan-400 group-hover:rotate-180 transition-transform duration-500" />
                <span className="text-xs text-gray-500 font-mono">{project.category}</span>
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-300">{project.title}</h3>
              <div className="flex items-center text-xs text-gray-400 gap-1 group-hover:gap-2 transition-all">
                {t.details} <ChevronRight size={12} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CONTACT (Centered Bottom) */}
      <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center transition-all duration-700 ${activeSection === 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}>
        <div className="bg-black/20 backdrop-blur-xl p-12 rounded-full border border-white/5 hover:border-cyan-500/30 transition-all group">
          <a href="mailto:e1922022@oit.ac.jp" className="block">
            <h2 className="text-4xl md:text-6xl font-black mb-2 group-hover:text-cyan-400 transition-colors">CONTACT ME</h2>
            <p className="text-xl text-gray-400">e1922022@oit.ac.jp / Osaka, Japan</p>
          </a>
        </div>
      </div>

      {/* Detail Modal */}
      <DetailModal
        isOpen={!!modalData}
        onClose={() => setModalData(null)}
        data={modalData}
      />

      {/* Global Styles for Animations */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }

        @keyframes scale-in { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .animate-scale-in { animation: scale-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
}
