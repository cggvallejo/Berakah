import { Wallet, Landmark, CreditCard } from 'lucide-react';

export const WA_NUMBER = '5219990000000'; // ← Cambiar por el número real del negocio

export const PAYMENT_METHODS = [
  { id: 'mercadopago', label: 'Mercado Pago / Libre', sublabel: 'Pago seguro en línea', Icon: Wallet, color: '#3483fa' },
  { id: 'transferencia', label: 'Transferencia Bancaria', sublabel: 'CLABE al confirmar', Icon: Landmark, color: '#2d6a4f' },
  { id: 'efectivo', label: 'Efectivo / Terminal', sublabel: 'Pago al recibir', Icon: CreditCard, color: '#b5855c' },
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
    `_Pedido enviado desde Berakah Boutique 🌿_`
  );
}
