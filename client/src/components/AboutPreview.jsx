import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './AboutPreview.css';

/**
 * About Preview Component
 * Split layout — image placeholder left, Tyhe's story right
 */
function AboutPreview() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`section section-alt about-preview ${visible ? 'about-visible' : ''}`}
      id="about-preview"
      ref={sectionRef}
    >
      <div className="container">
        <div className="about-grid">
          {/* Image Side */}
          <div className="about-image-wrap">
            <div className="about-image-placeholder">
              <img 
                src="/images/tyhe-trainer.jpg" 
                alt="Tyhe - Professional Personal Trainer" 
                className="about-img-tag"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="about-image-inner">
                <i className="bi bi-person-fill" />
                <span>TYHE</span>
                <span className="about-image-sub">MBC4 Fitness</span>
              </div>
              {/* Decorative elements */}
              <div className="about-image-border" />
              <div className="about-image-dot top-left" />
              <div className="about-image-dot bottom-right" />
            </div>
            <div className="about-experience-badge">
              <span className="exp-number">5.0</span>
              <span className="exp-label">★ Google Rating</span>
            </div>
          </div>

          {/* Content Side */}
          <div className="about-content">
            <span className="badge-gold">Meet Your Trainer</span>
            <h2>Hi, I'm <span className="text-gold">Tyhe</span></h2>
            <p className="about-lead">
              Your dedicated personal trainer at West 12 Shopping Centre, Shepherd's Bush.
            </p>
            <p>
              I believe fitness is for everyone — regardless of age, experience, or physical
              limitations. My mission is to create a safe, supportive environment where you
              can build strength, confidence, and a healthier relationship with your body.
            </p>
            <p>
              Whether you're stepping into a gym for the first time, managing an injury,
              or ready for a complete body transformation, I'll be with you every step of
              the way. Every plan is personalised, every session is purposeful, and I'm
              always available for advice between sessions.
            </p>

            <div className="about-highlights">
              <div className="highlight-item">
                <i className="bi bi-check-circle-fill" />
                <span>Certified Personal Trainer</span>
              </div>
              <div className="highlight-item">
                <i className="bi bi-check-circle-fill" />
                <span>Injury & Rehabilitation Specialist</span>
              </div>
              <div className="highlight-item">
                <i className="bi bi-check-circle-fill" />
                <span>Nutrition & Meal Planning</span>
              </div>
              <div className="highlight-item">
                <i className="bi bi-check-circle-fill" />
                <span>Body Transformation Expert</span>
              </div>
            </div>

            <Link to="/about" className="btn-outline-gold" id="about-learn-more">
              <i className="bi bi-arrow-right" />
              Learn More About Tyhe
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutPreview;
