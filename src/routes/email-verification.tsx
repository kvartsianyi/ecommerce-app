import { createFileRoute } from '@tanstack/react-router';

import { EmailVerificationPage } from '@/features/email-verification/components/EmailVerificationPage';

export const Route = createFileRoute('/email-verification')({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      token: search.token as string | undefined,
    };
  },
  component: EmailVerificationPage,
});
