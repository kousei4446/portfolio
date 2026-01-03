import { Terminal, MousePointer2 } from 'lucide-react';

type HeroSectionProps = {
  active: boolean;
  titleLine1: string;
  titleLine2: string;
  role: string;
  interactLabel: string;
};

export default function HeroSection({
  active,
  titleLine1,
  titleLine2,
  role,
  interactLabel,
}: HeroSectionProps) {
  return (
    <div
      className={`fixed bottom-12 left-8 z-10 transition-all duration-1000 ${active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20 pointer-events-none'}`}
    >
      <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 mb-2">
        {titleLine1}
        <br />
        {titleLine2}
      </h1>
      <p className="text-cyan-400 font-mono text-sm tracking-widest mb-8 flex items-center gap-2">
        <Terminal size={14} /> {role.toUpperCase()}
      </p>
      <div className="flex gap-4 text-xs text-gray-500 font-mono">
        <span className="flex items-center gap-1"><MousePointer2 size={12} /> {interactLabel}</span>
        <span className="flex items-center gap-1"><Terminal size={12} /> SCROLL</span>
      </div>
    </div>
  );
}
