import { MessageSquare } from 'lucide-react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { withForm } from '@/shared/components/form';
import { CheckoutFormOpts } from '../forms/checkout-form';

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
        <form.AppField
          name="comment"
          children={(field) => (
            <field.TextareaField
              label="Додаткові коментарі"
              description="Додайте будь-які спеціальні інструкції або примітки до вашого замовлення"
              placeholder="Наприклад: Залишити біля дверей, зателефонувати по прибуттю..."
              className="resize-none"
            />
          )}
        />
      </CardContent>
    </Card>
  ),
});
