import type { ReactNode } from 'react';

type FloatingPanelProps = {
  children: ReactNode;
  className?: string;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center-right';
};

const FloatingPanel = ({ children, className = '', position = 'bottom-left' }: FloatingPanelProps) => {
  const posClasses = {
    'top-left': 'top-8 left-8',
    'top-right': 'top-8 right-8',
    'bottom-left': 'bottom-12 left-8',
    'bottom-right': 'bottom-12 right-8',
    'center-right': 'top-1/2 right-8 -translate-y-1/2',
  };

  return (
    <div className={`fixed ${posClasses[position]} z-20 transition-all duration-700 ease-out ${className}`}>
      <div className="backdrop-blur-md bg-black/40 border border-white/10 p-6 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] text-white/90">
        {children}
      </div>
    </div>
  );
};

export default FloatingPanel;
