import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './ResultsPage.css';

/**
 * Results / Testimonials Page
 * Full testimonials, success stories, before/after section, Google badge
 */

const fullTestimonials = [
  {
    text: "If you want to train with someone who can motivate and help achieve your fitness goals quickly, I would definitely recommend Tyhe. He talked me through the whole personalised workout programme, taught me the correct techniques, and helped push me to the limits. If you are looking to transform yourself both physically and mentally, train with MBC4 Fitness.",
    name: 'Verified Client',
    rating: 5,
    initials: 'JM',
    highlight: 'Transform yourself both physically and mentally',
  },
  {
    text: "I decided to use a personal trainer as I'm hypermobile and needed to build muscle to support my loose joints. Tyhe was so helpful, constantly analysing every movement to make sure I wasn't putting undue pressure on my joints. I felt completely safe when trying new things. He's definitely a motivator.",
    name: 'Verified Client',
    rating: 5,
    initials: 'SK',
    highlight: 'I felt completely safe when trying new things',
  },
  {
    text: "Starting as someone who didn't have a lot of confidence in the gym, Tyhe was extremely supportive. He asked what my goals were and created a tailor-made fitness plan. I have seen myself getting stronger each day and now look forward to every gym session.",
    name: 'Verified Client',
    rating: 5,
    initials: 'AR',
    highlight: 'I now look forward to every gym session',
  },
  {
    text: "Tyhe's fitness training is amazing. In 12 weeks he transformed my muscle tone and body shape. His knowledge of fitness, diet, the human muscle and mind is incredible. He has taken my health and fitness training to another level. A true professional.",
    name: 'Verified Client',
    rating: 5,
    initials: 'DL',
    highlight: 'In 12 weeks he transformed my muscle tone and body shape',
  },
];

const successStories = [
  {
    title: 'Complete Beginner to Confident',
    category: 'Beginner Journey',
    description: 'Started with zero gym experience and anxiety about working out. After 12 weeks of personalised training, gained confidence, proper technique, and a genuine love for fitness.',
    results: ['Lost 8kg of body fat', 'Gained lean muscle definition', 'Now trains independently 3x/week'],
    icon: 'bi-emoji-smile',
  },
  {
    title: 'Injury Recovery & Strength',
    category: 'Injury Rehabilitation',
    description: 'Dealing with hypermobility and loose joints, needed to build supporting muscle safely. Tyhe\'s careful approach meant zero pain while building genuine strength.',
    results: ['Built joint-supporting muscle', 'Zero injury setbacks', 'Improved mobility & stability'],
    icon: 'bi-bandaid',
  },
  {
    title: '12-Week Body Transformation',
    category: 'Body Transformation',
    description: 'A complete overhaul of body composition through intensive training and nutrition planning. Achieved visible muscle definition and dramatic fat loss.',
    results: ['Transformed muscle tone', 'Complete body shape change', 'Sustainable lifestyle habits'],
    icon: 'bi-lightning-charge',
  },
  {
    title: 'Mental & Physical Change',
    category: 'Mindset Transformation',
    description: 'Beyond the physical changes, experienced a complete mindset shift. Built discipline, self-confidence, and a positive relationship with exercise and nutrition.',
    results: ['Increased self-confidence', 'Better mental health', 'Lasting motivation & discipline'],
    icon: 'bi-brain',
  },
];

const transformations = [
  { label: 'Weight Loss Journey', duration: '12 Weeks', category: 'Fat Loss' },
  { label: 'Muscle Building', duration: '16 Weeks', category: 'Muscle Gain' },
  { label: 'Body Recomposition', duration: '12 Weeks', category: 'Transformation' },
];

