import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { RoundedBox, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

const GOLD = '#d4af6a';
const CREAM = '#f4ecd8';
const DARK = '#1c1710';

function Frame({ position, rotation, scale = 1, tint, speed, index }) {
  const group = useRef();
  const t0 = useMemo(() => Math.random() * 100, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed + t0;
    if (!group.current) return;
    group.current.position.y = position[1] + Math.sin(t) * 0.28;
    group.current.rotation.x = rotation[0] + Math.sin(t * 0.6) * 0.08;
    group.current.rotation.y = rotation[1] + Math.cos(t * 0.4) * 0.12;
    group.current.rotation.z = rotation[2] + Math.sin(t * 0.3) * 0.05;
  });

  return (
    <group ref={group} position={position} rotation={rotation} scale={scale}>
      <RoundedBox args={[1.6, 2.1, 0.05]} radius={0.03} smoothness={4}>
        <meshStandardMaterial color={DARK} metalness={0.4} roughness={0.35} />
      </RoundedBox>
      <RoundedBox args={[1.36, 1.84, 0.07]} radius={0.02} smoothness={4} position={[0, 0, 0.03]}>
        <meshStandardMaterial color={tint} metalness={0.15} roughness={0.5} />
      </RoundedBox>
      <mesh position={[0, 0, 0.075]}>
        <planeGeometry args={[1.1, 1.5]} />
        <meshBasicMaterial color={GOLD} transparent opacity={0.08} />
      </mesh>
      <lineSegments position={[0, 0, 0.076]}>
        <edgesGeometry args={[new THREE.PlaneGeometry(1.1, 1.5)]} />
        <lineBasicMaterial color={GOLD} transparent opacity={0.5} />
      </lineSegments>
      <mesh position={[-1.02, 0, 0]} rotation={[0, 0.55, 0]} visible={index % 2 === 0}>
        <planeGeometry args={[0.9, 1.84]} />
        <meshStandardMaterial color={CREAM} metalness={0.05} roughness={0.7} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function RingParticles() {
  const points = useRef();
  const geo = useMemo(() => {
    const count = 260;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 4.5 + Math.random() * 3.2;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = Math.sin(angle) * radius - 2;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return g;
  }, []);

  useFrame((state) => {
    if (points.current) points.current.rotation.y = state.clock.elapsedTime * 0.03;
  });

  return (
    <points ref={points} geometry={geo}>
      <pointsMaterial color={GOLD} size={0.02} sizeAttenuation transparent opacity={0.55} />
    </points>
  );
}

function Rig({ isTouch }) {
  const { camera } = useThree();
  const target = useRef({ x: 0, y: 0 });

  useFrame(() => {
    if (isTouch) return;
    camera.position.x += (target.current.x - camera.position.x) * 0.03;
    camera.position.y += (-target.current.y - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
  });

  useEffect(() => {
    if (isTouch) return undefined;
    const handler = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 1.4;
      const y = (e.clientY / window.innerHeight - 0.5) * 0.9;
      target.current = { x, y };
    };
    window.addEventListener('pointermove', handler);
    return () => window.removeEventListener('pointermove', handler);
  }, [isTouch]);

  return null;
}

export default function HeroScene({ isTouch }) {
  const frames = useMemo(
    () => [
      { position: [-2.6, 0.4, -1], rotation: [0.1, 0.5, -0.08], scale: 1.05, tint: '#2a2115', speed: 0.5 },
      { position: [2.4, -0.5, -0.6], rotation: [-0.05, -0.45, 0.06], scale: 1.2, tint: '#231c12', speed: 0.42 },
      { position: [0.3, 1.1, -1.6], rotation: [0.08, 0.1, 0.03], scale: 0.85, tint: '#291f13', speed: 0.6 },
      { position: [-1.1, -1.3, -1.2], rotation: [-0.1, 0.25, -0.05], scale: 0.75, tint: '#221b11', speed: 0.55 },
      { position: [3.3, 1.2, -2.2], rotation: [0.05, -0.2, 0.05], scale: 0.7, tint: '#241d12', speed: 0.38 },
    ],
    []
  );

  return (
    <>
      <fog attach="fog" args={['#0b0a08', 7, 15]} />
      <ambientLight intensity={0.55} />
      <pointLight position={[4, 4, 4]} intensity={40} color={GOLD} />
      <pointLight position={[-4, -2, 2]} intensity={18} color={CREAM} />
      <directionalLight position={[0, 5, 5]} intensity={0.6} color={CREAM} />

      {frames.map((f, i) => (
        <Frame key={i} index={i} {...f} />
      ))}

      <RingParticles />
      <Sparkles count={40} scale={[8, 5, 4]} size={2.4} speed={0.25} color={GOLD} opacity={0.6} />
      <Rig isTouch={isTouch} />
    </>
  );
}
