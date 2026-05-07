import { Field, FieldDescription, FieldError, FieldLabel } from './field';

type FieldLike = {
  name: string;
  state: {
    value: string | number | readonly string[] | undefined;
    meta: {
      isTouched: boolean;
      isValid: boolean;
      isDirty: boolean;
      isBlurred: boolean;
      errors: Array<{ message?: string } | undefined>;
    };
  };
  handleChange: (value: string) => void;
  handleBlur: () => void;
};

type FormFieldChildrenProps = { isInvalid: boolean };

type FormFieldProps = {
  field: FieldLike;
  label?: string;
  labelAction?: React.ReactNode;
  required?: boolean;
  description?: string;
  children: (props: FormFieldChildrenProps) => React.ReactNode;
};

export function FormField({
  field,
  label,
  labelAction,
  required = true,
  description,
  children,
}: FormFieldProps) {
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

      {children({ isInvalid })}

      {description && <FieldDescription>{description}</FieldDescription>}
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}
