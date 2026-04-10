import React, { useState } from 'react';
import { MapPin, Phone, Clock, ExternalLink, ChevronRight, Navigation } from 'lucide-react';
import { settings } from '../data/settings';

function Locations() {
  const [activeTab, setActiveTab] = useState(0);
  const currentLoc = settings.locations[activeTab];

  return (
    <section id="ubicaciones" className="py-24 bg-[#fdfcf8] relative overflow-hidden">
      {/* Elementos Decorativos */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Encabezado Editorial */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <span className="text-[10px] uppercase tracking-[0.6em] font-bold text-gold mb-6 block drop-shadow-sm">Ubicación Estratégica</span>
          <h2 className="text-5xl md:text-8xl font-serif text-accent mb-10 italic leading-none">Visita Nuestras Boutiques</h2>
          <p className="text-base md:text-xl text-accent/70 font-light leading-relaxed tracking-wide italic max-w-2xl mx-auto">
            "Espacios creados para experimentar la textura, el aroma y la esencia de la artesanía premium mexicana."
          </p>
          <div className="w-40 h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent mx-auto mt-12" />
        </div>

        {/* Tab Selector - Diseño Galería/Switch Premium */}
        <div className="flex flex-col items-center mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-[1px] w-8 bg-gold/30" />
            <span className="text-[10px] uppercase tracking-[0.4em] font-black text-accent/40 italic">
              Selecciona una Boutique
            </span>
            <div className="h-[1px] w-8 bg-gold/30" />
          </div>
          
          <div className="relative inline-flex p-2 bg-[#1a1a1a] rounded-[32px] border border-[#d4af37]/20 shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden scale-110">
            {/* Sliding Pill Background (Ultra Visibility Gold) */}
            <div 
              className="absolute top-2 bottom-2 bg-[#d4af37] rounded-[26px] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] shadow-[0_5px_15px_rgba(212,175,55,0.4)]"
              style={{
                left: `calc(0.5rem + ${activeTab * 50}%)`,
                width: 'calc(50% - 0.5rem)'
              }}
            />
            
            {settings.locations.map((loc, index) => (
              <button
                key={loc.id}
                onClick={() => setActiveTab(index)}
                className={`relative z-10 px-16 py-6 rounded-[26px] text-[12px] uppercase tracking-[0.4em] font-black transition-all duration-700 flex items-center gap-4 ${
                  activeTab === index 
                  ? 'text-[#1a1a1a]' 
                  : 'text-white/40 hover:text-white/80'
                }`}
              >
                <div className={`w-2 h-2 rounded-full transition-all duration-700 ${activeTab === index ? 'bg-[#1a1a1a] scale-125' : 'bg-white/10'}`} />
                {loc.name.replace('Sucursal ', '')}
              </button>
            ))}
          </div>
          
          <div className="mt-8 flex items-center gap-2 text-accent/30 animate-bounce duration-[2000ms]">
            <ChevronRight className="rotate-90" size={12} />
            <span className="text-[8px] uppercase tracking-[0.3em] font-bold">Explora opciones</span>
          </div>
        </div>

        {/* Main Content Card (Bento Style) */}
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 lg:gap-0 bg-white rounded-[48px] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] border border-accent/5">
          
          {/* Info Side (Col-span 5) */}
          <div className="lg:col-span-5 p-10 md:p-20 flex flex-col justify-between bg-white relative">
            {/* Watermark Logo */}
            <div className="absolute top-10 right-10 opacity-[0.03] pointer-events-none">
              <Navigation size={180} />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-10 text-gold group">
                <div className="w-8 h-[1px] bg-gold group-hover:w-12 transition-all duration-700" />
                <span className="text-[9px] uppercase tracking-[0.5em] font-black"> Boutique Oficial </span>
              </div>
              
              <h3 className="text-4xl md:text-6xl font-serif text-accent mb-16 leading-[1.1] tracking-tighter">
                {currentLoc.name}
              </h3>
              
              <div className="space-y-16">
                <div className="flex gap-8 group">
                  <div className="w-16 h-16 rounded-3xl bg-sand/30 flex items-center justify-center flex-shrink-0 group-hover:bg-accent group-hover:text-white transition-all duration-700 shadow-sm border border-accent/10">
                    <MapPin size={24} className="text-accent group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="text-[9px] uppercase tracking-[0.5em] font-black text-gold mb-3 opacity-80">Dirección</p>
                    <p className="text-accent font-medium leading-relaxed uppercase text-sm tracking-wider max-w-xs">
                      {currentLoc.address}
                    </p>
                  </div>
                </div>

                <div className="flex gap-8 group">
                  <div className="w-16 h-16 rounded-3xl bg-sand/30 flex items-center justify-center flex-shrink-0 group-hover:bg-accent group-hover:text-white transition-all duration-700 shadow-sm border border-accent/10">
                    <Clock size={24} className="text-accent group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="text-[9px] uppercase tracking-[0.5em] font-black text-gold mb-3 opacity-80">Horario</p>
                    <p className="text-accent font-medium text-sm tracking-widest italic">
                      {currentLoc.schedule}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-20 relative z-10">
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(currentLoc.address)}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative flex items-center justify-between bg-accent text-white py-7 px-10 rounded-2xl overflow-hidden shadow-2xl transition-all duration-700 hover:bg-gold"
              >
                <div className="flex items-center gap-4 relative z-10">
                  <ExternalLink size={18} className="group-hover:rotate-12 transition-transform duration-500" />
                  <span className="text-[11px] font-black uppercase tracking-[0.4em]">Cómo llegar</span>
                </div>
                <ChevronRight className="relative z-10 group-hover:translate-x-2 transition-transform" size={20} />
                
                {/* Button Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </a>
            </div>
          </div>

          {/* Map Side (Col-span 7) */}
          <div className="lg:col-span-7 h-[500px] lg:h-auto relative bg-sand/10 grayscale-[0.2] hover:grayscale-0 transition-all duration-1000">
            <iframe 
              title={`Mapa ${currentLoc.name}`}
              src={currentLoc.mapIframe}
              className="w-full h-full opacity-90 hover:opacity-100 transition-opacity duration-1000"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            />
            {/* Artistic Border Overlay */}
            <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black/5 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Contact Strip - Cards Flotantes con Diseño Editorial */}
        <div className="mt-24 max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[9px] uppercase tracking-[0.6em] font-black text-gold/40">Líneas de Atención Directa</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {settings.phones.map((phone, i) => (
              <a 
                key={i}
                href={phone.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex flex-col items-center bg-white p-10 rounded-[32px] border border-accent/5 shadow-premium hover:shadow-premium-lg hover:translate-y-[-8px] transition-all duration-700 text-center"
              >
                <div className="w-20 h-20 rounded-full bg-sand/20 flex items-center justify-center text-accent mb-8 group-hover:bg-accent group-hover:text-white transition-all duration-700 shadow-inner">
                  <Phone size={28} strokeWidth={1.5} />
                </div>
                <span className="text-[9px] uppercase tracking-[0.5em] font-black text-gold mb-4 group-hover:text-accent transition-colors">
                  {phone.label}
                </span>
                <p className="text-2xl font-serif text-accent tracking-tighter">
                  {phone.number}
                </p>
                <div className="mt-6 w-8 h-[1px] bg-gold/30 group-hover:w-16 group-hover:bg-gold transition-all duration-700" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Locations;
