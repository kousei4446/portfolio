type ContactSectionProps = {
  active: boolean;
  title: string;
  subtitle: string;
};

export default function ContactSection({ active, title, subtitle }: ContactSectionProps) {
  return (
    <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center transition-all duration-700 ${active ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}>
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
          <h2 className="text-4xl md:text-6xl font-black mb-2 group-hover:text-cyan-400 transition-colors">{title}</h2>
          <p className="text-xl text-gray-400">{subtitle}</p>
        </a>
      </div>
    </div>
  );
}
