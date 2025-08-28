/* eslint-disable @typescript-eslint/no-explicit-any */
import { renderHook, act } from '@testing-library/react';
import { useProductFilters } from './useProductFilters';
import type { Product } from '@/types/product';

// Mock useDebounce to return value immediately for testing
vi.mock('./useDebounce', () => ({
  useDebounce: (value: any) => value,
}));

const mockProducts: Product[] = [
  {
    index: 0,
    productName: 'Pure Blonde Crate',
    type: 'Beer',
    price: '$49.99',
    productImage: 'Product_1.webp',
    isSale: false,
  },
  {
    index: 1,
    productName: 'Stella Artois Premium Lager',
    type: 'Beer',
    price: '$59.99',
    productImage: 'Product_2.webp',
    isSale: true,
  },
  {
    index: 2,
    productName: 'Chardonnay White Wine',
    type: 'Wine',
    price: '$39.99',
    productImage: 'Product_3.webp',
    isSale: false,
  },
];

describe('useProductFilters', () => {
  it('should return initial state', () => {
    const { result } = renderHook(() =>
      useProductFilters({ products: mockProducts })
    );

    expect(result.current.searchQuery).toBe('');
    expect(result.current.selectedFilters).toEqual([]);
    expect(result.current.filteredProducts).toEqual(mockProducts);
    expect(result.current.allProductTypes).toEqual(['Beer', 'Wine']);
  });

  it('should filter by search query', () => {
    const { result } = renderHook(() =>
      useProductFilters({ products: mockProducts })
    );

    act(() => {
      result.current.setSearchQuery('stella');
    });

    expect(result.current.searchQuery).toBe('stella');
    expect(result.current.filteredProducts).toHaveLength(1);
    expect(result.current.filteredProducts[0].productName).toBe(
      'Stella Artois Premium Lager'
    );
  });

  it('should filter by product type', () => {
    const { result } = renderHook(() =>
      useProductFilters({ products: mockProducts })
    );

    act(() => {
      result.current.setSelectedFilters(['Wine']);
    });

    expect(result.current.selectedFilters).toEqual(['Wine']);
    expect(result.current.filteredProducts).toHaveLength(1);
    expect(result.current.filteredProducts[0].type).toBe('Wine');
  });

  it('should combine search and type filters', () => {
    const { result } = renderHook(() =>
      useProductFilters({ products: mockProducts })
    );

    act(() => {
      result.current.setSearchQuery('beer');
      result.current.setSelectedFilters(['Beer']);
    });

    expect(result.current.filteredProducts).toHaveLength(0); // No product name contains "beer"
  });

  it('should return empty array when no matches', () => {
    const { result } = renderHook(() =>
      useProductFilters({ products: mockProducts })
    );

    act(() => {
      result.current.setSearchQuery('nonexistent');
    });

    expect(result.current.filteredProducts).toHaveLength(0);
  });

  it('should be case insensitive for search', () => {
    const { result } = renderHook(() =>
      useProductFilters({ products: mockProducts })
    );

    act(() => {
      result.current.setSearchQuery('PURE');
    });

    expect(result.current.filteredProducts).toHaveLength(1);
    expect(result.current.filteredProducts[0].productName).toBe(
      'Pure Blonde Crate'
    );
  });
});
