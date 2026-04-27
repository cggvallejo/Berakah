import React from 'react';
import { ArrowDown } from 'lucide-react';
import BrandLogo from './BrandLogo';
import MexicanHeritage from './MexicanHeritage';

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-visible bg-transparent !pt-12 md:!pt-16">
      {/* Dynamic Heritage Elements - Watermark Style */}
      <MexicanHeritage className="top-10 -left-20 w-[40vw] h-[40vw] rotate-12 opacity-[0.05]" />
      <MexicanHeritage className="bottom-0 -right-20 w-[50vw] h-[50vw] -rotate-12 opacity-[0.05]" />
      
      {/* Jute Texture Background - Static & Optimized */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute inset-0 opacity-[0.25] bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: 'url("/images/jute-texture.webp")',
            mixBlendMode: 'multiply',
            filter: 'sepia(0.1) contrast(1.1)'
          }} 
        />
        {/* Subtle Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-sand/40" />
      </div>

      <div className="container relative z-10 text-center max-w-4xl px-4 flex flex-col items-center justify-start pt-0 pb-0 min-h-[calc(100vh-10rem)] -mt-24 md:-mt-32">
        <div className="flex justify-center w-full mb-0">
          <BrandLogo 
            variant="full"
            className="w-full max-w-[850px]" 
          />
        </div>


        <div className="flex flex-col items-center justify-center relative mt-0 mb-2 md:mb-4">
          {/* Decorative Frame Lines */}
          <div className="absolute -inset-x-10 top-0 bottom-0 border-x border-accent/5 pointer-events-none hidden md:block" />
          
          <h1 className="hero-title text-3xl md:text-5xl lg:text-6xl mb-2 md:mb-4 leading-[1] text-accent tracking-tighter uppercase font-light">
            <span className="block">
              <span className="block">Artesanía en</span>
            </span>
            <span className="block italic font-light text-black/80 mt-1 md:mt-2">
              Yute
            </span>
          </h1>
          
          <p className="hero-subtitle text-base md:text-xl text-accent/80 max-w-xl mx-auto mb-1 font-light tracking-wide px-4 md:px-6">
            Descubre piezas únicas diseñadas con la esencia de México, donde lo rústico se encuentra con la sofisticación contemporánea.
          </p>
        </div>

        <div className="mb-8">
          <a href="#catalog" className="group relative inline-block bg-accent text-white px-16 py-6 text-sm uppercase tracking-[0.4em] font-bold hover:bg-gold transition-all duration-700 premium-shadow shimmer-gold">
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
