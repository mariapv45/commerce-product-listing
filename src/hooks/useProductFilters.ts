import { useState } from 'react';
import type { Product, ProductType } from '@/types/product';
import { useDebounce } from '@/hooks/useDebounce';

interface UseProductFiltersProps {
  products: Product[];
}

interface UseProductFiltersReturn {
  searchQuery: string;
  selectedFilters: ProductType[];
  filteredProducts: Product[];
  allProductTypes: ProductType[];
  setSearchQuery: (query: string) => void;
  setSelectedFilters: (filters: ProductType[]) => void;
}

export function useProductFilters({
  products,
}: UseProductFiltersProps): UseProductFiltersReturn {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<ProductType[]>([]);

  const debouncedSearchQuery = useDebounce(searchQuery);

  const allProductTypes = [...new Set(products.map((product) => product.type))];

  // Filter products based on both search query and selected type filters
  const filteredProducts = products.filter((product: Product) => {
    // Check if product name contains the search term (case-insensitive)
    const matchesSearch = product.productName
      .toLowerCase()
      .includes(debouncedSearchQuery.toLowerCase());

    // Check if product type matches selected filters
    // If no filters selected (length === 0), show all types
    // Otherwise, product type must be in the selected filters
    const matchesType =
      selectedFilters.length === 0 || selectedFilters.includes(product.type);

    // Product must match BOTH search term AND type filter to be shown
    return matchesSearch && matchesType;
  });

  return {
    searchQuery,
    selectedFilters,
    filteredProducts,
    allProductTypes,
    setSearchQuery,
    setSelectedFilters,
  };
}
