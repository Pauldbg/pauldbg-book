// app/page.js ou la page où tu veux tester
import AnimatedFrame from '@/src/features/AnimatedFrame/AnimatedFrame';

export default function TestPage() {
  return (
    <main className="min-h-screen">
      <div className="h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">Scrollez vers le bas</h1>
      </div>
      
      <AnimatedFrame />
      
      <div className="h-screen"></div>
      {/* Points de repère pour les yeux - invisibles, juste pour identifier les positions */}
<circle cx="253" cy="300" r="2" fill="none" className="eye-point-left" />
<circle cx="342" cy="290" r="2" fill="none" className="eye-point-right" />
    </main>
  );
}