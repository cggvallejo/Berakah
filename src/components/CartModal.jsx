import React, { useState } from 'react';
import {
  X, Trash2, ArrowLeft, User, MapPin, Navigation, Edit3,
  CheckCircle, Phone, Wallet, Landmark, CreditCard, Send, ShoppingBag
} from 'lucide-react';

// ─── CONFIG ──────────────────────────────────────────────────────────────────
const WA_NUMBER = '5219990000000'; // ← Cambiar por el número real del negocio

const PAYMENT_METHODS = [
  { id: 'mercadopago', label: 'Mercado Pago / Libre', sub: 'Pago seguro en línea', icon: <Wallet size={18} />, color: '#3483fa' },
  { id: 'transferencia', label: 'Transferencia Bancaria', sub: 'CLABE al confirmar', icon: <Landmark size={18} />, color: '#2d6a4f' },
  { id: 'efectivo', label: 'Efectivo / Terminal', sub: 'Pago al recibir', icon: <CreditCard size={18} />, color: '#b5855c' },
];

export function buildWhatsAppMessage(items, data) {
  const lines = items.map(i => `• ${i.name} — $${(i.price || 850).toLocaleString()} MXN`).join('\n');
  const total = items.reduce((acc, i) => acc + (i.price || 850), 0);
  const payLabel = PAYMENT_METHODS.find(p => p.id === data.payment)?.label || data.payment;
  return encodeURIComponent(
    `🛍️ *NUEVO PEDIDO BERAKAH*\n\n` +
    `📦 *Productos:*\n${lines}\n\n` +
    `💰 *Total: $${total.toLocaleString()} MXN*\n\n` +
    `👤 *Cliente:* ${data.name}\n` +
    `📍 *Dirección:* ${data.address}\n` +
    `💳 *Pago preferido:* ${payLabel}\n\n` +
    `_Pedido enviado desde Berakah Boutique_`
  );
}

// ─── PASOS ────────────────────────────────────────────────────────────────────
const STEPS = ['cart', 'name', 'address', 'address_geo', 'address_manual', 'payment', 'confirm', 'done'];

function StepIndicator({ step }) {
  const main = ['cart', 'name', 'address', 'payment', 'confirm'];
  const current = main.indexOf(step.startsWith('address') ? 'address' : step);
  return (
    <div className="flex items-center justify-center gap-2 px-6 pb-4">
      {main.map((s, i) => (
        <React.Fragment key={s}>
          <div className={`w-2 h-2 rounded-full transition-all duration-300 ${i <= current ? 'bg-gold w-6' : 'bg-accent/15'}`} />
          {i < main.length - 1 && <div className={`flex-1 h-px ${i < current ? 'bg-gold/40' : 'bg-accent/10'}`} />}
        </React.Fragment>
      ))}
    </div>
  );
}

