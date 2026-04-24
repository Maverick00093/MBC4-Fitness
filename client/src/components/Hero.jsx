import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ThreeScene from './ThreeScene';
import './Hero.css';

/**
 * Hero Component
 * Full-screen hero with Three.js background, staggered text animation,
 * and dual CTA buttons
 */
function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    /* Staggered text reveal animation using GSAP-like timing */
    const elements = heroRef.current?.querySelectorAll('.hero-animate');
    if (!elements) return;

    elements.forEach((el, i) => {
      setTimeout(() => {
        el.classList.add('hero-animate-active');
      }, 300 + i * 200);
    });
  }, []);

  return (
    <section className="hero" id="hero-section" ref={heroRef}>
      {/* Three.js 3D Background */}
      <ThreeScene />

      {/* Dark overlay for text readability */}
      <div className="hero-overlay" />

      {/* Content */}
      <div className="container hero-content">
        <div className="hero-badge hero-animate">
          <i className="bi bi-star-fill" /> 5.0 Rated Personal Trainer — West London
        </div>

        <h1 className="hero-title hero-animate">
          Transform Your Body. Transform Your Life.
        </h1>

        <p className="hero-subtitle hero-animate">
          West London's most dedicated Personal Trainer. Expert 1-on-1 coaching
          at West 12 Shopping Centre, Shepherd's Bush.
        </p>

        <div className="hero-ctas hero-animate">
          <Link to="/contact" className="btn-gold btn-lg" id="hero-cta-primary">
            <i className="bi bi-calendar-check" />
            Book Free Consultation
          </Link>
          <Link to="/results" className="btn-outline-gold btn-lg" id="hero-cta-secondary">
            <i className="bi bi-trophy" />
            See Results
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll hero-animate">
          <span>Scroll to explore</span>
          <div className="scroll-arrow">
            <i className="bi bi-chevron-down" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
