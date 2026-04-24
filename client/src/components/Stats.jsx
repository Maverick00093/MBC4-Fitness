import React, { useEffect, useRef, useState } from 'react';
import './Stats.css';

/**
 * Stats Bar Component
 * Animated counter stats that count up when entering viewport
 */
const statsData = [
  { icon: 'bi-star-fill', value: 5.0, suffix: '★', label: 'Google Rating', isDecimal: true },
  { icon: 'bi-emoji-smile', value: 100, suffix: '%', label: 'Client Satisfaction' },
  { icon: 'bi-geo-alt-fill', value: 0, suffix: '', label: 'West London', isText: true, text: 'W12 8PP' },
  { icon: 'bi-gift', value: 0, suffix: '', label: 'Free Consultation', isText: true, text: 'Book Now' },
];

function Stats() {
  const [visible, setVisible] = useState(false);
  const [counts, setCounts] = useState(statsData.map(() => 0));
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  /* Count-up animation */
  useEffect(() => {
    if (!visible) return;

    const duration = 2000;
    const startTime = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic

      setCounts(
        statsData.map((stat) => {
          if (stat.isText) return 0;
          return stat.isDecimal
            ? parseFloat((stat.value * eased).toFixed(1))
            : Math.round(stat.value * eased);
        })
      );

      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [visible]);

  return (
    <section className="stats-bar" ref={sectionRef} id="stats-bar">
      <div className="container">
        <div className="stats-grid">
          {statsData.map((stat, i) => (
            <div className={`stat-item ${visible ? 'stat-visible' : ''}`} key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
              <i className={`bi ${stat.icon} stat-icon`} />
              <div className="stat-value">
                {stat.isText ? stat.text : `${counts[i]}${stat.suffix}`}
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Stats;
