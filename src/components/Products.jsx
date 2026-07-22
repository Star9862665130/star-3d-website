import { useRef } from 'react';
import { useReveal } from '../lib/useReveal';
import calendarCombo from '../assets/products/calendar-combo.jpg';
import glassBox from '../assets/products/glass-box.jpg';
import goldBox from '../assets/products/gold-box.jpg';
import premiumBox from '../assets/products/premium-box.jpg';
import flipBox from '../assets/products/flip-box.jpg';
import leatherCombo from '../assets/products/leather-combo.jpg';
import laserBox from '../assets/products/laser-box.jpg';
import storyFrameBox from '../assets/products/story-frame-box.jpg';
import './Products.css';

const PRODUCTS = [
  {
    title: 'Calendar Combo',
    desc: 'A folding briefcase-style keepsake pairing a desk calendar with a framed portrait window on the cover.',
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
  {
    title: 'Laser-Cut Frame Box',
    desc: 'An ornate laser-cut lattice box with a warm LED-lit backdrop, framing your portrait in intricate detail.',
    image: laserBox,
  },
  {
    title: 'Story Frame Box',
    desc: 'A portrait keepsake box with a personalised nameplate &mdash; a graceful accent for a shelf or bedside table.',
    image: storyFrameBox,
  },
];

// Images whose subjects are taller than the card's aspect ratio — cropping
// them to fill the card would cut off the logo/photo, so they're shown
// letterboxed (object-fit: contain) instead of cropped (object-fit: cover).
const PORTRAIT_FILES = ['gallery-01.jpg', 'gallery-02.jpg', 'gallery-03.jpg', 'gallery-11.jpg'];

const GALLERY = Object.entries(
  import.meta.glob('../assets/gallery/*.jpg', { eager: true, import: 'default' })
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, image]) => ({
    title: null,
    desc: null,
    image,
    portrait: PORTRAIT_FILES.some((f) => path.endsWith(f)),
  }));

const ITEMS = [
  ...PRODUCTS.map((p) => ({ ...p, portrait: false })),
  ...GALLERY,
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
          {ITEMS.map((item, i) => (
            <figure
              className="product-card"
              data-reveal="up"
              data-reveal-delay={(i % 4) * 0.08}
              key={item.image}
            >
              <div className={`product-media ${item.portrait ? 'is-portrait' : ''}`}>
                <img src={item.image} alt={item.title || 'Star Digital Album design'} loading="lazy" />
                {item.title && (
                  <figcaption>
                    <h3>{item.title}</h3>
                    <p dangerouslySetInnerHTML={{ __html: item.desc }} />
                  </figcaption>
                )}
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
