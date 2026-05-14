import { CreditCard } from 'lucide-react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { withForm } from '@/shared/components/form';
import { CheckoutFormOpts } from '../forms/checkout-form';
import { PAYMENT_OPTIONS } from '../constants';

export const PaymentMethodSection = withForm({
  ...CheckoutFormOpts,
  render: ({ form }) => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="size-5" />
          Спосіб оплати
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form.AppField
          name="paymentMethod"
          children={(field) => (
            <field.RadioGroupField options={PAYMENT_OPTIONS} />
          )}
        />
      </CardContent>
    </Card>
  ),
});
