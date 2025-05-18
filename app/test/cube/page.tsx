"use client";

import BrutalCubesAnimation from "@/src/test/CubesAnimation/CubesAnimations";

export default function BrutalCubesTestPage() {
  return (
    <main className="min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold p-8 border-b-4 border-black">
        TEST ANIMATION BRUTALE
      </h1>
      <BrutalCubesAnimation />
    </main>
  );
}
