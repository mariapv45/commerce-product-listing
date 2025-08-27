import { Skeleton } from '@/components/ui/skeleton';

export default function GridLoadingSkeleton() {
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4'>
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            data-testid='skeleton-card'
            className='bg-card border-border rounded-lg border p-4'
          >
            <Skeleton className='mb-4 aspect-[2/3] rounded-md' />
            <div className='space-y-2'>
              <Skeleton className='h-4 w-3/4' />
              <Skeleton className='h-4 w-1/2' />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
