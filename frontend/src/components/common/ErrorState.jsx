import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function ErrorState({ message = 'Something went wrong', onRetry, className }) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16 text-center', className)}>
      <AlertTriangle className="h-12 w-12 text-destructive/70 mb-4" />
      <h3 className="text-lg font-semibold text-white">Error</h3>
      <p className="text-sm text-muted-foreground mt-1 max-w-md">{message}</p>
      {onRetry && (
        <Button variant="outline" onClick={onRetry} className="mt-4">
          Try Again
        </Button>
      )}
    </div>
  );
}
