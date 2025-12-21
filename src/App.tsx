import React, { useState, useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';
import { Github, Twitter, Mail, ExternalLink, Code, Layers, Terminal, Maximize2, X, ChevronRight, MousePointer2 } from 'lucide-react';

// ==========================================
// Types & Data
// ==========================================

type Language = 'en' | 'ja';
type Section = 'hero' | 'about' | 'projects' | 'contact';

const SECTIONS: Section[] = ['hero', 'about', 'projects', 'contact'];

const translations = {
  en: {
    role: 'Creative Developer',
    explore: 'Explore',
    details: 'View Details',
    close: 'Close',
    contact: 'Contact',
    about: {
      title: 'About',
      desc: 'I craft digital dimensions. Blending WebGL with React to create immersive web experiences.',
    },
    projects: {
      title: 'Works',
      desc: 'Interactive experiments and production applications.',
    }
  },
  ja: {
    role: 'クリエイティブデベロッパー',
    explore: '探索する',
    details: '詳細を見る',
    close: '閉じる',
    contact: 'コンタクト',
    about: {
      title: '私について',
      desc: 'デジタルの次元を創造します。WebGLとReactを融合させ、没入感のあるWeb体験を構築しています。',
    },
    projects: {
      title: '制作実績',
      desc: 'インタラクティブな実験とプロダクションアプリケーション。',
    }
  }
};

const projectsData = [
  {
    id: 1,
    title: 'Cyber Dashboard',
    category: 'Data Visualization',
    tech: ['React', 'D3.js', 'WebGL'],
    desc: 'Real-time cybersecurity threat monitoring dashboard with 3D globe visualization.'
  },
  {
    id: 2,
    title: 'Neon Configurator',
    category: 'E-Commerce',
    tech: ['Three.js', 'Vue', 'Gsap'],
    desc: 'Automotive customizer allowing users to modify parts and materials in real-time.'
  },
  {
    id: 3,
    title: 'Void Social',
    category: 'Social Platform',
    tech: ['Next.js', 'Firebase'],
    desc: 'Minimalist social network focusing on ephemeral content sharing.'
  }
];

// ==========================================
// 3D Scene Component
// ==========================================

const ImmersiveScene = ({ sectionIndex, onObjectClick }: { sectionIndex: number, onObjectClick: () => void }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const objectsRef = useRef<THREE.Group | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0, y: 0 });
  
  // Animation states
  const explosionRef = useRef(0); // 0 = no explosion, 1 = full explosion
  const morphRef = useRef(0); // Interpolation factor between shapes
  
  useEffect(() => {
    if (!mountRef.current) return;

    // --- Setup ---
    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x000000, 0.03);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 6;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    // Tone mapping for glow effect simulation
    renderer.toneMapping = THREE.ReinhardToneMapping;
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // --- Lights ---
    const ambientLight = new THREE.AmbientLight(0x222222);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x00ffff, 2, 20);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xff00ff, 2, 20);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    const rimLight = new THREE.DirectionalLight(0xffffff, 1);
    rimLight.position.set(0, 5, -5);
    scene.add(rimLight);

    // --- Objects ---
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);
    objectsRef.current = mainGroup;

    // We will create a particle system that can morph into different shapes
    // Shapes: 0: Icosahedron, 1: Torus, 2: Sphere (layered), 3: Cube cloud
    const particleCount = 2000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const targetPositions = new Float32Array(particleCount * 3); // Current target shape
    const initialPositions = new Float32Array(particleCount * 3); // Base Icosahedron
    
    // Helper to generate shapes
    const getShapePositions = (type: number) => {
      const tempGeo = new THREE.BufferGeometry();
      let threeGeo: THREE.BufferGeometry;

      if (type === 0) threeGeo = new THREE.IcosahedronGeometry(2, 4); // Hero
      else if (type === 1) threeGeo = new THREE.TorusKnotGeometry(1.2, 0.4, 100, 16); // About
      else if (type === 2) threeGeo = new THREE.SphereGeometry(2, 32, 32); // Projects
      else threeGeo = new THREE.BoxGeometry(3, 3, 3, 10, 10, 10); // Contact

      const posAttribute = threeGeo.attributes.position;
      const arr = new Float32Array(particleCount * 3);
      
      for(let i = 0; i < particleCount; i++) {
        // Randomly sample from the geometry surface/vertices
        const index = i % posAttribute.count;
        arr[i * 3] = posAttribute.getX(index) + (Math.random() - 0.5) * 0.1;
        arr[i * 3 + 1] = posAttribute.getY(index) + (Math.random() - 0.5) * 0.1;
        arr[i * 3 + 2] = posAttribute.getZ(index) + (Math.random() - 0.5) * 0.1;
      }
      threeGeo.dispose();
      return arr;
    };

    // Initialize with Shape 0
    const shape0 = getShapePositions(0);
    positions.set(shape0);
    initialPositions.set(shape0);
    targetPositions.set(shape0);

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    // Custom shader material for glowy particles
    const material = new THREE.PointsMaterial({
      size: 0.06,
      color: 0x00ffff,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(geometry, material);
    mainGroup.add(particles);
    particlesRef.current = particles;

    // Add a Wireframe Cage around for volume
    const cageGeo = new THREE.IcosahedronGeometry(2.5, 1);
    const cageMat = new THREE.MeshBasicMaterial({ 
      color: 0x222222, 
      wireframe: true, 
      transparent: true, 
      opacity: 0.1 
    });
    const cage = new THREE.Mesh(cageGeo, cageMat);
    mainGroup.add(cage);

    // Floating secondary objects (Satellites)
    const satellites = new THREE.Group();
    for(let i=0; i<3; i++) {
      const sGeo = new THREE.OctahedronGeometry(0.3, 0);
      const sMat = new THREE.MeshBasicMaterial({ color: i===0?0xff00ff:0x00ffff, wireframe: true });
      const mesh = new THREE.Mesh(sGeo, sMat);
      // random pos
      mesh.position.set(Math.random()*6-3, Math.random()*6-3, Math.random()*6-3);
      satellites.add(mesh);
    }
    scene.add(satellites);

    // --- Interaction ---
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / width) * 2 - 1,
        y: -(e.clientY / height) * 2 + 1
      };
      
      // Raycaster logic for cursor visual could go here
    };

    const handleClick = () => {
      explosionRef.current = 1.0; // Trigger explosion
      onObjectClick(); // Callback to React
    };

    window.addEventListener('mousemove', handleMouseMove);
    mountRef.current.addEventListener('click', handleClick);

    // --- Animation Loop ---
    const clock = new THREE.Clock();
    
    // Cache shapes for performance
    const shapes = [
      getShapePositions(0),
      getShapePositions(1),
      getShapePositions(2),
      getShapePositions(3)
    ];

    const animate = () => {
      requestAnimationFrame(animate);
      
      const time = clock.getElapsedTime();
      const delta = clock.getDelta();

      // Update lights colors
      const hue = (time * 0.1) % 1;
      pointLight1.color.setHSL(hue, 1, 0.5);
      pointLight2.color.setHSL((hue + 0.5) % 1, 1, 0.5);
      material.color.setHSL(hue, 0.8, 0.6);

      // Mouse rotation with inertia
      targetRotationRef.current.x += (mouseRef.current.y * 0.5 - targetRotationRef.current.x) * 0.05;
      targetRotationRef.current.y += (mouseRef.current.x * 0.5 - targetRotationRef.current.y) * 0.05;

      mainGroup.rotation.x += 0.002 + targetRotationRef.current.x * 0.1;
      mainGroup.rotation.y += 0.003 + targetRotationRef.current.y * 0.1;

      // Cage pulse
      const scale = 1 + Math.sin(time) * 0.05;
      cage.scale.set(scale, scale, scale);
      cage.rotation.y = -time * 0.1;

      // Satellites orbit
      satellites.rotation.y = time * 0.2;
      satellites.rotation.z = time * 0.1;
      satellites.children.forEach((child, i) => {
        child.rotation.x += 0.02;
        child.position.y += Math.sin(time * 2 + i) * 0.01;
      });

      // --- Morphing Logic ---
      // We interpolate current positions towards the target shape (based on sectionIndex)
      const targetShape = shapes[sectionIndex];
      const positionsAttr = particles.geometry.attributes.position;
      const currentPos = positionsAttr.array as Float32Array;

      // Explosion decay
      explosionRef.current = THREE.MathUtils.lerp(explosionRef.current, 0, 0.05);

      for(let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        // Target position for this particle
        const tx = targetShape[i3];
        const ty = targetShape[i3+1];
        const tz = targetShape[i3+2];

        // Explosion offset (push out along normal/vector from center)
        // Simple radial explosion: normalize vector * force
        let ex = 0, ey = 0, ez = 0;
        if (explosionRef.current > 0.01) {
          // Calculate roughly vector from center
          const len = Math.sqrt(tx*tx + ty*ty + tz*tz) + 0.001;
          const nx = tx/len;
          const ny = ty/len;
          const nz = tz/len;
          const force = 5 * explosionRef.current * (1 + Math.random());
          ex = nx * force;
          ey = ny * force;
          ez = nz * force;
        }

        // Noise/Hover effect
        const noiseX = Math.sin(time * 2 + i) * 0.02 * (1 + mouseRef.current.x);
        const noiseY = Math.cos(time * 3 + i) * 0.02 * (1 + mouseRef.current.y);

        // Lerp towards target
        currentPos[i3] += (tx + ex + noiseX - currentPos[i3]) * 0.08; // smooth speed
        currentPos[i3+1] += (ty + ey + noiseY - currentPos[i3+1]) * 0.08;
        currentPos[i3+2] += (tz + ez - currentPos[i3+2]) * 0.08;
      }
      positionsAttr.needsUpdate = true;

      // Camera drift based on section
      // sectionIndex affects camera Z slightly to zoom in/out
      const targetZ = 6 - (sectionIndex % 2); 
      camera.position.z += (targetZ - camera.position.z) * 0.05;

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (mountRef.current) {
        mountRef.current.removeEventListener('click', handleClick);
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [sectionIndex, onObjectClick]); // Re-bind if these change

  return (
    <div ref={mountRef} className="absolute inset-0 z-0 cursor-pointer" title="Click to interact" />
  );
};

