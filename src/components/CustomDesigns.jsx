import React from 'react';
import { Sparkles, Palette, MapPin, User, ArrowRight, Heart, Crown } from 'lucide-react';

const customDesigns = [
  {
    title: "Esencia de Chiapas",
    person: "Claudia",
    location: "San Cristóbal",
    image: "/images/custom/1.png",
    type: "Bolsa Bordada",
    size: "large"
  },
  {
    title: "Tradición Yucateca",
    person: "Mauricio",
    location: "Mérida",
    image: "/images/custom/2.png",
    type: "Bolsa de Gala",
    size: "medium"
  },
  {
    title: "Brisa de Nayarit",
    person: "Lorena",
    location: "Sayulita",
    image: "/images/custom/3.png",
    type: "Bolsa de Yute",
    size: "small"
  },
  {
    title: "Mística Oaxaqueña",
    person: "Roberto",
    location: "Monte Albán",
    image: "/images/custom/4.png",
    type: "Cesta de Lujo",
    size: "small"
  },
  {
    title: "Alma de Jalisco",
    person: "Sofía",
    location: "Tlaquepaque",
    image: "/images/custom/5.png",
    type: "Bolsa Premium",
    size: "large"
  },
  {
    title: "Sol de Sonora",
    person: "Gabriel",
    location: "Hermosillo",
    image: "/images/custom/6.png",
    type: "Monedero",
    size: "small"
  },
  {
    title: "Encanto Veracruzano",
    person: "Isabella",
    location: "Tlacotalpan",
    image: "/images/custom/7.png",
    type: "Bolsa Artesanal",
    size: "medium"
  },
  {
    title: "Raíces de Zacatecas",
    person: "Fernando",
    location: "Jerez",
    image: "/images/custom/8.png",
    type: "Bolsa de Mano",
    size: "small"
  },
  {
    title: "Vibras de Tulum",
    person: "Daniela",
    location: "Quintana Roo",
    image: "/images/custom/9.png",
    type: "Bolsa de Playa Luxe",
    size: "small"
  },
  {
    title: "Puebla - Talavera Real",
    person: "Andrés",
    location: "Cholula",
    image: "/images/custom/10.png",
    type: "Bolsa Personalizada",
    size: "medium"
  },
  {
    title: "Cielo de Querétaro",
    person: "Paola",
    location: "Peña de Bernal",
    image: "/images/custom/11.png",
    type: "Monedero",
    size: "small"
  },
  {
    title: "Guanajuato - Callejón del Beso",
    person: "Mateo",
    location: "San Miguel",
    image: "/images/custom/12.png",
    type: "Bolsa Romántica",
    size: "small"
  },
  {
    title: "Baja - Azul Profundo",
    person: "Valentina",
    location: "Los Cabos",
    image: "/images/custom/13.png",
    type: "Bolsa de Viaje",
    size: "large"
  },
  {
    title: "Michoacán - Mariposa Monarca",
    person: "Leonardo",
    location: "Pátzcuaro",
    image: "/images/custom/14.png",
    type: "Bolsa Temática",
    size: "small"
  },
  {
    title: "Colores de Campeche",
    person: "Regina",
    location: "Edzná",
    image: "/images/custom/15.png",
    type: "Bolsa Típica",
    size: "medium"
  },
  {
    title: "Tabasco - Selva Viva",
    person: "Hugo",
    location: "Villahermosa",
    image: "/images/custom/16.png",
    type: "Bolsa Ecológica",
    size: "small"
  },
  {
    title: "Durango - Alacrán de Oro",
    person: "Natalia",
    location: "Mapimí",
    image: "/images/custom/17.png",
    type: "Bolsa de Colección",
    size: "small"
  }
];

