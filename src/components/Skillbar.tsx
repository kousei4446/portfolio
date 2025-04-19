import { useEffect, useState } from 'react';

type SkillBarProps = {
  level: number;
  delay: number;
};

export const SkillBar = ({ level, delay }: SkillBarProps) => {
  const [width, setWidth] = useState('0%');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setWidth(`${level}%`);
    }, delay);
    return () => clearTimeout(timeout);
  }, [level, delay]);

  return (
    <div className="skill-bar-container">
      <div
        className="skill-bar"
        style={{
          width,
          transition: 'width 0.8s ease-out',
        }}
      />
    </div>
  );
};
