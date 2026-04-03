import React from 'react';
import { MapPin, Phone, Clock, ExternalLink } from 'lucide-react';
import { settings } from '../data/settings';

function Locations() {
  return (
    <section id="ubicaciones" className="py-24 bg-[#fcfaf7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-[#2d1a0a] mb-6">Nuestras Ubicaciones</h2>
          <p className="text-lg text-[#2d1a0a]/60 max-w-2xl mx-auto font-light leading-relaxed">
            Visítanos en nuestras sucursales del centro histórico de la Ciudad de México y descubre la calidad artesanal de Berakah.
          </p>
          <div className="w-24 h-1 bg-[#d4af37]/40 mx-auto mt-8" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {settings.locations.map((loc) => (
            <div key={loc.id} className="group flex flex-col bg-white rounded-[40px] overflow-hidden shadow-2xl shadow-black/5 hover:shadow-black/10 transition-all duration-700 border border-black/5">
              
              {/* Imagen y Mapa */}
              <div className="relative h-[300px] md:h-[400px] overflow-hidden flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 h-full relative overflow-hidden">
                  <img 
                    src={loc.image} 
                    alt={loc.name}
                    className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&q=80&w=800'; }}
                  />
                  <div className="absolute inset-0 bg-[#2d1a0a]/20 group-hover:bg-transparent transition-all duration-700" />
                </div>
                <div className="w-full md:w-1/2 h-full">
                  <iframe 
                    title={loc.name}
                    src={loc.mapIframe}
                    className="w-full h-full grayscale-[0.2] contrast-[1.1] hover:grayscale-0 transition-all duration-700"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Contenido */}
              <div className="p-10 md:p-12 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-2xl font-serif text-[#2d1a0a] mb-6">{loc.name}</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#f8f5f0] flex items-center justify-center flex-shrink-0">
                        <MapPin size={18} className="text-[#8b6914]" />
                      </div>
                      <p className="text-[#2d1a0a]/80 text-sm leading-relaxed mt-2">{loc.address}</p>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#f8f5f0] flex items-center justify-center flex-shrink-0">
                        <Clock size={18} className="text-[#8b6914]" />
                      </div>
                      <p className="text-[#2d1a0a]/80 text-sm leading-relaxed mt-2">{loc.schedule}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 pt-10 border-t border-black/5 flex flex-wrap gap-4">
                   <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.address)}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#2d1a0a] text-white py-4 rounded-2xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#8b6914] transition-all"
                  >
                    <ExternalLink size={14} />
                    Cómo llegar
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Teléfonos de contacto centralizados */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-6">
          {settings.phones.map((phone, i) => (
            <a 
              key={i}
              href={phone.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-6 p-8 bg-white border border-black/5 rounded-3xl hover:border-[#d4af37]/40 hover:shadow-xl transition-all"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#d4af37]/10 flex items-center justify-center group-hover:bg-[#d4af37] transition-colors">
                <Phone size={24} className="text-[#8b6914] group-hover:text-white" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-[#8b6914] mb-1">{phone.label}</p>
                <p className="text-xl font-medium text-[#2d1a0a]">{phone.number}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Locations;
