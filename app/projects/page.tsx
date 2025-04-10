// app/about/page.jsx
import ProjectSection from '@/src/features/Projects/ProjectSection'
import { BrutalNavButton } from '@/src/features/Navigation/BrutalNavigationButton';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <BrutalNavButton />
      <ProjectSection />
    </main>
  );
}