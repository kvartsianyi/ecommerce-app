import React from 'react';

import { useFieldContext } from './form-context';
import { Field, FieldDescription, FieldError, FieldLabel } from '../ui/field';
import { PhoneInput } from '../ui/PhoneInput';

type PhoneFieldProps = {
  label?: string;
  required?: boolean;
  description?: string;
} & React.ComponentProps<'input'>;

export function PhoneField({
  label,
  required = true,
  description,
  ...inputProps
}: PhoneFieldProps) {
  const field = useFieldContext<string>();

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field>
      {label && (
        <FieldLabel className="gap-1" htmlFor={field.name}>
          {label}
          {required && <span className="text-destructive">*</span>}
        </FieldLabel>
      )}
      {description && <FieldDescription>{description}</FieldDescription>}

      <PhoneInput
        id={field.name}
        name={field.name}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
        placeholder="(XX) XXX XX XX"
        aria-invalid={isInvalid}
        maxLength={9}
        required={required}
        {...inputProps}
      />

      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}