// ==========================================
// UI Components
// ==========================================

const FloatingPanel = ({ children, className = '', position = 'bottom-left' }: any) => {
  const posClasses = {
    'top-left': 'top-8 left-8',
    'top-right': 'top-8 right-8',
    'bottom-left': 'bottom-12 left-8',
    'bottom-right': 'bottom-12 right-8',
    'center-right': 'top-1/2 right-8 -translate-y-1/2',
  };

  return (
    <div className={`fixed ${posClasses[position as keyof typeof posClasses]} z-20 transition-all duration-700 ease-out ${className}`}>
      <div className="backdrop-blur-md bg-black/40 border border-white/10 p-6 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] text-white/90">
        {children}
      </div>
    </div>
  );
};

const DetailModal = ({ isOpen, onClose, data }: any) => {
  if (!isOpen) return null;
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
          {data.tech.map((t: string) => (
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

// ==========================================
// Main Application
// ==========================================

export default function PortfolioImmersive() {
  const [activeSection, setActiveSection] = useState(0);
  const [lang, setLang] = useState<Language>('en');
  const [modalData, setModalData] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // Wheel event for snap scrolling (Scroll Jacking)
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (modalData) return; // Disable scroll when modal is open
      
      if (scrollTimeout.current) return;
      
      if (e.deltaY > 50) {
        setActiveSection(prev => Math.min(prev + 1, SECTIONS.length - 1));
        scrollTimeout.current = setTimeout(() => { scrollTimeout.current = null; }, 1000);
      } else if (e.deltaY < -50) {
        setActiveSection(prev => Math.max(prev - 1, 0));
        scrollTimeout.current = setTimeout(() => { scrollTimeout.current = null; }, 1000);
      }
    };

    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, [modalData]);

  const t = translations[lang];
  const currentSection = SECTIONS[activeSection];

  const handleObjectClick = () => {
    // Interactive feedback handled in scene
    // Optionally open relevant info
    if (activeSection === 2 && !modalData) {
       setModalData(projectsData[0]); // Demo: open first project on click
    }
  };

  return (
    <div className="h-screen w-full bg-black text-white overflow-hidden font-sans selection:bg-cyan-500/30">
      
      {/* 1. The Immersive 3D Layer */}
      <ImmersiveScene sectionIndex={activeSection} onObjectClick={handleObjectClick} />

      {/* 2. Top Navigation (Minimal) */}
      <nav className="fixed top-0 w-full z-20 p-8 flex justify-between items-start pointer-events-none">
        <div className="pointer-events-auto">
          <div className="text-2xl font-black tracking-tighter flex flex-col">
            <span className="text-white mix-blend-difference">KAZUKI</span>
            <span className="text-cyan-400 text-sm tracking-[0.3em] font-light">TANAKA</span>
          </div>
        </div>
        
        <div className="flex gap-6 pointer-events-auto items-center">
          <button 
            onClick={() => setLang(l => l === 'en' ? 'ja' : 'en')}
            className="text-xs font-bold tracking-widest hover:text-cyan-400 transition-colors opacity-70 hover:opacity-100"
          >
            {lang === 'en' ? 'JP' : 'EN'}
          </button>
          <div className="flex flex-col gap-2 group cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <div className={`w-8 h-[2px] bg-white transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <div className={`w-6 h-[2px] bg-white ml-auto transition-all ${isMenuOpen ? 'opacity-0' : ''}`} />
            <div className={`w-8 h-[2px] bg-white transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
          </div>
        </div>
      </nav>

      {/* Menu Overlay */}
      <div className={`fixed inset-0 bg-black/90 z-40 flex items-center justify-center transition-opacity duration-500 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col gap-8 text-center">
          {SECTIONS.map((sec, idx) => (
            <button 
              key={sec}
              onClick={() => { setActiveSection(idx); setIsMenuOpen(false); }}
              className="text-4xl font-bold hover:text-cyan-400 transition-colors uppercase tracking-widest"
            >
              {sec}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Dynamic UI Content based on Section */}
      
      {/* SECTION INDICATOR (Right Side) */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-4 pointer-events-auto">
        {SECTIONS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveSection(idx)}
            className={`w-1 transition-all duration-300 ${activeSection === idx ? 'h-12 bg-cyan-400' : 'h-4 bg-white/20 hover:bg-white/50'}`}
          />
        ))}
      </div>

      {/* HERO CONTENT */}
      <div className={`fixed bottom-12 left-8 z-10 transition-all duration-1000 ${activeSection === 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20 pointer-events-none'}`}>
        <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 mb-2">
          IMMERSIVE
        </h1>
        <p className="text-cyan-400 font-mono text-sm tracking-widest mb-8 flex items-center gap-2">
          <Terminal size={14} /> {t.role.toUpperCase()}
        </p>
        <div className="flex gap-4 text-xs text-gray-500 font-mono">
           <span className="flex items-center gap-1"><MousePointer2 size={12}/> INTERACT</span>
           <span className="flex items-center gap-1"><Maximize2 size={12}/> DRAG & SCROLL</span>
        </div>
      </div>

      {/* ABOUT PANEL (Floating) */}
      <FloatingPanel 
        position="center-right" 
        className={`max-w-md ${activeSection === 1 ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0 pointer-events-none'}`}
      >
        <h2 className="text-3xl font-bold mb-4 border-b border-white/10 pb-4">{t.about.title}</h2>
        <p className="text-lg leading-relaxed text-gray-300">
          {t.about.desc}
        </p>
        <div className="mt-6 flex gap-4">
          <Github className="text-gray-400 hover:text-white cursor-pointer transition-colors" />
          <Twitter className="text-gray-400 hover:text-white cursor-pointer transition-colors" />
        </div>
      </FloatingPanel>

      {/* PROJECTS LIST (Bottom Horizontal) */}
      <div className={`fixed bottom-0 left-0 w-full p-8 z-20 transition-all duration-700 ${activeSection === 2 ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}`}>
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {projectsData.map((project) => (
            <div 
              key={project.id}
              onClick={() => setModalData(project)}
              className="flex-shrink-0 w-80 bg-gray-900/60 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:border-cyan-500/50 hover:bg-gray-800/80 transition-all cursor-pointer group hover:-translate-y-2"
            >
              <div className="flex justify-between items-start mb-4">
                <Layers className="text-cyan-400 group-hover:rotate-180 transition-transform duration-500" />
                <span className="text-xs text-gray-500 font-mono">{project.category}</span>
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-300">{project.title}</h3>
              <div className="flex items-center text-xs text-gray-400 gap-1 group-hover:gap-2 transition-all">
                {t.details} <ChevronRight size={12} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CONTACT (Centered Bottom) */}
      <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center transition-all duration-700 ${activeSection === 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}>
        <div className="bg-black/20 backdrop-blur-xl p-12 rounded-full border border-white/5 hover:border-cyan-500/30 transition-all group">
          <a href="mailto:hello@example.com" className="block">
            <h2 className="text-4xl md:text-6xl font-black mb-2 group-hover:text-cyan-400 transition-colors">HELLO@</h2>
            <p className="text-xl text-gray-400">Let's create something real.</p>
          </a>
        </div>
      </div>

      {/* Detail Modal */}
      <DetailModal 
        isOpen={!!modalData} 
        onClose={() => setModalData(null)} 
        data={modalData} 
      />

      {/* Global Styles for Animations */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        
        @keyframes scale-in { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .animate-scale-in { animation: scale-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
}