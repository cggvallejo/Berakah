import React, { useState } from 'react';
import { MapPin, Phone, Clock, ExternalLink, ChevronRight } from 'lucide-react';
import { settings } from '../data/settings';

function Locations() {
  const [activeTab, setActiveTab] = useState(0);
  const currentLoc = settings.locations[activeTab];

  return (
    <section id="ubicaciones" className="py-28 bg-[#fcfaf7] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-serif text-[#2d1a0a] mb-6 italic">Nuestras Casas</h2>
          <p className="text-lg text-[#2d1a0a]/60 max-w-xl mx-auto font-light leading-relaxed">
            Espacios diseñados para vivir la experiencia Berakah. Encuéntranos en el corazón de la Ciudad de México.
          </p>
          <div className="w-16 h-[1px] bg-[#d4af37] mx-auto mt-10" />
        </div>

        {/* Tab Selector - Premium Design */}
        <div className="flex justify-center mb-12 p-1.5 bg-white/50 backdrop-blur-md rounded-full border border-black/5 max-w-lg mx-auto shadow-sm">
          {settings.locations.map((loc, index) => (
            <button
              key={loc.id}
              onClick={() => setActiveTab(index)}
              className={`flex-1 py-3.5 px-6 rounded-full text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-500 ${
                activeTab === index 
                ? 'bg-[#2d1a0a] text-white shadow-xl' 
                : 'text-[#2d1a0a]/40 hover:text-[#2d1a0a] hover:bg-white'
              }`}
            >
              {loc.name.replace('Sucursal ', '')}
            </button>
          ))}
        </div>

        {/* Active Location Content */}
        <div className="relative group bg-white rounded-[48px] overflow-hidden shadow-2xl shadow-black/5 border border-black/5 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="flex flex-col lg:flex-row min-h-[600px]">
            
            {/* Visual Side */}
            <div className="lg:w-1/2 relative overflow-hidden group/img">
              <div className="absolute inset-0 bg-black/10 z-10 group-hover/img:bg-black/0 transition-all duration-700" />
              <img 
                src={currentLoc.image} 
                alt={currentLoc.name}
                className="w-full h-full object-cover transition-transform duration-[3s] scale-110 group-hover/img:scale-100"
              />
              
              {/* Overlay Label */}
              <div className="absolute bottom-8 left-8 z-20">
                <span className="bg-white/90 backdrop-blur-md px-6 py-2.5 rounded-full text-[10px] uppercase tracking-[0.3em] font-bold text-[#2d1a0a] shadow-lg">
                  Referencia Visual
                </span>
              </div>
            </div>

            {/* Info & Map Side */}
            <div className="lg:w-1/2 flex flex-col">
              <div className="p-10 md:p-14 flex-1">
                <div className="mb-10">
                  <h3 className="text-3xl md:text-4xl font-serif text-[#2d1a0a] mb-8">{currentLoc.name}</h3>
                  
                  <div className="space-y-8">
                    <div className="flex items-start gap-5">
                      <div className="w-12 h-12 rounded-2xl bg-[#f8f5f0] flex items-center justify-center flex-shrink-0 border border-black/5">
                        <MapPin size={20} className="text-[#8b6914]" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest font-bold text-[#8b6914] mb-2">Dirección</p>
                        <p className="text-[#2d1a0a] leading-relaxed max-w-xs uppercase text-xs font-medium tracking-wider">{currentLoc.address}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-5">
                      <div className="w-12 h-12 rounded-2xl bg-[#f8f5f0] flex items-center justify-center flex-shrink-0 border border-black/5">
                        <Clock size={20} className="text-[#8b6914]" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest font-bold text-[#8b6914] mb-2">Horario</p>
                        <p className="text-[#2d1a0a] text-xs font-medium tracking-wider">{currentLoc.schedule}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="h-[250px] rounded-[32px] overflow-hidden border border-black/5 shadow-inner bg-[#f8f5f0]">
                  <iframe 
                    title={`Mapa ${currentLoc.name}`}
                    src={currentLoc.mapIframe}
                    className="w-full h-full grayscale-[0.3] contrast-[1.1] hover:grayscale-0 transition-all duration-700"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="px-10 pb-10 md:px-14 md:pb-14">
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(currentLoc.address)}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-[#2d1a0a] text-white py-5 rounded-3xl text-xs font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-[#8b6914] hover:shadow-2xl hover:shadow-[#8b6914]/20 transition-all duration-500 group/btn"
                >
                  <ExternalLink size={16} className="group-hover/btn:rotate-12 transition-transform" />
                  Abrir enlace en Maps
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Links Card */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {settings.phones.map((phone, i) => (
            <a 
              key={i}
              href={phone.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-8 p-10 bg-white border border-black/5 rounded-[40px] hover:border-[#d4af37]/40 hover:shadow-2xl hover:shadow-black/5 transition-all duration-500"
            >
              <div className="w-20 h-20 rounded-3xl bg-[#d4af37]/5 flex items-center justify-center group-hover:bg-[#d4af37] transition-all duration-500 shadow-sm">
                <Phone size={28} className="text-[#8b6914] group-hover:text-white transition-colors" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#8b6914] mb-2">{phone.label}</p>
                <div className="flex justify-between items-center">
                  <p className="text-2xl font-serif text-[#2d1a0a]">{phone.number}</p>
                  <ChevronRight size={24} className="text-[#d4af37] opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Locations;
