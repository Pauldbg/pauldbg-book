'use client';

import BrutalHeader from './Components/BrutalHeader';
import BrutalBioCard from './Components/BrutalBioCard';
import BrutalSkillsCard from './Components/BrutalSkillsCard';
import BrutalDrawingsCard from './Components/BrutalDrawingsCard';
import BrutalContactCard from './Components/BrutalContactCard';

export default function AboutSection() {
  return (
    <>
      {/* Header séparé du contenu */}
      <BrutalHeader title="ABOUT" subtitle="ME" />
      
      {/* Espace entre le header et le contenu */}
      <div className="h-24"></div>
      
      {/* Section de contenu */}
      <section className="w-full pb-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Bio avec espace autour */}
          <div className="mb-24">
            <BrutalBioCard />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
            {/* Tech stack */}
            <BrutalSkillsCard />
            
            {/* Mes dessins */}
            <BrutalDrawingsCard />
          </div>
          
          {/* Contact avec espace au-dessus */}
          <div>
            <BrutalContactCard />
          </div>
        </div>
      </section>
    </>
  );
}