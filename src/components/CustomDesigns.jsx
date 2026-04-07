import React from 'react';
import { Sparkles, Palette, MapPin, User, ArrowRight } from 'lucide-react';

const customDesigns = [
  {
    title: "Oaxaca - Tradición Viva",
    person: "Elena",
    location: "Oaxaca",
    image: "images/custom/oaxaca_elena.png",
    type: "Bolsa de Yute"
  },
  {
    title: "Pátzcuaro - Alma Michoacana",
    person: "Sofía",
    location: "Michoacán",
    image: "images/custom/patzcuaro_sofia.png",
    type: "Bolsa de Yute"
  },
  {
    title: "Tepic - Arte Huichol",
    person: "Alejandro",
    location: "Nayarit",
    image: "images/custom/tepic_alejandro.png",
    type: "Bolsa de Yute"
  },
  {
    title: "Tulum - Brisa del Caribe",
    person: "Isabella",
    location: "Quintana Roo",
    image: "images/custom/tulum_isabella.png",
    type: "Bolsa de Yute"
  },
  {
    title: "Hidalgo - Magia Otomí",
    person: "Mateo",
    location: "Hidalgo",
    image: "images/custom/hidalgo_mateo.png",
    type: "Bolsa de Yute"
  },
  {
    title: "México - Corazón Azteca",
    person: "Santiago",
    location: "CDMX",
    image: "images/custom/mexico_santiago.png",
    type: "Bolsa de Yute"
  },
  {
    title: "Michoacán - Monarca",
    person: "Valeria",
    location: "Michoacán",
    image: "images/custom/michoacan_valeria.png",
    type: "Bolsa de Yute"
  },
  {
    title: "Jalisco - Esencia de Agave",
    person: "Juan",
    location: "Jalisco",
    image: "images/custom/jalisco_juan.png",
    type: "Bolsa de Yute"
  },
  {
    title: "Cancún - Paraíso Tropical",
    person: "Camila",
    location: "Quintana Roo",
    image: "images/custom/cancun_camila.png",
    type: "Bolsa de Yute"
  },
  {
    title: "San Cristóbal - Color Ancestral",
    person: "Miguel",
    location: "Chiapas",
    image: "images/custom/sancristobal_miguel.png",
    type: "Bolsa de Yute"
  },
  {
    title: "Taxco - Brillo de Plata",
    person: "Ana",
    location: "Guerrero",
    image: "images/custom/monedero_taxco_ana.png",
    type: "Monedero"
  },
  {
    title: "Mérida - Geometría Maya",
    person: "Pablo",
    location: "Yucatán",
    image: "images/custom/monedero_merida_pablo.png",
    type: "Monedero"
  },
  {
    title: "Guanajuato - Callejón del Beso",
    person: "Rosa",
    location: "Guanajuato",
    image: "images/custom/monedero_guanajuato_rosa.png",
    type: "Monedero"
  },
  {
    title: "Puerto Vallarta - Atardecer Dorado",
    person: "Oscar",
    location: "Jalisco",
    image: "images/custom/portacelular_vallarta_oscar.png",
    type: "Porta Celular"
  },
  {
    title: "Cholula - Color de Talavera",
    person: "Fer",
    location: "Puebla",
    image: "images/custom/portacelular_cholula_fer.png",
    type: "Porta Celular"
  },
  {
    title: "Izamal - La Ciudad Amarilla",
    person: "Luis",
    location: "Yucatán",
    image: "images/custom/portacelular_izamal_luis.png",
    type: "Porta Celular"
  }
];

function CustomDesigns() {
  return (
    <section id="personalizados" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Ornaments */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20">
            <Sparkles size={14} className="text-gold" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-black text-gold">Ediciones Coleccionables</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-serif text-accent mb-8 italic">Diseños Personalizados</h2>
          <p className="text-lg md:text-xl text-accent/70 max-w-2xl mx-auto font-light leading-relaxed">
            Creamos piezas únicas que narran tu historia. Cada bolsa, monedero y porta celular es una obra de arte artesanal hecha a tu medida.
          </p>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-12" />
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {customDesigns.map((item, index) => (
            <div 
              key={index} 
              className="group relative h-[450px] rounded-[32px] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700 bg-[#f8f5f0] border border-black/5"
            >
              {/* Image */}
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              
              {/* Premium Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-accent via-accent/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
              
              {/* Type Badge */}
              <div className="absolute top-6 left-6 z-20">
                <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[9px] uppercase tracking-widest font-black text-accent shadow-sm">
                  {item.type}
                </span>
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 z-20">
                <div className="flex items-center gap-2 text-gold/80 mb-2">
                  <MapPin size={12} />
                  <span className="text-[10px] uppercase tracking-widest font-bold">{item.location}</span>
                </div>
                
                <h3 className="text-2xl font-serif text-white mb-4 leading-tight opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {item.title}
                </h3>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                  <div className="flex items-center gap-2">
                    <User size={14} className="text-gold" />
                    <span className="text-[11px] text-white/90 font-medium">Cliente: <span className="font-bold">{item.person}</span></span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-white backdrop-blur-sm group-hover:bg-gold transition-colors duration-500">
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>

              {/* Border interaction effect */}
              <div className="absolute inset-0 border-[0px] group-hover:border-[12px] border-white/10 transition-all duration-500 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <div className="p-12 md:p-16 rounded-[48px] bg-accent relative overflow-hidden shadow-2xl group">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/20 rounded-full translate-x-1/3 -translate-y-1/3 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/3 translate-y-1/3 blur-3xl" />
            
            <div className="relative z-10 flex flex-col items-center">
              <Palette className="text-gold mb-8 animate-pulse" size={48} />
              <h3 className="text-3xl md:text-5xl font-serif text-white mb-6 italic">¿Tienes una idea en mente?</h3>
              <p className="text-white/70 text-lg md:text-xl max-w-xl mb-12 font-light leading-relaxed">
                Nuestros artesanos pueden capturar cualquier nombre, lugar o símbolo en tu pieza Berakah. El límite es tu imaginación.
              </p>
              
              <a 
                href="https://wa.me/5215512345678" // Placeholder WhatsApp
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 bg-gold hover:bg-white text-accent py-6 px-12 rounded-2xl text-xs md:text-sm font-black uppercase tracking-[0.3em] transition-all duration-500 shadow-xl hover:shadow-gold/40"
              >
                <span>Solicitar Diseño Personalizado</span>
                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CustomDesigns;
