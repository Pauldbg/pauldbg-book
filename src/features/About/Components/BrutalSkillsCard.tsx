// src/features/About/Components/BrutalSkillsCard.jsx
"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import styles from "../styles/about.module.css";

interface Skill {
  id: number;
  name: string;
}

// Tableau d'objets Skill
const skills: Skill[] = [
  { id: 1, name: "Next.js" },
  { id: 2, name: "React.js" },
  { id: 3, name: "Node.js" },
  { id: 4, name: "TypeScript" },
  { id: 5, name: "GSAP" },
  { id: 6, name: "Tailwind CSS" },
];

export default function BrutalSkillsCard() {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const [isClient, setIsClient] = useState<boolean>(false);

  // S'assurer que le composant est monté côté client
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Ne pas initialiser les animations si on n'est pas côté client
    if (!isClient) return;

    const initAnimation = async () => {
      try {
        const ScrollTriggerModule = await import("gsap/dist/ScrollTrigger");
        gsap.registerPlugin(ScrollTriggerModule.ScrollTrigger);

        // Animation de la carte
        if (cardRef.current) {
          gsap.fromTo(
            cardRef.current,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              scrollTrigger: {
                trigger: cardRef.current,
                start: "top 80%",
              },
            }
          );
        }

        // Animation des items - assurons-nous que les refs sont bien initialisées
        const validItems = itemsRef.current.filter((item) => item !== null);

        if (validItems.length > 0) {
          gsap.fromTo(
            validItems,
            { opacity: 0, x: 30 },
            {
              opacity: 1,
              x: 0,
              stagger: 0.15,
              duration: 0.8,
              scrollTrigger: {
                trigger: cardRef.current,
                start: "top 70%",
              },
            }
          );
        }
      } catch (error) {
        console.error("Animation error:", error);
      }
    };

    // Exécuter l'initialisation immédiatement, sans setTimeout
    initAnimation();

    return () => {
      // Nettoyage
      if (typeof ScrollTrigger !== "undefined") {
        ScrollTrigger.getAll().forEach((st) => st.kill());
      }
    };
  }, [isClient]); // Dépendance sur isClient

  // Rendu conditionnel pour éviter les erreurs d'hydratation
  if (!isClient) return null;

  return (
    <div
      ref={cardRef}
      className={`bg-white p-8 border-4 border-black shadow-lg ${
        styles.brutalBox || ""
      }`}
      style={{ opacity: 0 }} // Assurez-vous qu'il commence invisible
    >
      <h2 className="text-2xl sm:text-3xl font-bold mb-8 border-b-4 border-black pb-2 inline-block">
        TECH STACK
      </h2>
      <ul className="space-y-4 text-xl">
        {skills.map((skill, index) => (
          <li
            key={skill.id}
            className="flex items-center"
            ref={(el) => {
              itemsRef.current[index] = el;
            }}
          >
            <span className="inline-block w-4 h-4 bg-black mr-4"></span>
            {skill.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
