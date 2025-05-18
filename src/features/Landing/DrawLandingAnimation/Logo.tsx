// components/Logo.jsx
"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Logo() {
  const logoRef = useRef<SVGSVGElement | null>(null);
  // Création des refs pour chaque élément du SVG (les lettres)
  const letterRefs = useRef<SVGPathElement[]>([]);
  
  useGSAP(() => {
    // Récupération de tous les éléments path dans le SVG
    if (!logoRef.current) return;
    const letterElements = logoRef.current.querySelectorAll("path");

    // Réinitialisation des références pour s'assurer qu'elles sont à jour
    letterRefs.current = Array.from(letterElements);

    // Configuration initiale - mettre toutes les lettres hors écran (au-dessus)
    gsap.set(letterRefs.current, {
      y: -100, // Position au-dessus de leur position finale
      opacity: 0, // opacité a 0 pour ne pas voir les lettres
    });

    // Animation de chute des lettres une par une
    gsap.timeline().to(letterRefs.current, {
      y: 0, // Retour à leur position normale
      opacity: 1,
      duration: 1.4,
      ease: "bounce.out", // Effet de rebond
      stagger: 0.1, // Délai entre chaque lettre (0.1 seconde)
      onComplete: () => {
        // Animation supplémentaire pour l'ensemble du logo après la chute
        gsap.to(logoRef.current, {
          scale: 1.05,
          duration: 0.3,
          yoyo: true, // Revenir à l'échelle normale
          repeat: 1,
          ease: "power1.inOut",
        });
      },
    });
  }, { scope: logoRef }); // Le scope est le logoRef, il limite le contexte GSAP à cette référence


  return (
    <div className="py-12 text-center">
      <svg
        ref={logoRef}
        viewBox="0 0 1302 657"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mx-auto max-w-full h-auto overflow-visible"
        style={{
          maxHeight: "80vh", // Augmenter de 500px à 80vh
          overflow: "visible",
        }}
      >
        <path
          d="M989.595 354.053C960.054 346.128 1046.59 355.476 1038.71 326.423C1030.83 297.37 1001.47 279.909 994.906 294.7C988.341 309.49 979.636 343.108 997.36 365.823C1015.08 388.539 1042 347.863 1042 347.863"
          stroke="black"
        />
        <path
          d="M1014.82 293.676C1014.82 293.676 1001.54 274.744 966.366 315.677C931.189 356.61 1008.84 347.913 1008.84 347.913"
          stroke="black"
        />
        <path
          d="M937.462 356.268C937.462 356.268 934.389 329.667 953.092 302.548C971.794 275.43 981.632 352.173 981.632 352.173L904.641 359.17"
          stroke="black"
        />
        <path
          d="M900.658 336.656L937.162 296.746L944.463 318.748M944.463 318.748L953.091 348.72C953.091 348.72 895.881 381.845 912.072 354.481C928.264 327.117 944.463 318.748 944.463 318.748Z"
          stroke="black"
        />
        <path
          d="M904.642 359.17C904.642 359.17 848.89 370.938 854.863 335.633C860.837 300.328 896.675 297.258 896.675 297.258L904.642 359.17ZM904.642 359.17L917.916 481.459C917.916 481.459 935.172 396.01 860.837 420.059C786.501 444.107 901.613 335.633 901.613 335.633"
          stroke="black"
        />
        <path
          d="M803.392 357.629C803.392 357.629 800.318 331.028 819.021 303.91C837.724 276.791 847.561 353.534 847.561 353.534L773.889 360.193"
          stroke="black"
        />
        <path
          d="M793.8 290.606C795.393 265.228 800.659 275.597 803.092 283.955"
          stroke="black"
        />
        <path
          d="M773.888 359.682C773.888 359.682 753.977 351.495 784.508 330.516C815.039 309.538 794.463 298.281 794.463 298.281L802.428 359.682"
          stroke="black"
        />
        <path
          d="M745.107 311.118C801.1 325.462 749.098 282.941 765.702 286.756C782.306 290.571 786.732 316.972 786.732 316.972C786.732 316.972 798.91 361.483 765.702 360.212C732.494 358.941 689.113 296.774 745.107 311.118Z"
          stroke="black"
        />
        <path
          d="M718.137 160.642V298.281M718.137 298.281V361.216C718.137 361.216 737.664 358.658 755.69 347.913C773.715 337.168 718.137 298.281 718.137 298.281Z"
          stroke="black"
        />
        <path
          d="M671.677 298.178C671.677 298.178 673.005 361.216 692.252 361.216C711.5 361.216 672.476 266.265 718.137 298.178"
          stroke="black"
        />
        <path
          d="M672.341 152.455V297.769M672.341 297.769V361.728C672.341 361.728 616.589 364.287 622.563 346.378C628.536 328.47 672.341 297.769 672.341 297.769Z"
          stroke="black"
        />
        <path
          d="M54.6714 3.33816H1V483.285H60.8459L58.1668 275.035M54.6714 3.33816C54.6714 3.33816 367.893 -26.8504 222.335 129.721M54.6714 3.33816L58.1668 275.035M222.335 129.721C76.7773 286.292 58.1668 275.035 58.1668 275.035M222.335 129.721L95.3127 483.285M222.335 129.721L359.17 483.285H249.048L222.335 365.601L205.98 483.285H95.3127M222.335 129.721H419.683V361.508H436.583M95.3127 483.285L348.267 244.847M348.267 129.721L343.361 483.285H518.357V129.721H439.854L436.583 361.508M436.583 361.508L598.495 129.721M436.583 361.508H786.576M786.576 361.508V483.285H534.712L540.163 129.721H598.495M786.576 361.508L598.495 452.073V129.721"
          stroke="black"
          strokeWidth="1.8"
        />
        <g className="paul-emojy" transform="translate(100, 280) scale(0.8)">
          <path
            d="M58.8145 236.976C11.6643 205.516 2.00001 182.9 2 128.252C12.5 67.0086 34.2331 37.3292 103.5 10.9475C171.233 -7.89657 211.5 -0.830002 231.5 69.7939C233.15 90.7915 237.535 111.212 228.733 123.971M58.8145 236.976L180.341 208.073C162.516 162.377 147.492 166.556 114.263 212.116C102.852 168.681 88.5318 185.434 58.8145 236.976ZM58.8145 236.976C75.1746 247.689 86.2229 249.251 110.011 242.368L180.341 212.116V227.691C252.887 204.056 266.437 170.184 251.733 143.078C245.444 131.483 240.922 127.78 228.733 123.971M228.733 123.971C225.651 135.23 214.516 151.502 194.763 161.126C178.14 158.015 171.233 152.708 171.233 137.632C172.733 122.557 194.651 118.741 228.733 123.971ZM34.2331 107.482C61.6093 114.529 77.6508 116.866 110.233 111.722C152.951 104.866 169.854 94.117 194.763 69.7938L114.498 88.6379L34.2331 107.482ZM106.233 76.8604C119.901 83.804 123.259 88.4981 112.733 99.9443C95.8996 93.6269 93.009 88.8497 106.233 76.8604Z"
            stroke="black"
            strokeWidth="4"
          />
          <path
            d="M33.5542 107.362C44.9289 80.934 154.878 45.7954 194.763 68.4243"
            stroke="black"
            strokeWidth="4"
          />
          <path
            d="M109.908 111.256L104.947 200.812C117.241 170.469 128.006 157.835 156.676 146"
            stroke="black"
            strokeWidth="4"
          />
        </g>
      </svg>
    </div>
  );
}
