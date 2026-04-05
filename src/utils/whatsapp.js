import { settings } from '../data/settings.js';

export const WA_NUMBER = '52' + settings.phones[0].number;

export function buildWhatsAppMessage(items, data, payLabel) {
  const lines = items.map(i => `• ${i.name} — $${(i.price || 850).toLocaleString()} MXN`).join('\n');
  const total = items.reduce((acc, i) => acc + (i.price || 850), 0);

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
