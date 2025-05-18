// src/features/CubesAnimation/components/BrutalCube.tsx
import React, { forwardRef } from 'react';

interface BrutalCubeProps {
  color: string;
  size: 'md' | 'lg' | 'xl';
  rotation?: number;
  className?: string;
}

const BrutalCube = forwardRef<HTMLDivElement, BrutalCubeProps>(
  ({ color, size, rotation = 0, className = '' }, ref) => {
    // Définir les tailles en fonction de l'option
    const sizeClasses = {
      md: 'w-40 h-40',
      lg: 'w-52 h-52',
      xl: 'w-64 h-64',
    };
    
    // Générer un décalage aléatoire pour le côté du cube (effet brutaliste)
    const randomSkew = Math.floor(Math.random() * 3) - 1; // -1, 0, ou 1 degré
    
    return (
      <div
        ref={ref}
        className={`relative ${sizeClasses[size]} ${className}`}
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {/* Cube principal */}
        <div 
          className={`absolute inset-0 ${color} border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`}
          style={{ transform: `skew(${randomSkew}deg, ${randomSkew}deg)` }}
        />
        
        {/* Élément brutal supplémentaire - ligne diagonale */}
        <div 
          className="absolute top-0 left-0 w-full h-full border-b-4 border-r-4 border-black"
          style={{ transform: `rotate(${randomSkew * 2}deg)` }}
        />
        
        {/* Cercle décoratif (accent brutalist) */}
        <div 
          className="absolute w-8 h-8 bg-black rounded-full"
          style={{ 
            top: `${Math.random() * 70 + 10}%`, 
            left: `${Math.random() * 70 + 10}%` 
          }}
        />
      </div>
    );
  }
);

BrutalCube.displayName = 'BrutalCube';

export default BrutalCube;