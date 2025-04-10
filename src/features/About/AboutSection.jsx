"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

// Imports dynamiques avec ssr désactivé pour éviter le flash
const BrutalHeader = dynamic(() => import("./Components/BrutalHeader"), {
  ssr: false,
});
const BrutalBioCard = dynamic(() => import("./Components/BrutalBioCard"), {
  ssr: false,
});
const BrutalSkillsCard = dynamic(
  () => import("./Components/BrutalSkillsCard"),
  {
    ssr: false,
  }
);
const BrutalDrawingsCard = dynamic(
  () => import("./Components/BrutalDrawingsCard"),
  {
    ssr: false,
  }
);
const BrutalContactCard = dynamic(
  () => import("./Components/BrutalContactCard"),
  {
    ssr: false,
  }
);

export default function AboutSection() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

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
