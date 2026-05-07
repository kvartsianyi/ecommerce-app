import { ArrowRight, ShoppingBag } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Separator } from '@/shared/ui/separator';
import { Button } from '@/shared/ui/button';
import type { CartItem } from '@/shared/types';
import defaultPizzaImage from '@/assets/pizza-image.avif';

type OrderSummaryProps = {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
};

export function OrderSummary({
  items,
  subtotal,
  shipping,
  total,
}: OrderSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingBag className="size-5" />
          Ваше замовлення
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="max-h-[300px] overflow-y-auto pr-4 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex gap-3">
              <img
                src={item.picture ?? defaultPizzaImage}
                alt={item.title}
                className="size-16 rounded-md object-cover"
              />
              <div className="flex flex-1 flex-col justify-center">
                <p className="text-sm font-medium leading-tight">
                  {item.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  К-сть: {item.quantity}
                </p>
              </div>
              <div className="flex items-center">
                <p className="text-sm font-medium">
                  {(item.price * item.quantity).toFixed(2)} грн
                </p>
              </div>
            </div>
          ))}
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Сума товарів</span>
            <span>{subtotal.toFixed(2)} грн</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Доставка</span>
            <span>
              {shipping === 0 ? 'Безкоштовно' : `${shipping.toFixed(2)} грн`}
            </span>
          </div>
        </div>

        <Separator />

        <div className="flex justify-between font-semibold">
          <span>Разом до сплати</span>
          <span>{total.toFixed(2)} грн</span>
        </div>

        <Button type="submit" size="lg" className="w-full">
          Оформити замовлення <ArrowRight />
        </Button>
      </CardContent>
    </Card>
  );
}
