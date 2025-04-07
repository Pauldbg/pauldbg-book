// app/page.js
import Logo from '@/src/features/LandingAnimation/Logo';
import LandingAnimation from '@/src/features/LandingAnimation/LandingAnimation';
import ScrollIndicator from '@/src/features/ScrollIndicator/ScrollIndicator';
import ProjectCubes from '@/src/features/ProjectCubes/ProjectCubes';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start bg-gray-50 overflow-x-hidden">
      {/* Section d'introduction */}
      <div className="w-full p-4">
        {/* Logo qui apparaît au chargement */}
        <Logo />
        
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