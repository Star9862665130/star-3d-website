import { useRef } from 'react';
import { useReveal } from '../lib/useReveal';
import './Portfolio.css';

const FLIPBOOK_SRC = `${import.meta.env.BASE_URL}flipbooks/ankit-jasmine.html`;

export default function Portfolio() {
  const ref = useRef(null);
  useReveal(ref, []);

  return (
    <section className="section portfolio" id="portfolio" ref={ref}>
      <div className="section-inner">
        <div className="section-head" data-reveal="up">
          <span className="eyebrow">Our Craft</span>
          <h2>Albums That Tell Your Story</h2>
          <p>
            Step through a real spread from one of our albums &mdash; turn the pages
            just as they'll feel the day the album arrives at your door.
          </p>
        </div>

        <div className="flipbook-showcase" data-reveal="scale">
          <div className="flipbook-frame">
            <iframe
              src={FLIPBOOK_SRC}
              title="Ankit & Jasmine wedding album flipbook"
              loading="lazy"
            />
          </div>
          <div className="flipbook-meta">
            <div>
              <h3>Ankit &amp; Jasmine</h3>
              <span>Wedding Album</span>
            </div>
            <a className="btn" href={FLIPBOOK_SRC} target="_blank" rel="noreferrer">
              Open Fullscreen
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
