import { User } from 'lucide-react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import { FieldGroup } from '@/shared/components/ui/field';
import { FormField } from '@/shared/components/ui/FormField';
import { PhoneInput } from '@/shared/components/ui/PhoneInput';
import { withForm, CheckoutFormOpts } from '../forms/checkout-form';

export const UserInfoSection = withForm({
  ...CheckoutFormOpts,
  render: ({ form }) => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="size-5" />
          Контактна інформація
        </CardTitle>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <div className="grid gap-4 sm:grid-cols-2">
            <form.Field
              name="user.firstName"
              children={(field) => (
                <FormField
                  field={field}
                  label="Ім'я"
                  required={true}
                  children={(control) => (
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={control.isInvalid}
                      placeholder="Олександр"
                    />
                  )}
                />
              )}
            />
            <form.Field
              name="user.lastName"
              children={(field) => (
                <FormField
                  field={field}
                  label="Прізвище"
                  required={true}
                  children={(control) => (
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={control.isInvalid}
                      placeholder="Шевченко"
                    />
                  )}
                />
              )}
            />
          </div>
          <form.Field
            name="user.phone"
            children={(field) => (
              <FormField
                field={field}
                label="Номер телефону"
                required={true}
                children={(control) => (
                  <PhoneInput
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="(XX) XXX XX XX"
                    aria-invalid={control.isInvalid}
                    maxLength={9}
                    required={true}
                  />
                )}
              />
            )}
          />
        </FieldGroup>
      </CardContent>
    </Card>
  ),
});
