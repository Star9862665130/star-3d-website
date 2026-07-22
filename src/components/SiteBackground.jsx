import { useEffect, useRef, useState } from 'react';
import './SiteBackground.css';

const webmModules = import.meta.glob('../assets/hero-videos/*.webm', { eager: true, import: 'default' });
const mp4Modules = import.meta.glob('../assets/hero-videos/*.mp4', { eager: true, import: 'default' });

const videos = Object.keys(webmModules)
  .sort()
  .map((path) => {
    const base = path.replace(/\.webm$/, '');
    return { webm: webmModules[path], mp4: mp4Modules[`${base}.mp4`] };
  });

export default function SiteBackground() {
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

  return (
    <div className="site-bg" aria-hidden="true">
      {videos.map((v, i) => (
        <video
          key={v.webm}
          ref={(el) => (videoRefs.current[i] = el)}
          className={`site-bg-slide ${i === index ? 'is-active' : ''}`}
          muted
          playsInline
          preload={i === 0 ? 'auto' : 'metadata'}
        >
          <source src={v.webm} type="video/webm" />
          <source src={v.mp4} type="video/mp4" />
        </video>
      ))}

      <div className="site-bg-veil" />

      {/* Covers the AI-generation watermark baked into the bottom-right
          corner of every clip — fixed here (not inside Hero) so it stays
          anchored over the logo regardless of scroll position. */}
      <div className="site-bg-badge">
        <span className="site-bg-badge-mark">&#9733;</span>
        <span>Star Digital Album</span>
      </div>
    </div>
  );
}
