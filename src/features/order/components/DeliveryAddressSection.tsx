import { MapPin } from 'lucide-react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { withForm } from '@/shared/components/form';
import { CheckoutFormOpts } from '../forms/checkout-form';

export const DeliveryAddressSection = withForm({
  ...CheckoutFormOpts,
  render: ({ form }) => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="size-5" />
          Адреса доставки
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form.AppField
          name="deliveryAddress"
          children={(field) => (
            <field.TextField
              label="Вулиця та номер будинку"
              placeholder="вул. Пряма, 24, кв. 10"
            />
          )}
        />
      </CardContent>
    </Card>
  ),
});
