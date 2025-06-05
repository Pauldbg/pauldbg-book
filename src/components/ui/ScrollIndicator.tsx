"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function ScrollIndicator() {
  const textRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState<boolean>(false); // on controlle l'apparition de l'indicateur

  // S'assurer qu'on est côté client avant d'initialiser GSAP
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Ne pas initialiser les animations si on n'est pas côté client
    if (!isClient) return;

    const animationDelay: number = 3;

    // Animation répétitive pour l'indicateur
    gsap.to(arrowRef.current, {
      y: 10,
      duration: 1.2,
      repeat: -1, // Répéter indéfiniment
      yoyo: true, // Aller-retour
      ease: "power1.inOut",
      delay: animationDelay,
    });

    // Animation du texte
    gsap.from(textRef.current, {
      opacity: 0,
      y: -10,
      duration: 1,
      delay: animationDelay,
    });
  }, [isClient]); // Dépendance sur isClient

  // Rendu conditionnel pour éviter les erreurs d'hydratation
  if (!isClient) return null;

  return (
    <div className="mt-1 text-center" ref={textRef}>
      <p className="text-sm text-gray-500 font-light tracking-widest uppercase mb-2">
        Scroll to discover
      </p>
      <div ref={arrowRef} className="mx-auto w-6 h-6">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <path
            d="M12 4L12 20M12 20L18 14M12 20L6 14"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
