import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

/**
 * Navbar Component
 * Fixed top navigation with transparent-to-solid transition on scroll
 * Includes mobile hamburger menu with Bootstrap collapse
 */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Close mobile menu on route change */
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/results', label: 'Results' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <nav className={`navbar-custom ${scrolled ? 'navbar-scrolled' : ''}`} id="main-navbar">
      <div className="container">
        <div className="navbar-inner">
          {/* Logo */}
          <Link to="/" className="navbar-logo" id="navbar-logo">
            <span className="logo-mbc4">MBC4</span>
            <span className="logo-fitness">FITNESS</span>
          </Link>

          {/* Desktop Nav Links */}
          <ul className="navbar-links" id="navbar-links-desktop">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`nav-link-custom ${location.pathname === link.path ? 'active' : ''}`}
                >
                  {link.label}
                  <span className="nav-underline" />
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA Button (Desktop) */}
          <Link to="/contact" className="btn-gold navbar-cta" id="navbar-cta-desktop">
            Book Free Session
          </Link>

          {/* Mobile Hamburger */}
          <button
            className={`hamburger ${mobileOpen ? 'open' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
            id="navbar-hamburger"
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${mobileOpen ? 'mobile-menu-open' : ''}`} id="mobile-menu">
          <ul className="mobile-nav-links">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`mobile-nav-link ${location.pathname === link.path ? 'active' : ''}`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            to="/contact"
            className="btn-gold mobile-cta"
            onClick={() => setMobileOpen(false)}
            id="mobile-cta"
          >
            Book Free Session
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
