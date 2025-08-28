import { ChevronDown, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
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
}

export default function ProductFilters({
  selectedFilters,
  allProductTypes,
  onFiltersChange,
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
    <>
      <div className='flex items-center gap-2'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' className='w-48 justify-between'>
              {selectedFilters.length === 0
                ? 'All'
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

        <Button
          variant='link'
          size='sm'
          onClick={() => onFiltersChange([])}
          className={cn(
            'text-muted-foreground hover:text-foreground',
            selectedFilters.length === 0 && 'hidden'
          )}
        >
          <X className='mr-1 h-4 w-4' />
          Clear All
        </Button>
      </div>
      {selectedFilters.length > 0 && (
        <div className='mt-2 flex flex-wrap gap-2'>
          {selectedFilters.map((filter) => (
            <RemovableBadge
              key={filter}
              variant='secondary'
              label={filter}
              onRemove={() => removeFilter(filter)}
            />
          ))}
        </div>
      )}
    </>
  );
}
