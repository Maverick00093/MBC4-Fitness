import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ResultsPage from './pages/ResultsPage';
import ContactPage from './pages/ContactPage';
import './App.css';

/**
 * MBC4 Fitness — Main Application Component
 * Handles routing, loading screen, and scroll-to-top on navigation
 */
function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  /* Loading screen timer */
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  /* Scroll to top on route change */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <>
      {/* Loading Screen */}
      <div className={`loading-screen ${!loading ? 'hidden' : ''}`}>
        <div className="loading-logo">
          <span className="mbc4">MBC4</span>
          <span className="fitness"> FITNESS</span>
        </div>
        <div className="loading-bar">
          <div className="loading-bar-inner" />
        </div>
      </div>

      {/* Main App */}
      <div className={`app-wrapper ${loading ? 'app-hidden' : 'app-visible'}`}>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
}

export default App;
