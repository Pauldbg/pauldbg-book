// hooks/useColorCubesMasonry.tsx
'use client'

import { useEffect } from 'react';

export default function useColorCubesMasonry(containerSelector: string, itemSelector: string) {
  useEffect(() => {
    function resizeGridItems() {
      const grid = document.querySelector(containerSelector);
      if (!grid) return;
      
      const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
      const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
      
      const items = document.querySelectorAll(itemSelector);
      items.forEach(item => {
        const rowSpan = Math.ceil((item.getBoundingClientRect().height + rowGap) / (rowHeight + rowGap));
        (item as HTMLElement).style.gridRowEnd = `span ${rowSpan}`;
      });
    }
    
    // Exécute après le rendu et quand la fenêtre change de taille
    resizeGridItems();
    window.addEventListener('resize', resizeGridItems);
    
    return () => {
      window.removeEventListener('resize', resizeGridItems);
    };
  }, [containerSelector, itemSelector]);
}