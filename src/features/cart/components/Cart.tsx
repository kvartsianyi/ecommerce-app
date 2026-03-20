import { Button } from '@/shared/ui/button';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/shared/ui/sheet';
import { useCart } from '../api/hooks';
import type { Cart } from '@/shared/types';
import { CartItem } from './CartItem';

type CartProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCheckout: () => void;
};

export function Cart({ open, onOpenChange, onCheckout }: CartProps) {
  const { data } = useCart();

  const items = data?.items ?? [];
  const totalAmount = data?.totalAmount ?? 0;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Кошик</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4">
          {items.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-muted-foreground">Ваш кошик порожній</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <SheetFooter className="flex-col gap-4">
            <div className="flex items-center justify-between border-t border-border pt-4">
              <span className="text-lg font-semibold">Всього:</span>
              <span className="text-2xl font-bold text-primary">
                {totalAmount} ₴
              </span>
            </div>
            <Button className="w-full" size="lg" onClick={onCheckout}>
              Оформити замовлення
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
