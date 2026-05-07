import { MapPin } from 'lucide-react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import { FormField } from '@/shared/components/ui/FormField';
import { withForm, CheckoutFormOpts } from '../forms/checkout-form';

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
        <form.Field
          name="deliveryAddress"
          children={(field) => (
            <FormField
              field={field}
              label="Вулиця та номер будинку"
              required={true}
              children={(control) => (
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={control.isInvalid}
                  placeholder="вул. Хрещатик, 1, кв. 10"
                />
              )}
            />
          )}
        />
      </CardContent>
    </Card>
  ),
});
