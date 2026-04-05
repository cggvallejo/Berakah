import { describe, it, expect } from 'vitest';
import { buildWhatsAppMessage } from './CartModal.jsx';

describe('buildWhatsAppMessage', () => {
  it('should generate correctly formatted WhatsApp message (Happy Path)', () => {
    const items = [
      { name: 'Producto A', price: 1000 },
      { name: 'Producto B', price: 500 }
    ];
    const data = {
      name: 'Juan Perez',
      address: 'Calle Falsa 123',
      payment: 'mercadopago'
    };

    const encodedResult = buildWhatsAppMessage(items, data);
    const result = decodeURIComponent(encodedResult);

    expect(result).toContain(`• Producto A — $${(1000).toLocaleString()} MXN`);
    expect(result).toContain(`• Producto B — $${(500).toLocaleString()} MXN`);
    expect(result).toContain(`💰 *Total: $${(1500).toLocaleString()} MXN*`);
    expect(result).toContain('👤 *Cliente:* Juan Perez');
    expect(result).toContain('📍 *Dirección:* Calle Falsa 123');
    expect(result).toContain('💳 *Pago preferido:* Mercado Pago / Libre');
  });

  it('should use default price (850) when item price is missing', () => {
    const items = [
      { name: 'Producto Sin Precio' }
    ];
    const data = {
      name: 'Maria Gomez',
      address: 'Av Siempre Viva 742',
      payment: 'efectivo'
    };

    const encodedResult = buildWhatsAppMessage(items, data);
    const result = decodeURIComponent(encodedResult);

    expect(result).toContain(`• Producto Sin Precio — $${(850).toLocaleString()} MXN`);
    expect(result).toContain(`💰 *Total: $${(850).toLocaleString()} MXN*`);
    expect(result).toContain('💳 *Pago preferido:* Efectivo / Terminal');
  });

  it('should handle empty items array', () => {
    const items = [];
    const data = {
      name: 'Carlos Ruiz',
      address: 'Su casa',
      payment: 'transferencia'
    };

    const encodedResult = buildWhatsAppMessage(items, data);
    const result = decodeURIComponent(encodedResult);

    expect(result).toContain('📦 *Productos:*\n\n\n'); // No items logic will just show empty lines
    expect(result).toContain(`💰 *Total: $${(0).toLocaleString()} MXN*`);
    expect(result).toContain('💳 *Pago preferido:* Transferencia Bancaria');
  });

  it('should use raw string when payment method does not match a known ID', () => {
    const items = [
      { name: 'Producto X', price: 200 }
    ];
    const data = {
      name: 'Ana Silva',
      address: 'Centro',
      payment: 'Otro Metodo Raro'
    };

    const encodedResult = buildWhatsAppMessage(items, data);
    const result = decodeURIComponent(encodedResult);

    expect(result).toContain('💳 *Pago preferido:* Otro Metodo Raro');
  });
});
