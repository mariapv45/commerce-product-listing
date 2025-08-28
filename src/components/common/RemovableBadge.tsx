import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface RemovableBadgeProps {
  label: string;
  onRemove: () => void;
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
}

export default function RemovableBadge({
  label,
  onRemove,
  variant = 'secondary',
}: RemovableBadgeProps) {
  return (
    <Badge
      variant={variant}
      className='flex items-center gap-1 pr-1 hover:border-white hover:bg-transparent'
    >
      {label}
      <Button
        variant='ghost'
        size='icon'
        className='h-4 w-4 p-0'
        onClick={onRemove}
      >
        <X className='h-3 w-3' />
      </Button>
    </Badge>
  );
}
