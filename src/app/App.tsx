import { useEffect, useRef, useState } from 'react';
import DetailModal from '../shared/components/DetailModal';
import ImmersiveScene from '../shared/components/ImmersiveScene';
import { SECTIONS } from '../shared/constants/sections';
import { internExperiences } from '../features/internships/data/internships';
import { projectsData } from '../features/projects/data/projects';
import { translations } from '../shared/data/translations';
import type { Language, Project } from '../shared/types/portfolio';
import { MenuOverlay, SectionIndicator, TopNav } from './components';
import AboutSection from '../features/about';
import ContactSection from '../features/contact';
import HeroSection from '../features/hero';
import InternshipsSection from '../features/internships';
import ProjectsSection from '../features/projects';

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

  return (
    <div className="h-screen w-full bg-black text-white overflow-hidden font-sans selection:bg-cyan-500/30">

      {/* 1. The Immersive 3D Layer */}
      <ImmersiveScene sectionIndex={activeSection} onObjectClick={handleObjectClick} clickTitle={t.hero.interact} />

      {/* 2. Top Navigation (Minimal) */}
      <TopNav
        lang={lang}
        isMenuOpen={isMenuOpen}
        onToggleLang={() => setLang(l => l === 'en' ? 'ja' : 'en')}
        onToggleMenu={() => setIsMenuOpen(open => !open)}
      />

      {/* Menu Overlay */}
      <MenuOverlay
        isOpen={isMenuOpen}
        sections={SECTIONS}
        labels={t.sections}
        onSelect={(idx) => {
          setActiveSection(idx);
          setIsMenuOpen(false);
        }}
        onClose={() => setIsMenuOpen(false)}
      />

      {/* 3. Dynamic UI Content based on Section */}

      {/* SECTION INDICATOR (Right Side) */}
      <SectionIndicator
        activeIndex={activeSection}
        count={SECTIONS.length}
        onSelect={setActiveSection}
      />

      {/* HERO CONTENT */}
      <HeroSection
        active={activeSection === 0}
        titleLine1={t.hero.titleLine1}
        titleLine2={t.hero.titleLine2}
        role={t.role}
        interactLabel={t.hero.interact}
      />

      {/* ABOUT PANEL (Floating) */}
      <AboutSection
        active={activeSection === 1}
        title={t.about.title}
        description={t.about.desc}
        githubUrl="https://github.com/kousei4446/"
        twitterUrl="https://x.com/k8035004287922?s=11"
      />

      {/* PROJECTS LIST (Bold Vertical) */}
      <ProjectsSection
        active={activeSection === 2}
        projects={projectsData}
        lang={lang}
        t={t}
        onSelectProject={setModalData}
        scrollRef={projectsScrollRef}
      />

      {/* INTERNSHIPS (Bold Vertical) */}
      <InternshipsSection
        active={activeSection === 3}
        internships={internExperiences}
        lang={lang}
        t={t}
        scrollRef={internshipsScrollRef}
      />

      {/* CONTACT (Centered Bottom) */}
      <ContactSection
        active={activeSection === 4}
        title={t.contactSection.title}
        subtitle={t.contactSection.subtitle}
      />

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
