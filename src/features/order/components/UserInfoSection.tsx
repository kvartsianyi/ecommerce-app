import { User } from 'lucide-react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { FieldGroup } from '@/shared/components/ui/field';
import { withForm } from '@/shared/components/form';
import { CheckoutFormOpts } from '../forms/checkout-form';

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
            <form.AppField
              name="user.firstName"
              children={(field) => (
                <field.TextField label="Ім'я" placeholder="Олександр" />
              )}
            />
            <form.AppField
              name="user.lastName"
              children={(field) => (
                <field.TextField label="Прізвище" placeholder="Шевченко" />
              )}
            />
          </div>
          <form.AppField
            name="user.phone"
            children={(field) => (
              <field.PhoneField
                label="Номер телефону"
                placeholder="(XX) XXX XX XX"
              />
            )}
          />
        </FieldGroup>
      </CardContent>
    </Card>
  ),
});