function ResultsPage() {
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
    <div className="results-page">
      {/* Hero */}
      <section className="results-hero">
        <div className="container results-hero-content">
          <span className="badge-gold">Client Results</span>
          <h1>Real People. <span className="text-gold-gradient">Real Results.</span></h1>
          <p>Every review is genuine, every transformation is real. See what's possible with MBC4 Fitness.</p>

          {/* Google Rating Prominent Badge */}
          <div className="results-google-badge">
            <div className="rgb-stars">
              {[...Array(5)].map((_, i) => (
                <i className="bi bi-star-fill" key={i} />
              ))}
            </div>
            <span className="rgb-score">5.0</span>
            <span className="rgb-label">Perfect Google Rating</span>
          </div>
        </div>
      </section>

      {/* Full Testimonials */}
      <section
        className={`section section-dark ${visible['full-reviews'] ? 'section-visible' : ''}`}
        id="full-reviews"
        ref={setRef('full-reviews')}
      >
        <div className="container">
          <div className="section-heading">
            <span className="badge-gold">Reviews</span>
            <h2>What Clients <span className="text-gold">Say</span></h2>
            <hr className="gold-line" />
            <p>Verbatim reviews from real MBC4 Fitness clients.</p>
          </div>

          <div className="reviews-grid">
            {fullTestimonials.map((t, i) => (
              <div
                className="review-card-full"
                key={i}
                style={{ transitionDelay: `${i * 0.15}s` }}
              >
                <div className="review-stars">
                  {[...Array(t.rating)].map((_, j) => (
                    <i className="bi bi-star-fill" key={j} />
                  ))}
                </div>
                <div className="review-highlight">"{t.highlight}"</div>
                <blockquote className="review-text">{t.text}</blockquote>
                <div className="review-author">
                  <div className="review-avatar">{t.initials}</div>
                  <div>
                    <span className="review-name">{t.name}</span>
                    <span className="review-source">
                      <i className="bi bi-patch-check-fill" /> Google Review
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section
        className={`section section-alt ${visible['success-stories'] ? 'section-visible' : ''}`}
        id="success-stories"
        ref={setRef('success-stories')}
      >
        <div className="container">
          <div className="section-heading">
            <span className="badge-gold">Success Stories</span>
            <h2>Client <span className="text-gold">Journeys</span></h2>
            <hr className="gold-line" />
            <p>Every client has a unique story. Here are some of the transformations we're most proud of.</p>
          </div>

          <div className="stories-grid">
            {successStories.map((story, i) => (
              <div className="story-card" key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="story-badge">{story.category}</div>
                <div className="story-icon">
                  <i className={`bi ${story.icon}`} />
                </div>
                <h3>{story.title}</h3>
                <p>{story.description}</p>
                <ul className="story-results">
                  {story.results.map((result, j) => (
                    <li key={j}>
                      <i className="bi bi-check-circle-fill" />
                      {result}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before / After Section */}
      <section
        className={`section section-dark ${visible['before-after'] ? 'section-visible' : ''}`}
        id="before-after"
        ref={setRef('before-after')}
      >
        <div className="container">
          <div className="section-heading">
            <span className="badge-gold">Transformations</span>
            <h2>Before & <span className="text-gold">After</span></h2>
            <hr className="gold-line" />
            <p>Visual proof of the transformations achieved through dedicated training with Tyhe.</p>
          </div>

          <div className="transformations-grid">
            {transformations.map((t, i) => (
              <div className="transformation-card" key={i} style={{ transitionDelay: `${i * 0.15}s` }}>
                <div className="transform-visual">
                  <div className="transform-side before">
                    <span className="transform-label">Before</span>
                    <div className="transform-img-wrap">
                      <img
                        src={`/images/transform-${i}-before.jpg`}
                        alt="Before Transformation"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="transform-fallback">
                        <i className="bi bi-person" />
                      </div>
                    </div>
                  </div>
                  <div className="transform-divider">
                    <i className="bi bi-arrow-right" />
                  </div>
                  <div className="transform-side after">
                    <span className="transform-label">After</span>
                    <div className="transform-img-wrap after-glow">
                      <img
                        src={`/images/transform-${i}-after.jpg`}
                        alt="After Transformation"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="transform-fallback">
                        <i className="bi bi-person-arms-up" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="transform-info">
                  <h4>{t.label}</h4>
                  <div className="transform-meta">
                    <span className="transform-duration">
                      <i className="bi bi-clock" /> {t.duration}
                    </span>
                    <span className="transform-cat">{t.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section-alt" style={{ textAlign: 'center' }}>
        <div className="container">
          <h2>Your Transformation <span className="text-gold">Starts Here</span></h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '16px auto 32px' }}>
            Join the list of people who transformed their lives with MBC4 Fitness.
            Book your free consultation today.
          </p>
          <Link to="/contact" className="btn-gold btn-lg" id="results-cta">
            <i className="bi bi-calendar-check" />
            Book Free Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}

export default ResultsPage;
