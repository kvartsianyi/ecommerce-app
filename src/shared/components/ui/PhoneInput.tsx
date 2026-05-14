import { InputGroup, InputGroupAddon, InputGroupInput } from './input-group';
import { COUNTRY_CODE_UA } from '@/shared/constants';

type PhoneInputProps = {
  countryCode?: string;
};

function PhoneInput({
  countryCode = COUNTRY_CODE_UA,
  ...props
}: PhoneInputProps & React.ComponentProps<'input'>) {
  return (
    <InputGroup {...props}>
      <InputGroupInput inputMode="numeric" {...props} />
      <InputGroupAddon className="text-foreground bg-muted px-3 h-full rounded-s-md">
        {countryCode}
      </InputGroupAddon>
    </InputGroup>
  );
}

export { PhoneInput };
