'use client';

import React from 'react';
import useDrawingCanvas from '../../hooks/useDrawingCanva';
import DrawingCanvas from "./Components/ui/DrawingCanvas"
import ClearButton from "./Components/ui/ClearButton"

interface DrawCanvasProps {
  isEnabled?: boolean;
  clearDelay?: number;
  strokeColor?: string;
  strokeWidth?: number;
  opacity?: number;
}

/**
 * Composant conteneur pour le système de dessin
 */
export default function DrawCanvas({
  isEnabled = true,
  clearDelay = 3000,
  strokeColor = '#000000',
  strokeWidth = 3,
  opacity = 0.7
}: DrawCanvasProps) {
  const {
    canvasRef,
    startDrawing,
    draw,
    stopDrawing,
    clearCanvas
  } = useDrawingCanvas({
    isEnabled,
    clearDelay,
    strokeColor,
    strokeWidth
  });
  
  if (!isEnabled) return null;
  
  return (
    <>
      <DrawingCanvas
        canvasRef={canvasRef}
        opacity={opacity}
        startDrawing={startDrawing}
        draw={draw}
        stopDrawing={stopDrawing}
      />
      <ClearButton onClick={clearCanvas} />
    </>
  );
}