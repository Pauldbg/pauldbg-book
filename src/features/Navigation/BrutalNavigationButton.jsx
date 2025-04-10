'use client';

import { useState, useEffect } from 'react';

// Liste des éléments du menu
const menuItems = [
  { id: 0, label: 'HOME', link: '/' },
  { id: 1, label: 'ABOUT ME', link: '/about' },
  { id: 2, label: 'PROJECTS', link: '/projects' },
  { id: 3, label: 'CONTACT', link: '/contact' },
];

export const BrutalNavButton = () => {
  // État du menu (ouvert/fermé)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Fonction pour basculer l'état du menu
  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };
  
  
  return (
    <>
      {/* Bouton de menu en haut à gauche */}
      <button 
        onClick={toggleMenu}
        className="fixed top-6 left-6 z-50 w-12 h-12 flex items-center justify-center bg-white text-black border-2 border-black"
        aria-label={isMenuOpen ? "Close the menu" : "Open the menu"}
      >
        {/* Icône qui change */}
        {isMenuOpen ? (
          <span className="text-black text-xl">X</span>
        ) : (
          <span className="text-black text-xl">≡</span>
        )}
      </button>
      
      {/* Overlay et menu avec seulement le fond transparent flou */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-40 flex items-center justify-center"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.15)', //* 0.15 = 15% de transparence 
            backdropFilter: 'blur(5px)', //* 5px = 5px de flou
            WebkitBackdropFilter: 'blur(5px)' //* 5px = 5px de flou
          }}
        >
          <nav className="w-full max-w-md mx-auto">
            <ul className="flex flex-col space-y-12 p-10">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <a 
                    href={item.link}
                    className="text-black text-6xl font-bold tracking-tight hover:text-gray-700 border-b-4 border-black pb-2 inline-block transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}