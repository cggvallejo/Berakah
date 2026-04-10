import React from 'react';
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import BrandLogo from './BrandLogo';

import { settings } from '../data/settings';

function Footer() {
  return (
    <footer className="bg-accent text-white py-24">
      <div className="container grid md:grid-cols-4 gap-16">
        <div className="col-span-1 md:col-span-2">
          <BrandLogo 
            variant="text" 
            className="w-32 md:w-48 mb-6" 
          />
          <p className="text-white/80 font-light max-w-sm mb-8 leading-loose italic">
            "Donde las manos artesanas mexicanas transforman la fibra natural en piezas de lujo eterno."
          </p>
          <div className="flex gap-8">
            <a 
              href={settings.socialLinks.facebook} 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <Facebook size={36} strokeWidth={1.5} className="opacity-100 cursor-pointer transition-all hover:scale-110 hover:text-[#1877F2]" />
            </a>
            <a 
              href={settings.socialLinks.instagram} 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <Instagram size={36} strokeWidth={1.5} className="opacity-100 cursor-pointer transition-all hover:scale-110 hover:text-[#E4405F]" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.3em] font-bold mb-8 text-gold">Contacto</h4>
          <ul className="flex flex-col gap-4 text-sm text-white/80 font-light">
            {settings.phones.map((phone, i) => (
              <li key={i} className="flex items-center gap-3"><Phone size={14} /> {phone.number}</li>
            ))}
            <li className="flex items-center gap-3"><Mail size={14} /> hola@berakah.mx</li>
            <li className="flex items-center gap-3"><MapPin size={14} /> {settings.locations[0].address.split(',')[0]}</li>
          </ul>
        </div>

        <div>
           <h4 className="text-xs uppercase tracking-[0.3em] font-bold mb-8 text-gold">Navegación</h4>
           <ul className="grid grid-cols-1 gap-4 text-sm text-white/80 font-light">
              <li><a href="#catalog" className="hover:text-white">Colecciones</a></li>
              <li><a href="#process" className="hover:text-white">Proceso</a></li>
              <li><a href="/" className="hover:text-white">Términos</a></li>
              <li><a href="/" className="hover:text-white">Envíos</a></li>
           </ul>
        </div>
      </div>

      <div className="container mt-24 pt-8 border-t border-white/5 text-[10px] uppercase tracking-widest text-center opacity-60">
        © 2026 Berakah Artesanía Premium. Orgullosamente Hecho en México.
      </div>
    </footer>
  );
}

export default Footer;
