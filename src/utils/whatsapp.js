// ─── CONFIG ──────────────────────────────────────────────────────────────────
export const WA_NUMBER = '5219990000000'; // ← Cambiar por el número real del negocio

/**
 * Builds the WhatsApp message text.
 *
 * @param {Array} items - List of cart items.
 * @param {Object} data - Contains customer details: name, address, and payment method string or object.
 * @param {string} payLabel - The resolved label for the payment method.
 * @returns {string} The URI encoded WhatsApp message.
 */
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
