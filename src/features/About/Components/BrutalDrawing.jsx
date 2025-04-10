'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from '../styles/about.module.css';

export default function BrutalDrawing() {
  const svgRef = useRef(null);
  const drawingWrapperRef = useRef(null);

  useEffect(() => {
    if (!svgRef.current) return;
    
    // Animation des traits du dessin après un court délai pour s'assurer que le DOM est chargé
    setTimeout(() => {
      const paths = svgRef.current.querySelectorAll('path');
      
      // Vérifions que chaque élément est bien un chemin SVG
      paths.forEach(path => {
        if (path && typeof path.getTotalLength === 'function') {
          const length = path.getTotalLength();
          
          // Configurons individuellement chaque chemin avec sa longueur
          gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: length,
            opacity: 1
          });
          
          // Animation de ce chemin spécifique
          gsap.to(path, {
            strokeDashoffset: 0,
            duration: 2.5,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: drawingWrapperRef.current,
              start: "top 80%",
              scrub: 1
            }
          });
        }
      });
    }, 100); // Un petit délai pour s'assurer que le SVG est complètement rendu
    
  }, []);

  return (
    <div 
      ref={drawingWrapperRef} 
      className="w-full h-full flex items-center justify-center p-2"
    >
      <div className={`${styles.drawingFrame || ''} relative`}>
        <svg 
          ref={svgRef}
          viewBox="0 0 400 300" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full max-w-full max-h-full"
        >
          {/* Forme abstraite brutaliste - à remplacer par tes propres dessins */}
          <path d="M50,50 L150,30 L250,70 L350,40 L320,150 L250,200 L150,180 L50,220 Z" 
            stroke="black" strokeWidth="3" fill="transparent" />
          
          <path d="M100,100 L200,80 L300,120 M150,150 L250,130 L350,170" 
            stroke="black" strokeWidth="2" fill="transparent" />
            
          <path d="M80,180 C120,160 180,200 220,180 C260,160 320,200 360,180" 
            stroke="black" strokeWidth="3" fill="transparent" />
          
          {/* Éléments décoratifs */}
          <path d="M50,250 L80,230 L110,250 L140,230 L170,250 L200,230 L230,250 L260,230 L290,250 L320,230 L350,250" 
            stroke="black" strokeWidth="2" fill="transparent" />
          
          {/* Points d'accent */}
          <circle cx="100" cy="80" r="5" fill="black" />
          <circle cx="300" cy="100" r="5" fill="black" />
          <circle cx="200" cy="200" r="5" fill="black" />
        </svg>
        
        {/* Note de design : à remplacer par tes propres dessins */}
        <div className="absolute top-0 left-0">
          <div className="p-2 bg-black text-white text-xs rotate-12 inline-block">
            TON DESIGN ICI
          </div>
        </div>
      </div>
    </div>
  );
}