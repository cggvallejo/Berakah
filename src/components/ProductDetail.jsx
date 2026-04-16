import React, { useEffect } from 'react';
import { X, ShoppingBag, MapPin, User, Palette, CheckCircle2, ChevronRight } from 'lucide-react';

function ProductDetail({ product, onClose, onAddToCart }) {
  // Manejar cierre con ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-accent/40 backdrop-blur-xl transition-opacity duration-500 animate-in fade-in"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-6xl bg-white rounded-[40px] md:rounded-[60px] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[95vh] md:h-auto md:min-h-[600px] md:max-h-[800px] animate-in slide-in-from-bottom-12 duration-700">
        
        {/* Close Button Mobile */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-50 md:hidden w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20"
        >
          <X size={20} />
        </button>

        {/* Left: Image Side */}
        <div className="w-full md:w-1/2 h-64 md:h-full relative bg-bg overflow-hidden group">
          {/* Logo Crop wrapper */}
          <div className="w-full h-full p-8 md:p-12 flex items-center justify-center bg-white relative">
             <div className="w-full h-full relative no-logo-crop flex items-center justify-center">
                <img 
                  src={product.image} 
                  alt={product.title || product.name}
                  className="max-w-full max-h-full object-contain transition-transform duration-[2s] group-hover:scale-110"
                />
             </div>
             
             {/* Decorative brand tag */}
             <div className="absolute bottom-12 left-12 flex items-center gap-2 opacity-50">
                <span className="text-[11px] uppercase tracking-[0.4em] font-black text-accent/60">Berakah Premium</span>
             </div>
          </div>
        </div>

        {/* Right: Content Side */}
        <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col overflow-y-auto custom-scrollbar bg-white">
          <div className="flex-1">
            {/* Header Info */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-gold flex items-center gap-1.5 font-bold uppercase tracking-[0.2em] text-[10px]">
                <Palette size={12} />
                Artesanía de lujo
              </span>
              <div className="w-12 h-[1px] bg-gold/30" />
            </div>

            <h2 className="text-3xl md:text-5xl font-serif text-accent mb-8 italic leading-[1.1]">
              {product.title || product.name}
            </h2>

            <div className="flex flex-wrap gap-6 mb-10 pb-10 border-b border-accent/5">
              {product.person && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/5 flex items-center justify-center text-accent">
                    <User size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-accent/40 font-bold mb-0.5">Artesano</p>
                    <p className="text-sm font-medium text-accent">{product.person}</p>
                  </div>
                </div>
              )}
              {product.location && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/5 flex items-center justify-center text-accent">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-accent/40 font-bold mb-0.5">Origen</p>
                    <p className="text-sm font-medium text-accent">{product.location}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="space-y-6 mb-12">
              <p className="text-lg md:text-xl text-accent/60 font-light leading-relaxed">
                {product.description || "Una pieza narrativa que captura la esencia vibrante de México. Tejida con fibras naturales y acabados de alta gama, diseñada para perdurar por generaciones."}
              </p>
              
              <ul className="grid grid-cols-1 gap-4">
                {[
                  "Fibras de Jute Premium seleccionadas",
                  "Bordado a mano con hilos sedosos",
                  "Herrajes bañados en oro de 14k",
                  "Interior forrado en lino italiano"
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-accent/80">
                    <CheckCircle2 size={16} className="text-gold" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="space-y-8 mt-auto pt-8 border-t border-accent/5">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-accent/40 font-bold mb-2">Inversión de Lujo</p>
                <div className="flex items-baseline gap-4">
                  <p className="text-3xl md:text-4xl font-serif text-accent leading-none">
                    {product.price > 0 ? `$${product.price}.00` : "Consultar Precio"}
                  </p>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-700 text-[9px] font-bold uppercase tracking-widest border border-green-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    Disponible
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => {
                   if (product.price > 0 && onAddToCart) {
                     onAddToCart(product);
                   } else {
                     window.open("https://wa.me/525573945771", "_blank");
                   }
                }}
                className="flex-1 group flex items-center justify-center gap-4 bg-accent hover:bg-gold text-white py-5 md:py-6 rounded-full text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-500 shadow-xl hover:shadow-gold/20 active:scale-95"
              >
                <ShoppingBag size={18} />
                <span>{product.price > 0 ? "Añadir a la Bolsa" : "Solicitar a Medida"}</span>
              </button>
              
              <button 
                onClick={onClose}
                className="hidden md:flex px-10 items-center justify-center text-[10px] font-black uppercase tracking-[0.3em] text-accent/40 hover:text-accent transition-colors border border-accent/10 rounded-full hover:bg-accent/5"
              >
                Cerrar
              </button>
            </div>
            
            <p className="text-center text-[9px] text-accent/20 font-bold uppercase tracking-[0.3em] pb-4">
              Envío de cortesía a todo el mundo · Seguro incluido
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
