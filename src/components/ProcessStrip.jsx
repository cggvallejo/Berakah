import React from 'react';
import { Leaf, Scissors, Sparkles, Hand } from 'lucide-react';

function ProcessStrip() {
  const steps = [
    {
      icon: <Leaf />,
      title: "Cosecha Ética",
      desc: "Fibra de yute natural seleccionada a mano bajo estándares sustentables."
    },
    {
      icon: <Scissors />,
      title: "Hileado Tradicional",
      desc: "Procesos que preservan la resistencia y textura orgánica de la fibra."
    },
    {
      icon: <Hand />,
      title: "Tejido Maestro",
      desc: "Cada pieza es tejida por manos mexicanas expertas en técnica ancestral."
    },
    {
      icon: <Sparkles />,
      title: "Acabado de Lujo",
      desc: "Detalles premium y forrado artesanal para una durabilidad eterna."
    }
  ];

  return (
    <section id="process" className="bg-[#f8f4ed] py-24 md:py-32">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4">El Arte de la Creación</h2>
          <div className="w-24 h-1 bg-gold mx-auto mb-6 opacity-30" />
          <p className="text-accent/80 max-w-2xl mx-auto italic font-light">
            Nuestro proceso respeta el tiempo de la naturaleza y la sabiduría del artesano.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-12">
          {steps.map((step, idx) => (
            <div key={idx} className="group relative text-center p-8 transition-transform duration-700 hover:-translate-y-4">
              <div className="w-20 h-20 mx-auto rounded-full bg-white flex items-center justify-center text-accent mb-6 premium-shadow group-hover:bg-accent group-hover:text-white transition-all duration-500">
                {React.cloneElement(step.icon, { size: 32, strokeWidth: 1 })}
              </div>
              <h3 className="text-xl mb-4 font-semibold tracking-tighter">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-accent/80 font-light transition-colors duration-300">
                {step.desc}
              </p>
              
              {/* Connector line for large screens */}
              {idx < 3 && (
                <div className="hidden lg:block absolute top-1/2 -right-6 w-12 h-[1px] bg-accent/10" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProcessStrip;
