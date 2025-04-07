// src/features/AnimatedFrame/AnimatedFrame.jsx
"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export default function AnimatedFrame() {
  const svgRef = useRef(null);
  const contentRef = useRef(null);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const initAnimation = async () => {
      const ScrollTriggerModule = await import('gsap/dist/ScrollTrigger');
      gsap.registerPlugin(ScrollTriggerModule.ScrollTrigger);
      
      const svg = svgRef.current;
      const content = contentRef.current;
      
      if (!svg || !content) return;
      
      // Sélectionne le path du cadre
      const framePath = svg.querySelector('.frame-path');
      
      // Calcule la longueur du path
      const pathLength = framePath.getTotalLength();
      
      // Configure l'état initial
      gsap.set(framePath, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
        opacity: 1
      });
      
      gsap.set(content, {
        opacity: 0,
        y: 20
      });
      
      // Animation de dessin du cadre
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: svg,
          start: "top 70%",
          end: "top 30%",
          scrub: 1,
          // markers: true
        }
      });
      
      tl.to(framePath, {
        strokeDashoffset: 0,
        duration: 3,
        ease: "power2.inOut"
      })
      .to(content, {
        opacity: 1,
        y: 0,
        duration: 1
      }, "-=0.5");
    };
    
    initAnimation();
    
    return () => {
      if (ScrollTrigger) {
        ScrollTrigger.getAll().forEach(st => st.kill());
      }
    };
  }, []);

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="relative">
        <svg 
          ref={svgRef}
          width="500" 
          height="300" 
          viewBox="0 0 500 300" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Un cadre décoratif avec des coins ornés */}
          <path 
            className="frame-path"
            d="M120,30 
               C120,30 150,10 180,30 
               L320,30 
               C350,10 380,30 380,30 
               L380,80 
               C400,100 380,120 380,120 
               L380,180 
               C380,180 400,200 380,220 
               L380,270 
               C380,270 350,290 320,270 
               L180,270 
               C150,290 120,270 120,270 
               L120,220 
               C100,200 120,180 120,180 
               L120,120 
               C120,120 100,100 120,80 
               Z"
            stroke="black"
            strokeWidth="3"
            fill="white"
            fillOpacity="0.1"
          />
          
          {/* Ornements de coin */}
          <path 
            className="frame-path"
            d="M120,50 Q140,40 160,50 M340,50 Q360,40 380,50
               M120,250 Q140,260 160,250 M340,250 Q360,260 380,250"
            stroke="black"
            strokeWidth="2"
            fill="none"
          />
        </svg>
        
        <div 
          ref={contentRef}
          className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold">Projet Exemple</h3>
            <div className="w-12 h-0.5 bg-black mx-auto my-3"></div>
            <p className="text-lg">Cliquez pour découvrir</p>
          </div>
        </div>
      </div>
    </div>
  );
}