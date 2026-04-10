import React from 'react';
import { ShoppingBag, Eye } from 'lucide-react';

function ProductCard({ product, onAdd }) {
  return (
    <div className="group relative flex flex-col bg-white overflow-hidden transition-all duration-700">
      {/* Imagen */}
      <div className="relative aspect-[4/5] bg-bg overflow-hidden premium-shadow rounded-[24px] md:rounded-[32px] transition-all duration-700 group-hover:shadow-2xl">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-[1.5s] scale-[1.12] group-hover:scale-[1.22]"
          style={{ objectPosition: 'center 8%' }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-700" />

        {/* Acciones — en desktop aparecen con hover, en mobile siempre visibles */}
        <div className="product-actions absolute bottom-4 right-4 md:bottom-6 md:right-6 flex flex-col gap-2 md:translate-x-12 md:opacity-0 md:group-hover:translate-x-0 md:group-hover:opacity-100 transition-all duration-700">
          <button
            onClick={() => onAdd(product)}
            className="bg-white/95 backdrop-blur-sm text-accent w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center hover:bg-gold hover:text-white active:scale-90 transition-all duration-300 shadow-xl border border-accent/5"
            title="Añadir a la bolsa"
            aria-label={`Añadir ${product.name} al carrito`}
          >
            <ShoppingBag size={16} strokeWidth={1.5} />
          </button>
        </div>

        {/* Badge Elite */}
        {product.price > 1500 && (
          <div className="absolute top-3 left-3 md:top-6 md:left-6">
            <span className="bg-accent/90 backdrop-blur-sm text-white text-[7px] md:text-[8px] uppercase tracking-[0.3em] px-3 py-1 md:px-4 md:py-1.5 font-bold rounded-full">
              Elite
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="mt-4 md:mt-6 text-left space-y-1.5 md:space-y-2">
        <p className="product-category text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-bold text-gold">
          {product.category}
        </p>
        <div className="flex justify-between items-start gap-3">
          <h3 className="product-name text-sm md:text-base font-serif font-medium leading-tight text-accent group-hover:text-gold transition-colors line-clamp-2 flex-1">
            {product.name}
          </h3>
          <span className="product-price text-sm md:text-base font-sans font-semibold text-accent whitespace-nowrap">
            {product.price > 0 ? `$${product.price.toLocaleString()}` : '-'}
          </span>
        </div>
        <p className="product-desc text-[11px] md:text-xs text-accent/75 font-normal tracking-wide line-clamp-2 hidden sm:block">
          {product.description}
        </p>
      </div>

      <div className="mt-3 w-full h-[0.5px] bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
    </div>
  );
}

export default ProductCard;
