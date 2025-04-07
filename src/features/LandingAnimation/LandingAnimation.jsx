// components/LandingAnimation.jsx
"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export default function LandingAnimation() {
  const svgRef = useRef(null);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const initGSAP = async () => {
      const ScrollTriggerModule = await import('gsap/dist/ScrollTrigger');
      gsap.registerPlugin(ScrollTriggerModule.ScrollTrigger);
      
      // Préparer les chemins pour l'animation
      const paths = svgRef.current.querySelectorAll('path');
      
      // Configurer chaque chemin
      paths.forEach(path => {
        const length = path.getTotalLength();
        
        // Initialiser le chemin avec dash égal à la longueur
        gsap.set(path, { 
          strokeDasharray: length,
          strokeDashoffset: length,
          opacity: 1
        });
      });
      
      // Animer le tracé des chemins au scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: svgRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1
        }
      });
      
      // Animer chaque chemin
      paths.forEach(path => {
        tl.to(path, {
          strokeDashoffset: 0,
          duration: 3,
          ease: "power2.inOut"
        }, "-=2.5"); // Légèrement décalé pour créer un effet de séquence
      });
    };
    
    initGSAP();
    
    return () => {
      if (ScrollTrigger) {
        ScrollTrigger.getAll().forEach(st => st.kill());
      }
    };
  }, []);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 overflow-auto">
      <div className="svg-container max-w-4xl mx-auto pb-16">
        <svg 
          ref={svgRef} 
          width="1110" 
          height="3733" 
          viewBox="0 0 1110 3733" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          style={{ opacity: 1 }}
        >
          <path d="M613.5 1C185.9 462.2 386.333 591.167 540 598L1077.5 338L2 568.5L838 1065V822.5L217.5 1174L805.5 1800.5L752.5 1493.5L73 1747.5" stroke="black" strokeWidth="2"/>
          <path d="M848 2437L611.5 2116L485 2908.5L168.5 3103M848 2437L168.5 3103M848 2437L939 3731.5L168.5 3103" stroke="black" strokeWidth="2"/>
          <path d="M851 2440.5C851 2440.5 1181.5 2513 1094.5 2670C1007.5 2827 886 2951 886 2951" stroke="black" strokeWidth="2"/>
          <path d="M75.5 1747.5L460 2047.5M460 2047.5C460 2047.5 499.5 1944.5 562 1932C624.5 1919.5 720.5 2005.5 720.5 2005.5M460 2047.5C460 2047.5 549.39 2132.47 607.5 2109.5M460 2047.5L562 2031.05M720.5 2005.5C720.5 2005.5 646.263 2094.18 607.5 2109.5M720.5 2005.5L607.5 2023.72M607.5 2109.5C577.5 2177.5 563 2799.5 559.5 3102M559.5 3102H890.5C890.5 3102 890.5 3343 559.5 3348C228.5 3353 167.5 3102 167.5 3102H559.5ZM559.5 3102L761.5 2313.5M562 2031.05C562 2031.05 556.5 1996 573.5 1992.5C590.5 1989 607.5 2023.72 607.5 2023.72M562 2031.05L607.5 2023.72M562 2031.05C562 2031.05 576.338 2068.72 593.5 2064C609.557 2059.58 607.5 2023.72 607.5 2023.72" stroke="black" strokeWidth="2"/>
        </svg>
        
        <div className="mt-8 text-center">
        </div>
      </div>
    </div>
  );
}