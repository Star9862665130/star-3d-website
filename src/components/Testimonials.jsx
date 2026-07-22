import { useEffect, useRef, useState } from 'react';
import { useReveal } from '../lib/useReveal';
import './Testimonials.css';

const TESTIMONIALS = [
  {
    quote:
      'Our wedding album from Star Digital felt like reliving the day itself. Every page was composed with so much care.',
    name: 'Ankit & Jasmine',
    role: 'Wedding Album Client',
  },
  {
    quote:
      "As a photographer, their flipbook licensing transformed how I present galleries to clients. It's elevated my whole studio.",
    name: 'Rupam Debbarma',
    role: 'Partner Photographer',
  },
  {
    quote:
      'The printing quality is unmatched in Tripura. Lay-flat pages, rich colours, and delivery right on time for our anniversary.',
    name: 'Priya Nath',
    role: 'Anniversary Album Client',
  },
  {
    quote:
      'From consultation to delivery, the team understood exactly the emotions we wanted captured on every spread.',
    name: 'Suman & Rima',
    role: 'Wedding Album Clients',
  },
];

function TestimonialCard({ item, active }) {
  const cardRef = useRef(null);

  const handleMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `rotateX(${-py * 8}deg) rotateY(${px * 10}deg) translateZ(0)`;
  };

  const handleLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = '';
  };

  return (
    <div className={`testimonial-slide ${active ? 'is-active' : ''}`}>
      <div className="testimonial-card" ref={cardRef} onMouseMove={handleMove} onMouseLeave={handleLeave}>
        <span className="testimonial-quote-mark">&ldquo;</span>
        <p className="testimonial-text">{item.quote}</p>
        <div className="testimonial-person">
          <span className="testimonial-name">{item.name}</span>
          <span className="testimonial-role">{item.role}</span>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const ref = useRef(null);
  const [index, setIndex] = useState(0);
  useReveal(ref, []);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % TESTIMONIALS.length);
    }, 5500);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="section testimonials" id="testimonials" ref={ref}>
      <div className="section-inner">
        <div className="section-head" data-reveal="up">
          <span className="eyebrow">Kind Words</span>
          <h2>Stories From Our Clients</h2>
        </div>

        <div className="testimonial-carousel" data-reveal="scale">
          <div className="testimonial-track" style={{ transform: `translateX(-${index * 100}%)` }}>
            {TESTIMONIALS.map((t, i) => (
              <TestimonialCard key={t.name} item={t} active={i === index} />
            ))}
          </div>

          <div className="testimonial-dots">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.name}
                className={i === index ? 'is-active' : ''}
                aria-label={`Show testimonial ${i + 1}`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
