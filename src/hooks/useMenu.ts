import { useState } from 'react';

interface UseMenuReturn {
  isOpen: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
}

export const useMenu = (initialState: boolean = false): UseMenuReturn => {
  const [isOpen, setIsOpen] = useState<boolean>(initialState);
  
  const toggle = (): void => {
    setIsOpen(prev => !prev);
  };
  
  const open = (): void => {
    setIsOpen(true);
  };
  
  const close = (): void => {
    setIsOpen(false);
  };
  
  return {
    isOpen,
    toggle,
    open,
    close
  };
};