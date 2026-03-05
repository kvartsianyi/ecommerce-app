export function normalizePhoneNumber(input: string) {
  const digits = input.replace(/\D/g, '');

  return !digits.startsWith('+380') ? `+380${digits}` : digits;
}
