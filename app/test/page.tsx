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
    </main>
  );
}