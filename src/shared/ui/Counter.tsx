import { Minus, Plus } from 'lucide-react';

import { Button } from './button';
import { Input } from './input';

interface CounterProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export function Counter({
  value,
  onChange,
  min = 1,
  max = Infinity,
}: CounterProps) {
  const decrease = () => onChange(Math.max(min, value - 1));
  const increase = () => onChange(Math.min(max, value + 1));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = Number(e.target.value);
    if (!isNaN(num)) {
      onChange(Math.max(min, Math.min(max, num)));
    }
  };

  return (
    <div className="flex items-center">
      <Button
        variant="outline"
        size="icon"
        className="h-9 w-9"
        onClick={decrease}
        disabled={value <= min}
      >
        <Minus className="h-4 w-4" />
      </Button>
      <Input
        type="text"
        value={value}
        onChange={handleChange}
        className="w-14 h-9 rounded-none shadow-none text-center font-bold border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
      />
      <Button
        variant="outline"
        size="icon"
        className="h-9 w-9"
        onClick={increase}
        disabled={value >= max}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
