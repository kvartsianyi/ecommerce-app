import { useFieldContext } from './form-context';
import { Field, FieldDescription, FieldError, FieldLabel } from '../ui/field';
import { Textarea } from '../ui/textarea';

type TextareaFieldProps = {
  label?: string;
  description?: string;
} & React.ComponentProps<'textarea'>;

export function TextareaField({
  label,
  description,
  ...inputProps
}: TextareaFieldProps) {
  const field = useFieldContext<string>();

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field>
      {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}
      {description && <FieldDescription>{description}</FieldDescription>}

      <Textarea
        id={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        rows={4}
        aria-invalid={isInvalid}
        {...inputProps}
      />

      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}
