import { useRef } from 'react';
import { useReveal } from '../lib/useReveal';
import './Services.css';

const SERVICES = [
  {
    title: 'Album Design',
    desc: 'Hand-composed spreads that balance every candid, portrait and detail shot into a cinematic narrative.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none">
        <rect x="7" y="10" width="34" height="28" rx="2" stroke="currentColor" strokeWidth="1.4" />
        <path d="M7 30 L18 20 L25 26 L32 17 L41 27" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <circle cx="16" cy="17" r="2.4" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    title: 'Premium Printing & Delivery',
    desc: 'Archival-grade paper, lay-flat binding and leather finishes &mdash; printed locally and delivered with care.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none">
        <rect x="12" y="6" width="24" height="14" rx="1.4" stroke="currentColor" strokeWidth="1.4" />
        <rect x="8" y="20" width="32" height="14" rx="1.4" stroke="currentColor" strokeWidth="1.4" />
        <rect x="14" y="34" width="20" height="8" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    title: 'Flipbook Licensing',
    desc: 'White-label flipbook software &amp; templates licensed to photographers &mdash; launch your own studio brand.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none">
        <path d="M24 12 C18 8 10 8 6 10 V34 C10 32 18 32 24 36" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M24 12 C30 8 38 8 42 10 V34 C38 32 30 32 24 36" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M24 12 V36" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
];

export default function Services() {
  const ref = useRef(null);
  useReveal(ref, []);

  return (
    <section className="section services" id="services" ref={ref}>
      <div className="section-inner">
        <div className="section-head" data-reveal="up">
          <span className="eyebrow">What We Do</span>
          <h2>Services Built Around Your Story</h2>
          <p>From first design draft to the album in your hands &mdash; and the tools to build your own studio.</p>
        </div>

        <div className="service-grid">
          {SERVICES.map((s, i) => (
            <div className="service-card" data-reveal="scale" data-reveal-delay={i * 0.12} key={s.title}>
              <div className="service-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p dangerouslySetInnerHTML={{ __html: s.desc }} />
              <span className="service-index">{String(i + 1).padStart(2, '0')}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
