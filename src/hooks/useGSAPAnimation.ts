"use client";
import { useRef, useEffect, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Hook personnalisé qui résout le problème d'hydratation entre serveur et client
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

// Types pour les options d'animation
interface GSAPAnimationOptions {
  scrollTrigger?: boolean;
  registerPlugins?: Array<gsap.Plugin>;
}

/**
 * Hook personnalisé pour utiliser GSAP facilement avec Next.js
 * @param callback Fonction qui contient les animations GSAP
 * @param deps Array de dépendances pour le useEffect (comme pour un useEffect standard)
 * @param options Options supplémentaires (activation de ScrollTrigger, etc.)
 * @returns Référence à attacher au conteneur parent
 */
export const useGSAPAnimation = (
  callback: (context: gsap.Context) => void,
  deps: React.DependencyList = [],
  options: GSAPAnimationOptions = {}
) => {
  const containerRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    // Enregistrer les plugins nécessaires
    if (options.scrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
    }

    if (options.registerPlugins && options.registerPlugins.length > 0) {
      gsap.registerPlugin(...options.registerPlugins);
    }

    // Ne rien faire si le conteneur n'est pas disponible
    if (!containerRef.current) return;

    // Créer un contexte GSAP limité au conteneur
    const ctx = gsap.context(() => {
      callback(ctx);
    }, containerRef);

    // Nettoyage à la désinstallation du composant
    return () => ctx.revert();
  }, deps);

  return containerRef;
};

export default useGSAPAnimation;
