'use client';

import { useState, useEffect } from 'react';
import MenuButton from '../../components/ui/MenuButton';
import BrutalistMenu from './BrutalistMenu';

export default function NavController() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Fonction pour basculer l'état du menu
  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };
  
  // Empêcher le défilement du body quand le menu est ouvert
  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (isMenuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
    
    // Cleanup
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);
  
  // Fermer le menu avec la touche Escape
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isMenuOpen]);

  return (
    <>
      <MenuButton onClick={toggleMenu} isOpen={isMenuOpen} />
      <BrutalistMenu isOpen={isMenuOpen} />
    </>
  );
}