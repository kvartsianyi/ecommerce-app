import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/utils';

interface CounterProps {
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeConfig = {
  sm: {
    button: 'size-6',
    text: 'size-6',
  },
  md: {
    button: 'size-8',
    text: 'size-8',
  },
  lg: {
    button: 'size-12',
    text: 'size-12',
  },
};

export function Counter({
  defaultValue = 0,
  min = -Infinity,
  max = Infinity,
  step = 1,
  onChange,
  className,
  size = 'md',
}: CounterProps) {
  const [count, setCount] = useState(defaultValue);
  const config = sizeConfig[size];

  const update = (next: number) => {
    const clamped = Math.min(Math.max(next, min), max);
    setCount(clamped);
    onChange?.(clamped);
  };

  return (
    <div
      className={cn('bg-background flex items-center', className)}
      role="group"
    >
      <Button
        variant="outline"
        size="icon"
        className={cn(config.button, 'rounded-lg shrink-0')}
        onClick={() => update(count - step)}
        disabled={count <= min}
      >
        <Minus className="size-4" />
      </Button>

      <div
        className={cn(
          'flex items-center justify-center text-base font-semibold text-foreground border-input border-y',
          config.text
        )}
        aria-live="polite"
        aria-atomic="true"
      >
        {count}
      </div>

      <Button
        variant="outline"
        size="icon"
        className={cn(config.button, 'rounded-lg shrink-0')}
        onClick={() => update(count + step)}
        disabled={count >= max}
      >
        <Plus className="size-4" />
      </Button>
    </div>
  );
}
