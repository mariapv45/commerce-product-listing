import { useState } from 'react';

import { useProducts } from '@/hooks/useProducts';

import ProductCard from './ProductCard';
import GridLoadingSkeleton from '@/components/product/GridLoadingSkeleton';
import ErrorMessage from '@/components/common/ErrorMessage';
import ProductFilters from './ProductFilters';
import type { ProductType } from '@/types/product';

export default function ProductGrid() {
  const { products, loading, error } = useProducts();
  const [selectedFilters, setSelectedFilters] = useState<ProductType[]>([]);

  const allProductTypes = [...new Set(products.map((product) => product.type))];

  // Filter products based on selected types
  const filteredProducts =
    selectedFilters.length === 0
      ? products
      : products.filter((product) => selectedFilters.includes(product.type));

  if (loading) {
    return <GridLoadingSkeleton />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mb-6'>
        <ProductFilters
          allProductTypes={allProductTypes}
          selectedFilters={selectedFilters}
          onFiltersChange={setSelectedFilters}
        />
      </div>

      {filteredProducts.length === 0 && selectedFilters.length > 0 ? (
        <div className='py-8 text-center'>
          <p className='text-muted-foreground text-lg'>
            No products match your filters. Try adjusting your selection or
            clearing filters.
          </p>
        </div>
      ) : (
        <div className='grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4'>
          {filteredProducts.map((product) => (
            <ProductCard key={product.index} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
