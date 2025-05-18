// TODO refactorisation avec useGsap
"use client";

import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Préchargement du plugin ScrollTrigger pour éviter les problèmes d'importation dynamique
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function LandingAnimation() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pathsRef = useRef<SVGPathElement[]>([]);
  
  // Utilisation de useEffect pour s'assurer que le DOM est prêt
  // avant d'initialiser les valeurs de getTotalLength
  useEffect(() => {
    if (!svgRef.current) return;
    
    // Collecter les références aux chemins SVG
    pathsRef.current = Array.from(svgRef.current.querySelectorAll("path"));
  }, []);
  
  // Utiliser useGSAP pour l'animation
  useGSAP(() => {
    // Vérifier si nous sommes côté client et si les références sont prêtes
    if (typeof window === "undefined" || !svgRef.current || pathsRef.current.length === 0) return;
    
    // Inverser l'ordre pour l'animation du haut vers le bas
    const reversedPaths = [...pathsRef.current].reverse();
    
    // Configurer chaque chemin
    reversedPaths.forEach((path) => {
      // Vérifier que path est bien un SVGPathElement
      if (!(path instanceof SVGPathElement)) return;
      
      // Calculer la longueur du tracé
      const length = path.getTotalLength ? path.getTotalLength() : 1000;
      
      // Initialiser l'état du tracé
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
        opacity: 1,
      });
    });
    
    // Créer la timeline d'animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "+=220%",
        scrub: 1,
        markers: true,
      },
    });
    
    // Animer chaque chemin séquentiellement
    reversedPaths.forEach((path) => {
      tl.to(
        path,
        {
          strokeDashoffset: 0,
          duration: 3,
          ease: "power2.inOut",
        },
        "-=2.5" // Décalage pour l'effet de séquence
      );
    });
    
    // Pas besoin de nettoyer manuellement, useGSAP s'en chargera
  }, { scope: containerRef, dependencies: [pathsRef.current.length] });

  return (
    <div
      ref={containerRef}
      className="min-h-[250vh] flex items-center justify-center bg-gray-50 p-4 overflow-hidden"
    >
      <div className="svg-container max-w-2xl mx-auto pb-16">
        <svg
          ref={svgRef}
          width="1107"
          height="3733"
          viewBox="0 0 1107 5100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          style={{
            opacity: 1,
            maxHeight: "2600px",
          }}
        >
          <path
            d="M364 3745C302.5 3762.5 200 3905.5 200 3905.5C200 3905.5 359.5 4087 537.5 4075C715.5 4063 751.5 3825.5 751.5 3825.5L537.5 3745C468 3772.5 451.5 3825.5 451.5 3825.5C451.5 3825.5 425.5 3727.5 364 3745Z"
            stroke="black"
            strokeWidth="2"
          />
          <path
            d="M101.5 4150.5L751 3826L535.5 4697L101.5 4150.5Z"
            stroke="black"
            strokeWidth="2"
          />
          <path
            d="M540.5 2759.5L203 3817.5L632.5 3276L228 2982.5L864.5 2851.5C1179.7 3157.37 1123.66 3384.22 753.5 3826"
            stroke="black"
            strokeWidth="2"
          />
          <path
            d="M403 2602.5C403 2602.5 493.5 2481 574.5 2496C655.5 2511 690.31 2533.95 736 2602.5"
            stroke="black"
            strokeWidth="2"
          />
          <path
            d="M735 2598C735 2603.6 704.5 2695 581.5 2745C458.5 2795 402 2598 402 2598"
            stroke="black"
            strokeWidth="2"
          />
          <path
            d="M403 2604L469 2603M733.5 2599C733.5 2599 643 2677 561.5 2665C480 2653 469 2603 469 2603M733.5 2599C733.5 2599 656 2522 583 2537C510 2552 469 2603 469 2603M733.5 2599L624.5 2600.65M469 2603L574.5 2601.41M574.5 2601.41C574.5 2601.41 582 2570.5 601 2575C620 2579.5 624.5 2600.65 624.5 2600.65M574.5 2601.41L624.5 2600.65M574.5 2601.41C574.5 2601.41 579 2629.5 601 2628C623 2626.5 624.5 2600.65 624.5 2600.65"
            stroke="black"
            strokeWidth="2"
          />
          <path
            d="M71.5 2051L583.5 2286L558.5 2238L282.5 2468L401.5 2603"
            stroke="black"
            strokeWidth="2"
          />
          <path
            d="M611.454 1C183.889 542.497 467.299 846.552 620.953 854.575C620.953 854.575 1013.42 548.133 750.443 613.883C487.464 679.633 44 790.586 44 790.586L835.936 1250.25V965.528L215.486 1378.23L803.438 2113.8L750.443 1753.35L70.9978 2051.58"
            stroke="black"
            strokeWidth="2"
          />
        </svg>
      </div>
    </div>
  );
}
