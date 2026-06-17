import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Loader({ fullPage = false, className }) {
  if (fullPage) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className={cn('h-8 w-8 animate-spin text-egyptian-gold', className)} />
      </div>
    );
  }
  return <Loader2 className={cn('h-5 w-5 animate-spin text-egyptian-gold', className)} />;
}
