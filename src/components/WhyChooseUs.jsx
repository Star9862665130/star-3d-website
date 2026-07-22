import { useRef } from 'react';
import { useReveal } from '../lib/useReveal';
import './WhyChooseUs.css';

const POINTS = [
  {
    title: 'Best Service',
    desc: 'Dedicated support from concept to delivery, every step of the way.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none">
        <path d="M8 26v-2a16 16 0 0 1 32 0v2" stroke="currentColor" strokeWidth="1.4" />
        <rect x="6" y="24" width="8" height="12" rx="3" stroke="currentColor" strokeWidth="1.4" />
        <rect x="34" y="24" width="8" height="12" rx="3" stroke="currentColor" strokeWidth="1.4" />
        <path d="M14 36v2a4 4 0 0 0 4 4h6" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    title: 'Fast Delivery',
    desc: 'Printed locally and dispatched quickly, right to your doorstep.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none">
        <rect x="4" y="16" width="24" height="16" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M28 21h8l6 6v5h-14z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <circle cx="13" cy="35" r="3" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="35" cy="35" r="3" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    title: 'Happy Clients',
    desc: 'Hundreds of families and photographers trust us with their memories.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="22" r="16" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="18" cy="19" r="1.6" fill="currentColor" />
        <circle cx="30" cy="19" r="1.6" fill="currentColor" />
        <path d="M16 27c2 3 5 4.5 8 4.5s6-1.5 8-4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Fair Pricing',
    desc: 'Premium craftsmanship at prices built for real Indian families.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none">
        <rect x="5" y="14" width="38" height="20" rx="3" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="24" cy="24" r="5" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="10" cy="24" r="1.6" fill="currentColor" />
        <circle cx="38" cy="24" r="1.6" fill="currentColor" />
      </svg>
    ),
  },
];

export default function WhyChooseUs() {
  const ref = useRef(null);
  useReveal(ref, []);

  return (
    <section className="section why-choose" ref={ref}>
      <div className="section-inner">
        <div className="section-head" data-reveal="up">
          <span className="eyebrow">Why Choose Us</span>
          <h2>Trusted With Thousands of Memories</h2>
        </div>

        <div className="why-grid">
          {POINTS.map((p, i) => (
            <div className="why-item" data-reveal="up" data-reveal-delay={i * 0.1} key={p.title}>
              <div className="why-icon">{p.icon}</div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
