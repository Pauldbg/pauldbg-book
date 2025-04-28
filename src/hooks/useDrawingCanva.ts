'use client';

import { useState, useEffect, useRef, RefObject } from 'react';

interface UseDrawingCanvasOptions {
  isEnabled?: boolean;
  clearDelay?: number;
  strokeColor?: string;
  strokeWidth?: number;
}

interface UseDrawingCanvasReturn {
  canvasRef: RefObject<HTMLCanvasElement>;
  isDrawing: boolean;
  startDrawing: (e: React.MouseEvent | React.TouchEvent) => void;
  draw: (e: React.MouseEvent | React.TouchEvent) => void;
  stopDrawing: () => void;
  clearCanvas: () => void;
}

/**
 * Hook personnalisé pour gérer la logique du canvas de dessin
 */
export default function useDrawingCanvas({
  isEnabled = true,
  clearDelay = 3000,
  strokeColor = '#000000',
  strokeWidth = 3
}: UseDrawingCanvasOptions = {}): UseDrawingCanvasReturn {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Initialisation du canvas
  useEffect(() => {
    if (!isEnabled) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Configurer la taille pour couvrir tout l'écran
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Configurer le contexte
    const context = canvas.getContext('2d');
    if (!context) return;
    
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.strokeStyle = strokeColor;
    context.lineWidth = strokeWidth;
    contextRef.current = context;
    
    // Gérer le redimensionnement de la fenêtre
    const handleResize = () => {
      // Sauvegarder le dessin actuel
      const tempCanvas = document.createElement('canvas');
      const tempContext = tempCanvas.getContext('2d');
      if (!tempContext) return;
      
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      tempContext.drawImage(canvas, 0, 0);
      
      // Redimensionner le canvas
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Restaurer les paramètres du contexte
      context.lineCap = 'round';
      context.lineJoin = 'round';
      context.strokeStyle = strokeColor;
      context.lineWidth = strokeWidth;
      
      // Restaurer le dessin
      context.drawImage(tempCanvas, 0, 0);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isEnabled, strokeColor, strokeWidth]);
  
  // Mettre à jour les paramètres du contexte quand ils changent
  useEffect(() => {
    if (!contextRef.current) return;
    contextRef.current.strokeStyle = strokeColor;
    contextRef.current.lineWidth = strokeWidth;
  }, [strokeColor, strokeWidth]);
  
  // Effacer le canvas après le délai spécifié
  const scheduleCanvasClear = () => {
    if (clearDelay <= 0) return;
    
    // Annuler le timeout précédent s'il existe
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Programmer un nouvel effacement
    timeoutRef.current = setTimeout(() => {
      if (contextRef.current && canvasRef.current) {
        contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    }, clearDelay);
  };
  
  // Gérer le début du dessin
  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isEnabled || !contextRef.current) return;
    
    // Obtenir les coordonnées correctes selon le type d'événement
    const { clientX, clientY } = 'touches' in e 
      ? (e as React.TouchEvent).touches[0] 
      : (e as React.MouseEvent);
    
    contextRef.current.beginPath();
    contextRef.current.moveTo(clientX, clientY);
    setIsDrawing(true);
  };
  
  // Gérer le dessin en cours
  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !isEnabled || !contextRef.current) return;
    
    // Éviter que l'écran ne défile pendant le dessin sur mobile
    e.preventDefault();
    
    // Obtenir les coordonnées correctes selon le type d'événement
    const { clientX, clientY } = 'touches' in e 
      ? (e as React.TouchEvent).touches[0] 
      : (e as React.MouseEvent);
    
    contextRef.current.lineTo(clientX, clientY);
    contextRef.current.stroke();
  };
  
  // Terminer le dessin
  const stopDrawing = () => {
    if (!isDrawing || !isEnabled || !contextRef.current) return;
    
    contextRef.current.closePath();
    setIsDrawing(false);
    
    // Programmer l'effacement automatique
    scheduleCanvasClear();
  };
  
  // Effacer manuellement le canvas
  const clearCanvas = () => {
    if (!contextRef.current || !canvasRef.current) return;
    
    contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    
    // Annuler le timeout d'effacement automatique s'il existe
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };
  
  return {
    canvasRef,
    isDrawing,
    startDrawing,
    draw,
    stopDrawing,
    clearCanvas
  };
}