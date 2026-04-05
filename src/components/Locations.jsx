import React, { useState } from 'react';
import { MapPin, Phone, Clock, ExternalLink, ChevronRight, Navigation } from 'lucide-react';
import { settings } from '../data/settings';

function Locations() {
  const [activeTab, setActiveTab] = useState(0);
  const currentLoc = settings.locations[activeTab];

  return (
    <section id="ubicaciones" className="py-24 bg-[#fcfaf7] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gold/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-accent/5 blur-[100px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Centered Header - Fixed Spacing */}
        <div className="text-center mb-16 pt-10">
          <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-gold mb-4 block">Experiencia Berakah</span>
          <h2 className="text-5xl md:text-7xl font-serif text-accent mb-8 italic">Nuestras Ubicaciones</h2>
          <p className="text-lg md:text-xl text-accent/70 max-w-2xl mx-auto font-light leading-relaxed">
            Espacios diseñados para vivir la experiencia Berakah. Encuéntranos en el corazón de la Ciudad de México.
          </p>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-12" />
        </div>

        {/* Tab Selector - Better Centering & Contrast */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex p-1.5 bg-white rounded-full shadow-lg border border-black/5">
            {settings.locations.map((loc, index) => (
              <button
                key={loc.id}
                onClick={() => setActiveTab(index)}
                className={`px-8 py-3 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all duration-500 ${
                  activeTab === index 
                  ? 'bg-accent text-white shadow-md' 
                  : 'text-accent/40 hover:text-accent hover:bg-black/5'
                }`}
              >
                {loc.name.replace('Sucursal ', '')}
              </button>
            ))}
          </div>
        </div>

        {/* Improved Side-by-Side Layout */}
        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-0 rounded-[40px] overflow-hidden bg-white shadow-2xl border border-black/5">
          
          {/* Info Side (40%) */}
          <div className="lg:col-span-2 p-12 md:p-16 flex flex-col justify-between border-r border-black/5">
            <div>
              <div className="flex items-center gap-3 mb-10 text-gold">
                <Navigation size={18} />
                <span className="text-[9px] uppercase tracking-[0.3em] font-black"> Boutique Oficial </span>
              </div>
              
              <h3 className="text-4xl font-serif text-accent mb-12 leading-tight tracking-tight">
                {currentLoc.name}
              </h3>
              
              <div className="space-y-12">
                <div className="flex gap-8 group">
                  <div className="w-14 h-14 rounded-2xl bg-[#f8f5f0] flex items-center justify-center flex-shrink-0 group-hover:bg-accent group-hover:text-white transition-all duration-500 shadow-sm border border-black/5">
                    <MapPin size={22} className="text-gold group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.4em] font-black text-gold mb-3 opacity-60">Dirección</p>
                    <p className="text-accent font-medium leading-relaxed uppercase text-sm tracking-wide">
                      {currentLoc.address}
                    </p>
                  </div>
                </div>

                <div className="flex gap-8 group">
                  <div className="w-14 h-14 rounded-2xl bg-[#f8f5f0] flex items-center justify-center flex-shrink-0 group-hover:bg-accent group-hover:text-white transition-all duration-500 shadow-sm border border-black/5">
                    <Clock size={22} className="text-gold group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.4em] font-black text-gold mb-3 opacity-60">Horario de Atención</p>
                    <p className="text-accent font-medium text-sm tracking-wide">
                      {currentLoc.schedule}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16">
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(currentLoc.address)}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-4 bg-accent text-white py-5 px-8 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-gold transition-all duration-500 shadow-lg hover:shadow-gold/30"
              >
                <ExternalLink size={16} className="group-hover:scale-110 transition-transform" />
                Cómo llegar
              </a>
            </div>
          </div>

          {/* Visual Side (60%) */}
          <div className="lg:col-span-3 h-[500px] lg:h-auto flex flex-col">
            {/* Split Image / Map */}
            <div className="h-1/2 relative group overflow-hidden">
               <img 
                src={currentLoc.image} 
                alt={currentLoc.name}
                className="w-full h-full object-cover transition-transform duration-[5s] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-accent/20 transition-opacity group-hover:opacity-0" />
            </div>
            <div className="h-1/2 relative">
              <iframe 
                title={`Mapa ${currentLoc.name}`}
                src={currentLoc.mapIframe}
                className="w-full h-full grayscale-[0.3] hover:grayscale-0 transition-all duration-1000"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Centered Contact Strip */}
        <div className="mt-20 max-w-4xl mx-auto flex flex-col md:flex-row gap-8 items-center justify-center">
          {settings.phones.map((phone, i) => (
            <a 
              key={i}
              href={phone.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-6 group hover:translate-y-[-4px] transition-all duration-500"
            >
              <div className="w-16 h-16 rounded-2xl bg-white border border-black/5 flex items-center justify-center text-gold shadow-lg group-hover:bg-accent group-hover:text-white transition-all duration-700">
                <Phone size={24} />
              </div>
              <div className="text-left">
                <span className="text-[8px] uppercase tracking-[0.5em] font-black text-gold opacity-60">{phone.label}</span>
                <p className="text-2xl font-serif text-accent group-hover:text-gold transition-colors">{phone.number}</p>
              </div>
              <ChevronRight className="text-gold/20 group-hover:text-gold group-hover:translate-x-2 transition-all" size={20} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Locations;
