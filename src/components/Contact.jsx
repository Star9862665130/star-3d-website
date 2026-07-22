import { useRef, useState } from 'react';
import { useReveal } from '../lib/useReveal';
import './Contact.css';

const DETAILS = [
  { label: 'Email', value: 'stardigitalalbumagt@gmail.com', href: 'mailto:stardigitalalbumagt@gmail.com' },
  { label: 'Phone', value: '+91 98626 65130', href: 'tel:+919862665130' },
  { label: 'Website', value: 'stardigitalalbum.com', href: 'https://stardigitalalbum.com' },
  { label: 'Studio', value: 'Agartala, Tripura, India', href: null },
];

export default function Contact() {
  const ref = useRef(null);
  const [status, setStatus] = useState('idle');
  useReveal(ref, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sent');
  };

  return (
    <section className="section contact" id="contact" ref={ref}>
      <div className="section-inner contact-grid">
        <div className="contact-info" data-reveal="left">
          <span className="eyebrow">Let's Talk</span>
          <h2>Start Your Album Story</h2>
          <p className="contact-copy">
            Tell us about your day &mdash; we'll get back with a design concept and
            timeline within 48 hours.
          </p>

          <ul className="contact-details">
            {DETAILS.map((d) => (
              <li key={d.label}>
                <span className="contact-label">{d.label}</span>
                {d.href ? (
                  <a href={d.href} target={d.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                    {d.value}
                  </a>
                ) : (
                  <span>{d.value}</span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <form className="contact-form" data-reveal="right" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>
              <span>Name</span>
              <input type="text" name="name" required placeholder="Your full name" />
            </label>
            <label>
              <span>Phone</span>
              <input type="tel" name="phone" placeholder="+91" />
            </label>
          </div>

          <label>
            <span>Email</span>
            <input type="email" name="email" required placeholder="you@example.com" />
          </label>

          <label>
            <span>Event Type</span>
            <select name="eventType" defaultValue="Wedding Album">
              <option>Wedding Album</option>
              <option>Pre-Wedding / Event Album</option>
              <option>Flipbook Licensing</option>
              <option>Other</option>
            </select>
          </label>

          <label>
            <span>Message</span>
            <textarea name="message" rows="4" placeholder="Tell us about your celebration..." required />
          </label>

          <button type="submit" className="btn solid contact-submit" disabled={status === 'sent'}>
            {status === 'sent' ? 'Message Sent' : 'Send Enquiry'}
          </button>
          {status === 'sent' && <p className="contact-success">Thank you! We'll be in touch shortly.</p>}
        </form>
      </div>
    </section>
  );
}
