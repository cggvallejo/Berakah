import React, { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import BrandLogo from './BrandLogo';
import WeaveBackground from './WeaveBackground';
import MexicanHeritage from './MexicanHeritage';

gsap.registerPlugin(ScrollToPlugin);

function Hero() {
  const contentRef = useRef(null);
  const title1Ref = useRef(null);
  const title2Ref = useRef(null);
  const ctaRef = useRef(null);

  const handleSmoothScroll = (e, target) => {
    e.preventDefault();
    gsap.to(window, { duration: 1, scrollTo: target, ease: "power3.inOut" });
  };

  useEffect(() => {
    const tl = gsap.timeline();

    // Reset initial states
    gsap.set([title1Ref.current, title2Ref.current, ctaRef.current], { opacity: 0, y: 30 });

    // 1. Entrance of content with stagger
    tl.to(contentRef.current, { opacity: 1, duration: 1 })
      .to(title1Ref.current, { 
        opacity: 1, 
        y: 0, 
        duration: 1.2, 
        ease: "expo.out" 
      }, "-=0.5")
      .to(title2Ref.current, { 
        opacity: 1, 
        y: 0, 
        duration: 1.2, 
        ease: "expo.out" 
      }, "-=1")
      .to(ctaRef.current, { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        ease: "back.out(1.7)" 
      }, "-=0.8");

    // 2. Continuous floating animation for background icons handled in their component
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-transparent">
      {/* Dynamic Heritage Elements */}
      <MexicanHeritage className="top-10 -left-20 w-[40vw] h-[40vw] rotate-12 opacity-10" />
      <MexicanHeritage className="bottom-0 -right-20 w-[50vw] h-[50vw] -rotate-12 opacity-10" />
      
      {/* Weave Background Animation */}
      <WeaveBackground />
      
      {/* Subtle organic texture pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: 'url("https://www.transparenttextures.com/patterns/pinstriped-suit.png")',
        mixBlendMode: 'multiply'
      }} />

      <div ref={contentRef} className="container relative z-10 text-center max-w-4xl px-4 flex h-full flex-col items-center justify-between py-16 opacity-0">
        <div className="shimmer-gold rounded-full px-4 py-1">
          <BrandLogo 
            className="text-[10vw] sm:text-[10rem] mt-4" 
            subtitle="TRADICIÓN & LUJO MEXICANO"
          />
        </div>
        
        <div className="flex flex-col items-center flex-grow justify-center relative">
          {/* Decorative Frame Lines */}
          <div className="absolute -inset-x-10 top-0 bottom-0 border-x border-accent/5 pointer-events-none hidden md:block" />
          
          <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl mb-4 md:mb-6 leading-[1.1] text-accent tracking-tighter uppercase font-light">
            <span ref={title1Ref} className="block overflow-hidden">
              <span className="block">Artesanía en</span>
            </span>
            <span ref={title2Ref} className="block italic font-light text-black/80 mt-2">
              Yute
            </span>
          </h1>
          
          <p className="hero-subtitle text-base md:text-xl text-accent/80 max-w-xl mx-auto mb-1 font-light tracking-wide px-4 md:px-6">
            Descubre piezas únicas diseñadas con la esencia de México, donde lo rústico se encuentra con la sofisticación contemporánea.
          </p>
        </div>

        <div ref={ctaRef} className="mb-8">
          <a href="#catalog" onClick={(e) => handleSmoothScroll(e, "#catalog")} className="group relative inline-block bg-accent text-white px-16 py-6 text-sm uppercase tracking-[0.4em] font-bold hover:bg-gold transition-all duration-700 premium-shadow shimmer-gold cursor-pointer">
            Explorar Colección
            <span className="absolute inset-0 border border-gold/30 scale-110 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500" />
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-30 animate-bounce">
        <ArrowDown size={28} strokeWidth={1} />
      </div>
    </section>
  );
}

export default Hero;
