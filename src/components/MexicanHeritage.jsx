import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

const MexicanHeritage = ({ className = "" }) => {
  const svgRef = useRef(null);

  useLayoutEffect(() => {
    const lines = svgRef.current.querySelectorAll('.draw-path');
    
    // Reset positions
    gsap.set(lines, { strokeDasharray: 500, strokeDashoffset: 500, opacity: 0 });

    const tl = gsap.timeline({ delay: 1.5 });

    // Drawing effect: Elegant lines forming the Agave
    tl.to(lines, {
      strokeDashoffset: 0,
      opacity: 0.1, // Sutil para el fondo
      duration: 3,
      stagger: 0.2,
      ease: "power2.inOut"
    });

    // Gentle hover pulse
    gsap.to(svgRef.current, {
      y: -10,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, []);

  return (
    <div className={`absolute pointer-events-none opacity-20 select-none ${className}`}>
      <svg 
        ref={svgRef}
        viewBox="0 0 400 400" 
        className="w-full h-full fill-none stroke-accent/40 stroke-[0.5]"
      >
        {/* Simple Minimalist Agave Symbol */}
        <path className="draw-path" d="M200 400 Q200 200 150 150 M200 400 Q200 200 250 150" />
        <path className="draw-path" d="M200 400 Q200 250 100 200 M200 400 Q200 250 300 200" />
        <path className="draw-path" d="M200 400 Q200 300 60 280 M200 400 Q200 300 340 280" />
        <path className="draw-path" d="M200 400 L200 100" />
        {/* Decorative dots (Starry desert night style) */}
        <circle cx="200" cy="50" r="1" className="fill-accent/20" />
        <circle cx="150" cy="80" r="0.5" className="fill-accent/20" />
        <circle cx="250" cy="80" r="0.5" className="fill-accent/20" />
      </svg>
    </div>
  );
};

export default MexicanHeritage;
