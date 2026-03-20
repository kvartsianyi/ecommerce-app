import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/shared/ui/button';
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
    button: 'h-6 w-6',
    icon: 'h-3 w-3',
    text: 'text-sm',
  },
  md: {
    button: 'h-8 w-8',
    icon: 'h-4 w-4',
    text: 'text-lg',
  },
  lg: {
    button: 'h-10 w-10',
    icon: 'h-5 w-5',
    text: 'text-xl',
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
    <div className={cn('inline-flex items-center', className)} role="group">
      <Button
        variant="outline"
        size="icon"
        className={cn(config.button, 'rounded-lg shrink-0')}
        onClick={() => update(count - step)}
        disabled={count <= min}
      >
        <Minus className={config.icon} />
      </Button>

      <span
        className={cn(
          'min-w-[2.5rem] text-center font-semibold tabular-nums text-foreground select-none',
          config.text
        )}
        aria-live="polite"
        aria-atomic="true"
      >
        {count}
      </span>

      <Button
        variant="outline"
        size="icon"
        className={cn(config.button, 'rounded-lg shrink-0')}
        onClick={() => update(count + step)}
        disabled={count >= max}
      >
        <Plus className={config.icon} />
      </Button>
    </div>
  );
}
