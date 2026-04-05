import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Catalog from './Catalog';
import { products as defaultProducts } from '../data/products';

// Mock GSAP
vi.mock('gsap', () => {
  return {
    default: {
      registerPlugin: vi.fn(),
      to: vi.fn(),
      fromTo: vi.fn(),
    }
  };
});
vi.mock('gsap/ScrollTrigger', () => {
  return {
    ScrollTrigger: {}
  };
});

// Mock console.error to avoid cluttering test output during expected errors
const originalConsoleError = console.error;

describe('Catalog Component', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    console.error = vi.fn(); // Mock console.error
  });

  afterEach(() => {
    vi.restoreAllMocks();
    console.error = originalConsoleError;
  });

  it('renders successfully with default products when localStorage is empty', () => {
    render(<Catalog onAddToCart={() => {}} />);

    // Check if the title is rendered
    expect(screen.getByText('Nuestra Selección')).toBeInTheDocument();

    // Check if default products are rendered
    // We'll check for the first product's name
    if (defaultProducts.length > 0) {
      expect(screen.getByText(defaultProducts[0].name)).toBeInTheDocument();
    }
  });

  it('renders successfully using overridden products from localStorage', () => {
    const overrideProducts = [
      {
        id: 'mock-id-1',
        name: 'Mock Overridden Product',
        category: 'Bandoleras',
        image: '/mock-image.jpg',
        price: 999,
        description: 'Mock Description'
      }
    ];

    localStorage.setItem('berakah_products_override', JSON.stringify(overrideProducts));

    render(<Catalog onAddToCart={() => {}} />);

    // Check if the overridden product is rendered
    expect(screen.getByText('Mock Overridden Product')).toBeInTheDocument();
  });

  it('falls back to default products when localStorage.getItem throws an error', () => {
    // Mock localStorage.getItem to throw an error
    const getItemSpy = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('Access to localStorage is denied');
    });

    render(<Catalog onAddToCart={() => {}} />);

    // Check if it fell back to default products
    if (defaultProducts.length > 0) {
      expect(screen.getByText(defaultProducts[0].name)).toBeInTheDocument();
    }

    getItemSpy.mockRestore();
  });

  it('falls back to default products when localStorage contains invalid JSON', () => {
    // Set invalid JSON in localStorage
    localStorage.setItem('berakah_products_override', '{ invalid json ]');

    render(<Catalog onAddToCart={() => {}} />);

    // Check if it fell back to default products
    if (defaultProducts.length > 0) {
      expect(screen.getByText(defaultProducts[0].name)).toBeInTheDocument();
    }
  });
});
