import React from 'react';
import { Leaf, Scissors, Sparkles, Hand } from 'lucide-react';

function ProcessStrip() {
  const steps = [
    {
      icon: <Hand />,
      title: "Legado Artesanal",
      desc: "Cada pieza es tejida por manos mexicanas expertas, preservando técnicas ancestrales de tejido en yute."
    },
    {
      icon: <Leaf />,
      title: "Fibra Sustentable",
      desc: "Utilizamos yute de la más alta calidad, seleccionado por su resistencia y huella ecológica mínima."
    },
    {
      icon: <Scissors />,
      title: "Corte Maestro",
      desc: "Precisión quirúrgica en cada patronaje para asegurar siluetas contemporáneas y duraderas."
    },
    {
      icon: <Sparkles />,
      title: "Detalle Premium",
      desc: "Herrajes y forros de lujo que elevan lo rústico a una pieza de alta costura artesanal."
    }
  ];

  return (
    <section id="process" className="bg-[#fdfcf8] py-32 relative overflow-hidden">
      {/* Subtle Divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-accent/20 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.5em] font-black text-gold mb-6 block drop-shadow-sm">Nuestro Compromiso</span>
          <h2 className="text-4xl md:text-7xl font-serif text-accent mb-8 italic leading-tight">La Maestría del Yute</h2>
          <p className="text-accent/60 text-lg md:text-xl font-light leading-relaxed italic">
            "Donde la paciencia de la naturaleza encuentra la precisión del maestro artesano."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="group relative bg-white p-12 rounded-[40px] border border-accent/5 shadow-premium hover:shadow-premium-lg hover:translate-y-[-10px] transition-all duration-1000">
              <div className="w-20 h-20 rounded-3xl bg-sand/20 flex items-center justify-center text-accent mb-10 group-hover:bg-accent group-hover:text-white transition-all duration-700 shadow-inner">
                {React.cloneElement(step.icon, { size: 28, strokeWidth: 1.2 })}
              </div>
              
              <h3 className="text-2xl mb-6 font-serif italic text-accent group-hover:text-gold transition-colors duration-500">
                {step.title}
              </h3>
              
              <p className="text-[13px] leading-loose text-accent/60 font-light tracking-wide group-hover:text-accent transition-colors duration-500">
                {step.desc}
              </p>

              {/* Decorative Number */}
              <span className="absolute top-8 right-10 text-5xl font-serif italic opacity-5 text-accent group-hover:opacity-10 transition-opacity">
                0{idx + 1}
              </span>
              
              {/* Animated Corner Layer */}
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-gold/5 rounded-tl-[100%] opacity-0 group-hover:opacity-100 transition-all duration-1000 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProcessStrip;
