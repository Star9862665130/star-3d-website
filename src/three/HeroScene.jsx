import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import * as THREE from 'three';

const GOLD = '#d4af6a';
const CREAM = '#f4ecd8';

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
  return (
    <>
      <fog attach="fog" args={['#0b0a08', 7, 15]} />
      <ambientLight intensity={0.55} />
      <pointLight position={[4, 4, 4]} intensity={40} color={GOLD} />
      <pointLight position={[-4, -2, 2]} intensity={18} color={CREAM} />
      <directionalLight position={[0, 5, 5]} intensity={0.6} color={CREAM} />

      <RingParticles />
      <Sparkles count={40} scale={[8, 5, 4]} size={2.4} speed={0.25} color={GOLD} opacity={0.6} />
      <Rig isTouch={isTouch} />
    </>
  );
}
