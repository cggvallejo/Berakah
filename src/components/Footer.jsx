import React from 'react';
import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-accent text-white py-24">
      <div className="container grid md:grid-cols-4 gap-16">
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-4xl font-serif mb-8 tracking-tighter">BERAKAH</h2>
          <p className="text-white/80 font-light max-w-sm mb-8 leading-loose italic">
            "Donde las manos artesanas mexicanas transforman la fibra natural en piezas de lujo eterno."
          </p>
          <div className="flex gap-6">
            <Instagram size={20} className="opacity-80 hover:opacity-100 cursor-pointer" />
            <Facebook size={20} className="opacity-80 hover:opacity-100 cursor-pointer" />
          </div>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.3em] font-bold mb-8 text-gold">Contacto</h4>
          <ul className="flex flex-col gap-4 text-sm text-white/80 font-light">
            <li className="flex items-center gap-3"><Phone size={14} /> +52 (55) 1234 5678</li>
            <li className="flex items-center gap-3"><Mail size={14} /> hola@berakah.mx</li>
            <li className="flex items-center gap-3"><MapPin size={14} /> Ciudad de México, MX</li>
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
