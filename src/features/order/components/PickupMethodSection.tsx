import { Truck } from 'lucide-react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { withForm } from '@/shared/components/form';
import { CheckoutFormOpts } from '../forms/checkout-form';
import { PICKUP_OPTIONS } from '../constants';

export const PickupMethodSection = withForm({
  ...CheckoutFormOpts,
  render: ({ form }) => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Truck className="size-5" />
          Спосіб отримання
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form.AppField
          name="pickupMethod"
          children={(field) => (
            <field.RadioGroupField options={PICKUP_OPTIONS} />
          )}
        />
      </CardContent>
    </Card>
  ),
});
