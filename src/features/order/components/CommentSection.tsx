import { MessageSquare } from 'lucide-react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Textarea } from '@/shared/components/ui/textarea';
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from '@/shared/components/ui/field';
import { withForm, CheckoutFormOpts } from '../forms/checkout-form';

export const CommentSection = withForm({
  ...CheckoutFormOpts,
  render: ({ form }) => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="size-5" />
          Примітки до замовлення
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form.Field
          name="comment"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field>
                <FieldLabel htmlFor="comment">Додаткові коментарі</FieldLabel>
                <FieldDescription>
                  Додайте будь-які спеціальні інструкції або примітки до вашого
                  замовлення
                </FieldDescription>
                <Textarea
                  id="comment"
                  placeholder="Наприклад: Залишити біля дверей, зателефонувати по прибуттю..."
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  rows={4}
                  className="resize-none"
                  aria-invalid={isInvalid}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
      </CardContent>
    </Card>
  ),
});
