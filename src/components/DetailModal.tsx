import { ExternalLink, X } from 'lucide-react';
import type { Project } from '../types/portfolio';

type DetailModalProps = {
  isOpen: boolean;
  onClose: () => void;
  data: Project | null;
  viewLabel: string;
  lang: 'en' | 'ja';
  articlesLabel: string;
};

const DetailModal = ({ isOpen, onClose, data, viewLabel, lang, articlesLabel }: DetailModalProps) => {
  if (!isOpen || !data) return null;
  const label = data.viewLabel?.[lang] ?? viewLabel;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-gray-900/90 border border-cyan-500/30 p-8 rounded-3xl max-w-lg w-full relative shadow-[0_0_50px_rgba(0,255,255,0.2)] transform transition-all animate-scale-in">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:text-cyan-400 transition-colors">
          <X size={24} />
        </button>
        <h3 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">{data.title[lang]}</h3>
        <span className="text-xs font-mono text-gray-400 mb-6 block uppercase tracking-widest">{data.category[lang]}</span>
        {data.image ? (
          <div className="mb-6 overflow-hidden rounded-2xl border border-white/10 bg-black/40">
            <img
              src={data.image}
              alt={data.title[lang]}
              className="h-56 w-full object-contain bg-black/40"
              loading="lazy"
            />
          </div>
        ) : null}
        <p className="text-gray-300 leading-relaxed mb-6">{data.desc[lang]}</p>
        <div className="flex flex-wrap gap-2 mb-8">
          {data.tech.map((t) => (
            <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-cyan-200">
              {t}
            </span>
          ))}
        </div>
        {data.articles?.length ? (
          <div className="mb-6">
            <p className="text-xs font-mono text-gray-400 mb-3 uppercase tracking-widest">{articlesLabel}</p>
            <div className="flex flex-col gap-2">
              {data.articles.map((article, idx) => (
                <a
                  key={`${article.platform}-${idx}`}
                  href={article.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-200 hover:text-cyan-200 hover:border-cyan-400/40 transition-colors"
                >
                  <span className="font-semibold">{article.title}</span>
                  <span className="text-xs font-mono text-gray-400">{article.platform}</span>
                </a>
              ))}
            </div>
          </div>
        ) : null}
        <div className="flex flex-col gap-3">
          {data.url ? (
            <a
              href={data.url}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 bg-cyan-600/20 border border-cyan-500/50 hover:bg-cyan-500/40 text-cyan-300 font-bold rounded-xl transition-all flex items-center justify-center gap-2 group"
            >
              {label} <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          ) : null}
          {data.githubUrl ? (
            <a
              href={data.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 bg-white/5 border border-white/20 hover:bg-white/10 text-white/80 font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
            >
              ソースコード  <ExternalLink size={16} />
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
