import { useRef } from 'react';
import { useReveal } from '../lib/useReveal';
import './About.css';

const STEPS = [
  {
    n: '01',
    title: 'Consultation',
    desc: 'We learn your story, your day, and the moments you want relived every time the album opens.',
  },
  {
    n: '02',
    title: 'Curation',
    desc: 'Thousands of frames narrowed to the few hundred that carry the emotion of the day.',
  },
  {
    n: '03',
    title: 'Design',
    desc: 'Each spread is laid out by hand &mdash; balance, rhythm and pacing considered page by page.',
  },
  {
    n: '04',
    title: 'Proofing',
    desc: 'You review a digital flipbook proof and request refinements until every page feels right.',
  },
  {
    n: '05',
    title: 'Print & Deliver',
    desc: 'Archival printing, premium binding, and careful hand delivery &mdash; ready for generations.',
  },
];

export default function About() {
  const ref = useRef(null);
  useReveal(ref, []);

  return (
    <section className="section about" id="about" ref={ref}>
      <div className="section-inner about-grid">
        <div className="about-story" data-reveal="left">
          <span className="eyebrow">Our Studio</span>
          <h2>A Studio Rooted in Agartala, Crafting for Every Home</h2>
          <p className="about-copy">
            Star Digital Album began with a simple belief: a wedding album should feel
            like the day itself &mdash; warm, considered, unhurried. From a small studio
            in Agartala, Tripura, we've grown into a trusted design partner for
            photographers and families across the region, blending traditional
            album craftsmanship with modern, cinematic design.
          </p>
          <p className="about-copy">
            Today our team designs, prints and delivers premium albums, while also
            licensing our flipbook technology to photography studios who want to
            offer their own clients a beautiful digital preview experience.
          </p>
          <div className="about-stats">
            <div>
              <strong>1,25,000+</strong>
              <span>Albums Crafted</span>
            </div>
            <div>
              <strong>7,500+</strong>
              <span>Partner Studios</span>
            </div>
            <div>
              <strong>10+</strong>
              <span>Years of Craft</span>
            </div>
          </div>
        </div>

        <div className="about-timeline" data-reveal="right">
          {STEPS.map((s, i) => (
            <div className="timeline-step" data-reveal="up" data-reveal-delay={i * 0.08} key={s.n}>
              <div className="timeline-marker">
                <span>{s.n}</span>
              </div>
              <div className="timeline-body">
                <h3>{s.title}</h3>
                <p dangerouslySetInnerHTML={{ __html: s.desc }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
