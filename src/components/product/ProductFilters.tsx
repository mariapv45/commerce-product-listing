import { ChevronDown, X, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import RemovableBadge from '@/components/common/RemovableBadge';

import type { ProductType } from '@/types/product';
import { cn } from '@/lib/utils/cn';

interface ProductTypeFilterProps {
  selectedFilters: ProductType[];
  allProductTypes: ProductType[];
  onFiltersChange: (types: ProductType[]) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function ProductFilters({
  selectedFilters,
  allProductTypes,
  onFiltersChange,
  searchQuery,
  onSearchChange,
}: ProductTypeFilterProps) {
  const isSelected = (type: ProductType) => selectedFilters.includes(type);

  const addFilter = (type: ProductType) =>
    onFiltersChange([...selectedFilters, type]);

  const removeFilter = (type: ProductType) =>
    onFiltersChange(
      selectedFilters.filter((selectedType) => selectedType !== type)
    );

  const handleFilterSelection = (productType: ProductType) => {
    if (isSelected(productType)) {
      removeFilter(productType);
    } else {
      addFilter(productType);
    }
  };

  return (
    <div className='space-y-3'>
      {/* Mobile: 3 rows, Desktop: 2 columns */}
      <div className='flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4'>
        {/* Row 1 (Mobile) / Left Column (Desktop): Search Input */}
        <div className='relative w-full sm:w-2/5 md:w-1/3 lg:w-1/4'>
          <Search className='text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2' />
          <Input
            placeholder='Search products...'
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className='text-foreground pl-10'
          />
        </div>

        {/* Row 2-3 (Mobile) / Right Column (Desktop): Filters */}
        <div className='flex flex-col gap-2'>
          {/* Row 2 (Mobile): Clear All + Dropdown side by side */}
          <div className='flex items-center gap-2'>
            <Button
              variant='link'
              size='sm'
              onClick={() => onFiltersChange([])}
              className={cn(
                'text-muted-foreground hover:text-foreground whitespace-nowrap',
                selectedFilters.length === 0 && 'hidden'
              )}
            >
              <X className='h-4 w-4' />
              Clear All
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='outline'
                  className='flex-1 justify-between sm:w-48'
                >
                  {selectedFilters.length === 0
                    ? 'All Types'
                    : `Filters (${selectedFilters.length})`}
                  <ChevronDown className='h-4 w-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-48'>
                {allProductTypes.map((productType) => (
                  <DropdownMenuCheckboxItem
                    key={productType}
                    checked={selectedFilters.includes(productType)}
                    onCheckedChange={() => handleFilterSelection(productType)}
                  >
                    {productType}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Row 3 (Mobile): Filter Badges */}
          <div className='flex flex-wrap justify-end gap-2'>
            {selectedFilters.map((filter) => (
              <RemovableBadge
                key={filter}
                variant='secondary'
                label={filter}
                onRemove={() => removeFilter(filter)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
