'use client';

import { useRef, MouseEvent } from 'react';

interface MenuButtonProps {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  isOpen: boolean;
  className?: string;
}

export default function MenuButton({ onClick, isOpen, className = '' }: MenuButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  const baseClasses = "fixed top-6 left-6 z-50 w-12 h-12 flex items-center justify-center bg-black text-white border-2 border-white";
  const combinedClasses = `${baseClasses} ${className}`.trim();
  
  return (
    <button 
      ref={buttonRef}
      onClick={onClick}
      className={combinedClasses}
      aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
    >
      {/* Icône brutaliste */}
      {isOpen ? (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 2L18 18M2 18L18 2" stroke="white" strokeWidth="3" strokeLinecap="square"/>
        </svg>
      ) : (
        <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1H19M1 7H19M1 13H19" stroke="white" strokeWidth="3" strokeLinecap="square"/>
        </svg>
      )}
    </button>
  );
}