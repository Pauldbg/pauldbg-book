"use client";

// app/test/page.tsx
import AnimatedFrame from "@/src/test/AnimatedFrame/AnimatedFrame";
// import MenuButton from '@/src/components/ui/MenuButton';

export default function TestPage() {
  return (
    <main className="min-h-screen">
      {/* Ajout du NavController pour tester le menu brutaliste */}

      <div className="h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">Scrollez vers le bas</h1>
      </div>

      <AnimatedFrame />
      <div className="h-screen"></div>
    </main>
  );
}
