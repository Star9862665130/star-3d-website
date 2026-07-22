import { useRef } from 'react';
import { useReveal } from '../lib/useReveal';
import designer from '../assets/covers/designer.jpg';
import hardcover from '../assets/covers/hardcover.jpg';
import leather from '../assets/covers/leather.jpg';
import acrylicGlass from '../assets/covers/acrylic-glass.jpg';
import './CoverStyles.css';

const COVERS = [
  {
    title: 'Designer Cover',
    desc: 'Fully custom cover artwork &mdash; from velvet monograms to playful themes &mdash; designed around your story.',
    image: designer,
  },
  {
    title: 'Acrylic Glass Cover',
    desc: 'A crystal-clear acrylic pane over leather and wood, giving your portrait a premium, gallery-glass feel.',
    image: acrylicGlass,
  },
  {
    title: 'Leather Cover',
    desc: 'Genuine leather, embossed with your names or a monogram &mdash; reliable, timeless and long-lasting.',
    image: leather,
  },
  {
    title: 'Hard Cover',
    desc: 'A sturdy board cover with a classic, dependable finish &mdash; built for everyday keepsakes.',
    image: hardcover,
  },
];

export default function CoverStyles() {
  const ref = useRef(null);
  useReveal(ref, []);

  return (
    <section className="section cover-styles" ref={ref}>
      <div className="section-inner">
        <div className="section-head" data-reveal="up">
          <span className="eyebrow">Choose Your Finish</span>
          <h2>Premium Photo Album Covers</h2>
          <p>Every album starts with a cover that sets the tone &mdash; pick the finish that fits your story.</p>
        </div>

        <div className="cover-grid">
          {COVERS.map((c, i) => (
            <figure className="cover-card" data-reveal="up" data-reveal-delay={(i % 2) * 0.12} key={c.title}>
              <div className="cover-media">
                <img src={c.image} alt={c.title} loading="lazy" />
              </div>
              <figcaption>
                <h3>{c.title}</h3>
                <p dangerouslySetInnerHTML={{ __html: c.desc }} />
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
