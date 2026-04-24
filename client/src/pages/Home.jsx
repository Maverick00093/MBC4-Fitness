import React from 'react';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import Benefits from '../components/Benefits';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import AboutPreview from '../components/AboutPreview';
import CTABanner from '../components/CTABanner';

/**
 * Home Page
 * Assembles all home page sections in order
 */
function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Benefits />
      <Services />
      <Testimonials />
      <AboutPreview />
      <CTABanner />
    </>
  );
}

export default Home;
