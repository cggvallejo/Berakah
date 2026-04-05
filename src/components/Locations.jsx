import React, { useState } from 'react';
import { MapPin, Phone, Clock, ExternalLink, ChevronRight, Navigation } from 'lucide-react';
import { settings } from '../data/settings';

function Locations() {
  const [activeTab, setActiveTab] = useState(0);
  const currentLoc = settings.locations[activeTab];

  return (
    <section id="ubicaciones" className="py-32 bg-[#fcfaf7] relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-[120px]" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#2d1a0a]/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-[#8b6914] mb-4 block animate-in fade-in slide-in-from-bottom-4 duration-700">Explora Berakah</span>
          <h2 className="text-5xl md:text-7xl font-serif text-[#2d1a0a] mb-8 italic animate-in fade-in slide-in-from-bottom-6 duration-1000">Nuestras Ubicaciones</h2>
          <p className="text-xl text-[#2d1a0a]/70 max-w-2xl mx-auto font-light leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000">
            Encuéntranos en los puntos más emblemáticos de la Ciudad de México y vive la experiencia artesanal que nos define.
          </p>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-12 animate-in fade-in zoom-in duration-1000" />
        </div>

        {/* Premium Tab Selector */}
        <div className="flex justify-center mb-16 px-2 py-2 bg-white/40 backdrop-blur-xl rounded-[32px] border border-black/5 max-w-xl mx-auto shadow-2xl shadow-black/5 animate-in fade-in slide-in-from-bottom-10 duration-1000">
          {settings.locations.map((loc, index) => (
            <button
              key={loc.id}
              onClick={() => setActiveTab(index)}
              className={`relative flex-1 py-4 px-8 rounded-[24px] text-[11px] uppercase tracking-[0.25em] font-bold transition-all duration-700 ease-out ${
                activeTab === index 
                ? 'text-white shadow-2xl scale-[1.02]' 
                : 'text-[#2d1a0a]/50 hover:text-[#2d1a0a] hover:bg-white/60'
              }`}
            >
              {activeTab === index && (
                <div className="absolute inset-0 bg-[#2d1a0a] rounded-[24px] z-0 shadow-lg animate-in fade-in zoom-in-95 duration-500" />
              )}
              <span className="relative z-10">{loc.name.replace('Sucursal ', '')}</span>
            </button>
          ))}
        </div>

        {/* Immersive Layout Container */}
        <div className="relative min-h-[750px] rounded-[64px] overflow-hidden bg-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-black/5 flex flex-col lg:flex-row animate-in fade-in zoom-in-95 duration-1000">
          
          {/* Information Column (Left) */}
          <div className="lg:w-[40%] p-10 md:p-20 flex flex-col justify-between bg-white relative z-20">
            <div className="animate-in fade-in slide-in-from-left-8 duration-1000">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#f8f5f0] rounded-full border border-black/5 mb-8">
                <Navigation size={14} className="text-[#8b6914]" />
                <span className="text-[9px] uppercase tracking-[0.3em] font-black text-[#8b6914]">Información de Tienda</span>
              </div>
              
              <h3 className="text-4xl md:text-5xl font-serif text-[#2d1a0a] mb-12 leading-tight tracking-tight">
                {currentLoc.name}
              </h3>
              
              <div className="space-y-12">
                <div className="group/item flex items-start gap-8">
                  <div className="w-16 h-16 rounded-[24px] bg-[#f8f5f0] flex items-center justify-center flex-shrink-0 border border-black/5 group-hover/item:bg-[#2d1a0a] group-hover/item:text-white transition-all duration-500 shadow-sm">
                    <MapPin size={24} className="text-[#8b6914] group-hover/item:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.4em] font-black text-[#8b6914] mb-3 opacity-60">Dirección</p>
                    <p className="text-[#2d1a0a] leading-relaxed text-sm md:text-base font-medium tracking-wide uppercase max-w-xs transition-colors duration-500">
                      {currentLoc.address}
                    </p>
                  </div>
                </div>

                <div className="group/item flex items-start gap-8">
                  <div className="w-16 h-16 rounded-[24px] bg-[#f8f5f0] flex items-center justify-center flex-shrink-0 border border-black/5 group-hover/item:bg-[#2d1a0a] group-hover/item:text-white transition-all duration-500 shadow-sm">
                    <Clock size={24} className="text-[#8b6914] group-hover/item:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.4em] font-black text-[#8b6914] mb-3 opacity-60">Horario de Atención</p>
                    <p className="text-[#2d1a0a] text-sm md:text-base font-medium tracking-wide transition-colors duration-500">
                      {currentLoc.schedule}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(currentLoc.address)}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="group/btn relative w-full overflow-hidden bg-[#2d1a0a] text-white py-6 rounded-[24px] text-[11px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-4 hover:shadow-[0_20px_50px_rgba(45,26,10,0.3)] transition-all duration-700"
              >
                <div className="absolute inset-0 bg-[#8b6914] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-700 ease-out" />
                <span className="relative z-10 flex items-center gap-3">
                  <ExternalLink size={18} className="transition-transform duration-500 group-hover/btn:scale-110 group-hover/btn:-translate-y-1" />
                  Ir a Google Maps
                </span>
              </a>
            </div>
          </div>

          {/* Map & Image Visual Side (Right) */}
          <div className="lg:w-[60%] relative bg-[#f8f5f0] group/visual">
            {/* Split View Content */}
            <div className="absolute inset-0 flex flex-col">
              {/* Dynamic Image Reference */}
              <div className="h-1/2 relative overflow-hidden">
                <img 
                  src={currentLoc.image} 
                  alt={currentLoc.name}
                  className="w-full h-full object-cover transition-transform duration-[4s] scale-105 group-hover/visual:scale-100"
                />
                <div className="absolute inset-0 bg-[#2d1a0a]/20" />
                <div className="absolute top-8 right-8">
                  <span className="bg-white/10 backdrop-blur-xl px-6 py-2.5 rounded-full text-[9px] uppercase tracking-[0.3em] font-bold text-white border border-white/20">
                    Sede {currentLoc.name.replace('Sucursal ', '')}
                  </span>
                </div>
              </div>

              {/* Enhanced Map Integration */}
              <div className="h-1/2 relative">
                <iframe 
                  title={`Mapa ${currentLoc.name}`}
                  src={currentLoc.mapIframe}
                  className="w-full h-full grayscale-[0.2] contrast-[1.05] brightness-[1.02] hover:grayscale-0 transition-all duration-1000"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                />
                {/* Decorative map border */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
              </div>
            </div>

            {/* floating visual accent */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 -ml-8 hidden lg:block">
              <div className="w-16 h-16 bg-[#d4af37] rounded-2xl flex items-center justify-center shadow-2xl text-white rotate-12 group-hover/visual:rotate-0 transition-all duration-700">
                <Navigation size={28} />
              </div>
            </div>
          </div>
        </div>

        {/* Specialized Contact Channels */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-10">
          {settings.phones.map((phone, i) => (
            <a 
              key={i}
              href={phone.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative overflow-hidden p-1 bg-gradient-to-br from-black/5 to-transparent rounded-[45px] transition-all duration-700 hover:scale-[1.01]"
            >
              <div className="bg-white p-10 md:p-14 rounded-[42px] flex flex-col sm:flex-row items-center gap-10">
                <div className="w-24 h-24 rounded-[32px] bg-[#f8f5f0] flex items-center justify-center relative transition-all duration-700 group-hover:bg-[#2d1a0a] shadow-sm">
                  <Phone size={32} className="text-[#8b6914] group-hover:text-white transition-all duration-500 group-hover:scale-110" />
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#d4af37] border-4 border-white animate-pulse" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <span className="text-[10px] uppercase tracking-[0.5em] font-black text-[#8b6914] mb-3 block opacity-50 group-hover:opacity-100 transition-opacity">Canal Directo</span>
                  <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#2d1a0a] mb-4">{phone.label}</p>
                  <div className="flex items-center justify-center sm:justify-between">
                    <p className="text-3xl lg:text-4xl font-serif text-[#2d1a0a] tracking-tight">{phone.number}</p>
                    <div className="hidden sm:flex w-12 h-12 rounded-full border border-black/5 items-center justify-center -translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-700">
                      <ChevronRight size={20} className="text-[#d4af37]" />
                    </div>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-24 text-center">
          <p className="text-[10px] uppercase tracking-[0.5em] font-bold text-[#2d1a0a]/30">
            Hacia un legado de excelencia artesanal
          </p>
        </div>
      </div>
    </section>
  );
}

export default Locations;
