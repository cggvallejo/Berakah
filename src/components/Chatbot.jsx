import React, { useState, useRef, useEffect } from 'react';
import {
  MessageCircle, X, ChevronRight, CreditCard, ShoppingCart,
  HelpCircle, MapPin, User, CheckCircle, Send, ArrowLeft,
  Landmark, Wallet, Navigation, Edit3, Package, Phone,
  Star, Sparkles, Heart
} from 'lucide-react';

// ─── CONFIGURACIÓN ────────────────────────────────────────────────
const WA_NUMBER = '5219990000000'; // ← Cambiar por el número real

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
  { id: 'mercadopago', label: 'Mercado Pago', sublabel: 'Todas las tarjetas · Pago seguro', icon: <Wallet size={15} />, color: '#3483fa' },
  { id: 'transferencia', label: 'Transferencia Bancaria', sublabel: 'Te enviamos la CLABE al confirmar', icon: <Landmark size={15} />, color: '#2d6a4f' },
  { id: 'efectivo', label: 'Efectivo / Terminal', sublabel: 'Disponible en entregas locales', icon: <CreditCard size={15} />, color: '#b5855c' },
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
    `_Pedido enviado desde Berakah Boutique 🌿_`
  );
}

// ─── AVATAR DEL BOT ───────────────────────────────────────────────
function BotAvatar() {
  return (
    <div
      className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
      style={{ background: 'linear-gradient(135deg, #4a3728 0%, #b5855c 100%)', boxShadow: '0 2px 8px rgba(74,55,40,0.3)' }}
    >
      <span style={{ color: '#fff', fontSize: '9px', fontWeight: 800, letterSpacing: '-0.02em' }}>B</span>
    </div>
  );
}

