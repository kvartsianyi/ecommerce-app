import type { LucideIcon } from 'lucide-react';

import { useFieldContext } from './form-context';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldTitle,
} from '../ui/field';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

export type RadioOption = {
  value: string;
  label: string;
  rightSection?: React.ReactNode;
  description?: React.ReactNode;
  icon?: LucideIcon;
};

type RadioGroupFieldProps = {
  options: RadioOption[];
  label?: string;
  description?: string;
};

export function RadioGroupField({
  label,
  options,
  description,
}: RadioGroupFieldProps) {
  const field = useFieldContext<string>();

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field>
      {label && (
        <FieldLabel className="gap-1" htmlFor={field.name}>
          {label}
        </FieldLabel>
      )}
      {description && <FieldDescription>{description}</FieldDescription>}

      <RadioGroup value={field.state.value} onValueChange={field.handleChange}>
        {options.map((option) => (
          <FieldLabel key={option.value} htmlFor={option.value}>
            <Field orientation="horizontal">
              <RadioGroupItem value={option.value} id={option.value} />
              <FieldContent>
                <FieldTitle className="w-full justify-between items-center">
                  <div className="flex items-center gap-2">
                    {option.icon && (
                      <option.icon className="size-4 text-muted-foreground" />
                    )}
                    <span className="font-medium">{option.label}</span>
                  </div>
                  {option.rightSection}
                </FieldTitle>
                <FieldDescription>{option.description}</FieldDescription>
              </FieldContent>
            </Field>
          </FieldLabel>
        ))}
      </RadioGroup>

      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}
