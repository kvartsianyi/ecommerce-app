import React from 'react';

import { useFieldContext } from './form-context';
import { Field, FieldDescription, FieldError, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';

type TextFieldProps = {
  label?: string;
  labelAction?: React.ReactNode;
  required?: boolean;
  description?: string;
} & React.ComponentProps<'input'>;

export function TextField({
  label,
  labelAction,
  required = true,
  description,
  ...inputProps
}: TextFieldProps) {
  const field = useFieldContext<string>();

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field>
      {label && (
        <FieldLabel className="gap-1" htmlFor={field.name}>
          {label}
          {required && <span className="text-destructive">*</span>}
          {labelAction && <div className="ml-auto">{labelAction}</div>}
        </FieldLabel>
      )}
      {description && <FieldDescription>{description}</FieldDescription>}

      <Input
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        aria-invalid={isInvalid}
        {...inputProps}
      />

      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}
