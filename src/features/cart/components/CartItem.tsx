import { Trash2 } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import { useRemoveFromCart, useUpdateQuantity } from '../api/hooks';
import type { CartItem } from '@/shared/types';
import { Spinner } from '@/shared/components/ui/spinner';
import { Counter } from '@/shared/components/ui/Counter';

type CartItemProps = {
  item: CartItem;
};

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity } = useUpdateQuantity();
  const { mutate: removeItem, isPending: isRemovePending } =
    useRemoveFromCart();

  return (
    <div
      key={item.id}
      className="flex gap-4 rounded-lg border border-border p-4"
    >
      <img
        src={item.productImage || '/placeholder.svg'}
        alt={item.productTitle}
        className="h-20 w-20 rounded-md object-cover"
      />
      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="font-semibold">{item.productTitle}</h4>
            <p className="text-sm text-muted-foreground">
              {item.productPrice} ₴
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeItem(item.id)}
          >
            {isRemovePending ? <Spinner /> : <Trash2 />}
          </Button>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <Counter
            min={1}
            max={999}
            defaultValue={item.quantity}
            onChange={(value) =>
              updateQuantity({
                id: item.id,
                quantity: value,
              })
            }
          />
          <span className="ml-auto font-semibold">
            {item.productPrice * item.quantity} ₴
          </span>
        </div>
      </div>
    </div>
  );
}
