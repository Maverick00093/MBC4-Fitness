import React, { useEffect, useRef } from 'react';
import './Benefits.css';

/**
 * Benefits Component
 * 3-column grid: Beginner Friendly, Injury Safe, Real Results
 */
const benefitsData = [
  {
    icon: 'bi-heart-pulse',
    title: 'Beginner Friendly',
    description:
      'Never stepped foot in a gym? No problem. Tyhe specialises in working with complete beginners, creating a comfortable, judgement-free environment where you learn proper technique from day one.',
  },
  {
    icon: 'bi-shield-check',
    title: 'Injury Safe',
    description:
      'Dealing with joint issues, hypermobility, or recovering from injury? Tyhe carefully analyses every movement to ensure you train safely while building the strength your body needs.',
  },
  {
    icon: 'bi-graph-up-arrow',
    title: 'Real Results',
    description:
      'No gimmicks, no shortcuts. With personalised workout plans and nutrition guidance, clients see genuine body transformations — improved muscle tone, fat loss, and lasting confidence.',
  },
];

function Benefits() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.15 }
    );

    const cards = sectionRef.current?.querySelectorAll('.benefit-card');
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="section section-dark" id="benefits-section" ref={sectionRef}>
      <div className="container">
        <div className="section-heading">
          <span className="badge-gold">Why Choose MBC4</span>
          <h2>Training That Works <span className="text-gold">For You</span></h2>
          <hr className="gold-line" />
          <p>Whether you're a complete beginner or recovering from injury, every session is designed around your unique needs.</p>
        </div>

        <div className="benefits-grid">
          {benefitsData.map((benefit, i) => (
            <div
              className="benefit-card reveal"
              key={i}
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              <div className="benefit-icon-wrap">
                <i className={`bi ${benefit.icon}`} />
              </div>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Benefits;
