import { ExternalLink, X } from 'lucide-react';
import type { Project } from '../types/portfolio';

type DetailModalProps = {
  isOpen: boolean;
  onClose: () => void;
  data: Project | null;
};

const DetailModal = ({ isOpen, onClose, data }: DetailModalProps) => {
  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-gray-900/90 border border-cyan-500/30 p-8 rounded-3xl max-w-lg w-full relative shadow-[0_0_50px_rgba(0,255,255,0.2)] transform transition-all animate-scale-in">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:text-cyan-400 transition-colors">
          <X size={24} />
        </button>
        <h3 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">{data.title}</h3>
        <span className="text-xs font-mono text-gray-400 mb-6 block uppercase tracking-widest">{data.category}</span>
        <p className="text-gray-300 leading-relaxed mb-6">{data.desc}</p>
        <div className="flex flex-wrap gap-2 mb-8">
          {data.tech.map((t) => (
            <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-cyan-200">
              {t}
            </span>
          ))}
        </div>
        <button className="w-full py-3 bg-cyan-600/20 border border-cyan-500/50 hover:bg-cyan-500/40 text-cyan-300 font-bold rounded-xl transition-all flex items-center justify-center gap-2 group">
          View Project <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default DetailModal;
