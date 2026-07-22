import { useRef } from 'react';
import { useReveal } from '../lib/useReveal';
import './Portfolio.css';

const ALBUMS = [
  {
    title: 'Ankit & Jasmine',
    tag: 'Wedding Album',
    cover: 'linear-gradient(135deg, #3a2c17, #171009)',
    spread: 'linear-gradient(135deg, #caa25a, #7a5b2c)',
  },
  {
    title: 'Reception Chronicles',
    tag: 'Event Album',
    cover: 'linear-gradient(135deg, #2c2013, #12100a)',
    spread: 'linear-gradient(135deg, #e3c98a, #a9793a)',
  },
  {
    title: 'Haldi & Mehendi',
    tag: 'Pre-Wedding',
    cover: 'linear-gradient(135deg, #33230f, #15110a)',
    spread: 'linear-gradient(135deg, #f0dba0, #b98b42)',
  },
  {
    title: 'The Baraat',
    tag: 'Wedding Album',
    cover: 'linear-gradient(135deg, #2e2211, #100d08)',
    spread: 'linear-gradient(135deg, #d9b06a, #8f6a34)',
  },
  {
    title: 'Golden Anniversary',
    tag: 'Milestone Album',
    cover: 'linear-gradient(135deg, #362613, #14100a)',
    spread: 'linear-gradient(135deg, #e6cd94, #a17c3f)',
  },
  {
    title: 'Destination Vows',
    tag: 'Wedding Album',
    cover: 'linear-gradient(135deg, #302212, #120e08)',
    spread: 'linear-gradient(135deg, #dcb877, #93702f)',
  },
];

function AlbumCard({ album, index }) {
  const cardRef = useRef(null);

  const handleMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty('--rx', `${-py * 10}deg`);
    el.style.setProperty('--ry', `${px * 14}deg`);
  };

  const handleLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  };

  return (
    <div
      className="album-card"
      data-reveal="up"
      data-reveal-delay={(index % 3) * 0.1}
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div className="album-book">
        <div className="album-page album-page--left" style={{ background: album.spread }} />
        <div className="album-page album-page--right" style={{ background: album.spread }} />
        <div className="album-cover" style={{ background: album.cover }}>
          <span className="album-cover-frame" />
          <span className="album-cover-title">{album.title}</span>
          <span className="album-cover-tag">{album.tag}</span>
        </div>
      </div>
      <div className="album-caption">
        <h3>{album.title}</h3>
        <span>{album.tag}</span>
      </div>
    </div>
  );
}

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
            Every spread is composed by hand &mdash; hover an album to watch it open,
            just as it will feel the day it arrives at your door.
          </p>
        </div>

        <div className="album-grid">
          {ALBUMS.map((a, i) => (
            <AlbumCard key={a.title} album={a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
