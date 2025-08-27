import { useState, useEffect } from 'react';
import type { Product } from '@/types/product';

interface ProductsResponse {
  products: Product[];
  loading: boolean;
  error: string | null;
}

export const useProducts = (): ProductsResponse => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async (): Promise<void> => {
      try {
        setLoading(true);

        const response = await fetch('/data/products.json');

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data: Product[] = await response.json();

        // Add delay to simulate real loading
        await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 second delay

        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};
