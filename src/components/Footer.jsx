import { SOCIALS } from '../lib/socials';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="footer-mark">&#9733;</span>
          <span>
            Star <em>Digital Album</em>
          </span>
        </div>

        <nav className="footer-links">
          <a href="#products">Products</a>
          <a href="#portfolio">Portfolio</a>
          <a href="#services">Services</a>
          <a href="#about">Process</a>
          <a href="#testimonials">Stories</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="footer-meta">
          <span>Post Office Chowmuhani, Mantri Bari Road, Agartala, Tripura 799001</span>
          <span>stardigitalalbumagt@gmail.com &bull; +91 98626 65130</span>
          <div className="footer-socials">
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>&copy; {year} Star Digital Album. All rights reserved.</span>
      </div>
    </footer>
  );
}
