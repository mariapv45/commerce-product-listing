import { useProducts } from '@/hooks/useProducts';
import ProductCard from './ProductCard';
import GridLoadingSkeleton from '@/components/product/GridLoadingSkeleton';
import ErrorMessage from '@/components/common/ErrorMessage';

export default function ProductGrid() {
  const { products, loading, error } = useProducts();

  if (loading) {
    return <GridLoadingSkeleton />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4'>
        {products.map((product) => (
          <ProductCard key={product.index} product={product} />
        ))}
      </div>
    </div>
  );
}
