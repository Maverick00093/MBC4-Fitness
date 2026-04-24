import React, { useEffect, useRef, useState } from 'react';
import './Testimonials.css';

/**
 * Testimonials Component
 * Auto-scrolling carousel with real client reviews and star ratings
 */
const testimonialsData = [
  {
    text: "If you want to train with someone who can motivate and help achieve your fitness goals quickly, I would definitely recommend Tyhe. He talked me through the whole personalised workout programme, taught me the correct techniques, and helped push me to the limits. If you are looking to transform yourself both physically and mentally, train with MBC4 Fitness.",
    name: 'Verified Client',
    rating: 5,
    initials: 'JM',
  },
  {
    text: "I decided to use a personal trainer as I'm hypermobile and needed to build muscle to support my loose joints. Tyhe was so helpful, constantly analysing every movement to make sure I wasn't putting undue pressure on my joints. I felt completely safe when trying new things. He's definitely a motivator.",
    name: 'Verified Client',
    rating: 5,
    initials: 'SK',
  },
  {
    text: "Starting as someone who didn't have a lot of confidence in the gym, Tyhe was extremely supportive. He asked what my goals were and created a tailor-made fitness plan. I have seen myself getting stronger each day and now look forward to every gym session.",
    name: 'Verified Client',
    rating: 5,
    initials: 'AR',
  },
  {
    text: "Tyhe's fitness training is amazing. In 12 weeks he transformed my muscle tone and body shape. His knowledge of fitness, diet, the human muscle and mind is incredible. He has taken my health and fitness training to another level. A true professional.",
    name: 'Verified Client',
    rating: 5,
    initials: 'DL',
  },
];

function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  /* Auto-scroll every 5 seconds */
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonialsData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  /* Intersection Observer for reveal */
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
      className={`section section-dark testimonials-section ${visible ? 'testimonials-visible' : ''}`}
      id="testimonials-section"
      ref={sectionRef}
    >
      <div className="container">
        <div className="section-heading">
          <span className="badge-gold">Client Reviews</span>
          <h2>What Our Clients <span className="text-gold">Say</span></h2>
          <hr className="gold-line" />
          <p>Don't just take our word for it — hear from real clients who transformed their lives with MBC4 Fitness.</p>
        </div>

        {/* Google Rating Badge */}
        <div className="google-rating-badge">
          <div className="google-logo">
            <span style={{ color: '#4285F4' }}>G</span>
            <span style={{ color: '#EA4335' }}>o</span>
            <span style={{ color: '#FBBC05' }}>o</span>
            <span style={{ color: '#4285F4' }}>g</span>
            <span style={{ color: '#34A853' }}>l</span>
            <span style={{ color: '#EA4335' }}>e</span>
          </div>
          <div className="google-stars">
            {[...Array(5)].map((_, i) => (
              <i className="bi bi-star-fill" key={i} />
            ))}
          </div>
          <span className="google-score">5.0 out of 5</span>
        </div>

        {/* Testimonial Cards */}
        <div className="testimonials-carousel">
          <div className="testimonials-track" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
            {testimonialsData.map((item, i) => (
              <div className="testimonial-slide" key={i}>
                <div className="testimonial-card">
                  <div className="testimonial-stars">
                    {[...Array(item.rating)].map((_, j) => (
                      <i className="bi bi-star-fill" key={j} />
                    ))}
                  </div>
                  <blockquote className="testimonial-text">
                    <i className="bi bi-quote testimonial-quote-icon" />
                    {item.text}
                  </blockquote>
                  <div className="testimonial-author">
                    <div className="author-avatar">{item.initials}</div>
                    <div className="author-info">
                      <span className="author-name">{item.name}</span>
                      <span className="author-badge">
                        <i className="bi bi-patch-check-fill" /> Google Review
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="testimonials-dots">
          {testimonialsData.map((_, i) => (
            <button
              key={i}
              className={`dot ${i === activeIndex ? 'dot-active' : ''}`}
              onClick={() => setActiveIndex(i)}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
