type SectionIndicatorProps = {
  activeIndex: number;
  count: number;
  onSelect: (index: number) => void;
};

export default function SectionIndicator({ activeIndex, count, onSelect }: SectionIndicatorProps) {
  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-4 pointer-events-auto">
      {Array.from({ length: count }).map((_, idx) => (
        <button
          key={idx}
          onClick={() => onSelect(idx)}
          className={`w-1 transition-all duration-300 ${activeIndex === idx ? 'h-12 bg-cyan-400' : 'h-4 bg-white/20 hover:bg-white/50'}`}
        />
      ))}
    </div>
  );
}
