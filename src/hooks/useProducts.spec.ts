/* eslint-disable @typescript-eslint/no-explicit-any */
import { renderHook, waitFor } from '@testing-library/react';
import { useProducts } from './useProducts';

// Mock fetch
global.fetch = vi.fn();

describe('useProducts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch products successfully', async () => {
    const mockProducts = [
      {
        index: 0,
        isSale: false,
        price: '$49.99',
        productImage: 'Product_1.webp',
        productName: 'Pure Blonde Crate',
        type: 'Beer',
      },
    ];

    // Mock successful fetch
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducts,
    });

    const { result } = renderHook(() => useProducts());

    // Initially loading
    expect(result.current.loading).toBe(true);
    expect(result.current.products).toEqual([]);
    expect(result.current.error).toBe(null);

    // Wait for fetch to complete (with longer timeout for the 1s delay)
    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
      },
      { timeout: 1500 }
    );

    expect(result.current.products).toEqual(mockProducts);
    expect(result.current.error).toBe(null);
  });

  it('should handle fetch error', async () => {
    // Mock failed fetch
    (global.fetch as any).mockRejectedValueOnce(new Error('Failed to fetch'));

    const { result } = renderHook(() => useProducts());

    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
      },
      { timeout: 2000 }
    );

    expect(result.current.products).toEqual([]);
    expect(result.current.error).toBe('Failed to fetch');
  });
});
