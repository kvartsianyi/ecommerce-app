import type React from 'react';
import { useState } from 'react';
// import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { CartItem } from '@/app/page';

type OrderModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cart: CartItem[];
  onOrderComplete: () => void;
  isLoggedIn: boolean;
  onLoginRequired: () => void;
};

export function OrderModal({
  open,
  onOpenChange,
  cart,
  onOrderComplete,
  isLoggedIn,
  onLoginRequired,
}: OrderModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoggedIn) {
      onLoginRequired();
      return;
    }

    setIsSubmitting(true);

    const orderData = {
      name,
      phone,
      address,
      comment,
      items: cart.map((item) => ({
        id: item.id,
        title: item.title,
        quantity: item.quantity,
        price: item.price,
      })),
      total,
    };

    console.log('Submitting order:', orderData);

    // toast.success(
    //   `Замовлення оформлено! Ваше замовлення на ${total} ₴ прийнято в обробку.`
    // );

    setIsSubmitting(false);
    onOrderComplete();
    onOpenChange(false);
    setName('');
    setPhone('');
    setAddress('');
    setComment('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Оформлення замовлення</DialogTitle>
          <DialogDescription>
            Заповніть форму для доставки вашої піци
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="rounded-lg border border-border p-4">
              <h3 className="mb-3 font-semibold">Ваше замовлення</h3>
              <div className="space-y-2">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between text-sm"
                  >
                    <span>
                      {item.title} × {item.quantity}
                    </span>
                    <span className="font-medium">
                      {item.price * item.quantity} ₴
                    </span>
                  </div>
                ))}
                <div className="border-t border-border pt-2">
                  <div className="flex items-center justify-between font-semibold">
                    <span>Всього:</span>
                    <span className="text-lg text-primary">{total} ₴</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="order-name">Ім'я</Label>
                <Input
                  id="order-name"
                  placeholder="Ваше ім'я"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Телефон</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+380 XX XXX XX XX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Адреса доставки</Label>
              <Input
                id="address"
                placeholder="Вулиця, будинок, квартира"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="comment">Коментар до замовлення</Label>
              <Textarea
                id="comment"
                placeholder="Додаткова інформація (необов'язково)"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Обробка...' : `Замовити ${total} ₴`}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
