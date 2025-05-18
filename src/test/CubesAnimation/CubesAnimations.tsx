// src/features/CubesAnimation/CubesAnimation.tsx
"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BrutalCube from "./components/BrutalCube";

// Définition des données pour nos cubes brutaux
const cubesData = [
  { id: 1, color: "bg-red-500", size: "xl" as const, initialPosition: "left" },
  { id: 2, color: "bg-blue-800", size: "lg" as const, initialPosition: "right" },
  { id: 3, color: "bg-yellow-400", size: "xl" as const, initialPosition: "left" },
  { id: 4, color: "bg-green-600", size: "lg" as const, initialPosition: "right" },
  { id: 5, color: "bg-purple-700", size: "xl" as const, initialPosition: "left" },
];

export default function BrutalCubesAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cubeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const structureRef = useRef<HTMLDivElement>(null);

  // Configuration GSAP avec le hook useGSAP
  useGSAP(() => {
    // Enregistrement du plugin ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Configuration de la timeline principale
    const mainTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        pin: true,
        markers: true, // Pour déboguer (à enlever en production)
      },
    });

    // Animation individuelle pour chaque cube
    cubesData.forEach((cube, index) => {
      const cubeRef = cubeRefs.current[index];
      if (!cubeRef) return;

      // Configuration initiale - plus brutale
      gsap.set(cubeRef, {
        xPercent: cube.initialPosition === "left" ? -120 : 120,
        opacity: 0,
        scale: 0.7,
        rotation: Math.random() * 30 - 15, // Rotation aléatoire entre -15 et 15 degrés
      });

      // Ajout à la timeline principale avec des mouvements plus brutaux
      mainTimeline
        .to(
          cubeRef,
          {
            xPercent: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power1.inOut",
            rotation: Math.random() * 10 - 5, // Légère rotation
          },
          index * 0.3 // Décaler le début de chaque animation
        )
        .to(
          cubeRef,
          {
            y: `${index * 40}px`, // Déplacement plus grand pour l'empilement
            x: index % 2 === 0 ? '30px' : '-30px', // Décalage horizontal alterné
            rotation: index % 2 === 0 ? 5 : -5, // Rotation alternée
            duration: 0.7,
            ease: "power3.out",
          },
          "stack+=0.2" // Utiliser la même étiquette avec un délai
        );
    });

    // Animation finale plus "brutale" pour la structure
    if (structureRef.current) {
      gsap.set(structureRef.current, { opacity: 0, scale: 0.5 });
      
      mainTimeline
        .to(cubeRefs.current, {
          y: (i) => i * 20 - 100, // Regrouper les cubes
          x: 0, // Centrer
          stagger: 0.1,
          duration: 1,
        }, "final")
        .to(structureRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.5,
        }, "final+=0.5");
    }
  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef} 
      className="h-[300vh] relative flex flex-col items-center justify-start pt-20 overflow-x-hidden"
    >
      {/* Section d'animation des cubes */}
      <div className="relative h-[800px] w-full max-w-4xl">
        {cubesData.map((cube, index) => (
          <div
            key={cube.id}
            className="absolute top-20 left-1/2 transform -translate-x-1/2"
          >
            <BrutalCube
              ref={(el) => (cubeRefs.current[index] = el)}
              color={cube.color}
              size={cube.size}
            />
          </div>
        ))}
        
        {/* Structure finale qui apparaît */}
        <div 
          ref={structureRef}
          className="absolute top-60 left-1/2 transform -translate-x-1/2 w-80 h-80 border-8 border-black bg-white"
          style={{ opacity: 0 }}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold">
            STRUCTURE<br/>FINALE
          </div>
          {/* Éléments décoratifs brutaux */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-black"></div>
          <div className="absolute bottom-0 left-0 w-20 h-20 bg-black"></div>
          <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-red-500 rounded-full"></div>
          <div className="absolute bottom-1/4 right-1/4 w-8 h-8 bg-blue-500 rounded-full"></div>
        </div>
      </div>
      
      <div className="mt-[800px] p-8 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-lg">
        <h2 className="text-3xl font-bold mb-4 border-b-4 border-black pb-2">BRUTAL CUBES</h2>
        <p className="text-xl">Cette animation utilise des cubes au style brutaliste avec GSAP et le hook useGSAP.</p>
      </div>
    </div>
  );
}