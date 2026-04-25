import React, { useState, useEffect, useRef } from 'react';
import { API_ENDPOINTS } from '../api/config';
import './ContactPage.css';

/**
 * Contact & Book Page
 * Split layout with working contact/booking forms, map, and info
 */
function ContactPage() {
  const [activeTab, setActiveTab] = useState('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    goal: '',
    experience: '',
    message: '',
    preferredTime: '',
    service: '',
    date: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const res = await fetch(API_ENDPOINTS.CONTACT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          goal: formData.goal,
          experience: formData.experience,
          message: formData.message,
          preferredTime: formData.preferredTime,
        }),
      });
      const data = await res.json();

      if (data.success) {
        setStatus({ type: 'success', message: data.message });
        setFormData({ name: '', email: '', phone: '', goal: '', experience: '', message: '', preferredTime: '', service: '', date: '' });
      } else {
        const errorMsg = data.errors
          ? data.errors.map((e) => e.message).join('. ')
          : data.error;
        setStatus({ type: 'error', message: errorMsg });
      }
    } catch {
      setStatus({
        type: 'error',
        message: 'Unable to connect to the server. Please try calling us at +44 7723 622065.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const res = await fetch(API_ENDPOINTS.BOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          date: formData.date,
          time: formData.preferredTime,
          message: formData.message,
        }),
      });
      const data = await res.json();

      if (data.success) {
        setStatus({ type: 'success', message: data.message });
        setFormData({ name: '', email: '', phone: '', goal: '', experience: '', message: '', preferredTime: '', service: '', date: '' });
      } else {
        const errorMsg = data.errors
          ? data.errors.map((e) => e.message).join('. ')
          : data.error;
        setStatus({ type: 'error', message: errorMsg });
      }
    } catch {
      setStatus({
        type: 'error',
        message: 'Unable to connect to the server. Please try calling us at +44 7723 622065.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      {/* Hero */}
      <section className="contact-hero">
        <div className="container contact-hero-content">
          <span className="badge-gold">Get In Touch</span>
          <h1>Contact <span className="text-gold-gradient">& Book</span></h1>
          <p>Ready to start? Book your free consultation or send us a message. We'll get back to you within 24 hours.</p>
        </div>
      </section>

      {/* Main Content */}
      <section
        className={`section section-dark ${visible ? 'section-visible' : ''}`}
        ref={sectionRef}
      >
        <div className="container">
          <div className="contact-grid">
            {/* Form Side */}
            <div className="contact-form-side">
              {/* Tab Switcher */}
              <div className="form-tabs">
                <button
                  className={`form-tab ${activeTab === 'contact' ? 'form-tab-active' : ''}`}
                  onClick={() => { setActiveTab('contact'); setStatus({ type: '', message: '' }); }}
                  id="tab-contact"
                >
                  <i className="bi bi-envelope" /> Contact
                </button>
                <button
                  className={`form-tab ${activeTab === 'booking' ? 'form-tab-active' : ''}`}
                  onClick={() => { setActiveTab('booking'); setStatus({ type: '', message: '' }); }}
                  id="tab-booking"
                >
                  <i className="bi bi-calendar-check" /> Book Session
                </button>
              </div>

              {/* Status Message */}
              {status.message && (
                <div className={`form-status ${status.type === 'success' ? 'status-success' : 'status-error'}`}>
                  <i className={`bi ${status.type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-circle-fill'}`} />
                  {status.message}
                </div>
              )}

              {/* Contact Form */}
              {activeTab === 'contact' && (
                <form onSubmit={handleContactSubmit} className="contact-form" id="contact-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="contact-name">Full Name *</label>
                      <input
                        type="text"
                        className="form-input"
                        id="contact-name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="contact-email">Email *</label>
                      <input
                        type="email"
                        className="form-input"
                        id="contact-email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="contact-phone">Phone</label>
                      <input
                        type="tel"
                        className="form-input"
                        id="contact-phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+44 7XXX XXXXXX"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="contact-time">Preferred Time</label>
                      <select
                        className="form-select"
                        id="contact-time"
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleChange}
                      >
                        <option value="">Select time...</option>
                        <option value="Morning">Morning (6am-12pm)</option>
                        <option value="Afternoon">Afternoon (12pm-5pm)</option>
                        <option value="Evening">Evening (5pm-9pm)</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="contact-goal">Fitness Goal</label>
                      <select
                        className="form-select"
                        id="contact-goal"
                        name="goal"
                        value={formData.goal}
                        onChange={handleChange}
                      >
                        <option value="">Select goal...</option>
                        <option value="Lose Weight">Lose Weight</option>
                        <option value="Build Muscle">Build Muscle</option>
                        <option value="General Fitness">General Fitness</option>
                        <option value="Injury Recovery">Injury Recovery</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="contact-experience">Experience Level</label>
                      <select
                        className="form-select"
                        id="contact-experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                      >
                        <option value="">Select level...</option>
                        <option value="Complete Beginner">Complete Beginner</option>
                        <option value="Some Experience">Some Experience</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-message">Message</label>
                    <textarea
                      className="form-textarea"
                      id="contact-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your goals, any injuries, or questions..."
                      rows={4}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-gold submit-btn"
                    disabled={loading}
                    id="contact-submit"
                  >
                    {loading ? (
                      <>
                        <span className="spinner" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-send" />
                        Book My Free Consultation
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Booking Form */}
              {activeTab === 'booking' && (
                <form onSubmit={handleBookingSubmit} className="contact-form" id="booking-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="booking-name">Full Name *</label>
                      <input
                        type="text"
                        className="form-input"
                        id="booking-name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="booking-email">Email *</label>
                      <input
                        type="email"
                        className="form-input"
                        id="booking-email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="booking-phone">Phone</label>
                      <input
                        type="tel"
                        className="form-input"
                        id="booking-phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+44 7XXX XXXXXX"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="booking-service">Service *</label>
                      <select
                        className="form-select"
                        id="booking-service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select service...</option>
                        <option value="Free Consultation">Free Consultation</option>
                        <option value="1-on-1 Personal Training">1-on-1 Personal Training</option>
                        <option value="Body Transformation (12 weeks)">Body Transformation (12 weeks)</option>
                        <option value="Injury-Safe Training">Injury-Safe Training</option>
                        <option value="Body Shaping Class">Body Shaping Class</option>
                        <option value="Weight Loss Programme">Weight Loss Programme</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="booking-date">Preferred Date</label>
                      <input
                        type="date"
                        className="form-input"
                        id="booking-date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="booking-time">Preferred Time</label>
                      <select
                        className="form-select"
                        id="booking-time"
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleChange}
                      >
                        <option value="">Select time...</option>
                        <option value="Morning">Morning (6am-12pm)</option>
                        <option value="Afternoon">Afternoon (12pm-5pm)</option>
                        <option value="Evening">Evening (5pm-9pm)</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="booking-message">Additional Notes</label>
                    <textarea
                      className="form-textarea"
                      id="booking-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Any injuries, preferences, or questions..."
                      rows={3}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-gold submit-btn"
                    disabled={loading}
                    id="booking-submit"
                  >
                    {loading ? (
                      <>
                        <span className="spinner" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-calendar-check" />
                        Request Booking
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Info Side */}
            <div className="contact-info-side">
              <div className="info-card">
                <h3>Get In Touch</h3>
                <p>We'd love to hear from you. Reach out by phone, WhatsApp, or fill out the form.</p>

                <div className="info-items">
                  <div className="info-item">
                    <div className="info-icon">
                      <i className="bi bi-geo-alt-fill" />
                    </div>
                    <div>
                      <h4>Location</h4>
                      <p>First Floor, West 12 Shopping Centre<br />London W12 8PP</p>
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="info-icon">
                      <i className="bi bi-telephone-fill" />
                    </div>
                    <div>
                      <h4>Phone</h4>
                      <a href="tel:+447723622065">+44 7723 622065</a>
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="info-icon">
                      <i className="bi bi-whatsapp" />
                    </div>
                    <div>
                      <h4>WhatsApp</h4>
                      <a href="https://wa.me/447723622065" target="_blank" rel="noopener noreferrer">
                        Message us on WhatsApp
                      </a>
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="info-icon">
                      <i className="bi bi-train-front-fill" />
                    </div>
                    <div>
                      <h4>Nearest Tube</h4>
                      <p>Goldhawk Road (0.34 miles)</p>
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="info-icon">
                      <i className="bi bi-clock-fill" />
                    </div>
                    <div>
                      <h4>Hours</h4>
                      <p>Mon-Sun: 6am - 9pm<br />By appointment</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="contact-map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2484.0!2d-0.2246!3d51.5074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sWest+12+Shopping+Centre!5e0!3m2!1sen!2suk!4v1700000000000!5m2!1sen!2suk"
                  width="100%"
                  height="250"
                  style={{ border: 0, borderRadius: '12px' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="MBC4 Fitness Location"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactPage;
