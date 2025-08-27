import { render, screen } from '@testing-library/react';
import ProductCard from '@/components/product/ProductCard';
import type { Product } from '@/types/product';

describe('ProductCard', () => {
  const mockProduct: Product = {
    index: 0,
    isSale: false,
    price: '$49.99',
    productImage: 'Product_1.webp',
    productName: 'Pure Blonde Crate',
    type: 'Beer',
  };

  it('should render product information', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText('Pure Blonde Crate')).toBeInTheDocument();
    expect(screen.getByText('$49.99')).toBeInTheDocument();
  });

  it('should show sale badge when product is on sale', () => {
    const saleProduct = { ...mockProduct, isSale: true };
    render(<ProductCard product={saleProduct} />);

    expect(screen.getByText('Sale')).toBeInTheDocument();
  });

  it('should not show sale badge when product is not on sale', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.queryByText('Sale')).toBeNull();
  });

  it('should render product image with correct src', () => {
    render(<ProductCard product={mockProduct} />);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', '/images/products/Product_1.webp');
    expect(image).toHaveAttribute('alt', 'Pure Blonde Crate');
  });
});
