import { CheckCircle2, MailWarning } from 'lucide-react';

import { ERROR_MESSAGES, SOMETHING_WENT_WRONG } from './constants';
import { Spinner } from '@/components/ui/spinner';

type MutationStatus = 'pending' | 'success' | 'error' | 'idle';

export function getEmailVerificationSettings(
  status: MutationStatus,
  token?: string,
  errorMessage?: string
) {
  if (!token) {
    return {
      icon: <MailWarning className="mx-auto h-10 w-10 text-destructive" />,
      title: 'Невірний запит',
      description: 'Відсутній токен підтвердження електронної пошти.',
    };
  }

  switch (status) {
    case 'error':
      return {
        icon: <MailWarning className="mx-auto h-10 w-10 text-destructive" />,
        title: 'Помилка підтвердження',
        description:
          ERROR_MESSAGES[errorMessage as keyof typeof ERROR_MESSAGES] ??
          SOMETHING_WENT_WRONG,
      };
    case 'success':
      return {
        icon: <CheckCircle2 className="mx-auto h-10 w-10 text-green-500" />,
        title: 'Email підтверджено',
        description: 'Ви успішно підтвердили свою електронну адресу.',
      };
    case 'pending':
    case 'idle':
    default:
      return {
        icon: <Spinner className="w-10 h-10 mx-auto" />,
        title: 'Підтвердження email',
        description: 'Зачекайте, ми перевіряємо вашу електронну адресу.',
      };
  }
}
