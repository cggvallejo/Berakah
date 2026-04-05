import React from 'react';
import { MapPin, Phone, Clock, ExternalLink, ChevronRight } from 'lucide-react';
import { settings } from '../data/settings';

function Locations() {
  return (
    <section id="ubicaciones" className="py-28 bg-[#fcfaf7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-serif text-[#2d1a0a] mb-6 italic">Nuestras Casas</h2>
          <p className="text-lg text-[#2d1a0a]/60 max-w-xl mx-auto font-light leading-relaxed">
            Espacios diseñados para vivir la experiencia Berakah. Encuéntranos en el corazón de la Ciudad de México.
          </p>
          <div className="w-16 h-[1px] bg-[#d4af37] mx-auto mt-10" />
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {settings.locations.map((loc) => (
            <div key={loc.id} className="group bg-white rounded-[40px] overflow-hidden shadow-xl shadow-black/5 border border-black/5 flex flex-col hover:shadow-2xl transition-all duration-500">
              {/* Visual Side */}
              <div className="relative h-[300px] md:h-[400px] overflow-hidden">
                <div className="absolute inset-0 bg-black/10 z-10 group-hover:bg-black/0 transition-all duration-700" />
                <img
                  src={loc.image}
                  alt={loc.name}
                  className="w-full h-full object-cover transition-transform duration-[3s] scale-110 group-hover:scale-100"
                />

                {/* Overlay Label */}
                <div className="absolute bottom-6 left-6 z-20">
                  <span className="bg-white/90 backdrop-blur-md px-5 py-2 rounded-full text-[10px] uppercase tracking-[0.3em] font-bold text-[#2d1a0a] shadow-lg">
                    {loc.name.replace('Sucursal ', '')}
                  </span>
                </div>
              </div>

              {/* Info & Map Side */}
              <div className="flex flex-col flex-1 p-8 md:p-12">
                <h3 className="text-3xl font-serif text-[#2d1a0a] mb-8">{loc.name}</h3>

                <div className="space-y-6 mb-10">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#f8f5f0] flex items-center justify-center flex-shrink-0 border border-black/5 mt-1">
                      <MapPin size={18} className="text-[#8b6914]" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest font-bold text-[#8b6914] mb-1">Dirección</p>
                      <p className="text-[#2d1a0a] leading-relaxed uppercase text-xs font-medium tracking-wider">{loc.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#f8f5f0] flex items-center justify-center flex-shrink-0 border border-black/5 mt-1">
                      <Clock size={18} className="text-[#8b6914]" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest font-bold text-[#8b6914] mb-1">Horario</p>
                      <p className="text-[#2d1a0a] text-xs font-medium tracking-wider">{loc.schedule}</p>
                    </div>
                  </div>
                </div>

                <div className="h-[200px] rounded-[24px] overflow-hidden border border-black/5 shadow-inner bg-[#f8f5f0] mb-8">
                  <iframe 
                    title={`Mapa ${loc.name}`}
                    src={loc.mapIframe}
                    className="w-full h-full grayscale-[0.3] contrast-[1.1] hover:grayscale-0 transition-all duration-700"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                  />
                </div>

                <div className="mt-auto">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#2d1a0a] text-white py-4 rounded-2xl text-xs font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-[#8b6914] hover:shadow-xl hover:shadow-[#8b6914]/20 transition-all duration-500 group/btn"
                  >
                    <ExternalLink size={16} className="group-hover/btn:rotate-12 transition-transform" />
                    Abrir enlace en Maps
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Links Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {settings.phones.map((phone, i) => (
            <a 
              key={i}
              href={phone.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-6 p-8 bg-white border border-black/5 rounded-[32px] hover:border-[#d4af37]/40 hover:shadow-xl hover:shadow-black/5 transition-all duration-500"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#d4af37]/5 flex items-center justify-center group-hover:bg-[#d4af37] transition-all duration-500 shadow-sm flex-shrink-0">
                <Phone size={24} className="text-[#8b6914] group-hover:text-white transition-colors" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#8b6914] mb-1">{phone.label}</p>
                <div className="flex justify-between items-center">
                  <p className="text-xl md:text-2xl font-serif text-[#2d1a0a]">{phone.number}</p>
                  <ChevronRight size={20} className="text-[#d4af37] opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500" />
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
