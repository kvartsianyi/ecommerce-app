import { createFormHook } from '@tanstack/react-form';

import { fieldContext, formContext } from './form-context.tsx';
import { TextField } from './TextField.tsx';
import { SubmitButton } from './SubmitButton.tsx';
import { PhoneField } from './PhoneField.tsx';

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldComponents: { TextField, PhoneField },
  formComponents: { SubmitButton },
  fieldContext,
  formContext,
});
