"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export default function PaperCrumpleSVG() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Enregistrer les plugins nécessaires
    gsap.registerPlugin(ScrollTrigger);
    
    if (!containerRef.current || !svgRef.current) return;
    
    // Créer une timeline pour organiser les animations
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        pin: true,
        markers: true
      }
    });
    
    // 1. Animation d'écrasement initial
    timeline.to("#paperShape", {
      duration: 0.3,
      attr: { d: "M20,20 Q100,15 180,20 Q190,140 180,260 Q100,265 20,260 Q10,140 20,20Z" },
      ease: "power1.inOut"
    });
    
    // 2. Animation d'écrasement plus intense avec déformation des bords
    timeline.to("#paperShape", {
      duration: 0.3,
      attr: { d: "M30,40 Q100,25 170,40 Q185,140 170,240 Q100,255 30,240 Q15,140 30,40Z" },
      ease: "power2.inOut"
    });
    
    // 3. Écrasement principal avec froissement maximal
    timeline.to("#paperShape", {
      duration: 0.4,
      attr: { d: "M40,60 Q100,30 160,60 Q180,140 160,220 Q100,250 40,220 Q20,140 40,60Z" },
      ease: "power2.inOut"
    });
    
    // En parallèle, écrasement vertical et élargissement du SVG
    timeline.to("#feuille", {
      duration: 1,
      scaleY: 0.3,
      scaleX: 1.2,
      transformOrigin: "50% 60%",
      ease: "power2.inOut"
    }, "<"); // En même temps que l'animation précédente
    
    // 4. Préparation au lancement
    timeline.to("#feuille", {
      duration: 0.2,
      y: -20,
      rotation: -5,
      ease: "power1.in"
    });
    
    // 5. Animation de jeté
    timeline.to("#feuille", {
      duration: 0.5,
      x: window.innerWidth * 0.3,
      y: -window.innerHeight * 0.4,
      rotation: 45,
      scale: 0.8,
      opacity: 0,
      ease: "power3.in"
    });
    
    // Animation du texte "Paul" dans le SVG
    timeline.to("#nameText", {
      duration: 1,
      scale: 0.9,
      y: 10,
      ease: "power2.inOut"
    }, 0); // Commence au début de l'animation
    
    return () => {
      if (ScrollTrigger) {
        ScrollTrigger.getAll().forEach(st => st.kill());
      }
    };
  }, []);

  return (
    <div className="min-h-[300vh]">
      <div 
        ref={containerRef} 
        className="h-screen flex items-center justify-center"
      >
        <svg 
          ref={svgRef}
          id="feuille" 
          width="300" 
          height="400" 
          viewBox="0 0 200 280"
          style={{
            filter: 'drop-shadow(0px 5px 5px rgba(0,0,0,0.2))',
            transformOrigin: 'center center'
          }}
        >
          {/* Fond de papier */}
          <path 
            id="paperShape" 
            d="M10,10 Q100,0 190,10 Q200,140 190,270 Q100,280 10,270 Q0,140 10,10Z" 
            fill="#fff" 
            stroke="#ddd"
            strokeWidth="1"
          />
          
          {/* Lignes horizontales simulées */}
          <g stroke="#eee" strokeWidth="1">
            <line x1="20" y1="50" x2="180" y2="50" />
            <line x1="20" y1="80" x2="180" y2="80" />
            <line x1="20" y1="110" x2="180" y2="110" />
            <line x1="20" y1="140" x2="180" y2="140" />
            <line x1="20" y1="170" x2="180" y2="170" />
            <line x1="20" y1="200" x2="180" y2="200" />
            <line x1="20" y1="230" x2="180" y2="230" />
          </g>
          
          {/* Texte "Paul" */}
          <text 
            id="nameText"
            x="100" 
            y="140" 
            textAnchor="middle" 
            fontSize="40" 
            fontFamily="Courier, monospace"
            fontWeight="bold"
            fill="#333"
          >
            Paul
          </text>
        </svg>
      </div>
    </div>
  );
}