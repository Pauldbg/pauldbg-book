'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import BrutalDrawing from './BrutalDrawing';
import styles from '../styles/about.module.css';

export default function BrutalDrawingsCard() {
  const cardRef = useRef(null);
  const [isClient, setIsClient] = useState(false);
  
  // S'assurer que le composant est monté côté client
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  useEffect(() => {
    // Ne pas initialiser les animations si on n'est pas côté client
    if (!isClient) return;
    
    const initAnimation = async () => {
      const ScrollTriggerModule = await import('gsap/dist/ScrollTrigger');
      gsap.registerPlugin(ScrollTriggerModule.ScrollTrigger);
      
      // Animation du bloc au scroll
      gsap.fromTo(cardRef.current,
        { opacity: 0, x: -50 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 1.2,
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 75%"
          }
        }
      );
    };
    
    // Exécuter immédiatement sans setTimeout
    initAnimation();
    
    return () => {
      // Nettoyage
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.getAll().forEach(st => st.kill());
      }
    };
  }, [isClient]); // Dépendance à isClient
  
  // Rendu conditionnel pour éviter les erreurs d'hydratation
  if (!isClient) return null;

  return (
    <div 
      ref={cardRef}
      className={`relative bg-white p-8 border-4 border-black shadow-brutal min-h-[400px] ${styles.brutalBox}`}
      style={{ opacity: 0 }} // Assurez-vous qu'il commence invisible
    >
      <h2 className="text-2xl sm:text-3xl font-bold mb-8 border-b-4 border-black pb-2 inline-block">MES DESSINS</h2>
      
      <div className="mt-4 relative">
        <BrutalDrawing />
      </div>
    </div>
  );
}