import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

/**
 * Footer Component
 * Logo, links, contact info, Google Maps embed, and social links
 */
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer" id="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <span className="logo-mbc4">MBC4</span>
              <span className="logo-fitness">FITNESS</span>
            </Link>
            <p>
              West London's top-rated personal trainer. Transform your body and
              mind with expert 1-on-1 coaching at West 12 Shopping Centre.
            </p>
            <div className="footer-social">
              <a href="https://wa.me/447723622065" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="social-link">
                <i className="bi bi-whatsapp" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-link">
                <i className="bi bi-instagram" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-link">
                <i className="bi bi-facebook" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Tyhe</Link></li>
              <li><Link to="/services">Services & Pricing</Link></li>
              <li><Link to="/results">Client Results</Link></li>
              <li><Link to="/contact">Contact & Book</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer-links-col">
            <h4>Services</h4>
            <ul>
              <li><Link to="/services">1-on-1 Personal Training</Link></li>
              <li><Link to="/services">Body Transformation</Link></li>
              <li><Link to="/services">Injury-Safe Training</Link></li>
              <li><Link to="/services">Weight Loss Programs</Link></li>
              <li><Link to="/services">Free Consultation</Link></li>
            </ul>
          </div>

          {/* Contact Info + Map */}
          <div className="footer-contact">
            <h4>Find Us</h4>
            <div className="contact-item">
              <i className="bi bi-geo-alt-fill" />
              <div>
                <span>First Floor, West 12 Shopping Centre</span>
                <span>London W12 8PP</span>
              </div>
            </div>
            <div className="contact-item">
              <i className="bi bi-telephone-fill" />
              <a href="tel:+447723622065">+44 7723 622065</a>
            </div>
            <div className="contact-item">
              <i className="bi bi-train-front-fill" />
              <span>Goldhawk Road (0.34 mi)</span>
            </div>

            {/* Google Maps Embed */}
            <div className="footer-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2484.0!2d-0.2246!3d51.5074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sWest+12+Shopping+Centre!5e0!3m2!1sen!2suk!4v1700000000000!5m2!1sen!2suk"
                width="100%"
                height="150"
                style={{ border: 0, borderRadius: '8px', opacity: 0.8 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="MBC4 Fitness Location — West 12 Shopping Centre"
              />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>&copy; {currentYear} MBC4 Fitness. All rights reserved.</p>
          <p className="footer-tagline">
            Designed with <i className="bi bi-heart-fill text-gold" /> for your transformation
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
