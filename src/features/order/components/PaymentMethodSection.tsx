import { CreditCard } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group';
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldContent,
} from '@/shared/ui/field';
import { withForm, CheckoutFormOpts } from '../forms/checkout-form';
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
        <form.Field
          name="paymentMethod"
          children={(field) => (
            <RadioGroup
              value={field.state.value}
              onValueChange={field.handleChange}
            >
              {PAYMENT_OPTIONS.map((option) => (
                <FieldLabel key={option.value} htmlFor={option.value}>
                  <Field orientation="horizontal">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <FieldContent>
                      <div className="flex items-center gap-2">
                        <option.icon className="size-4 text-muted-foreground" />
                        <span className="font-medium">{option.label}</span>
                      </div>
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
