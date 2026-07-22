import { useEffect, useRef, useState } from 'react';
import './HeroSlideshow.css';

const webmModules = import.meta.glob('../assets/hero-videos/*.webm', { eager: true, import: 'default' });
const mp4Modules = import.meta.glob('../assets/hero-videos/*.mp4', { eager: true, import: 'default' });

const videos = Object.keys(webmModules)
  .sort()
  .map((path) => {
    const base = path.replace(/\.webm$/, '');
    return { webm: webmModules[path], mp4: mp4Modules[`${base}.mp4`] };
  });

export default function HeroSlideshow() {
  const [index, setIndex] = useState(0);
  const videoRefs = useRef([]);

  useEffect(() => {
    const el = videoRefs.current[index];
    if (!el) return undefined;
    el.currentTime = 0;
    el.play().catch(() => {});

    const advance = () => setIndex((i) => (i + 1) % videos.length);
    el.addEventListener('ended', advance);
    // Muted video autoplay is always allowed, but fall back to a timer in
    // case a browser ever refuses to fire `ended` (e.g. slow decode stalls).
    const fallback = setTimeout(advance, 12000);

    return () => {
      el.removeEventListener('ended', advance);
      clearTimeout(fallback);
    };
  }, [index]);

  if (!videos.length) return null;

  return (
    <div className="hero-slideshow" aria-hidden="true">
      {videos.map((v, i) => (
        <video
          key={v.webm}
          ref={(el) => (videoRefs.current[i] = el)}
          className={`hero-slide ${i === index ? 'is-active' : ''}`}
          muted
          playsInline
          preload={i === 0 ? 'auto' : 'metadata'}
        >
          <source src={v.webm} type="video/webm" />
          <source src={v.mp4} type="video/mp4" />
        </video>
      ))}
    </div>
  );
}
