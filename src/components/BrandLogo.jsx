import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

const BrandLogo = ({ className = "", variant = "full" }) => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const glowRef = useRef(null);

  // Logo Principal (Hero): logo-badge.png (Sin texto integrado para maxima calidad)
  // Logo Scroll/Footer: logo-text.png (Letras de cuerda)
  const imageSrc = variant === "full" ? "/logo-badge.png" : "/logo-text.png";

  useLayoutEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const tl = gsap.timeline({ 
      delay: 0.5,
      defaults: { ease: "power3.out" }
    });

    // 1. Entrada Triunfal del Badge y Texto
    gsap.set([imageRef.current, textRef.current], { opacity: 0, scale: 0.9, y: 20 });
    
    tl.to(imageRef.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 1.5,
      ease: "expo.out"
    })
    .to(textRef.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 1.2,
      ease: "power2.out"
    }, "-=0.8");

    // 2. Animación Divina (Floating) - Solo para el logo principal (Hero)
    if (variant === "full") {
      gsap.to(imageRef.current, {
        y: "-=12",
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }

    // 3. Shimmer/Destello Periódico
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        left: "150%",
        duration: 4,
        repeat: -1,
        repeatDelay: 5,
        ease: "power2.inOut"
      });
    }

    // 4. Parallax Interactivo (Reactivo al Mouse) - Solo en Hero (full)
    if (variant === "full") {
      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const xPos = (clientX / innerWidth - 0.5) * 30;
        const yPos = (clientY / innerHeight - 0.5) * 30;
        
        gsap.to(containerRef.current, {
          rotationY: xPos * 0.1,
          rotationX: -yPos * 0.1,
          duration: 1.2,
          ease: "power2.out"
        });

        // Movimiento independiente para el badge para profundidad
        gsap.to(imageRef.current, {
          x: xPos * 0.5,
          y: yPos * 0.5,
          duration: 1,
          ease: "power2.out"
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }

    return () => tl.kill();
  }, [variant]);

  return (
    <div 
      ref={containerRef} 
      className={`relative flex flex-col items-center justify-center perspective-[1500px] overflow-visible ${className}`}
    >
      <div className="relative group overflow-visible flex flex-col items-center">
        {/* Badge del Logo */}
        <img 
          ref={imageRef}
          src={imageSrc} 
          alt={`Berakah Logo ${variant}`} 
          className={`w-full h-auto object-contain z-10 relative transition-transform duration-300 ${
            variant === 'full' 
              ? 'max-w-[90vw] md:max-w-[600px]' 
              : 'max-w-[120px] md:max-w-[200px]'
          }`}
        />

        {/* Capas de animación dinámica (Shimmer) */}
        {variant === 'full' && (
          <div 
            ref={glowRef}
            className="absolute top-0 -left-[100%] w-full h-[300px] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg] pointer-events-none z-20"
          />
        )}

        {/* Tipografía Premium Definida por Código (Solo en Hero) */}
        {variant === 'full' && (
          <div ref={textRef} className="-mt-24 md:-mt-80 flex flex-col items-center gap-0 text-center w-full px-4 relative z-30">
            <div className="flex flex-col items-center">
              <span className="text-[18px] md:text-[28px] font-bold tracking-[0.5em] text-accent uppercase font-sans">
                México | Bolsas Artesanales
              </span>
              <span className="text-[12px] md:text-[20px] font-medium tracking-[0.3em] text-accent/70 uppercase font-sans mt-0.5">
                Eclesiastés 3:1
              </span>
            </div>
            
            <p className="mt-0.5 md:mt-1 text-[18px] md:text-[28px] lg:text-[32px] font-medium italic text-accent font-serif leading-tight max-w-[95vw] md:max-w-[800px]">
              "Todo tiene su tiempo, y todo lo que se quiere debajo del cielo tiene su hora."
            </p>
            
            {/* Decoración Inferior Sutil */}
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent mt-4" />
          </div>
        )}
      </div>
    </div>
  );
};

export default BrandLogo;

