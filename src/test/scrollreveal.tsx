'use client';

import { useEffect } from 'react';
import ScrollReveal from 'scrollreveal';

export const ScrollRevealTest = () => {
  useEffect(() => {
    // Configuration globale
    const sr = ScrollReveal({
      distance: '60px',
      duration: 1000,
      easing: 'cubic-bezier(0.5, 0, 0, 1)',
      reset: false
    });
    
    // Animations par section
    sr.reveal('.header', { origin: 'top' });
    sr.reveal('.features .feature', { 
      origin: 'bottom', 
      interval: 200   // délai entre chaque élément
    });
    sr.reveal('.testimonials', { origin: 'left' });
    sr.reveal('.contact', { origin: 'right' });
    
    return () => sr.destroy();
  }, []);
  
  return (
    <div>
      <header className="header">...</header>
      <section className="features">
        <div className="feature">Feature 1</div>
        <div className="feature">Feature 2</div>
        <div className="feature">Feature 3</div>
      </section>
      <section className="testimonials">...</section>
      <section className="contact">...</section>
    </div>
  );
}