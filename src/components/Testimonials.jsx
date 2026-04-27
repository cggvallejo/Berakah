import React from 'react';
import { Star, Quote } from 'lucide-react';
import { settings } from '../data/settings';

function Testimonials() {
  return (
    <section id="resenas" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <span className="text-[10px] uppercase tracking-[0.6em] font-bold text-gold mb-6 block">Experiencias Reales</span>
          <h2 className="text-5xl md:text-7xl font-serif text-accent mb-6 italic">Lo que dicen nuestros clientes</h2>
          <div className="w-24 h-[1px] bg-gold mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {settings.testimonials.map((item) => (
            <div key={item.id} className="bg-[#fdfcf8] p-10 rounded-[32px] border border-accent/5 shadow-sm hover:shadow-md transition-all duration-500 relative group">
              <Quote className="absolute top-8 right-8 text-gold/10 group-hover:text-gold/20 transition-colors" size={40} />
              
              <div className="flex mb-6">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} size={14} className="text-gold fill-gold" />
                ))}
              </div>

              <p className="text-accent/80 italic mb-8 leading-relaxed">
                "{item.review}"
              </p>

              <div className="flex items-center justify-between mt-auto border-t border-accent/5 pt-6">
                <span className="font-serif text-accent font-bold">{item.name}</span>
                <span className="text-[10px] uppercase tracking-widest text-accent/40">{item.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
