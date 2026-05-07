import { Truck } from 'lucide-react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/shared/components/ui/radio-group';
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldContent,
  FieldTitle,
} from '@/shared/components/ui/field';
import { withForm, CheckoutFormOpts } from '../forms/checkout-form';
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
        <form.Field
          name="pickupMethod"
          children={(field) => (
            <RadioGroup
              value={field.state.value}
              onValueChange={field.handleChange}
            >
              {PICKUP_OPTIONS.map((option) => (
                <FieldLabel key={option.value} htmlFor={option.value}>
                  <Field orientation="horizontal">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <FieldContent>
                      <FieldTitle className="w-full justify-between items-center">
                        <div className="flex items-center gap-2">
                          <option.icon className="size-4 text-muted-foreground" />
                          <span className="font-medium">{option.label}</span>
                        </div>
                        {option.price}
                      </FieldTitle>
                      <FieldDescription>{option.description}</FieldDescription>
                    </FieldContent>
                  </Field>
                </FieldLabel>
              ))}
            </RadioGroup>
          )}
        />
      </CardContent>
    </Card>
  ),
});
