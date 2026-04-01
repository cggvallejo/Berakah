import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const WeaveBackground = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width, height;

    class Thread {
      constructor(index, isVertical) {
        this.index = index;
        this.isVertical = isVertical;
        this.reset();
      }

      reset() {
        this.offset = Math.random() * 1000;
        this.speed = 0.4 + Math.random() * 0.6;
        this.thickness = 0.5 + Math.random() * 0.8;
        this.phase = Math.random() * Math.PI * 2;
        this.opacity = 0.15 + Math.random() * 0.25; // Mucho más visible
      }

      draw(time) {
        ctx.beginPath();
        ctx.lineWidth = this.thickness;
        ctx.strokeStyle = `rgba(212, 175, 55, ${this.opacity})`; // Color oro visible
        
        const spacing = 50;
        const count = this.isVertical ? width / spacing : height / spacing;
        
        let x, y;

        if (this.isVertical) {
          x = this.index * spacing;
          ctx.moveTo(x, 0);
          for (let i = 0; i <= height; i += 15) {
            const wave = Math.sin(i * 0.005 + time * 0.001 * this.speed + this.phase) * 20;
            
            // Mouse Interaction distance
            const dx = x + wave - mouseRef.current.x;
            const dy = i - mouseRef.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const force = Math.max(0, (200 - dist) / 200);
            
            ctx.lineTo(x + wave + (dx / dist) * force * 50, i);
          }
        } else {
          y = this.index * spacing;
          ctx.moveTo(0, y);
          for (let i = 0; i <= width; i += 15) {
            const wave = Math.cos(i * 0.005 + time * 0.001 * this.speed + this.phase) * 20;
            
            // Mouse Interaction distance
            const dx = i - mouseRef.current.x;
            const dy = y + wave - mouseRef.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const force = Math.max(0, (200 - dist) / 200);
            
            ctx.lineTo(i, y + wave + (dy / dist) * force * 50);
          }
        }
        ctx.stroke();
      }
    }

    const threads = [];
    const init = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      
      threads.length = 0;
      const spacing = 50;
      const verticalCount = Math.floor(width / spacing) + 1;
      const horizontalCount = Math.floor(height / spacing) + 1;

      for (let i = 0; i < verticalCount; i++) threads.push(new Thread(i, true));
      for (let i = 0; i < horizontalCount; i++) threads.push(new Thread(i, false));
    };

    const render = (time) => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      
      // Update scroll position for parallax
      scrollRef.current = window.scrollY;
      
      threads.forEach(t => {
        // Apply a subtle vertical shift based on scroll for parallax effect
        const scrollOffset = t.isVertical ? 0 : scrollRef.current * 0.2;
        ctx.save();
        ctx.translate(0, -scrollOffset);
        t.draw(time);
        ctx.restore();
      });
      animationFrameId = requestAnimationFrame(render);
    };

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };

    const handleResize = () => init();

    init();
    render(0);

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ 
        opacity: 0.9,
        background: 'transparent'
      }}
    />
  );
};

export default WeaveBackground;
