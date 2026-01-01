import { cn } from '@/lib/utils';
import { Spinner } from './ui/spinner';

export function FullScreenSpinner({ visible }: { visible: boolean }) {
  return (
    <div
      className={cn(
        'fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-300',
        visible
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      )}
    >
      <Spinner className="w-12 h-12" />
    </div>
  );
}
