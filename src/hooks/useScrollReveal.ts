// hooks/useScrollReveal.tsx
'use client'

import { useEffect } from 'react';

type ScrollRevealOptions = {
  origin?: 'top' | 'right' | 'bottom' | 'left';
  distance?: string;
  duration?: number;
  delay?: number;
  interval?: number;
  reset?: boolean;
  viewFactor?: number;
  easing?: string;
  scale?: number;
  mobile?: boolean;
  desktop?: boolean;
};

export default function useScrollReveal(
  selector: string, 
  options: ScrollRevealOptions = {}
) {
  useEffect(() => {
    async function initScrollReveal() {
      if (typeof window === 'undefined') return;
      
      try {
        const ScrollReveal = (await import('scrollreveal')).default;
        
        // Options par défaut
        const defaultOptions = {
          origin: 'bottom',
          distance: '100px',
          duration: 800,
          delay: 0,
          easing: 'cubic-bezier(0.5, 0, 0, 1)',
          reset: true,
          viewFactor: 0.1,
          mobile: true
        };
        
        // Crée l'instance ScrollReveal avec les options combinées
        const sr = ScrollReveal({
          ...defaultOptions,
          ...options
        });
        
        // Anime les éléments
        sr.reveal(selector, {
          beforeReveal: (el: HTMLElement) => {
            el.style.opacity = '1';
          }
        });
        
        return () => {
          // Nettoyage si nécessaire
          sr.destroy();
        };
      } catch (error) {
        console.error('Erreur lors de l\'initialisation de ScrollReveal:', error);
      }
    }
    
    initScrollReveal();
  }, [selector, options]);
}