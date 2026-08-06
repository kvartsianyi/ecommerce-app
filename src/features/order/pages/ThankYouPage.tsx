import { Flame } from 'lucide-react';
import { useSearch } from '@tanstack/react-router';

import { useGetOrderDetails } from '../api/hooks/useGetOrderDetails';
import { Separator } from '@/shared/components/ui/separator';
import { Button } from '@/shared/components/ui/button';
import { router } from '@/app/providers/router';
import defaultPizzaImage from '@/assets/pizza-image.avif';

export function ThankYouPage() {
  const { orderId } = useSearch({ from: '/_authenticated/thank-you' });

  const { data: orderDetails } = useGetOrderDetails(orderId!, {
    enabled: !!orderId,
  });

  console.log('orderId', orderId, !!orderId);
  console.log('orderDetails', orderDetails);

  if (!orderId) {
    return <div>Order ID is missing!</div>;
  }

  return (
    <div className="flex align-center justify-center">
      <div className="section text-center space-y-6">
        <div className="flex-col justify-center items-between gap-2">
          <div className="flex justify-center mb-4">
            <Flame className="size-12 text-amber-500" />
          </div>
          <h3 className="text-lg font-semibold">Замовлення підтверджено!</h3>
          <p className="text-sm text-muted-foreground">
            Дякуємо, що обрали нас! Ваше замовлення вже готується.
          </p>
        </div>
        <Separator className="my-4" />
        <p className="text-xl font-semibold text-foreground">
          Замовлення #{orderDetails?.id}
        </p>
        <div className="my-4 background-foreground space-y-4">
          {orderDetails?.items.map((item) => (
            <div key={item.id} className="flex justify-between gap-3">
              <div className="flex gap-3">
                <img
                  src={item.productImage ?? defaultPizzaImage}
                  alt={item.productTitle}
                  className="size-16 rounded-md object-cover"
                />
                <div className="flex flex-col justify-center">
                  <p className="text-sm font-medium leading-tight">
                    {item.productTitle}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    К-сть: {item.quantity}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <p className="text-sm font-medium">
                  {(item.unitPrice * item.quantity).toFixed(2)} грн
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between font-semibold">
          <span>Разом</span>
          <span>{orderDetails?.totalAmount?.toFixed(2)} грн</span>
        </div>
        <Separator className="my-4" />
        <div className="flex justify-between gap-4">
          <Button variant="secondary">Мої замовлення</Button>
          <Button onClick={() => router.navigate({ to: '/' })}>
            На головну
          </Button>
        </div>
      </div>
    </div>
  );
}
