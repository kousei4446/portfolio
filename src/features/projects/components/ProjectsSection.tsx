import { ChevronRight, Layers } from 'lucide-react';
import type { RefObject } from 'react';
import type { Language, Project, TranslationContent } from '../../../shared/types/portfolio';

type ProjectsSectionProps = {
  active: boolean;
  projects: Project[];
  lang: Language;
  t: TranslationContent;
  onSelectProject: (project: Project) => void;
  scrollRef: RefObject<HTMLDivElement | null>;
};

export default function ProjectsSection({
  active,
  projects,
  lang,
  t,
  onSelectProject,
  scrollRef,
}: ProjectsSectionProps) {
  const personalProjects = projects.filter(project => project.group === 'personal');
  const hackathonProjects = projects.filter(project => project.group === 'hackathon');

  return (
    <div className={`fixed inset-x-0 top-20 md:top-20 bottom-2 md:bottom-16 z-20 transition-all duration-700 ${active ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}`}>
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

        <div ref={scrollRef} className="h-[66vh] md:h-[62vh] overflow-y-auto pr-2 scrollbar-hide space-y-10">
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="h-1 w-10 bg-cyan-400" />
              <h3 className="text-lg font-semibold tracking-[0.2em] uppercase text-cyan-200">{t.projects.groupLabels.personal}</h3>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {personalProjects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => onSelectProject(project)}
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
                  onClick={() => onSelectProject(project)}
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
  );
}
