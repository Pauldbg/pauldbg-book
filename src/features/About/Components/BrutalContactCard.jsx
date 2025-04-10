'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from '../styles/about.module.css';

// Liens sociaux
const socialLinks = [
  { id: 1, name: "Email", url: "mailto:ton-email@exemple.com" },
  { id: 2, name: "GitHub", url: "https://github.com/ton-github" },
  { id: 3, name: "LinkedIn", url: "https://linkedin.com/in/ton-profil" }
];

export default function BrutalContactCard() {
  const cardRef = useRef(null);
  const linksRef = useRef([]);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const initAnimation = async () => {
      const ScrollTriggerModule = await import('gsap/dist/ScrollTrigger');
      gsap.registerPlugin(ScrollTriggerModule.ScrollTrigger);
      
      // Animation du bloc au scroll
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1,
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%"
          }
        }
      );
      
      // Animation des liens
      gsap.fromTo(linksRef.current,
        { opacity: 0, x: -30 },
        { 
          opacity: 1, 
          x: 0, 
          stagger: 0.2,
          duration: 0.8,
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%"
          }
        }
      );
    };
    
    initAnimation();
  }, []);

  return (
    <div 
      ref={cardRef}
      className={`bg-black p-8 text-white ${styles.brutalBox}`}
    >
      <h2 className="text-2xl sm:text-3xl font-bold mb-8 border-b-4 border-white pb-2 inline-block">CONTACT</h2>
      <div className="space-y-4">
        {socialLinks.map((link, index) => (
          <div 
            key={link.id} 
            className="text-xl"
            ref={el => linksRef.current[index] = el}
          >
            <a 
              href={link.url} 
              className={`hover:underline ${styles.brutalistLink}`}
            >
              {link.name}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}