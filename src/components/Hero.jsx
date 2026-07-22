import { useLayoutEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import HeroScene from '../three/HeroScene';
import { gsap } from '../lib/gsapSetup';
import './Hero.css';

export default function Hero({ onExplore }) {
  const rootRef = useRef(null);
  const [isTouch, setIsTouch] = useState(true);

  useLayoutEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 820);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });
      tl.from('.hero-eyebrow', { opacity: 0, y: 16, duration: 0.9, ease: 'power3.out' })
        .from('.hero-title .line', { opacity: 0, y: 60, duration: 1.1, stagger: 0.12, ease: 'power4.out' }, '-=0.5')
        .from('.hero-sub', { opacity: 0, y: 24, duration: 0.9, ease: 'power3.out' }, '-=0.6')
        .from('.hero-cta', { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out' }, '-=0.5')
        .from('.hero-scroll', { opacity: 0, duration: 0.8 }, '-=0.4');
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" ref={rootRef} id="home">
      <div className="hero-canvas">
        <Canvas
          dpr={[1, isTouch ? 1.3 : 2]}
          camera={{ position: [0, 0, 6], fov: 45 }}
          gl={{ antialias: true, alpha: false }}
        >
          <Suspense fallback={null}>
            <HeroScene isTouch={isTouch} />
          </Suspense>
        </Canvas>
      </div>

      <div className="hero-veil" />

      <div className="hero-content">
        <span className="hero-eyebrow eyebrow">Star Digital Album &mdash; Agartala, Tripura</span>
        <h1 className="hero-title">
          <span className="line">Crafting Memories</span>
          <span className="line">Into <em className="gold-text">Art</em></span>
        </h1>
        <p className="hero-sub">
          Bespoke wedding &amp; event album design, premium printing, and flipbook
          craftsmanship &mdash; turning your favourite frames into heirlooms.
        </p>
        <div className="hero-cta">
          <button className="btn solid" onClick={onExplore}>
            View Our Work
          </button>
          <a className="btn" href="#contact">
            Get in Touch
          </a>
        </div>
      </div>

      <button className="hero-scroll" onClick={onExplore} aria-label="Scroll to portfolio">
        <span className="hero-scroll-line" />
        <span>Scroll</span>
      </button>
    </section>
  );
}
