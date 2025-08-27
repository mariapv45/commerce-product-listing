import { AlertTriangle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='text-center'>
        <div className='text-destructive mb-4 flex items-center justify-center gap-2 text-lg'>
          <AlertTriangle className='h-5 w-5' />
          Error: {message}
        </div>
        <p className='text-muted-foreground'>Please try again later.</p>
      </div>
    </div>
  );
}
