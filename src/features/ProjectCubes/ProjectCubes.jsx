// src/features/ProjectCubes/ProjectCubes.jsx
"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Link from "next/link";

// Données des projets avec les paths SVG
const projects = [
  {
    id: 1,
    title: "Projet 1",
    link: "/projets/projet-1",
    path: "M50,10 L350,30 L390,100 L250,250 L300,290 L80,270 L10,200 L30,50 Z", // Forme irrégulière
  },
  {
    id: 2,
    title: "Projet 2",
    link: "/projets/projet-2",
    path: "M50,10 L350,30 L340,100 L370,250 L300,290 L80,270 L10,200 L30,50 Z", // Forme irrégulière
  },
  {
    id: 3,
    title: "Projet 3",
    link: "/projets/projet-3",
    path: "M50,10 L320,30 L300,100 L370,250 L300,290 L80,270 L10,230 L30,50 Z", // Forme irrégulière
  },
];

export default function ProjectCubes() {
  const containerRef = useRef(null);
  const sectionsRef = useRef([]);
  const svgRef = useRef([]);
  const contentRef = useRef([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const initAnimation = async () => {
      const ScrollTriggerModule = await import("gsap/dist/ScrollTrigger");
      gsap.registerPlugin(ScrollTriggerModule.ScrollTrigger);

      if (!containerRef.current) return;

      // Configurer l'animation de dessin pour chaque SVG
      svgRef.current.forEach((svg, index) => {
        if (!svg || !sectionsRef.current[index]) return;

        // Sélectionne le path du cadre
        const framePath = svg.querySelector(".frame-path");
        const content = contentRef.current[index];

        if (!framePath || !content) return;

        // Calcule la longueur du path
        const pathLength = framePath.getTotalLength();

        // Configure l'état initial
        gsap.set(framePath, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
          opacity: 1,
        });

        gsap.set(content, {
          opacity: 0,
          y: 20,
        });

        // Animation d'entrée
        gsap
          .timeline({
            scrollTrigger: {
              trigger: sectionsRef.current[index],
              start: "top 90%",
              end: "top 20%",
              scrub: 2,
            },
          })
          .to(framePath, {
            strokeDashoffset: 0,
            duration: 5,
            ease: "power2.inOut",
          })
          // Commence l'animation du texte quand le cadre est dessiné à 70%
          .to(
            content,
            {
              opacity: 1,
              y: 0,
              duration: 2,
              ease: "power1.inOut",
            },
            "-=3.5"
          ); // Cette valeur détermine le chevauchement

        // Animation de sortie - disparition du contenu puis effacement du cadre
        gsap
          .timeline({
            scrollTrigger: {
              trigger: sectionsRef.current[index],
              start: "top 10%",
              end: "top -60%",
              scrub: 2,
            },
          })
          // D'abord faire disparaître le texte
          .to(content, {
            opacity: 0,
            y: -20,
            duration: 1,
          })
          // Puis commencer à effacer le cadre avant que le texte soit complètement disparu
          .to(
            framePath,
            {
              strokeDashoffset: -pathLength,
              duration: 3,
            },
            "-=0.7"
          ); // Commence l'effacement du cadre quand le texte est disparu à 70%
      });
    };

    setTimeout(initAnimation, 100);

    return () => {
      if (ScrollTrigger) {
        ScrollTrigger.getAll().forEach((st) => st.kill());
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full">
      {projects.map((project, index) => (
        <section
          key={project.id}
          ref={(el) => (sectionsRef.current[index] = el)}
          className="min-h-screen flex items-center justify-center py-32"
        >
          <Link href={project.link} className="no-underline">
            <div className="relative">
              <svg
                ref={(el) => (svgRef.current[index] = el)}
                width="500"
                height="300"
                viewBox="0 0 400 300"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="cursor-pointer"
              >
                <path
                  className="frame-path"
                  d={project.path}
                  stroke="black"
                  strokeWidth="3"
                  fill="white"
                  fillOpacity="0.1"
                />
              </svg>

              <div
                ref={(el) => (contentRef.current[index] = el)}
                className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
              >
                <div className="text-center">
                  <h3 className="text-2xl font-bold">{project.title}</h3>
                  <div className="w-12 h-0.5 bg-black mx-auto my-3"></div>
                  <p className="text-lg">Voir le projet</p>
                </div>
              </div>
            </div>
          </Link>
        </section>
      ))}

      <div className="h-screen"></div>
    </div>
  );
}
