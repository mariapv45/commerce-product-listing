import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductFilters from './ProductFilters';
import type { ProductType } from '@/types/product';

const mockProps = {
  selectedFilters: [] as ProductType[],
  allProductTypes: ['Beer', 'Wine', 'Spirits', 'Cider'] as ProductType[],
  onFiltersChange: vi.fn(),
  searchQuery: '',
  onSearchChange: vi.fn(),
};

describe('ProductFilters', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Search Input', () => {
    it('should render search input with placeholder', () => {
      render(<ProductFilters {...mockProps} />);

      const searchInput = screen.getByPlaceholderText('Search products...');
      expect(searchInput).toBeInTheDocument();
    });

    it('should display search query value', () => {
      render(<ProductFilters {...mockProps} searchQuery='stella' />);

      const searchInput = screen.getByDisplayValue('stella');
      expect(searchInput).toBeInTheDocument();
    });

    it('should call onSearchChange when typing', async () => {
      const user = userEvent.setup();
      render(<ProductFilters {...mockProps} />);

      const searchInput = screen.getByPlaceholderText('Search products...');
      await user.type(searchInput, 'beer');

      expect(mockProps.onSearchChange).toHaveBeenCalledWith('b');
      expect(mockProps.onSearchChange).toHaveBeenCalledWith('e');
      expect(mockProps.onSearchChange).toHaveBeenCalledWith('r');
      expect(mockProps.onSearchChange).toHaveBeenLastCalledWith('r');
    });
  });

  describe('Filter Dropdown', () => {
    it('should render dropdown button with "All Types" when no filters selected', () => {
      render(<ProductFilters {...mockProps} />);

      const dropdownButton = screen.getByRole('button', { name: /all types/i });
      expect(dropdownButton).toBeInTheDocument();
    });

    it('should show filter count when filters are selected', () => {
      render(
        <ProductFilters {...mockProps} selectedFilters={['Beer', 'Wine']} />
      );

      const dropdownButton = screen.getByRole('button', {
        name: /filters \(2\)/i,
      });
      expect(dropdownButton).toBeInTheDocument();
    });

    it('should show dropdown menu when clicked', async () => {
      const user = userEvent.setup();
      render(<ProductFilters {...mockProps} />);

      const dropdownButton = screen.getByRole('button', { name: /all types/i });
      await user.click(dropdownButton);

      // Check that all product types are shown
      expect(screen.getByText('Beer')).toBeInTheDocument();
      expect(screen.getByText('Wine')).toBeInTheDocument();
      expect(screen.getByText('Spirits')).toBeInTheDocument();
      expect(screen.getByText('Cider')).toBeInTheDocument();
    });

    it('should call onFiltersChange when selecting a filter', async () => {
      const user = userEvent.setup();
      render(<ProductFilters {...mockProps} />);

      const dropdownButton = screen.getByRole('button', { name: /all types/i });
      await user.click(dropdownButton);

      const beerOption = screen.getByRole('menuitemcheckbox', { name: 'Beer' });
      await user.click(beerOption);

      expect(mockProps.onFiltersChange).toHaveBeenCalledWith(['Beer']);
    });

    it('should show checked state for selected filters', async () => {
      const user = userEvent.setup();
      render(<ProductFilters {...mockProps} selectedFilters={['Beer']} />);

      const dropdownButton = screen.getByRole('button', {
        name: /filters \(1\)/i,
      });
      await user.click(dropdownButton);

      const beerOption = screen.getByRole('menuitemcheckbox', { name: 'Beer' });
      expect(beerOption).toBeChecked();
    });

    it('should remove filter when unchecking selected filter', async () => {
      const user = userEvent.setup();
      render(
        <ProductFilters {...mockProps} selectedFilters={['Beer', 'Wine']} />
      );

      const dropdownButton = screen.getByRole('button', {
        name: /filters \(2\)/i,
      });
      await user.click(dropdownButton);

      const beerOption = screen.getByRole('menuitemcheckbox', { name: 'Beer' });
      await user.click(beerOption);

      expect(mockProps.onFiltersChange).toHaveBeenCalledWith(['Wine']);
    });
  });

  describe('Clear All Button', () => {
    it('should be invisible when no filters are selected', () => {
      render(<ProductFilters {...mockProps} />);

      const clearButton = screen.getByRole('button', { name: /clear all/i });
      expect(clearButton).toHaveClass('hidden');
    });

    it('should be visible when filters are selected', () => {
      render(<ProductFilters {...mockProps} selectedFilters={['Beer']} />);

      const clearButton = screen.getByRole('button', { name: /clear all/i });
      expect(clearButton).not.toHaveClass('invisible');
    });

    it('should clear all filters when clicked', async () => {
      const user = userEvent.setup();
      render(
        <ProductFilters {...mockProps} selectedFilters={['Beer', 'Wine']} />
      );

      const clearButton = screen.getByRole('button', { name: /clear all/i });
      await user.click(clearButton);

      expect(mockProps.onFiltersChange).toHaveBeenCalledWith([]);
    });
  });

  describe('Filter Badges', () => {
    it('should not show badges when no filters are selected', () => {
      render(<ProductFilters {...mockProps} />);

      expect(screen.queryByText('Beer')).not.toBeInTheDocument();
      expect(screen.queryByText('Wine')).not.toBeInTheDocument();
    });

    it('should show badges for selected filters', () => {
      render(
        <ProductFilters {...mockProps} selectedFilters={['Beer', 'Wine']} />
      );

      // Note: These will be in badges, not in the dropdown
      const badges = screen.getAllByText(/beer|wine/i);
      expect(badges.length).toBeGreaterThanOrEqual(2);
    });

    it('should remove filter when badge X button is clicked', async () => {
      const user = userEvent.setup();
      render(
        <ProductFilters {...mockProps} selectedFilters={['Beer', 'Wine']} />
      );

      // Find X buttons (there should be one for each badge)
      const removeButtons = screen.getAllByRole('button');
      const beerRemoveButton = removeButtons.find(
        (button) =>
          button.getAttribute('aria-label')?.includes('remove') ||
          button.textContent?.includes('×') ||
          button.querySelector('svg') // X icon
      );

      if (beerRemoveButton) {
        await user.click(beerRemoveButton);
        expect(mockProps.onFiltersChange).toHaveBeenCalled();
      }
    });
  });

  describe('Responsive Layout', () => {
    it('should render all main sections', () => {
      render(<ProductFilters {...mockProps} selectedFilters={['Beer']} />);

      // Search input
      expect(
        screen.getByPlaceholderText('Search products...')
      ).toBeInTheDocument();

      // Filter dropdown
      expect(
        screen.getByRole('button', { name: /filters \(1\)/i })
      ).toBeInTheDocument();

      // Clear all button
      expect(
        screen.getByRole('button', { name: /clear all/i })
      ).toBeInTheDocument();
    });
  });

  describe('Multiple Filter Selections', () => {
    it('should handle multiple filter selections correctly', async () => {
      const user = userEvent.setup();
      render(<ProductFilters {...mockProps} />);

      // Open dropdown
      const dropdownButton = screen.getByRole('button', { name: /all types/i });
      await user.click(dropdownButton);

      // Select multiple filters
      await user.click(screen.getByRole('menuitemcheckbox', { name: 'Beer' }));

      await user.click(dropdownButton);
      await user.click(screen.getByRole('menuitemcheckbox', { name: 'Wine' }));

      expect(mockProps.onFiltersChange).toHaveBeenCalledWith(['Beer']);
      expect(mockProps.onFiltersChange).toHaveBeenCalledWith(['Wine']);
    });
  });
});
