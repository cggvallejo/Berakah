import React, { useState } from 'react';
import { MessageCircle, X, ChevronRight, CreditCard, ShoppingCart, HelpCircle } from 'lucide-react';

const MENU_DATA = {
  main: [
    { id: 'buy', label: '¿Cómo comprar?', icon: <ShoppingCart size={16} /> },
    { id: 'pay', label: 'Métodos de pago', icon: <CreditCard size={16} /> },
    { id: 'help', label: 'Soporte y Envíos', icon: <HelpCircle size={16} /> },
  ],
  buy: [
    { label: 'Ver catálogo', link: '#catalog' },
    { label: 'Agregar al carrito', text: 'Solo haz clic en el ícono de bolsa en cada producto.' },
    { label: 'Finalizar pedido', text: 'Ve a tu carrito y elige un método de pago.' }
  ],
  pay: [
    { label: 'Mercado Libre', text: 'Paga con seguridad vía Mercado Pago/Libre.' },
    { label: 'Transferencia', text: 'Datos: CLABE 012 345 678901234567.' },
    { label: 'Efectivo / Terminal', text: 'Paga al recibir o con terminal física.' }
  ],
  help: [
    { label: 'Envíos a todo México', text: 'Tarda de 3 a 5 días hábiles.' },
    { label: 'Garantía Artesanal', text: 'Cada pieza es única y tiene 30 días de garantía.' }
  ]
};

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMenu, setCurrentMenu] = useState('main');
  const [history, setHistory] = useState([]);

  const navigateTo = (menuId) => {
    setHistory([...history, currentMenu]);
    setCurrentMenu(menuId);
  };

  const goBack = () => {
    const prev = history[history.length - 1];
    setHistory(history.slice(0, -1));
    setCurrentMenu(prev || 'main');
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-accent text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-gold transition-all duration-500 scale-in"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 glass premium-shadow rounded-2xl overflow-hidden animate-in">
          <div className="bg-accent p-6 text-white text-center">
            <h4 className="font-serif text-lg">Asistente Berakah</h4>
            <p className="text-[10px] uppercase tracking-widest opacity-60">México Artesanal</p>
          </div>

          <div className="p-4 max-h-[400px] overflow-y-auto">
            {currentMenu !== 'main' && (
              <button onClick={goBack} className="text-[10px] uppercase text-accent/40 mb-4 hover:text-accent">
                ← Volver
              </button>
            )}

            <div className="flex flex-col gap-2">
              {MENU_DATA[currentMenu]?.map((item, idx) => (
                <div key={idx}>
                  {item.id ? (
                    <button 
                      onClick={() => navigateTo(item.id)}
                      className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gold/5 text-sm transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-gold">{item.icon}</span>
                        {item.label}
                      </div>
                      <ChevronRight size={14} className="opacity-30" />
                    </button>
                  ) : (
                    <div className="p-3 border-b border-accent/5">
                      <p className="text-xs font-bold mb-1">{item.label}</p>
                      {item.text && <p className="text-[11px] text-accent/60 leading-relaxed">{item.text}</p>}
                      {item.link && <a href={item.link} onClick={() => setIsOpen(false)} className="text-[10px] text-gold uppercase underline">Ver ahora</a>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-accent/5 text-center">
             <p className="text-[9px] text-accent/40 uppercase tracking-tighter">¿Necesitas ayuda humana? <br /> <span className="font-bold underline cursor-pointer">WhatsApp Directo</span></p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
