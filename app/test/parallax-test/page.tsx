"use client";

import { useEffect, useState } from 'react';
import ParallaxContainer from '@/src/features/Parallax/ParallaxContainer';
import ParallaxItem from '@/src/features/Parallax/ParallaxItem';
import styles from './parallax-test.module.css';
import Link from 'next/link';

export default function ParallaxTest() {
  const [isClient, setIsClient] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsClient(true);
    
    // Afficher la position de la souris pour le débogage
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  if (!isClient) {
    return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
  }

  return (
    <main className="min-h-screen bg-gray-900 overflow-hidden">
      {/* En-tête fixe */}
      <header className="fixed top-0 left-0 w-full p-6 z-40">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Test d'Effet Parallax</h1>
          <Link href="/" className="bg-white text-black px-4 py-2 rounded">Retour</Link>
        </div>
        <p className="text-gray-300 mt-2">
          Déplacez votre souris pour voir l'effet (x: {mousePosition.x}, y: {mousePosition.y})
        </p>
      </header>

      {/* Conteneur parallax avec la scène */}
      <div className="relative w-full h-screen">
        <ParallaxContainer 
          sensitivity={40}
          className={styles.scene}
          perspective={1200}
          smooth={0.08} // Plus réactif
        >
          {/* Couche d'arrière-plan (étoiles lointaines) */}
          <ParallaxItem 
            depth={0.1} 
            className={styles.starsLayer}
            style={{ width: '100%', height: '100%' }}
          >
            <div className={styles.stars1}></div>
          </ParallaxItem>

          {/* Couche d'étoiles intermédiaires */}
          <ParallaxItem 
            depth={0.3} 
            className={styles.starsLayer}
            style={{ width: '100%', height: '100%' }}
          >
            <div className={styles.stars2}></div>
          </ParallaxItem>

          {/* Lune */}
          <ParallaxItem 
            depth={0.2} 
            className={styles.moon}
            rotateEffect={true}
            rotationFactor={2}
          >
            <div className={styles.moonCircle}></div>
          </ParallaxItem>

          {/* Montagne arrière */}
          <ParallaxItem 
            depth={0.4} 
            className={styles.mountain1}
            style={{ bottom: '-5%', left: '-10%', width: '120%' }}
          >
            <div className={styles.mountainShape1}></div>
          </ParallaxItem>

          {/* Montagne avant */}
          <ParallaxItem 
            depth={0.7} 
            className={styles.mountain2}
            style={{ bottom: '-5%', left: '-10%', width: '120%' }}
          >
            <div className={styles.mountainShape2}></div>
          </ParallaxItem>

          {/* Texte flottant */}
          <ParallaxItem 
            depth={0.5} 
            className={styles.floatingText}
            rotateEffect={true}
            rotationFactor={10}
            scaleEffect={true}
            style={{ 
              top: '50%', 
              left: '50%', 
              transform: 'translate(-50%, -50%)',
              color: 'white',
              fontSize: '3rem',
              fontWeight: 'bold',
              textShadow: '0 0 10px rgba(255,255,255,0.5)'
            }}
          >
            <div>PARALLAX</div>
          </ParallaxItem>
          
          {/* Indicateur de position de la souris */}
          <div className="fixed w-6 h-6 bg-white rounded-full opacity-50 pointer-events-none" 
            style={{ 
              left: mousePosition.x, 
              top: mousePosition.y,
              transform: 'translate(-50%, -50%)',
              zIndex: 50
            }}>
          </div>
        </ParallaxContainer>
      </div>
    </main>
  );
}