"use client";

import { BrutalNavButton } from "@/src/features/Navigation/BrutalNavigationButton";
import DrawController from "@/src/features/DrawCanvas/DrawController"; // Ajuste le chemin selon ton projet

export default function Header() {
  return (
    <header className="fixed top-0 w-full z-50">
      <BrutalNavButton />
      <DrawController
        defaultEnabled={false}
        clearDelay={3000}
        strokeColor="#f28f2c"
        strokeWidth={4}
        opacity={0.8}
      />
    </header>
  );
}
