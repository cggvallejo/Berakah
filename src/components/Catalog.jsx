import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import { products as defaultProducts } from '../data/products';
import ProductCard from './ProductCard';

const STORAGE_KEY = 'berakah_products_override';
const CATEGORIES = ["Todos", "Bandoleras", "Bolsas", "Mochilas", "Portacelulares", "Esenciales"];

// Leer productos con cambios del admin (localStorage) o usar los originales
function loadProducts() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultProducts;
  } catch {
    return defaultProducts;
  }
}

function Catalog({ onAddToCart }) {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [products, setProducts] = useState(loadProducts);

  // Recargar si el localStorage cambia (cuando se vuelve del panel admin)
  useEffect(() => {
    const handleFocus = () => setProducts(loadProducts());
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const sectionRef = useRef(null);

  useEffect(() => {
    // Animación de entrada de la sección
    gsap.to(sectionRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 85%',
      }
    });

    // Staggered reveal for cards with more elegant easing and stagger times
    const cards = sectionRef.current.querySelectorAll('.product-card');
    gsap.fromTo(cards, 
      { opacity: 0, y: 40 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.premium-grid',
          start: 'top 85%',
        }
      }
    );
  }, [activeCategory]); // Re-run when category changes to animate new items

  const filteredProducts = activeCategory === "Todos" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <section id="catalog" className="py-24 md:py-32 bg-transparent opacity-0 translate-y-10" ref={sectionRef}>
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-md">
            <h2 className="text-5xl mb-4">Nuestra Selección</h2>
            <p className="text-sm font-light text-accent/60 italic">
               Cada pieza cuenta una historia de manos mexicanas dedicadas a la maestría artesanal del yute.
            </p>
          </div>
          
          <div className="premium-filter-container no-scrollbar">
            {CATEGORIES.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="premium-grid">
          {filteredProducts.slice(0, 32).map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAdd={onAddToCart} 
            />
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
           <div className="text-center py-20 opacity-30 italic">
              Sin productos por el momento en esta categoría.
           </div>
        )}
      </div>
    </section>
  );
}

export default Catalog;
