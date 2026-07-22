import { useEffect, useState } from 'react';
import './Nav.css';

const LINKS = [
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#services', label: 'Services' },
  { href: '#about', label: 'Process' },
  { href: '#testimonials', label: 'Stories' },
  { href: '#contact', label: 'Contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <div className="nav-inner">
        <a className="nav-brand" href="#home" onClick={() => setOpen(false)}>
          <span className="nav-brand-mark">&#9733;</span>
          <span>
            Star <em>Digital Album</em>
          </span>
        </a>

        <nav className="nav-links">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>

        <a className="btn nav-cta" href="#contact">
          Enquire
        </a>

        <button
          className="nav-burger"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>

      <div className="nav-mobile">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
        <a className="btn solid" href="#contact" onClick={() => setOpen(false)}>
          Enquire
        </a>
      </div>
    </header>
  );
}
