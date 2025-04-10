// src/context/GSAPContext.tsx
"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface GSAPContextType {
  isReady: boolean;
}

const GSAPContext = createContext<GSAPContextType>({ isReady: false });

export function GSAPProvider({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  
  useEffect(() => {
    // Enregistrement des plugins une seule fois
    gsap.registerPlugin(ScrollTrigger);
    
    // Marquer GSAP comme prêt
    setIsReady(true);
    
    return () => {
      // Nettoyage global au démontage
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);
  
  return (
    <GSAPContext.Provider value={{ isReady }}>
      {children}
    </GSAPContext.Provider>
  );
}

export const useGSAP = () => useContext(GSAPContext);