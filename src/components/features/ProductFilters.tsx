import { useState } from 'react';
import { Funnel } from 'lucide-react';

import { Slider } from '../ui/slider';
import { Card } from '../ui/card';
import { cn } from '@/lib/utils';

export function ProductFilters({ className }: { className?: string }) {
  const [priceRange, setPriceRange] = useState([0, 500]);

  return (
    <>
      <Card className={cn('flex flex-col', className)}>
        <div className="flex items-center gap-2">
          <Funnel />
          <span className="text-2xl font-bold">Фільтри</span>
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <span className="font-semibold py-2">Ціна</span>
          <span className="font-semibold">
            {priceRange[0]}грн - {priceRange[1]}грн
          </span>
          <Slider
            className="py-2"
            defaultValue={priceRange}
            value={priceRange}
            onValueChange={setPriceRange}
            max={500}
            step={1}
          />
        </div>
      </Card>
    </>
  );
}
