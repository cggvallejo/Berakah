import React, { useState, useRef, useEffect } from 'react';
import {
  MessageCircle, X, ChevronRight, CreditCard, ShoppingCart,
  HelpCircle, MapPin, User, CheckCircle, Send, ArrowLeft,
  Landmark, Wallet, Navigation, Edit3, Package, Phone
} from 'lucide-react';

// ─── CONFIGURACIÓN ────────────────────────────────────────────────
const WA_NUMBER = '5219990000000'; // ← Cambiar por el número real del negocio

// ─── PASOS DEL CHECKOUT ───────────────────────────────────────────
const STEPS = {
  MAIN: 'main',
  INFO_BUY: 'info_buy',
  INFO_PAY: 'info_pay',
  INFO_SHIP: 'info_ship',
  CK_SUMMARY: 'ck_summary',
  CK_NAME: 'ck_name',
  CK_ADDRESS: 'ck_address',
  CK_ADDRESS_GEO: 'ck_address_geo',
  CK_ADDRESS_MANUAL: 'ck_address_manual',
  CK_PAYMENT: 'ck_payment',
  CK_CONFIRM: 'ck_confirm',
  CK_DONE: 'ck_done',
};

const PAYMENT_METHODS = [
  { id: 'mercadopago', label: 'Mercado Pago / Libre', icon: <Wallet size={16} />, color: '#3483fa' },
  { id: 'transferencia', label: 'Transferencia Bancaria', icon: <Landmark size={16} />, color: '#2d6a4f' },
  { id: 'efectivo', label: 'Efectivo / Terminal', icon: <CreditCard size={16} />, color: '#b5855c' },
];

function buildWhatsAppMessage(items, orderData) {
  const lines = items.map(i => `• ${i.name} — $${(i.price || 850).toLocaleString()} MXN`).join('\n');
  const total = items.reduce((acc, i) => acc + (i.price || 850), 0);
  const payLabel = PAYMENT_METHODS.find(p => p.id === orderData.payment)?.label || orderData.payment;

  return encodeURIComponent(
    `🛍️ *NUEVO PEDIDO BERAKAH*\n\n` +
    `📦 *Productos:*\n${lines}\n\n` +
    `💰 *Total: $${total.toLocaleString()} MXN*\n\n` +
    `👤 *Cliente:* ${orderData.name}\n` +
    `📍 *Dirección:* ${orderData.address}\n` +
    `💳 *Pago preferido:* ${payLabel}\n\n` +
    `_Pedido enviado desde Berakah Boutique_`
  );
}

// ─── COMPONENTES INTERNOS ─────────────────────────────────────────
function BubbleBot({ text }) {
  return (
    <div className="flex gap-2 mb-3">
      <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-1">
        <span className="text-white text-[8px] font-bold">B</span>
      </div>
      <div className="bg-accent/8 rounded-2xl rounded-tl-none px-4 py-3 max-w-[85%]">
        <p className="text-xs leading-relaxed text-accent">{text}</p>
      </div>
    </div>
  );
}

