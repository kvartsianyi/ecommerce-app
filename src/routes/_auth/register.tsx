import { createFileRoute } from '@tanstack/react-router';

import { SignUp } from '@/components/SignUp';

export const Route = createFileRoute('/_auth/register')({
  component: SignUp,
});
