import { useProducts } from '@/hooks/useProducts';
import { useProductFilters } from '@/hooks/useProductFilters';

import ProductCard from './ProductCard';
import GridLoadingSkeleton from '@/components/product/GridLoadingSkeleton';
import ErrorMessage from '@/components/common/ErrorMessage';
import ProductFilters from './ProductFilters';
import type { Product } from '@/types/product';

export default function ProductGrid() {
  const { products, loading, error } = useProducts();
  const {
    searchQuery,
    selectedFilters,
    filteredProducts,
    allProductTypes,
    setSearchQuery,
    setSelectedFilters,
  } = useProductFilters({ products });

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
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </div>

      {filteredProducts.length === 0 &&
      (selectedFilters.length > 0 || searchQuery.length > 0) ? (
        <div className='py-8 text-center'>
          <p className='text-muted-foreground text-lg'>
            No products found. Try adjusting your search term or clearing
            filters.
          </p>
        </div>
      ) : (
        <div className='grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4'>
          {filteredProducts.map((product: Product) => (
            <ProductCard key={product.index} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
