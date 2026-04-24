import React from 'react';
import { Link } from 'react-router-dom';
import './CTABanner.css';

/**
 * CTA Banner Component
 * Full-width dark section with "Ready to Start?" prompt and booking button
 */
function CTABanner() {
  return (
    <section className="cta-banner" id="cta-banner">
      <div className="cta-bg-pattern" />
      <div className="container cta-content">
        <span className="badge-gold">Start Your Journey</span>
        <h2>Ready to <span className="text-gold-gradient">Transform?</span></h2>
        <p>
          Your first consultation is completely free. No pressure, no commitment —
          just a conversation about your goals and how we can achieve them together.
        </p>
        <div className="cta-buttons">
          <Link to="/contact" className="btn-gold btn-lg" id="cta-book-now">
            <i className="bi bi-calendar-check" />
            Book Your Free Consultation
          </Link>
          <a href="tel:+447723622065" className="btn-outline-gold btn-lg" id="cta-call-now">
            <i className="bi bi-telephone" />
            Call Now
          </a>
        </div>
        <p className="cta-sub">
          <i className="bi bi-geo-alt" /> West 12 Shopping Centre, London W12 8PP
          &nbsp;•&nbsp;
          <i className="bi bi-train-front" /> 0.34 miles from Goldhawk Road Station
        </p>
      </div>
    </section>
  );
}

export default CTABanner;
