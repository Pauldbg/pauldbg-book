"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function BrutalHeader({ title, subtitle }) {
  const headerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const borderRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  // S'assurer que le composant n'est rendu que côté client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    // Animation brutalist du titre avec animation améliorée
    gsap.fromTo(
      titleRef.current,
      {
        y: -5,
        x: -20,
        opacity: 0,
        skewX: 5,
        scale: 0.98,
      },
      {
        y: 0,
        x: 0,
        opacity: 1,
        skewX: 0,
        scale: 1,
        duration: 0.7,
        ease: "power3.out",
      }
    );

    if (subtitleRef.current) {
      gsap.fromTo(
        subtitleRef.current,
        {
          y: 5,
          x: -10,
          opacity: 0,
          scale: 0.98,
          skewX: 2,
        },
        {
          y: 0,
          x: 0,
          opacity: 1,
          scale: 1,
          skewX: 0,
          duration: 0.8,
          delay: 0.35,
          ease: "power3.out",
        }
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
  }, [isMounted]); // Dépendance à isMounted

  // Rendu conditionnel
  if (!isMounted) {
    return null; // Ne rien afficher pendant le chargement côté client
  }

  return (
    <header ref={headerRef} className="w-full py-12 relative">
      <div className="container mx-auto px-4">
        <h1
          ref={titleRef}
          className="text-7xl sm:text-9xl font-bold uppercase mb-2 leading-none opacity-0"
        >
          {title}
        </h1>
        {subtitle && (
          <p
            ref={subtitleRef}
            className="text-2xl sm:text-4xl font-mono mt-4 pl-2 border-l-8 border-black opacity-0"
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
      </div>
    </header>
  );
}
