import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Services.css';

/**
 * Services Preview Component
 * 6 animated cards with hover 3D tilt effect
 */
const servicesData = [
  {
    icon: 'bi-person-arms-up',
    title: '1-on-1 Personal Training',
    description:
      'Dedicated one-on-one sessions tailored to your goals. Every rep, every set, every session designed specifically for you.',
    price: 'From £45/session',
  },
  {
    icon: 'bi-clipboard2-pulse',
    title: 'Custom Fitness & Nutrition',
    description:
      'Comprehensive workout and meal plans built around your lifestyle, preferences, and dietary needs for sustainable results.',
    price: 'Included with PT',
  },
  {
    icon: 'bi-lightning-charge',
    title: 'Body Transformation',
    description:
      '12-week intensive programme combining training, nutrition, and accountability to completely reshape your body and mindset.',
    price: 'From £399',
  },
  {
    icon: 'bi-bandaid',
    title: 'Injury-Safe Training',
    description:
      'Specialised training for clients with joint issues, hypermobility, or injuries. Build strength without risking further damage.',
    price: 'From £50/session',
  },
  {
    icon: 'bi-people',
    title: 'Body Shaping Classes',
    description:
      'Small group sessions focused on toning, sculpting, and building lean muscle. The energy of a class with personalised attention.',
    price: 'From £15/class',
  },
  {
    icon: 'bi-speedometer2',
    title: 'Weight Loss Programme',
    description:
      'Structured fat-loss plans combining targeted training with nutrition coaching. Lose weight the healthy way and keep it off.',
    price: 'From £299',
  },
];

function Services() {
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
      { threshold: 0.1 }
    );

    const cards = sectionRef.current?.querySelectorAll('.service-card');
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  /* 3D tilt effect handler */
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
  };

  return (
    <section className="section section-alt" id="services-preview" ref={sectionRef}>
      <div className="container">
        <div className="section-heading">
          <span className="badge-gold">What We Offer</span>
          <h2>Services <span className="text-gold">& Programs</span></h2>
          <hr className="gold-line" />
          <p>Every programme is personalised to your goals, fitness level, and lifestyle. No cookie-cutter plans here.</p>
        </div>

        <div className="services-grid">
          {servicesData.map((service, i) => (
            <div
              className="service-card reveal"
              key={i}
              style={{ transitionDelay: `${i * 0.1}s` }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div className="service-icon-wrap">
                <i className={`bi ${service.icon}`} />
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className="service-price">{service.price}</div>
            </div>
          ))}
        </div>

        <div className="services-cta">
          <Link to="/services" className="btn-outline-gold" id="services-view-all">
            <i className="bi bi-arrow-right" />
            View All Services & Pricing
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Services;
