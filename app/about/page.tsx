// app/about/page.jsx
import AboutSection from "@/src/features/About/AboutSection";
import { BrutalNavButton } from "@/src/features/Navigation/BrutalNavigationButton";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <BrutalNavButton />
      <AboutSection />
    </main>
  );
}
