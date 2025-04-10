"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function BrutalHeader({ title, subtitle }) {
  const headerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const borderRef = useRef(null);

  useEffect(() => {
    // Animation brutalist du titre et sous-titre
    gsap.fromTo(
      titleRef.current,
      { x: -20, opacity: 0, skewX: 5 },
      { x: 0, opacity: 1, skewX: 0, duration: 0.5, ease: "power2.out" }
    );

    if (subtitleRef.current) {
      gsap.fromTo(
        subtitleRef.current,
        { x: -15, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, delay: 0.2, ease: "power2.out" }
      );
    }

    // Animation de fluctuation de la bordure
    const updateWavePath = () => {
      if (!borderRef.current) return;

      const width = headerRef.current.clientWidth; // Utiliser la largeur du header
      const points = [];
      const segments = 10;

      // Position Y de départ
      const baseY = 2; // Position de base pour la ligne

      for (let i = 0; i <= segments; i++) {
        const x = (width / segments) * i;
        //* Amplitude aléatoire plus visible
        const y = baseY + (Math.random() * 8 - 4); // ±4px au lieu de ±6px
        points.push(`${x},${y}`);
      }

      borderRef.current.setAttribute("points", points.join(" "));
    };

    // Exécuter au démarrage et toutes les 1.5 secondes
    updateWavePath();
    const interval = setInterval(updateWavePath, 1000); // 1 seconde

    return () => clearInterval(interval);
  }, []); // Fermeture de useEffect manquante

  return (
    <header ref={headerRef} className="w-full py-12 relative">
      <div className="container mx-auto px-4">
        <h1
          ref={titleRef}
          className="text-7xl sm:text-9xl font-bold uppercase mb-2 leading-none"
        >
          {title}
        </h1>
        {subtitle && (
          <p
            ref={subtitleRef}
            className="text-2xl sm:text-4xl font-mono mt-4 pl-2 border-l-8 border-black"
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* Bordure ondulée */}
      <div className="absolute bottom-0 left-0 w-full h-8 overflow-visible">
        <svg
          width="100%"
          height="8px"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <polyline
            ref={borderRef}
            fill="none"
            stroke="black"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            points="0,2 100,2" // Points initiaux par défaut
          />
        </svg>

        {/* Ajouter une ligne droite en dessous pour combler les trous */}
      </div>
    </header>
  );
}
