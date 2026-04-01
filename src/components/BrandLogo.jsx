import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

const BrandLogo = ({ className = "", subtitle = "" }) => {
  const containerRef = useRef(null);
  const text = "Berakah";

  useLayoutEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    // Selector ultra-específico para evitar fallos de target
    const fills = gsap.utils.toArray(node.querySelectorAll('.logo-write-on'));
    const subtitleLetters = gsap.utils.toArray(node.querySelectorAll('.subtitle-letter'));
    
    if (fills.length === 0) return;

    // Estado Inicial: Ocultar progresivamente vía JS (más seguro que CSS)
    gsap.set(fills, { clipPath: "inset(0 100% 0 0)" });
    if (subtitleLetters.length > 0) {
      gsap.set(subtitleLetters, { opacity: 0, y: 15 });
    }

    const tl = gsap.timeline({ 
      delay: 1.0, // Delay ligeramente menor para mejor UX
      defaults: { ease: "power2.inOut" }
    });

    // 1. Escritura Editorial (Wipe) con limpieza final
    tl.to(fills, {
      clipPath: "inset(0 -50% 0 -50%)", // Rango masivo para no cortar nada
      duration: 1.5,
      stagger: 0.3,
      onComplete: () => {
        // Victoria definitiva: eliminamos TODA restricción de recorte
        gsap.set(fills, { clearProps: "all" });
      }
    });

    // 2. Subtítulo (Tradición & Lujo)
    if (subtitleLetters.length > 0) {
      tl.to(subtitleLetters, {
        opacity: 0.7, // Un poco más oscuro para mejor legibilidad
        y: 0,
        duration: 1.5,
        stagger: 0.04,
        ease: "power2.out"
      }, "-=0.2");
    }

    // Glow pulsante ambiental
    gsap.to(node, {
      filter: "drop-shadow(0 0 20px rgba(212, 175, 55, 0.2))",
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    return () => {
      // Cleanup on unmount
      tl.kill();
    };

  }, [subtitle]);

  // Tamaño MAJESTUOSO forzado: 150px en desktop, 12vw en móvil
  const logoSizeStyle = {
    fontSize: 'clamp(2.5rem, 12vw, 150px)',
    lineHeight: '1',
  };

  return (
    <div 
      ref={containerRef}
      className={`flex flex-col items-center justify-center font-serif select-none cursor-pointer transform-gpu overflow-visible ${className}`}
      style={logoSizeStyle}
    >
      <div className="flex items-center justify-center relative logo-container-fix overflow-visible" style={{ fontSize: 'inherit' }}>
        {text.split('').map((char, index) => (
          <div 
            key={index} 
            className={`letter-container relative inline-block transform-gpu overflow-visible ${index === 0 ? 'pl-[0.15em]' : ''}`}
            style={{ fontSize: 'inherit' }}
          >
            {/* Outline Sketch Layer */}
            <span className="letter logo-stroke absolute inset-0 text-transparent opacity-30 select-none pointer-events-none overflow-visible" style={{ fontSize: 'inherit' }}>
              {char}
            </span>
            
            {/* Ink Writing Layer */}
            <span className="letter logo-write-on relative z-10 text-black select-none overflow-visible px-[0.5em] mx-[-0.5em]" style={{ fontSize: 'inherit' }}>
              {char}
            </span>
            
            {/* Structural Spacer */}
            <span className="opacity-0 pointer-events-none select-none inline-block px-[0.5em] mx-[-0.5em]">
              {char}
            </span>
          </div>
        ))}
      </div>
      
      {subtitle && (
        <div className="flex items-center justify-center mt-6 overflow-visible min-h-[1.5em] w-full">
          {subtitle.split('').map((char, index) => (
            <span 
              key={index}
              className="subtitle-letter inline-block text-black font-sans uppercase font-medium tracking-[0.4em]"
              style={{ 
                minWidth: char === ' ' ? '0.6em' : 'auto',
                fontSize: '0.08em'
              }}
            >
              {char}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default BrandLogo;
