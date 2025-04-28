// src/components/ui/DrawingCanvas.tsx
'use client';

import React, { RefObject } from 'react';

interface DrawingCanvasProps {
  canvasRef: RefObject<HTMLCanvasElement>;
  opacity?: number;
  startDrawing: (e: React.MouseEvent | React.TouchEvent) => void;
  draw: (e: React.MouseEvent | React.TouchEvent) => void;
  stopDrawing: () => void;
  toggleButtonRef?: RefObject<HTMLButtonElement>;
}

/**
 * Composant UI pour le canvas de dessin
 */
export default function DrawingCanvas({
  canvasRef,
  opacity = 0.7,
  startDrawing,
  draw,
  stopDrawing,
  toggleButtonRef
}: DrawingCanvasProps) {
  // Vérifie si le point (x, y) est près du bouton toggle
  const isNearToggleButton = (x: number, y: number): boolean => {
    if (!toggleButtonRef?.current) return false;
    
    const buttonRect = toggleButtonRef.current.getBoundingClientRect();
    // Ajout d'une marge de 10px autour du bouton pour faciliter l'interaction
    const safeZone = {
      left: buttonRect.left - 10,
      top: buttonRect.top - 10,
      right: buttonRect.right + 10,
      bottom: buttonRect.bottom + 10
    };
    
    return (
      x >= safeZone.left && 
      x <= safeZone.right && 
      y >= safeZone.top && 
      y <= safeZone.bottom
    );
  };
  
  // Handler personnalisé pour le début du dessin
  const handleStartDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    const { clientX, clientY } = 'touches' in e 
      ? (e as React.TouchEvent).touches[0] 
      : (e as React.MouseEvent);
      
    // Si on est près du bouton toggle, ne pas démarrer le dessin
    if (isNearToggleButton(clientX, clientY)) {
      return;
    }
    
    startDrawing(e);
  };
  
  // Handler personnalisé pour le mouvement de dessin
  const handleDraw = (e: React.MouseEvent | React.TouchEvent) => {
    const { clientX, clientY } = 'touches' in e 
      ? (e as React.TouchEvent).touches[0] 
      : (e as React.MouseEvent);
      
    // Si on est près du bouton toggle, ne pas dessiner
    if (isNearToggleButton(clientX, clientY)) {
      return;
    }
    
    draw(e);
  };
  
  return (
    <canvas
      ref={canvasRef}
      onMouseDown={handleStartDrawing}
      onMouseMove={handleDraw}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
      onTouchStart={handleStartDrawing}
      onTouchMove={handleDraw}
      onTouchEnd={stopDrawing}
      className="fixed top-0 left-0 w-full h-full pointer-events-auto z-40"
      style={{ 
        opacity, 
        touchAction: 'none', // Empêcher le défilement sur mobile pendant le dessin
      }}
    />
  );
}