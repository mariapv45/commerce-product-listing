/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react';
import ProductGrid from './ProductGrid';
import { useProducts } from '@/hooks/useProducts';

// Mock the useProducts hook
vi.mock('@/hooks/useProducts');

describe('ProductGrid', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render loading skeleton when loading', () => {
    // Mock loading state
    (useProducts as any).mockReturnValue({
      products: [],
      loading: true,
      error: null,
    });

    render(<ProductGrid />);

    // Check for loading skeleton elements
    expect(screen.getAllByTestId('skeleton-card')).toHaveLength(8); // 8 skeleton cards
  });

  it('should render error message when there is an error', () => {
    // Mock error state
    (useProducts as any).mockReturnValue({
      products: [],
      loading: false,
      error: 'Failed to fetch products',
    });

    render(<ProductGrid />);

    expect(
      screen.getByText('Error: Failed to fetch products')
    ).toBeInTheDocument();
    expect(screen.getByText('Please try again later.')).toBeInTheDocument();
  });

  it('should render products when data is loaded', () => {
    const mockProducts = [
      {
        index: 0,
        isSale: false,
        price: '$49.99',
        productImage: 'Product_1.webp',
        productName: 'Pure Blonde Crate',
        type: 'Beer',
      },
      {
        index: 1,
        isSale: true,
        price: '$14.99',
        productImage: 'Product_2.webp',
        productName: 'Victoria Bitter 4x6x375ml',
        type: 'Beer',
      },
    ];

    // Mock successful data
    (useProducts as any).mockReturnValue({
      products: mockProducts,
      loading: false,
      error: null,
    });

    render(<ProductGrid />);

    // Check that products are rendered
    expect(screen.getByText('Pure Blonde Crate')).toBeInTheDocument();
    expect(
      screen.getByText('Victoria Bitter 375ml (24-pack)')
    ).toBeInTheDocument();
    expect(screen.getByText('$49.99')).toBeInTheDocument();
    expect(screen.getByText('$14.99')).toBeInTheDocument();
  });

  it('should render correct number of product cards', () => {
    const mockProducts = Array.from({ length: 5 }, (_, i) => ({
      index: i,
      isSale: false,
      price: `$${(i + 1) * 10}.99`,
      productImage: `Product_${i + 1}.webp`,
      productName: `Product ${i + 1}`,
      type: 'Beer',
    }));

    (useProducts as any).mockReturnValue({
      products: mockProducts,
      loading: false,
      error: null,
    });

    render(<ProductGrid />);

    // Check that all product cards are rendered
    expect(screen.getAllByText(/Product \d+/)).toHaveLength(5);
  });
});
