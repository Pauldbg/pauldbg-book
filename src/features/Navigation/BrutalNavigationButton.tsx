"use client";

import { MenuButton } from "./MenuButton";
import { MenuOverlay } from "./MenuOverlay";
import { useMenu } from "../../hooks/useMenu"
import { menuItems } from "./constants/menuItems";

export const BrutalNavButton = () => {
  const { isOpen, toggle } = useMenu();

  return (
    <>
      <MenuButton isOpen={isOpen} onToggle={toggle} />
      {isOpen && <MenuOverlay items={menuItems} />}
    </>
  );
};
