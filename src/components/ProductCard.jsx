import React from 'react';
import { ShoppingBag, Eye, Heart } from 'lucide-react';

function ProductCard({ product, onAdd }) {
  return (
    <div className="group relative flex flex-col bg-white overflow-hidden transition-all duration-700">
      {/* Container de Imagen con Aspecto Editorial */}
      <div className="relative aspect-[4/5] bg-bg overflow-hidden premium-shadow rounded-[32px] transition-all duration-700 group-hover:shadow-2xl">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-[1.5s] ease-premium group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Overlay Minimalista (Aparece en Hover) */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-700" />
        
        {/* Acciones Rápidas Flotantes */}
        <div className="absolute bottom-6 right-6 flex flex-col gap-3 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-700 ease-premium">
          <button 
            onClick={() => onAdd(product)}
            className="bg-white/95 backdrop-blur-sm text-accent w-11 h-11 rounded-full flex items-center justify-center hover:bg-gold hover:text-white transition-all duration-300 shadow-xl border border-accent/5 focus:scale-95"
            title="Añadir a la bolsa"
          >
            <ShoppingBag size={18} strokeWidth={1.5} />
          </button>
          <button className="bg-white/95 backdrop-blur-sm text-accent w-9 h-9 rounded-full flex items-center justify-center hover:bg-white transition-all shadow-lg border border-accent/5 opacity-80 hover:opacity-100">
             <Eye size={14} strokeWidth={1.5} />
          </button>
        </div>

        {/* Badge Sutil */}
        {product.price > 1500 && (
          <div className="absolute top-6 left-6">
             <span className="bg-accent/90 backdrop-blur-sm text-white text-[8px] uppercase tracking-[0.3em] px-4 py-1.5 font-bold rounded-full">
               Elite Selection
             </span>
          </div>
        )}
      </div>

      {/* Información del Producto: Menos es más */}
      <div className="mt-5 text-left space-y-1 pr-2">
        <p className="text-[9px] uppercase tracking-[0.3em] font-semibold text-gold/80 mb-1">
          {product.category}
        </p>
        
        <div className="flex justify-between items-start gap-4">
          <h3 className="text-sm font-serif leading-tight text-accent transition-colors duration-500 group-hover:text-gold line-clamp-1 flex-1">
            {product.name}
          </h3>
          <span className="text-sm font-sans font-medium text-accent/90 whitespace-nowrap">
            ${product.price.toLocaleString()}
          </span>
        </div>
        
        <p className="text-[10px] text-accent/70 font-light italic truncate">
          {product.description}
        </p>
      </div>

      {/* Indicador de Línea Premium */}
      <div className="mt-4 w-full h-[0.5px] bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
    </div>
  );
}

export default ProductCard;
