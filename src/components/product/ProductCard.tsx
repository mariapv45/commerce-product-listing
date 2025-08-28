import { Badge } from '@/components/ui/badge';
import { formatProductName } from '@/lib/utils/formatProductName';
import type { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const formattedProductName = formatProductName(product.productName);

  return (
    <div className='bg-card border-border relative rounded-lg border p-4 transition-shadow hover:shadow-lg'>
      {product.isSale && (
        <Badge
          variant='destructive'
          className='absolute top-0 left-0 px-6 text-sm'
        >
          Sale
        </Badge>
      )}
      <div className='mb-4'>
        <img
          src={`/images/products/${product.productImage}`}
          alt={formattedProductName}
          className='h-full w-full rounded-md object-cover'
        />
      </div>

      <div className='space-y-2 pr-4'>
        <p className='text-foreground font-semibold'>{formattedProductName}</p>
        <p className='text-primary font-bold'>{product.price}</p>
      </div>
    </div>
  );
}
