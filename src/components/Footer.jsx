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
          <span>Agartala, Tripura, India</span>
          <span>stardigitalalbumagt@gmail.com &bull; +91 98626 65130</span>
        </div>
      </div>
      <div className="footer-bottom">
        <span>&copy; {year} Star Digital Album. All rights reserved.</span>
      </div>
    </footer>
  );
}
