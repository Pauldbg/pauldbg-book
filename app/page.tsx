// app/page.js
import Logo from '@/src/features/DrawLandingAnimation/Logo';
import LandingAnimation from '@/src/features/DrawLandingAnimation/LandingAnimation';
import ScrollIndicator from '@/src/components/ui/ScrollIndicator';
import ProjectCubes from '@/src/features/ProjectCubes/ProjectCubes';
import {BrutalNavButton} from '@/src/features/Navigation/BrutalNavigationButton';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start bg-gray-50 overflow-x-hidden">
      {/* Section d'introduction */}
      <div className="w-full p-4">
        {/* Logo qui apparaît au chargement */}
        <Logo />
        <BrutalNavButton />
        {/* Indicateur de défilement */}
        <ScrollIndicator />
        
        {/* Espace entre les composants */}
        <div className="h-16"></div>
        
        {/* Animation principale au scroll */}
        <LandingAnimation />
      </div>
      
      {/* Section des projets */}
      <ProjectCubes />
    </main>
  );
}