import { Github, Twitter } from 'lucide-react';
import FloatingPanel from '../../../shared/components/FloatingPanel';

type AboutSectionProps = {
  active: boolean;
  title: string;
  description: string;
  githubUrl: string;
  twitterUrl: string;
};

export default function AboutSection({
  active,
  title,
  description,
  githubUrl,
  twitterUrl,
}: AboutSectionProps) {
  return (
    <FloatingPanel
      position="center-right"
      className={`max-w-md md:max-w-3xl w-[calc(100vw-2rem)] md:w-auto ${active ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0 pointer-events-none'}`}
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
          <h2 className="text-3xl font-bold mb-4 border-b border-white/10 pb-4">{title}</h2>
          <p className="max-h-[42vh] md:max-h-[60vh] overflow-y-auto pr-2 text-base md:text-lg leading-relaxed text-gray-300 scrollbar-hide">
            {description}
          </p>
        </div>
      </div>
      <div className="mt-6 flex gap-4">
        <a href={githubUrl} target="_blank" rel="noopener noreferrer">
          <Github className="text-gray-400 hover:text-white cursor-pointer transition-colors" />
        </a>
        <a href={twitterUrl} target="_blank" rel="noopener noreferrer">
          <Twitter className="text-gray-400 hover:text-white cursor-pointer transition-colors" />
        </a>
      </div>
    </FloatingPanel>
  );
}
