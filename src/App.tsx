import { useEffect, useRef, useState } from 'react';
import { Github, Twitter, Layers, Terminal, ChevronRight, MousePointer2 } from 'lucide-react';
import DetailModal from './components/DetailModal';
import FloatingPanel from './components/FloatingPanel';
import ImmersiveScene from './components/ImmersiveScene';
import { SECTIONS } from './constants/sections';
import { internExperiences } from './data/internExperience';
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
  const projectsScrollRef = useRef<HTMLDivElement>(null);
  const internshipsScrollRef = useRef<HTMLDivElement>(null);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartY = useRef<number | null>(null);

  // Wheel event for snap scrolling (Scroll Jacking)
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (modalData) return; // Disable scroll when modal is open
      const projectScrollEl = projectsScrollRef.current;
      if (activeSection === 2 && projectScrollEl && projectScrollEl.contains(e.target as Node)) {
        const canScrollDown = projectScrollEl.scrollTop + projectScrollEl.clientHeight < projectScrollEl.scrollHeight - 1;
        const canScrollUp = projectScrollEl.scrollTop > 0;
        if ((e.deltaY > 0 && canScrollDown) || (e.deltaY < 0 && canScrollUp)) return;
      }
      const internshipScrollEl = internshipsScrollRef.current;
      if (activeSection === 3 && internshipScrollEl && internshipScrollEl.contains(e.target as Node)) {
        const canScrollDown = internshipScrollEl.scrollTop + internshipScrollEl.clientHeight < internshipScrollEl.scrollHeight - 1;
        const canScrollUp = internshipScrollEl.scrollTop > 0;
        if ((e.deltaY > 0 && canScrollDown) || (e.deltaY < 0 && canScrollUp)) return;
      }

      if (scrollTimeout.current) return;

      if (e.deltaY > 50) {
        setActiveSection(prev => Math.min(prev + 1, SECTIONS.length - 1));
        scrollTimeout.current = setTimeout(() => { scrollTimeout.current = null; }, 650);
      } else if (e.deltaY < -50) {
        setActiveSection(prev => Math.max(prev - 1, 0));
        scrollTimeout.current = setTimeout(() => { scrollTimeout.current = null; }, 650);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (modalData) return;
      touchStartY.current = e.touches[0]?.clientY ?? null;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (modalData) return;
      const startY = touchStartY.current;
      touchStartY.current = null;
      if (startY === null) return;
      if (scrollTimeout.current) return;

      const endY = e.changedTouches[0]?.clientY ?? startY;
      const deltaY = startY - endY;
      if (Math.abs(deltaY) < 50) return;

      if (deltaY > 0) {
        setActiveSection(prev => Math.min(prev + 1, SECTIONS.length - 1));
      } else {
        setActiveSection(prev => Math.max(prev - 1, 0));
      }
      scrollTimeout.current = setTimeout(() => { scrollTimeout.current = null; }, 650);
    };

    window.addEventListener('wheel', handleWheel);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [activeSection, modalData]);

  const t = translations[lang];
  const handleObjectClick = () => {
    // Interactive feedback handled in scene
    // Optionally open relevant info
    if (activeSection === 2 && !modalData) {
      setModalData(projectsData[0]); // Demo: open first project on click
    }
  };

  const personalProjects = projectsData.filter(project => project.group === 'personal');
  const hackathonProjects = projectsData.filter(project => project.group === 'hackathon');

  return (
    <div className="h-screen w-full bg-black text-white overflow-hidden font-sans selection:bg-cyan-500/30">

      {/* 1. The Immersive 3D Layer */}
      <ImmersiveScene sectionIndex={activeSection} onObjectClick={handleObjectClick} clickTitle={t.hero.interact} />

      {/* 2. Top Navigation (Minimal) */}
      <nav className="fixed top-0 w-full z-30 p-8 flex justify-between items-start pointer-events-none">
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
      <div
        className={`fixed inset-0 bg-black/90 z-40 flex items-center justify-center transition-opacity duration-500 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMenuOpen(false)}
      >
        <div className="flex flex-col gap-8 text-center" onClick={(e) => e.stopPropagation()}>
          {SECTIONS.map((sec, idx) => (
            <button
              key={sec}
              onClick={() => { setActiveSection(idx); setIsMenuOpen(false); }}
              className="text-4xl font-bold hover:text-cyan-400 transition-colors uppercase tracking-widest"
            >
              {t.sections[sec]}
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
          {t.hero.titleLine1}
          <br />
          {t.hero.titleLine2}
        </h1>
        <p className="text-cyan-400 font-mono text-sm tracking-widest mb-8 flex items-center gap-2">
          <Terminal size={14} /> {t.role.toUpperCase()}
        </p>
        <div className="flex gap-4 text-xs text-gray-500 font-mono">
          <span className="flex items-center gap-1"><MousePointer2 size={12} /> {t.hero.interact}</span>
          <span className="flex items-center gap-1"><Terminal size={12} /> SCROLL</span>
        </div>
      </div>

      {/* ABOUT PANEL (Floating) */}
      <FloatingPanel
        position="center-right"
        className={`max-w-md md:max-w-3xl w-[calc(100vw-2rem)] md:w-auto ${activeSection === 1 ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0 pointer-events-none'}`}
      >
        <div className="md:flex md:items-start md:gap-6">
          <div className="mb-5 md:mb-0 md:w-1/2 overflow-hidden rounded-2xl border border-white/10 bg-black/40">
            <img
              src="/me.png"
              alt="About me"
              className="h-40 md:h-72 w-full object-contain bg-black/40"
              loading="lazy"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-4 border-b border-white/10 pb-4">{t.about.title}</h2>
            <p className="max-h-[42vh] md:max-h-[60vh] overflow-y-auto pr-2 text-base md:text-lg leading-relaxed text-gray-300 scrollbar-hide">
              {t.about.desc}
            </p>
          </div>
        </div>
        <div className="mt-6 flex gap-4">
          <a href="https://github.com/kousei4446/" target="_blank" rel="noopener noreferrer">
            <Github className="text-gray-400 hover:text-white cursor-pointer transition-colors" />
          </a>
          <a href="https://x.com/k8035004287922?s=11" target="_blank" rel="noopener noreferrer">
            <Twitter className="text-gray-400 hover:text-white cursor-pointer transition-colors" />
          </a>
        </div>
      </FloatingPanel>

      {/* PROJECTS LIST (Bold Vertical) */}
      <div className={`fixed inset-x-0 top-20 md:top-20 bottom-2 md:bottom-16 z-20 transition-all duration-700 ${activeSection === 2 ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}`}>
        <div className="relative h-full px-4 md:px-8">
          <div className="absolute -top-20 -left-10 h-48 w-48 rounded-full bg-cyan-500/20 blur-3xl" aria-hidden />
          <div className="absolute -bottom-10 right-10 h-64 w-64 rounded-full bg-fuchsia-500/20 blur-3xl" aria-hidden />

            <div className="flex items-end justify-between mb-4 md:mb-6">
              <div>
                <p className="text-xs tracking-[0.4em] text-cyan-300 uppercase">Portfolio</p>
                <h2 className="text-4xl md:text-7xl font-black tracking-tight text-white">PROJECTS</h2>
                <p className="text-sm text-gray-300 max-w-xs md:max-w-none">{t.projects.desc}</p>
              </div>
              <span className="text-xs font-mono text-cyan-300/80 border border-cyan-400/40 px-3 py-1 rounded-full uppercase tracking-widest">
                {t.sections.projects}
              </span>
            </div>

            <div ref={projectsScrollRef} className="h-[66vh] md:h-[62vh] overflow-y-auto pr-2 scrollbar-hide space-y-10">
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="h-1 w-10 bg-cyan-400" />
                <h3 className="text-lg font-semibold tracking-[0.2em] uppercase text-cyan-200">{t.projects.groupLabels.personal}</h3>
              </div>
                <div className="grid gap-6 md:grid-cols-2">
                {personalProjects.map((project) => (
                  <button
                    key={project.id}
                    onClick={() => setModalData(project)}
                    className="group text-left relative overflow-hidden rounded-3xl border border-cyan-400/30 bg-gradient-to-br from-cyan-500/10 via-black/40 to-fuchsia-500/10 p-6 shadow-[0_0_40px_rgba(0,255,255,0.15)] transition-transform hover:-translate-y-1"
                  >
                    <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-cyan-400/20 blur-2xl" aria-hidden />
                    <div className="flex items-center justify-between mb-4">
                      <Layers className="text-cyan-300 group-hover:rotate-180 transition-transform duration-500" />
                      <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">{project.category[lang]}</span>
                    </div>
                    {project.image ? (
                      <div className="mb-4 overflow-hidden rounded-2xl border border-white/10 bg-black/40">
                        <img
                          src={project.image}
                          alt={project.title[lang]}
                          className="h-40 w-full object-contain bg-black/40"
                          loading="lazy"
                        />
                      </div>
                    ) : null}
                      <h4 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-cyan-200">{project.title[lang]}</h4>
                    <p className="text-sm text-gray-300 line-clamp-3">{project.desc[lang]}</p>
                    {project.articles?.length ? (
                      <div className="mt-3 flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-widest text-cyan-200/80">
                        <span>{t.projects.articlesLabel}</span>
                        {project.articles.map((article, idx) => (
                          <span key={`${article.platform}-${idx}`} className="px-2 py-0.5 border border-cyan-400/30 rounded-full">
                            {article.platform}
                          </span>
                        ))}
                      </div>
                    ) : null}
                    <div className="mt-4 flex items-center text-xs text-cyan-200 gap-1 uppercase tracking-widest">
                      {t.details} <ChevronRight size={12} />
                    </div>
                  </button>
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="h-1 w-10 bg-fuchsia-400" />
                <h3 className="text-lg font-semibold tracking-[0.2em] uppercase text-fuchsia-200">{t.projects.groupLabels.hackathon}</h3>
              </div>
                <div className="grid gap-6 md:grid-cols-2">
                {hackathonProjects.map((project) => (
                  <button
                    key={project.id}
                    onClick={() => setModalData(project)}
                    className="group text-left relative overflow-hidden rounded-3xl border border-fuchsia-400/30 bg-gradient-to-br from-fuchsia-500/10 via-black/40 to-cyan-500/10 p-6 shadow-[0_0_40px_rgba(255,0,255,0.15)] transition-transform hover:-translate-y-1"
                  >
                    <div className="absolute -left-12 -bottom-12 h-24 w-24 rounded-full bg-fuchsia-400/20 blur-2xl" aria-hidden />
                    <div className="flex items-center justify-between mb-4">
                      <Layers className="text-fuchsia-300 group-hover:rotate-180 transition-transform duration-500" />
                      <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">{project.category[lang]}</span>
                    </div>
                    {project.image ? (
                      <div className="mb-4 overflow-hidden rounded-2xl border border-white/10 bg-black/40">
                        <img
                          src={project.image}
                          alt={project.title[lang]}
                          className="h-40 w-full object-contain bg-black/40"
                          loading="lazy"
                        />
                      </div>
                    ) : null}
                      <h4 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-fuchsia-200">{project.title[lang]}</h4>
                    <p className="text-sm text-gray-300 line-clamp-3">{project.desc[lang]}</p>
                    {project.articles?.length ? (
                      <div className="mt-3 flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-widest text-fuchsia-200/80">
                        <span>{t.projects.articlesLabel}</span>
                        {project.articles.map((article, idx) => (
                          <span key={`${article.platform}-${idx}`} className="px-2 py-0.5 border border-fuchsia-400/30 rounded-full">
                            {article.platform}
                          </span>
                        ))}
                      </div>
                    ) : null}
                    <div className="mt-4 flex items-center text-xs text-fuchsia-200 gap-1 uppercase tracking-widest">
                      {t.details} <ChevronRight size={12} />
                    </div>
                  </button>
                ))}
              </div>
            </section>
</div>
        </div>
      </div>

      {/* INTERNSHIPS (Bold Vertical) */}
      <div className={`fixed inset-x-0 top-20 md:top-20 bottom-2 md:bottom-16 z-20 transition-all duration-700 ${activeSection === 3 ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}`}>
        <div className="relative h-full px-4 md:px-8">
          <div className="absolute -top-20 right-10 h-56 w-56 rounded-full bg-emerald-400/20 blur-3xl" aria-hidden />
          <div className="absolute bottom-0 left-8 h-40 w-40 rounded-full bg-cyan-500/20 blur-3xl" aria-hidden />

            <div className="flex items-end justify-between mb-4 md:mb-6">
              <div>
                <p className="text-xs tracking-[0.4em] text-emerald-300 uppercase">Experience</p>
                <h2 className="text-4xl md:text-7xl font-black tracking-tight text-white">INTERNSHIPS</h2>
                <p className="text-sm text-gray-300 max-w-xs md:max-w-none">{t.internships.desc}</p>
              </div>
              <span className="text-xs font-mono text-emerald-300/80 border border-emerald-400/40 px-3 py-1 rounded-full uppercase tracking-widest">
                {t.sections.internships}
              </span>
            </div>

            <div ref={internshipsScrollRef} className="h-[66vh] md:h-[62vh] overflow-y-auto pr-2 scrollbar-hide space-y-6">
              {internExperiences.map((intern) => {
                const Card = (
                  <>
                    <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-emerald-400/20 blur-2xl" aria-hidden />
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-white">{intern.company[lang]}</h3>
                        <p className="text-xs font-mono text-gray-400 uppercase tracking-widest">{intern.period[lang]}</p>
                      </div>
                    </div>
                    <p className="text-gray-300 leading-relaxed mb-4">{intern.summary[lang]}</p>
                    <div className="flex flex-wrap gap-2">
                      {intern.tech.map((tch) => (
                        <span key={tch} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-emerald-200">
                          {tch}
                        </span>
                      ))}
                    </div>
                  </>
                );

                const className = 'relative block w-full overflow-hidden rounded-3xl border border-emerald-400/40 bg-gradient-to-br from-emerald-500/20 via-black/70 to-cyan-500/20 p-6 shadow-[0_0_40px_rgba(16,185,129,0.25)] transition-transform hover:-translate-y-1';

                return intern.url ? (
                  <a
                    key={intern.id}
                    href={intern.url}
                    target="_blank"
                    rel="noreferrer"
                    className={className}
                  >
                    {Card}
                  </a>
                ) : (
                  <div key={intern.id} className={className}>
                    {Card}
                  </div>
                );
              })}
            </div>
        </div>
      </div>

      {/* CONTACT (Centered Bottom) */}
      <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center transition-all duration-700 ${activeSection === 4 ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}>
        <div className="relative w-[calc(100vw-2rem)] max-w-xl overflow-hidden bg-gradient-to-br from-sky-500/10 via-black/40 to-amber-500/10 p-6 md:p-12 rounded-3xl border border-sky-400/30 hover:border-amber-400/40 shadow-[0_0_40px_rgba(56,189,248,0.2)] transition-all group">
          <div className="absolute -top-10 right-6 h-24 w-24 rounded-full bg-sky-400/20 blur-2xl" aria-hidden />
          <div className="mb-6 flex justify-center">
            <img
              src="/aboutMe.png"
              alt="About me"
              className="h-40 md:h-48 w-56 md:w-64 object-contain rounded-2xl border border-white/10 bg-black/40"
              loading="lazy"
            />
          </div>
          <a href="mailto:k56797484@gmail.com" className="block">
            <h2 className="text-4xl md:text-6xl font-black mb-2 group-hover:text-cyan-400 transition-colors">{t.contactSection.title}</h2>
            <p className="text-xl text-gray-400">{t.contactSection.subtitle}</p>
          </a>
        </div>
      </div>

      {/* Detail Modal */}
      <DetailModal
        isOpen={!!modalData}
        onClose={() => setModalData(null)}
        data={modalData}
        viewLabel={t.projects.viewProject}
        lang={lang}
        articlesLabel={t.projects.articlesLabel}
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
