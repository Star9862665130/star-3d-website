import { useEffect, useRef } from 'react';
import { useReveal } from '../lib/useReveal';
import './Portfolio.css';

const FLIPBOOK_SRC = `${import.meta.env.BASE_URL}flipbooks/ankit-jasmine.html`;

export default function Portfolio() {
  const ref = useRef(null);
  const iframeRef = useRef(null);
  useReveal(ref, []);

  useEffect(() => {
    // Browsers block audible autoplay until the visitor interacts with the
    // page — no website can play sound before that (it's a universal
    // browser policy, not something under our control). The flipbook itself
    // already starts its music muted the instant it loads; this listens for
    // the visitor's very first interaction anywhere on the site — a click,
    // tap, keypress, or scroll — and tells it to unmute, which is the
    // earliest any browser allows audible sound to begin.
    //
    // Calling win.startFlipbookMusic() can fail *silently* and
    // asynchronously (e.g. the browser doesn't honor a gesture relayed
    // across the iframe boundary) — it won't throw, it just quietly never
    // starts playing. So "the call didn't crash" is not proof it worked:
    // keep retrying on every subsequent interaction until playback is
    // actually confirmed via isFlipbookMusicPlaying().
    const events = ['click', 'touchstart', 'keydown', 'scroll', 'wheel', 'pointerdown'];
    let confirmed = false;
    const stopListening = () => events.forEach((evt) => document.removeEventListener(evt, tryStartMusic));
    const tryStartMusic = () => {
      if (confirmed) return;
      const win = iframeRef.current?.contentWindow;
      if (win && typeof win.startFlipbookMusic === 'function') {
        try {
          win.startFlipbookMusic();
        } catch {
          // cross-origin or otherwise inaccessible — nothing more to do
        }
        setTimeout(() => {
          if (typeof win.isFlipbookMusicPlaying === 'function' && win.isFlipbookMusicPlaying()) {
            confirmed = true;
            stopListening();
          }
        }, 300);
      }
    };
    events.forEach((evt) => document.addEventListener(evt, tryStartMusic, { passive: true }));
    return stopListening;
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
              allow="autoplay"
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
