// app/eye-finder/page.jsx
import LogoEyesFinder from "@/src/test/LogoEyesFinder";

export default function EyeFinderPage() {
  return (
    <main className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">
        Outil de recherche des yeux du logo
      </h1>
      <p className="mb-6">
        Utilisez les curseurs pour positionner les points rouges sur les
        &quot;yeux&quot; du logo.
      </p>

      <LogoEyesFinder />
    </main>
  );
}
