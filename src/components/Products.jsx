import { useRef } from 'react';
import { useReveal } from '../lib/useReveal';
import calendarCombo from '../assets/products/calendar-combo.jpg';
import glassBox from '../assets/products/glass-box.jpg';
import goldBox from '../assets/products/gold-box.jpg';
import premiumBox from '../assets/products/premium-box.jpg';
import flipBox from '../assets/products/flip-box.jpg';
import leatherCombo from '../assets/products/leather-combo.jpg';
import './Products.css';

const PRODUCTS = [
  {
    title: 'Calendar Combo',
    desc: 'A folding briefcase-style keepsake with a calendar spread and a framed portrait window on the cover.',
    image: calendarCombo,
  },
  {
    title: 'Glass Box',
    desc: 'A premium display box finished with an acrylic glass cover that protects and showcases the print beneath.',
    image: glassBox,
  },
  {
    title: 'Gold Box',
    desc: 'A gold-finish briefcase album with an embossed floral cover and a portrait window in warm metallic tones.',
    image: goldBox,
  },
  {
    title: 'Premium Box',
    desc: 'A compact square box in navy and rose tones with a circular photo window and magnetic snap closure.',
    image: premiumBox,
  },
  {
    title: 'Flip Box',
    desc: 'A flip-open keepsake box with a laser-cut photo frame that reveals a fitted print tray inside.',
    image: flipBox,
  },
  {
    title: 'Leather Combo',
    desc: 'A matching leather tote and photo folder set, each carrying a stitched portrait window of your own.',
    image: leatherCombo,
  },
];

export default function Products() {
  const ref = useRef(null);
  useReveal(ref, []);

  return (
    <section className="section products" id="products" ref={ref}>
      <div className="section-inner">
        <div className="section-head" data-reveal="up">
          <span className="eyebrow">Keepsake Boxes</span>
          <h2>Products Crafted to Match Your Album</h2>
          <p>
            Beyond the album itself &mdash; a range of presentation boxes and combos,
            each finished by hand to carry your photographs in style.
          </p>
        </div>

        <div className="product-grid">
          {PRODUCTS.map((p, i) => (
            <figure className="product-card" data-reveal="up" data-reveal-delay={(i % 3) * 0.1} key={p.title}>
              <div className="product-media">
                <img src={p.image} alt={p.title} loading="lazy" />
              </div>
              <figcaption>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
