'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

const menuItems = [
  { id: 1, label: 'ABOUT', link: '/about' },
  { id: 2, label: 'PROJECTS', link: '/projects' },
  { id: 3, label: 'CONTACT', link: '/contact' },
];

export default function BrutalistMenu({ isOpen }) {
  const menuRef = useRef(null);
  const overlayRef = useRef(null);
  const itemsRef = useRef([]);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const tl = gsap.timeline({ paused: true });
    
    // Animation de flou et d'assombrissement du fond
    tl.to(overlayRef.current, {
      duration: 0.3,
      autoAlpha: 1,
      ease: 'power1.inOut'
    });
    
    // Animation d'apparition du menu (brutal)
    tl.fromTo(menuRef.current, 
      { xPercent: -100 },
      { 
        xPercent: 0, 
        duration: 0.4, 
        ease: 'power2.out'
      },
      "-=0.1"
    );
    
    // Animation d'apparition des items (en séquence)
    tl.fromTo(itemsRef.current, 
      { x: -50, autoAlpha: 0 },
      { 
        x: 0, 
        autoAlpha: 1, 
        duration: 0.3, 
        stagger: 0.1,
        ease: 'power1.out'
      }, 
      "-=0.2"
    );
    
    // Joue ou inverse l'animation selon l'état du menu
    if (isOpen) {
      tl.play();
    } else {
      tl.reverse();
    }
    
    return () => {
      tl.kill();
    };
  }, [isOpen]);
  
  return (
    <>
      {/* Overlay qui floute le fond */}
      <div 
        ref={overlayRef}
        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 backdrop-blur-md z-40"
        style={{ visibility: 'hidden', opacity: 0 }}
      />
      
      {/* Menu brutaliste */}
      <nav 
        ref={menuRef}
        className="fixed top-0 left-0 w-full sm:w-96 h-full bg-black z-45 overflow-hidden"
        style={{ transform: 'translateX(-100%)' }}
      >
        <ul className="flex flex-col justify-center h-full px-10 space-y-12">
          {menuItems.map((item, index) => (
            <li key={item.id}>
              <a 
                href={item.link}
                ref={el => itemsRef.current[index] = el}
                className="text-white text-6xl font-bold tracking-tight hover:text-gray-300 transition-colors border-b-4 border-white inline-block"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}