import { useEffect, useRef } from 'react';
import { useReveal } from '../lib/useReveal';
import './Portfolio.css';

const FLIPBOOK_SRC = `${import.meta.env.BASE_URL}flipbooks/ankit-jasmine.html`;

export default function Portfolio() {
  const ref = useRef(null);
  const iframeRef = useRef(null);
  useReveal(ref, []);

  useEffect(() => {
    // Browsers block audio autoplay until the visitor has interacted with
    // the page. Rather than requiring them to tap the flipbook itself, start
    // its background music on the very first click/tap/keypress anywhere on
    // the site. Keeps retrying (in case the iframe hasn't finished loading
    // yet) until the call actually succeeds, then stops listening.
    const events = ['click', 'touchstart', 'keydown'];
    const tryStartMusic = () => {
      const win = iframeRef.current?.contentWindow;
      if (win && typeof win.startFlipbookMusic === 'function') {
        try {
          win.startFlipbookMusic();
        } catch {
          // cross-origin or otherwise inaccessible — nothing more to do
        }
        events.forEach((evt) => document.removeEventListener(evt, tryStartMusic));
      }
    };
    events.forEach((evt) => document.addEventListener(evt, tryStartMusic));
    return () => events.forEach((evt) => document.removeEventListener(evt, tryStartMusic));
  }, []);

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
              ref={iframeRef}
              src={FLIPBOOK_SRC}
              title="Ankit & Jasmine wedding album flipbook"
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
