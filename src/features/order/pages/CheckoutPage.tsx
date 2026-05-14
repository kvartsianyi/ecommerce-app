import { useAppForm } from '@/shared/components/form';
import {
  CommentSection,
  DeliveryAddressSection,
  OrderSummary,
  PaymentMethodSection,
  PickupMethodSection,
  UserInfoSection,
} from '../components';
import { Separator } from '@/shared/components/ui/separator';
import { useAuth } from '@/features/auth/api/hooks';
import { CheckoutFormOpts } from '../forms/checkout-form/form-options';
import { useStore } from '@tanstack/react-form';
import { useCart } from '@/features/cart/api/hooks';
import { PICKUP_METHODS } from '../constants';
import { checkoutSchema } from '../schemas';
import { useCheckout } from '../api/hooks';

export function CheckoutPage() {
  const { user } = useAuth();
  const { data } = useCart();
  const { mutateAsync: checkout } = useCheckout();

  const subtotal = data?.totalAmount ?? 0;
  const items = data?.items ?? [];

  const defaultValues = {
    ...CheckoutFormOpts.defaultValues,
    user: {
      firstName: user?.firstName ?? '',
      lastName: user?.lastName ?? '',
      phone: user?.phone?.replace('+380', '') ?? '',
    },
  };

  const form = useAppForm({
    ...CheckoutFormOpts,
    defaultValues,
    validators: {
      onSubmit: checkoutSchema,
    },
    onSubmit: async ({ value }) => checkout(),
  });

  const pickupMethod = useStore(form.store, (s) => s.values.pickupMethod);

  const shipping = pickupMethod === PICKUP_METHODS.DELIVERY ? 99 : 0;
  const total = subtotal + shipping;

  return (
    <section className="section space-y-6">
      <div className="flex items-center gap-4">
        <h2 className="text-3xl font-bold text-balance">
          Оформлення замовлення
        </h2>
      </div>

      <Separator />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3 flex flex-col gap-6">
            <UserInfoSection form={form} />

            <PickupMethodSection form={form} />

            {pickupMethod === PICKUP_METHODS.DELIVERY && (
              <DeliveryAddressSection form={form} />
            )}

            <PaymentMethodSection form={form} />

            <CommentSection form={form} />

            <Separator className="lg:hidden" />

            {/* Mobile Order Summary */}
            <div className="lg:hidden">
              <OrderSummary
                form={form}
                items={items}
                subtotal={subtotal}
                shipping={shipping}
                total={total}
              />
            </div>
          </div>

          {/* Right Column - Order Summary (Desktop) */}
          <div className="hidden lg:block lg:col-span-2">
            <div className="sticky top-8">
              <OrderSummary
                form={form}
                items={items}
                subtotal={subtotal}
                shipping={shipping}
                total={total}
              />
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