function CustomDesigns() {
  return (
    <section id="personalizados" className="py-24 bg-[#FCFAFA] relative overflow-hidden">
      {/* Decorative Ornaments */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-24">

          <h2 className="text-6xl md:text-8xl font-serif text-accent mb-10 italic leading-tight">Diseños Únicos</h2>
          <p className="text-xl md:text-2xl text-accent/60 max-w-3xl mx-auto font-light leading-relaxed mb-12">
            Cada pieza es una narrativa tejida a mano. Transformamos tus visiones en legados portátiles de elegancia mexicana.
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="w-16 h-[1px] bg-gold/30" />
            <span className="text-gold font-serif italic text-lg">Hecho a tu medida</span>
            <div className="w-16 h-[1px] bg-gold/30" />
          </div>
        </div>

        {/* Uniform Catalog Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {customDesigns.map((item, index) => (
            <div 
              key={index} 
              className="group relative rounded-[40px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-1000 border border-black/5 bg-white aspect-square flex items-center justify-center p-4"
            >
              {/* Image Container */}
              <div className="w-full h-full relative z-0 flex items-center justify-center">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="max-w-full max-h-full object-contain transition-transform duration-1000 group-hover:scale-110"
                />
              </div>
              
              {/* Content Overlay (Optional: only on hover or removed as requested) */}
              <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              {/* Minimalist Indicator */}
              <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-accent text-white opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center translate-y-2 group-hover:translate-y-0">
                <ArrowRight size={18} />
              </div>

              {/* Glass Inner Border */}
              <div className="absolute inset-4 border border-accent/0 group-hover:border-accent/10 rounded-[30px] transition-all duration-700 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Custom CTA Section */}
        <div className="mt-32">
          <div className="relative rounded-[60px] bg-accent overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-gold/10 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/5 rounded-full blur-[100px]" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-16 p-12 md:p-24">
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-3 mb-8 px-6 py-2 rounded-full bg-white/5 border border-white/10">
                  <Palette className="text-gold" size={16} />
                  <span className="text-[10px] uppercase tracking-[0.3em] font-black text-white">Tu Visión, Nuestra Arte</span>
                </div>
                <h3 className="text-4xl md:text-7xl font-serif text-white mb-8 italic leading-tight">
                  Taller de <span className="text-gold">Sueños</span> Artesanales
                </h3>
                <p className="text-white/60 text-lg md:text-xl max-w-2xl mb-12 font-light leading-relaxed">
                  Colabora directamente con nuestros maestros artesanos para crear una pieza que capture tu esencia. Lugares, nombres, símbolos o momentos memorables.
                </p>
                <div className="flex flex-wrap gap-6 justify-center md:justify-start">
                  <a 
                    href="https://wa.me/525573945771"
                    target="_blank"
                    className="group flex items-center gap-6 bg-gold hover:bg-white text-accent py-6 px-12 rounded-full text-xs font-black uppercase tracking-[0.3em] transition-all duration-700 shadow-2xl hover:shadow-gold/40"
                  >
                    <span>Iniciar Personalización</span>
                    <ArrowRight size={20} className="group-hover:translate-x-3 transition-transform duration-500" />
                  </a>
                  <div className="flex -space-x-4">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="w-14 h-14 rounded-full border-4 border-accent bg-gold/20 backdrop-blur-sm flex items-center justify-center">
                        <User size={20} className="text-gold" />
                      </div>
                    ))}
                    <div className="flex items-center ml-8 text-white/40 text-xs tracking-widest uppercase font-bold">
                      +500 Diseños Únicos
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative w-full md:w-[400px] aspect-square rounded-[40px] overflow-hidden border border-white/10 shadow-2xl group-hover:scale-105 transition-transform duration-1000">
                <img 
                  src="/images/custom/1.png" 
                  alt="Personalización"
                  className="w-full h-full object-contain bg-white"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-accent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 text-center bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <p className="text-gold text-xs font-black uppercase tracking-widest mb-1">Muestra de Taller</p>
                  <p className="text-white font-serif italic text-lg line-clamp-1">"La magia está en los detalles"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CustomDesigns;
