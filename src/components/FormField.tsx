import { Input } from '@/components/ui/input';
import { Field, FieldError, FieldLabel } from './ui/field';

type FieldLike = {
  name: string;
  state: {
    value: string | number | readonly string[] | undefined;
    meta: {
      isTouched: boolean;
      isValid: boolean;
      errors: Array<{ message?: string } | undefined>;
    };
  };
  handleChange: (value: string) => void;
  handleBlur: () => void;
};

type FormFieldProps = {
  field: FieldLike;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
};

export function FormField({
  field,
  label,
  type = 'text',
  placeholder = '',
  required = true,
  ...props
}: FormFieldProps) {
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <Input
        type={type}
        id={field.name}
        name={field.name}
        placeholder={placeholder}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
        aria-invalid={isInvalid}
        required={required}
        {...props}
      />
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}
