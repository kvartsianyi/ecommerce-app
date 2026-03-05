import { cn } from '@/shared/utils';
import { Spinner } from './spinner';

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
      <Spinner className="size-12" /> Завантаження...
    </div>
  );
}
