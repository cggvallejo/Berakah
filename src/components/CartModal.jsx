import React, { useState } from 'react';
import { X, Trash2, CreditCard, Wallet, ExternalLink, Landmark } from 'lucide-react';

function CartModal({ items, onClose, onRemove }) {
  const [step, setStep] = useState('cart'); // 'cart' | 'checkout'
  const total = items.length * 1450;

  return (
    <div className="fixed inset-0 z-[200] flex justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      
      {/* Slide Panel */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col slide-in">
        <div className="p-8 border-b border-accent/5 flex justify-between items-center bg-accent text-white">
          <h2 className="text-2xl font-serif">Tu Selección</h2>
          <button onClick={onClose}><X size={24} /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-8">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center opacity-30 italic">
               <p className="mb-4">Tu bolsa está vacía.</p>
               <button onClick={onClose} className="text-gold text-xs uppercase tracking-widest font-bold border-b border-gold">Volver al Catálogo</button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item, idx) => (
                <div key={item.cartId} className="flex gap-4 border-b border-accent/5 pb-4 group animate-in">
                  <img src={item.image} className="w-20 h-24 object-cover premium-shadow" alt={item.name} />
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold">{item.name}</h4>
                    <p className="text-[10px] text-accent/40 uppercase tracking-widest mb-2">{item.category}</p>
                    <div className="flex justify-between items-center">
                       <span className="text-sm font-serif">$1,450.00</span>
                       <button onClick={() => onRemove(item.cartId)} className="text-red/50 hover:text-red transition-colors">
                          <Trash2 size={14} />
                       </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-8 bg-accent/5 border-t border-accent/10">
            <div className="flex justify-between items-end mb-8">
               <span className="text-xs uppercase tracking-widest font-bold opacity-40">Subtotal</span>
               <div className="text-right">
                  <span className="text-3xl font-serif">${total.toLocaleString()}.00</span>
                  <span className="block text-[9px] opacity-40">MXN</span>
               </div>
            </div>

            {step === 'cart' ? (
              <button 
                onClick={() => setStep('checkout')}
                className="w-full bg-accent text-white py-5 uppercase tracking-widest text-xs font-bold hover:bg-gold transition-all duration-500 premium-shadow"
              >
                Continuar con el Pedido
              </button>
            ) : (
              <div className="space-y-4 animate-in">
                 <p className="text-[10px] uppercase tracking-widest font-bold mb-4 opacity-50">Elige tu método de pago</p>
                 
                 {/* Mercado Libre Option */}
                 <button className="w-full flex items-center justify-between p-4 bg-white border border-accent/10 hover:border-gold group transition-all rounded-[1px]">
                    <div className="flex items-center gap-3">
                       <ExternalLink size={18} className="text-[#3483fa]" />
                       <span className="text-xs font-bold uppercase tracking-widest">Mercado Pago / Libre</span>
                    </div>
                    <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                 </button>

                 {/* Other Options */}
                 <div className="grid grid-cols-2 gap-3">
                    <button className="p-4 bg-white border border-accent/10 hover:border-gold flex flex-col items-center gap-2 transition-all rounded-[1px]">
                       <Landmark size={18} />
                       <span className="text-[9px] uppercase font-bold tracking-widest">Transferencia</span>
                    </button>
                    <button className="p-4 bg-white border border-accent/10 border-gold flex flex-col items-center gap-2 transition-all rounded-[1px]">
                       <CreditCard size={18} className="text-gold" />
                       <span className="text-[9px] uppercase font-bold tracking-widest">Tarjeta / Terminal</span>
                    </button>
                 </div>

                 <button 
                   onClick={() => setStep('cart')}
                   className="w-full text-center text-[10px] opacity-40 mt-4 underline uppercase tracking-widest"
                 >
                   Regresar al carrito
                 </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function ChevronRight({ size, className }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="m9 18 6-6-6-6"/>
    </svg>
  );
}

export default CartModal;
