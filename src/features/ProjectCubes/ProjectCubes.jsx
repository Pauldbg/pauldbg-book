// src/features/ProjectCubes/ProjectCubes.jsx
"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Link from 'next/link';

// Données simplifiées avec seulement 3 projets
const projects = [
  { id: 1, title: "Projet 1", link: "/projets/projet-1" },
  { id: 2, title: "Projet 2", link: "/projets/projet-2" },
  { id: 3, title: "Projet 3", link: "/projets/projet-3" },
];

export default function ProjectCubes() {
  const containerRef = useRef(null);
  const sectionsRef = useRef([]);
  const framesRef = useRef([]);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const initAnimation = async () => {
      // Importe et enregistre ScrollTrigger
      const ScrollTriggerModule = await import('gsap/dist/ScrollTrigger');
      gsap.registerPlugin(ScrollTriggerModule.ScrollTrigger);
      
      // Assure-toi que les refs sont définies
      if (!containerRef.current) return;
      
      // Configure une animation par cadre
      framesRef.current.forEach((frame, index) => {
        if (!frame || !sectionsRef.current[index]) return;
        
        // Cache d'abord le cadre et positionne-le beaucoup plus à gauche
        gsap.set(frame, { 
          opacity: 0, 
          x: -300 // Augmenté pour un déplacement plus visible
        });
        
        // Animation d'entrée - plus lente et avec un meilleur timing
        gsap.timeline({
          scrollTrigger: {
            trigger: sectionsRef.current[index],
            start: "top 80%", // Commence plus tôt
            end: "top 20%",   // Finit plus tard
            scrub: 1,         // Ralentis pour une animation plus fluide
            // markers: true,
          }
        })
        .to(frame, {
          opacity: 1,
          x: 0,
          duration: 2,       // Plus long pour voir mieux le mouvement
          ease: "power2.out"
        });
        
        // Animation de sortie - plus dramatique
        gsap.timeline({
          scrollTrigger: {
            trigger: sectionsRef.current[index],
            start: "top 0%",    // Commence quand la section atteint le haut
            end: "top -50%",    // Plus d'espace pour l'animation de sortie
            scrub: 1,
            // markers: true,
          }
        })
        .to(frame, {
          opacity: 0,
          x: 300,            // Augmenté pour un mouvement plus visible vers la droite
          duration: 2,       // Plus long pour voir mieux le mouvement
          ease: "power2.in"
        });
      });
    };
    
    // Petite attente pour s'assurer que le DOM est correctement rendu
    setTimeout(initAnimation, 100);
    
    return () => {
      if (ScrollTrigger) {
        ScrollTrigger.getAll().forEach(st => st.kill());
      }
    };
  }, []);
  
  return (
    <div ref={containerRef} className="w-full">
      {projects.map((project, index) => (
        <section 
          key={project.id}
          ref={el => sectionsRef.current[index] = el}
          className="min-h-screen flex items-center justify-center py-32"
        >
          <Link href={project.link} className="no-underline">
            <div
              ref={el => framesRef.current[index] = el}
              className="w-[50vw] h-[50vh] flex items-center justify-center border-2 border-black rounded-md bg-white shadow-lg"
              style={{ willChange: "opacity, transform" }}
            >
              <div className="text-center p-8">
                <h3 className="text-3xl font-bold mb-4">{project.title}</h3>
                <div className="w-16 h-1 bg-black mx-auto my-4"></div>
                <p className="text-xl">Cliquez pour voir ce projet</p>
              </div>
            </div>
          </Link>
        </section>
      ))}
      
      {/* Espace pour que la dernière animation fonctionne correctement */}
      <div className="h-screen"></div>
    </div>
  );
}