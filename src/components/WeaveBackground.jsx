import React, { useEffect, useRef } from 'react';

const WeaveBackground = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  // Usamos un objeto simple para el estado que no necesite re-renders
  const state = useRef({
    warpThreads: [],
    wovenRows: [],
    shuttleX: 0,
    shuttleY: 50,
    width: 0,
    height: 0,
    dpr: 1
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const COLORS = {
      jute: 'rgba(139, 115, 85, 0.4)',
      juteDark: 'rgba(101, 82, 58, 0.5)',
      juteLight: 'rgba(183, 151, 102, 0.3)',
      highlight: 'rgba(212, 180, 131, 0.7)'
    };

    const init = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.scale(dpr, dpr);
      
      state.current.width = w;
      state.current.height = h;
      state.current.dpr = dpr;

      // Hilos verticales (Urdimbre) con espaciado minimalista
      const threadSpacing = 45;
      const count = Math.ceil(w / threadSpacing) + 2;
      state.current.warpThreads = Array.from({ length: count }, (_, i) => ({
        x: i * threadSpacing,
        jitter: (Math.random() - 0.5) * 6,
        thickness: 0.8 + Math.random() * 1.5,
        color: Math.random() > 0.5 ? COLORS.jute : COLORS.juteLight
      }));

      state.current.wovenRows = [];
      state.current.shuttleX = 0;
      state.current.shuttleY = 60;
    };

    const drawLine = (x1, y1, x2, y2, color, width) => {
      // Interacción sutil con el mouse: los hilos se curvan hacia el puntero
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.lineCap = 'round';

      // Calculamos desplazamiento radial
      const dx1 = mx - x1;
      const dy1 = my - y1;
      const dist1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
      
      const dx2 = mx - x2;
      const dy2 = my - y2;
      const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

      let ox1 = 0, oy1 = 0, ox2 = 0, oy2 = 0;
      const radius = 180;
      const strength = 0.2;

      if (dist1 < radius) {
        const factor = (radius - dist1) / radius;
        ox1 = dx1 * factor * strength;
        oy1 = dy1 * factor * strength;
      }
      if (dist2 < radius) {
        const factor = (radius - dist2) / radius;
        ox2 = dx2 * factor * strength;
        oy2 = dy2 * factor * strength;
      }

      ctx.moveTo(x1 + ox1, y1 + oy1);
      ctx.lineTo(x2 + ox2, y2 + oy2);
      ctx.stroke();
    };

    const render = () => {
      const s = state.current;
      if (s.width === 0) return;

      ctx.clearRect(0, 0, s.width, s.height);

      // 1. Dibujar Urdimbre (Verticales)
      s.warpThreads.forEach(t => {
        drawLine(t.x + t.jitter, 0, t.x + t.jitter, s.height, t.color, t.thickness);
      });

      // 2. Dibujar Filas Completadas (Trama)
      const rowSpacing = 28;
      s.wovenRows.forEach(row => {
        if (row.y > s.height + 50) return;
        
        ctx.beginPath();
        ctx.strokeStyle = COLORS.jute;
        ctx.lineWidth = 1.8;
        
        for (let i = 0; i < s.warpThreads.length - 1; i++) {
          const tA = s.warpThreads[i];
          const tB = s.warpThreads[i+1];
          // Lógica de entrelazado: una fila pasa por encima de pares, la siguiente de impares
          const isOver = (i + Math.floor(row.y / rowSpacing)) % 2 === 0;
          
          if (isOver) {
            const xA = tA.x + tA.jitter;
            const xB = tB.x + tB.jitter;
            // Dibujamos un pequeño arco o línea recta entre hilos
            ctx.moveTo(xA, row.y);
            ctx.lineTo(xB, row.y);
          }
        }
        ctx.stroke();
      });

      // 3. Animación de la Lanzadera (Rápida y Evidente)
      s.shuttleX += 12; // Velocidad incrementada
      
      ctx.beginPath();
      ctx.strokeStyle = COLORS.highlight;
      ctx.lineWidth = 2.5;
      ctx.moveTo(0, s.shuttleY);
      ctx.lineTo(s.shuttleX, s.shuttleY);
      ctx.stroke();

      // Al completar la fila, "empujamos" el tejido
      if (s.shuttleX > s.width) {
        s.wovenRows.unshift({ y: s.shuttleY });
        s.shuttleX = 0;
        // Desplazamiento hacia abajo del tejido formado
        s.wovenRows.forEach(row => {
          row.y += rowSpacing;
        });
      }

      // Limpieza de filas viejas para rendimiento
      if (s.wovenRows.length > 40) s.wovenRows.pop();

      animationFrameId = requestAnimationFrame(render);
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleResize = () => init();

    init();
    render();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[1] pointer-events-none opacity-50"
      style={{ mixBlendMode: 'multiply' }}
    />
  );
};

export default WeaveBackground;
