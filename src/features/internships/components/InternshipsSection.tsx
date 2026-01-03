import type { RefObject } from 'react';
import type { InternExperience, Language, TranslationContent } from '../../../shared/types/portfolio';

type InternshipsSectionProps = {
  active: boolean;
  internships: InternExperience[];
  lang: Language;
  t: TranslationContent;
  scrollRef: RefObject<HTMLDivElement | null>;
};

export default function InternshipsSection({
  active,
  internships,
  lang,
  t,
  scrollRef,
}: InternshipsSectionProps) {
  return (
    <div className={`fixed inset-x-0 top-20 md:top-20 bottom-2 md:bottom-16 z-20 transition-all duration-700 ${active ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}`}>
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

        <div ref={scrollRef} className="h-[66vh] md:h-[62vh] overflow-y-auto pr-2 scrollbar-hide space-y-6">
          {internships.map((intern) => {
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
  );
}
