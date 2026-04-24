import React from 'react';
import './WhatsAppButton.css';

/**
 * WhatsApp Floating Button
 * Fixed bottom-right with pulse animation
 */
function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/447723622065?text=Hi%20Tyhe%2C%20I%27d%20like%20to%20book%20a%20free%20consultation%20at%20MBC4%20Fitness."
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-button"
      id="whatsapp-button"
      aria-label="Contact us on WhatsApp"
    >
      <i className="bi bi-whatsapp" />
      <span className="whatsapp-pulse" />
    </a>
  );
}

export default WhatsAppButton;
