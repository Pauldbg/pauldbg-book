// src/features/ScrollIndicator/ScrollIndicator.jsx
"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function ScrollIndicator() {
  const textRef = useRef(null);
  const arrowRef = useRef(null);
  
  useEffect(() => {
    // Animation répétitive pour l'indicateur
    gsap.to(arrowRef.current, {
      y: 10,
      duration: 1.2,
      repeat: -1, // Répéter indéfiniment
      yoyo: true, // Aller-retour
      ease: "power1.inOut"
    });
    
    // Animation du texte
    gsap.from(textRef.current, {
      opacity: 0,
      y: -10,
      duration: 1,
      delay: 1.5 // Apparaît après l'animation du logo
    });
  }, []);

  return (
    <div className="mt-8 text-center" ref={textRef}>
      <p className="text-sm text-gray-500 font-light tracking-widest uppercase mb-2">
        Scroll pour découvrir
      </p>
      <div ref={arrowRef} className="mx-auto w-6 h-6">
        <svg 
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg" 
          className="w-full h-full"
        >
          <path 
            d="M12 4L12 20M12 20L18 14M12 20L6 14" 
            stroke="black" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}