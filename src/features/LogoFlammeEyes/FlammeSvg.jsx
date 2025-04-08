// src/features/LogoFlammeEyes/FlammeSvg.jsx
export function FlammeSvg({ className }) {
  return (
    <svg
      width="120"
      height="40"
      viewBox="0 0 120 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Couche externe (la plus grande) */}
      <path
        className="flame-outer"
        d="M0,20 C10,5 20,0 30,10 C40,0 60,0 80,10 C100,0 110,15 120,20 C110,25 100,40 80,30 C60,40 40,40 30,30 C20,40 10,35 0,20 Z"
        fill="rgba(255, 120, 50, 0.7)"
      />
      {/* Couche intermédiaire */}
      <path
        className="flame-middle"
        d="M10,20 C15,10 25,5 30,12 C40,5 60,5 75,15 C90,5 100,15 110,20 C100,25 90,35 75,25 C60,35 40,35 30,25 C25,30 15,30 10,20 Z"
        fill="rgba(255, 160, 50, 0.8)"
      />
      {/* Couche interne (la plus petite) */}
      <path
        className="flame-inner"
        d="M20,20 C25,15 28,12 30,15 C40,12 55,12 70,18 C80,12 85,18 100,20 C85,22 80,28 70,22 C55,28 40,28 30,22 C28,25 25,25 20,20 Z"
        fill="rgba(255, 220, 50, 0.9)"
      />
    </svg>
  );
}