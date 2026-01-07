import { useEffect } from 'react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';

import { useAuth } from '@/hooks/useAuth';
import { usersApi } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { useCountdown } from '@/hooks/useCountdown';
import { ERROR_KEYS } from '@/lib/constants';
import { EmailVerificationCard } from '@/components/features/EmailVerificationCard';
import { getEmailVerificationSettings } from '@/lib/emailVerification';

export function EmailVerificationPage() {
  const { token } = useSearch({ from: '/email-verification' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const { seconds, start: startRedirectCountdown } = useCountdown(5, () =>
    navigate({ to: '/' })
  );

  const verifyEmailMutation = useMutation({
    mutationKey: ['email-verification'],
    mutationFn: (token: string) => usersApi.emailVerification(token),
    onSuccess: async ({ data: tokens }) => {
      await login(tokens);
      startRedirectCountdown();
    },
  });

  useEffect(() => {
    if (!token) return;

    verifyEmailMutation.mutate(token);
  }, [token]);

  const errorMessage = verifyEmailMutation.error?.message;

  const showResendButton = errorMessage === ERROR_KEYS.TOKEN_INVALID_OR_EXPIRED;
  const showGoHomeButton =
    !token || errorMessage === ERROR_KEYS.EMAIL_ALREADY_CONFIRMED;

  const settings = getEmailVerificationSettings(
    verifyEmailMutation.status,
    token,
    errorMessage
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <EmailVerificationCard
        icon={settings.icon}
        title={settings.title}
        description={settings.description}
      >
        {verifyEmailMutation.isSuccess && (
          <>
            <p className="text-sm text-muted-foreground">
              Перенаправлення на головну через{' '}
              <span className="font-medium text-foreground">{seconds}</span>{' '}
              секунд.
            </p>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate({ to: '/' })}
            >
              Перейти зараз
            </Button>
          </>
        )}
        {showResendButton && (
          <Button variant="outline" className="w-full">
            Надіслати підтвердження знову
          </Button>
        )}
        {showGoHomeButton && (
          <Button
            variant="outline"
            className="w-full"
            onClick={() => navigate({ to: '/' })}
          >
            Перейти до головної
          </Button>
        )}
      </EmailVerificationCard>
    </div>
  );
}
