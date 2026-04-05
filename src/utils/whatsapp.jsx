import React from 'react';
import { Wallet, Landmark, CreditCard } from 'lucide-react';
import { settings } from '../data/settings.js';

export const WA_NUMBER = '52' + settings.phones[0].number;

export const PAYMENT_METHODS = [
  { id: 'mercadopago', label: 'Mercado Pago / Libre', sub: 'Pago seguro en línea', sublabel: 'Todas las tarjetas · Pago seguro', icon: <Wallet size={18} />, color: '#3483fa' },
  { id: 'transferencia', label: 'Transferencia Bancaria', sub: 'CLABE al confirmar', sublabel: 'Te enviamos la CLABE al confirmar', icon: <Landmark size={18} />, color: '#2d6a4f' },
  { id: 'efectivo', label: 'Efectivo / Terminal', sub: 'Pago al recibir', sublabel: 'Disponible en entregas locales', icon: <CreditCard size={18} />, color: '#b5855c' },
];

export function buildWhatsAppMessage(items, orderData, suffix = '_Pedido enviado desde Berakah Boutique_') {
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
    suffix
  );
}
