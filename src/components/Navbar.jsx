import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Facebook, Instagram, User } from 'lucide-react';
import BrandLogo from './BrandLogo';
import { settings } from '../data/settings';

function Navbar({ cartCount, openCart }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'glass py-6 premium-shadow' : 'bg-transparent py-10 md:py-14'}`}>
      <div className="w-full px-8 md:px-16 flex justify-between items-center transition-all duration-500">
        <div className="flex gap-10 items-center">
          <button 
            onClick={() => setIsMobileMenuOpen(true)} 
            className="hover:opacity-60 transition-all hover:scale-110 active:scale-95 group"
            aria-label="Cerrar Menú"
          >
            <Menu size={42} strokeWidth={1.5} className="group-hover:rotate-90 transition-transform duration-500" />
          </button>
          
          <div className="hidden lg:flex gap-12 text-[13px] uppercase tracking-[0.4em] font-bold opacity-60">
            <a href="#catalog" className="hover:text-gold hover:opacity-100 transition-all">Colecciones</a>
            <a href="#personalizados" className="hover:text-gold hover:opacity-100 transition-all">Personalizados</a>
            <a href="#ubicaciones" className="hover:text-gold hover:opacity-100 transition-all">Ubicaciones</a>

          </div>
        </div>

        <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ${isScrolled ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none'}`}>
          <BrandLogo 
            variant="text" 
            className="w-24 md:w-32" 
          />
        </div>

        <div className="flex gap-10 items-center">
          <div className="hidden lg:flex gap-12">
            <a 
              href={settings.socialLinks.facebook} 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <Facebook size={32} strokeWidth={1.5} className="opacity-100 cursor-pointer transition-all hover:scale-125 hover:text-[#1877F2]" />
            </a>
            <a 
              href={settings.socialLinks.instagram} 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <Instagram size={32} strokeWidth={1.5} className="opacity-100 cursor-pointer transition-all hover:scale-125 hover:text-[#E4405F]" />
            </a>
          </div>
          
          <a href="/admin" className="hover:scale-110 transition-all active:scale-90" aria-label="Panel de Administración" title="Panel de Administración">
            <User size={40} strokeWidth={1.5} className="text-accent" />
          </a>

          <button onClick={openCart} className="flex items-center gap-2 relative hover:scale-110 transition-all active:scale-90 group" aria-label="Abrir Carrito">
            <ShoppingBag size={42} strokeWidth={1.5} className="text-accent" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-gold text-white text-[13px] min-w-[24px] h-6 px-1 rounded-full flex items-center justify-center font-bold premium-shadow border-2 border-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile & Contextual Sidebar (High-End Editorial Style) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-3xl flex flex-col p-12 md:p-24 animate-in">
          <div className="flex justify-between items-start mb-20 w-full">
            <div className="text-[13px] uppercase tracking-[0.3em] font-bold opacity-30 mt-4">
              Navegación / Menú
            </div>
            <button 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="hover:rotate-90 transition-transform duration-500 p-2"
              aria-label="Cerrar Menú"
            >
              <X size={48} strokeWidth={1} />
            </button>
          </div>

          <div className="flex flex-col gap-10 md:gap-14 text-6xl md:text-8xl font-serif italic tracking-tighter text-text">
            <a 
              href="#catalog" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:pl-8 transition-all duration-500 hover:text-gold"
            >
              Colecciones
            </a>
            <a 
              href="#personalizados" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:pl-8 transition-all duration-500 hover:text-gold"
            >
              Diseños Personalizados
            </a>
            <a 
              href="#ubicaciones" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:pl-8 transition-all duration-500 hover:text-gold"
            >
              Ubicaciones
            </a>

          </div>

          <div className="mt-auto flex flex-col md:flex-row justify-between border-t border-black/5 pt-12 gap-8 text-[13px] uppercase tracking-[0.4em] font-bold opacity-60">
            <div className="flex flex-col gap-3">
              <span className="mb-2 opacity-30">Contacto</span>
              <a href="mailto:hola@berakah.mx" className="hover:text-gold transition-colors">hola@berakah.mx</a>
              {settings.phones.map((phone, i) => (
                <span key={i}>{phone.number} ({phone.label})</span>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <span className="mb-2 opacity-30">Síguenos</span>
              <a 
                href={settings.socialLinks.facebook} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-gold transition-colors flex items-center gap-2"
              >
                <Facebook size={16} strokeWidth={1.5} /> Facebook
              </a>
              <a 
                href={settings.socialLinks.instagram} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-gold transition-colors flex items-center gap-2"
              >
                <Instagram size={16} strokeWidth={1.5} /> Instagram
              </a>
            </div>
            <div className="md:text-right flex flex-col justify-end">
              <span>Berakah Boutique © 2026</span>
              <span className="opacity-30">México</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
