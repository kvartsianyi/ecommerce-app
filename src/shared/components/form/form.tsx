import { createFormHook } from '@tanstack/react-form';

import { fieldContext, formContext } from './form-context.tsx';
import { TextField } from './TextField.tsx';
import { SubmitButton } from './SubmitButton.tsx';

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldComponents: { TextField },
  formComponents: { SubmitButton },
  fieldContext,
  formContext,
});
