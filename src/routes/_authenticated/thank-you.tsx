import { createFileRoute } from '@tanstack/react-router';

import { ThankYouPage } from '@/features/order/pages';

export const Route = createFileRoute('/_authenticated/thank-you')({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      orderId: search.orderId as number | undefined,
    };
  },
  component: ThankYouPage,
});
