import React, { useState, useEffect, useRef } from "react";

const MainSVGAnimation = () => {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState(null);
  const [time, setTime] = useState(0);

  // ⏰ Animation continue
  useEffect(() => {
    const interval = setInterval(() => setTime((prev) => prev + 0.1), 16);
    return () => clearInterval(interval);
  }, []);

  // 👁️👄 Éléments yeux et bouches aléatoires
  const [elements] = useState(() =>
    Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 800 + 100,
      y: Math.random() * 500 + 100,
      radius: 20 + Math.random() * 40,
      speed: 0.5 + Math.random() * 0.8,
      clockwise: Math.random() > 0.5,
      type: ["eye", "mouth", "nose"][Math.floor(Math.random() * 3)], // Aléatoire entre œil, bouche et nez
    }))
  );

  // 📱 Gestionnaire souris simplifié
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left) * (1000 / rect.width),
        y: (e.clientY - rect.top) * (700 / rect.height),
      });
    };

    const container = containerRef.current;
    container?.addEventListener("mousemove", handleMouseMove);
    return () => container?.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // ⚡ Calcul position simplifiée
  const getPosition = (element) => {
    // Si la souris n'a pas encore bougé, garder la position initiale
    if (!mousePos) return { x: element.x, y: element.y, scale: 1 };
    
    const dx = mousePos.x - element.x;
    const dy = mousePos.y - element.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const influence = Math.max(0, 1 - distance / 120);

    if (influence === 0) return { x: element.x, y: element.y, scale: 1 };

    // Arc de cercle
    const angle =
      (time + element.id * 0.3) * element.speed * (element.clockwise ? 1 : -1);
    const arcX = Math.cos(angle) * element.radius * influence;
    const arcY = Math.sin(angle) * element.radius * influence;

    // Fuite de la souris
    const pushX = distance > 1 ? (dx / distance) * influence * 15 : 0;
    const pushY = distance > 1 ? (dy / distance) * influence * 15 : 0;

    return {
      x: element.x + arcX + pushX,
      y: element.y + arcY + pushY,
      scale: 1 + influence * 0.2,
    };
  };

  return (
    <div className="w-full h-screen bg-white overflow-hidden relative">
      <div className="absolute top-4 left-4 z-10 bg-black text-white px-3 py-1 rounded text-sm">
        Déplacez votre souris ! ✨
      </div>

      <div ref={containerRef} className="w-full h-full">
        <svg width="100%" height="100%" viewBox="0 0 1000 700">
          {elements.map((element) => {
            const pos = getPosition(element);
            const transform = `translate(${pos.x}, ${pos.y}) scale(${pos.scale})`;

            return (
              <g
                key={element.id}
                transform={transform}
                style={{ willChange: "transform" }}
              >
                {element.type === "eye" ? (
                  // 👁️ Œil simple
                  <>
                    <circle r="12" fill="white" stroke="#000" strokeWidth="2" />
                    <circle r="4" fill="#000" />
                  </>
                ) : element.type === "mouth" ? (
                  // 👄 Bouche simple
                  <path
                    d="M -10,0 Q 0,8 10,0"
                    fill="none"
                    stroke="#000"
                    strokeWidth="2"
                  />
                ) : (
                  // 👃 Nez simple
                  <circle r="3" fill="#000" />
                )}
              </g>
            );
          })}
        </svg>
      </div>

      <div className="absolute bottom-4 right-4 bg-gray-100 p-2 rounded text-xs">
        Éléments: {elements.length}
      </div>
    </div>
  );
};

export default MainSVGAnimation;