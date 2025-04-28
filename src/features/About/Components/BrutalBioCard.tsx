"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

export default function BrutalBioCard () {
  const [hovered, setHovered] = useState<boolean>(false);
  const paragraphsRef = useRef<Array<HTMLParagraphElement | null>>([]);

  useEffect(() => {
    // Animation simple des paragraphes sans dépendre de ScrollTrigger
    const elements = paragraphsRef.current.filter(Boolean);
    gsap.fromTo(
      elements,
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        stagger: 0.2,
        duration: 0.6,
        delay: 0.5, // Délai suffisant pour éviter les problèmes de timing
      }
    );
  }, []);

  return (
    <div
      className={`bg-white p-8 border-4 border-black transition-shadow duration-300 ${
        hovered ? "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]" : ""
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <h2 className="text-3xl font-bold mb-8 border-b-4 border-black pb-2 inline-block">
        MON PARCOURS
      </h2>

      <p
        className="text-xl mb-6"
        ref={(el) => {
          paragraphsRef.current[0] = el;
        }}
      >
        Développeur Full-Stack passionné avec une formation en droit du
        numérique (Master). Mon parcours mêle expertise technique et juridique,
        me permettant de créer des solutions web qui respectent les cadres
        légaux et éthiques.
      </p>

      <p
        className="text-xl mb-6"
        ref={(el) => {
          paragraphsRef.current[1] = el;
        }}
      >
        Mon travail se concentre sur le développement d&apos;applications web
        modernes, interactives et accessibles, avec une attention particulière à
        l&apos;expérience utilisateur et aux animations.
      </p>

      <div className="flex justify-end"></div>
    </div>
  );
};