function BubbleUser({ text }) {
  return (
    <div className="flex justify-end mb-3">
      <div className="bg-accent text-white rounded-2xl rounded-tr-none px-4 py-3 max-w-[85%]">
        <p className="text-xs leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

function OptionButton({ onClick, icon, label, sublabel, color }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between p-3 rounded-xl border border-accent/10 hover:border-gold hover:bg-gold/5 transition-all duration-300 text-left group mb-2"
    >
      <div className="flex items-center gap-3">
        <span style={{ color: color || 'inherit' }} className="text-accent/60 group-hover:text-gold transition-colors">
          {icon}
        </span>
        <div>
          <p className="text-xs font-semibold">{label}</p>
          {sublabel && <p className="text-[10px] text-accent/40">{sublabel}</p>}
        </div>
      </div>
      <ChevronRight size={14} className="opacity-20 group-hover:opacity-60 transition-opacity" />
    </button>
  );
}

// ─── CHATBOT PRINCIPAL ────────────────────────────────────────────
function Chatbot({ cartItems = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(STEPS.MAIN);
  const [stepHistory, setStepHistory] = useState([]);
  const [orderData, setOrderData] = useState({ name: '', address: '', payment: '' });
  const [inputValue, setInputValue] = useState('');
  const [geoStatus, setGeoStatus] = useState('idle'); // idle | loading | success | error
  const [geoText, setGeoText] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [step]);

  const goTo = (newStep) => {
    setStepHistory(h => [...h, step]);
    setStep(newStep);
    setInputValue('');
  };

  const goBack = () => {
    const prev = stepHistory[stepHistory.length - 1];
    setStepHistory(h => h.slice(0, -1));
    setStep(prev || STEPS.MAIN);
    setInputValue('');
  };

  const handleOpen = () => {
    setIsOpen(true);
    setStep(STEPS.MAIN);
    setStepHistory([]);
    setOrderData({ name: '', address: '', payment: '' });
  };

  const handleGeolocate = () => {
    setGeoStatus('loading');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const text = `Lat: ${latitude.toFixed(5)}, Lng: ${longitude.toFixed(5)}`;
        setGeoText(text);
        setGeoStatus('success');
        setOrderData(d => ({ ...d, address: `📍 Ubicación GPS: ${text}` }));
      },
      () => {
        setGeoStatus('error');
      }
    );
  };

  const submitName = () => {
    if (!inputValue.trim()) return;
    setOrderData(d => ({ ...d, name: inputValue.trim() }));
    goTo(STEPS.CK_ADDRESS);
  };

  const submitManualAddress = () => {
    if (!inputValue.trim()) return;
    setOrderData(d => ({ ...d, address: inputValue.trim() }));
    goTo(STEPS.CK_PAYMENT);
  };

  const submitPayment = (payId) => {
    setOrderData(d => ({ ...d, payment: payId }));
    goTo(STEPS.CK_CONFIRM);
  };

  const sendWhatsApp = () => {
    const msg = buildWhatsAppMessage(cartItems, orderData);
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank');
    goTo(STEPS.CK_DONE);
  };

  const total = cartItems.reduce((acc, i) => acc + (i.price || 850), 0);
  const canCheckout = cartItems.length > 0;

  // ─── RENDER CONTENT POR PASO ──────────────────────────────────
  const renderContent = () => {
    switch (step) {

      // ── MENÚ PRINCIPAL ──────────────────────────────────────────
      case STEPS.MAIN:
        return (
          <>
            <BubbleBot text="¡Hola! Soy tu asistente Berakah 🌿 ¿En qué te ayudo hoy?" />
            <div className="mt-2">
              <OptionButton
                onClick={() => canCheckout ? goTo(STEPS.CK_SUMMARY) : null}
                icon={<ShoppingCart size={16} />}
                label="Realizar mi pedido"
                sublabel={canCheckout ? `${cartItems.length} producto(s) en tu bolsa` : 'Agrega productos al carrito primero'}
                color={canCheckout ? '#b5855c' : '#999'}
              />
              <OptionButton onClick={() => goTo(STEPS.INFO_BUY)} icon={<HelpCircle size={16} />} label="¿Cómo comprar?" sublabel="Guía rápida paso a paso" />
              <OptionButton onClick={() => goTo(STEPS.INFO_PAY)} icon={<CreditCard size={16} />} label="Métodos de pago" sublabel="Opciones disponibles" />
              <OptionButton onClick={() => goTo(STEPS.INFO_SHIP)} icon={<Package size={16} />} label="Envíos y tiempos" sublabel="A todo México" />
            </div>
          </>
        );

      // ── INFO ESTÁTICA ─────────────────────────────────────────
      case STEPS.INFO_BUY:
        return (
          <>
            <BubbleBot text="¿Cómo comprar en Berakah? 🛍️" />
            <div className="space-y-2 mt-2">
              {[
                { n: '1', t: 'Explora el catálogo', d: 'Navega por nuestras 4 categorías artesanales.' },
                { n: '2', t: 'Agrega al carrito', d: 'Haz clic en el ícono de bolsa en cada producto.' },
                { n: '3', t: 'Realiza tu pedido', d: 'Abre el chatbot → "Realizar mi pedido" y sigue el flujo.' },
                { n: '4', t: 'Confirma por WhatsApp', d: 'Recibirás confirmación directa del equipo Berakah.' },
              ].map(item => (
                <div key={item.n} className="flex gap-3 p-3 bg-accent/5 rounded-xl">
                  <span className="w-6 h-6 bg-gold text-white rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0">{item.n}</span>
                  <div>
                    <p className="text-xs font-semibold">{item.t}</p>
                    <p className="text-[11px] text-accent/50">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        );

      case STEPS.INFO_PAY:
        return (
          <>
            <BubbleBot text="Aceptamos los siguientes métodos de pago:" />
            <div className="space-y-2 mt-2">
              {[
                { icon: <Wallet size={14} />, t: 'Mercado Pago / Libre', d: 'Pago seguro en línea con todas las tarjetas.' },
                { icon: <Landmark size={14} />, t: 'Transferencia Bancaria', d: 'Te enviamos CLABE al confirmar el pedido.' },
                { icon: <CreditCard size={14} />, t: 'Efectivo / Terminal', d: 'Disponible en entregas locales.' },
              ].map((m, i) => (
                <div key={i} className="flex gap-3 p-3 bg-accent/5 rounded-xl">
                  <span className="text-gold mt-0.5">{m.icon}</span>
                  <div>
                    <p className="text-xs font-semibold">{m.t}</p>
                    <p className="text-[11px] text-accent/50">{m.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        );

      case STEPS.INFO_SHIP:
        return (
          <>
            <BubbleBot text="Información de envíos Berakah 📦" />
            <div className="space-y-2 mt-2">
              {[
                { t: 'Cobertura nacional', d: 'Enviamos a toda la República Mexicana vía Estafeta o FedEx.' },
                { t: 'Tiempo de entrega', d: '3 a 5 días hábiles después de confirmar tu pedido.' },
                { t: 'Garantía artesanal', d: 'Cada pieza es única. 30 días de garantía por defecto de fabricación.' },
                { t: 'Costo de envío', d: 'Se calcula según tu ubicación al confirmar el pedido.' },
              ].map((m, i) => (
                <div key={i} className="flex gap-3 p-3 bg-accent/5 rounded-xl">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full flex-shrink-0 mt-2" />
                  <div>
                    <p className="text-xs font-semibold">{m.t}</p>
                    <p className="text-[11px] text-accent/50">{m.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        );

      // ── CHECKOUT: RESUMEN ─────────────────────────────────────
      case STEPS.CK_SUMMARY:
        return (
          <>
            <BubbleBot text="Aquí está tu selección. ¡Todo se ve increíble! 🌿" />
            <div className="mt-2 space-y-2">
              {cartItems.map((item, i) => (
                <div key={i} className="flex gap-3 p-2 bg-accent/5 rounded-xl">
                  <img src={item.image} alt={item.name} className="w-12 h-14 object-cover rounded-lg flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-semibold truncate">{item.name}</p>
                    <p className="text-[10px] text-accent/40 uppercase">{item.category}</p>
                    <p className="text-xs font-serif mt-1">${(item.price || 850).toLocaleString()} MXN</p>
                  </div>
                </div>
              ))}
              <div className="flex justify-between items-center p-3 border-t border-accent/10 mt-2">
                <span className="text-[10px] uppercase tracking-widest opacity-50">Total</span>
                <span className="text-base font-serif">${total.toLocaleString()} MXN</span>
              </div>
            </div>
            <button
              onClick={() => goTo(STEPS.CK_NAME)}
              className="w-full mt-4 bg-accent text-white py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-gold transition-all duration-300"
            >
              Continuar con el pedido →
            </button>
          </>
        );

      // ── CHECKOUT: NOMBRE ─────────────────────────────────────
      case STEPS.CK_NAME:
        return (
          <>
            <BubbleBot text="¿A nombre de quién procesamos el pedido? 👤" />
            {orderData.name && <BubbleUser text={orderData.name} />}
            <div className="mt-3 flex gap-2">
              <div className="flex-1 relative">
                <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-accent/30" />
                <input
                  type="text"
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && submitName()}
                  placeholder="Tu nombre completo"
                  className="w-full pl-9 pr-3 py-3 text-xs border border-accent/20 rounded-xl focus:outline-none focus:border-gold bg-white"
                  autoFocus
                />
              </div>
              <button
                onClick={submitName}
                disabled={!inputValue.trim()}
                className="bg-accent text-white px-4 rounded-xl hover:bg-gold transition-colors disabled:opacity-30"
              >
                <Send size={14} />
              </button>
            </div>
          </>
        );

      // ── CHECKOUT: DIRECCIÓN ───────────────────────────────────
      case STEPS.CK_ADDRESS:
        return (
          <>
            <BubbleUser text={orderData.name} />
            <BubbleBot text={`¡Gracias, ${orderData.name}! 🙌 ¿Cómo prefieres indicar tu dirección de envío?`} />
            <div className="mt-3">
              <OptionButton
                onClick={() => goTo(STEPS.CK_ADDRESS_GEO)}
                icon={<Navigation size={16} />}
                label="Usar mi ubicación GPS"
                sublabel="Automático y más preciso"
                color="#2d6a4f"
              />
              <OptionButton
                onClick={() => goTo(STEPS.CK_ADDRESS_MANUAL)}
                icon={<Edit3 size={16} />}
                label="Escribir mi dirección"
                sublabel="Calle, número, ciudad, estado"
              />
            </div>
          </>
        );

      // ── CHECKOUT: GEOLOCALIZACIÓN ─────────────────────────────
      case STEPS.CK_ADDRESS_GEO:
        return (
          <>
            <BubbleBot text="Vamos a obtener tu ubicación actual 📍" />
            {geoStatus === 'idle' && (
              <button
                onClick={handleGeolocate}
                className="w-full mt-3 flex items-center justify-center gap-2 bg-accent/10 border border-accent/20 text-accent py-4 rounded-xl text-xs font-bold hover:bg-gold/10 hover:border-gold transition-all"
              >
                <Navigation size={16} />
                Permitir acceso a ubicación
              </button>
            )}
            {geoStatus === 'loading' && (
              <div className="text-center py-6">
                <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                <p className="text-[11px] text-accent/50">Obteniendo ubicación...</p>
              </div>
            )}
            {geoStatus === 'success' && (
              <>
                <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-xl">
                  <p className="text-[11px] font-semibold text-green-700">✅ Ubicación capturada</p>
                  <p className="text-[10px] text-green-600 mt-1">{geoText}</p>
                </div>
                <button
                  onClick={() => goTo(STEPS.CK_PAYMENT)}
                  className="w-full mt-3 bg-accent text-white py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-gold transition-all"
                >
                  Continuar →
                </button>
              </>
            )}
            {geoStatus === 'error' && (
              <>
                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-[11px] text-red-600">No pudimos obtener tu ubicación. ¿Prefieres escribirla?</p>
                </div>
                <button
                  onClick={() => { setGeoStatus('idle'); goTo(STEPS.CK_ADDRESS_MANUAL); }}
                  className="w-full mt-3 bg-accent text-white py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-gold transition-all"
                >
                  Escribir dirección manualmente
                </button>
              </>
            )}
          </>
        );

      // ── CHECKOUT: DIRECCIÓN MANUAL ────────────────────────────
      case STEPS.CK_ADDRESS_MANUAL:
        return (
          <>
            <BubbleBot text="Escribe tu dirección completa de envío 🏠" />
            <p className="text-[10px] text-accent/40 mb-3 ml-8">Ej: Calle Juárez 45 Int. 3, Col. Centro, Mérida, Yucatán, CP 97000</p>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <MapPin size={14} className="absolute left-3 top-3 text-accent/30" />
                <textarea
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  placeholder="Dirección completa..."
                  rows={3}
                  className="w-full pl-9 pr-3 py-3 text-xs border border-accent/20 rounded-xl focus:outline-none focus:border-gold bg-white resize-none"
                  autoFocus
                />
              </div>
            </div>
            <button
              onClick={submitManualAddress}
              disabled={!inputValue.trim()}
              className="w-full mt-2 bg-accent text-white py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-gold transition-all disabled:opacity-30"
            >
              Confirmar dirección →
            </button>
          </>
        );

      // ── CHECKOUT: MÉTODO DE PAGO ──────────────────────────────
      case STEPS.CK_PAYMENT:
        return (
          <>
            <BubbleUser text={orderData.address} />
            <BubbleBot text="¿Cuál es tu método de pago preferido? 💳" />
            <div className="mt-3">
              {PAYMENT_METHODS.map(method => (
                <OptionButton
                  key={method.id}
                  onClick={() => submitPayment(method.id)}
                  icon={method.icon}
                  label={method.label}
                  color={method.color}
                />
              ))}
            </div>
          </>
        );

      // ── CHECKOUT: CONFIRMACIÓN ────────────────────────────────
      case STEPS.CK_CONFIRM: {
        const payLabel = PAYMENT_METHODS.find(p => p.id === orderData.payment)?.label || '';
        return (
          <>
            <BubbleBot text="¡Perfecto! Revisa el resumen de tu pedido antes de enviarlo 📋" />
            <div className="mt-3 space-y-2">
              <div className="p-3 bg-accent/5 rounded-xl space-y-2">
                <div className="flex gap-2 items-start">
                  <User size={12} className="text-gold mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[10px] text-accent/40 uppercase tracking-widest">Cliente</p>
                    <p className="text-xs font-semibold">{orderData.name}</p>
                  </div>
                </div>
                <div className="flex gap-2 items-start">
                  <MapPin size={12} className="text-gold mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[10px] text-accent/40 uppercase tracking-widest">Dirección</p>
                    <p className="text-xs">{orderData.address}</p>
                  </div>
                </div>
                <div className="flex gap-2 items-start">
                  <CreditCard size={12} className="text-gold mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[10px] text-accent/40 uppercase tracking-widest">Pago</p>
                    <p className="text-xs font-semibold">{payLabel}</p>
                  </div>
                </div>
                <div className="border-t border-accent/10 pt-2 flex justify-between">
                  <span className="text-[10px] text-accent/40 uppercase">Total</span>
                  <span className="text-sm font-serif">${total.toLocaleString()} MXN</span>
                </div>
              </div>

              <button
                onClick={sendWhatsApp}
                className="w-full mt-2 bg-[#25D366] text-white py-4 rounded-xl flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-widest hover:bg-[#1ebe5d] transition-all duration-300 shadow-lg"
              >
                <Phone size={16} /> Enviar pedido por WhatsApp
              </button>
              <p className="text-[10px] text-accent/30 text-center">Te responderemos a la brevedad ✉️</p>
            </div>
          </>
        );
      }

      // ── CHECKOUT: DONE ────────────────────────────────────────
      case STEPS.CK_DONE:
        return (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-[#25D366]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} className="text-[#25D366]" />
            </div>
            <h3 className="font-serif text-lg mb-2">¡Pedido enviado!</h3>
            <p className="text-[11px] text-accent/50 leading-relaxed mb-6">
              Tu pedido fue enviado por WhatsApp. El equipo Berakah te confirmará en breve 🌿
            </p>
            <button
              onClick={() => { setStep(STEPS.MAIN); setStepHistory([]); setOrderData({ name: '', address: '', payment: '' }); setGeoStatus('idle'); }}
              className="text-[10px] uppercase tracking-widest text-gold underline"
            >
              Volver al inicio
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  const showBack = step !== STEPS.MAIN && step !== STEPS.CK_DONE;

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      {/* Botón flotante */}
      <button
        onClick={isOpen ? () => setIsOpen(false) : handleOpen}
        className="w-16 h-16 bg-accent text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-gold transition-all duration-500 relative"
        style={{ boxShadow: '0 8px 32px rgba(90,68,45,0.35)' }}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        {!isOpen && cartItems.length > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold text-white text-[9px] font-bold rounded-full flex items-center justify-center">
            {cartItems.length}
          </span>
        )}
      </button>

      {/* Ventana del chat */}
      {isOpen && (
        <div
          className="absolute bottom-20 right-0 w-[340px] bg-white rounded-2xl overflow-hidden flex flex-col"
          style={{
            boxShadow: '0 24px 64px rgba(90,68,45,0.25), 0 4px 16px rgba(0,0,0,0.08)',
            maxHeight: '580px',
          }}
        >
          {/* Header */}
          <div className="bg-accent px-5 py-4 text-white flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle size={16} />
              </div>
              <div>
                <h4 className="font-serif text-base leading-tight">Asistente Berakah</h4>
                <p className="text-[9px] uppercase tracking-widest opacity-50">México Artesanal</p>
              </div>
            </div>
            <div className="w-2 h-2 bg-[#25D366] rounded-full" title="En línea" />
          </div>

          {/* Mensajes */}
          <div className="flex-1 overflow-y-auto p-4" style={{ minHeight: '200px', maxHeight: '440px' }}>
            {showBack && (
              <button
                onClick={goBack}
                className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-accent/30 hover:text-accent mb-4 transition-colors"
              >
                <ArrowLeft size={12} /> Volver
              </button>
            )}
            {renderContent()}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer */}
          <div className="px-4 py-2 bg-accent/5 border-t border-accent/10 flex-shrink-0">
            <p className="text-[9px] text-accent/30 text-center uppercase tracking-tighter">
              Berakah Boutique Artesanal · México 🌿
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
