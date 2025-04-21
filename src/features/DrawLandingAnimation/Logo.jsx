// components/Logo.jsx
"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Logo() {
  const logoRef = useRef(null);
  // Création des refs pour chaque élément du SVG (les lettres)
  const letterRefs = useRef([]);

  useEffect(() => {
    // Récupération de tous les éléments path dans le SVG
    const letterElements = logoRef.current.querySelectorAll('path');
    
    // Réinitialisation des références pour s'assurer qu'elles sont à jour
    letterRefs.current = Array.from(letterElements);
    
    // Configuration initiale - mettre toutes les lettres hors écran (au-dessus)
    gsap.set(letterRefs.current, { 
      y: -100, // Position au-dessus de leur position finale 
      opacity: 0, // opacité a 0 pour ne pas voir les lettres
    });
    
    // Animation de chute des lettres une par une
    gsap.timeline()
      .to(letterRefs.current, {
        y: 0, // Retour à leur position normale
        opacity: 1,
        duration: 0.8,
        ease: "bounce.out", // Effet de rebond
        stagger: 0.1, // Délai entre chaque lettre (0.1 seconde)
        onComplete: () => {
          // Animation supplémentaire pour l'ensemble du logo après la chute
          gsap.to(logoRef.current, {
            scale: 1.05,
            duration: 0.3,
            yoyo: true, // Revenir à l'échelle normale
            repeat: 1,
            ease: "power1.inOut"
          });
        }
      });
  }, []);

  return (
    <div className="py-12 text-center">
      <svg
        ref={logoRef}
        width="1302"
        height="657"
        viewBox="0 0 1302 657"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mx-auto max-w-full h-auto"
        style={{ maxHeight: "500px" }} // Limite la hauteur
      >
        <path
          d="M1026.07 463.608L1025.56 463.649C1025.56 463.649 1021.74 445.179 1034.05 451.21C1046.36 457.241 1048.91 461.764 1048.91 461.764L1026.07 463.608ZM1026.07 463.608C1026.07 463.608 1032.35 480.611 1034.05 473.072C1035.75 465.534 1054 469.303 1054 469.303"
          stroke="black"
        />
        <path
          d="M1022 451.385C1022 451.385 1016.07 448.424 1004.74 458.924C993.407 469.423 1020.92 474 1020.92 474"
          stroke="black"
        />
        <path
          d="M986.405 476C986.405 476 979.249 442.632 989.625 452.566C1000 462.5 1000 476 1000 476V449"
          stroke="black"
        />
        <path
          d="M978.366 462.5C979.488 467.602 968.491 475.5 968.491 475.5C968.491 475.5 956.004 474.459 957.5 463.235C958.996 452.01 966.949 451.765 966.949 451.765C966.949 451.765 977.245 457.398 978.366 462.5ZM978.366 462.5L977.505 450M978.366 462.5L979.931 476.5"
          stroke="black"
        />
        <path
          d="M954.03 465.886L956.21 540.236M954.03 465.886C954.03 465.886 947.141 477.229 939.557 475.593C931.973 473.957 927.801 471.094 927.043 461.685C926.284 452.276 935.764 445.321 943.349 449.003C950.933 452.685 954.03 465.886 954.03 465.886ZM956.21 540.236L957 593C957 593 954.03 553.826 946.281 543.034C938.533 532.241 956.21 540.236 956.21 540.236Z"
          stroke="black"
        />
        <path
          d="M896.548 477.358C896.548 477.358 898.701 473.592 911.5 466C924.299 458.407 890 460.499 892 452C894 443.5 906.07 440.561 906.07 440.561"
          stroke="black"
        />
        <path
          d="M883.5 476.76V447.26M883.5 434.26C884.5 439.26 880 439.26 880 439.26L884.5 440.76C884.5 440.76 882.5 429.26 883.5 434.26Z"
          stroke="black"
        />
        <path
          d="M859.5 462C859.5 462 851.833 446.597 862.333 448.097C872.833 449.597 875.632 459.977 875.632 459.977C875.632 459.977 883.333 477.476 862.333 476.977C841.333 476.477 859.5 462 859.5 462Z"
          stroke="black"
        />
        <path
          d="M826 280V446.5M826 446.5V476C826 476 839.762 473.5 852.465 463C865.168 452.5 826 446.5 826 446.5Z"
          stroke="black"
        />
        <path
          d="M789 447.508C789 449.953 792.667 479.301 805.238 476.855C817.81 474.41 809.952 428.758 822 447.508"
          stroke="black"
        />
        <path
          d="M784.855 464.5L768.355 477.5C744.135 464.533 755.594 448.459 765.355 451C775.117 453.541 784.855 464.5 784.855 464.5ZM784.855 464.5L788.855 274"
          stroke="black"
        />
        <path
          d="M748.685 144.659L690.685 479.159L1301.68 471.659"
          stroke="black"
        />
        <path
          d="M406.819 180.659C394.019 388.259 441.152 473.659 485.319 475.159C485.319 475.159 592.819 501.159 644.819 444.659C696.819 388.159 662.819 144.659 662.819 144.659"
          stroke="black"
        />
        <path
          d="M206.499 469.05C159.349 435.659 149.685 411.656 149.685 353.656C160.185 288.656 181.918 257.156 251.185 229.156C318.918 209.156 359.185 216.656 379.185 291.612C380.834 313.897 385.219 335.571 376.418 349.112M206.499 469.05L328.025 438.373C310.201 389.875 295.177 394.309 261.948 442.665C250.537 396.565 236.216 414.345 206.499 469.05ZM206.499 469.05C222.859 480.42 233.907 482.077 257.696 474.772L328.025 442.665V459.195C400.571 434.109 414.121 398.16 399.418 369.391C393.128 357.085 388.607 353.155 376.418 349.112M376.418 349.112C373.335 361.062 362.201 378.332 342.447 388.546C325.825 385.244 318.918 379.612 318.918 363.612C320.418 347.612 342.335 343.562 376.418 349.112ZM181.918 331.612C209.294 339.091 225.335 341.572 257.918 336.112C300.636 328.835 317.539 317.427 342.447 291.612L262.183 311.612L181.918 331.612ZM253.918 299.112C267.586 306.481 270.944 311.463 260.418 323.612C243.584 316.907 240.694 311.836 253.918 299.112Z"
          stroke="black"
          stroke-width="4"
        />
        <path
          d="M181.239 331.484C192.614 303.436 302.562 266.142 342.447 290.159"
          stroke="black"
          stroke-width="4"
        />
        <path
          d="M257.592 335.617L252.632 430.667C264.925 398.462 275.69 385.054 304.36 372.493"
          stroke="black"
          stroke-width="4"
        />
        <path
          d="M1.68467 137.159C1.68467 137.159 103.185 357.659 259.685 177.659C416.185 -2.34048 243.185 -28.3409 114.185 26.6591C-14.8153 81.6591 1.68467 137.159 1.68467 137.159ZM1.68467 137.159L11.1847 507.659"
          stroke="black"
        />
      </svg>
    </div>
  );
}