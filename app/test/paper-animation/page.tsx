"use client";

import Link from "next/link";
import PaperCrumpleSVG from "@/src/features/PaperCrumple/PaperCrumpleSVG";

export default function PaperAnimationSVGPage() {
  return (
    <main className="relative">
      <Link
        href="/"
        className="fixed top-6 left-6 z-50 px-4 py-2 bg-white text-black border-2 border-black"
      >
        Retour
      </Link>

      <PaperCrumpleSVG />
    </main>
  );
}
