import type { Section, TranslationContent } from '../../shared/types/portfolio';

type MenuOverlayProps = {
  isOpen: boolean;
  sections: Section[];
  labels: TranslationContent['sections'];
  onSelect: (index: number) => void;
  onClose: () => void;
};

export default function MenuOverlay({ isOpen, sections, labels, onSelect, onClose }: MenuOverlayProps) {
  return (
    <div
      className={`fixed inset-0 bg-black/90 z-40 flex items-center justify-center transition-opacity duration-500 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      onClick={onClose}
    >
      <div className="flex flex-col gap-8 text-center" onClick={(e) => e.stopPropagation()}>
        {sections.map((sec, idx) => (
          <button
            key={sec}
            onClick={() => onSelect(idx)}
            className="text-4xl font-bold hover:text-cyan-400 transition-colors uppercase tracking-widest"
          >
            {labels[sec]}
          </button>
        ))}
      </div>
    </div>
  );
}
