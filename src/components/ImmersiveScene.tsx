import { useEffect, useRef } from 'react';
import * as THREE from 'three';

type ImmersiveSceneProps = {
  sectionIndex: number;
  onObjectClick: () => void;
  clickTitle: string;
};

const ImmersiveScene = ({ sectionIndex, onObjectClick, clickTitle }: ImmersiveSceneProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const objectsRef = useRef<THREE.Group | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0, y: 0 });
  const sectionIndexRef = useRef(sectionIndex);
  const onObjectClickRef = useRef(onObjectClick);

  // Animation states
  const explosionRef = useRef(0); // 0 = no explosion, 1 = full explosion

  useEffect(() => {
    sectionIndexRef.current = sectionIndex;
  }, [sectionIndex]);

  useEffect(() => {
    onObjectClickRef.current = onObjectClick;
  }, [onObjectClick]);

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
      powerPreference: 'high-performance'
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
      let threeGeo: THREE.BufferGeometry;

      if (type === 0) threeGeo = new THREE.IcosahedronGeometry(2, 4); // Hero
      else if (type === 1) threeGeo = new THREE.TorusKnotGeometry(1.2, 0.4, 100, 16); // About
      else if (type === 2) threeGeo = new THREE.SphereGeometry(2, 32, 32); // Projects
      else threeGeo = new THREE.BoxGeometry(3, 3, 3, 10, 10, 10); // Contact

      const posAttribute = threeGeo.attributes.position;
      const arr = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount; i++) {
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
    for (let i = 0; i < 3; i++) {
      const sGeo = new THREE.OctahedronGeometry(0.3, 0);
      const sMat = new THREE.MeshBasicMaterial({ color: i === 0 ? 0xff00ff : 0x00ffff, wireframe: true });
      const mesh = new THREE.Mesh(sGeo, sMat);
      // random pos
      mesh.position.set(Math.random() * 6 - 3, Math.random() * 6 - 3, Math.random() * 6 - 3);
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
      onObjectClickRef.current(); // Callback to React
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
      const targetShape = shapes[sectionIndexRef.current % shapes.length];
      const positionsAttr = particles.geometry.attributes.position;
      const currentPos = positionsAttr.array as Float32Array;

      // Explosion decay
      explosionRef.current = THREE.MathUtils.lerp(explosionRef.current, 0, 0.05);

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        // Target position for this particle
        const tx = targetShape[i3];
        const ty = targetShape[i3 + 1];
        const tz = targetShape[i3 + 2];

        // Explosion offset (push out along normal/vector from center)
        // Simple radial explosion: normalize vector * force
        let ex = 0, ey = 0, ez = 0;
        if (explosionRef.current > 0.01) {
          // Calculate roughly vector from center
          const len = Math.sqrt(tx * tx + ty * ty + tz * tz) + 0.001;
          const nx = tx / len;
          const ny = ty / len;
          const nz = tz / len;
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
        currentPos[i3 + 1] += (ty + ey + noiseY - currentPos[i3 + 1]) * 0.08;
        currentPos[i3 + 2] += (tz + ez - currentPos[i3 + 2]) * 0.08;
      }
      positionsAttr.needsUpdate = true;

      // Camera drift based on section
      // sectionIndex affects camera Z slightly to zoom in/out
      const targetZ = 6 - (sectionIndexRef.current % 2);
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
  }, []);

  return (
    <div ref={mountRef} className="absolute inset-0 z-0 cursor-pointer" title={clickTitle} />
  );
};

export default ImmersiveScene;
