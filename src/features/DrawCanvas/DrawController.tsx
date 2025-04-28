'use client';

import React, { useState } from 'react';
import DrawCanvas from './DrawCanvas';
import DrawToggleButton from './Components/ui/DrawToggleButton';

interface DrawControllerProps {
  defaultEnabled?: boolean;
  clearDelay?: number;
  strokeColor?: string;
  strokeWidth?: number;
  opacity?: number;
}

/**
 * Contrôleur global pour la fonctionnalité de dessin
 * Gère l'état d'activation et affiche le bouton toggle + canvas
 */
export default function DrawController({
  defaultEnabled = false,
  clearDelay = 3000,
  strokeColor = '#000000',
  strokeWidth = 3,
  opacity = 0.7
}: DrawControllerProps) {
  const [isDrawingEnabled, setIsDrawingEnabled] = useState(defaultEnabled);
  
  const toggleDrawing = () => {
    setIsDrawingEnabled(prev => !prev);
  };
  
  return (
    <>
      <DrawToggleButton 
        isEnabled={isDrawingEnabled} 
        onToggle={toggleDrawing} 
      />
      
      <DrawCanvas
        isEnabled={isDrawingEnabled}
        clearDelay={clearDelay}
        strokeColor={strokeColor}
        strokeWidth={strokeWidth}
        opacity={opacity}
      />
    </>
  );
}