import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './ServicesPage.css';

/**
 * Services & Pricing Page
 * Three pricing tiers, service details, FAQ accordion, comparison table
 */

const pricingTiers = [
  {
    name: 'Starter',
    price: '45',
    period: 'per session',
    description: 'Perfect for beginners wanting to start their fitness journey with expert guidance.',
    features: [
      '1-on-1 personal training session',
      'Custom exercise programme',
      'Technique coaching & form correction',
      'Progress tracking',
      'Email support between sessions',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Transform',
    price: '399',
    period: '12-week programme',
    description: 'Our most popular package. Complete body transformation with full accountability.',
    features: [
      '36 personal training sessions (3x/week)',
      'Personalised nutrition plan',
      'Weekly body composition tracking',
      'Custom meal prep guidance',
      '24/7 WhatsApp support',
      'Programme adjustments as you progress',
      'Before & after documentation',
    ],
    cta: 'Start Transforming',
    popular: true,
  },
  {
    name: 'Elite',
    price: '599',
    period: '12-week programme',
    description: 'The ultimate premium experience for maximum results in minimum time.',
    features: [
      '60 personal training sessions (5x/week)',
      'Advanced nutrition & supplement plan',
      'Daily check-ins & accountability',
      'Bi-weekly body composition scans',
      'Unlimited WhatsApp support',
      'Lifestyle & sleep optimisation',
      'Competition-level prep available',
      'Priority scheduling',
    ],
    cta: 'Go Elite',
    popular: false,
  },
];

const serviceDetails = [
  {
    icon: 'bi-person-arms-up',
    title: '1-on-1 Personal Training',
    description: 'Every session is designed entirely around you — your goals, your body, your pace. From warm-up to cool-down, you have Tyhe\'s undivided attention and expert coaching.',
    includes: ['Initial fitness assessment', 'Custom workout programme', 'Ongoing technique coaching', 'Progressive overload planning'],
  },
  {
    icon: 'bi-clipboard2-pulse',
    title: 'Custom Nutrition Plans',
    description: 'A training programme is only half the equation. Get a fully personalised meal plan designed around your goals, dietary preferences, and lifestyle.',
    includes: ['Macro & calorie calculation', 'Weekly meal suggestions', 'Supplement recommendations', 'Grocery shopping lists'],
  },
  {
    icon: 'bi-lightning-charge',
    title: 'Body Transformation',
    description: 'The flagship 12-week programme that has earned MBC4 a perfect 5-star rating. Combine intensive training with nutrition coaching for complete physical change.',
    includes: ['Progressive training split', 'Body composition tracking', 'Before & after photos', 'Mindset coaching'],
  },
  {
    icon: 'bi-bandaid',
    title: 'Injury-Safe Training',
    description: 'Specialised sessions for those with joint problems, hypermobility, or recovering from injury. Build strength without risking further damage.',
    includes: ['Movement screening', 'Joint-safe exercise selection', 'Rehabilitation exercises', 'Flexibility & mobility work'],
  },
  {
    icon: 'bi-people',
    title: 'Body Shaping Classes',
    description: 'Small group classes focused on toning and sculpting. Get the energy and motivation of group training with the personalised attention of a private session.',
    includes: ['Max 6 per class', 'Full body conditioning', 'Core & glute focus options', 'All levels welcome'],
  },
  {
    icon: 'bi-speedometer2',
    title: 'Weight Loss Programme',
    description: 'A structured approach to sustainable fat loss. No crash diets, no extreme measures — just proven methods that work long-term.',
    includes: ['Calorie deficit planning', 'Metabolic training', 'Weekly weigh-ins & adjustments', 'Behavioural coaching'],
  },
];

const faqs = [
  {
    question: 'I\'ve never been to a gym before. Is MBC4 right for me?',
    answer: 'Absolutely! Many of our clients started as complete beginners. Tyhe specialises in working with people who\'ve never trained before, creating a comfortable and supportive environment from your very first session. You\'ll learn proper technique, build confidence, and progress at your own pace.',
  },
  {
    question: 'I have an injury / joint problems. Can I still train?',
    answer: 'Yes — this is one of Tyhe\'s specialities. He works with clients who have hypermobility, knee problems, back issues, and other conditions. Every movement is carefully analysed to ensure you\'re training safely while building the strength your joints need for support.',
  },
  {
    question: 'What does the free consultation include?',
    answer: 'Your free consultation is a no-pressure conversation about your fitness goals, current fitness level, any injuries or limitations, and how MBC4 can help. We\'ll discuss the best programme for you and answer all your questions. No commitment required.',
  },
  {
    question: 'How long are the training sessions?',
    answer: 'Standard personal training sessions are 60 minutes. This includes warm-up, the main training block, and cool-down. Every minute is purposeful and focused on your goals.',
  },
  {
    question: 'What are the opening hours?',
    answer: 'MBC4 Fitness operates flexible hours to accommodate busy schedules. Sessions are available from early morning through to evening, 7 days a week. Specific availability is confirmed during your consultation.',
  },
  {
    question: 'Where exactly are you located?',
    answer: 'We\'re on the First Floor of West 12 Shopping Centre, London W12 8PP. The nearest tube station is Goldhawk Road, just 0.34 miles away. Shepherd\'s Bush tube station is also a short walk.',
  },
];

function ServicesPage() {
  const [openFaq, setOpenFaq] = useState(null);
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
      { threshold: 0.1 }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const setRef = (id) => (el) => { sectionRefs.current[id] = el; };

  return (
    <div className="services-page">
      {/* Hero */}
      <section className="services-hero">
        <div className="container services-hero-content">
          <span className="badge-gold">Services & Pricing</span>
          <h1>Invest in <span className="text-gold-gradient">Yourself</span></h1>
          <p>Transparent pricing, no hidden fees. Every programme includes a free initial consultation.</p>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section
        className={`section section-dark ${visible['pricing-section'] ? 'section-visible' : ''}`}
        id="pricing-section"
        ref={setRef('pricing-section')}
      >
        <div className="container">
          <div className="section-heading">
            <span className="badge-gold">Pricing</span>
            <h2>Choose Your <span className="text-gold">Plan</span></h2>
            <hr className="gold-line" />
            <p>All plans include a free initial consultation and personalised approach.</p>
          </div>

          <div className="pricing-grid">
            {pricingTiers.map((tier, i) => (
              <div
                className={`pricing-card ${tier.popular ? 'pricing-popular' : ''}`}
                key={i}
                style={{ transitionDelay: `${i * 0.15}s` }}
              >
                {tier.popular && <div className="popular-badge">Most Popular</div>}
                <h3 className="pricing-name">{tier.name}</h3>
                <div className="pricing-price">
                  <span className="price-currency">£</span>
                  <span className="price-amount">{tier.price}</span>
                </div>
                <span className="pricing-period">{tier.period}</span>
                <p className="pricing-description">{tier.description}</p>
                <ul className="pricing-features">
                  {tier.features.map((feature, j) => (
                    <li key={j}>
                      <i className="bi bi-check-circle-fill" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className={tier.popular ? 'btn-gold pricing-btn' : 'btn-outline-gold pricing-btn'}
                  id={`pricing-cta-${tier.name.toLowerCase()}`}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section
        className={`section section-alt ${visible['details-section'] ? 'section-visible' : ''}`}
        id="details-section"
        ref={setRef('details-section')}
      >
        <div className="container">
          <div className="section-heading">
            <span className="badge-gold">In Detail</span>
            <h2>Our <span className="text-gold">Services</span></h2>
            <hr className="gold-line" />
          </div>

          <div className="details-grid">
            {serviceDetails.map((service, i) => (
              <div className="detail-card" key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="detail-header">
                  <div className="detail-icon">
                    <i className={`bi ${service.icon}`} />
                  </div>
                  <h3>{service.title}</h3>
                </div>
                <p>{service.description}</p>
                <ul className="detail-includes">
                  {service.includes.map((item, j) => (
                    <li key={j}>
                      <i className="bi bi-check2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section
        className={`section section-dark ${visible['comparison-section'] ? 'section-visible' : ''}`}
        id="comparison-section"
        ref={setRef('comparison-section')}
      >
        <div className="container">
          <div className="section-heading">
            <span className="badge-gold">Compare</span>
            <h2>Plan <span className="text-gold">Comparison</span></h2>
            <hr className="gold-line" />
          </div>

          <div className="comparison-table-wrap">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Starter</th>
                  <th className="highlight-col">Transform</th>
                  <th>Elite</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Personal Training Sessions</td>
                  <td>1 session</td>
                  <td className="highlight-col">36 sessions</td>
                  <td>60 sessions</td>
                </tr>
                <tr>
                  <td>Custom Workout Plan</td>
                  <td><i className="bi bi-check-circle-fill text-gold" /></td>
                  <td className="highlight-col"><i className="bi bi-check-circle-fill text-gold" /></td>
                  <td><i className="bi bi-check-circle-fill text-gold" /></td>
                </tr>
                <tr>
                  <td>Nutrition Plan</td>
                  <td><i className="bi bi-dash text-muted" /></td>
                  <td className="highlight-col"><i className="bi bi-check-circle-fill text-gold" /></td>
                  <td><i className="bi bi-check-circle-fill text-gold" /></td>
                </tr>
                <tr>
                  <td>WhatsApp Support</td>
                  <td>Email only</td>
                  <td className="highlight-col">24/7</td>
                  <td>24/7 Priority</td>
                </tr>
                <tr>
                  <td>Body Composition Tracking</td>
                  <td><i className="bi bi-dash text-muted" /></td>
                  <td className="highlight-col">Weekly</td>
                  <td>Bi-weekly scans</td>
                </tr>
                <tr>
                  <td>Programme Adjustments</td>
                  <td><i className="bi bi-dash text-muted" /></td>
                  <td className="highlight-col"><i className="bi bi-check-circle-fill text-gold" /></td>
                  <td><i className="bi bi-check-circle-fill text-gold" /></td>
                </tr>
                <tr>
                  <td>Lifestyle Optimisation</td>
                  <td><i className="bi bi-dash text-muted" /></td>
                  <td className="highlight-col"><i className="bi bi-dash text-muted" /></td>
                  <td><i className="bi bi-check-circle-fill text-gold" /></td>
                </tr>
                <tr>
                  <td className="price-row">Price</td>
                  <td className="price-row">£45</td>
                  <td className="price-row highlight-col">£399</td>
                  <td className="price-row">£599</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        className={`section section-alt ${visible['faq-section'] ? 'section-visible' : ''}`}
        id="faq-section"
        ref={setRef('faq-section')}
      >
        <div className="container">
          <div className="section-heading">
            <span className="badge-gold">Got Questions?</span>
            <h2>Frequently <span className="text-gold">Asked</span></h2>
            <hr className="gold-line" />
          </div>

          <div className="faq-list">
            {faqs.map((faq, i) => (
              <div
                className={`faq-item ${openFaq === i ? 'faq-open' : ''}`}
                key={i}
              >
                <button
                  className="faq-question"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  id={`faq-btn-${i}`}
                >
                  <span>{faq.question}</span>
                  <i className={`bi ${openFaq === i ? 'bi-dash' : 'bi-plus'}`} />
                </button>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section-dark" style={{ textAlign: 'center' }}>
        <div className="container">
          <h2>Not Sure Which Plan? <span className="text-gold">Let's Talk.</span></h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '16px auto 32px' }}>
            Book your free consultation and we'll recommend the best plan for your goals and budget.
          </p>
          <Link to="/contact" className="btn-gold btn-lg" id="services-bottom-cta">
            <i className="bi bi-calendar-check" />
            Book Free Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}

export default ServicesPage;
