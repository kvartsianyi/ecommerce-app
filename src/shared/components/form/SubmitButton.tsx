import { useStore } from '@tanstack/react-form';

import { useFormContext } from '.';
import { Button } from '../ui/button';
import { Spinner } from '../ui/spinner';

type SubmitButtonProps = {
  children: React.ReactNode;
  className?: string;
  loadingText?: string;
  disabled?: boolean;
};

export const SubmitButton = ({
  children,
  disabled,
  loadingText,
  ...buttonProps
}: SubmitButtonProps) => {
  const form = useFormContext();

  const { isSubmitting, canSubmit } = useStore(form.store, (state) => ({
    canSubmit: state.isDirty && state.canSubmit,
    isSubmitting: state.isSubmitting,
  }));

  return (
    <Button
      type="submit"
      disabled={disabled || isSubmitting || !canSubmit}
      {...buttonProps}
    >
      {isSubmitting ? (
        <>
          <Spinner /> {loadingText}
        </>
      ) : (
        children
      )}
    </Button>
  );
};
