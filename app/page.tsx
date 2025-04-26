// app/page.js
"use client";
import { useState, useEffect } from "react";
import { BrutalNavButton } from "@/src/features/Navigation/BrutalNavigationButton";
import dynamic from "next/dynamic";

// Imports dynamiques avec ssr désactivé pour éviter le flash
const Logo = dynamic(() => import("@/src/features/DrawLandingAnimation/Logo"), {
  ssr: false,
});
const LandingAnimation = dynamic(
  () => import("@/src/features/DrawLandingAnimation/LandingAnimation"),
  {
    ssr: false,
  }
);
const ScrollIndicator = dynamic(
  () => import("@/src/components/ui/ScrollIndicator"),
  {
    ssr: false,
  }
);
// const ProjectCubes = dynamic(
//   () => import("@/src/features/ProjectCubes/ProjectCubes"),
//   {
//     ssr: false,
//   }
// );

export default function Home() {
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    // Un petit délai pour s'assurer que tout est initialisé
    const timer = setTimeout(() => {
      setPageLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-start bg-gray-50 overflow-x-hidden transition-opacity duration-300"
      style={{ opacity: pageLoaded ? 1 : 0 }}
    >
      {/* Section d'introduction */}
      <div className="w-full p-4">
        {/* Logo qui apparaît au chargement */}
        <div className="py-10 text-center w-full">
          {/* Ajoute plus d'espace vertical autour du logo */}
          <Logo />
        </div>
        <BrutalNavButton />
        <div className="absolute bottom-20 left-0 right-0">
          <ScrollIndicator />
        </div>

        {/* Espace entre les composants */}
        <div className="h-16"></div>

        {/* Animation principale au scroll */}
        <LandingAnimation />
      </div>

      {/* Section des projets */}
      {/* <ProjectCubes />/}
      
      {/* Espace entre les composants */}
      <div className="h-[30vh]"></div>
    </main>
  );
}
