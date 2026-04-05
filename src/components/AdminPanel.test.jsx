import { renderHook, act } from '@testing-library/react';
import { useAdminProducts } from './AdminPanel';
import { products as defaultProducts } from '../data/products';

// Mock the localStorage
const localStorageMock = (function () {
  let store = {};
  return {
    getItem: function (key) {
      return store[key] || null;
    },
    setItem: function (key, value) {
      store[key] = value.toString();
    },
    removeItem: function (key) {
      delete store[key];
    },
    clear: function () {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

describe('useAdminProducts', () => {
  beforeEach(() => {
    window.localStorage.clear();
    // Reset spy if applied in tests
    vi.restoreAllMocks();
  });

  it('loads default products if localStorage is empty', () => {
    const { result } = renderHook(() => useAdminProducts());
    expect(result.current.products).toEqual(defaultProducts);
  });

  it('loads products from localStorage successfully', () => {
    const mockProducts = [
      { id: '1', name: 'Mock Product 1', price: 100, category: 'Bolsas' },
    ];
    window.localStorage.setItem('berakah_products_override', JSON.stringify(mockProducts));

    const { result } = renderHook(() => useAdminProducts());
    expect(result.current.products).toEqual(mockProducts);
  });

  it('falls back to default products if JSON.parse throws an error (e.g. invalid JSON)', () => {
    window.localStorage.setItem('berakah_products_override', 'invalid-json');

    const { result } = renderHook(() => useAdminProducts());
    expect(result.current.products).toEqual(defaultProducts);
  });

  it('falls back to default products if localStorage.getItem throws an error', () => {
    const getItemSpy = vi.spyOn(window.localStorage, 'getItem').mockImplementation(() => {
      throw new Error('localStorage is disabled or inaccessible');
    });

    const { result } = renderHook(() => useAdminProducts());
    expect(result.current.products).toEqual(defaultProducts);

    getItemSpy.mockRestore();
  });

  it('saves new product and updates products list', () => {
    const { result } = renderHook(() => useAdminProducts());
    const newProduct = { name: 'New Bag', price: 250, category: 'Bandoleras' };

    act(() => {
      result.current.addProduct(newProduct);
    });

    // It adds new product at the beginning
    expect(result.current.products[0]).toMatchObject(newProduct);
    expect(result.current.products[0].id).toBeDefined();

    // Check localStorage
    const stored = JSON.parse(window.localStorage.getItem('berakah_products_override'));
    expect(stored[0]).toMatchObject(newProduct);
  });
});
