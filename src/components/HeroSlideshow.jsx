import { useEffect, useState } from 'react';
import './HeroSlideshow.css';

const slides = Object.values(
  import.meta.glob('../assets/hero-slides/*.jpg', { eager: true, import: 'default' })
).sort();

export default function HeroSlideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return undefined;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 3200);
    return () => clearInterval(id);
  }, []);

  if (!slides.length) return null;

  return (
    <div className="hero-slideshow" aria-hidden="true">
      {slides.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          className={`hero-slide ${i === index ? 'is-active' : ''}`}
          loading={i === 0 ? 'eager' : 'lazy'}
        />
      ))}
    </div>
  );
}