// ─── BURBUJA BOT ─────────────────────────────────────────────────
function BubbleBot({ text, delay = 0 }) {
  const [visible, setVisible] = useState(delay === 0);
  const [typing, setTyping] = useState(delay > 0);

  useEffect(() => {
    if (delay > 0) {
      const t1 = setTimeout(() => setTyping(true), 0);
      const t2 = setTimeout(() => { setTyping(false); setVisible(true); }, delay);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [delay]);

  return (
    <div className="flex gap-2 mb-3" style={{ animation: 'botIn 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards' }}>
      <BotAvatar />
      {typing && !visible ? (
        <div style={{ background: 'rgba(74,55,40,0.06)', borderRadius: '16px 16px 16px 4px', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '4px' }}>
          {[0, 1, 2].map(i => (
            <span key={i} style={{ width: 6, height: 6, background: '#b5855c', borderRadius: '50%', display: 'inline-block', animation: `typingDot 1.2s ${i * 0.2}s infinite` }} />
          ))}
        </div>
      ) : visible ? (
        <div style={{ background: 'rgba(74,55,40,0.06)', borderRadius: '16px 16px 16px 4px', padding: '10px 14px', maxWidth: '82%' }}>
          <p style={{ fontSize: '12px', lineHeight: 1.55, color: '#4a3728' }}>{text}</p>
        </div>
      ) : null}
    </div>
  );
}

// ─── BURBUJA USUARIO ─────────────────────────────────────────────
function BubbleUser({ text }) {
  return (
    <div className="flex justify-end mb-3" style={{ animation: 'userIn 0.3s ease forwards' }}>
      <div style={{ background: 'linear-gradient(135deg, #4a3728 0%, #6b4c35 100%)', borderRadius: '16px 16px 4px 16px', padding: '10px 14px', maxWidth: '82%' }}>
        <p style={{ fontSize: '12px', lineHeight: 1.55, color: '#fff' }}>{text}</p>
      </div>
    </div>
  );
}

// ─── BOTÓN DE OPCIÓN ─────────────────────────────────────────────
function OptionButton({ onClick, icon, label, sublabel, color, disabled = false, badge }) {
  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '11px 14px',
        borderRadius: '12px',
        border: '1px solid rgba(74,55,40,0.1)',
        background: disabled ? 'rgba(74,55,40,0.02)' : '#fff',
        cursor: disabled ? 'not-allowed' : 'pointer',
        marginBottom: '8px',
        transition: 'all 0.25s ease',
        opacity: disabled ? 0.55 : 1,
        textAlign: 'left',
        boxShadow: disabled ? 'none' : '0 1px 4px rgba(0,0,0,0.04)',
      }}
      onMouseEnter={e => { if (!disabled) { e.currentTarget.style.borderColor = '#d4af37'; e.currentTarget.style.background = '#fdfcf8'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(74,55,40,0.1)'; } }}
      onMouseLeave={e => { if (!disabled) { e.currentTarget.style.borderColor = 'rgba(74,55,40,0.1)'; e.currentTarget.style.background = '#fff'; e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)'; } }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ color: color || '#b5855c', display: 'flex', alignItems: 'center' }}>{icon}</span>
        <div>
          <p style={{ fontSize: '12px', fontWeight: 600, color: '#2a1f17', marginBottom: sublabel ? '2px' : 0 }}>{label}</p>
          {sublabel && <p style={{ fontSize: '10px', color: 'rgba(74,55,40,0.45)' }}>{sublabel}</p>}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        {badge && (
          <span style={{ fontSize: '9px', background: '#d4af37', color: '#fff', padding: '2px 7px', borderRadius: '20px', fontWeight: 700 }}>{badge}</span>
        )}
        <ChevronRight size={14} style={{ color: 'rgba(74,55,40,0.25)' }} />
      </div>
    </button>
  );
}

// ─── SEPARADOR ───────────────────────────────────────────────────
function Divider({ label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '12px 0' }}>
      <div style={{ flex: 1, height: '1px', background: 'rgba(74,55,40,0.08)' }} />
      {label && <span style={{ fontSize: '9px', color: 'rgba(74,55,40,0.35)', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700 }}>{label}</span>}
      <div style={{ flex: 1, height: '1px', background: 'rgba(74,55,40,0.08)' }} />
    </div>
  );
}

// ─── BOTÓN PRIMARIO ───────────────────────────────────────────────
function PrimaryBtn({ onClick, children, disabled = false, green = false }) {
  const base = green
    ? { background: 'linear-gradient(135deg, #25D366 0%, #1ebe5d 100%)', color: '#fff' }
    : { background: 'linear-gradient(135deg, #4a3728 0%, #6b4c35 100%)', color: '#fff' };
  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      style={{
        width: '100%',
        padding: '13px 20px',
        borderRadius: '12px',
        fontWeight: 700,
        fontSize: '11px',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1,
        transition: 'all 0.25s ease',
        boxShadow: disabled ? 'none' : green ? '0 4px 16px rgba(37,211,102,0.3)' : '0 4px 16px rgba(74,55,40,0.25)',
        ...base,
      }}
    >
      {children}
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
  const [geoStatus, setGeoStatus] = useState('idle');
  const [geoText, setGeoText] = useState('');
  const [pulse, setPulse] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 80);
  }, [step]);

  // Pulso periódico en el botón flotante cuando hay items
  useEffect(() => {
    if (cartItems.length > 0 && !isOpen) {
      const t = setInterval(() => { setPulse(true); setTimeout(() => setPulse(false), 600); }, 4000);
      return () => clearInterval(t);
    }
  }, [cartItems.length, isOpen]);

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
    setGeoStatus('idle');
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
      () => setGeoStatus('error')
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

  // ─── CONTENIDO POR PASO ───────────────────────────────────────
  const renderContent = () => {
    switch (step) {

      // ── MENÚ PRINCIPAL ─────────────────────────────────────────
      case STEPS.MAIN:
        return (
          <>
            <BubbleBot text="¡Hola! Soy tu asistente personal Berakah 🌿 Estoy aquí para ayudarte a encontrar la pieza artesanal perfecta y acompañarte en tu compra." />
            <Divider label="¿Qué necesitas?" />
            <OptionButton
              onClick={() => canCheckout ? goTo(STEPS.CK_SUMMARY) : null}
              disabled={!canCheckout}
              icon={<ShoppingCart size={15} />}
              label="Realizar mi pedido"
              sublabel={canCheckout ? `${cartItems.length} pieza${cartItems.length > 1 ? 's' : ''} en tu bolsa` : 'Agrega productos al catálogo'}
              color="#b5855c"
              badge={canCheckout ? `$${total.toLocaleString()}` : undefined}
            />
            <OptionButton
              onClick={() => goTo(STEPS.INFO_BUY)}
              icon={<HelpCircle size={15} />}
              label="¿Cómo comprar?"
              sublabel="Guía rápida paso a paso"
              color="#4a3728"
            />
            <OptionButton
              onClick={() => goTo(STEPS.INFO_PAY)}
              icon={<CreditCard size={15} />}
              label="Métodos de pago"
              sublabel="Mercado Pago · Transferencia · Efectivo"
              color="#3483fa"
            />
            <OptionButton
              onClick={() => goTo(STEPS.INFO_SHIP)}
              icon={<Package size={15} />}
              label="Envíos y garantía"
              sublabel="A toda la República Mexicana"
              color="#2d6a4f"
            />
          </>
        );

      // ── INFO: CÓMO COMPRAR ─────────────────────────────────────
      case STEPS.INFO_BUY:
        return (
          <>
            <BubbleBot text="Comprar en Berakah es muy sencillo 🛍️ Te explico el proceso:" />
            <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { n: '1', t: 'Explora el catálogo', d: 'Navega por nuestras 4 categorías artesanales y encuentra tu pieza ideal.', icon: <Star size={11} /> },
                { n: '2', t: 'Agrega al carrito', d: 'Haz clic en el ícono de bolsa en cada producto para añadirlo.', icon: <Heart size={11} /> },
                { n: '3', t: 'Confirma tu pedido', d: 'Abre el asistente → "Realizar mi pedido" y sigue los pasos.', icon: <MessageCircle size={11} /> },
                { n: '4', t: 'Confirma por WhatsApp', d: 'Recibirás confirmación directa del equipo Berakah en minutos.', icon: <CheckCircle size={11} /> },
              ].map(item => (
                <div key={item.n} style={{ display: 'flex', gap: '12px', padding: '12px', background: 'rgba(74,55,40,0.04)', borderRadius: '12px', alignItems: 'flex-start' }}>
                  <span style={{ width: 24, height: 24, background: 'linear-gradient(135deg, #d4af37 0%, #b5855c 100%)', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 800, flexShrink: 0 }}>{item.n}</span>
                  <div>
                    <p style={{ fontSize: '12px', fontWeight: 700, color: '#2a1f17', marginBottom: '2px' }}>{item.t}</p>
                    <p style={{ fontSize: '11px', color: 'rgba(74,55,40,0.5)', lineHeight: 1.4 }}>{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '14px' }}>
              <PrimaryBtn onClick={() => goTo(STEPS.MAIN)}>← Volver al menú</PrimaryBtn>
            </div>
          </>
        );

      // ── INFO: MÉTODOS DE PAGO ──────────────────────────────────
      case STEPS.INFO_PAY:
        return (
          <>
            <BubbleBot text="Aceptamos los siguientes métodos de pago 💳 Elige el que más te convenga:" />
            <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {PAYMENT_METHODS.map((m, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px', padding: '12px', background: 'rgba(74,55,40,0.04)', borderRadius: '12px', alignItems: 'flex-start' }}>
                  <span style={{ color: m.color, display: 'flex', alignItems: 'center', marginTop: '2px' }}>{m.icon}</span>
                  <div>
                    <p style={{ fontSize: '12px', fontWeight: 700, color: '#2a1f17', marginBottom: '2px' }}>{m.label}</p>
                    <p style={{ fontSize: '11px', color: 'rgba(74,55,40,0.5)', lineHeight: 1.4 }}>{m.sublabel}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '14px' }}>
              <PrimaryBtn onClick={() => goTo(STEPS.MAIN)}>← Volver al menú</PrimaryBtn>
            </div>
          </>
        );

      // ── INFO: ENVÍOS ───────────────────────────────────────────
      case STEPS.INFO_SHIP:
        return (
          <>
            <BubbleBot text="Información de envíos y garantía Berakah 📦" />
            <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { t: '🇲🇽 Cobertura nacional', d: 'Enviamos a toda la República Mexicana vía Estafeta o FedEx.' },
                { t: '⏱ Tiempo de entrega', d: '3 a 5 días hábiles después de confirmar y acreditar el pago.' },
                { t: '🌿 Garantía artesanal', d: 'Cada pieza es única. 30 días de garantía por defecto de fabricación.' },
                { t: '💰 Costo de envío', d: 'Se calcula según tu ubicación al confirmar el pedido.' },
              ].map((m, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', padding: '12px', background: 'rgba(74,55,40,0.04)', borderRadius: '12px' }}>
                  <div>
                    <p style={{ fontSize: '12px', fontWeight: 700, color: '#2a1f17', marginBottom: '2px' }}>{m.t}</p>
                    <p style={{ fontSize: '11px', color: 'rgba(74,55,40,0.5)', lineHeight: 1.4 }}>{m.d}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '14px' }}>
              <PrimaryBtn onClick={() => goTo(STEPS.MAIN)}>← Volver al menú</PrimaryBtn>
            </div>
          </>
        );

      // ── CHECKOUT: RESUMEN ──────────────────────────────────────
      case STEPS.CK_SUMMARY:
        return (
          <>
            <BubbleBot text={`¡Excelente selección! 🌿 Aquí está tu bolsa con ${cartItems.length} pieza${cartItems.length > 1 ? 's' : ''} artesanal${cartItems.length > 1 ? 'es' : ''}:`} />
            <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {cartItems.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', padding: '10px', background: 'rgba(74,55,40,0.04)', borderRadius: '12px', alignItems: 'center' }}>
                  <img src={item.image} alt={item.name} style={{ width: 44, height: 52, objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: '11px', fontWeight: 700, color: '#2a1f17', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</p>
                    <p style={{ fontSize: '9px', color: 'rgba(74,55,40,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '2px 0' }}>{item.category}</p>
                    <p style={{ fontSize: '13px', fontFamily: 'Cormorant Garamond, serif', color: '#b5855c', fontWeight: 600 }}>${(item.price || 850).toLocaleString()} MXN</p>
                  </div>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 4px', borderTop: '1px solid rgba(74,55,40,0.1)', marginTop: '4px' }}>
                <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'rgba(74,55,40,0.4)', fontWeight: 700 }}>Total estimado</span>
                <span style={{ fontSize: '20px', fontFamily: 'Cormorant Garamond, serif', color: '#4a3728', fontWeight: 600 }}>${total.toLocaleString()} <span style={{ fontSize: '12px' }}>MXN</span></span>
              </div>
            </div>
            <div style={{ marginTop: '12px' }}>
              <PrimaryBtn onClick={() => goTo(STEPS.CK_NAME)}>
                Continuar con el pedido →
              </PrimaryBtn>
              <p style={{ fontSize: '10px', color: 'rgba(74,55,40,0.35)', textAlign: 'center', marginTop: '8px' }}>
                Podrás confirmar los detalles antes de enviar
              </p>
            </div>
          </>
        );

      // ── CHECKOUT: NOMBRE ───────────────────────────────────────
      case STEPS.CK_NAME:
        return (
          <>
            <BubbleBot text="¿A nombre de quién realizamos el pedido? 👤" />
            {orderData.name && <BubbleUser text={orderData.name} />}
            <div style={{ marginTop: '12px' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <div style={{ flex: 1, position: 'relative' }}>
                  <User size={13} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(74,55,40,0.3)' }} />
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && submitName()}
                    placeholder="Tu nombre completo"
                    autoFocus
                    style={{
                      width: '100%',
                      paddingLeft: '34px',
                      paddingRight: '12px',
                      paddingTop: '12px',
                      paddingBottom: '12px',
                      fontSize: '12px',
                      border: '1.5px solid rgba(74,55,40,0.15)',
                      borderRadius: '12px',
                      outline: 'none',
                      fontFamily: 'Montserrat, sans-serif',
                      background: '#fdfcf8',
                      color: '#2a1f17',
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={e => e.target.style.borderColor = '#d4af37'}
                    onBlur={e => e.target.style.borderColor = 'rgba(74,55,40,0.15)'}
                  />
                </div>
                <button
                  onClick={submitName}
                  disabled={!inputValue.trim()}
                  style={{
                    width: '44px',
                    height: '44px',
                    background: inputValue.trim() ? 'linear-gradient(135deg, #4a3728 0%, #6b4c35 100%)' : 'rgba(74,55,40,0.1)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: 'none',
                    cursor: inputValue.trim() ? 'pointer' : 'not-allowed',
                    transition: 'all 0.25s ease',
                    flexShrink: 0,
                  }}
                >
                  <Send size={14} style={{ color: inputValue.trim() ? '#fff' : 'rgba(74,55,40,0.3)' }} />
                </button>
              </div>
            </div>
          </>
        );

      // ── CHECKOUT: DIRECCIÓN ────────────────────────────────────
      case STEPS.CK_ADDRESS:
        return (
          <>
            <BubbleUser text={orderData.name} />
            <BubbleBot text={`¡Gracias, ${orderData.name}! 🙌 ¿Cómo prefieres indicar tu dirección de envío?`} />
            <div style={{ marginTop: '10px' }}>
              <OptionButton
                onClick={() => goTo(STEPS.CK_ADDRESS_GEO)}
                icon={<Navigation size={15} />}
                label="Usar mi ubicación GPS"
                sublabel="Automático · Más preciso"
                color="#2d6a4f"
              />
              <OptionButton
                onClick={() => goTo(STEPS.CK_ADDRESS_MANUAL)}
                icon={<Edit3 size={15} />}
                label="Escribir mi dirección"
                sublabel="Calle, número, ciudad, estado"
                color="#4a3728"
              />
            </div>
          </>
        );

      // ── CHECKOUT: GEOLOCALIZACIÓN ──────────────────────────────
      case STEPS.CK_ADDRESS_GEO:
        return (
          <>
            <BubbleBot text="Vamos a obtener tu ubicación actual para precisar el envío 📍" />
            {geoStatus === 'idle' && (
              <button
                onClick={handleGeolocate}
                style={{ width: '100%', marginTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'rgba(45,106,79,0.06)', border: '1.5px dashed rgba(45,106,79,0.3)', color: '#2d6a4f', padding: '16px 20px', borderRadius: '12px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.25s ease' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(45,106,79,0.1)'; e.currentTarget.style.borderColor = '#2d6a4f'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(45,106,79,0.06)'; e.currentTarget.style.borderColor = 'rgba(45,106,79,0.3)'; }}
              >
                <Navigation size={16} /> Permitir acceso a ubicación
              </button>
            )}
            {geoStatus === 'loading' && (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <div style={{ width: 32, height: 32, border: '2.5px solid rgba(212,175,55,0.2)', borderTopColor: '#d4af37', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 10px' }} />
                <p style={{ fontSize: '11px', color: 'rgba(74,55,40,0.45)' }}>Obteniendo tu ubicación...</p>
              </div>
            )}
            {geoStatus === 'success' && (
              <>
                <div style={{ marginTop: '12px', padding: '12px', background: 'rgba(37,211,102,0.06)', border: '1px solid rgba(37,211,102,0.2)', borderRadius: '12px' }}>
                  <p style={{ fontSize: '12px', fontWeight: 700, color: '#1a8a42' }}>✅ Ubicación capturada con éxito</p>
                  <p style={{ fontSize: '10px', color: '#2d6a4f', marginTop: '4px' }}>{geoText}</p>
                </div>
                <div style={{ marginTop: '12px' }}>
                  <PrimaryBtn onClick={() => goTo(STEPS.CK_PAYMENT)}>Continuar →</PrimaryBtn>
                </div>
              </>
            )}
            {geoStatus === 'error' && (
              <>
                <div style={{ marginTop: '12px', padding: '12px', background: 'rgba(206,17,38,0.05)', border: '1px solid rgba(206,17,38,0.15)', borderRadius: '12px' }}>
                  <p style={{ fontSize: '12px', color: '#c0392b' }}>⚠️ No pudimos acceder a tu ubicación. Puedes escribirla manualmente.</p>
                </div>
                <div style={{ marginTop: '12px' }}>
                  <PrimaryBtn onClick={() => { setGeoStatus('idle'); goTo(STEPS.CK_ADDRESS_MANUAL); }}>
                    Escribir dirección manualmente
                  </PrimaryBtn>
                </div>
              </>
            )}
          </>
        );

      // ── CHECKOUT: DIRECCIÓN MANUAL ─────────────────────────────
      case STEPS.CK_ADDRESS_MANUAL:
        return (
          <>
            <BubbleBot text="Escribe tu dirección completa de envío 🏠" />
            <p style={{ fontSize: '10px', color: 'rgba(74,55,40,0.4)', marginBottom: '10px', marginLeft: '36px', lineHeight: 1.4 }}>
              Ej: Calle Juárez 45 Int. 3, Col. Centro, Mérida, Yucatán, CP 97000
            </p>
            <div style={{ position: 'relative' }}>
              <MapPin size={13} style={{ position: 'absolute', left: '12px', top: '13px', color: 'rgba(74,55,40,0.3)' }} />
              <textarea
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                placeholder="Dirección completa..."
                rows={3}
                autoFocus
                style={{
                  width: '100%',
                  paddingLeft: '34px',
                  paddingRight: '12px',
                  paddingTop: '12px',
                  paddingBottom: '12px',
                  fontSize: '12px',
                  border: '1.5px solid rgba(74,55,40,0.15)',
                  borderRadius: '12px',
                  outline: 'none',
                  fontFamily: 'Montserrat, sans-serif',
                  background: '#fdfcf8',
                  color: '#2a1f17',
                  resize: 'none',
                  lineHeight: 1.5,
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => e.target.style.borderColor = '#d4af37'}
                onBlur={e => e.target.style.borderColor = 'rgba(74,55,40,0.15)'}
              />
            </div>
            <div style={{ marginTop: '10px' }}>
              <PrimaryBtn onClick={submitManualAddress} disabled={!inputValue.trim()}>
                Confirmar dirección →
              </PrimaryBtn>
            </div>
          </>
        );

      // ── CHECKOUT: MÉTODO DE PAGO ───────────────────────────────
      case STEPS.CK_PAYMENT:
        return (
          <>
            <BubbleUser text={orderData.address.length > 60 ? orderData.address.slice(0, 57) + '...' : orderData.address} />
            <BubbleBot text="¡Perfecto! ¿Cuál es tu método de pago preferido? 💳" />
            <div style={{ marginTop: '10px' }}>
              {PAYMENT_METHODS.map(method => (
                <OptionButton
                  key={method.id}
                  onClick={() => submitPayment(method.id)}
                  icon={method.icon}
                  label={method.label}
                  sublabel={method.sublabel}
                  color={method.color}
                />
              ))}
            </div>
          </>
        );

      // ── CHECKOUT: CONFIRMACIÓN ─────────────────────────────────
      case STEPS.CK_CONFIRM: {
        const payLabel = PAYMENT_METHODS.find(p => p.id === orderData.payment)?.label || '';
        return (
          <>
            <BubbleBot text="¡Todo listo! Revisa el resumen de tu pedido antes de enviarlo 📋" />
            <div style={{ marginTop: '10px' }}>
              {/* Resumen del pedido */}
              <div style={{ background: 'rgba(74,55,40,0.04)', borderRadius: '14px', padding: '14px', marginBottom: '10px', border: '1px solid rgba(74,55,40,0.08)' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <User size={12} style={{ color: '#d4af37', marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <p style={{ fontSize: '9px', color: 'rgba(74,55,40,0.4)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700 }}>Cliente</p>
                    <p style={{ fontSize: '12px', fontWeight: 600, color: '#2a1f17' }}>{orderData.name}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <MapPin size={12} style={{ color: '#d4af37', marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <p style={{ fontSize: '9px', color: 'rgba(74,55,40,0.4)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700 }}>Dirección de envío</p>
                    <p style={{ fontSize: '12px', color: '#2a1f17', lineHeight: 1.4 }}>{orderData.address}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', paddingBottom: '10px', borderBottom: '1px solid rgba(74,55,40,0.08)' }}>
                  <CreditCard size={12} style={{ color: '#d4af37', marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <p style={{ fontSize: '9px', color: 'rgba(74,55,40,0.4)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700 }}>Método de pago</p>
                    <p style={{ fontSize: '12px', fontWeight: 600, color: '#2a1f17' }}>{payLabel}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                  <span style={{ fontSize: '10px', color: 'rgba(74,55,40,0.4)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700 }}>Total del pedido</span>
                  <span style={{ fontSize: '20px', fontFamily: 'Cormorant Garamond, serif', color: '#4a3728', fontWeight: 600 }}>${total.toLocaleString()} MXN</span>
                </div>
              </div>

              <PrimaryBtn onClick={sendWhatsApp} green>
                <Phone size={15} /> Confirmar por WhatsApp
              </PrimaryBtn>
              <p style={{ fontSize: '10px', color: 'rgba(74,55,40,0.35)', textAlign: 'center', marginTop: '8px' }}>
                Al confirmar, se abrirá WhatsApp con tu pedido listo ✉️
              </p>
            </div>
          </>
        );
      }

      // ── CHECKOUT: DONE ─────────────────────────────────────────
      case STEPS.CK_DONE:
        return (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ width: 64, height: 64, background: 'linear-gradient(135deg, rgba(37,211,102,0.12) 0%, rgba(37,211,102,0.06) 100%)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: '0 0 0 8px rgba(37,211,102,0.05)' }}>
              <CheckCircle size={30} style={{ color: '#25D366' }} />
            </div>
            <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '22px', color: '#2a1f17', marginBottom: '8px', fontWeight: 600 }}>¡Pedido confirmado!</h3>
            <p style={{ fontSize: '12px', color: 'rgba(74,55,40,0.5)', lineHeight: 1.6, marginBottom: '20px' }}>
              Tu pedido fue enviado por WhatsApp 🌿<br />
              El equipo Berakah te confirmará en breve.
            </p>
            <div style={{ padding: '12px', background: 'rgba(74,55,40,0.04)', borderRadius: '10px', marginBottom: '20px' }}>
              <p style={{ fontSize: '10px', color: 'rgba(74,55,40,0.4)', letterSpacing: '0.08em' }}>
                Gracias por elegir artesanía mexicana auténtica ✨
              </p>
            </div>
            <button
              onClick={() => { setStep(STEPS.MAIN); setStepHistory([]); setOrderData({ name: '', address: '', payment: '' }); setGeoStatus('idle'); }}
              style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#b5855c', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700, textDecoration: 'underline', textUnderlineOffset: '3px' }}
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
    <>
      {/* ── ESTILOS KEYFRAMES + RESPONSIVE ── */}
      <style>{`
        @keyframes botIn { from { opacity: 0; transform: translateX(-8px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes userIn { from { opacity: 0; transform: translateX(8px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes typingDot { 0%,60%,100% { transform: translateY(0); opacity: 0.4; } 30% { transform: translateY(-4px); opacity: 1; } }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes chatOpen { from { opacity: 0; transform: translateY(16px) scale(0.96); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes pulseRing { 0%,100% { box-shadow: 0 8px 32px rgba(90,68,45,0.35); } 50% { box-shadow: 0 8px 40px rgba(212,175,55,0.5); } }
        .bk-chat-window {
          position: fixed;
          bottom: 100px;
          right: 24px;
          width: 360px;
          max-width: calc(100vw - 32px);
          max-height: min(600px, calc(100vh - 120px));
          background: #ffffff;
          border-radius: 20px;
          box-shadow: 0 24px 64px rgba(74,55,40,0.22), 0 8px 24px rgba(0,0,0,0.1);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          z-index: 1001;
          animation: chatOpen 0.32s cubic-bezier(0.34,1.4,0.64,1) forwards;
        }
        .bk-chat-body {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          overscroll-behavior: contain;
        }
        .bk-chat-body::-webkit-scrollbar { width: 4px; }
        .bk-chat-body::-webkit-scrollbar-track { background: transparent; }
        .bk-chat-body::-webkit-scrollbar-thumb { background: rgba(74,55,40,0.15); border-radius: 4px; }
        @media (max-width: 480px) {
          .bk-chat-window {
            right: 12px;
            left: 12px;
            width: auto;
            max-width: none;
            bottom: 90px;
            border-radius: 18px;
          }
        }
      `}</style>

      {/* ── BOTÓN FLOTANTE (siempre fixed, independiente) ── */}
      <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 1002 }}>
        <button
          onClick={isOpen ? () => setIsOpen(false) : handleOpen}
          style={{
            width: '56px',
            height: '56px',
            background: 'linear-gradient(135deg, #b5855c 0%, #4a3728 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            cursor: 'pointer',
            boxShadow: pulse ? '0 8px 36px rgba(212,175,55,0.5)' : '0 6px 24px rgba(74,55,40,0.35)',
            animation: pulse ? 'pulseRing 0.8s ease-in-out' : 'none',
            transition: 'all 0.3s ease',
            position: 'relative',
          }}
          aria-label={isOpen ? 'Cerrar asistente' : 'Abrir asistente Berakah'}
        >
          <MessageCircle size={22} color="#fff" />
          {cartItems.length > 0 && (
            <span style={{
              position: 'absolute', top: '-4px', right: '-4px',
              minWidth: 20, height: 20,
              padding: '0 4px',
              background: 'linear-gradient(135deg, #d4af37 0%, #b5855c 100%)',
              color: '#fff', fontSize: '9px', fontWeight: 800,
              borderRadius: '10px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '2px solid #fff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            }}>
              {cartItems.length > 9 ? '9+' : cartItems.length}
            </span>
          )}
        </button>
      </div>

      {/* ── VENTANA DEL CHAT (fixed independiente) ── */}
      {isOpen && (
        <div className="bk-chat-window">

          {/* HEADER */}
          <div style={{
            background: 'linear-gradient(135deg, #4a3728 0%, #2a1f17 100%)',
            padding: '14px 16px 12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
            borderRadius: '20px 20px 0 0',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
              <div style={{
                width: 36, height: 36,
                background: 'rgba(255,255,255,0.12)',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '1.5px solid rgba(255,255,255,0.2)',
                flexShrink: 0,
              }}>
                <Sparkles size={15} color="#d4af37" />
              </div>
              <div>
                <h4 style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '16px', fontWeight: 600,
                  color: '#fff', lineHeight: 1.15,
                  marginBottom: '3px',
                }}>
                  Asistente Berakah
                </h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{ width: 6, height: 6, background: '#25D366', borderRadius: '50%', flexShrink: 0 }} />
                  <p style={{ fontSize: '9px', color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.14em' }}>
                    En línea · México Artesanal
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                width: 30, height: 30,
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: 'none', cursor: 'pointer',
                transition: 'background 0.2s',
                flexShrink: 0,
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.22)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
              aria-label="Cerrar"
            >
              <X size={14} color="rgba(255,255,255,0.75)" />
            </button>
          </div>

          {/* PROGRESS BAR — solo durante checkout */}
          {[STEPS.CK_SUMMARY, STEPS.CK_NAME, STEPS.CK_ADDRESS,
            STEPS.CK_ADDRESS_GEO, STEPS.CK_ADDRESS_MANUAL,
            STEPS.CK_PAYMENT, STEPS.CK_CONFIRM, STEPS.CK_DONE
          ].includes(step) && (() => {
            const ckSteps = [STEPS.CK_SUMMARY, STEPS.CK_NAME, STEPS.CK_ADDRESS, STEPS.CK_PAYMENT, STEPS.CK_CONFIRM, STEPS.CK_DONE];
            const idx = ckSteps.indexOf(step);
            const pct = idx >= 0 ? Math.round(((idx + 1) / ckSteps.length) * 100) : 16;
            return (
              <div style={{ height: '3px', background: 'rgba(74,55,40,0.08)', flexShrink: 0 }}>
                <div style={{
                  height: '100%',
                  width: `${pct}%`,
                  background: 'linear-gradient(90deg, #b5855c, #d4af37)',
                  transition: 'width 0.45s cubic-bezier(0.4,0,0.2,1)',
                  borderRadius: '0 2px 2px 0',
                }} />
              </div>
            );
          })()}

          {/* CUERPO / MENSAJES */}
          <div className="bk-chat-body">
            {showBack && (
              <button
                onClick={goBack}
                style={{
                  display: 'flex', alignItems: 'center', gap: '5px',
                  fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em',
                  color: 'rgba(74,55,40,0.35)',
                  background: 'none', border: 'none', cursor: 'pointer',
                  marginBottom: '14px', padding: '4px 0',
                  fontWeight: 700, fontFamily: 'Montserrat, sans-serif',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#4a3728'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(74,55,40,0.35)'}
              >
                <ArrowLeft size={11} /> Volver
              </button>
            )}
            {renderContent()}
            <div ref={messagesEndRef} />
          </div>

          {/* FOOTER */}
          <div style={{
            padding: '9px 16px',
            background: 'rgba(74,55,40,0.025)',
            borderTop: '1px solid rgba(74,55,40,0.07)',
            flexShrink: 0, textAlign: 'center',
          }}>
            <p style={{ fontSize: '9px', color: 'rgba(74,55,40,0.28)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Berakah Boutique Artesanal · México 🌿
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;
