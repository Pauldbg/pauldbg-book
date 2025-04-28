'use client';

import React from 'react';

interface ClearButtonProps {
  onClick: () => void;
  className?: string;
}

/**
 * Bouton pour effacer le canvas avec une icône de gomme
 * Style adapté au menu brutaliste
 */
export default function ClearButton({ onClick, className = '' }: ClearButtonProps) {
  const baseClasses = "fixed bottom-6 right-6 bg-white text-black w-12 h-12 z-50 flex items-center justify-center border-2 border-black cursor-pointer";
  const combinedClasses = `${baseClasses} ${className}`.trim();
  
  return (
    <button
      onClick={onClick}
      className={combinedClasses}
      aria-label="Effacer le dessin"
    >
      {/* Icône de gomme brutaliste */}
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.24 3.56L21.19 8.5C21.97 9.29 21.97 10.55 21.19 11.34L12 20.53C10.44 22.09 7.91 22.09 6.34 20.53L2.81 17C2.03 16.21 2.03 14.95 2.81 14.16L13.41 3.56C14.2 2.78 15.46 2.78 16.24 3.56Z" 
              stroke="black" 
              strokeWidth="2" 
              fill="white" />
        <path d="M18.36 14.16L10.93 21.59" 
              stroke="black" 
              strokeWidth="2" />
        <path d="M7.88 9.11L14.3 15.54" 
              stroke="black" 
              strokeWidth="2" />
      </svg>
    </button>
  );
}