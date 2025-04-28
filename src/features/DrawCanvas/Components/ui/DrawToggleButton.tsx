// src/components/ui/DrawToggleButton.tsx
'use client';

import React, { forwardRef } from 'react';

interface DrawToggleButtonProps {
  isEnabled: boolean;
  onToggle: () => void;
  style?: React.CSSProperties;
}

/**
 * Bouton pour activer/désactiver le mode dessin
 * Style adapté au menu brutaliste
 */
const DrawToggleButton = forwardRef<HTMLButtonElement, DrawToggleButtonProps>(
  ({ isEnabled, onToggle, style = {} }, ref) => {
    return (
      <button
        ref={ref}
        onClick={onToggle}
        className="fixed top-20 right-6 z-50 w-12 h-12 flex items-center justify-center bg-white text-black border-2 border-black cursor-pointer"
        style={{
          transition: 'all 0.2s ease',
          ...style
        }}
        aria-label={isEnabled ? "Désactiver le mode dessin" : "Activer le mode dessin"}
      >
        {isEnabled ? (
          // Icône crayon actif 
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.66 3C17.41 3 17.15 3.1 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04C21.1 6.65 21.1 6 20.71 5.63L18.37 3.29C18.17 3.09 17.92 3 17.66 3ZM14.06 6.19L3 17.25V21H6.75L17.81 9.94L14.06 6.19Z" 
                  fill="black" stroke="black" strokeWidth="0.5" />
            <path d="M14.06 9L15 9.94L5.92 19H5V18.08L14.06 9Z" fill="red" />
          </svg>
        ) : (
          // Icône crayon inactif
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.66 3C17.41 3 17.15 3.1 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04C21.1 6.65 21.1 6 20.71 5.63L18.37 3.29C18.17 3.09 17.92 3 17.66 3ZM14.06 6.19L3 17.25V21H6.75L17.81 9.94L14.06 6.19Z" 
                  fill="black" />
          </svg>
        )}
      </button>
    );
  }
);

DrawToggleButton.displayName = 'DrawToggleButton';

export default DrawToggleButton;