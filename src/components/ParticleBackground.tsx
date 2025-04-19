// ParticleBackground.tsx
import { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import { Engine } from 'tsparticles-engine';

export function ParticleBackground() {
const initParticles = useCallback(async (engine: Engine): Promise<void> => {
    await loadFull(engine);
}, []);

  return (
    <Particles
      id="tsparticles"
      init={initParticles}
      options={{
        fullScreen: { enable: true, zIndex: 0 },
        particles: {
          number: { value: 50, density: { enable: true, area: 800 } },
          color: { value: '#00ccff' },
          shape: { type: 'circle' },
          opacity: { value: 0.5 },
          size: { value: { min: 1, max: 3 } },
          move: { enable: true, speed: 1 },
        },
        interactivity: {
          events: { onHover: { enable: true, mode: 'repulse' } },
          modes: { repulse: { distance: 100 } },
        },
      }}
    />
  );
}