// ─── CART MODAL ───────────────────────────────────────────────────────────────
function CartModal({ items, onClose, onRemove }) {
  const [step, setStep] = useState('cart');
  const [history, setHistory] = useState([]);
  const [data, setData] = useState({ name: '', address: '', payment: '' });
  const [inputVal, setInputVal] = useState('');
  const [geoStatus, setGeoStatus] = useState('idle'); // idle | loading | success | error
  const [geoText, setGeoText] = useState('');

  const total = items.reduce((acc, i) => acc + (i.price || 850), 0);

  const goTo = (s) => { setHistory(h => [...h, step]); setStep(s); setInputVal(''); };
  const goBack = () => { const p = history[history.length - 1]; setHistory(h => h.slice(0, -1)); setStep(p || 'cart'); setInputVal(''); };

  const submitName = () => {
    if (!inputVal.trim()) return;
    setData(d => ({ ...d, name: inputVal.trim() }));
    goTo('address');
  };

  const submitManual = () => {
    if (!inputVal.trim()) return;
    setData(d => ({ ...d, address: inputVal.trim() }));
    goTo('payment');
  };

  const handleGeo = () => {
    setGeoStatus('loading');
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const txt = `Lat: ${coords.latitude.toFixed(5)}, Lng: ${coords.longitude.toFixed(5)}`;
        setGeoText(txt);
        setGeoStatus('success');
        setData(d => ({ ...d, address: `📍 Ubicación GPS: ${txt}` }));
      },
      () => setGeoStatus('error')
    );
  };

  const sendWA = () => {
    window.open(`https://wa.me/${WA_NUMBER}?text=${buildWhatsAppMessage(items, data)}`, '_blank');
    goTo('done');
  };

  const showBack = step !== 'cart' && step !== 'done';
  const isCheckout = step !== 'cart';

  return (
    <div className="fixed inset-0 z-[200] flex justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col slide-in">

        {/* Header */}
        <div className="px-6 py-5 border-b border-accent/8 flex items-center justify-between bg-accent text-white flex-shrink-0">
          <div className="flex items-center gap-3">
            {showBack && (
              <button onClick={goBack} className="hover:opacity-60 transition-opacity">
                <ArrowLeft size={20} />
              </button>
            )}
            <div>
              <h2 className="text-xl font-serif leading-tight">
                {step === 'cart' && 'Tu Selección'}
                {step === 'name' && 'Datos del Cliente'}
                {step === 'address' && 'Dirección de Envío'}
                {step === 'address_geo' && 'Ubicación GPS'}
                {step === 'address_manual' && 'Escribir Dirección'}
                {step === 'payment' && 'Método de Pago'}
                {step === 'confirm' && 'Confirmar Pedido'}
                {step === 'done' && '¡Pedido Enviado!'}
              </h2>
              {isCheckout && step !== 'done' && (
                <p className="text-[10px] opacity-50 uppercase tracking-widest mt-0.5">Checkout seguro</p>
              )}
            </div>
          </div>
          <button onClick={onClose} className="hover:opacity-60 transition-opacity p-1">
            <X size={22} />
          </button>
        </div>

        {/* Step indicator */}
        {isCheckout && step !== 'done' && (
          <div className="pt-4 bg-accent/3 border-b border-accent/5">
            <StepIndicator step={step} />
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto">

          {/* ── CARRITO ── */}
          {step === 'cart' && (
            <div className="p-6 md:p-8">
              {items.length === 0 ? (
                <div className="h-64 flex flex-col items-center justify-center opacity-30 text-center">
                  <ShoppingBag size={40} strokeWidth={1} className="mb-4" />
                  <p className="italic text-sm mb-4">Tu bolsa está vacía.</p>
                  <button onClick={onClose} className="text-gold text-xs uppercase tracking-widest font-bold border-b border-gold">
                    Volver al Catálogo
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.cartId} className="flex gap-4 border-b border-accent/5 pb-4 animate-in">
                      <img src={item.image} className="w-20 h-24 object-cover rounded-xl flex-shrink-0" alt={item.name} />
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] text-accent/40 uppercase tracking-widest mb-1">{item.category}</p>
                        <h4 className="text-sm font-semibold leading-tight line-clamp-2">{item.name}</h4>
                        <div className="flex justify-between items-center mt-3">
                          <span className="text-sm font-serif">${(item.price || 850).toLocaleString()} MXN</span>
                          <button onClick={() => onRemove(item.cartId)} className="text-accent/30 hover:text-red-400 transition-colors p-1">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── NOMBRE ── */}
          {step === 'name' && (
            <div className="p-6 md:p-8">
              <p className="text-sm text-accent/60 mb-6 leading-relaxed">
                ¿A nombre de quién procesamos el pedido?
              </p>
              <div className="relative mb-4">
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-accent/30" />
                <input
                  type="text"
                  value={inputVal}
                  onChange={e => setInputVal(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && submitName()}
                  placeholder="Tu nombre completo"
                  className="w-full pl-11 pr-4 py-4 text-sm border border-accent/20 rounded-xl focus:outline-none focus:border-gold bg-white transition-colors"
                  autoFocus
                />
              </div>
              <button
                onClick={submitName}
                disabled={!inputVal.trim()}
                className="w-full bg-accent text-white py-4 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-gold transition-all disabled:opacity-30 flex items-center justify-center gap-2"
              >
                Continuar <Send size={16} />
              </button>
            </div>
          )}

          {/* ── DIRECCIÓN: OPCIONES ── */}
          {step === 'address' && (
            <div className="p-6 md:p-8">
              <p className="text-sm text-accent/60 mb-6 leading-relaxed">
                ¡Gracias, <strong>{data.name}</strong>! ¿Cómo prefieres indicar tu dirección de envío?
              </p>
              <button
                onClick={() => goTo('address_geo')}
                className="w-full flex items-center gap-4 p-5 border border-accent/15 rounded-xl hover:border-gold hover:bg-gold/5 transition-all mb-3 text-left"
              >
                <span className="w-10 h-10 bg-green-50 text-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Navigation size={18} />
                </span>
                <div>
                  <p className="text-sm font-semibold">Usar mi ubicación GPS</p>
                  <p className="text-xs text-accent/40 mt-0.5">Automático y más preciso</p>
                </div>
              </button>
              <button
                onClick={() => goTo('address_manual')}
                className="w-full flex items-center gap-4 p-5 border border-accent/15 rounded-xl hover:border-gold hover:bg-gold/5 transition-all text-left"
              >
                <span className="w-10 h-10 bg-accent/5 text-accent rounded-full flex items-center justify-center flex-shrink-0">
                  <Edit3 size={18} />
                </span>
                <div>
                  <p className="text-sm font-semibold">Escribir mi dirección</p>
                  <p className="text-xs text-accent/40 mt-0.5">Calle, número, ciudad, estado</p>
                </div>
              </button>
            </div>
          )}

          {/* ── GEOLOCALIZACIÓN ── */}
          {step === 'address_geo' && (
            <div className="p-6 md:p-8">
              <p className="text-sm text-accent/60 mb-6">Vamos a obtener tu ubicación actual para el envío.</p>
              {geoStatus === 'idle' && (
                <button
                  onClick={handleGeo}
                  className="w-full flex items-center justify-center gap-3 bg-accent/5 border-2 border-dashed border-accent/20 text-accent py-8 rounded-xl text-sm font-bold hover:bg-gold/5 hover:border-gold transition-all"
                >
                  <Navigation size={20} /> Permitir acceso a ubicación
                </button>
              )}
              {geoStatus === 'loading' && (
                <div className="text-center py-10">
                  <div className="w-10 h-10 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-sm text-accent/50">Obteniendo ubicación...</p>
                </div>
              )}
              {geoStatus === 'success' && (
                <>
                  <div className="p-4 bg-green-50 border border-green-200 rounded-xl mb-4">
                    <p className="text-sm font-semibold text-green-700 mb-1">✅ Ubicación capturada</p>
                    <p className="text-xs text-green-600">{geoText}</p>
                  </div>
                  <button onClick={() => goTo('payment')} className="w-full bg-accent text-white py-4 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-gold transition-all">
                    Continuar →
                  </button>
                </>
              )}
              {geoStatus === 'error' && (
                <>
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl mb-4">
                    <p className="text-sm text-red-600">No pudimos obtener tu ubicación. Intenta de nuevo o escríbela manualmente.</p>
                  </div>
                  <button onClick={() => { setGeoStatus('idle'); goTo('address_manual'); }} className="w-full bg-accent text-white py-4 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-gold transition-all">
                    Escribir dirección
                  </button>
                </>
              )}
            </div>
          )}

          {/* ── DIRECCIÓN MANUAL ── */}
          {step === 'address_manual' && (
            <div className="p-6 md:p-8">
              <p className="text-sm text-accent/60 mb-2">Escribe tu dirección completa de envío.</p>
              <p className="text-xs text-accent/35 mb-5 italic">Ej: Calle Juárez 45, Col. Centro, Mérida, Yucatán, CP 97000</p>
              <div className="relative mb-4">
                <MapPin size={16} className="absolute left-4 top-4 text-accent/30" />
                <textarea
                  value={inputVal}
                  onChange={e => setInputVal(e.target.value)}
                  placeholder="Dirección completa..."
                  rows={4}
                  className="w-full pl-11 pr-4 py-4 text-sm border border-accent/20 rounded-xl focus:outline-none focus:border-gold bg-white resize-none transition-colors"
                  autoFocus
                />
              </div>
              <button
                onClick={submitManual}
                disabled={!inputVal.trim()}
                className="w-full bg-accent text-white py-4 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-gold transition-all disabled:opacity-30"
              >
                Confirmar dirección →
              </button>
            </div>
          )}

          {/* ── PAGO ── */}
          {step === 'payment' && (
            <div className="p-6 md:p-8">
              <p className="text-sm text-accent/60 mb-6">¿Cuál es tu método de pago preferido?</p>
              <div className="space-y-3">
                {PAYMENT_METHODS.map(m => (
                  <button
                    key={m.id}
                    onClick={() => { setData(d => ({ ...d, payment: m.id })); goTo('confirm'); }}
                    className="w-full flex items-center gap-4 p-5 border border-accent/15 rounded-xl hover:border-gold hover:bg-gold/5 transition-all text-left group"
                  >
                    <span className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors"
                      style={{ background: `${m.color}15`, color: m.color }}>
                      {m.icon}
                    </span>
                    <div>
                      <p className="text-sm font-semibold">{m.label}</p>
                      <p className="text-xs text-accent/40 mt-0.5">{m.sub}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── CONFIRMACIÓN ── */}
          {step === 'confirm' && (
            <div className="p-6 md:p-8">
              <p className="text-sm text-accent/60 mb-5">Revisa el resumen antes de enviar tu pedido.</p>

              {/* Productos */}
              <div className="space-y-2 mb-5">
                {items.map((item, i) => (
                  <div key={i} className="flex gap-3 items-center p-3 bg-accent/4 rounded-xl">
                    <img src={item.image} className="w-12 h-14 object-cover rounded-lg flex-shrink-0" alt={item.name} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold truncate">{item.name}</p>
                      <p className="text-xs text-accent/40 mt-0.5">${(item.price || 850).toLocaleString()} MXN</p>
                    </div>
                  </div>
                ))}
                <div className="flex justify-between items-center py-3 border-t border-accent/10">
                  <span className="text-xs uppercase tracking-widest opacity-40">Total</span>
                  <span className="text-lg font-serif">${total.toLocaleString()} MXN</span>
                </div>
              </div>

              {/* Datos cliente */}
              <div className="bg-accent/5 rounded-xl p-4 space-y-3 mb-6">
                {[
                  { icon: <User size={14} />, label: 'Cliente', val: data.name },
                  { icon: <MapPin size={14} />, label: 'Dirección', val: data.address },
                  { icon: <CreditCard size={14} />, label: 'Pago', val: PAYMENT_METHODS.find(p => p.id === data.payment)?.label },
                ].map((r, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <span className="text-gold mt-0.5 flex-shrink-0">{r.icon}</span>
                    <div>
                      <p className="text-[10px] text-accent/40 uppercase tracking-widest">{r.label}</p>
                      <p className="text-xs font-medium">{r.val}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={sendWA}
                className="w-full bg-[#25D366] text-white py-5 rounded-xl flex items-center justify-center gap-3 font-bold text-sm uppercase tracking-widest hover:bg-[#1ebe5d] transition-all shadow-lg"
              >
                <Phone size={18} /> Enviar pedido por WhatsApp
              </button>
              <p className="text-[10px] text-accent/30 text-center mt-3">Te responderemos en breve ✉️</p>
            </div>
          )}

          {/* ── DONE ── */}
          {step === 'done' && (
            <div className="p-8 flex flex-col items-center text-center h-full justify-center">
              <div className="w-20 h-20 bg-[#25D366]/10 rounded-full flex items-center justify-center mb-6">
                <CheckCircle size={40} className="text-[#25D366]" />
              </div>
              <h3 className="font-serif text-2xl mb-3">¡Pedido enviado!</h3>
              <p className="text-sm text-accent/50 leading-relaxed mb-8 max-w-xs">
                Tu pedido fue enviado por WhatsApp. El equipo Berakah te confirmará a la brevedad. 🌿
              </p>
              <button onClick={onClose} className="text-xs uppercase tracking-widest text-gold font-bold border-b border-gold pb-0.5">
                Seguir explorando
              </button>
            </div>
          )}
        </div>

        {/* Footer fijo: total + CTA (solo en step=cart con items) */}
        {step === 'cart' && items.length > 0 && (
          <div className="p-6 border-t border-accent/8 bg-white flex-shrink-0">
            <div className="flex justify-between items-end mb-5">
              <span className="text-xs uppercase tracking-widest font-bold opacity-40">Subtotal</span>
              <div className="text-right">
                <span className="text-3xl font-serif">${total.toLocaleString()}</span>
                <span className="block text-[9px] opacity-40">MXN</span>
              </div>
            </div>
            <button
              onClick={() => goTo('name')}
              className="w-full bg-accent text-white py-5 uppercase tracking-widest text-sm font-bold hover:bg-gold transition-all duration-500 rounded-xl"
            >
              Realizar mi Pedido →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartModal;
