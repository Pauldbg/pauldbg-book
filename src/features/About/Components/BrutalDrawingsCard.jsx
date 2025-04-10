'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import BrutalDrawing from './BrutalDrawing';
import styles from '../styles/about.module.css';

export default function BrutalDrawingsCard() {
  const cardRef = useRef(null);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
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
    
    initAnimation();
  }, []);

  return (
    <div 
      ref={cardRef}
      className={`relative bg-white p-8 border-4 border-black shadow-brutal min-h-[400px] ${styles.brutalBox}`}
    >
      <h2 className="text-2xl sm:text-3xl font-bold mb-8 border-b-4 border-black pb-2 inline-block">MES DESSINS</h2>
      
      <div className="mt-4 relative">
        <BrutalDrawing />
      </div>
    </div>
  );
}