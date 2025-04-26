// app/about/page.jsx
"use client";

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

// Import dynamique avec ssr désactivé pour éviter le flash
const AboutSection = dynamic(() => import("@/src/features/About/AboutSection"), { 
  ssr: false 
});

export default function AboutPage() {
  const [pageLoaded, setPageLoaded] = useState(false);
  
  useEffect(() => {
    // Un petit délai pour s'assurer que tout est initialisé
    const timer = setTimeout(() => {
      setPageLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <main 
      className="min-h-screen bg-gray-50 transition-opacity duration-300"
      style={{ opacity: pageLoaded ? 1 : 0 }}
    >
      <AboutSection />
    </main>
  );
}