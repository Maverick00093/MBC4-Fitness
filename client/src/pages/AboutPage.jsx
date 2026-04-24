import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './AboutPage.css';

/**
 * About Page
 * Tyhe's full story with parallax hero, journey timeline, certifications,
 * training philosophy, and personality showcase
 */
const timelineData = [
  {
    year: 'The Beginning',
    title: 'Passion for Fitness',
    description: 'Discovered a deep passion for fitness and helping others achieve their physical goals. Started the journey of becoming a certified personal trainer.',
  },
  {
    year: 'Certification',
    title: 'Professional Qualifications',
    description: 'Earned certifications in personal training, nutrition planning, and specialised injury rehabilitation. Built a foundation of expert knowledge.',
  },
  {
    year: 'MBC4 Fitness',
    title: 'Launching the Brand',
    description: 'Founded MBC4 Fitness at West 12 Shopping Centre in Shepherd\'s Bush, creating a welcoming space for all fitness levels in West London.',
  },
  {
    year: 'Today',
    title: 'Perfect 5.0 Rating',
    description: 'Achieved a perfect 5.0 Google rating through dedication, genuine care for every client, and delivering real, lasting transformations.',
  },
];

const certifications = [
  { icon: 'bi-award', title: 'Level 3 Personal Training', org: 'CIMSPA Recognised' },
  { icon: 'bi-clipboard2-pulse', title: 'Sports Nutrition', org: 'Certified Specialist' },
  { icon: 'bi-bandaid', title: 'Injury Rehabilitation', org: 'Specialist Training' },
  { icon: 'bi-heart-pulse', title: 'First Aid Certified', org: 'Emergency Response' },
  { icon: 'bi-lightning', title: 'Strength & Conditioning', org: 'Advanced Programme' },
  { icon: 'bi-people', title: 'Group Exercise', org: 'Certified Instructor' },
];

const philosophyPoints = [
  {
    icon: 'bi-person-heart',
    title: 'You Come First',
    text: 'Every session, every plan, every piece of advice is tailored specifically to you. No two clients train the same way because no two people are the same.',
  },
  {
    icon: 'bi-shield-check',
    title: 'Safety Always',
    text: 'I never push you into something unsafe. Whether you have joint issues, hypermobility, or an old injury, I analyse every movement to keep you protected.',
  },
  {
    icon: 'bi-emoji-smile',
    title: 'Mindset Matters',
    text: 'Physical transformation starts with mental transformation. I help you build confidence, discipline, and a positive relationship with exercise.',
  },
  {
    icon: 'bi-telephone',
    title: 'Always Available',
    text: 'My support doesn\'t end when the session does. I\'m always available for questions about nutrition, form, or anything else between sessions.',
  },
];

function AboutPage() {
  const [visible, setVisible] = useState({});
  const sectionRefs = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.15 }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const setRef = (id) => (el) => { sectionRefs.current[id] = el; };

  return (
    <div className="about-page">
      {/* Hero */}
      <section className="about-hero" id="about-hero">
        <div className="about-hero-overlay" />
        <div className="container about-hero-content">
          <span className="badge-gold">About MBC4 Fitness</span>
          <h1>Meet <span className="text-gold-gradient">Tyhe</span></h1>
          <p>Your dedicated personal trainer, your biggest supporter, and your partner in transformation.</p>
        </div>
      </section>

      {/* Story Section */}
      <section
        className={`section section-dark ${visible['about-story'] ? 'section-visible' : ''}`}
        id="about-story"
        ref={setRef('about-story')}
      >
        <div className="container">
          <div className="about-story-grid">
            <div className="about-story-image">
              <div className="story-image-placeholder">
                <img 
                  src="/images/tyhe-story.jpg" 
                  alt="Tyhe - Professional Trainer Story" 
                  className="story-img-tag"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="story-image-fallback">
                  <i className="bi bi-person-arms-up" />
                  <span>TYHE</span>
                </div>
              </div>
            </div>
            <div className="about-story-content">
              <h2>My <span className="text-gold">Story</span></h2>
              <p>
                I started MBC4 Fitness with a simple belief: everyone deserves access to
                expert, personalised fitness coaching — regardless of their starting point.
              </p>
              <p>
                Too many people feel intimidated by gyms, discouraged by one-size-fits-all
                programmes, or afraid that their injuries make fitness impossible. I created
                MBC4 to change that.
              </p>
              <p>
                Based at West 12 Shopping Centre in Shepherd's Bush, I work with people from
                all walks of life — complete beginners who've never touched a weight, busy
                professionals looking for efficient training, and individuals managing injuries
                or conditions like hypermobility.
              </p>
              <p>
                What sets me apart isn't just my qualifications — it's my genuine care for
                every person I train. When you train with me, you're not just another client.
                You're someone I'm invested in, and I'll be there for you every step of the way.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section
        className={`section section-alt ${visible['about-timeline'] ? 'section-visible' : ''}`}
        id="about-timeline"
        ref={setRef('about-timeline')}
      >
        <div className="container">
          <div className="section-heading">
            <span className="badge-gold">The Journey</span>
            <h2>How MBC4 <span className="text-gold">Began</span></h2>
            <hr className="gold-line" />
          </div>

          <div className="timeline">
            {timelineData.map((item, i) => (
              <div
                className={`timeline-item ${i % 2 === 0 ? 'timeline-left' : 'timeline-right'}`}
                key={i}
                style={{ transitionDelay: `${i * 0.15}s` }}
              >
                <div className="timeline-marker">
                  <div className="timeline-dot" />
                </div>
                <div className="timeline-content">
                  <span className="timeline-year">{item.year}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section
        className={`section section-dark ${visible['about-certs'] ? 'section-visible' : ''}`}
        id="about-certs"
        ref={setRef('about-certs')}
      >
        <div className="container">
          <div className="section-heading">
            <span className="badge-gold">Credentials</span>
            <h2>Certifications & <span className="text-gold">Qualifications</span></h2>
            <hr className="gold-line" />
            <p>Fully qualified, insured, and committed to continuous professional development.</p>
          </div>

          <div className="certs-grid">
            {certifications.map((cert, i) => (
              <div className="cert-card" key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="cert-icon">
                  <i className={`bi ${cert.icon}`} />
                </div>
                <h4>{cert.title}</h4>
                <span>{cert.org}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Training Philosophy */}
      <section
        className={`section section-alt ${visible['about-philosophy'] ? 'section-visible' : ''}`}
        id="about-philosophy"
        ref={setRef('about-philosophy')}
      >
        <div className="container">
          <div className="section-heading">
            <span className="badge-gold">My Approach</span>
            <h2>Training <span className="text-gold">Philosophy</span></h2>
            <hr className="gold-line" />
          </div>

          <div className="philosophy-quote">
            <i className="bi bi-quote" />
            <blockquote>
              "I don't just train bodies — I transform mindsets. When you believe you can,
              your body follows."
            </blockquote>
            <cite>— Tyhe, MBC4 Fitness</cite>
          </div>

          <div className="philosophy-grid">
            {philosophyPoints.map((point, i) => (
              <div className="philosophy-card" key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
                <i className={`bi ${point.icon}`} />
                <h3>{point.title}</h3>
                <p>{point.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section-dark about-cta-section">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2>Ready to Train with <span className="text-gold">Tyhe?</span></h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '16px auto 32px' }}>
            Your first consultation is free. Let's talk about your goals and create a plan together.
          </p>
          <Link to="/contact" className="btn-gold btn-lg" id="about-cta-book">
            <i className="bi bi-calendar-check" />
            Book Free Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
